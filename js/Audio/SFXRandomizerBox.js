"use strict";

/**
 * Adds more realism to audio by having multiple takes of a sound play at random
 * @param {SoundManager} soundManager The game SoundManager object
 * @param {number} dontPlayLastNum Setting to have the randomizer to ignore a number of sounds last played when picking randomly. This ensures no repeat sounds.
 * @param {[number, number]} volRange Volume random range as 2 length tuple (range: 0-1) e.g. [.75, 1]
 * @param {[number, number]} speedRange Speed multiplier random range as 2 length tuple e.g. [.5, 2]
 * @param {string[]} keys Keys of sounds to randomize
 *
 */
function SFXRandomizerBox(soundManager, dontPlayLastNum, volRange, speedRange, keys) {
	const _DEBUG = false;
	const _manager = soundManager;
	/**
	 * The master list of sound keys to pick from
	 * @type string[] 
	 */
	const _keys = keys;

	// Set volume range
	if (!Array.isArray(volRange) || volRange.length !== 2 || typeof volRange[0] !== "number" || typeof volRange[1] !== "number" || volRange[0] > volRange[1]) {
		throw new Error("Invalid volume range values");
	}
	const _volRange = volRange || [1, 1];

	// Set speed range
	if (!Array.isArray(speedRange) || speedRange.length !== 2 || typeof speedRange[0] !== "number" || typeof speedRange[1] !== "number" || speedRange[0] > speedRange[1]) {
		throw new Error("Invalid speed range values");
	}
	const _speedRange = speedRange || [1, 1];

	/**
	 * Sets the playback speed randomizer's range values. This value acts as a multiplier to the sound's speed.
	 * @param {number} min The minimum value. Value will be forced positive, then must be lower or equal to maximum
	 * @param {number} max The maximum value. Value will be forced positive, then must be greater or equal to minimum
	 */
	this.setSpeedRandRange = function(min, max) {
		_setSpeedRandMin(min);
		_setSpeedRandMax(max);
	};

	/**
	 * Sets the volume randomizer's range values.
	 * @param {number} min The minimum value. (Range: 0 to 1). Must be lower or equal to maximum
	 * @param {number} max The maximum value. (Range: 0 to 1). Must be greater or equal to minimum
	 */
	this.setVolumeRandRange = function(min, max) {
		_setVolumeRandMin(min);
		_setVolumeRandMax(max);
	};

	/**
	 * Sets the volume randomizer's minimum value
	 * If the value passed is greater than the maximum, the maximum will be also set to the passed value.
	 * @param {number} value The value to set the volume randomizer's minimum value to (Range: 0 to 1)
	 */
	this.setVolumeRandMin = _setVolumeRandMin;
	function _setVolumeRandMin(value) {
		value = clamp(value, 0, 1);
		// max should always be equal or higher than min value, this adjusts it accordingly
		if (value > _volRange[1]) {
			_volRange[1] = value;
		}
		_volRange[0] = value;
	}

	/**
	 * Sets the volume randomizer's maximum value
	 * If the value passed is less than the minimum, the minimum will be also set to the passed value.
	 * @param {number} value The value to set volume randomizer's maximum to (Range: 0 to 1)
	 */
	this.setVolumeRandMax = _setVolumeRandMax;
	function _setVolumeRandMax(value) {
		value = clamp(value, 0, 1);
		// min should always be equal or lower than max value, this adjusts it accordingly
		if (value < _volRange[0]) {
			_volRange[0] = value;
		}
		_volRange[1] = value;
	}

	/**
	 * Sets the speed randomizer's minimum value
	 * If the value passed is greater than the maximum, the maximum will be also set to the passed value.
	 * @param {number} value The value to set the speed randomizer's minimum value to. Will be forced to a positive number.
	 */
	this.setSpeedRandMin = _setSpeedRandMin;
	function _setSpeedRandMin(value) {
		value = Math.abs(value);
		if (value > _speedRange[1]) {
			_speedRange[1] = value;
		}
		_speedRange[0] = value;
	}

	/**
	 * Sets the speed randomizer's maximum value
	 * If the value passed is less than the minimum, the minimum will be also set to the passed value.
	 * @param {number} value The value to set the speed randomizer's minimum value to. Will be forced to a positive number.
	 */
	this.setSpeedRandMax = _setSpeedRandMax;
	function _setSpeedRandMax(value) {
		value = Math.abs(value);
		if (value < _speedRange[0]) {
			_speedRange[0] = value;
		}
		_speedRange[1] = value;
	}

	/**
	 * Ignores this number of last played sounds when picking a new random one to play
	 * @type number 
	 */
	let _dontPlayLastNum = dontPlayLastNum;

	this.setDontPlayLastNum = function(numSounds) {
		_dontPlayLastNum = numSounds;
	};

	this.getDontPlayLastNum = _getDontPlayLastNum;
	function _getDontPlayLastNum() {
		// Make sure this number is less than key's length. Use this func internally too to get this num.
		return Math.min(_dontPlayLastNum, _keys.length - 1);
	}
	this.addKey = function(key) {
		if (_keys.indexOf(key) === -1) {
			_keys.push(key);
		}
	};
	this.removeKey = function(key) {
		const index = _keys.indexOf(key);
		if (index >= 0) {
			_keys.splice(index, 1);
		}
	};
	this.getKeys = function() {
		return _keys;
	};

	/**
	 * Play a randomly picked sound
	 */
	this.play = function() {
		const key = _pickKey();
		const sprite = _manager.playSFX(key, randomRange(_volRange[0], _volRange[1]), randomRange(_speedRange[0], _speedRange[1]));
		_addToLastPlayed(key);
		return sprite;
	};


	/** @type string[] */
	const _lastPlayed = [];

	function _pickKey() {
		let key;
		do {
			key = _keys[_getRandomIndex()];
		} while (_lastPlayed.indexOf(key) >= 0);
		return key;
	}

	function _getRandomIndex() {
		return Math.floor(_keys.length * Math.random());
	}

	/**
	 * Manages adding a new key to the lastPlayed list
	 * @param {string} key 
	 */
	function _addToLastPlayed(key) {
		// If exceeding the lastPlayed cap, shift the first value out.
		if (_lastPlayed.length > _getDontPlayLastNum()) {
			_lastPlayed.shift();
		}

		// Only push the new key if it doesn't exist on the list
		if (_lastPlayed.indexOf(key) === -1) {
			_lastPlayed.push(key);
		} else {
			//if (_DEBUG) console.log("Warning! SFXRandomizerBox tried to add a value to the lastPlayed list, but it already exists!");
		}

		// Just double check that the array is at the right length.
		// User may have changed it
		while (_lastPlayed.length > _getDontPlayLastNum()) {
			_lastPlayed.shift();
		}		
	}
}
