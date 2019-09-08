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
	const birds = [];

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

			buildBirds();
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

	const buildBirds = function() {
		birds.push(new Bird({x:600, y: 100}, {x:-10, y:10}));
		birds.push(new Bird({x:200, y: 400}, {x:8, y:-5}));
		birds.push(new Bird({x:100, y: 100}, {x:7, y:7}));
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
		for(let i = 0; i < birds.length; i++) {
			birds[i].update(deltaTime);
		}
	};
	
	const draw = function(deltaTime, buttons, selectorPositionIndex) {
		// render the menu background
		drawBG();
		
		for(let i = 0; i < birds.length; i++) {
			birds[i].draw();
		}

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

function Bird(pos, vel) {
	this.position = pos;
	this.velocity = vel;
	const soarAdjustment = Math.floor(1000 * Math.random());
	this.animation = new SpriteAnimation(name, //string identifier for this animation
		titleScreenBird, //image in which the frames reside
		[0, 1, 2, 3, 0, 1], //array of frame indexes to use for this animation
		41, //width of each frame
		24, //height of each frame
		[64, 64, 64, 64, 64, 3000 + soarAdjustment],//array of milliseconds to show each frame
		false, //boolean indicates if animation reverses (true)
		true); //boolean indicates if animation loops (true)
	this.update = function(deltaTime) {
		this.position.x += (this.velocity.x * deltaTime / 1000);
		this.position.y += (this.velocity.y * deltaTime / 1000);
		this.animation.update(deltaTime);
	};
	this.draw = function() {
		this.animation.drawAt(this.position.x, this.position.y, false);
	};
}