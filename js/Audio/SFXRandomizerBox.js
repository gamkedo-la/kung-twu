
/**
 * Adds more realism to audio by having multiple takes of a sound play at random
 * @param {SoundManager} soundManager The game SoundManager object
 * @param {number} dontPlayLastNum Setting to have the randomizer to ignore a number of sounds last played when picking randomly. This ensures no repeat sounds.
 * @param {string[]} keys Keys of sounds to randomize
 *
 */
function SFXRandomizerBox(soundManager, dontPlayLastNum, keys) {
	const _manager = soundManager;
	/**
	 * The master list of sound keys to pick from
	 * @type string[] 
	 */
	const _keys = keys;

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
		console.log("Key playing:", key);
		console.log("lastPlayed list (before):", _lastPlayed);
		const sprite = _manager.playSFX(key);
		_addToLastPlayed(key);
		console.log("lastPlayed list (after):", _lastPlayed);
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
		if (_lastPlayed.length > _getDontPlayLastNum()) {
			_lastPlayed.shift();
		}
		if (_lastPlayed.indexOf(key) === -1) {
			_lastPlayed.push(key);
		}

		// Just double check that the array is at the right length.
		// User may have changed it
		console.log("getdontplaylastnum:", _getDontPlayLastNum());
		while (_lastPlayed.length > _getDontPlayLastNum()) {
			_lastPlayed.shift();
		}		
	}

}