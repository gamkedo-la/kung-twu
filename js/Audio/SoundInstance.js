/**
 * This class represents a single HTMLAudioElement with extra metadata. It will be managed by SoundOverlap class, and probably not interacted with directly by users.
 * @param {SoundSprite} soundSprite
 * @param {string} filename Filename + extension. Please get the compatible extension from AudioEngine.getSoundFormat
 */
function SoundInstance(soundSprite, filename) {
	this.sprite = soundSprite;

	/**
	 * The inner HTMLAudioElement
	 * @type {HTMLAudioElement}
	 */
	const _element = new Audio(filename);

	/**
	 * Current handles to a NodeJS.Timeout
	 * @type {number[]}
	 */
	const _fades = [];

	this.setFade = function(fade) {
		if (_fades.indexOf(fade) === -1) {
			_fades.push(fade);
		}
	};

	/**
	 * Cancels a specific fade on this SoundInstance. (Currently not used, but may become necessary while bug testing)
	 */
	this.cancelFade = function(fade) {
		const index = _fades.indexOf(fade);
		if (index !== -1) {
			_fades.splice(index, 1);
		}
	};

	/**
	 * Sets the looping status of this instance
	 * @param {boolean} isLoop
	 */
	this.setLoop = function(isLoop) {
		_element.loop = isLoop;
	};

	/**
	 * Sets the looping status of this instance
	 * @param {boolean} isLoop
	 */
	this.getLoop = function() {
		return _element.loop;
	};

	/**
	 * The 'dial' the api turns for setting volume. Under the hood it calculates bus volume values.
	 */
	let _volume = 1;

	/**
	 * The inner HTMLAudioElement
	 */
	this.element = _element;

	/**
	 * Sound's filename including extension
	 */
	this.filename = filename;

	this.getIsFading = function() {
		(_fades.length > 0) ? true : false;
	};

	/**
	 * Cancels the current fade if there are any
	 */
	this.cancelFadeAll = function() {
		while (_fades.length > 0) {
			const fade = _fades.shift();
			clearInterval(fade);
		}
	};

	this.getIsPlaying = function() {
		return !_element.paused;
	};

	this.getIsPaused = function() {
		return _element.paused;
	};

	this.getVolume = function() {
		return _volume;
	};

	/**
	 * Make sure that the sound sprite updates volume after a call to this fn
	 */
	this.setVolume = function(vol) {
		if (typeof vol === "number" && !Number.isNaN(vol)) {
			_volume = clamp(vol, 0, 1);
		} else {
			throw new Error("Trying to set volume to a value that is not a number!");
		}
	};

	this._setInnerVolume = function(vol) {
		_element.volume = clamp(vol, 0, 1);
	};

	/**
	 * Pauses the audio
	 */
	this.pause = function() {
		_element.pause();
	};

	/**
	 * Start playing the audio
	 */
	this.play = function() {
		_element.play()
			.catch(() => {
				console.log("For your enjoyment of the web, the game has prevented sounds from playing.\nPlease click or tap anywhere on the screen to allow sound.");
			});
	};

	/**
	 * Set the current track time
	 * @param {number} seconds The number of seconds
	 */
	this.setCurrentTime = function(seconds) {
		_element.currentTime = seconds;
	};

	/**
	 * Get the current track time
	 */
	this.getCurrentTime = function() {
		return _element.currentTime;
	};

	/**
	 * Checks if instance of a SoundSprite
	 * @param {SoundSprite} soundSprite
	 */
	this.isInstanceOf = function(soundSprite) {
		return (soundSprite === this.sprite);
	};
}
