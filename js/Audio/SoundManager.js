
/**
 * SoundManager will interface with the SoundEngine to keep a simple, yet customizable API for the end user.
 * @param {SoundEngine} soundEngine A reference to the game's SoundEngine
 */
function SoundManager(soundEngine) {
	/**
	 * @type SoundSprite
	 */
	let _currentMusic = null;
	const _engine = soundEngine;

	/**
	 * Plays a sound effect
	 * @param {string} key The key of the SoundSprite
	 * @returns the SoundSprite that was played
	 */
	this.playSFX = function(key) {
		const sound = _engine._getSound(key);
		if (sound) {
			sound.play();
			return sound;
		}
	};

	/**
	 * Play a music track
	 * @param {string} key The key of the SoundSprite music track
	 * @param {number} delay (optional) If there is a currently playing track, this is number of seconds
	 * the new track will wait before playing to allow the current one to fade out.
	 * Default: 1.5 seconds
	 * @param {number} fadeScale (optional) Multiply this number by the delay parameter to 
	 * determine the fade out time of the current track.
	 * Default: 1.5
	 */
	this.playBGM = function(key, delay = 1.5, fadeScale = 1.5) {
		const sound = _engine._getSound(key);
		if (sound) {
			if (_currentMusic) {
				// There is a currently playing BGM track: Fade it out, and start new track delayed by seconds
				_engine.transitionTo(_currentMusic, sound, delay * fadeScale, delay);
			} else {
				// There is no currently playing BGM track: Just start the new track immediately
				sound.play();
			}
			_currentMusic = sound;
			return sound;
		}
	};

	/**
	 * Stop a SoundSprite (all SoundInstances in it)
	 * @param {string} key The key of the SoundSprite to stop
	 * @param {boolean} allowFadeOut Allow the SoundSprite to fade out with its default fade out time.
	 */
	this.stopSound = function(key, allowFadeOut = true) {
		const sound = _engine._getSound(key);
		if (sound) {
			sound.stop(allowFadeOut);
		}
	};

	this.stopBGM = function(allowFadeOut = true) {
		if (_currentMusic) {
			_currentMusic.stop(true);
		}
	};

	this.stopAllSounds = function(allowFadeOut = true) {
		_engine.stopAllSounds(allowFadeOut);
	};
}