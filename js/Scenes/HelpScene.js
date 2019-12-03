//Help Scene
function HelpScene() {
	this.name = "Help";
	const TITLE_Y_POS = 75;
	let titleBlockWidth = 0;
	let titleBlockHeight = 0;
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
	let LINE_SCALE = 0.65;
	let LINE_HEIGHT;
	let previousState;


	this.transitionIn = function() {
		canvasContext.setTransform(1, 0, 0, 1, 0, 0);

		previousState = SceneState.getPreviousState();

		LINE_SCALE = 0.65;
		buttonPadding = canvas.width / 40;
		
		const menuY = canvas.height - (9 * buttonHeight / 2);
		LINE_HEIGHT = 1.5 * JPFont.getCharacterHeight(LINE_SCALE);

        
		if(buttons.length === 0) {
			buttons.push(buildBackButton(buttonPadding, menuY, buttonHeight, buttonTitlePadding));
			buttons.push(buildPlayButton(canvas.width - buttonPadding, menuY, buttonHeight, buttonTitlePadding));

			
		} else {
			updateButtonTitles();
		}

		updateButtonPositions();
		findTitleBlockWidthAndHeight();
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
		case ALIAS.SELECT2:
			if(pauseManager.getIsPaused()) {
				pauseManager.resumeGame(CAUSE.Keypress);
			}
			if(previousState === SCENE.PAUSE) {
				SceneState.setState(SCENE.GAME);
			} else {
				SceneState.setState(SCENE.LEVEL_INTRO);
			}
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
						SceneState.setState(previousState);
					} else {
						pauseManager.resumeGame(CAUSE.Keypress);
						if(previousState === SCENE.PAUSE) {
							SceneState.setState(SCENE.GAME);
						} else {
							SceneState.setState(SCENE.LEVEL_INTRO);
						}
					}
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
			
			const previousState = SceneState.getPreviousState();
			if(previousState === SCENE.PAUSE) {
				SceneState.setState(SCENE.GAME);
			} else {
				SceneState.setState(SCENE.LEVEL_INTRO);
			}
		};

		return new UIButton(STRINGS_KEY.Play, x, y, height, padding, thisClick, Color.Aqua);
	};

	const buildBackButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SceneState.getPreviousState());
		};

		return new UIButton(STRINGS_KEY.Back, x, y, height, padding, thisClick, Color.Purple);
	};

	const findTitleBlockWidthAndHeight = function() {
		let maxWidth = 0;
		let lines = getLocalizedStringForKey(STRINGS_KEY.HelpScreenContents).split("\n");
		for (let num=0; num<lines.length; num++) {
			const thisWidth = JPFont.getStringWidth(lines[num], LINE_SCALE);
			if(thisWidth > maxWidth) {
				maxWidth = thisWidth;
			}
		}

		if(maxWidth > canvas.width - 50) {
			LINE_SCALE = 0.45;
			maxWidth = findTitleBlockWidthAndHeight();
			LINE_HEIGHT = 1.5 * JPFont.getCharacterHeight(LINE_SCALE);
		}

		titleBlockWidth = 40 + maxWidth;
		titleBlockPos.x = canvas.width / 2 - titleBlockWidth / 2 + 10;

		titleBlockHeight = 30 + (lines.length * LINE_HEIGHT);
		titleBlockPos.y = TITLE_Y_POS + 160 - LINE_HEIGHT;

		return maxWidth;
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
		canvasContext.drawImage(titleBlock, 0, 0, titleBlock.width, titleBlock.height, titleBlockPos.x, titleBlockPos.y, titleBlockWidth, titleBlockHeight);        
		canvasContext.drawImage(selector, selectorPosition.x, selectorPosition.y);     
	};
    
	const drawTitle = function() {
		JPFont.printTextAt(getLocalizedStringForKey(STRINGS_KEY.HelpScreenTitle), {x:canvas.width / 2, y:TITLE_Y_POS}, TextAlignment.Center, 1);
	};

	const drawHelpScreenContents = function() {
		let lines = getLocalizedStringForKey(STRINGS_KEY.HelpScreenContents).split("\n");
		for (let num=0; num<lines.length; num++) {
			JPFont.printTextAt(lines[num], {x:canvas.width / 2, y:TITLE_Y_POS + 185 + ((num - 1)*LINE_HEIGHT)}, TextAlignment.Center, LINE_SCALE);
		}
	};
}