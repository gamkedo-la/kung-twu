//Help Scene
function HelpScene() {
	this.name = "Help";
	const TITLE_Y_POS = 100;
	let titleBlockWidth = 0;
	let titleBlockPos = {x:0, y:0};
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
	const LINE_SCALE = 0.35;
	let LINE_HEIGHT;


	this.transitionIn = function() {
		canvasContext.setTransform(1, 0, 0, 1, 0, 0);

		buttonPadding = canvas.width / 40;
		
		const menuY = canvas.height - (9 * buttonHeight / 2);
		LINE_HEIGHT = JPFont.getCharacterHeight(LINE_SCALE);

        
		if(buttons.length === 0) {
			buttons.push(buildBackButton(buttonPadding, menuY, buttonHeight, buttonTitlePadding));
			buttons.push(buildPlayButton(canvas.width - buttonPadding, menuY, buttonHeight, buttonTitlePadding));

			
		} else {
			updateButtonTitles();
		}

		updateButtonPositions();
		findTitleBlockWidth();
		selectorPositionsIndex = 0;
	};

	this.transitionOut = function() {
		this.properties = null;
	};

	this.run = function(deltaTime) {
		update(deltaTime);

		draw();
	};

	this.control = function(newKeyEvent, pressed) {
		if (pressed) {//only act on key released events => prevent multiple changes on single press
			return false;
		}
        
		switch (newKeyEvent) {
		case ALIAS.SELECT2:
			if(pauseManager.getIsPaused()) {
				pauseManager.resumeGame(CAUSE.Keypress);
			}
			SceneState.setState(SCENE.LEVEL_INTRO);
			// @SoundHook menuSelectionSound.play();
			sound.playSFX(Sounds.SFX_MenuSelect);
			return true;
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
					updateSelectorPosition();
					// @SoundHook: menuNavigationSound.play();
					sound.playSFX(Sounds.SFX_MenuNav);
					break;			
				case NAV_ACTION.DOWN:
				case NAV_ACTION.RIGHT:
					selectorPositionsIndex++;
					if (selectorPositionsIndex >= selections.length) {
						selectorPositionsIndex = 0;
					}
					updateSelectorPosition();
					// @SoundHook: menuNavigationSound.play();
					sound.playSFX(Sounds.SFX_MenuNav);
					break;
				case NAV_ACTION.SELECT:
					if(selectorPositionsIndex === 0) {
						SceneState.setState(SceneState.getPreviousState());
					} else {
						pauseManager.resumeGame(CAUSE.Keypress);
						SceneState.setState(selections[selectorPositionsIndex]);
					}
					// @SoundHook: menuSelectionSound.play();
					sound.playSFX(Sounds.SFX_MenuSelect);
					break;
				case NAV_ACTION.BACK:
					break;//nowhere to go 'back' to
				case NAV_ACTION.PAUSE:

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
			if(pauseManager.getIsPaused()) {
				pauseManager.resumeGame(CAUSE.Keypress);
			}
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

	const findTitleBlockWidth = function() {
		let maxWidth = 0;
		let lines = getLocalizedStringForKey(STRINGS_KEY.HelpScreenContents).split("\n");
		for (let num=0; num<lines.length; num++) {
			const thisWidth = JPFont.getStringWidth(lines[num], 0.3);
			if(thisWidth > maxWidth) {
				maxWidth = thisWidth;
			}
		}

		titleBlockWidth = 30 + maxWidth;
		titleBlockPos.x = canvas.width / 2 - titleBlockWidth / 2 + 4;
		titleBlockPos.y = canvas.height / 2 - 38;
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
        
		drawHelpScreenContents();

		// render menu
		printButtons();        
	};
	
	const drawBG = function() {
		canvasContext.drawImage(titleScreenBG, 0, 0);
		canvasContext.drawImage(titleScreenDecore, 0, 0);
		canvasContext.drawImage(titleBlock, 0, 0, titleBlock.width, titleBlock.height, titleBlockPos.x, titleBlockPos.y, titleBlockWidth, titleBlock.height);        
		canvasContext.drawImage(selector, selectorPosition.x, selectorPosition.y);     
	};
    
	const drawTitle = function() {
		JPFont.printTextAt(getLocalizedStringForKey(STRINGS_KEY.HelpScreenTitle), {x:canvas.width / 2, y:TITLE_Y_POS}, TextAlignment.Center, 1);
	};

	const drawHelpScreenContents = function() {
		let lines = getLocalizedStringForKey(STRINGS_KEY.HelpScreenContents).split("\n");
		for (let num=0; num<lines.length; num++) {
			JPFont.printTextAt(lines[num], {x:canvas.width / 2, y:canvas.height / 2 + ((num - 1)*LINE_HEIGHT)}, TextAlignment.Center, 0.3);
		}
	};
}