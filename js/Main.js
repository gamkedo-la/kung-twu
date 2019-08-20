//Main for Kung Tu
window.onload = function() {
	window.addEventListener("focus", windowOnFocus);
	window.addEventListener("blur", windowOnBlur);

	canvas = document.createElement("canvas");
	canvasContext = canvas.getContext("2d");
	document.body.appendChild(canvas);
	canvas.width = 800;
	canvas.height = 600;
	configureGameField();
	drawRect(0, 0, canvas.width, canvas.height, Color.White);
	
	currentLanguage = localStorage.getItem(localStorageKey.Language);
	if((currentLanguage === null) || (currentLanguage === undefined)) {
		currentLanguage = Language.English;
		localStorage.setItem(localStorageKey.Language, currentLanguage);
	}

	colorText(getLocalizedStringForKey(STRINGS_KEY.Loading), canvas.width / 2, canvas.height / 2, Color.White, Fonts.Subtitle, TextAlignment.Center, opacity = 1);

	TitleTextX = canvas.width / 2;
	subTitleTextX = canvas.width / 2;
	opacity = 0;

	pauseManager = new PauseManager();

	initializeInput();
	configureGameAudio();
	loadAudio();
	//	currentBackgroundMusic.loopSong(menuMusic);//TODO: Restore once there is background music
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
	SceneState.run(deltaTime);
	if(!pauseManager.getIsPaused()) {
		requestAnimationFrame(update);
	}
}

function startGame() {
	if((firstLoad === null) || (firstLoad === undefined)) {
		firstLoad = false;
		localStorage.setItem(localStorageKey.FirstLoad, firstLoad);

		openHelp();
		
		return;
	} 

	windowState.help = false;
	windowState.mainMenu = false;
	windowState.playing = true;
}

function drawAll() {

}

function moveAll() {

}

function windowOnFocus() {
	pauseManager.resumeGame(CAUSE.Focus);
}

function windowOnBlur() {
	pauseManager.pauseGame(CAUSE.Focus);
}