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
	 * Current handle to a NodeJS.Timeout
	 * @type {number | null}
	 */
	this._fade = null;

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
		(this._fade === null) ? false : true;
	};

	/**
	 * Cancels the current fade if there is one
	 */
	this.cancelFade = function() {
		if (this._fade !== null && this._fade != undefined) {
			clearInterval(this._fade);
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
		_element.play();
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
