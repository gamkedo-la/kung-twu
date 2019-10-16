/**
 * A container that holds a number of duplicate instances of a sound to allow overlapping. Will be held by the SoundEngine, and not to be interfaced with directly 
 * @param {string} key The key string to reference this by
 * @param {string} filepath Filepath of the audio file
 * @param {number} baseVolume Base volume
 * @param {string} audioBus A value within the AudioBus 'enum' object
 * @param {boolean} isLoop Sets if this is a loop or not
 * @param {number} maxInstances The max number of inner instances that can play at one time
 * @param {number} fadeOutTime The number of seconds of fading out a sound when calling "stop".
 */
function SoundSprite(key, filepath, baseVolume, audioBus, isLoop, maxInstances, fadeOutTime) {

	// ========= Initialization =============== //
	/**
	 * this
	 * @type SoundSprite
	 */
	const _this = this;

	/**
	 * Reference to the SoundEngine. Will be set autmatically when added to that SoundEngine. 
	 * @type {SoundEngine} 
	 */
	let _engine = null;

	/** 
	 * Reference key by which to call this SoundSprite
	 * @type {string}
	 */
	const _key = key;

	/** 
	 * Internal SoundInstance list
	 * @type {SoundInstance[]} 
	 */
	const _instances = [];

	/** current index of elements to play next */
	let _playIndex = 0;

	/** base volume for this particular sound */
	const _baseVolume = baseVolume;

	/** @type {string} A value within AudioBus enum object */
	let _audioBus = audioBus;

	let _isLoop = isLoop;

	/** @type {NodeJS.Timeout} */
	let _fade = null;

	/** 
	 * The number of seconds of fade when stopping. May be bypassed to immediate stop by passing false in stop.
	 * @type {number} 
	 */
	let _fadeOutTime = fadeOutTime;

	// ============================== //
	// ======== Public API ========== //
	// ============================== //

	/**
	 * Connects this SoundSprite to a SoundEngine. Initializes the SoundInstances within.
	 * This is automatically called by the SoundEngine when you add this SoundSprite to it.
	 * @param {SoundEngine} engine The SoundEngine to connect the SoundSprite to.
	 */
	this._connectToSoundEngine = function(engine) {
		_engine = engine;
		// Initialize instance list
		for (let i = 0; i < Math.max(1, maxInstances); i++) { // (make sure maxInstnaces is at least 1)
			const inst = new SoundInstance(this, filepath + _engine.getAudioFormat());
			_instances.push(inst);
		}
		_setLooping(_isLoop);
	};

	this.getKey = function() {
		return _key;
	};

	/**
	 * Start playing the next free inner sound instance.
	 * If all are currently playing, the oldest one will be 'stolen'
	 */
	this.play = function() {
		const e = _instances[_playIndex];
		e.cancelFade(); // cancel fade if there is one
		_setTrackVolume(e, 1);
		if (e.getIsPaused()) {
			// Next free instance is free to play: play it
			e.play();
		} else {
			// Next free instance is actually still busy: pause, reset, and play it
			e.pause();
			e.setCurrentTime(0);
			e.play();
		}
		// Increase the playindex by 1, and wrap around to 0 if outside the bounds
		_playIndex = (_playIndex + 1) % _instances.length;
		return e;
	};

	/**
	 * Stops all inner instances of the SoundInstance
	 * @param fadeOut Default = true. Fades out on true, immediate stop on false
	 * @param {number?} overrideFadeTimeValue Optional parameter. When set with a number, it will override the instance's preset fadeOutTime value.
	 */
	this.stop = function(allowFadeOut = true, overrideFadeTimeValue) {
		if (allowFadeOut) {
			_instances.forEach((inst) => {
				_fadeTo(inst, 0, overrideFadeTimeValue || _fadeOutTime, (inst) => {
					inst.pause();
					inst.setCurrentTime(0);
				});
			});
		} else {
			_instances.forEach((inst) => {
				inst.setCurrentTime(0);
				inst.pause();
			});
		}
	};

	/**
	 * Fade this sound to a target volume
	 * @param {number} targetVol value between 0-1
	 * @param {number} seconds fade time in seconds
	 * @param {(inst: SoundInstance)=>void}onTargetReached The callback to call when this fade is complete, please make sure to bind 'this' ahead of time
	 */
	this.fadeTo = _fadeTo; // open private function for public use also

	/**
	 * Gets whether or not the track is currently fading
	 */
	this.getIsFading = function() {
		(_fade === null) ? false : true; // null is the default "not fading" value
	};

	/**
	 * Cancels the latest SoundInstance's fade if there is one
	 */
	this.cancelFade = () => {
		const lastPlayed = _getLastPlayed();
		if (lastPlayed !== null && lastPlayed !== undefined) {
			_cancelFade(lastPlayed);
		}
	};

	/**
	 * Cancels the fades of all instances in SoundOverlaps if they have any current fading
	 */
	this.cancelFadeAll = () => {
		_instances.forEach((inst) => {
			_cancelFade(inst);
		});
	};
	/**
	 * Cancels a fade on a sound instance
	 * @param {SoundInstance} soundInstance The handle from the fade function
	 */
	function _cancelFade(soundInstance) {
		if (soundInstance) {
			const fade = soundInstance._fade;
			if (fade != null) {
				// There is a fade to cancel: clear it, set it to the default val null
				clearInterval(fade);
				soundInstance._fade = null;
			}
		} else {
			console.log("Warning! Tried _cancelFade, but soundInstance was null or undefined!");
		}

	}

 

	/**
	 * Sets the looping status of each internal sound instance mid-game.
	 * Suggestion: Loops are best faded out. If the preset fadeout length is 0, you can override it in stop
	 */
	this.setLoopingAll = _setLooping; // open this function for public use also
	function _setLooping(isLoop) {
		_instances.forEach((e) => {
			e.loop = isLoop;
		});
		_isLoop = isLoop;
	}

	this.getLooping = function() {
		return _isLoop;
	};

	/**
	 * Sets the volume of the track or simply updates it if no volume is passed.
	 * Affects all inner sound instances.
	 * @param {number} vol (optional) The volume to set to, or if left undefined, will just update the sound volume according to new bus changes.
	 */
	this.setVolume = _setVolumeAll; // Open this function for public use also

	/**
	 * Gets the volume of the last played instance
	 */
	this.getVolume = () => {
		_getLastPlayed().getVolume();
	};

	/**
	 * Sets this instance's audio bus to another one
	 * Affects all inner sound instances
	 * @param {string} audioBus A value from the global AudioBus 'enum' object
	 */
	this.setBus = function(audioBus) {
		_audioBus = audioBus;
		_setVolumeAll();
	};

	/**
	 * Returns the key of the current audio bus, which is a string value listed in the global AudioBus 'enum' object.
	 */
	this.getBus = function() {
		return _audioBus;
	};

	/**
	 * Set the paused status of every inner sound instance
	 * @param {boolean} paused Paused status to set
	 */
	this.setPausedAll = function(paused) {
		if (paused === true) { // Using triple equals to make sure it is a boolean
			_instances.forEach((e) => {
				e.pause();
			});
		} else if (paused === false) {
			// We've unpaused the instance: Set all inner instances that were playing to start playing again
			_instances.forEach((e) => {
				if (e.currentTime > 0) { // Detecting was playing by the currentTime being beyond the starting point
					e.play();
				}
			});
		} else {
			console.log("SoundInstance setPaused was passed an invalid parameter! Must be a boolean");
		}
	};

	/**
	 * Set the paused status of the last played inner sound instance
	 * @param {boolean} paused Paused status to set
	 */
	this.setPaused = function(paused) {
		if (paused === true) {
			_getLastPlayed().pause();
		} else {
			_getLastPlayed().play();
		}
	};

	/**
	 * Gets whether or not the latest inner instance is paused.
	 * @returns {boolean}
	 */
	this.getPaused = function() {
		return _getLastPlayed().getIsPaused();
	};

	/**
	 * Sets the current track time of the last played inner instance. 
	 * @param {number} time The time in seconds to set the last played track to
	 * @param {boolean} playEvenIfEnded If true, will play the last played track at the indicated time even if it had ended already. Default = false.
	 */
	this.setCurrentTime = function(time, playEvenIfEnded = false) {
		const e = _getLastPlayed();
		if (e.getIsPlaying()) {
			e.setCurrentTime(time);
		} else if (playEvenIfEnded) {
			e.setCurrentTime(time);
			e.play();
		}	
	};

	/**
	 * Gets the track time of the last played inner instance.
	 */
	this.getTrackTime = function() {
		return _getLastPlayed().currentTime;
	};

	this.getLastPlayed = _getLastPlayed;

	// ====================================== //
	// ======== Private Helpers ============= //
	// ====================================== //

	/**
	 * Helper that gets the last played inner instance
	 */
	function _getLastPlayed() {
		const index = wrap(_playIndex - 1, 0, _instances.length);
		return _instances[index];
	}

	/**
	 * Sets the volume of the track or simply updates it if no volume is passed.
	 * Affects all inner sound instances.
	 * @param {number} vol 
	 */
	function _setVolumeAll(vol) {
		this.cancelFade();
		// Update magic number _volume if a value is passed
		if (vol !== undefined && vol !== null && typeof vol === "number") {
			vol = clamp(vol, 0, 1);
		}
		// Calculate and set the volume param of every internal instance
		_instances.forEach((inst) => {
			_setTrackVolume(inst, vol || inst.getVolume());
		});
	} 

	/**
	 * Internal calculation taking bus values into consideration. May move to an audio engine object later
	 * @param {number} baseVolume 
	 * @param {string} bus 
	 * @param {number} volume 
	 */
	function _calculateTrackVolume(baseVolume, bus, volume) {	
		// Calculate volume here. User can omit or set volume to null to not alter the value, but rather update the volume based on bus.
		if (_engine.isMuted) {
			// avoid having to calculate volume if muted
			return 0;
		} else {
			let vol = 1; // default val if user does not pass volume param
			if (volume != undefined && volume != null) {
				vol = volume;
			}

			const _bus = _engine.getBusVolume(bus);
			const _base = baseVolume;
			const _master = _engine.getMasterVolume();
			return Math.pow(vol * _base * _bus * _master, 2);
		}
	}

	/**
	 * 
	 * @param {SoundInstance} soundInst 
	 * @param {number} targetVol 
	 * @param {number} seconds 
	 * @param {(inst: SoundInstance)=>void} onTargetReached 
	 */
	function _fadeTo(soundInst, targetVol, seconds, onTargetReached) {
		if (!soundInst) return null;

		soundInst.cancelFade(); // cancel current fade to prevent jumpy multi-fade bug
		const fade = _fadeFromTo(soundInst, soundInst.getVolume(), targetVol, seconds, (sound) => {
			// Target volume has been reached: Reset fade value and call callback.
			sound._fade = null;
			if (onTargetReached) {
				onTargetReached(sound);	
			}
		});
		// If we have a fade returned, set the fade property to that value
		if (fade != null && fade != undefined) {
			soundInst._fade = fade;
		}
	}

	/**
	 * Simple fade to a target volume in a set amount of seconds. If you need to set a starting value, please do that before calling.
	 * Returns the NodeJS.Timeout so you can stop it on your own with clearInterval if needed before it reaches its target.
	 * @param {SoundInstance} sound The SoundInstance to fade
	 * @param {number} targetVol
	 * @param {number} seconds 
	 * @param {(track: SoundInstance) => void} onTargetReached Optional callback to send when the fade has reached its target. Receives the HTMLAudioElement. 
	 * Please make sure to bind 'this' ahead of time if necessary.
	 * @returns NodeJS.Timeout | null
	 */
	function _fadeFromTo(sound, startingVol, targetVol, seconds, onTargetReached) {
		if (startingVol == targetVol) {
			// Get out of here if already at fade destination
			return null;
		}

		const grain = 60; // fps that the interval will tick. Lower the number for performance, but may be audible.
		const fadePerFrame = getFadePerInterval(); // get the amount to fade per interval tick
		return createFadeInterval();

		// ====== Sub-functions ====== //
		/** Gets the amount to fade per interval tick */
		function getFadePerInterval() {
			const diff = targetVol - startingVol;
			return  diff / grain / seconds;
		}

		/** Create and return an interval that will fade the track at the set fadePerFrame */
		function createFadeInterval() {
			const fadeInterval = setInterval(() => {
				const currentVol = sound.getVolume();

				// Check if we have arrived
				if (currentVol > targetVol - Math.abs(fadePerFrame) && 
				currentVol < targetVol + Math.abs(fadePerFrame)) 
				{
					_setTrackVolume(sound, targetVol);
					clearInterval(fadeInterval); // clear this interval so it is no longer called
					if (onTargetReached) { // call callback if there is one
						onTargetReached(sound);
					}
				} else {
					const newVal = currentVol + fadePerFrame;
					// Increment/decrement volume at the fadePerFrame value
					_setTrackVolume(sound, newVal);
				}
			}, 1000/grain);

			return fadeInterval;
		}
	}

	/**
	 * Sets the volume of a sound instance and updates it according to the bus routing values
	 * This might be roundabout, but keeps every sound instance from needing a reference to the engine
	 * @param {SoundInstance} soundInst 
	 */
	function _setTrackVolume(soundInst, vol) {
		soundInst.setVolume(clamp(vol, 0, 1));
		soundInst._setInnerVolume(_calculateTrackVolume(_baseVolume, _audioBus, vol));
	}
}
