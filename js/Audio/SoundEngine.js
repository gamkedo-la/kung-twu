/**
 * 
 * @param {SoundDescription | SoundDescription[]} soundDescriptions 
 */
function SoundEngine(descriptions) {
	const _DEBUG = true;
	// ======== Initialization ======== //
	/**
	 * Internal map of SoundSprite objects
	 * @type Map<string, SoundSprite>
	 */
	const _sounds = new Map();
	_addSound(descriptions);
	const _busses = new Map();
	const _format = _getFormat();

	let _isMuted = false;
	// ======== Public API ==============

	/**
	 * Returns the browser-compatible audio format as a string. e.g. ".mp3"
	 * Used to get the correct format when creating new sound instances, or debugging purposes.
	 */
	this.getAudioFormat = function() {
		return _format;
	};

	/**
	 * Sets a bus' volume, or creates an entry were it not there before
	 * @param {any} key Please use the AudioBus object enum for key values
	 * @param {number} startingVol A number 0-1, default 1 if no value passed.
	 */
	this.setBusVolume = function(key, startingVol = 1) {
		_busses.set(key, clamp(startingVol, 0, 1));
	};

	this.stopAllSounds = function(allowFadeOut = true) {
		_sounds.forEach((sound) => {
			sound.stop(allowFadeOut);
		});
	};

	/**
	 * Gets a bus' volume. Value (0-1)
	 */
	this.getBusVolume = function(key) {
		return _busses.get(key);
	};

	this.getIsMuted = function() {
		return _isMuted;
	};

	this.setMuted = function(isMuted) {
		_isMuted = isMuted;
	};

	/**
	 * Creates a sound instance from a SoundDescription mold of the corresponding key
	 * @param {string} key The key of the SoundDescription to create an instance of
	 */
	this.createInstance = _createInstance;
	function _createInstance(key) {
		const desc = _getGetSound(key);
		if (desc) {
			return desc.createInstance();
		} else {
			return null;
		}
	}

	/**
	 * Plays a sound once and leaves it to garbage collection. 
	 * Best for quick one shots that you won't need to use again in the near future such as a musical stinger.
	 * More performant to create and store a SoundInstance.
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
	 * Fades out current music track and starts a new one at indicated times.
	 * Returns a NodeJS.Timeout of the new track starting for own handling if needed.
	 * @param {SoundInstance} trackToFade Filepath + name of the new track to start
	 * @param {SoundInstance} newTrack Filepath + name of the new track to start
	 * @param {number} fadeOutTime The time (in seconds) to fade the currently playing track
	 * @param {number} startingTime The delay (in seconds) before the next track begins (lets current track fade a bit before starting new one)
	 * @returns Returns an array of interval handles that can be easily cleared via the cancelTransition function.
	 */
	this.transitionTo = function(trackToFade, newTrack, fadeOutTime, startingTime) {
		const grain = 1000/60; // ms
		let timeCounter = 0; // tracks the time before starting new track
		const startingTimeInMs = startingTime * 1000; // converts ahead of time so it doesn't need to every frame
		const currentTrack = trackToFade;
		/** @type number */
		let fadeInterval;
		if (currentTrack) {
			fadeInterval = currentTrack.fadeTo(0, fadeOutTime, () => {
				currentTrack.pause();
				currentTrack.setCurrentTime(0);
			});
		}
		
		// The interval to check how much time has passed before starting new track loop
		const interval = setInterval(() => {
			timeCounter += grain;
			if (timeCounter >= startingTimeInMs) {
				clearInterval(interval);
				newTrack.play();
			}
		}, grain); 
		return [interval, fadeInterval];
	};

	/**
	 * Cancels the transitionTo fade out and the upcoming playing track if it hasn't already started.
	 * Please make sure to pass the return value from transitionTo into cancelTransition.
	 * @param {number[]} transition transitionTo return value
	 */
	this.cancelTransition = function(transition) {
		for (let i = 0; i < transition.length; i++) {
			const interval = transition[i];
			if (interval !== undefined || interval !== null) {
				clearInterval(interval);
			}
		}
	};

	/**
	 * Gets a SoundSprite with the corresponding key
	 * @param {string} key
	 */
	this._getSound = _getGetSound;
	function _getGetSound(key) {
		const sound = _sounds.get(key);
		if (sound) {
			return sound;
		} else {
			if (_DEBUG) console.log("[SoundEngine] Error! SoundDescription with key \"" + key + "\", has not been registered with the SoundEngine!");
			return null;
		}
	}

	// ======== Private Helpers ============
	/**
	 * Adds a SoundDescription or an array of SoundDescriptions to the SoundEngine internal map
	 * @param {(SoundOverlaps | SoundOverlaps[])} descriptions
	 */
	function _addSound(soundOverlaps) {
		if (Array.isArray(soundOverlaps)) {
			const length = soundOverlaps.length;
			for (let i = 0; i < length; i++) {
				const sound = soundOverlaps[i];
				_sounds.set(sound.key, sound);
			}
		} else {
			_sounds.set(soundOverlaps.key, soundOverlaps);
		}	
	}

	/**
	* Sets the audio format that will be used by the entire game
	*/
	function _getFormat() {
		// Create dummy HTMLAudioElement to test compatibility
		const audio = new Audio(); 
		// Set audio type depending on compatibility
		if (audio.canPlayType("audio/mp3")) {
			return ".mp3";
		} else {
			return ".ogg";
		}
	}
}