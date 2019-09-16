//Game Play scene
function GameScene() {
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

	this.transitionIn = function() {
		if(keyMapper === null) {//if keyMapper === null, we've never initialized a GameScene
			keyMapper = new KeyMapper();
			inputProcessor = new InputProcessor();
			aiManager = new AIManager();
			timer.registerEvent(EVENT.EnemySpawn);
			initializePlayerIfReqd();
		}

		if(didReset) {
			camera = new Camera();
			initializeCollisionManager(player);
			initializeLevel();

			didReset = false;
		}

		//Don't reinitialize if we're just coming back from the pause screen
		if((levelData === null) || (currentLevel != levelData.level)) {
			levelData = dataForCurrentLevel();
			camera.setMinMaxPos(levelData.cameraMin, levelData.cameraMax);
			initializeFloor(VERTICAL_OFFSET);
			InitializeRoof();
			InitializeBackWall();
			initializeColumns();
		}

		currentBackgroundMusic.loopSong(gameMusic);
	};

	this.transitionOut = function() {

	};

	this.reset = function() {
		didReset = true;

		player.reset();
		canvasContext.setTransform(1, 0, 0, 1, 0, 0);
		camera = new Camera();

		enemies = [];
		columnManager = null;
		levelData = null;
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
		update(deltaTime);
		draw();
	};

	this.control = function(newKeyEvent, pressed) {
		if(!pressed) {
			switch (newKeyEvent) {
			case ALIAS.CHEATS:
				CHEATS_ACTIVE = !CHEATS_ACTIVE;
				return true;
			case ALIAS.DEBUG:
				DEBUG = !DEBUG;
				console.log("Debug? " + DEBUG);
				return true;
			}		
		}
        
		return false;
	};

	const update = function(deltaTime) {
		if(DEBUG) {
			levelData = dataForCurrentLevel();
			camera.setMinMaxPos(levelData.cameraMin, levelData.cameraMax);
		}

		const newCameraX = camera.getPosition().x;
		updateEnvironment(newCameraX);

		player.update(deltaTime, GRAVITY, floorMidHeight, levelData.cameraMin - canvas.width / 2, levelData.cameraMax + canvas.width / 2);

		updateEnemies(deltaTime, newCameraX);

		camera.update(deltaTime);

		collisionManager.doCollisionChecks();

		processDefeatedEntities(collisionManager.defeatedEntities);
	};

	const updateEnvironment = function(newCameraX) {
		updateGameField(newCameraX);
		const floorImageShifts = floor.update(newCameraX);
		columnManager.update(newCameraX);
		subfloor.update(newCameraX, floorImageShifts);
		roof.update(newCameraX, floorImageShifts);
		wall.update(newCameraX, floorImageShifts);
	};

	const updateEnemies = function(deltaTime, newCameraX) {
		const playerPos = player.getPosition();
		spawnNewEnemies(newCameraX);
		for(let i = 0; i < enemies.length; i++) {
			enemies[i].update(deltaTime, GRAVITY, playerPos, floorMidHeight, i===0);
		}
	};

	const spawnNewEnemies = function(cameraXPos) {
		if(enemies.length >= levelData.maxEnemies) return;

		const timeSince = timer.timeSinceUpdateForEvent(EVENT.EnemySpawn);
		if(timeSince > timeTilSpawn) {
			timer.updateEvent(EVENT.EnemySpawn);
			timeTilSpawn = levelData.spawnRate();
			spawnEnemy(cameraXPos, timeTilSpawn);
		}
	};

	const processDefeatedEntities = function(defeatedEntities) {
		for(let defeatedEntity of defeatedEntities) {
			if(defeatedEntity === player) {
				console.log("Game over man! Game Over!");
			} else {
				const enemyIndex = enemies.findIndex(function(element) {
					return (element === defeatedEntity);
				});
	
				const anEnemy = enemies.splice(enemyIndex, 1)[0];//returns an array, we only want the first element
				score += anEnemy.score;
				collisionManager.removeEntity(defeatedEntity);
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

		for(let i = 0; i < enemies.length; i++) {
			enemies[i].draw();
		}

		player.draw();

		columnManager.draw(cameraX);
		roof.draw();

		drawUI(cameraX);
	};

	const drawUI = function(cameraX) {//TODO: We need a way to find out how wide these strings will be, should be easy with a custom font
		const screenLeft = cameraX - canvas.width / 2;
		drawRect( screenLeft + 180, 60, player.health,22, Color.Orange);
		// drawRect(38,67, Math.ceil(getLocalizedStringForKey(STRINGS_KEY.Health / getLocalizedStringForKey(STRINGS_KEY.maxHealth)* 160)),22, "#cd1616");
		colorText(getLocalizedStringForKey(STRINGS_KEY.Score), screenLeft + 40, 40, Color.White, Fonts.Subtitle, TextAlignment.Left);
		let stringScore = score.toString();
		while(stringScore.length < 9) {
			stringScore = "0" + stringScore;
		} 
		colorText(stringScore, screenLeft + 180, 40, Color.White, Fonts.Subtitle, TextAlignment.Left);
		colorText(getLocalizedStringForKey(STRINGS_KEY.Health), screenLeft + 40, 80, Color.White, Fonts.Subtitle, TextAlignment.Left);
		colorText(getLocalizedStringForKey(STRINGS_KEY.Time), screenLeft + 40, 120, Color.White, Fonts.Subtitle, TextAlignment.Left);
		colorText(getLocalizedStringForKey(STRINGS_KEY.Level), screenLeft + 40, 160, Color.White, Fonts.Subtitle, TextAlignment.Left);
		const keyForThisLevelName = stringsKeyForLevel(currentLevel);
		colorText(getLocalizedStringForKey(keyForThisLevelName), screenLeft + 180, 160, Color.White, Fonts.Subtitle, TextAlignment.Left);
	};

	const stringsKeyForLevel = function(level) {
		switch(level) {
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

	const initializeFloor = function(verticalOffset) {
		subfloor = new InfiniteSubFloor();
		subfloor.initializeForLevel(currentLevel);
		subfloor.positionFirstColumn(100 + camera.getPosition().x + 2 * canvas.width / 3);

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
		if(player === null) {			
			const config = {
				x:2 * canvas.width / 3, 
				y:3 * canvas.height / 5
			};

			player = new Player(config);
		}
	};

	const initializeColumns = function() {
		columnManager = new InfiniteColumn(VERTICAL_OFFSET);
		columnManager.positionFirstColumn(100 + camera.getPosition().x + 2 * canvas.width / 3);
	};

	const initializeCollisionManager = function(player) {
		collisionManager = new CollisionManager(player);
	};

	const initializeLevel = function() {
		camera.attach(player);
	};

	const drawBackground = function(cameraX, roofTop) {
		const vertAmtToClip = levelData.wallWindowHeight;
		const startClippingY = titleScreenBG.height - vertAmtToClip - levelData.backgroundClipLevel;//100 makes it look good
		const startDrawingY = roofTop + levelData.wallWindowTop;//215 based on back wall image

		canvasContext.drawImage(titleScreenBG, 
			0, startClippingY, titleScreenBG.width, vertAmtToClip, 
			cameraX - canvas.width / 2, startDrawingY, canvas.width, vertAmtToClip);
	};

	const dataForCurrentLevel = function() {
		switch(currentLevel) {
		case 1: return Level1Data;
		case 2: return Level2Data;
		case 3: return Level3Data;
		case 4: return Level4Data;
		case 5: return Level5Data;
		}
	};

	const spawnEnemy = function(cameraXPos, timeTilSpawn) {
		let atLeft = (timeTilSpawn % 3 < 2);//prefers spawning at left 2:1

		if(!levelData.scrollsLeft) {//prefer not at left if level doesn't scroll left
			atLeft = !atLeft;
		}

		let xPos = cameraXPos + (1.5 * canvas.width / 2);
		if(atLeft) {
			xPos = cameraXPos - (1.5 * canvas.width / 2);
		}

		const config = {
			x:xPos, 
			y:3 * canvas.height / 5
		};

		const anEnemy = new BasicEnemy(config);
		collisionManager.addEntity(anEnemy);
		enemies.push(anEnemy);
	};
}

const Level1Data = {
	level:1,
	maxEnemies: 4,
	spawnRate:function() {
		return (1250 + Math.ceil(1250 * Math.random()) + Math.ceil(1250 * Math.random()));
	},
	scrollsLeft:true,
	allowedTime:999,
	enemyBelt:BELT.White,
	bossBelt:BELT.Yellow,
	wallWindowHeight:175,
	wallWindowTop:215,
	backgroundClipLevel:100,
	cameraMin:-1000,
	cameraMax:350
};

const Level2Data = {
	level:2,
	maxEnemies: 4,
	spawnRate:function() {
		return (900 + Math.ceil(1225 * Math.random()) + Math.ceil(1225 * Math.random()));
	},
	scrollsLeft:false,
	allowedTime:899,
	enemyBelt:BELT.Yellow,
	bossBelt:BELT.Tan,
	wallWindowHeight:175,
	wallWindowTop:215,
	backgroundClipLevel:200,
	cameraMin:-100,
	cameraMax:2000
};

const Level3Data = {
	level:3,
	maxEnemies: 5,
	spawnRate:function() {
		return (600 + Math.ceil(1200 * Math.random()) + Math.ceil(1200 * Math.random()));
	},
	scrollsLeft:true,
	allowedTime:799,
	enemyBelt:BELT.Tan,
	bossBelt:BELT.Brown,
	wallWindowHeight:175,
	wallWindowTop:215,
	backgroundClipLevel:300,
	cameraMin:-1000,
	cameraMax:350
};

const Level4Data = {
	level:4,
	maxEnemies: 5,
	spawnRate:function() {
		return (350 + Math.ceil(1175 * Math.random()) + Math.ceil(1175 * Math.random()));
	},
	scrollsLeft:false,
	allowedTime:699,
	enemyBelt:BELT.Brown,
	bossBelt:BELT.Red,
	wallWindowHeight:175,
	wallWindowTop:215,
	backgroundClipLevel:400,
	cameraMin:-100,
	cameraMax:2000
};

const Level5Data = {
	level:5,
	maxEnemies: 6,
	spawnRate:function() {
		return (150 + Math.ceil(1150 * Math.random()) + Math.ceil(1150 * Math.random()));
	},
	scrollsLeft:true,
	allowedTime:599,
	enemyBelt:BELT.Red,
	bossBelt:BELT.Black,
	wallWindowHeight:175,
	wallWindowTop:215,
	backgroundClipLevel:500,
	cameraMin:-1000,
	cameraMax:350
};