//TitleScene
function TitleScene() {
	const MENU_BG_COLOR = "#010139";

	let selectorPositionsIndex = 0;
	let selectorPosition = {x:0, y:0};
	let selectorSprite;
	const selections = [
		SCENE.GAME,
		SCENE.HELP,
		SCENE.SETTINGS,
		SCENE.CREDITS
	];
	const buttonHeight = 25;//TODO: Adjust this size based on custom font
	const buttonTitlePadding = 2;
	const buttons = [];

	this.transitionIn = function() {
		let mainMenuX = 0;
		const BUTTON_PADDING = 0.9 * buttonHeight;
		const mainMenuY = BUTTON_PADDING + (canvas.height / 2);
		const deltaY = 2 * BUTTON_PADDING;
        
		if(buttons.length === 0) {
			buttons.push(buildPlayButton(mainMenuX, mainMenuY, buttonHeight, buttonTitlePadding));

			mainMenuX = (canvas.width / 2) - (buttons[0].getBounds().width / 2);
			buttons[0].updateXPosition(mainMenuX);

			selectorPosition.x = mainMenuX - selector.width - (BUTTON_PADDING / 2);
			selectorPosition.y = mainMenuY + (buttonHeight / 2) - (selector.height / 2);

			buttons.push(buildHelpButton(mainMenuX, mainMenuY + deltaY, buttonHeight, buttonTitlePadding));
			buttons.push(buildSettingsButton(mainMenuX, mainMenuY + 2 * deltaY, buttonHeight, buttonTitlePadding));
			buttons.push(buildCreditsButton(mainMenuX, mainMenuY + 3 * deltaY, buttonHeight, buttonTitlePadding));

			buildLanguageButtons();
		} else {
			updateButtonTitles();
		}
	};

	this.transitionOut = function() {

	};

	this.run = function(deltaTime) {
		update(deltaTime);

		draw(deltaTime, buttons, selectorPositionsIndex);
	};

	this.control = function(newKeyEvent, pressed, pressedKeys) {
		if((!didInteract) && ((newKeyEvent == LEFT_MOUSE_BUTTON) || (newKeyEvent == RIGHT_MOUSE_BUTTON))) {
			didInteract = true;
			currentBackgroundMusic.loopSong(menuMusic);
		}

		if (pressed) {//only act on key released events => prevent multiple changes on single press
			return false;
		}
        
		switch (newKeyEvent) {
		case ALIAS.UP:
		case ALIAS.LEFT:
			selectorPositionsIndex--;
			if (selectorPositionsIndex < 0) {
				selectorPositionsIndex += selections.length;
			}
			selectorPosition.y = buttons[selectorPositionsIndex].getBounds().y + (buttonHeight / 2) - (selector.height / 2);
			return true;
		case ALIAS.DOWN:
		case ALIAS.RIGHT:
			selectorPositionsIndex++;
			if (selectorPositionsIndex >= selections.length) {
				selectorPositionsIndex = 0;
			}
			selectorPosition.y = buttons[selectorPositionsIndex].getBounds().y + (buttonHeight / 2) - (selector.height / 2);
			return true;
		case ALIAS.SELECT1:
			SceneState.setState(selections[selectorPositionsIndex]);
			return true;
		case ALIAS.SELECT2:
			SceneState.setState(SCENE.GAME);
			return true;
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

	const buildPlayButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.GAME);
		};

		return new UIButton(STRINGS_KEY.Play,
			x, y, height, padding, thisClick, Color.Red);
	};

	const buildHelpButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.HELP);
		};

		return new UIButton(STRINGS_KEY.Help, x, y, height, padding, thisClick, Color.Green);
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

	const updateButtonTitles = function() {
		for(let i = 0; i < buttons.length; i++) {
			buttons[i].updateTitle();
		}
	};

	const buildLanguageButtons = function() {
		const languages = Object.keys(Language);

		const interButtonPadding = 3 * buttonHeight / 2;
		let xPos = 0;//interButtonPadding;
		let totalButtonWidth = 0;
		const languageButtons = [];
		for(let i = 0; i < languages.length; i++) {
			const thisClick = function() {
				currentLanguage = STRINGS_KEY[languages[i]];
				localStorageHelper.setItem(localStorageKey.Language, currentLanguage);
				updateButtonTitles();
			};

			languageButtons.push(new UIButton(STRINGS_KEY[languages[i]], 
				xPos, canvas.height - (9 * buttonHeight / 2), 
				buttonHeight, buttonTitlePadding, thisClick, Color.Red));

			totalButtonWidth += (languageButtons[languageButtons.length - 1].getBounds().width);
		}

		totalButtonWidth += ((languages.length - 1) * interButtonPadding);

		let currentX = ((canvas.width - totalButtonWidth) / 2);

		for(let i = 0; i < languageButtons.length; i++) {
			const thisButton = languageButtons[i];
			thisButton.updateXPosition(currentX);
			currentX += (thisButton.getBounds().width + interButtonPadding);
			buttons.push(thisButton);
		}
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
	};
	
	const draw = function(deltaTime, buttons, selectorPositionIndex) {
		// render the menu background
		drawBG();
        
		drawTitle();

		// render menu
		printMenu(buttons, selectorPositionIndex);        
	};
	
	const drawBG = function() {
		canvasContext.drawImage(titleScreenBG,0,0);
		canvasContext.drawImage(titleScreenDecore,0,0);
		canvasContext.drawImage(titleBlock,canvas.width/3,canvas.height/2);
		canvasContext.drawImage(selector, selectorPosition.x, selectorPosition.y);
	};
    
	const drawTitle = function() {
		const titleXPos = (canvas.width - titleImage.width) / 2;
		canvasContext.drawImage(titleImage, titleXPos, canvas.height / 10);
		colorText(getLocalizedStringForKey(STRINGS_KEY.Subtitle), canvas.width / 2, canvas.height / 3 + 40, Color.White, Fonts.Subtitle, TextAlignment.Center);
	};
        
	return this;
}