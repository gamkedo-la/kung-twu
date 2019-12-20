//*Settings Scene
function ControlsScene() {
	this.name = "controls";
	const TITLE_Y_POS = 100;
	let selectorPositionsIndex = 0;
	const selectorPosition = {x:0, y:0};
	const selections = [
		SCENE.TITLE,
		SCENE.GAME
	];
	const buttonHeight = 25;
	const buttonTitlePadding = 2;
	let buttonPadding;
	let buttons = [];
	didInteract = false;

	//original keys
	let keyLookup = [
		ACTION_KEYS.WALK_LEFT, 
		ACTION_KEYS.WALK_RIGHT, 
		ACTION_KEYS.JUMP, 
		ACTION_KEYS.PUNCH, 
		ACTION_KEYS.KICK, 
		ACTION_KEYS.CROUCH, 
		ACTION_KEYS.DASH, 
		ACTION_KEYS.BLOCK
	];

	const remapLeftX = 40;
	const remapTopY = 200;
	const remapButtonHeight = 95;
	const remapButtonWidth = 250;//Guess, should be width of remapSprite. 
	const remapButtonCount = 7;
	let remapKeyNext = -1;

	const showControls = function(){
		var buttonList = [leftMoveSprite, rightMoveSprite, jumpSprite, punchSprite, kickSprite, crouchSprite, dashSprite];
//		for(let i=0;i<buttonList.length;i++) {
//			canvasContext.drawImage(buttonList[i], remapLeftX, remapTopY + i * remapButtonHeight);
//		}

		for(let i=0; i<keyLookup.length; i++) {
			const iY = remapTopY+remapButtonHeight*i;

			const inputNames = keyMapper.getInputCodes(keyLookup[i]);
			for(let ii=0;ii<inputNames.length;ii++) {
				const horizontalSpace = 100;
				colorText(lookupKeyName(inputNames[ii]),
					canvas.width/2+ii*horizontalSpace, iY+remapButtonHeight/2,
					Color.White, Fonts.CreditsText);
			}
		} 
		if (remapKeyNext != -1){
			colorText(getLocalizedStringForKey(STRINGS_KEY.PressNewKey), canvas.width / 2, canvas.height - 80, Color.White, Fonts.CreditsText);
		}
	};

	this.transitionIn = function() {
		canvasContext.setTransform(1, 0, 0, 1, 0, 0);

		buttonPadding = canvas.width / 40;

		let mainMenuX = 0;
		const mainMenuY = canvas.height - (9 * buttonHeight / 2);
        
		if(buttons.length === 0) {
			buttons.push(buildBackButton(canvas.width / 40, mainMenuY, buttonHeight, buttonTitlePadding));
			buttons.push(buildPlayButton(mainMenuX, mainMenuY, buttonHeight, buttonTitlePadding));
			//trying another way inside of checkButton
			buttons = buttons.concat(buildRemapButtons(remapLeftX, remapTopY, remapButtonHeight * remapButtonCount, buttonTitlePadding));

			// support mouse hovers that move the selector
			for (var num=0; num<buttons.length; num++) {
				buttons[num].selectorIndex = num;
			}
			
		} else {
			updateButtonTitles();
		}

		updateButtonPositions();
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
		case ALIAS.POINTER:
			checkButtons();
			return true;
		}

		if(remapKeyNext != -1){
			keyMapper.replaceKeyForAction(newKeyEvent, keyLookup[remapKeyNext]);
			remapKeyNext = -1;
		}
		return false;
	};

	this.moveSelector = function(num) {
		// used to simulate arrow key press on mousemove so
		// the cursor moves as appropriate when hovering menu
		selectorPositionsIndex = num;
		selectorPosition.y = buttons[selectorPositionsIndex].getBounds().y + (buttonHeight / 2) - (selector.height / 2);
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
		if(mouseX > remapLeftX && mouseX < remapLeftX + remapButtonWidth && 
			mouseY > remapTopY && mouseY < remapTopY + remapButtonHeight * remapButtonCount){
			//console.log("clicked on remap");
			remapKeyNext = Math.floor((mouseY - remapTopY) / remapButtonHeight);
			//console.log(remapKeyNext);
		}
	};

	const buildPlayButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.GAME);
		};

		return new UIButton(STRINGS_KEY.Play, x, y, height, padding, thisClick, Color.Aqua);
	};

	const buildBackButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SceneState.getPreviousState());
		};

		return new UIButton(STRINGS_KEY.Back, x, y, height, padding, thisClick, Color.Purple);
	};

	const buildRemapButtons = function(x, y, height, padding) {
		const remapButtons = [];

		const remapClick = function() {
			remapKeyNext = this.index;
		};

		const leftButton = new UIButton(STRINGS_KEY.Left, x, y, height, padding, remapClick, Color.Purple, null, 0.5);
		leftButton.index = remapButtons.length;
		remapButtons.push(leftButton);

		const BUTTON_DELTA = 60;
		let currentY = y + BUTTON_DELTA;

		const rightButton = new UIButton(STRINGS_KEY.Right, x, currentY, height, padding, remapClick, Color.Purple, null, 0.5);
		rightButton.index = remapButtons.length;
		remapButtons.push(rightButton);
		currentY += BUTTON_DELTA;

		const punchButton = new UIButton(STRINGS_KEY.Punch, x, currentY, height, padding, remapClick, Color.Purple, null, 0.5);
		punchButton.index = remapButtons.length;
		remapButtons.push(punchButton);
		currentY += BUTTON_DELTA;

		const kickButton = new UIButton(STRINGS_KEY.Kick, x, currentY, height, padding, remapClick, Color.Purple, null, 0.5);
		kickButton.index = remapButtons.length;
		remapButtons.push(kickButton);
		currentY += BUTTON_DELTA;

		const jumpButton = new UIButton(STRINGS_KEY.Jump, x, currentY, height, padding, remapClick, Color.Purple, null, 0.5);
		jumpButton.index = remapButtons.length;
		remapButtons.push(jumpButton);
		currentY += BUTTON_DELTA;

		const blockButton = new UIButton(STRINGS_KEY.Block, x, currentY, height, padding, remapClick, Color.Purple, null, 0.5);
		blockButton.index = remapButtons.length;
		remapButtons.push(blockButton);
		currentY += BUTTON_DELTA;

		const crouchButton = new UIButton(STRINGS_KEY.Crouch, x, currentY, height, padding, remapClick, Color.Purple, null, 0.5);
		crouchButton.index = remapButtons.length;
		remapButtons.push(crouchButton);
		currentY += BUTTON_DELTA;
		
		return remapButtons;
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

		showControls();

		/*		uiProgBarMusicVolume.draw();
		uiProgBarEffectsVolume.draw();*/
	};
	
	const drawBG = function() {
		canvasContext.drawImage(titleScreenBG, 0, 0);
		canvasContext.drawImage(titleScreenDecore, 0, 0);
		canvasContext.drawImage(selector, selectorPosition.x, selectorPosition.y);     
	};
    
	const drawTitle = function() {
		JPFont.printTextAt(getLocalizedStringForKey(STRINGS_KEY.ControlsScreenTitle), {x:canvas.width / 2, y:TITLE_Y_POS}, TextAlignment.Center, 1);
	};
}