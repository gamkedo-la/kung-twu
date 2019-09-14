//Pause Manager
function PauseManager() {
	let cause = null;
	this.getIsPaused = function() {
		if(cause === null) {
			return false;
		} else {
			return true;
		}
	};

	this.pauseGame = function(pauseCause) {
		if(cause === null) {
			this.togglePause(pauseCause);
		} else if(pauseCause === CAUSE.Keypress) {
			cause = CAUSE.Keypress;
		}
	};

	this.resumeGame = function(pauseCause) {
		if(cause === null) {return;}

		if((pauseCause === CAUSE.Keypress) || ((pauseCause === CAUSE.Focus) && (cause === CAUSE.Focus))) {
			this.togglePause(null);
		}

		console.log(`Resuming, cause: ${cause}, PauseCause: ${pauseCause}`);
	};

	this.togglePause = function(pauseCause) {
		if((cause === CAUSE.Keypress) && (pauseCause === CAUSE.Keypress)) {
			cause = null;
		} else {
			cause = pauseCause;
		}

		if(cause === null) {
			console.log(`Resuming (in toggle), cause: ${cause}, PauseCause: ${pauseCause}`);
			resumeSound.play();
			currentBackgroundMusic.resumeSound();
			SceneState.popState();
		} else {
			pauseSound.play();
			currentBackgroundMusic.pauseSound();
			SceneState.setState(SCENE.PAUSE);
		}
	};
}
