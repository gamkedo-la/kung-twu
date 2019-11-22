//Modal Slider Scene
function ModalSlider() {
	this.name = "Sliders";
	const TITLE_Y_POS = 100;
	let selectorPositionsIndex = 0;
	const selectorPosition = {x:0, y:0};
	const buttonHeight = 25;
	const buttonTitlePadding = 2;
	let buttonPadding;
	const buttons = [];
	let config = null;
	let slider = null;

	this.transitionIn = function() {
		config = this.properties;
		canvasContext.setTransform(1, 0, 0, 1, 0, 0);

		buttonPadding = canvas.width / 40;

		let mainMenuX = 0;
		const mainMenuY = canvas.height - (9 * buttonHeight / 2);
		
		if(buttons.length === 0) {
			buttons.push(buildDefaultButton(canvas.width / 40, mainMenuY, buttonHeight, buttonTitlePadding));
			buttons.push(buildDoneButton(mainMenuX, mainMenuY, buttonHeight, buttonTitlePadding));
		} else {
			updateButtonTitles();
		}
		
		buildSlider();

		updateButtonPositions();
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

	const buildSlider = function() {
		let initialValue = localStorageHelper.getInt(config.storageKey);
		if((initialValue === undefined) || (initialValue === null) || (isNaN(initialValue))) {
			initialValue = config.default;
			localStorageHelper.setInt(config.storageKey, initialValue);
		}
		const thisColor =  colorForValue(initialValue);
		slider = new UISlider(50, 400, 700, 30, getLocalizedStringForKey(config.titleKey), config.minValue, config.minTitle, config.maxValue, config.maxTitle, initialValue, 40, true, thisColor);
	};

	const colorForValue = function(value) {
		let result = Color.White;
		if(config.colors.length > 0) {
			const lerp = (value - config.minValue) / (config.maxValue - config.minValue);
			const indexProportion = config.colors.length * lerp;
			const index = Math.floor(indexProportion);
			result = config.colors[index];
		} else {
			result = config.colors[0];
		}

		return result;
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
						selectorPositionsIndex += buttons.length;
					}
					updateSelectorPosition();
					sound.playSFX(Sounds.SFX_MenuNav);
					break;			
				case NAV_ACTION.DOWN:
				case NAV_ACTION.RIGHT:
					selectorPositionsIndex++;
					if (selectorPositionsIndex >= buttons.length) {
						selectorPositionsIndex = 0;
					}
					updateSelectorPosition();
					sound.playSFX(Sounds.SFX_MenuNav);
					break;
				case NAV_ACTION.SELECT:
					if(selectorPositionsIndex === 0) {
						SceneState.setState(SceneState.getPreviousState());
					} else {
//						pauseManager.resumeGame(CAUSE.Keypress);
//						SceneState.setState(selections[selectorPositionsIndex]);
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

	const buildDefaultButton = function(x, y, height, padding) {
		const thisClick = function() {
			restoreDefault();
		};

		return new UIButton(STRINGS_KEY.Default, x, y, height, padding, thisClick, Color.Aqua);
	};

	const restoreDefault = function() {
		slider.setValue(config.default);
		localStorageHelper.setInt(config.storageKey, config.default);
	};

	const buildDoneButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SceneState.getPreviousState());
		};

		return new UIButton(STRINGS_KEY.Done, x, y, height, padding, thisClick, Color.Purple);
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

		slider.draw();
	};
	
	const drawBG = function() {
		canvasContext.drawImage(titleScreenBG, 0, 0);
		canvasContext.drawImage(titleScreenDecore, 0, 0);
		canvasContext.drawImage(selector, selectorPosition.x, selectorPosition.y);     
	};
	
	const drawTitle = function() {
		JPFont.printTextAt(getLocalizedStringForKey(config.titleKey), {x:canvas.width / 2, y:TITLE_Y_POS}, TextAlignment.Center, 1);
	};
}