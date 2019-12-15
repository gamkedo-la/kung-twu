//Main for Kung Twu
window.onload = function() {
	window.focus();//necessary to ensure the game receives keyboard input once it is uploaded to itch.io

	window.addEventListener("focus", windowOnFocus);
	window.addEventListener("blur", windowOnBlur);

	canvas = document.createElement("canvas");
	canvasContext = canvas.getContext("2d");
	document.body.appendChild(canvas);
	canvas.width = 800;
	canvas.height = 800;
	configureGameField();
	drawRect(0, 0, canvas.width, canvas.height, Color.White);

	localStorageHelper = new LocalStorageHelper();
	
	currentLanguage = localStorageHelper.getItem(localStorageKey.Language);

	currentLevel = localStorageHelper.getInt(localStorageKey.StartingLevel);

	pauseManager = new PauseManager();
		
	wooshFX = new WooshFXManager(wooshPunchPic);
	foregroundDecorations = new DecorationManager(decorationSpritesheet);
	
	wallDecorations = new DecorationManager(decorationSpritesheet);

	/** Instantiate input-related objects */
	keyMapper = new KeyMapper();
	inputProcessor = new InputProcessor();
	input = new InputManager(inputProcessor, gamepad);
	input.initialize();

	sound = new SoundManager(); // create sound manager, variable declared in SoundGlobals.js
	sound.addSounds(soundSpriteConfigs); // adds previously declared soundSpriteConfigs from SoundGlobals.js

	// Set the UIProgressBar configuration defaults for use with creating a new UIProgressBar.
	UIProgressBarDefaults = new IProgressBarConfigDefaults();
	
	// Removed old audio init functions that used to be here -Aaron

	loadGamkedoLogo();
};


function configureGameField() {
	GAME_FIELD.x = 0;
	GAME_FIELD.y = 0;
	GAME_FIELD.width = canvas.width;
	GAME_FIELD.height = canvas.height;
	GAME_FIELD.right = canvas.x + canvas.width;
	GAME_FIELD.bottom = canvas.y + canvas.height;
	GAME_FIELD.midX = canvas.x + canvas.width / 2;
	GAME_FIELD.midY = canvas.y + canvas.height / 2;
}

function loadingDoneSoStartGame() {
	if(finishedLoading) {
		JPFont = new fontSystem(jpFontImg, CHAR_SIZE, canvasContext);
		timer = new Chronogram();

		SceneState.setState(SCENE.TITLE);
		requestAnimationFrame(update);
	} else {
		finishedLoading = true;
	}
}

function update() {
	requestAnimationFrame(update);
	const deltaTime = timer.update();
	if (gamepad.active) {
		gamepad.update();
	}

	SceneState.run(deltaTime);
}

function startGame() {
	initializeStorageValues();
}

function initializeStorageValues() {
	const keyNames = Object.keys();
	for(let keyName of keyNames) {
		if(keyName === "Version") {
			const version = localStorageHelper.getFloat(localStorageKey.Version);
			if(version < VALUES.Version) {
				localStorageHelper.resetDefaults();
			}
		} else if(typeof VALUES[keyName] === "number") {
			VALUES[KeyName] = localStorageHelper.getInt(localStorageKey[keyName]);
		} else if(typeof VALUES[keyName] === "string") {
			VALUES[KeyName] = localStorageHelper.getItem(localStorageKey[keyName]);
		}
	}
}

function windowOnFocus() {
}

function windowOnBlur() {
	if(!pauseManager.getIsPaused()) {
		pauseManager.pauseGame(CAUSE.Focus);
		SceneState.setState(SCENE.PAUSE);	
	}
}