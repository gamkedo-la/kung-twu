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
			sound.playSFX(Sounds.SFX_PauseLow);
			// @SoundHook: currentBackgroundMusic.fadeTo(.4, 1);
			sound.fadeBGMTo(.4, 1);
		}
	};

	this.resumeGame = function(resumeCause) {
		if (resumeCause === CAUSE.Keypress) {
			gameIsPaused = false;
			cause = null;
			// @SoundHook: resumeSound.play();
			sound.playSFX(Sounds.SFX_ResumeLow);

			// @SoundHook:TODO Have music fade in only if going back to game, not quitting to TitleScreen
			// @SoundHook: currentBackgroundMusic.fadeIn(1);
			sound.fadeBGMTo(1, 1);
		}
	};
}
