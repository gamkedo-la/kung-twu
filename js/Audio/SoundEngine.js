/**
 * SoundEngine core object. Stores SoundSprites, bus volumes, master volume, global muting, viable audio format, other helper functions.
 * Sprites should be added after instantiation with addSounds(configs)
 */
function SoundEngine() {
	const _DEBUG = true;

	// ======== Initialization ======== //
	const _this = this;
	/**
	 * Internal map of SoundSprite objects
	 * @type Map<string, SoundSprite>
	 */
	const _sounds = new Map();

	const _busses = new Map();
	const _format = _getFormat();

	let _isMuted = false;

	let _masterVolume = 1;

	// ======== Public API ==============

	/**
	 * Returns the browser-compatible audio format as a string. e.g. ".mp3"
	 * Used to get the correct format when creating new sound instances, or debugging purposes.
	 */
	this.getAudioFormat = function() {
		return _format;
	};

	this.getMasterVolume = function() {
		return _masterVolume;
	};

	this.setMasterVolume = function(val) {
		_masterVolume = clamp(val, 0, 1);
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

	/**
	 * Gets the SoundEngine's muted status as a bool
	 */
	this.getIsMuted = function() {
		return _isMuted;
	};

	/**
	 * Sets the SoundEngine's muted status
	 */
	this.setMuted = function(isMuted) {
		_isMuted = isMuted;
		_sounds.forEach((sound) => {
			sound.setVolume();
		});
	};

	/**
	 * Fades out current music track and starts a new one at indicated times.
	 * Returns a NodeJS.Timeout of the new track starting for own handling if needed.
	 * @param {SoundSprite} trackToFade Filepath + name of the new track to start
	 * @param {SoundSprite} newTrack Filepath + name of the new track to start
	 * @param {number} fadeOutTime The time (in seconds) to fade the currently playing track
	 * @param {number} startingTime The delay (in seconds) before the next track begins (lets current track fade a bit before starting new one)
	 * @returns Returns an array of interval handles that can be easily cleared via the cancelTransition function.
	 */
	this.transitionTo = function(trackToFade, newTrack, fadeOutTime, startingTime) {
		const grain = 1000/60; // ms
		let timeCounter = 0; // tracks the time before starting new track
		const startingTimeInMs = startingTime * 1000; // converts ahead of time so it doesn't need to every frame
		const currentTrack = trackToFade;
		const currentInst = trackToFade.getLastPlayed();

		if (currentTrack) {
			currentTrack.stop(true, fadeOutTime);
			// fadeInterval = currentTrack.fadeTo(currentTrack.getLastPlayed(), 0, fadeOutTime, () => {
			// 	currentInst.pause();
			// 	currentInst.setCurrentTime(0);
			// });
		}
		
		// The interval to check how much time has passed before starting new track loop
		const interval = setInterval(() => {
			timeCounter += grain;
			if (timeCounter >= startingTimeInMs) {
				clearInterval(interval);
				newTrack.play();
			}
		}, grain); 
		return [interval];
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
			throw new Error("[SoundEngine] Error! SoundSprite with key \"" + key + "\", has not been registered with the SoundEngine!");
		}
	}

	/**
	 * Converts passed SoundSpriteConfigs into SoundSprites and adds them to the SoundEngine
	 * @param {SoundSpriteConfig | SoundSpriteConfig[]} configs SoundSpriteConfigs passed as an array of object literals
	 */
	this.addSounds = _parseSoundSpriteConfigs;

	// ======== Private Helpers ============

	/**
	 * Converts passed SoundSpriteConfigs into SoundSprites and adds them to the SoundEngine
	 * @param {SoundSpriteConfig | SoundSpriteConfig[]} configs SoundSpriteConfigs passed as an array of object literals or a single object literal
	 */
	function _parseSoundSpriteConfigs(configs) {
		if (Array.isArray(configs)) {
			// config array has been passed
			configs.forEach((c) => {
				_parseOneSound(c);
			});
		} else {
			// single config has been passed
			_parseOneSound(configs);
		}

		/**
		 * Parse one sound config into a soundsprite object and add/connect it to engine
		 */
		function _parseOneSound(config) {
			// parse each config into new SoundSprites
			const newSound = new SoundSprite(
				config.key,
				config.filepath,
				config.baseVolume,
				config.audioBus,
				config.isLoop,
				config.maxInstances,
				config.fadeOutTime
			);
			newSound._connectToSoundEngine(_this); // connect new sound sprite to this engine
			_sounds.set(config.key, newSound); // add new sound sprite to internal sound map
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
