//Credits Scene
function CreditsScene() {
	this.name = "Credits";
	let selectorPositionsIndex = 0;
	const selectorPosition = {x:0, y:0};
	const TITLE_Y_POS = 100;
	const selections = [
		SCENE.TITLE,
		SCENE.GAME
	];
	const buttonHeight = 25;
	const buttonTitlePadding = 2;
	let buttonPadding;
	const buttons = [];
	const creditsList = [
		"line 01",				  
		"line 02",
		"line 03",
		"line 03",
		"line 03",
		"line 02",
		"line 0A",
		"line 03",
		"line 03",
		"line 02",
		"line 03",
		"line 03",
		"line 0B",
		"line 02",
		"line 03",
		"line 02",
		"line 03",
		"line 03",
		"line 03",
		"line 02",
		"line 03",
		"line 03",
		"END OF CREDITS"];

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

		draw();
	};

	this.control = function(newKeyEvent, pressed) {
		if (pressed) {//only act on key released events => prevent multiple changes on single press
			return false;
		}
		
		switch (newKeyEvent) {
		case ALIAS.SELECT2:
			if(pauseManager.getIsPaused()) {
				pauseManager.resumeGame(CAUSE.Keypress);
			}
			SceneState.setState(SCENE.LEVEL_INTRO);
			sound.playSFX(Sounds.SFX_MenuSelect);
			return true;
		case ALIAS.POINTER:
			checkButtons();
			return true;
		}
		
		return false;
	};

	const update = function(deltaTime) {
		processUserInput();

		creditReel(deltaTime);
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
				case NAV_ACTION.BACK:
					break;//nowhere to go 'back' to
				case NAV_ACTION.PAUSE:

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

		drawCredits();

		// render menu
		printButtons();        
	};
	
	const drawBG = function() {
		canvasContext.drawImage(titleScreenBG, 0, 0);
		canvasContext.drawImage(titleScreenDecore, 0, 0); 
		canvasContext.drawImage(selector, selectorPosition.x, selectorPosition.y);            
	};
	
	const drawTitle = function() {
		JPFont.printTextAt(getLocalizedStringForKey(STRINGS_KEY.CreditsScreenTitle),{x:canvas.width / 2,y:TITLE_Y_POS}, TextAlignment.Center, 1);
	};

	var creditPosY = 300;
	const drawCredits = function() {
		for(var i=0; i<creditsList.length; i++) {
			var yPos = creditPosY + i * 30;
			if (200 < yPos && yPos < 600) {
				colorText(
					creditsList[i],
					canvas.width/2, yPos,
					Color.White, Fonts.CreditsText, TextAlignment.Center);
			}
		}
	};


	const creditReel = function(deltaTime) {
		creditPosY -= (0.025 * deltaTime);
		canvas.addEventListener('wheel', creditScroll);
	};

	// function for user to control credits by scrolling with mouse wheel
	const creditScroll = function(e) {
		//TODO: Add implementation here
			 //console.log(e.deltaY);
			 var lastScrollPosition = 100;
			 var newScrollPosition = lastScrollPosition + e.deltaY;
			 //console.log (newScrollPosition);

			 if (newScrollPosition > lastScrollPosition) {
			 	//upward scroll code
			 	creditPosY -= 2.5;
			 }
			 if (newScrollPosition < lastScrollPosition)
			 { //downward scroll code
			 	creditPosY += 2.5;
			 }
	    
	};
}