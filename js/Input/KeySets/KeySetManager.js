/**
 * KeySetManager is a manager of KeySets, which are individual sets of input codes 
 * for an action. It is owned by the KeyMapper to organize its managing of the game's 
 * interpretation of input clicks/presses to actions. 
 * Dependencies: KeySet
 */
function KeySetManager() {
	const _DEBUG = true;
	/**
	 * Internal KeySet Map
	 * @type Map<string, KeySet> 
	 */
	const _keySets = new Map();
	
	/**
	 * Generates and adds new KeySet to be stored in the KeySetManager internal Map.
	 * @param {string} key Key to reference this KeySet by. Use a value in ACTION_KEYS or NAV_KEYS.
   * @param {string} actionType The type of action. Use a value in ACTION_TYPE to set it to either ACTION_TYPE.ACTION or ACTION_TYPE.NAV.
	 * @param {string} action The action the KeySet is associated with. Use a value in ACTION or NAV_ACTION.
   * @param { number | string | (number | string)[]} inputCodes A single value or array containing values from either KeyCode, MouseButton, or game pad-related constants
	 * @returns {KeySetManager}
	 */
	this.create = function(key, actionType, action, inputCodes) {
		if (_keySets.has(key)) {
			if (_DEBUG) console.trace("Warning! Duplicate reference keys! KeySetManager already contains the reference key: " + key + ".");
		}
		_keySets.set(key, new KeySet(key, actionType, action, inputCodes));
		return this;
	};

	/**
	 * Gets a KeySet by reference key. 
	 * @param key The key. Use a value in ACTION_KEYS or NAV_KEYS.
	 */
	this.get = function _get(key) {
		const keySet = _keySets.get(key);
		if (keySet) {
			return keySet;
		} else {
			if (_DEBUG) throw new Error("KeySet with key:" + key + ", does not exist in the KeySetManager!")
		}
	};

	/**
	 * Deletes a KeySet by reference key.
	 * @param key The key. Use a value in ACTION_KEYS or NAV_KEYS.
	 */
	this.delete = function _delete(key) {
		if (_keySets.has(key)) {
			_keySets.delete(key);
		} else {
			if (_DEBUG) console.trace("Warning! Tried to delete key: " + key + ", of a KeySet that does not exist on this KeySetManager!");
		}
	};

	/**
	 * Checks if the KeySetManager has a KeySet
	 * @param key The key. Use a value in ACTION_KEYS or NAV_KEYS.
	 */
	this.has = function _has(key) {
		return  _keySets.has(key);
	};

	/**
	 * Iterates a callback over each KeySet
	 * @param {(keySet: KeySet, key: string) => void} callbackFn key is either an ACTION_KEYS or NAV_KEYS.
	 * @param {any} thisArg Explicit 'this' binding to callback
	 */
	this.forEach = function _forEach(callbackFn, thisArg) {
		if (thisArg) {
			_keySets.forEach((keySet, key, map) => { 
				callbackFn.call(thisArg, keySet, key); // hide map
			});
		} else {
			_keySets.forEach((keySet, key, map) => {
				callbackFn(keySet, key);	// hide map
			});
		}
	};
};