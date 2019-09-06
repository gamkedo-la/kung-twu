//Screen State
const SceneState = {
	log : [],
	currentScene: SCENE.TITLE,
	pauseCause:null,
	scenes: {
		//		[SCENE.LOADING]: new LoadingScreen(),
		[SCENE.TITLE]: new TitleScene(),
		[SCENE.SETTINGS]: new SettingsScene(),
		[SCENE.CREDITS]: new CreditsScene(),
		[SCENE.HELP]: new HelpScene(),
		[SCENE.GAME]: new GameScene(),
		//		[SCENE.GAMEOVER]: new GameOverScene(),
		//		[SCENE.ENDING]: new EndgameScene()
	},
	setState: function(newScene, properties) {
		this.scenes[this.currentScene].transitionOut();
		this.log.push(this.currentScene);
		this.currentScene = newScene;
		this.scenes[this.currentScene].properties = properties;
		this.scenes[this.currentScene].transitionIn();
		return this;
	},
	getPreviousState: function() {
		return this.log[this.log.length-1];
	},
	run: function(deltaTime) {
		if(!pauseManager.getIsPaused()) {
			this.scenes[this.currentScene].run(deltaTime);
		} else if(this.currentScene === SCENE.GAME) {
			if (this.scenes[SCENE.GAME].runPausedOptions) // exists?
				this.scenes[SCENE.GAME].runPausedOptions(deltaTime);
		}

		if (isMuted) {
			gameFont.printTextAt(getLocalizedStringForKey(STRINGS_KEY.Muted), {x:760, y: 10}, 14, textAlignment.Left);
		}
	},
	control: function(newKeyEvent, pressed, pressedKeys) {
		if((newKeyEvent === ALIAS.VOLUME_UP) && (!pressed)) {
			turnVolumeUp();
			return true;
		} else if((newKeyEvent === ALIAS.VOLUME_DOWN) && (!pressed)) {
			turnVolumeDown();
			return true;
		} else if((newKeyEvent === ALIAS.PAUSE) && (!pressed)) {
			pauseManager.togglePause(CAUSE.Keypress);
		}

		return this.scenes[this.currentScene].control(newKeyEvent, pressed, pressedKeys);
	}
};