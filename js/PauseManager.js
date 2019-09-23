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

		if(!gameIsPaused) {
			gameIsPaused = true;
			pauseSound.play();
			currentBackgroundMusic.pauseSound();
		}
	};

	this.resumeGame = function(resumeCause) {
		if(resumeCause === CAUSE.Keypress) {
			gameIsPaused = false;
			cause = null;
			resumeSound.play();
			currentBackgroundMusic.resumeSound();
		}
	};
}
