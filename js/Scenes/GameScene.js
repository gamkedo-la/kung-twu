//Game Play scene
function GameScene() {
	let testEnemy = null;//TODO: need another way to do this
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
		testEnemy.update(deltaTime);

		player.update(deltaTime);
	};

	const draw = function(deltaTime) {
		drawRect(0, 0, canvas.width, canvas.height, "blue");
		canvasContext.drawImage(tempBackground, 0, 0, canvas.width, canvas.height);

		testEnemy.draw(deltaTime);

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
		if(testEnemy === null) {
			const config = {
				x:canvas.width / 3, 
				y:3 * canvas.height / 5
			};

			testEnemy = new BasicEnemy(config);
		}
	};
}