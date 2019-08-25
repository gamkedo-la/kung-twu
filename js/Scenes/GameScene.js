//Game Play scene
function GameScene() {
	const GRAVITY = 500;
	let collisionManager;
	const enemies = [];
	const camera = new Camera();
	let floor;
	let floorMidHeight = 0;

	this.transitionIn = function() {
		floor = new InfiniteFloor();
		floorMidHeight = floor.getMidHeight();
		initializePlayerIfReqd();
		collisionManager = new CollisionManager(player);

		initializeEnemies();
		
		initializeLevel();
	};

	this.transitionOut = function() {

	};

	this.run = function(deltaTime) {
		update(deltaTime);

		collisionManager.doCollisionChecks();

		draw();
	};

	this.control = function(newKeyEvent) {
		switch (newKeyEvent) {
		case ALIAS.CHEATS:
			CHEATS_ACTIVE = !CHEATS_ACTIVE;
			return true;
		case ALIAS.DEBUG:
			DEBUG = !DEBUG;
			console.log("Debug? " + DEBUG);
			return true;
		}
        
		return false;
	};

	const update = function(deltaTime) {
		floor.update(camera.getPosition().x);

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
		canvasContext.drawImage(tempBackground, 0, 0, canvas.width, canvas.height);
		floor.draw();

		for(let i = 0; i < enemies.length; i++) {
			enemies[i].draw();
		}

		player.draw();
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

	const initializeLevel = function() {
		camera.attach(player);
	};

	const initializeEnemies = function() {
		for(let i = 1; i < 3; i++) {
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