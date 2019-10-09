
/**
 * A sound instance. 
 * @param {SoundEngine} soundEngine Sound engine instance this instance belongs to
 * @param {string} filepath 
 * @param {number} baseVolume
 * @param {number} startingVol
 * @param {string} audioBus A value within the AudioBus 'enum' object
 * @param {boolean} isLoop Sets if this is a loop or not
 */
function SoundInstance(soundEngine, filepath, baseVolume, startingVol, audioBus, isLoop) {

	// ========= Initialization =============== //
	/** 
	 * This is the value that the user interfaces with. It's a bit of a magic number that has a dB-like logarithmic curve. Range: 0-1
	 * @type {number} 
	 */
	let _volume = clamp(startingVol, 0, 1);
	/** @type {SoundEngine} */
	const _engine = soundEngine;
	/** @type {HTMLAudioElement} */
	const _element = new Audio(filepath);
	const _baseVolume = baseVolume; // inject baseVolume for volume calculation

	/** @type {string} A value within AudioBus enum object */
	let _audioBus = audioBus || AudioBus.NONE;

	_setLooping(isLoop); // set looping to the inner html element

	/** @type {NodeJS.Timeout} */
	let _fade = null;
	// ======== Public API ========== //
	this.play = function() {
		_element.play();
	};

	this.getLooping = function() {
		return _element.loop;
	};

	this.getIsFading = function() {
		(_fade) ? true : false;
	};

	/**
	 * Fade this sound to a target volume
	 * @param {number} targetVol value between 0-1
	 * @param {number} seconds fade time in seconds
	 * @param {(inst: SoundInstance)=>void}onTargetReached The callback to call when this fade is complete, please make sure to bind 'this' ahead of time
	 */
	this.fadeTo = function(targetVol, seconds, onTargetReached) {
		this.cancelFade();
		const fade = _fadeFromTo(this, _volume, targetVol, seconds, (sound) => {
			onTargetReached(sound);
			_fade = null;
		});
		if (fade) {
			_fade = fade;
		}
	};

	/**
	 * Cancels the current fade if there is one
	 */
	this.cancelFade = function() {
		if (_fade) {
			clearInterval(_fade);
			_fade = null;
		}
	};

	this.setLooping = _setLooping;
	function _setLooping(isLoop) {
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
		this.cancelFade();
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

			const _bus = _engine.getBusVolume(bus);
			const _base = baseVolume;
			const _master = masterVolume;
			return Math.pow(_vol * _base * _bus * _master, 2);
		}
	}

	/**
	 * Simple fade to a target volume in a set amount of seconds. If you need to set a starting value, please do that before calling.
	 * Returns the NodeJS.Timeout so you can stop it on your own with clearInterval if needed before it reaches its target.
	 * @param {SoundInstance} sound
	 * @param {number} targetVol
	 * @param {number} seconds 
	 * @param {(track: SoundInstance) => void} onTargetReached Optional callback to send when the fade has reached its target. Receives the HTMLAudioElement. 
	 * Please make sure to bind 'this' ahead of time if necessary.
	 * @returns NodeJS.Timeout | null
	 */
	function _fadeFromTo(sound, startingVol, targetVol, seconds, onTargetReached) {
	
		if (startingVol == targetVol) return null; // if already at fade destination

		const diff = targetVol - startingVol;
		const grain = 60; // in fps
		const fadePerFrame = diff / grain / seconds;
		// Set up a new interval that will fade the track
		const fadeInterval = setInterval(() => {
			const currentVol = sound.getVolume();
			// Check if we have arrived
			if (currentVol > targetVol - Math.abs(fadePerFrame) && 
			currentVol < targetVol + Math.abs(fadePerFrame)) 
			{
				sound.setVolume(targetVol);
				clearInterval(fadeInterval); // clear this interval so it is no longer called
				if (onTargetReached) { // call callback if there is one
					onTargetReached(sound);
				}
			} else {
				const newVal = currentVol + fadePerFrame;
				// Increment/decrement volume at the fadePerFrame value
				sound.setVolume(newVal);
			}
		}, 1000/grain);
		return fadeInterval;
	}
}