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
	let screenPos = 0;

	this.transitionIn = function() {
		screenPos = camera.getPosition().x - canvas.width / 2;
		let mainMenuX = screenPos;
		const BUTTON_PADDING = 0.9 * buttonHeight;
		const mainMenuY = BUTTON_PADDING + (canvas.height / 2);
		const deltaY = 2 * BUTTON_PADDING;
        
		if(buttons.length === 0) {
			buttons.push(buildResumeButton(mainMenuX, mainMenuY, buttonHeight, buttonTitlePadding));

			mainMenuX = screenPos + (canvas.width / 2) - (buttons[0].getBounds().width / 2);
			buttons[0].updateXPosition(mainMenuX);

//			selectorPosition.x = mainMenuX - selector.width - (BUTTON_PADDING / 2);
//			selectorPosition.y = mainMenuY + (buttonHeight / 2) - (selector.height / 2);

			buttons.push(buildQuitButton(mainMenuX, mainMenuY + deltaY, buttonHeight, buttonTitlePadding));
			buttons.push(buildControlsButton(mainMenuX, mainMenuY + 2 * deltaY, buttonHeight, buttonTitlePadding));
			buttons.push(buildHelpButton(mainMenuX, mainMenuY + 3 * deltaY, buttonHeight, buttonTitlePadding));

//			buildLanguageButtons();

			buildBirds();
		} else {
			updateButtonPositions(screenPos + (canvas.width / 2) - (buttons[0].getBounds().width / 2));
			updateButtonTitles();
		}
	};

	this.transitionOut = function() {

	};

	this.run = function(deltaTime) {
		update(deltaTime);

//		draw(deltaTime, buttons, selectorPositionsIndex);
		draw(deltaTime, buttons);
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
		for(let i = 0; i < birds.length; i++) {
			birds[i].update(deltaTime);
		}
	};

	const checkButtons = function() {
		let wasClicked = false;
		for(let i = 0; i < buttons.length; i++) {
			wasClicked = buttons[i].respondIfClicked(mouseX, mouseY);
			if(wasClicked) {break;}
		}
	};

	const buildResumeButton = function(x, y, height, padding) {
		const thisClick = function() {
//			SceneState.popState();
			console.log(`Resuming in Resume Button`);
			pauseManager.resumeGame(CAUSE.Keypress);
		};

		return new UIButton(STRINGS_KEY.Resume, x, y, height, padding, thisClick, Color.Purple);
	};

	const buildQuitButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.TITLE);
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
		for(let i = 0; i < buttons.length; i++) {
			buttons[i].updateXPosition(newPosition);
		}
	};

	const updateButtonTitles = function() {
		for(let i = 0; i < buttons.length; i++) {
			buttons[i].updateTitle();
		}
	};

	const buildBirds = function() {
		birds.push(new Bird({x:600, y: 100}, {x:-6, y:6}, 0.75));
		birds.push(new Bird({x:200, y: 400}, {x:18, y:-15}, 1.25));
		birds.push(new Bird({x:100, y: 100}, {x:7, y:7}, 0.75));
	};

	const printMenu = function(menuItems, selected) {
		for(let i = 0; i < menuItems.length; i++) {
			menuItems[i].draw();
		}
	};

	const draw = function(deltaTime, buttons, selectorPositionIndex) {
		// render the menu background
		drawBG();
		
		for(let i = 0; i < birds.length; i++) {
			if(birds[i].scale < 1.0) {
				birds[i].draw();
			}
		}

		drawTitle();

		for(let i = 0; i < birds.length; i++) {
			if(birds[i].scale >= 1.0) {
				birds[i].draw();
			}
		}

		// render menu
		printMenu(buttons, selectorPositionIndex);	
	};
	
	const drawBG = function() {
		canvasContext.drawImage(titleScreenBG, screenPos, 0);
		canvasContext.drawImage(titleScreenDecore, screenPos, 0);        
	};
	
	const drawTitle = function() {
		colorText(getLocalizedStringForKey(STRINGS_KEY.Paused), screenPos + canvas.width / 2, TITLE_Y_POS, Color.White, Fonts.MainTitle, TextAlignment.Center);
	};
}