//Game Play scene
function GameScene() {
	const GRAVITY = 1500;
	let collisionManager;
	const enemies = [];
	const camera = new Camera();
	const bkgdManager = new BackgroundManager();
	const columnManager = new InfiniteColumn();
	let floor;
	let roof;
	let floorMidHeight = 0;

	this.transitionIn = function() {
		initializeFloor();
		InitializeRoof();
		initializeBackgroundManager();
		initializeColumnPositions();
		
		aiManager = new AIManager();
		initializePlayerIfReqd();
		
		initializeCollisionManager(player);

		initializeEnemies();
		
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
		const floorImageShifts = floor.update(newCameraX);
		bkgdManager.update(floorImageShifts);
		columnManager.update(newCameraX);
		roof.update(newCameraX, floorImageShifts);

		player.update(deltaTime, GRAVITY, floorMidHeight);

		const playerPos = player.getPosition();
		for(let i = 0; i < enemies.length; i++) {
			enemies[i].update(deltaTime, GRAVITY, playerPos, floorMidHeight);
		}

		camera.update(deltaTime);
	};

	const draw = function() {
		// Pan the camera by centering the canvas on the player's position
		// TODO: Implement a camera system that can follow objects or be attached to static position
		camera.draw();
		bkgdManager.draw();
		floor.draw();

		for(let i = 0; i < enemies.length; i++) {
			enemies[i].draw();
		}

		player.draw();

		columnManager.draw(camera.getPosition().x);
		roof.draw();
	};

	const initializeFloor = function() {
		floor = new InfiniteFloor();
		floorMidHeight = floor.getMidHeight();
	};

	const InitializeRoof = function() {
		roof = new InfiniteRoof(canvas.height - tempBackground.height);
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

	const initializeBackgroundManager = function() {
		const backWall = new BackgroundImage(-2, tempBackground, {x:0, y:canvas.height - tempBackground.height});
		bkgdManager.addImage(backWall);
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

	const initializeEnemies = function() {
		for(let i = 1; i < 2; i++) {
			const config = {
				x:i * canvas.width / 7, 
				y:3 * canvas.height / 5
			};

			const anEnemy = new BasicEnemy(config);
			collisionManager.addEntity(anEnemy);
			enemies.push(anEnemy);
		}
	};
}