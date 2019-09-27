/**
 * Controls management of KeySets, which define keys/buttons/mouse interaction for 
 * ACTION or NAV_ACTION. Also Manages reading and writing mapping for actions with local storage.
 * Interaction with the KeyMapper is usually for interpreting input, 
 * to find which ACTION belongs to a key, or getting keys for an action.
 * This can probably be refactored to the InputProcessor at some point so the KeyMapper can do its work behind the scenes.
 * Dependencies: KeySet, KeySetManager, ACTION_KEYS, ACTION_TYPE, ACTION, NAV_KEYS, NAV_ACTION
 */
function KeyMapper() {
	// Create the KeySetManager, which we will add KeySets of keyboard/mouse/gamepad controls to
	const keySets = new KeySetManager();

	// ====== Create ACTION KeySets which are added to the KeySetManager ======
	// The parameters for create:
	// create( refKey, ACTION_TYPE, ACTIONorNAV_ACTION, [inputCodes]);

	// Notes: In the previous code, only NAV_KEYs were initialized here.
	// The ACTION_KEYs are initialized here, but keys are added in the function 'setDefaultMapping' below.

	keySets
		.create(ACTION_KEYS.WALK_LEFT, ACTION_TYPE.ACTION, ACTION.Left)
		.create(ACTION_KEYS.WALK_RIGHT, ACTION_TYPE.ACTION, ACTION.Right)
		.create(ACTION_KEYS.JUMP, ACTION_TYPE.ACTION, ACTION.Jump)
		.create(ACTION_KEYS.DASH, ACTION_TYPE.ACTION, ACTION.Dash)
		.create(ACTION_KEYS.BLOCK, ACTION_TYPE.ACTION, ACTION.Block)
		.create(ACTION_KEYS.CROUCH, ACTION_TYPE.ACTION, ACTION.Crouch)
		.create(ACTION_KEYS.KICK, ACTION_TYPE.ACTION, ACTION.Kick)
		.create(ACTION_KEYS.PUNCH, ACTION_TYPE.ACTION, ACTION.Punch);

	// ====== Add NAV KeySets to the KeySetManager ======
	keySets
		.create(NAV_KEYS.LEFT, ACTION_TYPE.NAV, NAV_ACTION.LEFT,
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
		.create(NAV_KEYS.RIGHT, ACTION_TYPE.NAV, NAV_ACTION.RIGHT,
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
		.create(NAV_KEYS.UP, ACTION_TYPE.NAV, NAV_ACTION.UP,
			[
				KeyCode.UP, 
				KeyCode.W, 
				LEFT_STICK_UP, 
				RIGHT_STICK_UP, 
				DPAD_UP
			]
		)
		.create(NAV_KEYS.DOWN, ACTION_TYPE.NAV, NAV_ACTION.DOWN,
			[
				KeyCode.DOWN, 
				KeyCode.S, 
				LEFT_STICK_DOWN, 
				RIGHT_STICK_DOWN, 
				DPAD_DOWN
			]
		)
		.create(NAV_KEYS.SELECT, ACTION_TYPE.NAV, NAV_ACTION.SELECT,
			[
				/* KeyCode.SPACE, */
				KeyCode.ENTER, 
				CROSS_BUTTON
			]
		)
		.create(NAV_KEYS.BACK, ACTION_TYPE.NAV, NAV_ACTION.BACK,
			[
				KeyCode.ESCAPE, 
				CIRCLE_BUTTON
			]
		)
		.create(NAV_KEYS.PAUSE, ACTION_TYPE.NAV, NAV_ACTION.PAUSE,
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
	 * Sets default mapping. Assumes that the KeySetManager has already initialized KeySets for all ACTION_KEYS.
	 * @param {KeySetManager} keySetManager 
	 */
	const setDefaultMapping = function(keySetManager) {
		_isKeySetManagerValid(keySetManager);

		// Gets the KeySet and adds keys/buttons/gamepad controls to it
		keySetManager.get(ACTION_KEYS.WALK_LEFT).add (
			[
				KeyCode.LEFT,
				KeyCode.A,
				LEFT_STICK_LEFT,
			]
		);

		keySetManager.get(ACTION_KEYS.WALK_RIGHT).add (
			[
				KeyCode.RIGHT,
				KeyCode.D,
				LEFT_STICK_RIGHT,
			]
		);

		keySetManager.get(ACTION_KEYS.JUMP).add (
			[
				KeyCode.UP,
				KeyCode.W,
				KeyCode.C,
				LEFT_STICK_UP,
			]
		);

		keySetManager.get(ACTION_KEYS.DASH).add (
			[
				KeyCode.SPACE,
			]
		);

		keySetManager.get(ACTION_KEYS.BLOCK).add (
			[
				KeyCode.B,
			]
		);

		keySetManager.get(ACTION_KEYS.CROUCH).add (
			[
				KeyCode.DOWN,
				KeyCode.S,
				LEFT_STICK_DOWN,
			]
		);

		keySetManager.get(ACTION_KEYS.KICK).add (
			[
				KeyCode.G,
				KeyCode.X,
				CROSS_BUTTON,
			]
		);

		keySetManager.get(ACTION_KEYS.PUNCH).add (
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
	 * Checks if a KeySetManager is really a KeySetManager, and will throw an Error if not.
	 * @param {KeySetManager} keySetManager 
	 */
	const _isKeySetManagerValid = function(keySetManager) {
		if (!(keySetManager instanceof KeySetManager)) {
			console.log("Invalid parameter:", keySetManager);
			throw new Error("The KeySetManager passed into getCurrentMapping " +
				"is not a valid instance of KeySetManager!");
		}
	};
	/**
	 * Gets and loads  the current input mapping from local storage. 
	 * Only ACTION_TYPE.ACTION KeySets implemented in localStorageKeys.
	 * @param {KeySetManager} keySetManager 
	 */
	const getCurrentMapping = function(keySetManager) {
		_isKeySetManagerValid(keySetManager);

		keySetManager.forEach((keySet) => {
			if (keySet.type !== ACTION_TYPE.ACTION) return; // filter out ACTION_TYPE.NAV

			const key = getLocalStorageKeyFromActionKey(keySet.key);
			const arr = localStorageHelper.getObject(key);
			if (key && arr && Array.isArray(arr)) {
				keySet.deleteAll();
				keySet.add(arr);
			} else {
				console.log("Error during getCurrentMapping! Could not set the keySet: \"" + keySet.key + "\" for the following reasons...");
				if (!key) {
					console.log("- Local storage key could not be retrieved.");
				}
				if (!arr) {
					console.log("- LocalStorageHelper could not find a value with key \"" + key + "\"");
				}
				if (!Array.isArray(arr)) {
					console.log("- Value stored in LocalStorageHelper at the key \"" + key + "\" was unexpectedly not the correct type: \"array\", rather it was \"" + typeof arr + "\"");
				}	
			}
		});

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
			console.trace("Warning! localStorageKey <- ACTION_KEY conversion " + 
					"not available for: " + actionKey + "! Returning empty string.");
			return "";
		}
	};

	/**
	 * Writes key mapping data currently stored in local storage to the key sets.
	 * @param {KeySetManager} keySetManager 
	 */
	const writeCurrentMappingToStorage = function(keySetManager) {
		_isKeySetManagerValid(keySetManager);

		// Check that data is valid first. Program should stop execution on 
		// Error before writing invalid data.
		keySetManager.forEach((keySet) => {
			if (keySet.type === ACTION_TYPE.ACTION) {
				const key = getLocalStorageKeyFromActionKey(keySet.key);
				const arr = keySet.getAsArray();
				if (!key) {
					throw new Error("Problem during writeCurrentMappingToStorage! " +
						"Problem fetching localStorageKey. Conversion from ACTION_KEY to " +
						"localStorageKey most likely unavailable.");
				}
				if (!arr) {
					throw new Error("Problem during writeCurrentMappingToStorage! The KeySet array was either null or undefined!")
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
	};

	/**
	 * Sets initial input mapping
	 * @param {KeySetManager} keySetManager 
	 */
	const setInitialMapping = function(keySetManager) {
		if (!(keySetManager instanceof KeySetManager)) {
			console.log("Invalid parameter:", keySetManager);
			throw new Error("The KeySetManager passed into writeCurrentMappingToStorage is not a valid instance of KeySetManager!");
		}
		const mappingHasBeenStored = (localStorageHelper.getObject(localStorageKey.WalkLeftKeys) != undefined);
		if(mappingHasBeenStored) {
			getCurrentMapping(keySetManager);
		} else {
			setDefaultMapping(keySetManager);
			writeCurrentMappingToStorage(keySetManager);
		}
	};
	// Call script on instantiation of KeyMapper
	setInitialMapping(keySets);

	/**
	 * Private function to get either NAV_ACTION or ACTION for a passed inputCode
	 * @param {KeySetManager} keySetManager The KeySetManager to get action from
	 * @param {string | number} inputCode Input code. Either a value in KeyCode, MouseButton, or a GamePad-related constant.
	 * @param {string} type The type. A value in ACTION_TYPE. Either ACTION_TYPE.ACTION or ACTION_TYPE.NAV
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
		console.trace("Warning! There is no KeySet with the ACTION_KEYS or NAV_KEYS value: " + 
			actionKey + " stored on the KeySetManager! Returning an emtpy array");
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
			console.trace("Warning! Tried to add key to a key set, but there is " +
				"no KeySet with the key:", actionToAddItTo + ", stored in this manager.");
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
			console.trace("Warning! Tried to add key to a key set, but there is " +
				"no KeySet with the key:", actionToAddItTo + ", stored in this manager.");
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