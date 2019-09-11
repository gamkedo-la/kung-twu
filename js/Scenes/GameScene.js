//Game Play scene
function GameScene() {
	const GRAVITY = 1500;
	let collisionManager;
	const enemies = [];
	const camera = new Camera();
	const VERTICAL_OFFSET = 50;
	const columnManager = new InfiniteColumn(VERTICAL_OFFSET);
	let subfloor;
	let floor;
	let roof;
	let wall;
	let floorMidHeight = 0;
	let timeTilSpawn = 0;

	this.transitionIn = function() {
		initializeFloor(VERTICAL_OFFSET);
		InitializeRoof();
		InitializeBackWall();
		initializeColumnPositions();
		
		aiManager = new AIManager();
		timer.registerEvent(EVENT.EnemySpawn);
		initializePlayerIfReqd();
		
		initializeCollisionManager(player);
		
		initializeLevel();

		currentBackgroundMusic.loopSong(gameMusic);
	};

	this.transitionOut = function() {

	};

	this.run = function(deltaTime) {
		update(deltaTime);

		collisionManager.doCollisionChecks();
		processDefeatedEntities(collisionManager.defeatedEntities);

		draw();
	};

	this.control = function(newKeyEvent, pressed, pressedKeys) {
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

	const processDefeatedEntities = function(defeatedEntities) {
		for(let defeatedEntity of defeatedEntities) {
			if(defeatedEntity === player) {
				console.log("Game over man! Game Over!");
			} else {
				const enemyIndex = enemies.findIndex(function(element) {
					return (element === defeatedEntity);
				});
	
				enemies.splice(enemyIndex, 1);
				collisionManager.removeEntity(defeatedEntity);
			}
		}
	};

	const update = function(deltaTime) {
		const newCameraX = camera.getPosition().x;
		updateGameField(newCameraX);
		const floorImageShifts = floor.update(newCameraX);
		columnManager.update(newCameraX);
		subfloor.update(newCameraX, floorImageShifts);
		roof.update(newCameraX, floorImageShifts);
		wall.update(newCameraX, floorImageShifts);

		player.update(deltaTime, GRAVITY, floorMidHeight);

		const playerPos = player.getPosition();
//		spawnNewEnemies(newCameraX);
		for(let i = 0; i < enemies.length; i++) {
			enemies[i].update(deltaTime, GRAVITY, playerPos, floorMidHeight);
		}

		camera.update(deltaTime);
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

		floor = new InfiniteFloor(verticalOffset);
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

	const initializeColumnPositions = function() {
		columnManager.positionFirstColumn(100 + camera.getPosition().x + 2 * canvas.width / 3);
	};

	const initializeCollisionManager = function(player) {
		collisionManager = new CollisionManager(player);
	};

	const initializeLevel = function() {
		camera.attach(player);
	};

	const drawBackground = function(cameraX, roofTop) {
		const vertAmtToClip = 175;//175 based on back wall image
		const startClippingY = titleScreenBG.height - vertAmtToClip - ((currentLevel) * 100);//100 makes it look good
		const startDrawingY = roofTop + 215;//215 based on back wall image
		canvasContext.drawImage(titleScreenBG, 
			0, startClippingY, titleScreenBG.width, vertAmtToClip, 
			cameraX - canvas.width / 2, startDrawingY, canvas.width, vertAmtToClip);
	};

	const spawnNewEnemies = function(cameraXPos) {
		if(enemies.length >= 6) {return;}
		const timeSince = timer.timeSinceUpdateForEvent(EVENT.EnemySpawn);
		if(timeSince > timeTilSpawn) {
			timer.updateEvent(EVENT.EnemySpawn);
			timeTilSpawn = 250 + ((TOTAL_LEVELS - currentLevel) * 250) + Math.ceil(1250 * Math.random()) + Math.ceil(1250 * Math.random());
			spawnEnemyAtLeft(cameraXPos, (timeTilSpawn % 2) === 0);
		}
	};

	const spawnEnemyAtLeft = function(cameraXPos, atLeft) {
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