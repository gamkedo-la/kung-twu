//Assist Scene 2
//Assist Mode Scene
function AssistScene2() {
	const TITLE_Y_POS = 100;
	const TITLE_SCALE = 1;
	const HEADER_SCALE = 0.7;

	const SLIDER_W = 200;

	const COL_DELTA = 63;
	const COL1_X = 60;
	const COL2_X = COL1_X + SLIDER_W + COL_DELTA;
	const COL3_X = COL2_X + SLIDER_W + COL_DELTA;

	const ROW_DELTA = 80;
	const ROW1_Y = TITLE_Y_POS + 90 + ROW_DELTA;
	const ROW2_Y = ROW1_Y + ROW_DELTA;
	const ROW3_Y = ROW2_Y + ROW_DELTA;
	const ROW4_Y = ROW3_Y + ROW_DELTA;
	const ROW5_Y = ROW4_Y + ROW_DELTA;

	this.name = "Assist";
	let selectorPositionsIndex = 0;
	const selectorPosition = {x:0, y:0};
	const buttonHeight = 25;
	const buttonTitlePadding = 2;
	let buttonPadding;
	const buttons = [];
	const slider = {};
	let sliderData = null;
	let sliderArray = null;

	this.transitionIn = function() {
		canvasContext.setTransform(1, 0, 0, 1, 0, 0);

		buttonPadding = canvas.width / 40;
		
		const menuY = canvas.height - (9 * buttonHeight / 2);

		if(sliderData === null) {
			buildSliderData();
		}
		
		if(buttons.length === 0) {
			buildSliderButtons();
			buttons.push(buildBackButton(buttonPadding, menuY, buttonHeight, buttonTitlePadding));
			buttons.push(buildPlayButton(canvas.width - buttonPadding, menuY, buttonHeight, buttonTitlePadding));
		
			// support mouse hovers that move the selector
			for (var num=0; num<buttons.length; num++) {
				buttons[num].selectorIndex = num;
			}
			
		} else {
			updateButtonTitles();
		}

		updateButtonPositions();

		selectorPositionsIndex = 0;
		updateSelectorPosition();
	};

	this.transitionOut = function() {
		this.properties = null;
	};

	this.run = function() {
		update();

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

	this.moveSelector = function(num) {
		// used to simulate arrow key press on mousemove so
		// the cursor moves as appropriate when hovering menu
		selectorPositionsIndex = num;
		updateSelectorPosition();
	};

	const buildSliderButtons = function() {
		/*First Column of Sliders */
		//Player Max Health
		buttons.push(buildPlayerHealthButton(COL1_X, ROW1_Y, buttonHeight, buttonTitlePadding));

		//Starting Belt Color
		buttons.push(buildBeltColorButton(COL1_X, ROW2_Y, buttonHeight, buttonTitlePadding));

		//Player Base Damage
		buttons.push(buildPlayerStrengthButton(COL1_X, ROW3_Y, buttonHeight, buttonTitlePadding));

		//Player Invincibility
		buttons.push(buildInvincibilityButton(COL1_X, ROW4_Y, buttonHeight, buttonTitlePadding));

		//Player Knockback
		buttons.push(buildKnockbackButton(COL1_X, ROW5_Y, buttonHeight, buttonTitlePadding));

		/*Second Column of Sliders */
		//Enemy Max Health
		buttons.push(buildEnemyHealthButton(COL2_X, ROW1_Y, buttonHeight, buttonTitlePadding));

		//Basic Enemy Strength
		buttons.push(buildEnemyStrengthButton(COL2_X, ROW2_Y, buttonHeight, buttonTitlePadding));

		//Boss Health
		buttons.push(buildBossHealthButton(COL2_X, ROW3_Y, buttonHeight, buttonTitlePadding));

		//Boss Strength
		buttons.push(buildBossStrengthButton(COL2_X, ROW4_Y, buttonHeight, buttonTitlePadding));


		/*Third Column of Sliders*/
		//Starting Level
		buttons.push(buildStartLevelButton(COL3_X, ROW1_Y, buttonHeight, buttonTitlePadding));

		//Base Enemies Per Level
		buttons.push(buildEnemiesPerLevelButton(COL3_X, ROW2_Y, buttonHeight, buttonTitlePadding));

		//Variable Time Per Level
		buttons.push(buildTimeButton(COL3_X, ROW3_Y, buttonHeight, buttonTitlePadding));

		//Active Rival Count
		buttons.push(buildActiveRivalsButton(COL3_X, ROW4_Y, buttonHeight, buttonTitlePadding));

		//Overall Game Speed
		buttons.push(buildGameSpeedButton(COL3_X, ROW5_Y, buttonHeight, buttonTitlePadding));
	};

	const buildPlayerHealthButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.SLIDER, sliderData.playerHealth);
		};

		return new UIButton(sliderData.playerHealth.titleKey, x, y, height, padding, thisClick, Color.Aqua);
	};

	const buildEnemyHealthButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.SLIDER, sliderData.enemyHealth);
		};

		return new UIButton(sliderData.enemyHealth.titleKey, x, y, height, padding, thisClick, Color.Aqua);
	};

	const buildStartLevelButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.SLIDER, sliderData.startingLevel);
		};

		return new UIButton(sliderData.startingLevel.titleKey, x, y, height, padding, thisClick, Color.Aqua);
	};

	const buildBeltColorButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.SLIDER, sliderData.startingBelt);
		};

		return new UIButton(sliderData.startingBelt.titleKey, x, y, height, padding, thisClick, Color.Aqua);
	};

	const buildEnemyStrengthButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.SLIDER, sliderData.enemyStrength);
		};

		return new UIButton(sliderData.enemyStrength.titleKey, x, y, height, padding, thisClick, Color.Aqua);
	};

	const buildEnemiesPerLevelButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.SLIDER, sliderData.enemiesPerLevel);
		};

		return new UIButton(sliderData.enemiesPerLevel.titleKey, x, y, height, padding, thisClick, Color.Aqua);
	};

	const buildPlayerStrengthButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.SLIDER, sliderData.playerStrength);
		};

		return new UIButton(sliderData.playerStrength.titleKey, x, y, height, padding, thisClick, Color.Aqua);
	};

	const buildBossHealthButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.SLIDER, sliderData.bossHealth);
		};

		return new UIButton(sliderData.bossHealth.titleKey, x, y, height, padding, thisClick, Color.Aqua);
	};

	const buildTimeButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.SLIDER, sliderData.timeLimit);
		};

		return new UIButton(sliderData.timeLimit.titleKey, x, y, height, padding, thisClick, Color.Aqua);
	};

	const buildInvincibilityButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.SLIDER, sliderData.invincibility);
		};
		const invincibleButton = new UIButton(sliderData.invincibility.titleKey, x, y, height, padding, thisClick, Color.Aqua);
		if(invincibleButton.getBounds().width > 200) {
			invincibleButton.setScale(0.27);
		}
		return invincibleButton;
	};

	const buildBossStrengthButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.SLIDER, sliderData.bossStrength);
		};

		return new UIButton(sliderData.bossStrength.titleKey, x, y, height, padding, thisClick, Color.Aqua);
	};

	const buildActiveRivalsButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.SLIDER, sliderData.simultaneousEnemies);
		};

		return new UIButton(sliderData.simultaneousEnemies.titleKey, x, y, height, padding, thisClick, Color.Aqua);
	};

	const buildGameSpeedButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.SLIDER, sliderData.gameSpeed);
		};

		return new UIButton(sliderData.gameSpeed.titleKey, x, y, height, padding, thisClick, Color.Aqua);
	};

	const buildKnockbackButton = function(x, y, height, padding) {
		const thisClick = function() {
			SceneState.setState(SCENE.SLIDER, sliderData.knockback);
		};

		return new UIButton(sliderData.knockback.titleKey, x, y, height, padding, thisClick, Color.Aqua);
	};

	const update = function() {
		processUserInput();
	};

	const processUserInput = function() {
		const navKeys = inputProcessor.getNewlyActiveKeys();
		for(let key of navKeys) {
			const newNavAction = keyMapper.getNavAction(key);
			if(newNavAction != null) {
				switch(newNavAction) {
				case NAV_ACTION.UP:
					selectorPositionsIndex--;
					if (selectorPositionsIndex < 0) {
						selectorPositionsIndex += buttons.length;
					}
					updateSelectorPosition();
					sound.playSFX(Sounds.SFX_MenuNav);
					break;
				case NAV_ACTION.LEFT:
					if(selectorPositionsIndex === 0) {
						selectorPositionsIndex = buttons.length - 1;
					} else if(selectorPositionsIndex < 4) {
						selectorPositionsIndex += 8;
					} else if(selectorPositionsIndex === 4) {
						selectorPositionsIndex = 12;
					}  else if(selectorPositionsIndex < 9) {
						selectorPositionsIndex -= 5;
					} else if(selectorPositionsIndex < 13) {
						selectorPositionsIndex -= 4;
					} else if(selectorPositionsIndex <= 14) {
						selectorPositionsIndex--;
					}
					updateSelectorPosition();
					break;
				case NAV_ACTION.DOWN:
					if((selectorPositionsIndex === 4) || (selectorPositionsIndex === 8)) {
						selectorPositionsIndex = 13;
					} else if(selectorPositionsIndex === 12) {
						selectorPositionsIndex = buttons.length - 1;
					} else {
						selectorPositionsIndex++;
						if (selectorPositionsIndex >= buttons.length) {
							selectorPositionsIndex = 0;
						}	
					}
					updateSelectorPosition();
					sound.playSFX(Sounds.SFX_MenuNav);
					break;
				case NAV_ACTION.RIGHT:
					if(selectorPositionsIndex < 4) {
						selectorPositionsIndex += 5;
					} else if(selectorPositionsIndex < 5) {
						selectorPositionsIndex = buttons.length - 2;
					} else if(selectorPositionsIndex < 9) {
						selectorPositionsIndex += 4;
					} else if(selectorPositionsIndex < 13) {
						selectorPositionsIndex -= 8;
					} else if(selectorPositionsIndex === buttons.length - 2) {
						selectorPositionsIndex++;
					} else if(selectorPositionsIndex === buttons.length - 1) {
						selectorPositionsIndex = 0;
					}
					updateSelectorPosition();
					break;
				case NAV_ACTION.SELECT:
					if(selectorPositionsIndex === buttons.length - 2) {
						SceneState.setState(SceneState.getPreviousState());
					} else if(selectorPositionsIndex === buttons.length - 1) {
						SceneState.setState(SCENE.LEVEL_INTRO);
					} else {
						SceneState.setState(SCENE.SLIDER, sliderArray[selectorPositionsIndex]);
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
		const theButton = buttons[selectorPositionsIndex];
		const theBounds = theButton.getBounds();
		let widthToUse = -(selector.width);// + (buttonHeight / 2));
		if(theButton.title === getLocalizedStringForKey(STRINGS_KEY.Back)) {
			widthToUse = theBounds.width + (buttonHeight / 2);
		}

		selectorPosition.x = theBounds.x + widthToUse;
		selectorPosition.y = theBounds.y + (theBounds.height / 2) - (selector.height / 2);
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
			if(pauseManager.getIsPaused()) {
				pauseManager.resumeGame(CAUSE.Keypress);
			}
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
		for(let aButton of buttons) {
			if(aButton.title === getLocalizedStringForKey(STRINGS_KEY.Play)) {
				const playButtonWidth = aButton.getBounds().width;
				aButton.updateXPosition(canvas.width - (playButtonWidth + buttonPadding));
			} else if(aButton.title === getLocalizedStringForKey(STRINGS_KEY.Back)) {
				aButton.updateXPosition(buttonPadding);
			}
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
		
		drawTitle();

		drawHeaders();
		
		// @ts-ignore
		const sliders = Object.values(slider);
		for(let aSlider of sliders) {
			aSlider.draw();
		}

		// render menu
		printButtons();        
	};
	
	const drawBG = function() {
		canvasContext.drawImage(titleScreenBG, 0, 0);
		canvasContext.drawImage(titleScreenDecore, 0, 0);
		canvasContext.drawImage(assistBorder, 10, 250);
		canvasContext.drawImage(assistBorder, 10 + SLIDER_W + COL_DELTA, 250);
		canvasContext.drawImage(assistBorder, 10 + 2 * (SLIDER_W + COL_DELTA), 250);
		canvasContext.drawImage(selector, selectorPosition.x, selectorPosition.y);
	};
	
	const drawTitle = function() {
		JPFont.printTextAt(getLocalizedStringForKey(STRINGS_KEY.AssistSceneTitle),
			{x:canvas.width / 2, y:TITLE_Y_POS}, TextAlignment.Center, TITLE_SCALE);
	};

	const drawHeaders = function() {
		let scaleToUse = HEADER_SCALE;
		if(currentLanguage === Language.Russian) {
			scaleToUse = HEADER_SCALE - 0.15;
		}
		JPFont.printTextAt(getLocalizedStringForKey(STRINGS_KEY.Player),
			{x:(COL2_X - COL1_X) / 2, y:ROW1_Y - 75}, TextAlignment.Center, scaleToUse);
		JPFont.printTextAt(getLocalizedStringForKey(STRINGS_KEY.Rivals_),
			{x:(COL2_X - COL1_X) / 2 + (SLIDER_W + COL_DELTA), y:ROW1_Y - 75}, TextAlignment.Center, scaleToUse);
		JPFont.printTextAt(getLocalizedStringForKey(STRINGS_KEY.Level_),
			{x:(COL2_X - COL1_X) / 2 + 2 * (SLIDER_W + COL_DELTA), y:ROW1_Y - 75}, TextAlignment.Center, scaleToUse);
	};

	const buildSliderData = function() {
		sliderData = {
			playerHealth: {
				name:SLIDER_NAMES.MaxHealth,
				titleKey:STRINGS_KEY.MaxHealth,
				minValue:10,
				minTitle:"10",
				storageKey:localStorageKey.PlayerMaxHealth,
				default:ASSIST_DEFAULT.MaxHealth,
				maxValue:400,
				maxTitle:"400",
				steps:39,
				colors:[Color.Red, Color.Orange, Color.Yellow, Color.Green, Color.Blue]
			},
			playerStrength: {
				name:SLIDER_NAMES.PlayerBaseDamage,
				titleKey:STRINGS_KEY.PlayerDamage,
				minValue:1,
				minTitle:"1",
				storageKey:localStorageKey.PlayerBaseDamage,
				default:ASSIST_DEFAULT.PlayerBaseDamage,
				maxValue:50,
				maxTitle:"50",
				steps:49,
				colors:[Color.Red, Color.Orange, Color.Yellow, Color.Green, Color.Blue]
			},
			startingBelt: {
				name:SLIDER_NAMES.StartBelt,
				titleKey:STRINGS_KEY.StartBelt,
				minValue:0,
				minTitle:getLocalizedStringForKey(STRINGS_KEY.BeltWhite),
				storageKey:localStorageKey.StartingBelt,
				default:ASSIST_DEFAULT.StartBelt,
				valueLabels:[
					getLocalizedStringForKey(STRINGS_KEY.BeltWhite),
					getLocalizedStringForKey(STRINGS_KEY.BeltYellow),
					getLocalizedStringForKey(STRINGS_KEY.BeltTan),
					getLocalizedStringForKey(STRINGS_KEY.BeltBrown),
					getLocalizedStringForKey(STRINGS_KEY.BeltRed),
					getLocalizedStringForKey(STRINGS_KEY.BeltBlack),
				],
				maxValue:5,
				maxTitle:getLocalizedStringForKey(STRINGS_KEY.BeltBlack),
				steps:5,
				colors:[Color.White, Color.Yellow, Color.Tan, Color.Brown, Color.Red, Color.Black]
			},
			startingLevel: {
				name:SLIDER_NAMES.StartLevel,
				titleKey:STRINGS_KEY.StartLevel,
				minValue:1,
				minTitle:getLocalizedStringForKey(STRINGS_KEY.Level1),
				storageKey:localStorageKey.StartingLevel,
				default:ASSIST_DEFAULT.StartLevel,
				valueLabels:[
					getLocalizedStringForKey(STRINGS_KEY.Level1),
					getLocalizedStringForKey(STRINGS_KEY.Level2),
					getLocalizedStringForKey(STRINGS_KEY.Level3),
					getLocalizedStringForKey(STRINGS_KEY.Level4),
					getLocalizedStringForKey(STRINGS_KEY.Level5)
				],
				maxValue:5,
				maxTitle:getLocalizedStringForKey(STRINGS_KEY.Level5),
				steps:4,
				colors:[Color.Orange, Color.White, Color.Green, Color.Blue, Color.Red]
			},
			invincibility: {
				name:SLIDER_NAMES.InvincibleDuration,
				titleKey:STRINGS_KEY.Invicibility,
				minValue:0,
				minTitle:"0",
				storageKey:localStorageKey.InvincibleDuration,
				default:ASSIST_DEFAULT.InvincibleDuration,
				maxValue:5000,
				maxTitle:"5000",
				steps:50,
				colors:[Color.Red, Color.Orange, Color.Yellow, Color.Green, Color.Blue]
			},
			knockback: {
				name:SLIDER_NAMES.KnockbackSpeed,
				titleKey:STRINGS_KEY.Knockback,
				minValue:0,
				minTitle:"0",
				storageKey:localStorageKey.KnockbackSpeed,
				default:ASSIST_DEFAULT.KnockbackSpeed,
				maxValue:2000,
				maxTitle:"2000",
				steps:20,
				colors:[Color.White]
			},
			enemyHealth: {
				name:SLIDER_NAMES.BaseEnemyHealth,
				titleKey:STRINGS_KEY.RivalHealth,
				minValue:1,
				minTitle:"1",
				storageKey:localStorageKey.BaseEnemyHealth,
				default:ASSIST_DEFAULT.BaseEnemyHealth,
				maxValue:50,
				maxTitle:"50",
				steps:49,
				colors:[Color.Blue, Color.Green, Color.Yellow, Color.Orange, Color.Red]
			},
			enemyStrength: {
				name:SLIDER_NAMES.EnemyBaseStrength,
				titleKey:STRINGS_KEY.EnemyStrength,
				minValue:1,
				minTitle:"1",
				storageKey:localStorageKey.EnemyStrength,
				default:ASSIST_DEFAULT.EnemyBaseStrength,
				maxValue:50,
				maxTitle:"50",
				steps:49,
				colors:[Color.Blue, Color.Green, Color.Yellow, Color.Orange, Color.Red]
			},
			bossHealth: {
				name:SLIDER_NAMES.BossBaseHealth,
				titleKey:STRINGS_KEY.BossHealth,
				minValue:10,
				minTitle:"10",
				storageKey:localStorageKey.BossHealth,
				default:ASSIST_DEFAULT.BossBaseHealth,
				maxValue:400,
				maxTitle:"400",
				steps:39,
				colors:[Color.Blue, Color.Green, Color.Yellow, Color.Orange, Color.Red]
			},
			bossStrength: {
				name:SLIDER_NAMES.BossBaseStrength,
				titleKey:STRINGS_KEY.BossStrength,
				minValue:10,
				minTitle:"10",
				storageKey:localStorageKey.BossStrength,
				default:ASSIST_DEFAULT.BossBaseStrength,
				maxValue:200,
				maxTitle:"200",
				steps:19,
				colors:[Color.Blue, Color.Green, Color.Yellow, Color.Orange, Color.Red]
			},
			enemiesPerLevel: {
				name:SLIDER_NAMES.EnemiesPerLevel,
				titleKey:STRINGS_KEY.RivalsToBeat,
				minValue:1,
				minTitle:"1",
				storageKey:localStorageKey.EnemiesPerLevel,
				default:ASSIST_DEFAULT.EnemiesPerLevel,
				maxValue:20,
				maxTitle:"20",
				steps:19,
				colors:[Color.Blue, Color.Green, Color.Yellow, Color.Orange, Color.Red]
			},
			timeLimit: {
				name:SLIDER_NAMES.LevelTime,
				titleKey:STRINGS_KEY.LevelTime,
				minValue:0,
				minTitle:"0",
				storageKey:localStorageKey.LevelTime,
				default:ASSIST_DEFAULT.LevelTime,
				maxValue:200,
				maxTitle:"200",
				steps:20,
				colors:[Color.Red, Color.Orange, Color.Yellow, Color.Green, Color.Blue]
			},
			simultaneousEnemies: {
				name:SLIDER_NAMES.GangCount,
				titleKey:STRINGS_KEY.GangCount,
				minValue:1,
				minTitle:"1",
				storageKey:localStorageKey.GangCount,
				default:ASSIST_DEFAULT.GangCount,
				maxValue:6,
				maxTitle:"6",
				steps:5,
				colors:[Color.Blue, Color.Green, Color.Yellow, Color.Orange, Color.Red]
			},
			gameSpeed: {
				name:SLIDER_NAMES.GameSpeed,
				titleKey:STRINGS_KEY.GameSpeed,
				minValue:2,
				minTitle:getLocalizedStringForKey(STRINGS_KEY.Slow),
				storageKey:localStorageKey.GameSpeed,
				default:ASSIST_DEFAULT.GameSpeed,
				maxValue:8,
				maxTitle:getLocalizedStringForKey(STRINGS_KEY.Fast),
				steps:6,
				colors:[Color.Blue, Color.Green, Color.Yellow, Color.Orange, Color.Red]
			}
		};

		sliderArray = [
			sliderData.playerHealth,
			sliderData.playerStrength,
			sliderData.startingBelt,
			sliderData.startingLevel,
			sliderData.invincibility,
			sliderData.knockback,
			sliderData.enemyHealth,
			sliderData.enemyStrength,
			sliderData.bossHealth,
			sliderData.bossStrength,
			sliderData.enemyStrength,
			sliderData.timeLimit,
			sliderData.simultaneousEnemies
		];
	};
}