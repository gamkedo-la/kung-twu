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
	 * Adds a SoundDescription or an array of SoundDescriptions to the SoundEngine internal map
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
}