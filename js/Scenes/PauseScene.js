//Pause Scene
//Settings Scene
function PauseScene() {
	this.name = "Pause";
	const TITLE_Y_POS = 100;
	let selectorPositionsIndex = 0;
	let selectorPosition = {x:0, y:0};
	let titleBlockPosition = {x:0, y:0};
	let titleBlockWidth = 0;
	const selections = [
		SCENE.GAME,
		SCENE.TITLE,
		SCENE.CONTROLS,
		SCENE.HELP
	];
	const buttonHeight = 25;
	const buttonTitlePadding = 2;
	const BUTTON_PADDING = 0.9 * buttonHeight;
	const buttons = [];
	const birds = [];

	this.transitionIn = function() {
		canvasContext.setTransform(1, 0, 0, 1, 0, 0);

		const previousState = SceneState.getPreviousState();
		if((previousState === SCENE.HELP) || 
		(previousState === SCENE.CONTROLS)) {
			const logIndex = SceneState.log.length - 2;
			SceneState.log.splice(logIndex, 2);
		}
			
		let mainMenuX = 0;
		const mainMenuY = BUTTON_PADDING + (canvas.height / 2);
		const deltaY = 2 * BUTTON_PADDING;
        
		if((buttons.length === 0) && (JPFont != undefined)) {
			buttons.push(buildResumeButton(mainMenuX, mainMenuY, buttonHeight, buttonTitlePadding));

			mainMenuX = (canvas.width / 2) - (buttons[0].getBounds().width / 2);
			buttons[0].updateXPosition(mainMenuX);

			selectorPosition.x = mainMenuX - selector.width - (BUTTON_PADDING / 2);
			selectorPosition.y = mainMenuY + (buttonHeight / 2) - (selector.height / 2);

			titleBlockPosition.x = selectorPosition.x - (titleBlock.width - (buttons[0].getBounds().width + (BUTTON_PADDING / 2) + selector.width)) / 2;
			titleBlockPosition.y = canvas.height/2;

			buttons.push(buildQuitButton(mainMenuX, mainMenuY + deltaY, buttonHeight, buttonTitlePadding));
			buttons.push(buildControlsButton(mainMenuX, mainMenuY + 2 * deltaY, buttonHeight, buttonTitlePadding));
			buttons.push(buildHelpButton(mainMenuX, mainMenuY + 3 * deltaY, buttonHeight, buttonTitlePadding));


			buildBirds();

			// support mouse hovers that move the selector
			for (var num=0; num<buttons.length; num++) {
				buttons[num].selectorIndex = num;
			}
		} else {
			updateButtonTitles();
		}

		updateButtonPositions();
		findMenuWidth();
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
		
		let previousState;
		switch (newKeyEvent) {
		case ALIAS.PAUSE:
			pauseManager.resumeGame(CAUSE.Keypress);
			previousState = SceneState.getPreviousState();
			SceneState.setState(previousState);
			sound.playSFX(Sounds.SFX_MenuSelect);
			return true;
		case ALIAS.BACK:
			pauseManager.resumeGame(CAUSE.Keypress);
			SceneState.setState(SceneState.getPreviousState());
			sound.playSFX(Sounds.SFX_MenuSelect);
			return true;
		case ALIAS.QUIT:
			pauseManager.resumeGame(CAUSE.Keypress);
			SceneState.setState(SCENE.TITLE, {didQuit:true});
			sound.playSFX(Sounds.SFX_MenuSelect);
			return true;
		case ALIAS.CONTROLS:
			SceneState.setState(SCENE.CONTROLS);
			sound.playSFX(Sounds.SFX_MenuSelect);
			return true;
		case ALIAS.HELP:
			SceneState.setState(SCENE.HELP);
			sound.playSFX(Sounds.SFX_MenuSelect);
			return true;
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
		selectorPosition.y = buttons[selectorPositionsIndex].getBounds().y + (buttonHeight / 2) - (selector.height / 2);
	};

	const update = function(deltaTime) {
		processUserInput();

		for(let bird of birds) {
			bird.update(deltaTime);
		}
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
					selectorPosition.y = buttons[selectorPositionsIndex].getBounds().y + (buttonHeight / 2) - (selector.height / 2);
					sound.playSFX(Sounds.SFX_MenuNav);
					break;			
				case NAV_ACTION.DOWN:
				case NAV_ACTION.RIGHT:
					selectorPositionsIndex++;
					if (selectorPositionsIndex >= selections.length) {
						selectorPositionsIndex = 0;
					}
					selectorPosition.y = buttons[selectorPositionsIndex].getBounds().y + (buttonHeight / 2) - (selector.height / 2);
					sound.playSFX(Sounds.SFX_MenuNav);
					break;
				case NAV_ACTION.SELECT:
					if(selections[selectorPositionsIndex] === SCENE.GAME) {
						pauseManager.resumeGame(CAUSE.Keypress);
						SceneState.setState(SCENE.GAME);
					} else if(selections[selectorPositionsIndex] === SCENE.TITLE) {
						pauseManager.resumeGame(CAUSE.Keypress);
						SceneState.setState(SCENE.TITLE, {didQuit:true});
					} else {
						SceneState.setState(selections[selectorPositionsIndex]);
					}
					sound.playSFX(Sounds.SFX_MenuSelect);
					break;
				case NAV_ACTION.BACK:
					break;//nowhere to go 'back' to
				case NAV_ACTION.PAUSE:
					break;
				}
			}
		}
	};

	const checkButtons = function() {
		let wasClicked = false;
		for(let button of buttons) {
			wasClicked = button.respondIfClicked(mouseX, mouseY);
			if(wasClicked) {break;}
		}
	};

	const buildResumeButton = function(x, y, height, padding) {
		const thisClick = function() {
			pauseManager.resumeGame(CAUSE.Keypress);
			SceneState.setState(SceneState.getPreviousState());
		};

		return new UIButton(STRINGS_KEY.Resume, x, y, height, padding, thisClick, Color.Purple);
	};

	const buildQuitButton = function(x, y, height, padding) {
		const thisClick = function() {
			pauseManager.resumeGame(CAUSE.Keypress);
			SceneState.setState(SCENE.TITLE, {didQuit:true});
		};

		return new UIButton(STRINGS_KEY.Quit, x, y, height, padding, thisClick, Color.Orange);
	};

	const buildControlsButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.CONTROLS);
			//console.log("Going to the Controls Screen now...");
		};

		return new UIButton(STRINGS_KEY.Controls, x, y, height, padding, thisClick, Color.Aqua);
	};

	const buildHelpButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.HELP);
		};

		return new UIButton(STRINGS_KEY.Help, x, y, height, padding, thisClick, Color.Green);
	};

	const findMenuWidth = function() {
		let maxWidth = 0;
		for(let button of buttons) {
			const thisBounds = button.getBounds();
			if(thisBounds.width > maxWidth) {
				maxWidth = thisBounds.width;
			}
		}
		titleBlockWidth = maxWidth + selector.width + (3 * BUTTON_PADDING);
		titleBlockPosition.x = selectorPosition.x - (3 * BUTTON_PADDING / 2);
	};

	const updateButtonPositions = function() {
		let maxWidth = 0;
		for(let button of buttons) {
			const thisWidth = button.getBounds().width;
			if(thisWidth > maxWidth) {maxWidth = thisWidth;}
		}

		const menuPos = (canvas.width / 2) - (maxWidth / 2);
		for(let button of buttons) {
			button.updateXPosition(menuPos);
		}

		selectorPosition.x = menuPos - selector.width - (BUTTON_PADDING / 2);
	};

	const updateButtonTitles = function() {
		for(let button of buttons) {
			button.updateTitle();
		}
	};

	const buildBirds = function() {
		birds.push(new Bird({x:600, y: 100}, {x:-6, y:6}, 0.75));
		birds.push(new Bird({x:200, y: 400}, {x:18, y:-15}, 1.25));
		birds.push(new Bird({x:100, y: 100}, {x:7, y:7}, 0.75));
	};

	const printButtons = function() {
		for(let button of buttons) {
			button.draw();
		}
	};

	const draw = function() {
		if(JPFont === undefined) return;

		// render the menu background
		drawBG();
		
		for(let bird of birds) {
			if(bird.scale < 1.0) {
				bird.draw();
			}
		}

		drawTitle();

		for(let bird of birds) {
			if(bird.scale >= 1.0) {
				bird.draw();
			}
		}

		// render menu
		printButtons();	
	};
	
	const drawBG = function() {
		canvasContext.drawImage(titleScreenBG, 0, 0);
		canvasContext.drawImage(titleScreenDecore, 0, 0);
		canvasContext.drawImage(titleBlock, 0, 0, titleBlock.width, titleBlock.height, titleBlockPosition.x, titleBlockPosition.y, titleBlockWidth, titleBlock.height);
		canvasContext.drawImage(selector, selectorPosition.x, selectorPosition.y);
	};
	
	const drawTitle = function() {
		JPFont.printTextAt(getLocalizedStringForKey(STRINGS_KEY.Paused), {x:canvas.width / 2, y:TITLE_Y_POS}, TextAlignment.Center, 1);
	};
}