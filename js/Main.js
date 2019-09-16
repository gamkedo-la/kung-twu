//Main for Kung Tu
window.onload = function() {
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

	firstLoad = localStorage.getItem(localStorageKey.FirstLoad);
	
	currentLanguage = localStorageHelper.getItem(localStorageKey.Language);
	if((currentLanguage === null) || (currentLanguage === undefined)) {
		currentLanguage = Language.English;
		localStorageHelper.setItem(localStorageKey.Language, currentLanguage);
	}

	colorText(getLocalizedStringForKey(STRINGS_KEY.Loading), canvas.width / 2, canvas.height / 2, Color.White, Fonts.Subtitle, TextAlignment.Center, opacity = 1);

	TitleTextX = canvas.width / 2;
	subTitleTextX = canvas.width / 2;
	opacity = 0;

	pauseManager = new PauseManager();

	initializeInput();
	configureGameAudio();
	loadAudio();
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
		timer = new Chronogram();
		SceneState.setState(SCENE.TITLE);
		requestAnimationFrame(update);
	} else {
		finishedLoading = true;
	}
}

function updateButtonText() {
	for (let i = 0; i < mainMenu.buttons.length; i++) {
		mainMenu.buttons[i].txt = getLocalizedStringForKey(mainMenu.buttons[i].txtKey);
	}
}

function update() {
	const deltaTime = timer.update();

	if (gamepad.active) {
		gamepad.update();
	}

	SceneState.run(deltaTime);
	requestAnimationFrame(update);
}

function startGame() {
	const lastVersion = localStorageHelper.getFloat(localStorageKey.Version);
	if((lastVersion == undefined) || (lastVersion == null) || (lastVersion < version)) {
		const storageKeys = Object.keys(localStorageKey);
		for(let i = 0; i < storageKeys.length; i++) {
			localStorageHelper.removeItem(storageKeys[i]);
		}

		localStorageHelper.setItem(localStorageKey.Version, version.toString());
	}

	if((firstLoad === null) || (firstLoad === undefined)) {
		firstLoad = false;
		localStorageHelper.setItem(localStorageKey.FirstLoad, firstLoad);
		
		return;
	} 

	windowState.help = false;
	windowState.mainMenu = false;
	windowState.playing = true;
}

function windowOnFocus() {
	pauseManager.resumeGame(CAUSE.Focus);
}

function windowOnBlur() {
	pauseManager.pauseGame(CAUSE.Focus);
}