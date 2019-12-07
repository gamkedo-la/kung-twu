//Settings Scene
function SettingsScene() {
	this.name = "Settings";
	let selectorPositionsIndex = 0;
	const selectorPosition = {x:0, y:0};
	const selections = [
		SCENE.TITLE,
		SCENE.LEVEL_INTRO
	];
	const BUTTON_SCALE = 0.45;
	let buttonHeight; 
	const buttonTitlePadding = 2;
	let buttonPadding;
	const buttons = [];
	let sliderData = null;

	const TITLE_Y_POS = 100;

	const ROW_DELTA = 100;
	const ROW1_Y = TITLE_Y_POS + ROW_DELTA;
	const ROW2_Y = ROW1_Y + ROW_DELTA;
	const ROW3_Y = ROW2_Y + ROW_DELTA;
	
	this.transitionIn = function() {
		canvasContext.setTransform(1, 0, 0, 1, 0, 0);

		buttonHeight = JPFont.getCharacterHeight(BUTTON_SCALE);
		buttonPadding = canvas.width / 40;

		let mainMenuX = 0;
		const mainMenuY = 700;
        
		if(buttons.length === 0) {
			buttons.push(buildBackButton(canvas.width / 40, mainMenuY, buttonHeight, buttonTitlePadding));
			buttons.push(buildPlayButton(mainMenuX, mainMenuY, buttonHeight, buttonTitlePadding));

			buildSliderData();
			buildSliderButtons();

			// support mouse hovers that move the selector
			for (var num=0; num<buttons.length; num++) {
				buttons[num].selectorIndex = num;
			}
		} else {
			updateButtonTitles();
		}

		selectorPositionsIndex = 0;
		updateButtonPositions();
	};

	this.transitionOut = function() {
		this.properties = null;
	};

	this.run = function() {
		update();

		draw();
	};

	this.control = function(newKeyEvent, pressed) {
		if (pressed) {//only act on key released events => prevent multiple changes on single press
			return false;
		}
        
		switch (newKeyEvent) {
		case ALIAS.POINTER:
			checkButtons();
			return true;
		}
        
		return false;
	};

	this.moveSelector = function(num) {
		// used to simulate arrow key press on mousemove so
		// the cursor moves as appropriate when hovering menu
		//console.log("Moving menu menu selector: " + num);
		selectorPositionsIndex = num;
		updateSelectorPosition();
	};

	const update = function() {
		processUserInput();
	};

	const processUserInput = function() {
		const navKeys = inputProcessor.getNewlyActiveKeys();
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
					updateSelectorPosition();
					sound.playSFX(Sounds.SFX_MenuNav);
					break;			
				case NAV_ACTION.DOWN:
				case NAV_ACTION.RIGHT:
					selectorPositionsIndex++;
					if (selectorPositionsIndex >= selections.length) {
						selectorPositionsIndex = 0;
					}
					updateSelectorPosition();
					sound.playSFX(Sounds.SFX_MenuNav);
					break;
				case NAV_ACTION.SELECT:
					if(selectorPositionsIndex === 0) {
						SceneState.setState(SceneState.getPreviousState());
					} else {
						pauseManager.resumeGame(CAUSE.Keypress);
						SceneState.setState(selections[selectorPositionsIndex]);
					}
					sound.playSFX(Sounds.SFX_MenuSelect);
					break;
				}
			}
		}
	};

	const updateSelectorPosition = function() {
		const theseBounds = buttons[selectorPositionsIndex].getBounds();
		let widthToUse = theseBounds.width + (theseBounds.height / 2);
		if(selectorPositionsIndex >= 1) {
			widthToUse = -(selector.width + (theseBounds.height / 2));
		}

		selectorPosition.x = theseBounds.x + widthToUse;
		selectorPosition.y = theseBounds.y + (theseBounds.height / 2) - (selector.height / 2);
	};

	const checkButtons = function() {
		let wasClicked = false;
		for(let button of buttons) {
			wasClicked = button.respondIfClicked(mouseX, mouseY);
			if(wasClicked) {break;}
		}
	};

	const buildPlayButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.LEVEL_INTRO);
		};

		return new UIButton(STRINGS_KEY.Play, x, y, height, padding, thisClick, Color.Aqua);
	};

	const buildBackButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SceneState.getPreviousState());
		};

		return new UIButton(STRINGS_KEY.Back, x, y, height, padding, thisClick, Color.Purple);
	};

	const updateButtonPositions = function() {
		buttons[0].updateXPosition(buttonPadding);
		const button1Width = buttons[1].getBounds().width;
		buttons[1].updateXPosition(canvas.width - (button1Width + buttonPadding));

		for(let i = 2; i < buttons.length; i++) {
			const titleWidth = JPFont.getStringWidth(buttons[i].title, BUTTON_SCALE);
			const x = canvas.width / 2 - titleWidth / 2;
			buttons[i].updateXPosition(x);	
		}

		updateSelectorPosition();
	};

	const updateButtonTitles = function() {
		for(let button of buttons) {
			button.updateTitle();
		}
	};

	const printButtons = function() {
		for(let button of buttons) {
			button.draw();
		}
	};

	const draw = function() {
		// render the menu background
		drawBG();
        
		drawTitle();

		// render menu
		printButtons();
	};
	
	const drawBG = function() {
		canvasContext.drawImage(titleScreenBG, 0, 0);
		canvasContext.drawImage(titleScreenDecore, 0, 0);
		canvasContext.drawImage(selector, selectorPosition.x, selectorPosition.y);     
	};
    
	const drawTitle = function() {
		JPFont.printTextAt(getLocalizedStringForKey(STRINGS_KEY.SettingsScreenTitle), {x:canvas.width / 2, y:TITLE_Y_POS}, TextAlignment.Center, 1);
	};

	
	const buildSliderButtons = function() {
		//Master Vol
		buttons.push(buildGameVolumeButton(ROW1_Y, buttonHeight, buttonTitlePadding));
		
		// Music Vol
		buttons.push(buildMusicButton(ROW2_Y, buttonHeight, buttonTitlePadding));

		//SFX Vol
		buttons.push(buildSFXButton(ROW3_Y, buttonHeight, buttonTitlePadding));
	};

	const buildGameVolumeButton = function(y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.SLIDER, sliderData.GameVolume);
		};

		const titleWidth = JPFont.getStringWidth(getLocalizedStringForKey(sliderData.GameVolume.titleKey), BUTTON_SCALE);
		const x = canvas.width / 2 - titleWidth / 2;

		return new UIButton(sliderData.GameVolume.titleKey, x, y, height, padding, thisClick, Color.Aqua, currentLanguage, BUTTON_SCALE);
	};

	const buildMusicButton = function(y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.SLIDER, sliderData.MusicVolume);
		};

		const titleWidth = JPFont.getStringWidth(getLocalizedStringForKey(sliderData.MusicVolume.titleKey), BUTTON_SCALE);
		const x = canvas.width / 2 - titleWidth / 2;

		return new UIButton(sliderData.MusicVolume.titleKey, x, y, height, padding, thisClick, Color.Aqua, currentLanguage, BUTTON_SCALE);
	};

	const buildSFXButton = function(y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.SLIDER, sliderData.SFXVolume);
		};

		const titleWidth = JPFont.getStringWidth(getLocalizedStringForKey(sliderData.SFXVolume.titleKey), BUTTON_SCALE);
		const x = canvas.width / 2 - titleWidth / 2;

		return new UIButton(sliderData.SFXVolume.titleKey, x, y, height, padding, thisClick, Color.Aqua, currentLanguage, BUTTON_SCALE);
	};


	const buildSliderData = function() {
		sliderData = {
			GameVolume: {
				name:SLIDER_NAMES.GameVolume,
				titleKey:STRINGS_KEY.GameVolume,
				minValue:0,
				minTitle:"0",
				storageKey:localStorageKey.GameVolume,
				default:MUSIC_DEFAULT_VOLUME,
				maxValue:10,
				maxTitle:"10",
				steps:10,
				colors:[Color.Red, Color.Yellow, Color.Green, Color.Yellow, Color.Red]
			},
			MusicVolume: {
				name:SLIDER_NAMES.MusicVolume,
				titleKey:STRINGS_KEY.MusicVolume,
				minValue:0,
				minTitle:"0",
				storageKey:localStorageKey.MusicVolume,
				default:MUSIC_DEFAULT_VOLUME,
				maxValue:10,
				maxTitle:"10",
				steps:10,
				colors:[Color.Red, Color.Yellow, Color.Green, Color.Yellow, Color.Red]
			},
			SFXVolume: {
				name:SLIDER_NAMES.SFXVolume,
				titleKey:STRINGS_KEY.SFXVolume,
				minValue:0,
				minTitle:"0",
				storageKey:localStorageKey.SFXVolume,
				default:SFX_DEFAULT_VOLUME,
				maxValue:10,
				maxTitle:"10",
				steps:10,
				colors:[Color.Red, Color.Yellow, Color.Green, Color.Yellow, Color.Red]
			}
		};
	};
}