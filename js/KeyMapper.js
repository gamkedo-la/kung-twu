/**
 * Keys to reference Action KeySets stored in the KeyMapper
 */
const ACTION_KEYS = {
	WALK_LEFT:"walkLeft",
	WALK_RIGHT:"walkRight",
	JUMP:"jump",
	DASH:"dash",
	BLOCK:"block",
	CROUCH:"crouch",
	KICK:"kick",
	PUNCH:"punch",
};
Object.freeze(ACTION_KEYS);

/**
 * Keys to reference Nav KeySets stored in the KeyMapper
 */
const NAV_KEYS = {
	UP:"navUp",
	DOWN:"navDown",
	LEFT:"navLeft",
	RIGHT:"navRight",
	SELECT:"navSelect",
	BACK:"navBack",
	PAUSE:"navPause"
};
Object.freeze(NAV_KEYS);

/**
 * A list of Navigation Actions
 */
const NAV_ACTION = {
	UP:"navUp",
	DOWN:"navDown",
	LEFT:"navLeft",
	RIGHT:"navRight",
	SELECT:"navSelect",
	BACK:"navBack",
	PAUSE:"navPause"
};
Object.freeze(NAV_ACTION);

/**
 * Represents the type of action of a KeySet
 */
const ACTION_TYPE = {
	ACTION: 'ACTION',
	NAV: 'NAV'
};
Object.freeze(ACTION_TYPE);

/**
 * A wrapper around a set that also contains data about the set's reference key and action type.
 * @param {string} key Key to reference this KeySet by. Use a value in ACTION_KEYS or NAV_KEYS.
 * @param {string} actionType The type of action this KeySet represents. Use a value in ACTION_TYPE.
 * @param {string} action The action associated with this KeySet. Use a value in ACTION or NAV_ACTION
 * @param { number | string | (number | string)[]} inputCodes A single value or array containing values from either KeyCode, MouseButton, or game pad-related constants
 * Should be a value from KeyCodes, MouseButtons, or GamePad button constants. Can be a single value or an array.
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


/**
 * Manager of KeySets. The add function generates a new KeySet.
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
	this.add = function(key, actionType, action, inputCodes) {
		if (_keySets.has(key)) {
			if (_DEBUG) console.trace('Warning! Duplicate reference keys! KeySetManager already contains the reference key: ' + key + '.');
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
			if (_DEBUG) throw new Error('KeySet with key:' + key + ', does not exist in the KeySetManager!')
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
			if (_DEBUG) console.trace('Warning! Tried to delete key: ' + key + ', of a KeySet that does not exist on this KeySetManager!');
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

//Key Mapper
function KeyMapper() {
	const keySets = new KeySetManager();

	// ====== Add ACTION KeySets to the KeySetManager ======
	keySets
		.add(ACTION_KEYS.WALK_LEFT, ACTION_TYPE.ACTION, ACTION.Left)
		.add(ACTION_KEYS.WALK_RIGHT, ACTION_TYPE.ACTION, ACTION.Right)
		.add(ACTION_KEYS.JUMP, ACTION_TYPE.ACTION, ACTION.Jump)
		.add(ACTION_KEYS.DASH, ACTION_TYPE.ACTION, ACTION.Dash)
		.add(ACTION_KEYS.BLOCK, ACTION_TYPE.ACTION, ACTION.Block)
		.add(ACTION_KEYS.CROUCH, ACTION_TYPE.ACTION, ACTION.Crouch)
		.add(ACTION_KEYS.KICK, ACTION_TYPE.ACTION, ACTION.Kick)
		.add(ACTION_KEYS.PUNCH, ACTION_TYPE.ACTION, ACTION.Punch);

	// ====== Add NAV KeySets to the KeySetManager ======
	keySets
		.add(NAV_KEYS.LEFT, ACTION_TYPE.NAV, NAV_ACTION.LEFT,
			[
				KeyCode.LEFT, 
				KeyCode.A, 
				LEFT_STICK_LEFT, 
				RIGHT_STICK_LEFT, 
				L1_BUTTON, 
				L2_BUTTON, 
				DPAD_LEFT
			]
		)
		.add(NAV_KEYS.RIGHT, ACTION_TYPE.NAV, NAV_ACTION.RIGHT,
			[
				KeyCode.RIGHT, 
				KeyCode.D, 
				LEFT_STICK_RIGHT, 
				RIGHT_STICK_RIGHT, 
				R1_BUTTON, 
				R2_BUTTON, 
				DPAD_RIGHT
			]
		)
		.add(NAV_KEYS.UP, ACTION_TYPE.NAV, NAV_ACTION.UP,
			[
				KeyCode.UP, 
				KeyCode.W, 
				LEFT_STICK_UP, 
				RIGHT_STICK_UP, 
				DPAD_UP
			]
		)
		.add(NAV_KEYS.DOWN, ACTION_TYPE.NAV, NAV_ACTION.DOWN,
			[
				KeyCode.DOWN, 
				KeyCode.S, 
				LEFT_STICK_DOWN, 
				RIGHT_STICK_DOWN, 
				DPAD_DOWN
			]
		)
		.add(NAV_KEYS.SELECT, ACTION_TYPE.NAV, NAV_ACTION.SELECT,
			[
				/* KeyCode.SPACE, */
				KeyCode.ENTER, 
				CROSS_BUTTON
			]
		)
		.add(NAV_KEYS.BACK, ACTION_TYPE.NAV, NAV_ACTION.BACK,
			[
				KeyCode.ESCAPE, 
				CIRCLE_BUTTON
			]
		)
		.add(NAV_KEYS.PAUSE, ACTION_TYPE.NAV, NAV_ACTION.PAUSE,
			[
				KeyCode.P, 
				PAD_OPTIONS
			]
		);

	// const walkLeft = new Set();
	// const walkRight = new Set();
	// const jump = new Set();
	// const dash = new Set();
	// const block = new Set();
	// const crouch = new Set();
	// const kick = new Set();
	// const punch = new Set();

	// const navLeft = new Set([KeyCode.LEFT, KeyCode.A, LEFT_STICK_LEFT, RIGHT_STICK_LEFT, L1_BUTTON, L2_BUTTON, DPAD_LEFT]);
	// const navRight = new Set([KeyCode.RIGHT, KeyCode.D, LEFT_STICK_RIGHT, RIGHT_STICK_RIGHT, R1_BUTTON, R2_BUTTON, DPAD_RIGHT]);
	// const navUp = new Set([KeyCode.UP, KeyCode.W, LEFT_STICK_UP, RIGHT_STICK_UP, DPAD_UP]);
	// const navDown = new Set([KeyCode.DOWN, KeyCode.S, LEFT_STICK_DOWN, RIGHT_STICK_DOWN, DPAD_DOWN]);
	// const navSelect = new Set([/*KeyCode.SPACE, */KeyCode.ENTER, CROSS_BUTTON]);
	// const navBack = new Set([KeyCode.ESCAPE, CIRCLE_BUTTON]);
	// const navPause = new Set([KeyCode.P, PAD_OPTIONS]);
	
	/**
	 * 
	 * @param {KeySetManager} keySetManager 
	 */
	const setDefaultMapping = function(keySetManager) {

		keySetManager.get(ACTION_KEYS.WALK_LEFT).addMultiple (
			[
				KeyCode.LEFT,
				KeyCode.A,
				LEFT_STICK_LEFT,
			]
		);

		keySetManager.get(ACTION_KEYS.WALK_RIGHT).addMultiple (
			[
				KeyCode.RIGHT,
				KeyCode.D,
				LEFT_STICK_RIGHT,
			]
		);

		keySetManager.get(ACTION_KEYS.JUMP).addMultiple (
			[
				KeyCode.UP,
				KeyCode.W,
				KeyCode.C,
				LEFT_STICK_UP,
			]
		);

		keySetManager.get(ACTION_KEYS.DASH).addMultiple (
			[
				KeyCode.SPACE,
			]
		);

		keySetManager.get(ACTION_KEYS.BLOCK).addMultiple (
			[
				KeyCode.B,
			]
		);

		keySetManager.get(ACTION_KEYS.CROUCH).addMultiple (
			[
				KeyCode.DOWN,
				KeyCode.S,
				LEFT_STICK_DOWN,
			]
		);

		keySetManager.get(ACTION_KEYS.KICK).addMultiple (
			[
				KeyCode.G,
				KeyCode.X,
				CROSS_BUTTON,
			]
		);

		keySetManager.get(ACTION_KEYS.PUNCH).addMultiple (
			[
				KeyCode.F,
				KeyCode.Z,
				SQUARE_BUTTON,
			]
		);
		// walkLeft.add(KeyCode.LEFT);
		// walkLeft.add(KeyCode.A);
		// walkLeft.add(LEFT_STICK_LEFT);
		// walkRight.add(KeyCode.RIGHT);
		// walkRight.add(KeyCode.D);
		// walkRight.add(LEFT_STICK_RIGHT);
		// jump.add(KeyCode.UP);
		// jump.add(KeyCode.W);
		// jump.add(KeyCode.C);
		// jump.add(LEFT_STICK_UP);
		// dash.add(KeyCode.SPACE);
		// block.add(KeyCode.B);
		// crouch.add(KeyCode.DOWN);
		// crouch.add(KeyCode.S);
		// crouch.add(LEFT_STICK_DOWN);
		// kick.add(KeyCode.G);
		// kick.add(KeyCode.X);
		// kick.add(CROSS_BUTTON);
		// punch.add(KeyCode.F);
		// punch.add(KeyCode.Z);
		// punch.add(SQUARE_BUTTON);
	};

	/**
	 * Gets and loads  the current input mapping from local storage. 
	 * Only ACTION_TYPE.ACTION KeySets implemented in localStorageKeys.
	 * @param {KeySetManager} keySetManager 
	 */
	const getCurrentMapping = function(keySetManager) {
		if (!(keySetManager instanceof KeySetManager)) {
			console.log('Invalid parameter:', keySetManager);
			throw new Error('The KeySetManager passed into getCurrentMapping ' +
				'is not a valid instance of KeySetManager!');
		}
		keySetManager.forEach((keySet) => {
			if (keySet.type !== ACTION_TYPE.ACTION) return;

			const key = getLocalStorageKeyFromActionKey(keySet.key);
			const arr = localStorageHelper.getObject(key);
			if (key && arr && Array.isArray(arr)) {
				keySet.deleteAll();
				keySet.addMultiple(arr);
			} else {
				console.log('Error during getCurrentMapping! Could not set the keySet: "' + keySet.key + '" for the following reasons...');
				if (!key) {
					console.log('- Local storage key could not be retrieved.');
				}
				if (!arr) {
					console.log('- LocalStorageHelper could not find a value with key "' + key + '"');
				}
				if (!Array.isArray(arr)) {
					console.log('- Value stored in LocalStorageHelper at the key "' + key + '" was unexpectedly not the correct type: "array", rather it was "' + typeof arr + '"');
				}	
			}
		});
		
		// const walkLeftArray = localStorageHelper.getObject(localStorageKey.WalkLeftKeys);
		// walkLeftArray.forEach(item => walkLeft.add(item));
		
		// const walkRightArray = localStorageHelper.getObject(localStorageKey.WalkRightKeys);
		// walkRightArray.forEach(item => walkRight.add(item));
		
		// const jumpArray = localStorageHelper.getObject(localStorageKey.JumpKeys);
		// jumpArray.forEach(item => jump.add(item));
		
		// const dashArray = localStorageHelper.getObject(localStorageKey.DashKeys);
		// dashArray.forEach(item => dash.add(item));
		
		// const blockArray = localStorageHelper.getObject(localStorageKey.BlockKeys);
		// blockArray.forEach(item => block.add(item));
		
		// const crouchArray = localStorageHelper.getObject(localStorageKey.CrouchKeys);
		// crouchArray.forEach(item => crouch.add(item));
		
		// const kickArray = localStorageHelper.getObject(localStorageKey.KickKeys);
		// kickArray.forEach(item => kick.add(item));
		
		// const punchArray = localStorageHelper.getObject(localStorageKey.PunchKeys);
		// punchArray.forEach(item => punch.add(item));
	};

	/**
	 * Gets the localStorageKey for ACTION_KEYS
	 * @param {string} actionKey Reference key from ACTION_KEYS 'enum'
	 */
	const getLocalStorageKeyFromActionKey = function(actionKey) {
		const keys = localStorageKey;
		switch(actionKey) {
			case ACTION_KEYS.WALK_LEFT:
				return keys.WalkLeftKeys;
			case ACTION_KEYS.WALK_RIGHT:
				return keys.WalkRightKeys;
			case ACTION_KEYS.JUMP:
				return keys.JumpKeys;
			case ACTION_KEYS.DASH:
				return keys.DashKeys;
			case ACTION_KEYS.BLOCK:
				return keys.BlockKeys;
			case ACTION_KEYS.CROUCH:
				return keys.CrouchKeys;
			case ACTION_KEYS.KICK:
				return keys.KickKeys;
			case ACTION_KEYS.PUNCH:
				return keys.PunchKeys;
			default:
				console.trace('Warning! localStorageKey <- ACTION_KEY conversion ' + 
					'not available for: ' + actionKey + '! Returning empty string.');
				return '';
		}
	}

	
	/**
	 * Writes key mapping data currently stored in local storage to the key sets.
	 * @param {KeySetManager} keySetManager 
	 */
	const writeCurrentMappingToStorage = function(keySetManager) {
		if (!(keySetManager instanceof KeySetManager)) {
			console.log('Invalid parameter:', keySetManager);
			throw new Error('The KeySetManager passed into writeCurrentMappingToStorage ' +
				'is not a valid instance of KeySetManager!');
		}

		// Check that data is valid first. Program should stop execution on 
		// Error before writing invalid data.
		keySetManager.forEach((keySet) => {
			if (keySet.type === ACTION_TYPE.ACTION) {
				const key = getLocalStorageKeyFromActionKey(keySet.key);
				const arr = keySet.getAsArray();
				if (!key) {
					throw new Error('Problem during writeCurrentMappingToStorage! ' +
						'Problem fetching localStorageKey. Conversion from ACTION_KEY to ' +
						'localStorageKey most likely unavailable.');
				}
				if (!arr) {
					throw new Error('Problem during writeCurrentMappingToStorage! The KeySet array was either null or undefined!')
				}
			}		
		});

		// Now write the data
		keySetManager.forEach((keySet) => {
			if (keySet.type === ACTION_TYPE.ACTION) {
				const key = getLocalStorageKeyFromActionKey(keySet.key);
				const arr = keySet.getAsArray();
					localStorageHelper.setObject(key, arr);
			}
		});

		// localStorageHelper.setObject(localStorageKey.WalkLeftKeys, Array.from(walkLeft));
		// localStorageHelper.setObject(localStorageKey.WalkRightKeys, Array.from(walkRight));
		// localStorageHelper.setObject(localStorageKey.JumpKeys, Array.from(jump));
		// localStorageHelper.setObject(localStorageKey.DashKeys, Array.from(dash));
		// localStorageHelper.setObject(localStorageKey.BlockKeys, Array.from(block));
		// localStorageHelper.setObject(localStorageKey.CrouchKeys, Array.from(crouch));
		// localStorageHelper.setObject(localStorageKey.KickKeys, Array.from(kick));
		// localStorageHelper.setObject(localStorageKey.PunchKeys, Array.from(punch));
	};

	/**
	 * Sets initial input mapping
	 * @param {KeySetManager} keySetManager 
	 */
	const setInitialMapping = function(keySetManager) {
		if (!(keySetManager instanceof KeySetManager)) {
			console.log('Invalid parameter:', keySetManager);
			throw new Error('The KeySetManager passed into writeCurrentMappingToStorage is not a valid instance of KeySetManager!');
		}
		const mappingHasBeenStored = (localStorageHelper.getObject(localStorageKey.WalkLeftKeys) != undefined);
		if(mappingHasBeenStored) {
			getCurrentMapping(keySetManager);
		} else {
			setDefaultMapping(keySetManager);
			writeCurrentMappingToStorage(keySetManager);
		}
	};
	setInitialMapping(keySets);

	// const ACTION_SET = [walkLeft, walkRight, jump, dash, block, crouch, kick, punch];
	// const ACTION_INDEX = {
	// 	walkLeft:0,
	// 	walkRight:1,
	// 	jump:2,
	// 	dash:3,
	// 	block:4,
	// 	crouch:5,
	// 	kick:6,
	// 	punch:7
	// };

	// const NAVIGATION_SET = [navLeft, navRight, navUp, navDown, navSelect, navBack, navPause];
	// const NAVIGATION_INDEX = {
	// 	left:0,
	// 	right:1,
	// 	up:2,
	// 	down:3,
	// 	select:4,
	// 	back:5,
	// 	pause:6
	// };

	/**
	 * Private function to get either NAV_ACTION or ACTION for a passed inputCode
	 * @param {KeySetManager} keySetManager The KeySetManager to get action from
	 * @param {string | number} inputCode Input code. Either a value in KeyCode, MouseButton, or a GamePad-related constant.
	 * @param {*} type The type. A value in ACTION_TYPE. Either ACTION_TYPE.ACTION or ACTION_TYPE.NAV
	 */
	function _getActionForInputCode(keySetManager, inputCode, type) {
		let action = null;
		keySetManager.forEach((keySet) => {
			if (keySet.type === type && !action) {
				if (keySet.has(inputCode)) {
					action = keySet.action;
				}
			}
		});
		return action;
	}

	/**
	 * Gets the corresponding ACTION by passing an input code 
	 * @param key Input code, which is either a value in KeyCode, MouseButton or a GamePad-related constant.
	 */
	this.getAction = function(code) {
		return _getActionForInputCode(keySets, code, ACTION_TYPE.ACTION);

		// if(walkLeft.has(key)) return ACTION.Left;
		// if(walkRight.has(key)) return ACTION.Right;
		// if(jump.has(key)) return ACTION.Jump;
		// if(dash.has(key)) return ACTION.Dash;
		// if(block.has(key)) return ACTION.Block;
		// if(crouch.has(key)) return ACTION.Crouch;
		// if(kick.has(key)) return ACTION.Kick;
		// if(punch.has(key)) return ACTION.Punch;
		// return null;//if the key doesn't map to any actions
	};

		/**
	 * Gets the corresponding NAV_ACTION by passing an input code 
	 * @param key Input code, which is either a value in KeyCode, MouseButton or a GamePad-related constant.
	 */
	this.getNavAction = function(code) {
		return _getActionForInputCode(keySets, code, ACTION_TYPE.NAV);

		// if(navLeft.has(key)) return NAV_ACTION.LEFT;
		// if(navRight.has(key)) return NAV_ACTION.RIGHT;
		// if(navUp.has(key)) return NAV_ACTION.UP;
		// if(navDown.has(key)) return NAV_ACTION.DOWN;
		// if(navSelect.has(key)) return NAV_ACTION.SELECT;
		// if(navBack.has(key)) return NAV_ACTION.BACK;
		// if(navPause.has(key)) return NAV_ACTION.PAUSE;
		// return null;//if the key doesn't map to any navigation actions
	};

	/**
	 * Retrieves an array of input codes, which are either KeyCode, MouseButton or GamePad-related data.
	 * @param {string} actionKey The key by which to retrive the array. It is a value in either ACTION_KEYS or NAV_KEYS
	 */
	this.getInputCodes = function(actionKey) {
		const keySet = keySets.get(actionKey);
		if (keySet) {
			return keySet.getAsArray();
		}
		console.trace('Warning! There is no KeySet with the ACTION_KEYS or NAV_KEYS value: ' + 
			actionKey + ' stored on the KeySetManager! Returning an emtpy array');
		return [];

		// switch(alias) {
		// case ACTION_KEYS.WALK_LEFT:
		// 	return Array.from(walkLeft);
		// case ACTION_KEYS.WALK_RIGHT:
		// 	return Array.from(walkRight);
		// case ACTION_KEYS.JUMP:
		// 	return Array.from(jump);
		// case ACTION_KEYS.DASH:
		// 	return Array.from(dash);
		// case ACTION_KEYS.BLOCK:
		// 	return Array.from(block);
		// case ACTION_KEYS.CROUCH:
		// 	return Array.from(crouch);
		// case ACTION_KEYS.KICK:
		// 	return Array.from(kick);
		// case ACTION_KEYS.PUNCH:
		// 	return Array.from(punch);
		// }
	};

	/**
	 * Adds an input code to a KeySet in the KeySetManager
	 * @param inputCodeToAdd The input code, which is either a value in KeyCode, MouseButton or GamePad-related constants.
	 * @param actionToAddItTo The action key, which is either an ACTION_KEYS or NAV_KEYS value.
	 */
	this.addKeyToAction = function(inputCodeToAdd, actionToAddItTo) {
		const keySetManager = keySets;
		const keySet = keySetManager.get(actionToAddItTo);
		if (keySet) {
			keySet.add(inputCodeToAdd);
			writeCurrentMappingToStorage(keySetManager);
		} else {
			console.trace('Warning! Tried to add key to a key set, but there is ' +
				'no KeySet with the key:', actionToAddItTo + ', stored in this manager.');
		}
		
		// switch(actionToAddItTo) {
		// case ACTION_KEYS.WALK_LEFT:
		// 	addWalkLeftKey(keyToAdd);
		// 	break;
		// case ACTION_KEYS.WALK_RIGHT:
		// 	addWalkRightKey(keyToAdd);
		// 	break;
		// case ACTION_KEYS.JUMP:
		// 	addJumpKey(keyToAdd);
		// 	break;
		// case ACTION_KEYS.DASH:
		// 	addDashKey(keyToAdd);
		// 	break;
		// case ACTION_KEYS.BLOCK:
		// 	addBlockKey(keyToAdd);
		// 	break;
		// case ACTION_KEYS.CROUCH:
		// 	addCrouchKey(keyToAdd);
		// 	break;
		// case ACTION_KEYS.KICK:
		// 	addKickKey(keyToAdd);
		// 	break;
		// case ACTION_KEYS.PUNCH:
		// 	addPunchKey(keyToAdd);
		// 	break;
		// }
	};

	// const addWalkLeftKey = function(keySet, key) {
	// 	keySet.add(key);
	// 	for(let action of ACTION_SET) {
	// 		if(action === keySet) continue;

	// 		removeKey(key);
	// 	}

	// 	writeCurrentMappingToStorage();
	// }
	// const addWalkLeftKey = function(keyToAdd) {
	// 	walkLeft.add(keyToAdd);

	// 	for(let anAction of ACTION_SET) {
	// 		if(anAction === walkLeft) continue;

	// 		removeWalkLeftKey(keyToAdd);
	// 	}

	// 	writeCurrentMappingToStorage();
	// };

	// const addWalkRightKey = function(keyToAdd) {
	// 	walkRight.add(keyToAdd);

	// 	for(let anAction of ACTION_SET) {
	// 		if(anAction === walkRight) continue;

	// 		removeWalkRightKey(keyToAdd);
	// 	}

	// 	writeCurrentMappingToStorage();
	// };

	// const addJumpKey = function(keyToAdd) {
	// 	jump.add(keyToAdd);

	// 	for(let anAction of ACTION_SET) {
	// 		if(anAction === jump) continue;

	// 		removeJumpKey(keyToAdd);
	// 	}

	// 	writeCurrentMappingToStorage();
	// };

	// const addDashKey = function(keyToAdd) {
	// 	dash.add(keyToAdd);

	// 	for(let anAction of ACTION_SET) {
	// 		if(anAction === dash) continue;

	// 		removeDashKey(keyToAdd);
	// 	}

	// 	writeCurrentMappingToStorage();
	// };

	// const addBlockKey = function(keyToAdd) {
	// 	block.add(keyToAdd);

	// 	for(let anAction of ACTION_SET) {
	// 		if(anAction === block) continue;

	// 		removeBlockKey(keyToAdd);
	// 	}

	// 	writeCurrentMappingToStorage();
	// };

	// const addCrouchKey = function(keyToAdd) {
	// 	crouch.add(keyToAdd);

	// 	for(let anAction of ACTION_SET) {
	// 		if(anAction === crouch) continue;

	// 		removeCrouchKey(keyToAdd);
	// 	}

	// 	writeCurrentMappingToStorage();
	// };

	// const addKickKey = function(keyToAdd) {
	// 	kick.add(keyToAdd);

	// 	for(let anAction of ACTION_SET) {
	// 		if(anAction === kick) continue;

	// 		removeKickKey(keyToAdd);
	// 	}

	// 	writeCurrentMappingToStorage();
	// };

	// const addPunchKey = function(keyToAdd) {
	// 	punch.add(keyToAdd);

	// 	for(let anAction of ACTION_SET) {
	// 		if(anAction === punch) continue;

	// 		removePunchKey(keyToAdd);
	// 	}

	// writeCurrentMappingToStorage();
	// };

	/**
	 * Removes an input code to a KeySet in the KeySetManager
	 * @param inputCodeToRemove The input code, which is either a value in KeyCode, MouseButton or GamePad-related constants.
	 * @param actionToRemoveFrom The action key, which is either an ACTION_KEYS or NAV_KEYS value.
	 */
	this.removeKeyFromAction = function(inputCodeToRemove, actionToRemoveFrom) {
		const keySetManager = keySets;
		const keySet = keySetManager.get(actionToRemoveFrom);
		if (keySet) {
			keySet.delete(inputCodeToRemove);
			writeCurrentMappingToStorage(keySetManager);
		} else {
			console.trace('Warning! Tried to add key to a key set, but there is ' +
				'no KeySet with the key:', actionToAddItTo + ', stored in this manager.');
		}
		// switch(actionToRemoveFrom) {
		// case KEYSET_ALIAS.WALK_LEFT:
		// 	removeWalkLeftKey(keyToRemove);
		// 	break;
		// case KEYSET_ALIAS.WALK_RIGHT:
		// 	removeWalkRightKey(keyToRemove);
		// 	break;
		// case KEYSET_ALIAS.JUMP:
		// 	removeJumpKey(keyToRemove);
		// 	break;
		// case KEYSET_ALIAS.DASH:
		// 	removeDashKey(keyToRemove);
		// 	break;
		// case KEYSET_ALIAS.BLOCK:
		// 	removeBlockKey(keyToRemove);
		// 	break;
		// case KEYSET_ALIAS.CROUCH:
		// 	removeCrouchKey(keyToRemove);
		// 	break;
		// case KEYSET_ALIAS.KICK:
		// 	removeKickKey(keyToRemove);
		// 	break;
		// case KEYSET_ALIAS.PUNCH:
		// 	removePunchKey(keyToRemove);
		// 	break;
		// }
	};

	// const removeWalkLeftKey = function(keyToRemove) {
	// 	ACTION_SET[ACTION_INDEX.walkLeft].delete(keyToRemove);
	// };

	// const removeWalkRightKey = function(keyToRemove) {
	// 	ACTION_SET[ACTION_INDEX.walkRight].delete(keyToRemove);
	// };
	
	// const removeJumpKey = function(keyToRemove) {
	// 	ACTION_SET[ACTION_INDEX.jump].delete(keyToRemove);
	// };
	
	// const removeDashKey = function(keyToRemove) {
	// 	ACTION_SET[ACTION_INDEX.dash].delete(keyToRemove);
	// };
	
	// const removeBlockKey = function(keyToRemove) {
	// 	ACTION_SET[ACTION_INDEX.block].delete(keyToRemove);
	// };
	
	// const removeCrouchKey = function(keyToRemove) {
	// 	ACTION_SET[ACTION_INDEX.crouch].delete(keyToRemove);
	// };
	
	// const removeKickKey = function(keyToRemove) {
	// 	ACTION_SET[ACTION_INDEX.kick].delete(keyToRemove);
	// };
	
	// const removePunchKey = function(keyToRemove) {
	// 	ACTION_SET[ACTION_INDEX.punch].delete(keyToRemove);
	// };
}