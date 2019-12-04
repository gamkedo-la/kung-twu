//Power Up Scene
function PowerUpScene() {
	this.name = "Power Up Scene";
	let selectorPositionsIndex = 0;
	const selectorPosition = {x:0, y:0};
	const buttonHeight = 25;
	const buttonTitlePadding = 2;
	const MSG_SCALE = 0.5;
	const buttons = [];
	let MESSAGE_Y_POS;
	let message;

	this.transitionIn = function() {
		canvasContext.setTransform(1, 0, 0, 1, 0, 0);

		message = messageForNewLevel();

		let mainMenuX = canvas.width / 2;
		const mainMenuY = canvas.height - (9 * buttonHeight / 2);

		MESSAGE_Y_POS = mainMenuY - (9 * buttonHeight / 2);
		
		if(buttons.length === 0) {
			buttons.push(buildDoneButton(mainMenuX, mainMenuY, buttonHeight, buttonTitlePadding));

			updateButtonPositions();

			// support mouse hovers that move the selector
			for (var num=0; num<buttons.length; num++) {
				buttons[num].selectorIndex = num;
			}
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

	this.moveSelector = function(num) {
		// used to simulate arrow key press on mousemove so
		// the cursor moves as appropriate when hovering menu
		//console.log("Moving menu menu selector: " + num);
		selectorPositionsIndex = num;
		updateSelectorPosition();
	};

	const messageForNewLevel = function() {
		switch(currentLevel) {
		case 2:
			return getLocalizedStringForKey(STRINGS_KEY.HowToDash);
		case 3:
			return getLocalizedStringForKey(STRINGS_KEY.HowToSweep);
		case 4:
			return getLocalizedStringForKey(STRINGS_KEY.HowToJ_Kick);
		case 5:
			return getLocalizedStringForKey(STRINGS_KEY.HowToH_Kick);
		}
	};

	const update = function() {
		processUserInput();
	};

	const processUserInput = function() {
		const navKeys = inputProcessor.getNewlyReleasedKeys();
		if(navKeys.length > 0) {
			SceneState.setState(SCENE.LEVEL_INTRO);
			sound.playSFX(Sounds.SFX_MenuSelect);
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
			SceneState.setState(SCENE.LEVEL_INTRO);
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
		const beltImage = presentationImageForLevel();
		canvasContext.drawImage(beltImage, 0, 0, 
			beltImage.width, beltImage.height,
			(canvas.width - beltImage.width) / 2,
			(canvas.height - beltImage.height) / 5,
			beltImage.width, beltImage.height);
		canvasContext.drawImage(selector, selectorPosition.x, selectorPosition.y);     
	};

	const presentationImageForLevel = function() {
		switch(currentLevel) {
		case 2: return yellowPresentation;
		case 3: return tanPresentation;
		case 4: return brownPresentation;
		case 5: return redPresentation;
		default: return blackPresentation;
		}
	};

	const drawMessage = function() {
		const LINE_HEIGHT = 2.0 * JPFont.getCharacterHeight(0.35);
		let lines = message.split("\n");
		for (let num=0; num<lines.length; num++) {
			JPFont.printTextAt(lines[num], {x:canvas.width / 2, y:MESSAGE_Y_POS + ((num - 1)*LINE_HEIGHT)}, TextAlignment.Center, MSG_SCALE);
		}
	};
}
