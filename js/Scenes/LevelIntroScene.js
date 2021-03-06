//Level Introduction Scene
function LevelIntroScene() {
	this.name = "Level Introduction Scene";

	const selectorPosition = {x:0, y:0};
	const buttonHeight = 25;
	const buttonTitlePadding = 2;
	const buttons = [];
	const MSG_SCALE = 0.85;
	const CONTROLS_SCALE = 0.3;

	let titleBlockWidth = 0;
	let titleBlockPos = {x:0, y:0};
	let titleBlock2Width = 0;
	let titleBlock2Height = 0;
	let titleBlock2Pos = {x:0, y:0};
	let controlsXPos = 0;
	let specialsXPos = 0;
	let specialsText = "";
	let specialsTextArray = [];
	let selectorPositionsIndex = 0;
	let MESSAGE_Y_POS;
	let CONTROLS_Y_POS;
	let LINE_HEIGHT;
	let MSG_LINE_HEIGHT;
	let message;
	let messageLines;
	let controls;
	let shouldRestart = false;
	let msgScaleAdjust = 0;

	this.transitionIn = function() {
		canvasContext.setTransform(1, 0, 0, 1, 0, 0);

		if(currentLanguage === Language.French) {
			msgScaleAdjust = 0.1;
		}
		message = messageForNewLevel();
		messageLines = message.split("\n");
		controls = getLocalizedStringForKey(STRINGS_KEY.HelpScreenContents).split("\n");

		let mainMenuX = canvas.width / 2;
		const mainMenuY = canvas.height - (9 * buttonHeight / 2);

		MESSAGE_Y_POS = 125;
		LINE_HEIGHT = 1.25 * JPFont.getCharacterHeight(MSG_SCALE);

		CONTROLS_Y_POS = 50 + canvas.height / 2;
		MSG_LINE_HEIGHT = 1.5 * JPFont.getCharacterHeight(CONTROLS_SCALE);
		
		if(buttons.length === 0) {
			buttons.push(buildDoneButton(mainMenuX, mainMenuY, buttonHeight, buttonTitlePadding));

			// support mouse hovers that move the selector
			for (var num=0; num<buttons.length; num++) {
				buttons[num].selectorIndex = num;
			}
		} else {
			updateButtonTitles();
		}

		selectorPositionsIndex = 0;
		updateButtonPositions();
		findSpecialsText();
		findControlsXPos();
		findTitleBlockWidth();
		findTitleBlockHeight();
	};

	this.transitionOut = function() {
		this.properties = null;
	};

	this.run = function(deltaTime) {
		update();

		draw();
	};

	this.control = function(newKeyEvent, pressed) {
		if (pressed) {//only act on key released events => prevent multiple changes on single press
			return false;
		}
		
		switch (newKeyEvent) {
		case ALIAS.POINTER:
			SceneState.setState(SCENE.GAME, {restartLevel:shouldRestart});
			shouldRestart = true;
			return true;
		}
		
		return false;
	};

	this.moveSelector = function(num) {
		// used to simulate arrow key press on mousemove so
		// the cursor moves as appropriate when hovering menu
		selectorPositionsIndex = num;
		updateSelectorPosition();
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

	const specialControlsForBelt = function(belt) {
		let colorToUse = belt;
		if(belt === undefined) {
			playerBelt = localStorageHelper.getInt(localStorageKey.StartingBelt);

			colorToUse = playerBelt;
		}
		
		let resultString = "";
		switch(colorToUse) {
		case BELT.Black:
		case BELT.Red:
			resultString = getLocalizedStringForKey(STRINGS_KEY.ControlsText_Lvl5);
		// eslint-disable-next-line no-fallthrough
		case BELT.Brown:
			resultString = getLocalizedStringForKey(STRINGS_KEY.ControlsText_Lvl4) + "\n" + resultString;
		// eslint-disable-next-line no-fallthrough
		case BELT.Tan:
			resultString = getLocalizedStringForKey(STRINGS_KEY.ControlsText_Lvl3) + "\n" + resultString;
		// eslint-disable-next-line no-fallthrough
		case BELT.Yellow:
			resultString = getLocalizedStringForKey(STRINGS_KEY.ControlsText_Lvl2) + "\n" + resultString;
		}

		return resultString;
	};

	const update = function() {
		processUserInput();
	};

	const processUserInput = function() {
		const navKeys = inputProcessor.getNewlyActiveKeys();
		if(navKeys.length > 0) {
			SceneState.setState(SCENE.GAME, {restartLevel:shouldRestart});
			shouldRestart = true;
			sound.playSFX(Sounds.SFX_MenuSelect);
		}
	};

	const updateSelectorPosition = function() {
		const theseBounds = buttons[selectorPositionsIndex].getBounds();
		const widthToUse = -(selector.width + (buttonHeight / 2));

		selectorPosition.x = theseBounds.x + widthToUse;
		selectorPosition.y = theseBounds.y + (buttonHeight / 2) - (selector.height / 2);
	};

	const buildDoneButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.GAME, {restartLevel:shouldRestart});
			shouldRestart = true;
		};

		return new UIButton(STRINGS_KEY.Done, x, y, height, padding, thisClick, Color.Aqua);
	};

	const findSpecialsText = function() {
		specialsText = specialControlsForBelt(playerBelt);
		specialsTextArray = specialsText.split("\n");
	};

	const findControlsXPos = function() {
		if(specialsText === "") {
			controlsXPos = canvas.width / 2;
		} else {
			controlsXPos = canvas.width / 4;
			specialsXPos = 3 * canvas.width / 4;
		}
	};

	const findTitleBlockWidth = function() {
		let maxWidth = 0;
		let lines = getLocalizedStringForKey(STRINGS_KEY.HelpScreenContents).split("\n");
		for (let num=0; num<lines.length; num++) {
			const thisWidth = JPFont.getStringWidth(lines[num], CONTROLS_SCALE);
			if(thisWidth > maxWidth) {
				maxWidth = thisWidth;
			}
		}

		titleBlockWidth = 30 + maxWidth;
		titleBlockPos.x = canvas.width / 2 - titleBlockWidth / 2 + 4;
		titleBlockPos.y = CONTROLS_Y_POS - 60;

		if(playerBelt !== BELT.White) {
			let maxWidth = 0;
			for (let num=0; num<specialsTextArray.length; num++) {
				const thisWidth = JPFont.getStringWidth(specialsTextArray[num], CONTROLS_SCALE);
				if(thisWidth > maxWidth) {
					maxWidth = thisWidth;
				}
			}
	
			titleBlock2Width = 30 + maxWidth;
			titleBlock2Pos.x = 3 * canvas.width / 4 - titleBlock2Width / 2 + 4;
			titleBlock2Pos.y = CONTROLS_Y_POS - 60;

			titleBlockPos.x = canvas.width / 4 - titleBlockWidth / 2 + 4;
		}
	};

	const findTitleBlockHeight = function() {
		const lineHeight = JPFont.getCharacterHeight(CONTROLS_SCALE);
		titleBlock2Height = Math.max(1.5 * specialsTextArray.length * lineHeight, titleBlock.height);
	};

	const updateButtonPositions = function() {
		for(let button of buttons) {
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

		//Draw the Controls
		drawControls();

		// render menu
		printButtons();        
	};
	
	const drawBG = function() {
		canvasContext.drawImage(titleScreenBG, 0, 0);
		canvasContext.drawImage(selector, selectorPosition.x, selectorPosition.y);
		canvasContext.drawImage(titleBlock, 0, 0, titleBlock.width, titleBlock.height, titleBlockPos.x, titleBlockPos.y, titleBlockWidth, MSG_LINE_HEIGHT * controls.length + 30);   
		if(playerBelt !== BELT.White) {
			canvasContext.drawImage(titleBlock, 0, 0, titleBlock.width, titleBlock.height, titleBlock2Pos.x, titleBlock2Pos.y, titleBlock2Width, titleBlock2Height + 30);
		}
	};

	const drawMessage = function() {
		for (let num=0; num<messageLines.length; num++) {
			JPFont.printTextAt(messageLines[num], {x:canvas.width / 2, y:MESSAGE_Y_POS + ((num - 1)*LINE_HEIGHT)}, TextAlignment.Center, MSG_SCALE - msgScaleAdjust);
		}
	};

	const drawControls = function() {
		for (let num=0; num<controls.length; num++) {
			JPFont.printTextAt(controls[num], {x:controlsXPos, y:CONTROLS_Y_POS + ((num - 1)*MSG_LINE_HEIGHT)}, TextAlignment.Center, CONTROLS_SCALE);
		}

		if(playerBelt !== BELT.White) {
			for (let num=0; num<specialsTextArray.length; num++) {
				JPFont.printTextAt(specialsTextArray[num], {x:specialsXPos, y:CONTROLS_Y_POS + ((num - 1)*MSG_LINE_HEIGHT)}, TextAlignment.Center, CONTROLS_SCALE);
			}
		}
	};
}