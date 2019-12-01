//Settings Scene
function SettingsScene() {
	this.name = "Settings";
	let selectorPositionsIndex = 0;
	const selectorPosition = {x:0, y:0};
	const selections = [
		SCENE.TITLE,
		SCENE.GAME
	];
	const buttonHeight = 25;
	const buttonTitlePadding = 2;
	let buttonPadding;
	const buttons = [];
	const slider = {};
	let sliderData = null;
	let sliderArray = null;

	const TITLE_Y_POS = 100;
	const TITLE_SCALE = 1;
	const HEADER_SCALE = 0.7;

	const SLIDER_W = 200;

	const COL_DELTA = 63;
	const COL1_X = 60;
	const COL2_X = COL1_X + SLIDER_W + COL_DELTA;
	const COL3_X = COL2_X + SLIDER_W + COL_DELTA;

	const ROW_DELTA = 80;
	const ROW1_Y = TITLE_Y_POS + 90 + ROW_DELTA;
	const ROW2_Y = ROW1_Y + ROW_DELTA;
	const ROW3_Y = ROW2_Y + ROW_DELTA;
	const ROW4_Y = ROW3_Y + ROW_DELTA;
	const ROW5_Y = ROW4_Y + ROW_DELTA;
	
	this.transitionIn = function() {
		canvasContext.setTransform(1, 0, 0, 1, 0, 0);

		buttonPadding = canvas.width / 40;

		let mainMenuX = 0;
		const mainMenuY = canvas.height - (9 * buttonHeight / 2);
        
		if(buttons.length === 0) {
			buttons.push(buildBackButton(canvas.width / 40, mainMenuY, buttonHeight, buttonTitlePadding));
			buttons.push(buildPlayButton(mainMenuX, mainMenuY, buttonHeight, buttonTitlePadding));

			updateButtonPositions();
		} else {
			updateButtonTitles();
			updateButtonPositions();
		}

		selectorPositionsIndex = 0;
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
		let widthToUse = theseBounds.width + (buttonHeight / 2);
		if(selectorPositionsIndex === 1) {
			widthToUse = -(selector.width + (buttonHeight / 2));
		}

		selectorPosition.x = theseBounds.x + widthToUse;
		selectorPosition.y = theseBounds.y + (buttonHeight / 2) - (selector.height / 2);
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
		/*First Column of Sliders */
		// Music Vol
		buttons.push(buildMusicButton(COL1_X, ROW1_Y, buttonHeight, buttonTitlePadding));

		//SFX Vol
		buttons.push(buildSFXButton(COL1_X, ROW2_Y, buttonHeight, buttonTitlePadding));
	};

	const buildMusicButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.SLIDER, sliderData.playerHealth);
		};

		return new UIButton(sliderData.playerHealth.titleKey, x, y, height, padding, thisClick, Color.Aqua);
	};

	const buildSFXButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.SLIDER, sliderData.enemyHealth);
		};

		return new UIButton(sliderData.enemyHealth.titleKey, x, y, height, padding, thisClick, Color.Aqua);
	};


	const buildSliderData = function() {
		sliderData = {
			MusicVolume: {
				name:SLIDER_NAMES.MaxHealth,
				titleKey:STRINGS_KEY.MaxHealth,
				minValue:10,
				minTitle:"10",
				storageKey:localStorageKey.PlayerMaxHealth,
				default:ASSIST_DEFAULT.MaxHealth,
				maxValue:400,
				maxTitle:"400",
				steps:39,
				colors:[Color.Red, Color.Orange, Color.Yellow, Color.Green, Color.Blue]
			},
			SFXVolume: {
				name:SLIDER_NAMES.PlayerBaseDamage,
				titleKey:STRINGS_KEY.PlayerDamage,
				minValue:1,
				minTitle:"1",
				storageKey:localStorageKey.PlayerBaseDamage,
				default:ASSIST_DEFAULT.PlayerBaseDamage,
				maxValue:50,
				maxTitle:"50",
				steps:49,
				colors:[Color.Red, Color.Orange, Color.Yellow, Color.Green, Color.Blue]
			}
		};

		sliderArray = [
			sliderData.MusicVolume,
			sliderData.SFXVolume,
		];
	}
}