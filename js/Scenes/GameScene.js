//Game Play scene
function GameScene() {
	const GRAVITY = 500;
	let testEnemy1 = null;//TODO: need another way to do this
	let testEnemy2 = null;//TODO: need another way to do this
	this.transitionIn = function() {
		initializePlayerIfReqd();

		initializeEnemies();
		
		initializeLevel();
	};

	this.transitionOut = function() {

	};

	this.run = function(deltaTime) {
		update(deltaTime);

		draw(deltaTime);
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
		testEnemy1.update(deltaTime, GRAVITY);
		testEnemy2.update(deltaTime, GRAVITY);

		player.update(deltaTime, GRAVITY);
	};

	const draw = function(deltaTime) {
		drawRect(0, 0, canvas.width, canvas.height, "blue");
		canvasContext.drawImage(tempBackground, 0, 0, canvas.width, canvas.height);

		testEnemy1.draw(deltaTime);
		testEnemy2.draw(deltaTime);

		player.draw(deltaTime);
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