//Settings Scene
function SettingsScene() {
	const TITLE_Y_POS = 100;
	let selectorPositionsIndex = 0;
	const selections = [
		SCENE.TITLE,
		SCENE.GAME
	];
	const buttonHeight = 25;//TODO: Adjust this size based on custom font
	const buttonTitlePadding = 2;
	const buttons = [];


	this.transitionIn = function() {
		let mainMenuX = 0;
		const mainMenuY = canvas.height - (9 * buttonHeight / 2);
        
		if(buttons.length === 0) {
			buttons.push(buildBackButton(canvas.width / 40, mainMenuY, buttonHeight, buttonTitlePadding));
			buttons.push(buildPlayButton(mainMenuX, mainMenuY, buttonHeight, buttonTitlePadding));

			mainMenuX = canvas.width - (buttons[1].getBounds().width + canvas.width / 40);
			buttons[1].updateXPosition(mainMenuX);
		} else {
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

		// render menu
		printNavigation(buttons, selectorPositionIndex);        
	};
	
	const drawBG = function() {
		canvasContext.drawImage(titleScreenBG,0,0);
		canvasContext.drawImage(titleScreenDecore,0,0);        
	};
    
	const drawTitle = function() {
		colorText(getLocalizedStringForKey(STRINGS_KEY.SettingsScreenTitle), canvas.width / 2, TITLE_Y_POS, Color.White, Fonts.MainTitle, TextAlignment.Center);
	};
}