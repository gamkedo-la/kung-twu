
/**
 * A sound instance. 
 * TODO: make compatible with the SoundOverlaps class
 * @param {string} filepath 
 * @param {number} baseVolume
 * @param {number} startingVol
 * @param {string} audioBus A value within the AudioBus 'enum' object
 * @param {boolean} isLoop Sets if this is a loop or not
 */
function SoundInstance(filepath, baseVolume, startingVol, audioBus, isLoop) {

	// ========= Initialization =============== //
	/** @type {number} */
	let _volume = clamp(startingVol, 0, 1);

	/** @type {HTMLAudioElement} */
	const _element = new Audio(filepath);
	const _baseVolume = baseVolume; // inject baseVolume for volume calculation

	/** @type {string} A value within AudioBus enum object */
	let _audioBus = audioBus || AudioBus.NONE;

	_setLoop(isLoop); // set looping to the inner html element

	// ======== Public API ========== //
	this.play = function() {
		_element.play();
	};

	this.getLoop = function() {
		return _element.loop;
	};

	this.setLoop = _setLoop;
	function _setLoop(isLoop) {
		if (isLoop === true) { // using triple equals to make sure it's a boolean
			_element.loop = true;
		} else if (isLoop === false) {
			_element.loop = false;
		} else {
			console.log("SoundInstance setLoop was passed an invalid parameter! Must be a boolean");
		}
	}


	/**
	 * Set the paused status of the SoundInstance
	 */
	this.setPaused = function(paused) {
		if (paused === true) { // Using triple equals to make sure it is a boolean
			_element.pause();
		} else if (paused === false) {
			_element.play();
		} else {
			console.log("SoundInstance setPaused was passed an invalid parameter! Must be a boolean");
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
		// Update magic number _volume if a value is passed
		if (vol != undefined && vol != null && typeof vol === "number") {
			_volume = clamp(vol, 0, 1);
		}
		// Set the internal volume
		_element.volume = _calculateTrackVolume(_baseVolume, _audioBus, _volume);
	} 

	/**
	 * Internal calculation taking bus values into consideration. May move to an audio engine object later
	 * @param {number} baseVolume 
	 * @param {string} bus 
	 * @param {number} volume 
	 */
	function _calculateTrackVolume(baseVolume, bus, volume) {
		// Make sure these values are as expected
		// Remove later for performance
		Debug.isValid(baseVolume, "number");
		Debug.isValid(bus, "string");
		Debug.isValid(volume, "number");
		Debug.isValid(musicVolume, "number");
		Debug.isValid(effectsVolume, "number");
		Debug.isValid(masterVolume, "number");
		Debug.isValid(isMuted, "boolean");
	
		// Calculate volume here. User can omit or set volume to null to not alter the value, but rather update the volume based on bus.
		if (isMuted) {
			// avoid having to calculate volume if muted
			return 0;
		} else {
			let _vol = 1; // default val if user does not pass volume param
			if (volume != undefined && volume != null) {
				_vol = volume;
			}
			// TODO: Move getBusVolume to AudioEngine. Create AudioBus objects
			const _bus = getBusVolume(bus);
			const _base = baseVolume;
			const _master = masterVolume;
			return Math.pow(_vol * _base * _bus * _master, 2);
		}
	}

}