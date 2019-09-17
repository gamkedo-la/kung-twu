//Game Over Scene
function GameOverScene() {
	let selectorPositionsIndex = 0;
	let selectorPosition = {x:0, y:0};
	let titleBlockPosition = {x:0, y:0};
	const selections = [
		SCENE.GAME,
		SCENE.TITLE,
		SCENE.SETTINGS,
		SCENE.CREDITS
	];
	const buttonHeight = 25;//TODO: Adjust this size based on custom font
	const buttonTitlePadding = 2;
	const buttons = [];
	const birds = [];
	let screenPos = 0;
	let score = 0;

	this.transitionIn = function() {
		if(this.properties) {
			score = this.properties.score;
		}

		if(canvasContext.mozCurrentTransform != undefined) {
			screenPos = -canvasContext.mozCurrentTransform[4];
		} else {
			screenPos = -canvasContext.getTransform().m41;
		}

		let mainMenuX = 0;
		const BUTTON_PADDING = 0.9 * buttonHeight;
		const mainMenuY = BUTTON_PADDING + (2 * canvas.height / 3);
		const deltaY = 2 * BUTTON_PADDING;
		
		if(buttons.length === 0) {
			buttons.push(buildContinueButton(mainMenuX, mainMenuY, buttonHeight, buttonTitlePadding));

			const button0Bounds = buttons[0].getBounds();
			mainMenuX = screenPos + (canvas.width / 2) - (button0Bounds.width / 2);
			buttons[0].updateXPosition(mainMenuX);

			selectorPosition.x = mainMenuX - selector.width - (BUTTON_PADDING / 2);
			selectorPosition.y = mainMenuY + (buttonHeight / 2) - (selector.height / 2);

			titleBlockPosition.x = selectorPosition.x - (titleBlock.width - (button0Bounds.width + (BUTTON_PADDING / 2) + selector.width)) / 2;
			titleBlockPosition.y = mainMenuY - BUTTON_PADDING;

			buttons.push(buildEndButton(mainMenuX, mainMenuY + deltaY, buttonHeight, buttonTitlePadding));
			buttons.push(buildSettingsButton(mainMenuX, mainMenuY + 2 * deltaY, buttonHeight, buttonTitlePadding));
			buttons.push(buildCreditsButton(mainMenuX, mainMenuY + 3 * deltaY, buttonHeight, buttonTitlePadding));

			buildBirds();
		}

		currentBackgroundMusic.loopSong(gameOverMusic);
	};

	this.transitionOut = function() {
	};

	this.run = function(deltaTime) {
		update(deltaTime);

		draw(deltaTime, buttons, selectorPositionsIndex);
	};

	this.control = function(newKeyEvent, pressed) {
		if((!didInteract) && ((newKeyEvent == LEFT_MOUSE_BUTTON) || (newKeyEvent == RIGHT_MOUSE_BUTTON))) {
			didInteract = true;
			currentBackgroundMusic.loopSong(menuMusic);
		}

		if (pressed) {//only act on key released events => prevent multiple changes on single press
			return false;
		}
		
		switch (newKeyEvent) {
		case ALIAS.HELP:
			SceneState.setState(SCENE.HELP);
			return true;
		case ALIAS.CREDITS:
			SceneState.setState(SCENE.CREDITS);
			return true;
		case ALIAS.SETTINGS:
			SceneState.setState(SCENE.SETTINGS);
			return true;
		case ALIAS.CHEATS:
			CHEATS_ACTIVE = !CHEATS_ACTIVE;
			return true;
		case ALIAS.DEBUG:
			DEBUG = !DEBUG;
			return true;
		case ALIAS.POINTER:
			checkButtons();
			return true;
		}
		
		return false;
	};

	const buildContinueButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.GAME, {restartLevel:true});
		};

		return new UIButton(STRINGS_KEY.Continue, x, y, height, padding, thisClick, Color.Red);
	};

	const buildEndButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.TITLE, {didQuit:true});
		};

		return new UIButton(STRINGS_KEY.End, x, y, height, padding, thisClick, Color.Green);
	};

	const buildSettingsButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.SETTINGS);
		};

		return new UIButton(STRINGS_KEY.Settings, x, y, height, padding, thisClick, Color.Aqua);
	};

	const buildCreditsButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.CREDITS);
		};

		return new UIButton(STRINGS_KEY.Credits, x, y, height, padding, thisClick, Color.Purple);
	};

	const buildBirds = function() {
		birds.push(new Bird({x:600, y: 100}, {x:-6, y:6}, 0.75));
		birds.push(new Bird({x:200, y: 400}, {x:18, y:-15}, 1.25));
		birds.push(new Bird({x:100, y: 100}, {x:7, y:7}, 0.75));
	};

	const checkButtons = function() {
		let wasClicked = false;
		for(let i = 0; i < buttons.length; i++) {
			wasClicked = buttons[i].respondIfClicked(mouseX, mouseY);
			if(wasClicked) {break;}
		}
	};
	
	const printMenu = function(menuItems, selected) {
		for(let i = 0; i < menuItems.length; i++) {
			menuItems[i].draw();
		}
	};
	
	const update = function(deltaTime) {
		processUserInput();

		for(let i = 0; i < birds.length; i++) {
			birds[i].update(deltaTime);
		}
	};

	const processUserInput = function() {
		const navKeys = inputProcessor.getNewlyActiveKeys();
		for(let i = 0; i < navKeys.length; i++) {
			const newNavAction = keyMapper.getNavActionForKey(navKeys[i]);
			if(newNavAction != null) {
				switch(newNavAction) {
				case NAV_ACTION.UP:
				case NAV_ACTION.LEFT:
					selectorPositionsIndex--;
					if (selectorPositionsIndex < 0) {
						selectorPositionsIndex += selections.length;
					}
					selectorPosition.y = buttons[selectorPositionsIndex].getBounds().y + (buttonHeight / 2) - (selector.height / 2);
					break;			
				case NAV_ACTION.DOWN:
				case NAV_ACTION.RIGHT:
					selectorPositionsIndex++;
					if (selectorPositionsIndex >= selections.length) {
						selectorPositionsIndex = 0;
					}
					selectorPosition.y = buttons[selectorPositionsIndex].getBounds().y + (buttonHeight / 2) - (selector.height / 2);
					break;
				case NAV_ACTION.SELECT:
					SceneState.setState(selections[selectorPositionsIndex]);
					break;
				case NAV_ACTION.BACK:
					break;//nowhere to go 'back' to
				case NAV_ACTION.PAUSE:

				}
			}
		}

		inputProcessor.clear();
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
		canvasContext.drawImage(titleBlock, titleBlockPosition.x, titleBlockPosition.y);
		canvasContext.drawImage(selector, selectorPosition.x, selectorPosition.y);
	};
	
	const drawTitle = function() {
		const scale = 2/3;
		const drawY = 25;
		const titleXPos = (canvas.width - (scale * titleImage.width)) / 2;
		canvasContext.drawImage(titleImage, 0, 0, titleImage.width, titleImage.height, screenPos + titleXPos, drawY, scale * titleImage.width, scale * titleImage.height);

		colorText(getLocalizedStringForKey(STRINGS_KEY.GameOverTitle), screenPos + canvas.width / 2, canvas.height / 3 - 60, Color.White, Fonts.Subtitle, TextAlignment.Center);
		
		colorText(getLocalizedStringForKey(STRINGS_KEY.HighScore), screenPos + 60, canvas.height / 3, Color.White, Fonts.Subtitle, TextAlignment.Left);
		let highScore = localStorageHelper.getObject(localStorageKey.HighScore);
		colorText(highScore, screenPos + 270, canvas.height / 3, Color.White, Fonts.Subtitle, TextAlignment.Left);
		
		colorText(getLocalizedStringForKey(STRINGS_KEY.Score), screenPos + 60, canvas.height / 3 + 60, Color.White, Fonts.Subtitle, TextAlignment.Left);
		let scoreString = score.toString();
		while(scoreString.length < 9) {
			scoreString = "0" + scoreString;
		}
		colorText(scoreString, screenPos + 270, canvas.height / 3 + 60, Color.White, Fonts.Subtitle, TextAlignment.Left);
	};
		
	return this;
}