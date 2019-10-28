//Level Introduction Scene
function LevelIntroScene() {
	this.name = "Level Introduction Scene";
	let selectorPositionsIndex = 0;
	const selectorPosition = {x:0, y:0};
	const buttonHeight = 25;
	const buttonTitlePadding = 2;
	const MSG_SCALE = 0.5;
	const buttons = [];
	let MESSAGE_Y_POS;
	let LINE_HEIGHT;
	let message;
	let shouldRestart = false;

	this.transitionIn = function() {
		canvasContext.setTransform(1, 0, 0, 1, 0, 0);

		message = messageForNewLevel();

		let mainMenuX = canvas.width / 2;
		const mainMenuY = canvas.height - (9 * buttonHeight / 2);

		MESSAGE_Y_POS = canvas.height / 3;
		LINE_HEIGHT = 2.0 * JPFont.getCharacterHeight(MSG_SCALE);
		
		if(buttons.length === 0) {
			buttons.push(buildDoneButton(mainMenuX, mainMenuY, buttonHeight, buttonTitlePadding));

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

	const messageForNewLevel = function() {
		switch(currentLevel) {
		case 1:
			return getLocalizedStringForKey(STRINGS_KEY.LevelIntroText_Lvl1);
		case 2:
			return getLocalizedStringForKey(STRINGS_KEY.LevelIntroText_Lvl2);
		case 3:
			return getLocalizedStringForKey(STRINGS_KEY.LevelIntroText_Lvl3);
		case 4:
			return getLocalizedStringForKey(STRINGS_KEY.LevelIntroText_Lvl4);
		case 5:
			return getLocalizedStringForKey(STRINGS_KEY.LevelIntroText_Lvl5);
		}
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
				case NAV_ACTION.SELECT:
					SceneState.setState(SCENE.GAME, {restartLevel:shouldRestart});
					shouldRestart = true;
					// @SoundHook: menuSelectionSound.play();
					sound.playSFX(Sounds.SFX_MenuSelect);
					break;
				}
			}
		}
	};

	const updateSelectorPosition = function() {
		const theseBounds = buttons[selectorPositionsIndex].getBounds();
		const widthToUse = -(selector.width + (buttonHeight / 2));

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

	const buildDoneButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.GAME, {restartLevel:shouldRestart});
			shouldRestart = true;
		};

		return new UIButton(STRINGS_KEY.Done, x, y, height, padding, thisClick, Color.Aqua);
	};

	const updateButtonPositions = function() {
		for(button of buttons) {
			button.updateXPosition(canvas.width / 2);
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
	
		// Draw the Message
		drawMessage();

		// render menu
		printButtons();        
	};
	
	const drawBG = function() {
		canvasContext.drawImage(titleScreenBG, 0, 0);
		canvasContext.drawImage(selector, selectorPosition.x, selectorPosition.y);     
	};

	const drawMessage = function() {
		let lines = message.split("\n");
		for (let num=0; num<lines.length; num++) {
			JPFont.printTextAt(lines[num], {x:canvas.width / 2, y:MESSAGE_Y_POS + ((num - 1)*LINE_HEIGHT)}, TextAlignment.Center, MSG_SCALE);
		}
	};
}