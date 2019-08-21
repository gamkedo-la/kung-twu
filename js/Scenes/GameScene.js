//Game Play scene
function GameScene() {
	const GRAVITY = 500;
	const collisionManager = new CollisionManager(player);
	let testEnemy1 = null;//TODO: need another way to do this
	let testEnemy2 = null;//TODO: need another way to do this
	let camera = new Camera();

	this.transitionIn = function() {
		initializePlayerIfReqd();

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
		player.update(deltaTime, GRAVITY);

		const playerPos = player.getPosition();
		testEnemy1.update(deltaTime, GRAVITY, playerPos);
		testEnemy2.update(deltaTime, GRAVITY, playerPos);

		camera.update(deltaTime);
	};

	const draw = function() {
		// Pan the camera by centering the canvas on the player's position
		// TODO: Implement a camera system that can follow objects or be attached to static position
		camera.draw();
		drawRect(0, 0, canvas.width, canvas.height, "blue");
		canvasContext.drawImage(tempBackground, 0, 0, canvas.width, canvas.height);

		testEnemy1.draw();
		testEnemy2.draw();

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
		if(testEnemy1 === null) {
			const config = {
				x:canvas.width / 3, 
				y:3 * canvas.height / 5
			};

			testEnemy1 = new BasicEnemy(config);
		}

		if(testEnemy2 === null) {
			const config = {
				x:canvas.width / 8, 
				y:3 * canvas.height / 5
			};

			testEnemy2 = new BasicEnemy(config);
		}
	};
}