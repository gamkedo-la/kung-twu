/**
 * This class represents a single HTMLAudioElement with extra metadata. It will be managed by SoundOverlap class, and probably not interacted with directly by users.
 * @param {string} filename Filename + extension. Please get the compatible extension from AudioEngine.getSoundFormat
 */
function SoundInstance(filename) {
	
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
		(_fade === null) ? false : true;
	};

	/**
	 * Cancels the current fade if there is one
	 */
	this.cancelFade = function() {
		if (_fade !== null && _fade != undefined) {
			clearInterval(_fade);
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
	 * Make sure that the overlaps class updates volume after a call to this fn
	 */
	this.setVolume = function(vol) {
		_volume = clamp(vol, 0, 1);
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
}
