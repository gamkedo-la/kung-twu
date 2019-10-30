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
			sound.playSFX(Sounds.SFX_PauseLow);
			sound.fadeBGMTo(.4, 1);
		}
	};

	this.resumeGame = function(resumeCause) {
		if (resumeCause === CAUSE.Keypress) {
			gameIsPaused = false;
			cause = null;
			sound.playSFX(Sounds.SFX_ResumeLow);

			sound.fadeBGMTo(1, 1);
		}
	};
}
