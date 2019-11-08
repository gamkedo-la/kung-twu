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
	const buttons = [];
	/** @type UIProgressBar */
	//let uiProgBarMusicVolume;
	/** @type UIProgressBar */
	//let uiProgBarEffectsVolume;

//original keys
	var keyLookup = [
		"left",
		"right",
		"jump",
		"punch",
		"kick",
		"crouch",
		"dash"
	];
//changing keys
	keyLookup["left"] = ACTION_KEYS.WALK_LEFT;
	keyLookup["right"] = ACTION_KEYS.WALK_RIGHT;
	keyLookup["jump"] = ACTION_KEYS.JUMP;
	keyLookup["punch"] = ACTION_KEYS.PUNCH;
	keyLookup["kick"] = ACTION_KEYS.KICK;
	keyLookup["crouch"] = ACTION_KEYS.CROUCH;
	keyLookup["dash"] = ACTION_KEYS.DASH;
	keyLookup["dash"] = ACTION_KEYS.BLOCK

//fetch recorded keys 
/*
keyWordLookup[ keyLookup["left"] ];
keyWordLookup[ keyLookup["right"] ];
keyWordLookup[ keyLookup["jump"] ];
keyWordLookup[ keyLookup["punch"] ];
keyWordLookup[ keyLookup["kick"] ];
keyWordLookup[ keyLookup["crouch"] ];
keyWordLookup[ keyLookup["dash"] ]; */

this.showControls = function(){
	canvasContext.drawImage(leftMoveSprite, 40, 20);
	canvasContext.drawImage(rightMoveSprite, 40, 50);
	canvasContext.drawImage(jumpSprite, 40, 80);
	canvasContext.drawImage(punchSprite, 40, 120);
	canvasContext.drawImage(kickSprite, 40, 150);
	canvasContext.drawImage(crouchSprite, 40, 180);
	canvasContext.drawImage(crouchSprite, 40, 210);
	for(var i=0; i<keyLookup.length; i++) {
		iY = 20;
		colorText(
			keyLookup[i],
			canvas.width/2, iY+30,
			Color.White, keyWordlookUp[keyLookup], TextAlignment.Center);
		}
	}


this.changeControls = function(){
		//Input keydown code
	if(changingKeyFor != null) {
	keyLookup[changingKeyFor] = evt.keyCode; // will overwrite "left" as next key pressed
		switch(changingKeyFor) {
			case "leftMoveSprite": changingKeyFor = "left";
			case "rightMoveSprite": changingKeyFor = "right";
			case "jumpSprite":  changingKeyFor = "jump";
			case "punchSprite": changingKeyFor = "punch";
			case "kickSprite": changingKeyFor = "kick";
			case "crouchSprite": changingKeyFor = "crouch";
			case "dashSprite": changingKeyFor = "dash";
			return true;	
		}
	}
}



this.transitionIn = function() {
	canvasContext.setTransform(1, 0, 0, 1, 0, 0);

/*		// Testing new UIProgressBar
		uiProgBarMusicVolume = new UIProgressBar({
			x: 40,
			y: 200,
			width: 700,
			height: 5,
			destination: "RIGHT",
			bgColor: rgba(0, 0, 0, 0),
			bgOutlineColor: "black",
			startingValue: 0.0
		});
		let grad = uiProgBarMusicVolume.makeGradient("RIGHT", rgba(200, 200, 200, 1), "gold");
		uiProgBarMusicVolume.setProgressBarColor(grad);

		uiProgBarEffectsVolume = new UIProgressBar({
			x: 40,
			y: 240,
			width: 700,
			height: 5,
			destination: "RIGHT",
			bgColor: rgba(0, 0, 0, 0),
			bgOutlineColor: "black",
			startingValue: 0.0
		});
		let grad2 = uiProgBarEffectsVolume.makeGradient("RIGHT", rgba(200, 200, 200, 1), "gold");
		uiProgBarEffectsVolume.setProgressBarColor(grad2);
		// End instantiating progress bars*/

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
        
		return false;
	};

	const update = function() {
		processUserInput();

/*		uiProgBarMusicVolume.setValueByScreenPos(mouseX, mouseY);
		// @SoundParam: Music Volume Bus
		sound.setBGMVolume(uiProgBarMusicVolume.getValue());*/
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

/*		uiProgBarMusicVolume.draw();
		uiProgBarEffectsVolume.draw();*/
	};
	
	const drawBG = function() {
		canvasContext.drawImage(titleScreenBG, 0, 0);
		canvasContext.drawImage(titleScreenDecore, 0, 0);
		canvasContext.drawImage(selector, selectorPosition.x, selectorPosition.y);     
	};
    
	const drawTitle = function() {
		JPFont.printTextAt(getLocalizedStringForKey(STRINGS_KEY.SettingsScreenTitle), {x:canvas.width / 2, y:TITLE_Y_POS}, TextAlignment.Center, 1);
	};
}