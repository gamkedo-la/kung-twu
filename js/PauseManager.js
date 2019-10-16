//Pause Manager
function PauseManager() {
	let gameIsPaused = false;
	let cause = null;
	this.getIsPaused = function() {
		return (gameIsPaused === true);
	};

	this.pauseGame = function(pauseCause) {
		if(cause != CAUSE.Keypress) {
			cause = pauseCause;
		}

		if (!gameIsPaused) {
			gameIsPaused = true;
			// @SoundHook: pauseSound.play();
			// @SoundHook: currentBackgroundMusic.fadeTo(.4, 1);
		}
	};

	this.resumeGame = function(resumeCause) {
		if (resumeCause === CAUSE.Keypress) {
			gameIsPaused = false;
			cause = null;
			// @SoundHook: resumeSound.play();
			// @SoundHook: currentBackgroundMusic.fadeIn(1);
		}
	};
}
