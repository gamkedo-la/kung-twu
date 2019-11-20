//Assist Mode Scene
function AssistScene() {
	this.name = "Assist";
	const TITLE_Y_POS = 100;
	const TITLE_SCALE = 1;
	let selectorPositionsIndex = 0;
	const selectorPosition = {x:0, y:0};
	const selections = [
		SCENE.TITLE,
		SCENE.GAME
	];
	const buttonHeight = 25;
	const buttonTitlePadding = 2;
	let buttonPadding;
	const buttons = [];
	const slider = {
		maxPlayerHealth:null,
		startingBelt:null
	};

	this.transitionIn = function() {
		canvasContext.setTransform(1, 0, 0, 1, 0, 0);

		buttonPadding = canvas.width / 40;
		
		const menuY = canvas.height - (9 * buttonHeight / 2);
        
		if(buttons.length === 0) {
			buttons.push(buildBackButton(buttonPadding, menuY, buttonHeight, buttonTitlePadding));
			buttons.push(buildPlayButton(canvas.width - buttonPadding, menuY, buttonHeight, buttonTitlePadding));
		} else {
			updateButtonTitles();
		}

		updateButtonPositions();
		buildSliders();

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

	const buildSliders = function() {
		const SLIDER_W = 200;
		const SLIDER_H = 10;

		const COL_DELTA = 50;
		const COL1_X = 50;
		const COL2_X = COL1_X + SLIDER_W + COL_DELTA;
		const COL3_X = COL2_X + SLIDER_W + COL_DELTA;

		const ROW_DELTA = 100;
		const ROW1_Y = TITLE_Y_POS + JPFont.getCharacterHeight(TITLE_SCALE) + ROW_DELTA / 2;
		const ROW2_Y = ROW1_Y + ROW_DELTA;
		const ROW3_Y = ROW2_Y + ROW_DELTA;
		const ROW4_Y = ROW3_Y + ROW_DELTA;
		const ROW5_Y = ROW4_Y + ROW_DELTA;

		/*First Row of Sliders*/
		//Player Max Health
		let maxHealth = localStorageHelper.getInt(localStorageKey.PlayerMaxHealth);
		if((maxHealth === undefined) || (maxHealth === null) || (isNaN(maxHealth))) {
			maxHealth = ASSIST_DEFAULT.MaxHealth;
			localStorageHelper.setInt(localStorageKey.PlayerMaxHealth, maxHealth);
		}

		const pHealthMin = 1;
		const pHealthMax = 200;
		slider.maxPlayerHealth = new UISlider(COL1_X, ROW1_Y, SLIDER_W, SLIDER_H, getLocalizedStringForKey(STRINGS_KEY.MaxHealth), pHealthMin, pHealthMin.toString(), pHealthMax, pHealthMax.toString(), maxHealth, 20, true, Color.Orange);
		
		//Enemy Max Health
		const eHealthMin = 1;
		const eHealthMax = 50;
		let baseEHealth = localStorageHelper.getInt(localStorageKey.BaseEnemyHealth);
		if((baseEHealth === undefined) || (baseEHealth === null) || (isNaN(baseEHealth))) {
			baseEHealth = ASSIST_DEFAULT.BaseEnemyHealth;
			localStorageHelper.setInt(localStorageKey.BaseEnemyHealth, baseEHealth);
		}
		slider.enemyHealth = new UISlider(COL2_X, ROW1_Y, SLIDER_W, SLIDER_H, getLocalizedStringForKey(STRINGS_KEY.RivalHealth), eHealthMin, eHealthMin.toString(), eHealthMax, eHealthMax.toString(), baseEHealth, 49, true, Color.Red);

		//Starting Level
		let startLevel = localStorageHelper.getInt(localStorageKey.StartingLevel);
		if((startLevel === undefined) || (startLevel === null) || (isNaN(startLevel))) {
			startLevel = ASSIST_DEFAULT.StartLevel;
			localStorageHelper.setInt(localStorageKey.StartingLevel, startLevel);
		} else {
			startLevel -= 1;//Game Levels start at 1, slider starts at 0
		}

		const sLevelMin = 0;
		const sLevelMax = 4;
		slider.startingLevel = new UISlider(COL3_X, ROW1_Y, SLIDER_W, SLIDER_H, getLocalizedStringForKey(STRINGS_KEY.StartLevel), sLevelMin, getLocalizedStringForKey(STRINGS_KEY.Level1), sLevelMax, getLocalizedStringForKey(STRINGS_KEY.Level5), startLevel, 4, true, Color.Aqua);

		/*Second Row of Sliders*/
		//Starting Belt Color
		let startBelt = localStorageHelper.getInt(localStorageKey.StartingBelt);
		if((startBelt === undefined) || (startBelt === null) || (isNaN(startBelt))) {
			startBelt = ASSIST_DEFAULT.StartBelt;
			localStorageHelper.setInt(localStorageKey.StartingBelt, startBelt);
		}
		slider.startingBelt = new UISlider(COL1_X, ROW2_Y, SLIDER_W, SLIDER_H, getLocalizedStringForKey(STRINGS_KEY.StartBelt), 0, getLocalizedStringForKey(STRINGS_KEY.BeltWhite), 5, getLocalizedStringForKey(STRINGS_KEY.BeltBlack), startBelt, 5, true, Color.White);

		//Basic Enemy Strength
		const eStrengthMin = 1;
		const eStrengthMax = 50;
		let baseEnemyStrength = localStorageHelper.getInt(localStorageKey.EnemyStrength);
		if((baseEnemyStrength === undefined) || (baseEnemyStrength === null) || (isNaN(baseEnemyStrength))) {
			baseEnemyStrength = ASSIST_DEFAULT.EnemyBaseStrength;
			localStorageHelper.setInt(localStorageKey.EnemyStrength, baseEnemyStrength);
		}
		slider.enemyStrength = new UISlider(COL2_X, ROW2_Y, SLIDER_W, SLIDER_H, getLocalizedStringForKey(STRINGS_KEY.EnemyStrength), eStrengthMin, eStrengthMin.toString(), eStrengthMax, eStrengthMax.toString(), baseEnemyStrength, 10, true, Color.Brown);

		//Base Enemies Per Level
		const ePerLevelMin = 0;
		const ePerLevelMax = 100;
		let baseEnemiesPerLevel = localStorageHelper.getInt(localStorageKey.EnemiesPerLevel);
		if((baseEnemiesPerLevel === undefined) || (baseEnemiesPerLevel === null) || (isNaN(baseEnemiesPerLevel))) {
			baseEnemiesPerLevel = ASSIST_DEFAULT.EnemiesPerLevel;
			localStorageHelper.setInt(localStorageKey.EnemiesPerLevel, baseEnemiesPerLevel);
		}
		slider.enemiesPerLevel = new UISlider(COL3_X, ROW2_Y, SLIDER_W, SLIDER_H, getLocalizedStringForKey(STRINGS_KEY.RivalsToBeat), ePerLevelMin, ePerLevelMin.toString(), ePerLevelMax, ePerLevelMax.toString(), baseEnemiesPerLevel, 100, true, Color.Orange);

		/*Third Row of Sliders*/
		//Player Base Damage
		const pDamageMin = 1;
		const pDamageMax = 50;
		let pBaseDamage = localStorageHelper.getInt(localStorageKey.PlayerBaseDamage);
		if((pBaseDamage === undefined) || (pBaseDamage === null) || (isNaN(pBaseDamage))) {
			pBaseDamage = ASSIST_DEFAULT.PlayerBaseDamage;
			localStorageHelper.setInt(localStorageKey.PlayerBaseDamage, pBaseDamage);
		}
		slider.playerDamage = new UISlider(COL1_X, ROW3_Y, SLIDER_W, SLIDER_H, getLocalizedStringForKey(STRINGS_KEY.PlayerDamage), pDamageMin, pDamageMin.toString(), pDamageMax, pDamageMax.toString(), pBaseDamage, 49, true, Color.Green);
		
		//Boss Health
		const bHealthMin = 1;
		const bHealthMax = 400;
		let initialBHealth = localStorageHelper.getInt(localStorageKey.BossHealth);
		if((initialBHealth === undefined) || (initialBHealth === null) || (isNaN(initialBHealth))) {
			initialBHealth = ASSIST_DEFAULT.BossBaseHealth;
			localStorageHelper.setInt(localStorageKey.BossHealth, initialBHealth);
		}
		slider.bossHealth = new UISlider(COL2_X, ROW3_Y, SLIDER_W, SLIDER_H, getLocalizedStringForKey(STRINGS_KEY.BossHealth), bHealthMin, bHealthMin.toString(), bHealthMax, bHealthMax.toString(), initialBHealth, 40, true, Color.Yellow);

		//Variable Time Per Level
		const minTime = 0;
		const maxTime = 199;
		let initialTime = localStorageHelper.getInt(localStorageKey.LevelTime);
		if((initialTime === undefined) || (initialTime === null) || (isNaN(initialTime))) {
			initialTime = ASSIST_DEFAULT.LevelTime;
			localStorageHelper.setInt(localStorageKey.LevelTime, initialTime);
		}
		slider.timeLimit = new UISlider(COL3_X, ROW3_Y, SLIDER_W, SLIDER_H, getLocalizedStringForKey(STRINGS_KEY.LevelTime), minTime, minTime.toString(), maxTime, maxTime.toString(), initialTime, 90, true, Color.Red);

		/*Fourth Row of Sliders*/
		//Player Invincibility
		const invDurationMin = 0;
		const invDurationMax = 5000;
		let baseInvDuration = localStorageHelper.getInt(localStorageKey.InvincibleDuration);
		if((baseInvDuration === undefined) || (baseInvDuration === null) || (isNaN(baseInvDuration))) {
			baseInvDuration = ASSIST_DEFAULT.InvincibleDuration;
			localStorageHelper.setInt(localStorageKey.InvincibleDuration, baseInvDuration);
		}
		slider.invincibleDuration = new UISlider(COL1_X, ROW4_Y, SLIDER_W, SLIDER_H, getLocalizedStringForKey(STRINGS_KEY.Invicibility), invDurationMin, invDurationMin.toString(), invDurationMax, invDurationMax.toString(), baseInvDuration, 50, true, Color.White);

		const bStrengthMin = 1;
		const bStrengthMax = 100;
		let baseBStrength = localStorageHelper.getInt(localStorageKey.BossStrength);
		if((baseBStrength === undefined) || (baseBStrength === null) || (isNaN(baseBStrength))) {
			baseBStrength = ASSIST_DEFAULT.BossBaseStrength;
			localStorageHelper.setInt(localStorageKey.BossStrength, baseBStrength);
		}
		slider.bossStrength = new UISlider(COL2_X, ROW4_Y, SLIDER_W, SLIDER_H, getLocalizedStringForKey(STRINGS_KEY.BossStrength), bStrengthMin, bStrengthMin.toString(), bStrengthMax, bStrengthMax.toString(), baseBStrength, 20, true, Color.Red);

		/*Fifth Row of Sliders*/
		//Player Knockback
		const knockbackMin = 0;
		const knockbackMax = 2000;
		let initialKnockback = localStorageHelper.getInt(localStorageKey.KnockbackSpeed);
		if((initialKnockback === undefined) || (initialKnockback === null) || (isNaN(initialKnockback))) {
			initialKnockback = ASSIST_DEFAULT.KnockbackSpeed;
			localStorageHelper.setInt(localStorageKey.KnockbackSpeed, initialKnockback);
		}
		slider.knockback = new UISlider(COL1_X, ROW5_Y, SLIDER_W, SLIDER_H, getLocalizedStringForKey(STRINGS_KEY.Knockback), knockbackMin, knockbackMin.toString(), knockbackMax, knockbackMax.toString(), initialKnockback, 40, true, Color.Blue);
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

		const sliders = Object.values(slider);
		for(let aSlider of sliders) {
			if(aSlider.wasClicked(mouseX, mouseY)) {
				aSlider.setValueForClick(mouseX, mouseY);
				updatePlayerPrefs(aSlider);
				break;
			}
		}
	};

	const updatePlayerPrefs = function(aSlider) {
		switch(aSlider) {
		case slider.maxPlayerHealth:
			localStorageHelper.setInt(localStorageKey.PlayerMaxHealth, aSlider.getValue());
			break;
		case slider.startingBelt:
			localStorageHelper.setInt(localStorageKey.StartingBelt, aSlider.getValue());
			playerBelt = aSlider.getValue();
			break;
		case slider.startingLevel:
			currentLevel = 1 + aSlider.getValue();//levels start at 1
			localStorageHelper.setInt(localStorageKey.StartingLevel, aSlider.getValue() + 1);
			break;
		case slider.enemyHealth:
			localStorageHelper.setInt(localStorageKey.BaseEnemyHealth, aSlider.getValue());
			break;
		case slider.playerDamage:
			localStorageHelper.setInt(localStorageKey.PlayerBaseDamage, aSlider.getValue());
			break;
		case slider.invincibleDuration:
			localStorageHelper.setInt(localStorageKey.InvincibleDuration, aSlider.getValue());
			break;
		case slider.knockback:
			localStorageHelper.setInt(localStorageKey.KnockbackSpeed, aSlider.getValue());
			break;
		case slider.enemyStrength:
			localStorageHelper.setInt(localStorageKey.EnemyStrength, aSlider.getValue());
			break;
		case slider.bossHealth:
			localStorageHelper.setInt(localStorageKey.BossHealth, aSlider.getValue());
			break;
		case slider.bossStrength:
			localStorageHelper.setInt(localStorageKey.BossStrength, aSlider.getValue());
			break;
		case slider.enemiesPerLevel:
			localStorageHelper.setInt(localStorageKey.EnemiesPerLevel, aSlider.getValue());
			break;
		case slider.timeLimit:
			localStorageHelper.setInt(localStorageKey.LevelTime, aSlider.getValue());
			break;
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
        
		//		drawHelpScreenContents();
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
		//		canvasContext.drawImage(titleBlock, canvas.width / 2 - titleBlock.width / 2, canvas.height / 2 - 38);        
		canvasContext.drawImage(selector, selectorPosition.x, selectorPosition.y);     
	};
    
	const drawTitle = function() {
		JPFont.printTextAt(getLocalizedStringForKey(STRINGS_KEY.AssistSceneTitle),
			{x:canvas.width / 2, y:TITLE_Y_POS}, TextAlignment.Center, TITLE_SCALE);
	};
}