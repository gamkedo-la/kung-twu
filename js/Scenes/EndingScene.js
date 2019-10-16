//Beat the game Scene
function EndingScene() {
	this.name = "End Scene";
	let selectorPositionsIndex = 0;
	const selectorPosition = {x:0, y:0};
	const buttonHeight = 25;//TODO: Adjust this size based on custom font
	const buttonTitlePadding = 2;
	const buttons = [];
	let MESSAGE_Y_POS;
	const LINE_HEIGHT = 76;
	let message;

	this.transitionIn = function() {
		canvasContext.setTransform(1, 0, 0, 1, 0, 0);

		message = getLocalizedStringForKey(STRINGS_KEY.EndGameMessage).split("\n");

		let mainMenuX = canvas.width / 2;
		const mainMenuY = canvas.height - (9 * buttonHeight / 2);

		MESSAGE_Y_POS = canvas.height / 2 - (message.length * LINE_HEIGHT / 2);
		
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
					SceneState.setState(SCENE.TITLE);
					// @SoundHook: menuSelectionSound.play();
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
			SceneState.setState(SCENE.TITLE);
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
		for (let i = 0; i < message.length; i++) {
			colorText(message[i], 
				canvas.width / 2, MESSAGE_Y_POS + (i * LINE_HEIGHT),
				Color.White, Fonts.MainTitle, TextAlignment.Center, true);
		}
	};
}