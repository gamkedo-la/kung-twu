//Game Over Scene
function GameOverScene() {
	this.name = "Game Over";
	let selectorPositionsIndex = 0;
	let selectorPosition = {x:0, y:0};
	let titleBlockPosition = {x:0, y:0};
	let titleBlockWidth = 0;
	const selections = [
		SCENE.GAME,
		SCENE.TITLE,
		SCENE.SETTINGS,
		SCENE.CREDITS
	];
	const buttonHeight = 25;
	const buttonTitlePadding = 2;
	const BUTTON_PADDING = 0.9 * buttonHeight;
	const buttons = [];
	const birds = [];
	let score = 0;
	const TEXT_SCALE = 0.5;
	let lineHeight;

	this.transitionIn = function() {
		canvasContext.setTransform(1, 0, 0, 1, 0, 0);
		lineHeight = JPFont.getCharacterHeight(TEXT_SCALE);

		if(this.properties) {
			score = this.properties.score;
		}

		let mainMenuX = 0;
		const BUTTON_PADDING = 0.9 * buttonHeight;
		const mainMenuY = BUTTON_PADDING + (2 * canvas.height / 3);
		const deltaY = 2 * BUTTON_PADDING;
		
		if(buttons.length === 0) {
			buttons.push(buildContinueButton(mainMenuX, mainMenuY, buttonHeight, buttonTitlePadding));

			const button0Bounds = buttons[0].getBounds();
			mainMenuX = (canvas.width / 2) - (button0Bounds.width / 2);
			buttons[0].updateXPosition(mainMenuX);

			selectorPosition.x = mainMenuX - selector.width - (BUTTON_PADDING / 2);
			selectorPosition.y = mainMenuY + (buttonHeight / 2) - (selector.height / 2);

			titleBlockPosition.x = selectorPosition.x - (titleBlock.width - (button0Bounds.width + (BUTTON_PADDING / 2) + selector.width)) / 2;
			titleBlockPosition.y = mainMenuY - BUTTON_PADDING;

			buttons.push(buildEndButton(mainMenuX, mainMenuY + deltaY, buttonHeight, buttonTitlePadding));
			buttons.push(buildSettingsButton(mainMenuX, mainMenuY + 2 * deltaY, buttonHeight, buttonTitlePadding));
			buttons.push(buildCreditsButton(mainMenuX, mainMenuY + 3 * deltaY, buttonHeight, buttonTitlePadding));

			buildBirds();
		} else {
			updateButtonTitles();
		}

		updateButtonPositions();
		findMenuWidth();

		// @SoundHook:
		// if(currentBackgroundMusic.getCurrentTrack() != gameOverMusic) {
		// 	currentBackgroundMusic.loopSong(gameOverMusic);
		// }
		if (sound.getCurrentBGMKey() != Sounds.BGM_GameOver) {
			sound.playBGM(Sounds.BGM_GameOver);
		}

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
		case ALIAS.DEBUG:
			DEBUG = !DEBUG;
			// @SoundHook: menuSelectionSound.play();
			sound.playSFX(Sounds.SFX_MenuSelect);
			return true;
		case ALIAS.POINTER:
			checkButtons();
			return true;
		}
		
		return false;
	};

	const buildContinueButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.GAME, {restartLevel:true});
		};

		return new UIButton(STRINGS_KEY.Continue, x, y, height, padding, thisClick, Color.Red);
	};

	const buildEndButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.TITLE, {didQuit:true});
		};

		return new UIButton(STRINGS_KEY.End, x, y, height, padding, thisClick, Color.Green);
	};

	const buildSettingsButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.SETTINGS);
		};

		return new UIButton(STRINGS_KEY.Settings, x, y, height, padding, thisClick, Color.Aqua);
	};

	const buildCreditsButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.CREDITS);
		};

		return new UIButton(STRINGS_KEY.Credits, x, y, height, padding, thisClick, Color.Purple);
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

	const checkButtons = function() {
		let wasClicked = false;
		for(let button of buttons) {
			wasClicked = button.respondIfClicked(mouseX, mouseY);
			if(wasClicked) {break;}
		}
	};
	
	const printButtons = function() {
		for(let button of buttons) {
			button.draw();
		}
	};
	
	const update = function(deltaTime) {
		processUserInput();

		for(let bird of birds) {
			bird.update(deltaTime);
		}
	};

	const processUserInput = function() {
		const navKeys = inputProcessor.getNewlyReleasedKeys();
		let properties = null;
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
					// @SoundHook: menuNavigationSound.play();
					sound.playSFX(Sounds.SFX_MenuNav);
					break;
				case NAV_ACTION.DOWN:
				case NAV_ACTION.RIGHT:
					selectorPositionsIndex++;
					if (selectorPositionsIndex >= selections.length) {
						selectorPositionsIndex = 0;
					}
					selectorPosition.y = buttons[selectorPositionsIndex].getBounds().y + (buttonHeight / 2) - (selector.height / 2);
					// @SoundHook menuNavigationSound.play();
					sound.playSFX(Sounds.SFX_MenuNav);
					break;
				case NAV_ACTION.SELECT:
					if(selections[selectorPositionsIndex] === SCENE.GAME) {
						properties = {restartLevel:true};
					} else if(selections[selectorPositionsIndex] === SCENE.TITLE) {
						properties = {didQuit:true};
					} 
					// @SoundHook: menuSelectionSound.play();
					sound.playSFX(Sounds.SFX_MenuSelect);
					SceneState.setState(selections[selectorPositionsIndex], properties);
					break;
				case NAV_ACTION.BACK:
					break;//nowhere to go 'back' to
				case NAV_ACTION.PAUSE:

				}
			}
		}
	};
	
	const draw = function() {
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
		canvasContext.drawImage(titleBlock, 0, 0, titleBlock.width, titleBlock.height, titleBlockPosition.x, titleBlockPosition.y, titleBlockWidth, titleBlock.height);
		canvasContext.drawImage(selector, selectorPosition.x, selectorPosition.y);
	};
	
	const drawTitle = function() {
		const scale = 2/3;
		const drawY = 25;
		const titleXPos = (canvas.width - (scale * titleImage.width)) / 2;
		canvasContext.drawImage(titleImage, 0, 0, titleImage.width, titleImage.height, titleXPos, drawY, scale * titleImage.width, scale * titleImage.height);

		JPFont.printTextAt(getLocalizedStringForKey(STRINGS_KEY.GameOverTitle), {x:canvas.width / 2, y:canvas.height / 3 - 100}, TextAlignment.Center, 1);
		
		let highScore = localStorageHelper.getObject(localStorageKey.HighScore);

		JPFont.printTextAt(getLocalizedStringForKey(STRINGS_KEY.HighScore), {x:canvas.width / 2, y:canvas.height / 3}, TextAlignment.Right, TEXT_SCALE);
		JPFont.printTextAt(highScore, {x:canvas.width / 2, y:canvas.height / 3}, TextAlignment.Left, TEXT_SCALE);
		
		JPFont.printTextAt(getLocalizedStringForKey(STRINGS_KEY.Score), {x:canvas.width / 2, y:(canvas.height / 3) + lineHeight}, TextAlignment.Right, TEXT_SCALE);
		let scoreString = score.toString();
		while(scoreString.length < 9) {
			scoreString = "0" + scoreString;
		}

		JPFont.printTextAt(scoreString, {x:canvas.width / 2, y:(canvas.height / 3) + lineHeight}, TextAlignment.Left, TEXT_SCALE);
	};
		
	return this;
}