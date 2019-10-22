//Game Play scene
function GameScene() {
	this.name = "Game Play";
	const GRAVITY = 1500;
	const VERTICAL_OFFSET = 50;

	// Game Timer Scene Settings
	// For more detailed settings please go to "js/Timers/GameTimer.js"
	let gameTimer = new GameTimer({
		startTime: 30, // in seconds
		decimalPlaces: 3, // 3 digits zero-padded
		timeWarningThreshold: 10, // in seconds
		onZeroText: "Time Up!", // use "" if you just want to see zeroes
		startNow: true, // start immediately on scene start. Change this when there's a count down to start. Just instantiate another one of these.
	});
	gameTimer.onZero.subscribe(() => {
		// TODO: set a game over flag here
		sound.playEcho(Sounds.SFX_PlayerFail, [.4, 1], [1, .3], 5, 200);
		sound.playEcho(Sounds.SFX_PlayerKick, [1, .4], [.4, 1], 5, 150);

		console.log("Time's UP!!");
	});
	gameTimer.onWarningCount.subscribe((seconds) => {
		// Play some kind of beep here!
		sound.playSFX(Sounds.SFX_ResumeLow); // temporary
		console.log(seconds); // please remove when it's seen working without bugs
	});
	

	let camera = null;
	let enemies = [];
	let columnManager = null;
	let lampManager = null;
	let levelData = null;
	let collisionManager = null;
	let subfloor = null;
	let floor = null;
	let roof = null;
	let wall = null;
	let waterfall = null;
	let floorMidHeight = 0;
	let timeTilSpawn = 0;
	let score = 0;
	let didReset = true;
	let didTransitionOut = false;
	let defeatedEnemyCount = 0;
	let bossHasBeenSpawned = false;
	let bossHealth = ASSIST_DEFAULT.MaxHealth;
	let bossMaxHealth = null;
	let enemyMinX;
	let enemyMaxX;

	const displayPoints = [];

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
			enemyMinX = levelData.cameraMin - 0.35 * canvas.width;
			enemyMaxX = levelData.cameraMax + 0.35 * canvas.width;
			initializeFloor(levelData.columnImage, VERTICAL_OFFSET);
			foregroundDecorations.generate(50,-4000,500,628,636,0,7,floor.getFrontHeight(),floor.getBackHeight());
//			wallDecorations.generate(20,-4000,500,360,380,7,7,floor.getFrontHeight(),floor.getBackHeight());
			InitializeRoof();
			InitializeBackWall();
			initializeColumns(levelData.columnImage, VERTICAL_OFFSET);
			initializeLamps(350);
			if(currentLevel === 1) initializeWaterfall();
		}

		// @SoundHook:
		// if (currentBackgroundMusic.getCurrentTrack() !== gameMusic) {
		// 	currentBackgroundMusic.loopSong(gameMusic);
		// }
		if (sound.getCurrentBGMKey() !== Sounds.BGM_GamePlay) {
			sound.playBGM(Sounds.BGM_GamePlay);
		}
		
	};

	this.transitionOut = function() {
		this.properties = null;
		didTransitionOut = true;
	};

	this.quit = function() {
		currentLevel = localStorageHelper.getInt(localStorageKey.StartingLevel);
		if((currentLevel === undefined) || (currentLevel === null) || (isNaN(currentLevel))) {
			currentLevel = 1;
		}

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
		lampManager = null;
		levelData = dataForCurrentLevel();
		enemyMinX = levelData.cameraMin - 0.35 * canvas.width;
		enemyMaxX = levelData.cameraMax + 0.35 * canvas.width;
		bossHealth = levelData.bossHealth;
		bossMaxHealth = null;
		player.reset(levelData.playerStart);
		collisionManager = null;
		subfloor = null;
		floor = null;
		roof = null;
		wall = null;
		waterfall = null;
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
			enemyMinX = levelData.cameraMin - 0.35 * canvas.width;
			enemyMaxX = levelData.cameraMax + 0.35 * canvas.width;
		}

		const newCameraX = camera.getPosition().x;
		updateEnvironment(newCameraX);

		// Timer countdown update
		gameTimer.update(deltaTime);

		player.update(
			deltaTime,
			GRAVITY,
			floorMidHeight,
			levelData.cameraMin - canvas.width / 2,
			levelData.cameraMax + canvas.width / 2);


		if(defeatedEnemyCount >= levelData.totalEnemies) {
			if(bossHasBeenSpawned) {
				if((enemies[0] === undefined) || (enemies[0].getAIType() != AITYPE.Boss)) {
					if(currentLevel === TOTAL_LEVELS) {
						SceneState.setState(SCENE.ENDING);
					} else {
						currentLevel++;//Not sure if this is the right way to do this
						SceneState.setState(SCENE.POWERUP);
					}

					return;//don't continue processing this frame
				}
			} else {
				spawnBoss(newCameraX);
				bossHasBeenSpawned = true;
			}
		} else {
			//Didn't get to the boss yet, keep spawning new enemies
			spawnNewEnemies(newCameraX);
		}
	
		updateEnemies(deltaTime);

		camera.update(deltaTime);

		collisionManager.doCollisionChecks();

		processDefeatedEntities(collisionManager.defeatedEntities);

		processAndUpdatePointsToDisplay(deltaTime);

		processUserInput();

		if(currentLevel === 1) waterfall.update(deltaTime);
	};

	const updateEnvironment = function(newCameraX) {
		updateGameField(newCameraX);
		const floorImageShifts = floor.update(newCameraX);
		columnManager.update(newCameraX);
		subfloor.update(newCameraX, floorImageShifts);
		roof.update(newCameraX, floorImageShifts);
		wall.update(newCameraX, floorImageShifts);
		lampManager.update(newCameraX, floorImageShifts);
		foregroundDecorations.update(floorImageShifts);
//		wallDecorations.update(floorImageShifts);
	};

	const updateEnemies = function(deltaTime) {
		const playerPos = player.getPosition();
		for (let i = 0; i < enemies.length; i++) {
			enemies[i].update(deltaTime, GRAVITY, playerPos, enemyMinX, enemyMaxX, floorMidHeight, i === 0);
		}

		if(bossHasBeenSpawned) {
			if((enemies[0] !== undefined) && (enemies[0].getAIType() === AITYPE.Boss)) {
				bossHealth = enemies[0].health;
			} else {
				bossHealth = 0;
			}
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

	const processAndUpdatePointsToDisplay = function(deltaTime) {
		if(player.pointsToShow.points != null) {
			const thisDisplayPoint = new DisplayPoints(player.pointsToShow.points,
				{x:player.pointsToShow.position.x, 
					y:player.pointsToShow.position.y - 30});

			displayPoints.push(thisDisplayPoint);
			score += player.pointsToShow.points;
			player.pointsToShow.points = null;
		}

		for(let i = displayPoints.length - 1; i >= 0; i--) {
			const aDisplayPoint = displayPoints[i];
			aDisplayPoint.update(deltaTime);
			if(aDisplayPoint.isComplete) {
				displayPoints.splice(i, 1);
			}
		}
	};

	const processUserInput = function() {
		const navKeys = inputProcessor.getNewlyReleasedKeys();
		for(let key of navKeys) {
			const newNavAction = keyMapper.getNavAction(key);
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
        
//		if (wallDecorations) wallDecorations.draw(cameraX);
        
		subfloor.draw();
		floor.draw();

		canvasContext.drawImage(tempRightWall, 
			0, 0, 
			tempRightWall.width, tempRightWall.height, 
			levelData.cameraMax - tempRightWall.width + canvas.width / 2, floor.getFrontHeight() - tempRightWall.height - 5, 
			tempRightWall.width, tempRightWall.height);
		canvasContext.drawImage(wallGradient, levelData.cameraMax - tempRightWall.width + canvas.width / 2, canvas.height - tiledWall.height);

		for (let i = 0; i < enemies.length; i++) {
			enemies[i].draw();
		}

		player.draw();
		if (wooshFX) wooshFX.draw();

		lampManager.draw();
		if (foregroundDecorations) foregroundDecorations.draw(cameraX);
		columnManager.draw(cameraX);
		roof.draw();

		for(let aDisplayPoint of displayPoints) {
			aDisplayPoint.draw();
		}

		drawUI(cameraX);
	};

	const drawUI = function(cameraX) {
		const UI_SCALE = 0.4;
		//TODO: We need a way to find out how wide these strings will be, should be easy with a custom font
		const screenLeft = cameraX - canvas.width / 2;
		const screenRight = cameraX + canvas.width / 2;

		//Background and Border
		canvasContext.drawImage(uiScreenBg, screenLeft, 0);
		canvasContext.drawImage(uiBorder, 0, 0, uiBorder.width, uiBorder.height, screenLeft, 0, uiBorder.width / 2, uiBorder.height / 2);

		//Score
		JPFont.printTextAt(getLocalizedStringForKey(STRINGS_KEY.Score),
			{x: screenLeft + 40, y: 10}, 
			TextAlignment.Left, UI_SCALE);

		const scoreStringWidth = JPFont.getStringWidth(getLocalizedStringForKey(STRINGS_KEY.Score), UI_SCALE);
		let stringScore = score.toString();
		while (stringScore.length < 9) {
			stringScore = "0" + stringScore;
		}

		JPFont.printTextAt(stringScore, {x:screenLeft + scoreStringWidth + 50, y:10}, TextAlignment.Left, UI_SCALE);

		//Player Health
		JPFont.printTextAt(getLocalizedStringForKey(STRINGS_KEY.Health),
			{x:screenLeft + 40, y: 55}, TextAlignment.Left, UI_SCALE);

		const healthStringWidth = JPFont.getStringWidth(getLocalizedStringForKey(STRINGS_KEY.Health), UI_SCALE);
		const playerHealthWidth = ASSIST_DEFAULT.MaxHealth * player.health / player.getMaxHealth();
		drawRect(screenLeft + healthStringWidth + 50, 60, playerHealthWidth, 22, Color.Orange);
		drawBorder(screenLeft + healthStringWidth + 50, 60, ASSIST_DEFAULT.MaxHealth, 22, Color.Orange);

		//Time Counter
		JPFont.printTextAt(getLocalizedStringForKey(STRINGS_KEY.Time),
			{x:screenLeft + 40, y:95}, TextAlignment.Left, UI_SCALE);
		
		// GameTimer text rendering
		gameTimer.setPosition(screenLeft + 150, 96);
		gameTimer.draw();

		//Level Name
		JPFont.printTextAt(getLocalizedStringForKey(STRINGS_KEY.Level),
			{x:screenLeft + 40, y: 135}, TextAlignment.Left, UI_SCALE);

		const levelStringWidth = JPFont.getStringWidth(getLocalizedStringForKey(STRINGS_KEY.Level), UI_SCALE);
		const keyForThisLevelName = stringsKeyForLevel(currentLevel);

		JPFont.printTextAt(getLocalizedStringForKey(keyForThisLevelName),
			{x:screenLeft + levelStringWidth + 50, y:135}, TextAlignment.Left, UI_SCALE);

		//Rivals Remaining
		JPFont.printTextAt(getLocalizedStringForKey(STRINGS_KEY.Rivals),
			{x:cameraX, y:10}, TextAlignment.Left, UI_SCALE);
		const rivalsWidth = JPFont.getStringWidth(getLocalizedStringForKey(STRINGS_KEY.Rivals), UI_SCALE);

		let thisX = cameraX + rivalsWidth + 10;
		for(let i = 0; i < (levelData.totalEnemies - defeatedEnemyCount); i++) {
			canvasContext.drawImage(basicEnemyIdle, 0, 0, basicEnemyIdle.width / 2, basicEnemyIdle.height, thisX, 10, basicEnemyIdle.width / 4, basicEnemyIdle.height / 2);

			thisX += (10 + basicEnemyIdle.width / 4);
		}

		//Boss Health
		JPFont.printTextAt(getLocalizedStringForKey(STRINGS_KEY.Boss),
			{x:cameraX, y:55}, TextAlignment.Left, UI_SCALE);

		const bossStringWidth = JPFont.getStringWidth(getLocalizedStringForKey(STRINGS_KEY.Boss), UI_SCALE);
	
		if(bossMaxHealth === null) {
			drawRect(cameraX + bossStringWidth + 10, 60, bossHealth * (ASSIST_DEFAULT.MaxHealth / levelData.bossHealth), 22, levelData.bossMeterColor);
		} else {
			drawRect(cameraX + bossStringWidth + 10, 60, bossHealth * (ASSIST_DEFAULT.MaxHealth / bossMaxHealth), 22, levelData.bossMeterColor);
		}
		drawBorder(cameraX + bossStringWidth + 10, 60, ASSIST_DEFAULT.MaxHealth, 22, levelData.bossMeterColor);
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
		wall = new InfiniteWall(canvas.height - tiledWall.height, levelData.wallScroll, levelData.cameraMin, levelData.cameraMax);
	};

	const initializePlayerIfReqd = function() {
		if (player === null) {
			let health = localStorageHelper.getInt(localStorageKey.PlayerMaxHealth);
			if((health === undefined) || (health === null) || (isNaN(health))) {
				health = ASSIST_DEFAULT.MaxHealth;
				localStorageHelper.setInt(localStorageKey.PlayerMaxHealth, health);
			}

			let belt = localStorageHelper.getInt(localStorageKey.StartingBelt);
			if((belt === undefined) || (belt === null) || (isNaN(belt))) {
				belt = ASSIST_DEFAULT.StartBelt;
				localStorageHelper.setInt(localStorageKey.StartingBelt, belt);
			}

			const config = {
				x: (2 * canvas.width) / 3,
				y: (3 * canvas.height) / 5,
				health:health,
				belt:belt
			};

			player = new Player(config);
		}
	};

	const initializeColumns = function(image, offset) {
		columnManager = new InfiniteColumn(image, offset);
		const colPos = 100 + camera.getPosition().x + (2 * canvas.width) / 3;
		columnManager.positionFirstColumn(colPos);
	};

	const initializeLamps = function(offset) {
		lampManager = new InfiniteLamp(offset);
		const lampPos = 150 + camera.getPosition().x + (2 * canvas.width) / 3;
		lampManager.positionFirstLamp(lampPos);
	};

	const initializeWaterfall = function() {
		waterfall = new SpriteAnimation("waterfall", waterfallSheet, [0, 1, 2, 3], 200, 140, [128, 128, 128, 32], false, true);
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

		if(currentLevel === 1) waterfall.drawAt(-200 + cameraX + canvas.width / 2, startDrawingY, false);
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
		//Position the new enemy at one side of the screen or the other
		//depending on whether the level scrolls left or right
		let xPos;
		if (levelData.scrollsLeft) {
			xPos = cameraXPos - (1.5 * canvas.width) / 2;
		} else {
			xPos = cameraXPos + (1.5 * canvas.width) / 2;
		}

		//If player is at one edge of the level, spawn enemy from
		//other side so enemy doesn't pop into existence on screen
		if(xPos < enemyMinX + canvas.width / 2) {
			xPos = cameraXPos + (1.5 * canvas.width) / 2;
		} else if(xPos > enemyMaxX - canvas.width / 2) {
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

		let baseHealth = localStorageHelper.getInt(localStorageKey.BossHealth);
		if((baseHealth === undefined) || (baseHealth === null) || (isNaN(baseHealth))) {
			baseHealth = ASSIST_DEFAULT.BossBaseHealth;
			localStorageHelper.setInt(localStorageKey.BossHealth,  baseHealth);
		}

		const config = {
			x: xPos,
			y: (3 * canvas.height) / 5,
			belt:levelData.bossBelt,
			aiType: AITYPE.Boss,
			health:(baseHealth + levelData.bossHealth)
		};

		bossMaxHealth = baseHealth + levelData.bossHealth;

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
	wallScroll:wallScrollTiger,
	enemyBelt: BELT.White,
	bossBelt: BELT.Yellow,
	bossHealth:100,
	bossMeterColor:Color.Yellow,
	wallWindowHeight: 175,
	wallWindowTop: 215,
	bgClipLevel: 100,
	columnImage:lvl1Column,
	cameraMin: -5000,
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
	wallScroll:wallScrollCrane,
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
	wallScroll:wallScrollSnake,
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
	totalEnemies:5,
	spawnRate: function() {
		const rnd1 = Math.ceil(1175 * Math.random());
		const rnd2 = Math.ceil(1175 * Math.random());
		return (350 + rnd1 + rnd2);
	},
	scrollsLeft: false,
	allowedTime: 699,
	wallScroll:wallScrollLeopard,
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
	wallScroll:wallScrollDragon,
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
