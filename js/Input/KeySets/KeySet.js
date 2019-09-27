/**
 * A KeySet represents a collection of inputs/keys/mouse button/gamepad controls for a given action.
 * Managed in a group by a KeySetManager. Behind the scenes, it is a wrapper around a js Set, 
 * that also contains reference key and action type metadata.
 * Dependencies: None
 * @param {string} key Key to reference this KeySet by. Use a value in ACTION_KEYS or NAV_KEYS.
 * @param {string} actionType The type of action this KeySet represents. Use a value in ACTION_TYPE.
 * @param {string} action The action associated with this KeySet. Use a value in ACTION or NAV_ACTION
 * @param { number | string | (number | string)[]} inputCodes A single value or array containing values from either KeyCode, MouseButton, or game pad-related constants
 * Can be a single value or an array.
 */
function KeySet(key, actionType, action, inputCodes) {
	/**
	 * Whether or not to log messages to the console with this class. 
	 * Please set the value for testing pursposes in all KeySets directly here.
	 */
	const _DEBUG = true;

	/**
	 * The reference key or alias this keyset goes by for future reference in a KeySetManager.
	 * @type string
	 */
	this.key = key;

	/**
	 * The ACTION_TYPE of this KeySet. Either ACTION_TYPE.ACTION or ACTION_TYPE.NAV
	 * @type ACTION_TYPE
	 */
	this.type = actionType;

	/**
	 * The corresponding action of this KeySet. A value in either ACTION or NAV_ACTION.
	 */
	this.action = action;

	/**
	 * Add a KeyCode, MouseButton, or constant pertaining to GamePad buttons to the KeySet
	 */
	this.add = function(inputCode) {
		if (_set.has(inputCode)) {
			if (_DEBUG) console.trace('Warning! This KeySet already contains the key: ' + inputCode + '.');
		} else {
			_set.add(inputCode);
		}
		return this;
	}

	/**
	 * Add multiple KeyCodes, MouseButtons, or constants pertaining to GamePad buttons to the inner set.
	 * @param {(string|number)[]} inputCodes The array of input codes to add. 
	 * @returns {KeySet}
	 */
	this.addMultiple = (inputCodes) => {
		inputCodes.forEach((code) => {
			this.add(code);
		});
		return this;
	}

	/**
	 * The inner Set of input codes which are 
	 * @type Set<number | string>
	 */
	const _set = new Set();
	// Initialize set. Comes after this.add so it can reference it directly
	if (inputCodes && Array.isArray(inputCodes)) {
		inputCodes.forEach((code) => {
			this.add(code);
		});
	} else {
		this.add(inputCodes);
	}

	/**
	 * Iterates through each element by firing a callback for each. 
	 * Note: This converts the set into an array first, so the Set object is NOT referenced 
	 * directly in the callback parameter, but rather it is a new array.
	 * @param {(inputCode: string|number, index: number, inputCodeArray: (string|number)[]) => void} callbackfn The callback to iterate on
	 * @param {any} thisArg The 'this' to call the callback function by
	 */
	this.forEach = function _forEach(callbackfn, thisArg) {
		const _arr = Array.from(_set);
		if (thisArg) {
			for (let i = 0; i < _arr.length; i++) {
				let val = _arr[i];
				callbackfn.call(thisArg, val, i, _arr);
			}
		} else {
			for (let i = 0; i < _arr.length; i++) {
				let val = _arr[i];
				callbackfn(val, i, _arr);
			}
		}
	}

	/**
	 * Checks if this KeySet contains an input code, which can be a value of KeyCode, MouseButton, or constant pertaining to GamePad buttons.
	 */
	this.has = function (inputCode) {
		return _set.has(inputCode);
	}

	this.delete = function(inputCode) {
		_set.delete(inputCode);
	}

	this.deleteAll = function() {
		_set.clear();
	}

	/**
	 * Returns the inner input codes of the set as an array
	 */
	this.getAsArray = function() {
		return Array.from(_set);
	}

	// We don't want the properties to be altered, although
	// the set can still be altered through its own functions.
	Object.freeze(this);
}
