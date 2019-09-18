//Pause Scene
//Settings Scene
function PauseScene() {
	const TITLE_Y_POS = 100;
//	let selectorPositionsIndex = 0;
	const selections = [
		SCENE.TITLE,
		SCENE.GAME,
		SCENE.CONTROLS
	];
	const buttonHeight = 25;//TODO: Adjust this size based on custom font
	const buttonTitlePadding = 2;
	const buttons = [];
	const birds = [];

	this.transitionIn = function() {
		canvasContext.setTransform(1, 0, 0, 1, 0, 0);

		let mainMenuX = 0;
		const BUTTON_PADDING = 0.9 * buttonHeight;
		const mainMenuY = BUTTON_PADDING + (canvas.height / 2);
		const deltaY = 2 * BUTTON_PADDING;
        
		if(buttons.length === 0) {
			buttons.push(buildResumeButton(mainMenuX, mainMenuY, buttonHeight, buttonTitlePadding));

			mainMenuX = (canvas.width / 2) - (buttons[0].getBounds().width / 2);
			buttons[0].updateXPosition(mainMenuX);

//			selectorPosition.x = mainMenuX - selector.width - (BUTTON_PADDING / 2);
//			selectorPosition.y = mainMenuY + (buttonHeight / 2) - (selector.height / 2);

			buttons.push(buildQuitButton(mainMenuX, mainMenuY + deltaY, buttonHeight, buttonTitlePadding));
			buttons.push(buildControlsButton(mainMenuX, mainMenuY + 2 * deltaY, buttonHeight, buttonTitlePadding));
			buttons.push(buildHelpButton(mainMenuX, mainMenuY + 3 * deltaY, buttonHeight, buttonTitlePadding));

			buildBirds();
		} else {
			updateButtonTitles();
			updateButtonPositions((canvas.width / 2) - (buttons[0].getBounds().width / 2));
		}
	};

	this.transitionOut = function() {
		this.properties = null;
	};

	this.run = function(deltaTime) {
		update(deltaTime);

		draw(buttons);
	};

	this.control = function(newKeyEvent, pressed) {
		if (pressed) {//only act on key released events => prevent multiple changes on single press
			return false;
		}
		
		switch (newKeyEvent) {
		case ALIAS.UP:
		case ALIAS.LEFT:
//			selectorPositionsIndex--;
//			if (selectorPositionsIndex < 0) {
//				selectorPositionsIndex += selections.length;
//			}
			return true;
		case ALIAS.DOWN:
		case ALIAS.RIGHT:
//			selectorPositionsIndex++;
//			if (selectorPositionsIndex >= selections.length) {
//				selectorPositionsIndex = 0;
//			}
			return true;
		case ALIAS.BACK:
			pauseManager.resumeGame(CAUSE.Keypress);
			return true;
		case ALIAS.SELECT1:
//			SceneState.setState(selections[selectorPositionsIndex]);
			return true;
		case ALIAS.SELECT2:
//			SceneState.setState(SCENE.GAME);
			return true;
		case ALIAS.POINTER:
			checkButtons();
			return true;
		}
		
		return false;
	};

	const update = function(deltaTime) {
		for(let bird of birds) {
			bird.update(deltaTime);
		}
	};

	const checkButtons = function() {
		let wasClicked = false;
		for(let button of buttons) {
			wasClicked = button.respondIfClicked(mouseX, mouseY);
			if(wasClicked) {break;}
		}
	};

	const buildResumeButton = function(x, y, height, padding) {
		const thisClick = function() {
			pauseManager.resumeGame(CAUSE.Keypress);
		};

		return new UIButton(STRINGS_KEY.Resume, x, y, height, padding, thisClick, Color.Purple);
	};

	const buildQuitButton = function(x, y, height, padding) {
		const thisClick = function() {
			if(pauseManager.getIsPaused()) {
				pauseManager.resumeGame(CAUSE.Keypress);
			}

			SceneState.setState(SCENE.TITLE, {didQuit:true});
		};

		return new UIButton(STRINGS_KEY.Quit, x, y, height, padding, thisClick, Color.Orange);
	};

	const buildControlsButton = function(x, y, height, padding) {
		const thisClick = function() {
//			SceneState.setState(SCENE.CONTROLS);
			console.log("Going to the Controls Screen now...");
		};

		return new UIButton(STRINGS_KEY.Controls, x, y, height, padding, thisClick, Color.Aqua);
	};

	const buildHelpButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.HELP);
		};

		return new UIButton(STRINGS_KEY.Help, x, y, height, padding, thisClick, Color.Green);
	};

	const updateButtonPositions = function(newPosition) {
		for(let button of buttons) {
			button.updateXPosition(newPosition);
		}
	};

	const updateButtonTitles = function() {
		for(let button of buttons) {
			button.updateTitle();
		}
	};

	const buildBirds = function() {
		birds.push(new Bird({x:600, y: 100}, {x:-6, y:6}, 0.75));
		birds.push(new Bird({x:200, y: 400}, {x:18, y:-15}, 1.25));
		birds.push(new Bird({x:100, y: 100}, {x:7, y:7}, 0.75));
	};

	const printButtons = function() {
		for(let button of buttons) {
			button.draw();
		}
	};

	const draw = function() {
		// render the menu background
		drawBG();
		
		for(let bird of birds) {
			if(bird.scale < 1.0) {
				bird.draw();
			}
		}

		drawTitle();

		for(let bird of birds) {
			if(bird.scale < 1.0) {
				bird.draw();
			}
		}

		// render menu
		printButtons();	
	};
	
	const drawBG = function() {
		canvasContext.drawImage(titleScreenBG, 0, 0);
		canvasContext.drawImage(titleScreenDecore, 0, 0);        
	};
	
	const drawTitle = function() {
		colorText(getLocalizedStringForKey(STRINGS_KEY.Paused), canvas.width / 2, TITLE_Y_POS, Color.White, Fonts.MainTitle, TextAlignment.Center);
	};
}