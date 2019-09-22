//Game Play scene
function GameScene() {
	this.name = "Game Play";
	const GRAVITY = 1500;
	const VERTICAL_OFFSET = 50;

	let camera = null;
	let enemies = [];
	let columnManager = null;
	let levelData = null;
	let collisionManager = null;
	let subfloor = null;
	let floor = null;
	let roof = null;
	let wall = null;
	let floorMidHeight = 0;
	let timeTilSpawn = 0;
	let score = 0;
	let didReset = true;
	let didTransitionOut = false;
	let defeatedEnemyCount = 0;
	let bossHasBeenSpawned = false;
	let bossHealth = MAX_PLAYER_HEALTH;

	this.transitionIn = function() {
		if((this.properties != undefined) && (this.properties.restartLevel)) {
			this.reset();
		}

		didTransitionOut = false;

		if (aiManager === null) {
			//if aiManager === null, we've never initialized a GameScene
			aiManager = new AIManager();
			animationManager = new AnimationBuilder();
			timer.registerEvent(EVENT.EnemySpawn);
			initializePlayerIfReqd();
		}

		if (didReset) {
			camera = new Camera();
			initializeCollisionManager(player);
			initializeLevel();

			didReset = false;
		}

		//Don't reinitialize if we're just coming back from the pause screen
		if (floor === null || currentLevel != levelData.level) {
			levelData = dataForCurrentLevel();
			camera.setMinMaxPos(levelData.cameraMin, levelData.cameraMax);
			initializeFloor(levelData.columnImage, VERTICAL_OFFSET);
			InitializeRoof();
			InitializeBackWall();
			initializeColumns(levelData.columnImage, VERTICAL_OFFSET);
		}

		currentBackgroundMusic.loopSong(gameMusic);
	};

	this.transitionOut = function() {
		this.properties = null;
		didTransitionOut = true;
	};

	this.quit = function() {
		currentLevel = 1;
		this.reset();
		player.quit();
	};

	this.reset = function() {
		didReset = true;

		camera = new Camera();

		enemies = [];
		defeatedEnemyCount = 0;
		bossHasBeenSpawned = false;
		columnManager = null;
		levelData = dataForCurrentLevel();
		bossHealth = levelData.bossHealth;
		player.reset(levelData.playerStart);
		collisionManager = null;
		subfloor = null;
		floor = null;
		roof = null;
		wall = null;
		floorMidHeight = 0;
		timeTilSpawn = 0;
		score = 0;

		timer.updateEvent(EVENT.EnemySpawn);
	};

	this.run = function(deltaTime) {
		//Don't update after transitioning out on previous frame
		if(didTransitionOut) {return;}
		update(deltaTime);
		//Don't draw after transitioning out during update
		if(didTransitionOut) {return;}
		draw();
	};

	this.control = function(newKeyEvent, pressed) {
		if (!pressed) {
			switch (newKeyEvent) {
			case ALIAS.BACK:
				pauseManager.pauseGame(CAUSE.Keypress);
				SceneState.setState(SCENE.PAUSE);
				return true;
			case ALIAS.CHEATS:
				CHEATS_ACTIVE = !CHEATS_ACTIVE;
				return true;
			case ALIAS.DEBUG:
				DEBUG = !DEBUG;
				console.log("Debug " + DEBUG);
				return true;
			}
		}

		return false;
	};

	const update = function(deltaTime) {
		if (DEBUG) {
			levelData = dataForCurrentLevel();
			camera.setMinMaxPos(levelData.cameraMin, levelData.cameraMax);
		}

		const newCameraX = camera.getPosition().x;
		updateEnvironment(newCameraX);

		player.update(
			deltaTime,
			GRAVITY,
			floorMidHeight,
			levelData.cameraMin - canvas.width / 2,
			levelData.cameraMax + canvas.width / 2);


		if(defeatedEnemyCount >= levelData.totalEnemies) {
			if(enemies[0].getAIType() != AITYPE.Boss) {
				if(bossHasBeenSpawned) {
					if(currentLevel === TOTAL_LEVELS) {
						SceneState.setState(SCENE.ENDING);
					} else {
						currentLevel++;//Not sure if this is the right way to do this
						SceneState.setState(SCENE.POWERUP);
					}

					return;//don't continue processing this frame
				} else {
					spawnBoss(newCameraX);
					bossHasBeenSpawned = true;
				}
			}
		} else {
			//Didn't get to the boss yet, keep spawning new enemies
			spawnNewEnemies(newCameraX);
		}
	
		updateEnemies(deltaTime);

		camera.update(deltaTime);


		collisionManager.doCollisionChecks();

		processDefeatedEntities(collisionManager.defeatedEntities);

		processUserInput();
	};

	const updateEnvironment = function(newCameraX) {
		updateGameField(newCameraX);
		const floorImageShifts = floor.update(newCameraX);
		columnManager.update(newCameraX);
		subfloor.update(newCameraX, floorImageShifts);
		roof.update(newCameraX, floorImageShifts);
		wall.update(newCameraX, floorImageShifts);
	};

	const updateEnemies = function(deltaTime) {
		const playerPos = player.getPosition();
		for (let i = 0; i < enemies.length; i++) {
			enemies[i].update(deltaTime, GRAVITY, playerPos, floorMidHeight, i === 0);
		}

		if(bossHasBeenSpawned) {
			bossHealth = enemies[0].health;
		}
	};

	const spawnNewEnemies = function(cameraXPos) {
		if (enemies.length >= levelData.maxEnemies) return;

		const timeSince = timer.timeSinceUpdateForEvent(EVENT.EnemySpawn);
		if (timeSince > timeTilSpawn) {
			timer.updateEvent(EVENT.EnemySpawn);
			timeTilSpawn = levelData.spawnRate();
			spawnEnemy(cameraXPos);
		}
	};

	const processDefeatedEntities = function(defeatedEntities) {
		for (let defeatedEntity of defeatedEntities) {
			if (defeatedEntity === player) {
				console.log("Game over man! Game Over!");
				let highScore = parseInt(localStorageHelper.getObject(localStorageKey.HighScore));
				if((isNaN(highScore)) || (highScore === null) || (highScore === undefined)) {highScore = -1;}
				if(score > highScore) {
					let scoreString = score.toString();
					while(scoreString.length < 9) {
						scoreString = "0" + scoreString;
					}
					localStorageHelper.setObject(localStorageKey.HighScore, scoreString);
				}
				SceneState.setState(SCENE.GAMEOVER, {score:score});
			} else {
				const enemyIndex = enemies.findIndex(function(element) {
					return element === defeatedEntity;
				});

				const anEnemy = enemies.splice(enemyIndex, 1)[0]; //returns an array, we only want the first element
				score += anEnemy.score;
				collisionManager.removeEntity(defeatedEntity);
				if(defeatedEntity.getBelt() === levelData.enemyBelt) {
					defeatedEnemyCount++;
				}
			}
		}
	};

	const processUserInput = function() {
		const navKeys = inputProcessor.getNewlyReleasedKeys();
		for(let key of navKeys) {
			const newNavAction = keyMapper.getNavActionForKey(key);
			if(newNavAction != null) {
				switch(newNavAction) {
				case NAV_ACTION.PAUSE:
					SceneState.setState(SCENE.PAUSE);
					pauseManager.pauseGame(CAUSE.Keypress);
					break;
				}
			}
		}
	};

	const draw = function() {
		camera.draw();
		const cameraX = camera.getPosition().x;
		const roofTop = roof.getTop();
		drawBackground(cameraX, roofTop);
		wall.draw();
		subfloor.draw();
		floor.draw();

		for (let i = 0; i < enemies.length; i++) {
			enemies[i].draw();
		}

		player.draw();
		wooshFX.draw();

		columnManager.draw(cameraX);
		roof.draw();

		drawUI(cameraX);
	};

	const drawUI = function(cameraX) {
		//TODO: We need a way to find out how wide these strings will be, should be easy with a custom font
		const screenLeft = cameraX - canvas.width / 2;
		const screenRight = cameraX + canvas.width / 2;
		canvasContext.drawImage(uiScreenBg, screenLeft, 0);

		colorText(
			getLocalizedStringForKey(STRINGS_KEY.Score),
			screenLeft + 40,
			40,
			Color.White,
			Fonts.Subtitle,
			TextAlignment.Left);

		let stringScore = score.toString();
		while (stringScore.length < 9) {
			stringScore = "0" + stringScore;
		}

		colorText(
			stringScore,
			screenLeft + 180,
			40,
			Color.White,
			Fonts.Subtitle,
			TextAlignment.Left);

		colorText(
			getLocalizedStringForKey(STRINGS_KEY.Health),
			screenLeft + 40,
			80,
			Color.White,
			Fonts.Subtitle,
			TextAlignment.Left);

		drawRect(screenLeft + 180, 60, player.health, 22, Color.Orange);
		drawBorder(screenLeft + 180, 60, MAX_PLAYER_HEALTH, 22, Color.Orange);

		colorText(
			getLocalizedStringForKey(STRINGS_KEY.Time),
			screenLeft + 40,
			120,
			Color.White,
			Fonts.Subtitle,
			TextAlignment.Left);

		colorText(
			getLocalizedStringForKey(STRINGS_KEY.Level),
			screenLeft + 40,
			160,
			Color.White,
			Fonts.Subtitle,
			TextAlignment.Left);

		const keyForThisLevelName = stringsKeyForLevel(currentLevel);
		colorText(
			getLocalizedStringForKey(keyForThisLevelName),
			screenLeft + 180,
			160,
			Color.White,
			Fonts.Subtitle,
			TextAlignment.Left);

		colorText(
			getLocalizedStringForKey(STRINGS_KEY.Boss),
			screenRight - 380,
			80,
			Color.White,
			Fonts.Subtitle,
			TextAlignment.Right);
	
		drawRect(screenRight - 340, 60, bossHealth * (MAX_PLAYER_HEALTH / levelData.bossHealth), 22, levelData.bossMeterColor);
		drawBorder(screenRight  - 340, 60, MAX_PLAYER_HEALTH, 22, levelData.bossMeterColor);
	};

	const stringsKeyForLevel = function(level) {
		switch (level) {
		case 1:
			return STRINGS_KEY.Level1;
		case 2:
			return STRINGS_KEY.Level2;
		case 3:
			return STRINGS_KEY.Level3;
		case 4:
			return STRINGS_KEY.Level4;
		case 5:
			return STRINGS_KEY.Level5;
		}
	};

	const updateGameField = function(newCameraX) {
		GAME_FIELD.x = newCameraX - canvas.width / 2;
		GAME_FIELD.right = newCameraX + canvas.width / 2;
		GAME_FIELD.midX = newCameraX;
	};

	const initializeFloor = function(subfloorColumnImage, verticalOffset) {
		subfloor = new InfiniteSubFloor(subfloorColumnImage);
		subfloor.initializeForLevel(currentLevel);
		const colPos = 100 + camera.getPosition().x + (2 * canvas.width) / 3;
		subfloor.positionFirstColumn(colPos);

		floor = new InfiniteSurface(FLOOR_CONFIG, verticalOffset);
		floorMidHeight = floor.getMidHeight();
	};

	const InitializeRoof = function() {
		roof = new InfiniteRoof(canvas.height - tiledWall.height);
	};

	const InitializeBackWall = function() {
		wall = new InfiniteWall(canvas.height - tiledWall.height);
	};

	const initializePlayerIfReqd = function() {
		if (player === null) {
			const config = {
				x: (2 * canvas.width) / 3,
				y: (3 * canvas.height) / 5
			};

			player = new Player(config);
		}
	};

	const initializeColumns = function(image, offset) {
		columnManager = new InfiniteColumn(image, offset);
		const colPos = 100 + camera.getPosition().x + (2 * canvas.width) / 3;
		columnManager.positionFirstColumn(colPos);
	};

	const initializeCollisionManager = function(player) {
		collisionManager = new CollisionManager(player);
	};

	const initializeLevel = function() {
		camera.attach(player);
	};

	const drawBackground = function(cameraX, roofTop) {
		const vertClip = levelData.wallWindowHeight;
		const startClipY = titleScreenBG.height - vertClip - levelData.bgClipLevel; //100 makes it look good
		const startDrawingY = roofTop + levelData.wallWindowTop; //215 based on back wall image

		canvasContext.drawImage(
			titleScreenBG,
			0, startClipY,
			titleScreenBG.width, vertClip,
			cameraX - canvas.width / 2, startDrawingY,
			canvas.width, vertClip);
	};

	const dataForCurrentLevel = function() {
		switch (currentLevel) {
		case 1:
			return Level1Data;
		case 2:
			return Level2Data;
		case 3:
			return Level3Data;
		case 4:
			return Level4Data;
		case 5:
			return Level5Data;
		}
	};

	const spawnEnemy = function(cameraXPos) {
		const playerPos = player.getPosition();
		let atLeft = levelData.scrollsLeft;
		let leftCount = 0;
		let rightCount = 0;

		for(let enemy of enemies) {
			if(enemy.getPosition().x < playerPos.x) {
				leftCount++;
			} else {
				rightCount++;
			}
		}

		if(enemies.length > 0) {
			if((levelData.scrollsLeft) && (rightCount === 0)) {
				atLeft = false;
			} else if((!levelData.scrollsLeft) && (leftCount === 0)) {
				atLeft = true;
			}	
		}

		let xPos = cameraXPos + (1.5 * canvas.width) / 2;
		if (atLeft) {
			xPos = cameraXPos - (1.5 * canvas.width) / 2;
		}

		let belt = levelData.enemyBelt;
		if(belt > BELT.White) {
			const rnd = Math.random();
			if(rnd < 0.5) {
				if(rnd * currentLevel <= 0.5) {
					belt = levelData.enemyBelt;
				} else if(rnd * currentLevel <= 1.0) {
					belt = BELT.White;
				} else if(rnd * currentLevel <= 1.5) {
					belt = BELT.Yellow;
				} else if(rnd * currentLevel <= 2.0) {
					belt = BELT.Tan;
				} else if(rnd * currentLevel <= 2.5) {
					belt = BELT.Brown;
				} else {
					belt = BELT.Red;
				}
			}
		}

		const config = {
			x: xPos,
			y: (3 * canvas.height) / 5,
			belt:belt
		};

		const anEnemy = new BasicEnemy(config);
		collisionManager.addEntity(anEnemy);
		enemies.push(anEnemy);
	};

	const spawnBoss = function(cameraXPos) {
		let atLeft = levelData.scrollsLeft;
		if(levelData.scrollsLeft) {
			atLeft = false;
		} else if(!levelData.scrollsLeft) {
			atLeft = true;
		}

		let xPos = cameraXPos + (1.5 * canvas.width) / 2;
		if (atLeft) {
			xPos = cameraXPos - (1.5 * canvas.width) / 2;
		}

		const config = {
			x: xPos,
			y: (3 * canvas.height) / 5,
			belt:levelData.bossBelt,
			aiType: AITYPE.Boss,
			health:levelData.bossHealth
		};

		const aBoss = new BasicEnemy(config);
		collisionManager.addEntity(aBoss);

		enemies.unshift(aBoss);
	};
}

const Level1Data = {
	level: 1,
	maxEnemies: 4,
	totalEnemies:4,
	spawnRate: function() {
		const rnd1 = Math.ceil(1250 * Math.random());
		const rnd2 = Math.ceil(1250 * Math.random());
		return (1250 + rnd1 + rnd2);
	},
	scrollsLeft: true,
	allowedTime: 999,
	enemyBelt: BELT.White,
	bossBelt: BELT.Yellow,
	bossHealth:100,
	bossMeterColor:Color.Yellow,
	wallWindowHeight: 175,
	wallWindowTop: 215,
	bgClipLevel: 100,
	columnImage:lvl1Column,
	cameraMin: -1000,
	cameraMax: 350,
	didReachBoss: function(cameraPos) {
		if(cameraPos <= Level1Data.cameraMin) return true;
		return false;
	},
	playerStart:{x:350, y:500} //x = cameraMax
};

const Level2Data = {
	level: 2,
	maxEnemies: 4,
	totalEnemies:4,
	spawnRate: function() {
		const rnd1 = Math.ceil(1225 * Math.random());
		const rnd2 = Math.ceil(1225 * Math.random());
		return (900 + rnd1 + rnd2);
	},
	scrollsLeft: false,
	allowedTime: 899,
	enemyBelt: BELT.Yellow,
	bossBelt: BELT.Tan,
	bossHealth:120,
	bossMeterColor:Color.Tan,
	wallWindowHeight: 175,
	wallWindowTop: 215,
	bgClipLevel: 200,
	columnImage:lvl2Column,
	cameraMin: -100,
	cameraMax: 2000,
	didReachBoss: function(cameraPos) {
		if(cameraPos >= Level2Data.cameraMax) return true;
		return false;
	},
	playerStart:{x:-100, y:500} //x = cameraMin
};

const Level3Data = {
	level: 3,
	maxEnemies: 5,
	totalEnemies:5,
	spawnRate: function() {
		const rnd1 = Math.ceil(1200 * Math.random());
		const rnd2 = Math.ceil(1200 * Math.random());
		return (600 + rnd1 + rnd2);
	},
	scrollsLeft: true,
	allowedTime: 799,
	enemyBelt: BELT.Tan,
	bossBelt: BELT.Brown,
	bossHealth:140,
	bossMeterColor:Color.SaddleBrown,
	wallWindowHeight: 175,
	wallWindowTop: 215,
	bgClipLevel: 300,
	columnImage:lvl3Column,
	cameraMin: -1000,
	cameraMax: 350,
	didReachBoss: function(cameraPos) {
		if(cameraPos <= Level3Data.cameraMin) return true;
		return false;
	},
	playerStart:{x:350, y:500} //x = cameraMax
};

const Level4Data = {
	level: 4,
	maxEnemies: 5,
	spawnRate: function() {
		const rnd1 = Math.ceil(1175 * Math.random());
		const rnd2 = Math.ceil(1175 * Math.random());
		return (350 + rnd1 + rnd2);
	},
	scrollsLeft: false,
	allowedTime: 699,
	enemyBelt: BELT.Brown,
	bossBelt: BELT.Red,
	bossHealth:160,
	bossMeterColor:Color.Red,
	wallWindowHeight: 175,
	wallWindowTop: 215,
	bgClipLevel: 400,
	columnImage:lvl4Column,
	cameraMin: -100,
	cameraMax: 2000,
	didReachBoss: function(cameraPos) {
		if(cameraPos >= Level4Data.cameraMax) return true;
		return false;
	},
	playerStart:{x:-100, y:500} //x = cameraMin
};

const Level5Data = {
	level: 5,
	maxEnemies: 6,
	totalEnemies:6,
	spawnRate: function() {
		const rnd1 = Math.ceil(1150 * Math.random());
		const rnd2 = Math.ceil(1150 * Math.random());
		return (150 + rnd1 + rnd2);
	},
	scrollsLeft: true,
	allowedTime: 599,
	enemyBelt: BELT.Red,
	bossBelt: BELT.Black,
	bossHealth:400,//this is the final boss, so BUFF!!
	bossMeterColor:Color.White,
	wallWindowHeight: 175,
	wallWindowTop: 215,
	bgClipLevel: 500,
	columnImage:lvl4Column,
	cameraMin: -1000,
	cameraMax: 350,
	didReachBoss: function(cameraPos) {
		if(cameraPos <= Level5Data.cameraMin) return true;
		return false;
	},
	playerStart:{x:350, y:500} //x = cameraMax
};
