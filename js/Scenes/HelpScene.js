//Help Scene
function HelpScene() {
	const TITLE_Y_POS = 100;
	let selectorPositionsIndex = 0;
	const selections = [
		SCENE.TITLE,
		SCENE.GAME
	];
	const buttonHeight = 25;//TODO: Adjust this size based on custom font
	const buttonTitlePadding = 2;
	const buttons = [];
	let canvasPad = 0;
	let screenPos = 0;

	this.transitionIn = function() {
		canvasPad = canvas.width / 40;
		if(canvasContext.mozCurrentTransform != undefined) {
			screenPos = -canvasContext.mozCurrentTransform[4];
		} else {
			screenPos = -canvasContext.getTransform().m41;
		}
		const menuY = canvas.height - (9 * buttonHeight / 2);
        
		if(buttons.length === 0) {
			
			buttons.push(buildBackButton(screenPos + canvasPad, menuY, buttonHeight, buttonTitlePadding));
			buttons.push(buildPlayButton(screenPos + canvas.width - canvasPad, menuY, buttonHeight, buttonTitlePadding));

			const button1Bounds = buttons[1].getBounds();
			buttons[1].updateXPosition(button1Bounds.x - button1Bounds.width);
		} else {
			updateButtonPositions();
			updateButtonTitles();
		}

		selectorPositionsIndex = 0;
	};

	this.transitionOut = function() {

	};

	this.run = function(deltaTime) {
		update(deltaTime);

		draw(deltaTime, buttons, selectorPositionsIndex);
	};

	this.control = function(newKeyEvent, pressed) {
		if (pressed) {//only act on key released events => prevent multiple changes on single press
			return false;
		}
        
		switch (newKeyEvent) {
		case ALIAS.UP:
		case ALIAS.LEFT:
			selectorPositionsIndex--;
			if (selectorPositionsIndex < 0) {
				selectorPositionsIndex += selections.length;
			}
			return true;
		case ALIAS.DOWN:
		case ALIAS.RIGHT:
			selectorPositionsIndex++;
			if (selectorPositionsIndex >= selections.length) {
				selectorPositionsIndex = 0;
			}
			return true;
		case ALIAS.SELECT1:
			SceneState.setState(selections[selectorPositionsIndex]);
			return true;
		case ALIAS.SELECT2:
			SceneState.setState(SCENE.GAME);
			return true;
		case ALIAS.POINTER:
			checkButtons();
			return true;
		}
        
		return false;
	};

	const update = function(deltaTime) {

	};

	const checkButtons = function() {
		let wasClicked = false;
		for(let i = 0; i < buttons.length; i++) {
			wasClicked = buttons[i].respondIfClicked(mouseX, mouseY);
			if(wasClicked) {break;}
		}
	};

	const buildPlayButton = function(x, y, height, padding) {
		const thisClick = function() {
			if(pauseManager.getIsPaused()) {
				pauseManager.resumeGame(CAUSE.Keypress);
			}
			SceneState.setState(SCENE.GAME);
		};

		return new UIButton(STRINGS_KEY.Play, x, y, height, padding, thisClick, Color.Aqua);
	};

	const buildBackButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.popState();
		};

		return new UIButton(STRINGS_KEY.Back, x, y, height, padding, thisClick, Color.Purple);
	};

	const updateButtonPositions = function() {
		buttons[0].updateXPosition(screenPos + canvasPad);
		buttons[1].updateXPosition(screenPos + canvas.width - canvasPad - buttons[1].getBounds().width);
	};

	const updateButtonTitles = function() {
		for(let i = 0; i < buttons.length; i++) {
			buttons[i].updateTitle();
		}
	};

	const printNavigation = function(navItems) {
		for(let i = 0; i < navItems.length; i++) {
			navItems[i].draw();
		}
	};

	const draw = function(deltaTime, buttons, selectorPositionIndex) {
		// render the menu background
		drawBG();
        
		drawTitle();
        
		drawHelpScreenContents();

		// render menu
		printNavigation(buttons, selectorPositionIndex);        
	};
	
	const drawBG = function() {
		canvasContext.drawImage(titleScreenBG, screenPos, 0);
		canvasContext.drawImage(titleScreenDecore, screenPos, 0);        
		canvasContext.drawImage(titleBlock, screenPos + canvas.width / 2 - titleBlock.width / 2, canvas.height / 2 - 38);        
	};
    
	const drawTitle = function() {
		colorText(getLocalizedStringForKey(STRINGS_KEY.HelpScreenTitle), 
			screenPos + canvas.width / 2, TITLE_Y_POS, Color.White, Fonts.MainTitle, TextAlignment.Center, true);
	};

	const drawHelpScreenContents = function() {
		const LINE_HEIGHT = 24;
		let lines = getLocalizedStringForKey(STRINGS_KEY.HelpScreenContents).split("\n");
		for (let num=0; num<lines.length; num++) {
			colorText(lines[num], 
				screenPos + canvas.width / 2, canvas.height / 2 + (num*LINE_HEIGHT), Color.White, 
				Fonts.CreditsText, TextAlignment.Center, true);
		}
	};
}