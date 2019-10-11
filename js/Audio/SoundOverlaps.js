
/**
 * A container that holds a number of duplicate instances of a sound to allow overlapping. Will be held by the SoundEngine, and not to be interfaced with directly 
 * @param {SoundEngine} soundEngine Sound engine instance this instance belongs to
 * @param {string} filepath Filepath of the audio file
 * @param {number} baseVolume Base volume
 * @param {number} startingVol Starting volume. Range 0-1
 * @param {string} audioBus A value within the AudioBus 'enum' object
 * @param {boolean} isLoop Sets if this is a loop or not
 * @param {number} maxInstances The max number of inner instances that can play at one time
 * @param {number} fadeOutTime The number of seconds of fading out a sound when calling "stop".
 */
function SoundOverlaps(soundEngine, filepath, baseVolume, startingVol, audioBus, isLoop, maxInstances, fadeOutTime) {

	// ========= Initialization =============== //
	/** 
	 * This is the value that the user interfaces with. It's a bit of a magic number that has a dB-like logarithmic curve. Range: 0-1
	 * @type {number} 
	 */
	let _volume = clamp(startingVol, 0, 1);
	/** @type {SoundEngine} */
	const _engine = soundEngine;
	/** @type {HTMLAudioElement[]} */
	const _elements = [];
	for (let i = 0; i < Math.max(1, maxInstances); i++) { // (make sure maxInstnaces is at least 1)
		_elements.push(new Audio(filepath));
	}
	let _playIndex = 0; // current index of elements to play next
	const _baseVolume = baseVolume; // inject baseVolume for volume calculation

	/** @type {string} A value within AudioBus enum object */
	let _audioBus = audioBus || AudioBus.NONE;
	_setLooping(isLoop); // set looping to the inner html elements

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
	 * Start playing the next free inner sound instance.
	 * If all are currently playing, the oldest one will be 'stolen'
	 */
	this.play = function() {
		const e = _elements[_playIndex];
		if (e.paused) {
			// Next free instance is free to play: play it
			e.play();
		} else {
			// Next free instance is actually still busy: pause, reset, and play it
			e.pause();
			e.currentTime = 0;
			e.play();
		}
		// Increase the playindex by 1, and wrap around to 0 if outside the bounds
		_playIndex = (_playIndex + 1) % _elements.length;
	};

	/**
	 * Stops all inner instances of the SoundInstance
	 * @param fadeOut Default = true. Fades out on true, immediate stop on false
	 * @param {number?} overrideFadeTimeValue Optional parameter. When set with a number, it will override the instance's preset fadeOutTime value.
	 */
	this.stop = function(fadeOut = true, overrideFadeTimeValue) {
		if (fadeOut) {
			_fadeTo(0, overrideFadeTimeValue ||  _fadeOutTime, (inst)=> {
				// Reset the sound on finished fade
				inst.setPausedAll(true);
				_elements.forEach((e) => {
					e.currentTime = 0;
				});
			});
		} else {
			this.setPausedAll(true);
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
	 * Cancels the current fade if there is one
	 */
	this.cancelFade = function() {
		if (_fade != null) {
			// There is a fade to cancel: clear it, set it to the default val null
			clearInterval(_fade);
			_fade = null;
		}
	};

	/**
	 * Sets the looping status of each internal sound instance mid-game.
	 * Suggestion: Loops are best faded out. If the preset fadeout length is 0, you can override it in stop
	 */
	this.setLooping = _setLooping; // open this function for public use also
	function _setLooping(isLoop) {
		_elements.forEach((e) => {
			e.loop = isLoop;
		});
	}

	this.getLooping = function() {
		return _elements[0].loop;
	};

	/**
	 * Sets the volume of the track or simply updates it if no volume is passed.
	 * Affects all inner sound instances.
	 * @param {number} vol 
	 */
	this.setVolume = _setVolume; // Open this function for public use also

	this.getVolume = () => _volume;

	/**
	 * Sets this instance's audio bus to another one
	 * Affects all inner sound instances
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
	 * Set the paused status of every inner sound instance
	 * @param {boolean} paused Paused status to set
	 */
	this.setPausedAll = function(paused) {
		if (paused === true) { // Using triple equals to make sure it is a boolean
			_elements.forEach((e) => {
				e.pause();
			});
		} else if (paused === false) {
			// We've unpaused the instance: Set all inner instances that were playing to start playing again
			_elements.forEach((e) => {
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
		return _elements[_getLastPlayedIndex()].paused;
	};

	/**
	 * Sets the track time of the last played inner instance. If in the middle of playing, will continue from that point on, if paused, it will play at that position when played or unpaused.
	 * Caveat: if this current inner instance is paused and if this.setPause is set to false later, this instance will play at the set track time.
	 */
	this.setTrackTime = function(time) {
		const e = _getLastPlayed();
		e.currentTime = time;
	};

	/**
	 * Gets the track time of the last played inner instance.
	 */
	this.getTrackTime = function() {
		return _getLastPlayed().currentTime;
	};


	// ====================================== //
	// ======== Private Helpers ============= //
	// ====================================== //

	/**
	 * Helper that gets the last played inner instance
	 */
	function _getLastPlayed() {
		return _elements[_getLastPlayedIndex()];
	}
	/**
	 * Helper that gets the last played inner instance index
	 */
	function _getLastPlayedIndex() {
		// Quick hack to wrap around to last index if below 0 (since we don't have a true modulus function)
		return (_playIndex - 1 < 0) ? _elements.length - 1 : _playIndex - 1; 
	}

	/**
	 * Sets the volume of the track or simply updates it if no volume is passed.
	 * Affects all inner sound instances.
	 * @param {number} vol 
	 */
	function _setVolume(vol) {
		this.cancelFade();
		// Update magic number _volume if a value is passed
		if (vol != undefined && vol != null && typeof vol === "number") {
			_volume = clamp(vol, 0, 1);
		}
		// Calculate and set the volume param of every internal instance
		_elements.forEach((e) => {
			e.volume = _calculateTrackVolume(_baseVolume, _audioBus, _volume);
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
	 * Fade this sound to a target volume
	 * @param {number} targetVol value between 0-1
	 * @param {number} seconds fade time in seconds
	 * @param {(inst: SoundInstance)=>void}onTargetReached The callback to call when this fade is complete, please make sure to bind 'this' ahead of time
	 */
	function _fadeTo(targetVol, seconds, onTargetReached) {
		this.cancelFade(); // cancel current fade to prevent jumpy multi-fade bug
		const fade = _fadeFromTo(this, _volume, targetVol, seconds, (sound) => {
			// Target volume has been reached: Reset fade value and call callback.
			_fade = null;
			onTargetReached(sound);	
		});
		// If we have a fade returned, set the fade property to that value
		if (fade != null && fade != undefined) {
			_fade = fade;
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