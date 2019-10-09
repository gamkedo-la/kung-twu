/**
 * 
 * @param {SoundDescription | SoundDescription[]} soundDescriptions 
 */
function SoundEngine(descriptions) {
	const _DEBUG = true;
	/**
	 * Internal map of SoundDescription objects
	 */
	const _desc = new Map();
	_addDesc(descriptions);



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
		const desc = _desc.get(key);
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
				_desc.set(desc.key, desc[i]);
			}
		} else {
			_desc.set(descriptions);
		}	
	}

	/**
	 * Simple fade to a target volume in a set amount of seconds. If you need to set a starting value, please do that before calling.
	 * Returns the NodeJS.Timeout so you can stop it on your own with clearInterval if needed before it reaches its target.
	 * Returns null if volume is already at the passed targetVol or no track could be found in the musicSound global var
	 * @param {SoundInstance} sound
	 * @param {number} targetVol
	 * @param {number} seconds 
	 * @param {(track: HTMLAudioElement) => void} onTargetReached Optional callback to send when the fade has reached its target. Receives the HTMLAudioElement. 
	 * Please make sure to bind 'this' ahead of time if necessary.
	 * @returns NodeJS.Timeout | null
	 */
	function _fadeTo(sound, targetVol, seconds, onTargetReached) {
		/** @type HTMLAudioElement */
		const track = sound;
		if (!track) {
			console.log(`Warning! Tried to fade track, but track in musicSound global variable was ${(typeof musicSound === "object" ? "null" : "undefined")}!`);
			return null;
		}

		const startingVol = sound.getVolume();
	
		if (startingVol == targetVol) return null;

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
				setTrackVolume(track, AudioBus.MUSIC, targetVol); // make sure volume is at target
				clearInterval(fadeInterval); // clear this interval so it is no longer called
				if (onTargetReached) {
					onTargetReached(track);
				}
			} else {
				const newVal = currentVol + fadePerFrame;
				// Increment/decrement volume at the fadePerFrame value
				setTrackVolume(track, AudioBus.MUSIC, newVal);
			}
		}, 1000/grain);
		return fadeInterval;
	}
}