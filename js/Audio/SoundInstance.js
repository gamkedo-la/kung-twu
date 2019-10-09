
/**
 * A sound instance. 
 * TODO: make compatible with the SoundOverlaps class
 * @param {string} filepath 
 * @param {number} startingVol
 * @param {string} audioBus A value within the AudioBus 'enum' object
 */
function SoundInstance(filepath, startingVol = 1, audioBus) {

	let _volume = clamp(startingVol, 0, 1);

	/**
	 * The internal audio element
	 * @type {HTMLAudioElement}
	 */
	const _element = new Audio(filepath);

	let _audioBus = audioBus || AudioBus.NONE;

	// ======== Public API ========== //
	this.play = function() {
		_element.play();
	};

	/**
	 * Set the paused status of the SoundInstance
	 */
	this.setPause = function(pause) {
		if (pause === true) {
			_element.pause();
		} else if (pause === false) {
			_element.play();
		}
	};

	this.setVolume = _setVolume;

	this.getVolume = () => _volume;

	/**
	 * Sets this instance's audio bus to another one
	 * @param {string} audioBus A value from the global AudioBus 'enum' object
	 */
	this.setBus = function(audioBus) {
		_audioBus = audioBus;
		_setVolume();
	};

	/**
	 * Returns the key of the current audio bus, which is a string value listed in the global AudioBus 'enum' object.
	 */
	this.getBus = function() {
		return _audioBus;
	};

	/**
	 * Gets whether or not this SoundInstance is paused.
	 * @returns {boolean}
	 */
	this.getPaused = function() {
		return _element.paused;
	};

	this.setTrackTime = function(time) {
		_element.currentTime = time;
	};

	this.getTrackTime = function() {
		return _element.currentTime;
	};

	// Private helpers
	/**
	 * Sets the volume of the track or simply updates it if no volume is passed.
	 * @param {number} vol 
	 */
	function _setVolume(vol) {
		if (vol != undefined && vol != null) {
			_volume = clamp(vol, 0, 1);
		}
		
		// TODO: Move this calculate track volume someplace more locally like an audio engine class
		_element.volume = _calculateTrackVolume(_element, _audioBus, _volume);
	}

}