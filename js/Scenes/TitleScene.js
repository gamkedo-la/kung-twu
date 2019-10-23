//TitleScene
function TitleScene() {
	this.name = "Title Scene";
	let selectorPositionsIndex = 0;
	let selectorPosition = {x:0, y:0};
	let titleBlockPosition = {x:0, y:0};
	let titleBlockWidth = 0;
	const selections = [
		SCENE.GAME,
		SCENE.HELP,
		SCENE.SETTINGS,
		SCENE.CREDITS,
		SCENE.ASSIST
	];
	const buttonHeight = 25;
	const buttonTitlePadding = 2;
	const BUTTON_PADDING = 0.75 * buttonHeight;
	const buttons = [];
	const languageButtons = [];
	const birds = [];

	this.transitionIn = function() {
		canvasContext.setTransform(1, 0, 0, 1, 0, 0);
		if(keyMapper === null) {//we've never initialied the input/key mapping objects
			keyMapper = new KeyMapper();
			inputProcessor = new InputProcessor();
		}

		let mainMenuX = 0;
		
		const mainMenuY = BUTTON_PADDING + (canvas.height / 2);
		const deltaY = 2 * BUTTON_PADDING;
        
		if(buttons.length === 0) {
			buttons.push(buildPlayButton(mainMenuX, mainMenuY, buttonHeight, buttonTitlePadding));

			const button0Bounds = buttons[0].getBounds();
			mainMenuX = (canvas.width / 2) - (button0Bounds.width / 2);
			buttons[0].updateXPosition(mainMenuX);

			selectorPosition.x = mainMenuX - selector.width - (BUTTON_PADDING / 2);
			selectorPosition.y = mainMenuY + (buttonHeight / 2) - (selector.height / 2);

			titleBlockPosition.x = selectorPosition.x - (titleBlock.width - (button0Bounds.width + (BUTTON_PADDING / 2) + selector.width)) / 2;
			titleBlockPosition.y = canvas.height/2;

			buttons.push(buildHelpButton(mainMenuX, mainMenuY + deltaY, buttonHeight, buttonTitlePadding));
			buttons.push(buildSettingsButton(mainMenuX, mainMenuY + 2 * deltaY, buttonHeight, buttonTitlePadding));
			buttons.push(buildCreditsButton(mainMenuX, mainMenuY + 3 * deltaY, buttonHeight, buttonTitlePadding));
			buttons.push(buildAssistButton(mainMenuX, mainMenuY + 4 * deltaY, buttonHeight, buttonTitlePadding));

			buildLanguageButtons();

			buildBirds();
		} else {
			updateButtonTitles();
		}

		updateButtonPositions();
		findMenuWidth();
	};

	this.transitionOut = function() {

	};

	this.run = function(deltaTime) {
		update(deltaTime);

		draw();
	};

	this.control = function(newKeyEvent, pressed) {
		if((!didInteract) && ((newKeyEvent == MouseButton.LEFT) || (newKeyEvent == MouseButton.RIGHT))) {
			didInteract = true;
			// @SoundHook: currentBackgroundMusic.loopSong(menuMusic);
			sound.playBGM(Sounds.BGM_Title);
		}

		if (pressed) {//only act on key released events => prevent multiple changes on single press
			return false;
		}
        
		switch (newKeyEvent) {
		case ALIAS.SELECT2:
			SceneState.setState(SCENE.GAME);
			// @SoundHook: menuSelectionSound.play();
			sound.playSFX(Sounds.SFX_MenuSelect);
			return true;
		case ALIAS.HELP:
			SceneState.setState(SCENE.HELP);
			// @SoundHook: menuSelectionSound.play();
			sound.playSFX(Sounds.SFX_MenuSelect);
			return true;
		case ALIAS.ASSIST:
			SceneState.setState(SCENE.ASSIST);
			// @SoundHook: menuSelectionSound.play();
			sound.playSFX(Sounds.SFX_MenuSelect);
			return true;
		case ALIAS.CREDITS:
			SceneState.setState(SCENE.CREDITS);
			// @SoundHook: menuSelectionSound.play();
			sound.playSFX(Sounds.SFX_MenuSelect);
			return true;
		case ALIAS.SETTINGS:
			SceneState.setState(SCENE.SETTINGS);
			// @SoundHook: menuSelectionSound.play();
			sound.playSFX(Sounds.SFX_MenuSelect);
			return true;
		case ALIAS.CHEATS:
			CHEATS_ACTIVE = !CHEATS_ACTIVE;
			// @SoundHook: menuSelectionSound.play();
			sound.playSFX(Sounds.SFX_MenuSelect);
			return true;
		case ALIAS.DEBUG:
			DEBUG = !DEBUG;
			// @SoundHook: menuSelectionSound.play();
			sound.playSFX(Sounds.SFX_MenuSelect);
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

	const buildAssistButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.ASSIST);
		};

		return new UIButton(STRINGS_KEY.Assist, x, y, height, padding, thisClick, Color.Orange);
	};

	const updateButtonTitles = function() {
		for(let button of buttons) {
			button.updateTitle();
		}

		findMenuWidth();
	};

	const findMenuWidth = function() {
		let maxWidth = 0;
		for(let button of buttons) {
			const thisBounds = button.getBounds();
			if(thisBounds.width > maxWidth) {
				maxWidth = thisBounds.width;
			}
		}
		titleBlockWidth = maxWidth + selector.width + (3 * BUTTON_PADDING);
		titleBlockPosition.x = selectorPosition.x - (3 * BUTTON_PADDING / 2);
	};

	const updateButtonPositions = function() {
		let maxWidth = 0;
		for(let button of buttons) {
			const thisWidth = button.getBounds().width;
			if(thisWidth > maxWidth) {maxWidth = thisWidth;}
		}

		const menuPos = (canvas.width / 2) - (maxWidth / 2) + selector.width / 2 + (1.5 * BUTTON_PADDING);
		for(let button of buttons) {
			button.updateXPosition(menuPos);
		}

		selectorPosition.x = menuPos - selector.width - (BUTTON_PADDING / 2);
	};

	const buildLanguageButtons = function() {
		const languages = Object.keys(Language);

		const interButtonPadding = buttonHeight;// 3 * buttonHeight / 2;
		let xPos = 0;//interButtonPadding;
		let totalButtonWidth = 0;
		const langButtons = [];
		for(let language of languages) {
			const thisClick = function() {
				currentLanguage = STRINGS_KEY[language];
				localStorageHelper.setItem(localStorageKey.Language, currentLanguage);
				updateButtonTitles();
			};

			langButtons.push(new UIButton(STRINGS_KEY[language], 
				xPos, canvas.height - (9 * buttonHeight / 2), 
				buttonHeight, buttonTitlePadding, thisClick, Color.Red, language));

			totalButtonWidth += (langButtons[langButtons.length - 1].getBounds().width);
		}

		totalButtonWidth += ((languages.length - 1) * interButtonPadding);

		let currentX = ((canvas.width - totalButtonWidth) / 2);

		for(let button of langButtons) {
			button.updateXPosition(currentX);
			currentX += (button.getBounds().width + interButtonPadding);
			languageButtons.push(button);
		}
	};

	const buildBirds = function() {
		birds.push(new Bird({x:600, y: 100}, {x:-6, y:6}, 0.75));
		birds.push(new Bird({x:200, y: 400}, {x:18, y:-15}, 1.25));
		birds.push(new Bird({x:100, y: 100}, {x:7, y:7}, 0.75));
	};

	const checkButtons = function() {
		let wasClicked = false;
		for(let button of buttons) {
			wasClicked = button.respondIfClicked(mouseX, mouseY);
			if(wasClicked) {break;}
		}

		for(let button of languageButtons) {
			wasClicked = button.respondIfClicked(mouseX, mouseY);
			if(wasClicked) {break;}
		}
	};
    
	const printMenu = function() {
		for(let button of buttons) {
			button.draw();
		}

		for(let button of languageButtons) {
			button.draw();
		}
	};
	
	const update = function(deltaTime) {
		processUserInput();

		for(let bird of birds) {
			bird.update(deltaTime);
		}
	};

	const processUserInput = function() {
		const navKeys = inputProcessor.getNewlyReleasedKeys();
		for(let key of navKeys) {
			const newNavAction = keyMapper.getNavAction(key);
			if(newNavAction != null) {
				switch(newNavAction) {
				case NAV_ACTION.UP:
				case NAV_ACTION.LEFT:
					selectorPositionsIndex--;
					if (selectorPositionsIndex < 0) {
						selectorPositionsIndex += selections.length;
					}
					selectorPosition.y = buttons[selectorPositionsIndex].getBounds().y + (buttonHeight / 2) - (selector.height / 2);
					// @SoundHook: menuNavigationSound.play();
					sound.playSFX(Sounds.SFX_MenuNav);
					break;			
				case NAV_ACTION.DOWN:
				case NAV_ACTION.RIGHT:
					selectorPositionsIndex++;
					if (selectorPositionsIndex >= selections.length) {
						selectorPositionsIndex = 0;
					}
					selectorPosition.y = buttons[selectorPositionsIndex].getBounds().y + (buttonHeight / 2) - (selector.height / 2);
					// @SoundHook: menuNavigationSound.play();
					sound.playSFX(Sounds.SFX_MenuNav);
					break;
				case NAV_ACTION.SELECT:
					// @SoundHook: menuSelectionSound.play();
					sound.playSFX(Sounds.SFX_MenuSelect);
					SceneState.setState(selections[selectorPositionsIndex]);
					break;
				case NAV_ACTION.BACK:
					break;//nowhere to go 'back' to
				case NAV_ACTION.PAUSE:
					break;
				}
			}
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
			if(bird.scale >= 1.0) {
				bird.draw();
			}
		}

		// render menu
		printMenu();
	};
	
	const drawBG = function() {
		canvasContext.drawImage(titleScreenBG, 0, 0);
		canvasContext.drawImage(titleScreenDecore, 0, 0);
		canvasContext.drawImage(titleBlock, 0, 0, titleBlock.width, titleBlock.height, titleBlockPosition.x, titleBlockPosition.y, titleBlockWidth, titleBlock.height);
		canvasContext.drawImage(selector, selectorPosition.x, selectorPosition.y);
	};
    
	const drawTitle = function() {
		const titleXPos = (canvas.width - titleImage.width) / 2;
		canvasContext.drawImage(titleImage, titleXPos, canvas.height / 10);

		const text = getLocalizedStringForKey(STRINGS_KEY.Subtitle);
		JPFont.printTextAt(text, {x:canvas.width / 2, y:310}, TextAlignment.Center, 0.5);
	};
        
	return this;
}

function Bird(pos, vel, scale = 1) {
	this.position = pos;
	this.velocity = vel;
	this.scale = scale;
	const DELTA_SCALE = -0.00025;
	const soarAdjustment = Math.floor(1000 * Math.random());
	this.animation = new SpriteAnimation(name, //string identifier for this animation
		titleScreenBird, //image in which the frames reside
		[0, 1, 2, 3, 0, 1], //array of frame indexes to use for this animation
		41, //width of each frame
		24, //height of each frame
		[64, 64, 64, 64, 64, 3000 + soarAdjustment],//array of milliseconds to show each frame
		false, //boolean indicates if animation reverses (true)
		true); //boolean indicates if animation loops (true)
	this.animation.scale = scale;
	this.update = function(deltaTime) {
		this.position.x += (this.velocity.x * deltaTime / 1000);
		this.position.y += (this.velocity.y * deltaTime / 1000);
		this.animation.update(deltaTime);
		this.scale += DELTA_SCALE;
		this.velocity.x *= (1.0 + DELTA_SCALE);
		this.velocity.y *= (1.0 + DELTA_SCALE);
		if(this.scale < 0.1) {this.scale = 0.1;}
		this.animation.scale = this.scale;
	};
	this.draw = function() {
		this.animation.drawAt(this.position.x, this.position.y, false);
	};
}