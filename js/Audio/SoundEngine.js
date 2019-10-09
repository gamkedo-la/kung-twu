/**
 * 
 * @param {SoundDescription | SoundDescription[]} soundDescriptions 
 */
function SoundEngine(descriptions) {
	const _DEBUG = true;
	/**
	 * Internal map of SoundDescription objects
	 */
	const _descs = new Map();
	_addDesc(descriptions);
	const _busses = new Map();

	/**
	 * Sets a bus' volume, or creates an entry were it not there before
	 * @param {any} key Please use the AudioBus object enum for key values
	 * @param {number} startingVol A number 0-1, default 1 if no value passed.
	 */
	this.setBusVolume = function(key, startingVol = 1) {
		_busses.set(key, clamp(startingVol, 0, 1));
	};

	/**
	 * Gets a bus' volume. Value (0-1)
	 */
	this.getBusVolume = function(key) {
		return _busses.get(key);
	};


	/**
	 * Creates a sound instance from a SoundDescription mold of the corresponding key
	 * @param {string} key The key of the SoundDescription to create an instance of
	 */
	this.createInstance = _createInstance;
	function _createInstance(key) {
		const desc = _getDescription(key);
		if (desc) {
			return desc.createInstance();
		} else {
			return null;
		}
	}

	/**
	 * Plays a sound and discards it afterward
	 */
	this.playOneShot = function(key) {
		const inst = _createInstance(key);
		const isLoop = inst.getLoop();
		if (isLoop) {
			console.log("[SoundEngine] Error! Sound is looping, and not a one shot! Cancelling playOneShot");
		} else {
			inst.play();
		}
	};

	/**
	 * Gets a SoundDescription from the corresponding key
	 * @param {string} key
	 */
	this.getDescription = _getDescription;
	/**
	 * 
	 * @param {string} key 
	 * @returns {SoundDescription | null} SoundDescription or null if key has not been registered
	 */
	function _getDescription(key) {
		const desc = _descs.get(key);
		if (desc) {
			return desc;
		} else {
			if (_DEBUG) console.log("[SoundEngine] Error! SoundDescription with key \"" + key + "\", has not been registered with the SoundEngine!");
			return null;
		}
	}

	// ======== Private Helpers ============
	/**
	 * Adds a SoundDescription or an array of SoundDescriptions to the SoundEngine
	 * @param {SoundDescription | SoundDescription[]} descriptions
	 */
	function _addDesc(descriptions) {
		if (Array.isArray(descriptions)) {
			const length = descriptions.length;
			for (let i = 0; i < length; i++) {
				const desc = descriptions[i];
				_descs.set(desc.key, desc[i]);
			}
		} else {
			_descs.set(descriptions);
		}	
	}

	/**
	 * Simple fade to a target volume in a set amount of seconds. If you need to set a starting value, please do that before calling.
	 * Returns the NodeJS.Timeout so you can stop it on your own with clearInterval if needed before it reaches its target.
	 * Returns null if volume is already at the passed targetVol or no track could be found in the musicSound global var
	 * @param {SoundInstance} sound
	 * @param {number} targetVol
	 * @param {number} seconds 
	 * @param {(track: SoundInstance) => void} onTargetReached Optional callback to send when the fade has reached its target. Receives the HTMLAudioElement. 
	 * Please make sure to bind 'this' ahead of time if necessary.
	 * @returns NodeJS.Timeout | null
	 */
	this.fadeFromTo = function(sound, startingVol, targetVol, seconds, onTargetReached) {
	
		if (startingVol == targetVol) return null; // if already at fade destination

		const diff = targetVol - startingVol;
		const grain = 60; // in fps
		const fadePerFrame = diff / grain / seconds;
		// Set up a new interval that will fade the track
		const fadeInterval = setInterval(() => {
			const currentVol = sound.getVolume();
			console.log("currentVol", currentVol, "targetVol", targetVol);
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