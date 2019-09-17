//Credits Scene
function CreditsScene() {
	let selectorPositionsIndex = 0;
	const TITLE_Y_POS = 100;
	const selections = [
		SCENE.TITLE,
		SCENE.GAME
	];
	const buttonHeight = 25;//TODO: Adjust this size based on custom font
	const buttonTitlePadding = 2;
	let buttonPadding;
	const buttons = [];

	this.transitionIn = function() {
		canvasContext.setTransform(1, 0, 0, 1, 0, 0);

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

		draw(buttons);
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
		buttons[0].updateXPosition(buttonPadding);
		const button1Width = buttons[1].getBounds().width;
		buttons[1].updateXPosition(canvas.width - (button1Width + buttonPadding));
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

	const draw = function(buttons) {
		// render the menu background
		drawBG();
        
		drawTitle();

		// render menu
		printNavigation(buttons);        
	};
	
	const drawBG = function() {
		canvasContext.drawImage(titleScreenBG, 0, 0);
		canvasContext.drawImage(titleScreenDecore, 0, 0);        
	};
    
	const drawTitle = function() {
		colorText(getLocalizedStringForKey(STRINGS_KEY.CreditsScreenTitle), canvas.width / 2, TITLE_Y_POS, Color.White, Fonts.MainTitle, TextAlignment.Center);
	};
}