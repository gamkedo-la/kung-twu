//Screen State
const SceneState = {
	log : [],
	currentScene: SCENE.TITLE,
	pauseCause:null,
	didStartTransition:false,
	transitionDuration:1000,
	transitionTime:0,
	scenes: {
		[SCENE.TITLE]: new TitleScene(),
		[SCENE.SETTINGS]: new SettingsScene(),
		[SCENE.CREDITS]: new CreditsScene(),
		[SCENE.HELP]: new HelpScene(),
		[SCENE.GAME]: new GameScene(),
		[SCENE.PAUSE]: new PauseScene(),
		[SCENE.GAMEOVER]: new GameOverScene(),
		[SCENE.POWERUP]: new PowerUpScene(),
		[SCENE.ENDING]: new EndingScene()
	},
	setState: function(newScene, properties) {
		if(properties != undefined) {
			if(properties.didQuit) {
				this.scenes[SCENE.GAME].quit();
			}
		}
		this.scenes[this.currentScene].transitionOut();
		this.log.push(this.currentScene);
		this.currentScene = newScene;
		this.scenes[this.currentScene].properties = properties;
		this.scenes[this.currentScene].transitionIn();
		this.didStartTransition = true;
		return this;
	},
	getPreviousState: function() {
		return this.log[this.log.length-1];
	},
	run: function(deltaTime, previousState) {
		const currentlyInGame = (this.scenes[this.currentScene] === this.scenes[SCENE.GAME]);
		const wasInGame = (this.scenes[this.getPreviousState()] === this.scenes[SCENE.GAME]);
		if(((currentlyInGame) || (wasInGame)) && (this.didStartTransition)) {
			this.runSegue(deltaTime, previousState);
		} else {
			this.scenes[this.currentScene].run(deltaTime);
		}

		if (isMuted) {
			// gameFont.printTextAt(getLocalizedStringForKey(STRINGS_KEY.Muted), {x:760, y: 10}, 14, textAlignment.Left);
		}

		inputProcessor.clear();
	},
	runSegue: function(deltaTime, previousState) {
		this.transitionTime += deltaTime;
		if(this.transitionTime < this.transitionDuration) {
			const currentAlpha = Math.cos(Math.PI * this.transitionTime / this.transitionDuration);//"rgba(255, 165, 0, 1)";
			if(currentAlpha > 0) {
				if(previousState) {
					this.scenes[previousState].run(0);
				} else {
					this.scenes[this.getPreviousState()].run(0);
				}
				canvasContext.setTransform(1, 0, 0, 1, 0, 0);
				drawRect(0, 0, canvas.width, canvas.height, `rgba(0, 0, 0, ${1 - currentAlpha}`);
			} else {
				this.scenes[this.currentScene].run(0);
				canvasContext.setTransform(1, 0, 0, 1, 0, 0);
				drawRect(0, 0, canvas.width, canvas.height, `rgba(0, 0, 0, ${1 + currentAlpha}`);
			}	
		} else {
			this.didStartTransition = false;
			this.transitionTime = 0;
			this.scenes[this.currentScene].run(deltaTime);
		}
	},
	control: function(newKeyEvent, pressed) {
		if((newKeyEvent === ALIAS.VOLUME_UP) && (!pressed)) {
			turnVolumeUp();
			return true;
		} else if((newKeyEvent === ALIAS.VOLUME_DOWN) && (!pressed)) {
			turnVolumeDown();
			return true;
		} else if((newKeyEvent === ALIAS.MUTE) && (!pressed)) {
			toggleMute();
		} else if((DEBUG) && (newKeyEvent === ALIAS.LEVEL_UP) && (!pressed)) {
			currentLevel++;
			if(currentLevel > 5) currentLevel = 1;
		} else if((newKeyEvent === ALIAS.BACK) && 
		(this.currentScene != SCENE.GAME) && 
		(this.currentScene != SCENE.PAUSE) &&
		(!pressed)) {
			this.setState(this.getPreviousState());
			return true;
		}

		return this.scenes[this.currentScene].control(newKeyEvent, pressed);
	}
};