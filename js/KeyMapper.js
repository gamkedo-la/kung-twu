//Action Alias
const ACTION_ALIAS = {
	WALK_LEFT:"walkLeft",
	WALK_RIGHT:"walkRight",
	JUMP:"jump",
	DASH:"dash",
	BLOCK:"block",
	CROUCH:"crouch",
	KICK:"kick",
	PUNCH:"punch"
};

/*switch() {
	case ACTION_ALIAS.WALK_LEFT:
	case ACTION_ALIAS.WALK_RIGHT:
	case ACTION_ALIAS.JUMP:
	case ACTION_ALIAS.DASH:
	case ACTION_ALIAS.BLOCK:
	case ACTION_ALIAS.CROUCH:
	case ACTION_ALIAS.KICK:
	case ACTION_ALIAS.PUNCH:
}*/

//Key Mapper
function KeyMapper() {
	const walkLeft = new Set();
	const walkRight = new Set();
	const jump = new Set();
	const dash = new Set();
	const block = new Set();
	const crouch = new Set();
	const kick = new Set();
	const punch = new Set();

	const setDefaultMapping = function() {
		walkLeft.add(KEY_LEFT);
		walkLeft.add(KEY_A);
		walkLeft.add(LEFT_STICK_LEFT);
		walkRight.add(KEY_RIGHT);
		walkRight.add(KEY_D);
		walkRight.add(LEFT_STICK_RIGHT);
		jump.add(KEY_UP);
		jump.add(KEY_W);
		jump.add(KEY_C);
		jump.add(LEFT_STICK_UP);
		dash.add(KEY_SPACE);
		block.add(KEY_B);
		crouch.add(KEY_DOWN);
		crouch.add(KEY_S);
		crouch.add(LEFT_STICK_DOWN);
		kick.add(KEY_G);
		kick.add(KEY_X);
		kick.add(CROSS_BUTTON);
		punch.add(KEY_F);
		punch.add(KEY_Z);
		punch.add(SQUARE_BUTTON);
	};

	const getCurrentMapping = function() {
		const walkLeftArray = localStorageHelper.getObject(localStorageKey.WalkLeftKeys);
		walkLeftArray.forEach(item => walkLeft.add(item));
		
		const walkRightArray = localStorageHelper.getObject(localStorageKey.WalkRightKeys);
		walkRightArray.forEach(item => walkRight.add(item));
		
		const jumpArray = localStorageHelper.getObject(localStorageKey.JumpKeys);
		jumpArray.forEach(item => jump.add(item));
		
		const dashArray = localStorageHelper.getObject(localStorageKey.DashKeys);
		dashArray.forEach(item => dash.add(item));
		
		const blockArray = localStorageHelper.getObject(localStorageKey.BlockKeys);
		blockArray.forEach(item => block.add(item));
		
		const crouchArray = localStorageHelper.getObject(localStorageKey.CrouchKeys);
		crouchArray.forEach(item => crouch.add(item));
		
		const kickArray = localStorageHelper.getObject(localStorageKey.KickKeys);
		kickArray.forEach(item => kick.add(item));
		
		const punchArray = localStorageHelper.getObject(localStorageKey.PunchKeys);
		punchArray.forEach(item => punch.add(item));
	};

	const writeCurrentMappingToStorage = function() {
		localStorageHelper.setObject(localStorageKey.WalkLeftKeys, Array.from(walkLeft));
		localStorageHelper.setObject(localStorageKey.WalkRightKeys, Array.from(walkRight));
		localStorageHelper.setObject(localStorageKey.JumpKeys, Array.from(jump));
		localStorageHelper.setObject(localStorageKey.DashKeys, Array.from(dash));
		localStorageHelper.setObject(localStorageKey.BlockKeys, Array.from(block));
		localStorageHelper.setObject(localStorageKey.CrouchKeys, Array.from(crouch));
		localStorageHelper.setObject(localStorageKey.KickKeys, Array.from(kick));
		localStorageHelper.setObject(localStorageKey.PunchKeys, Array.from(punch));
	};

	const setInitialMapping = function() {
		const mappingHasBeenStored = (localStorageHelper.getObject(localStorageKey.WalkLeftKeys) != undefined);
		if(mappingHasBeenStored) {
			getCurrentMapping();
		} else {
			setDefaultMapping();
			writeCurrentMappingToStorage();
		}
	};
	setInitialMapping();

	const ACTION_SET = [walkLeft, walkRight, jump, dash, block, crouch, kick, punch];
	const ACTION_INDEX = {
		walkLeft:0,
		walkRight:1,
		jump:2,
		dash:3,
		block:4,
		crouch:5,
		kick:6,
		punch:7
	};

	this.getActionForKey = function(key) {
		if(walkLeft.has(key)) return ACTION.Left;
		if(walkRight.has(key)) return ACTION.Right;
		if(jump.has(key)) return ACTION.Jump;
		if(dash.has(key)) return ACTION.Dash;
		if(block.has(key)) return ACTION.Block;
		if(crouch.has(key)) return ACTION.Crouch;
		if(kick.has(key)) return ACTION.Kick;
		if(punch.has(key)) return ACTION.Punch;
		return null;//if the key doesn't map to any actions
	};

	this.getKeysForAlias = function(alias) {
		switch(alias) {
		case ACTION_ALIAS.WALK_LEFT:
			return Array.from(walkLeft);
		case ACTION_ALIAS.WALK_RIGHT:
			return Array.from(walkRight);
		case ACTION_ALIAS.JUMP:
			return Array.from(jump);
		case ACTION_ALIAS.DASH:
			return Array.from(dash);
		case ACTION_ALIAS.BLOCK:
			return Array.from(block);
		case ACTION_ALIAS.CROUCH:
			return Array.from(crouch);
		case ACTION_ALIAS.KICK:
			return Array.from(kick);
		case ACTION_ALIAS.PUNCH:
			return Array.from(punch);
		}
	};

	this.addKeyToAction = function(keyToAdd, actionToAddItTo) {
		switch(actionToAddItTo) {
		case ACTION_ALIAS.WALK_LEFT:
			addWalkLeftKey(keyToAdd);
			break;
		case ACTION_ALIAS.WALK_RIGHT:
			addWalkRightKey(keyToAdd);
			break;
		case ACTION_ALIAS.JUMP:
			addJumpKey(keyToAdd);
			break;
		case ACTION_ALIAS.DASH:
			addDashKey(keyToAdd);
			break;
		case ACTION_ALIAS.BLOCK:
			addBlockKey(keyToAdd);
			break;
		case ACTION_ALIAS.CROUCH:
			addCrouchKey(keyToAdd);
			break;
		case ACTION_ALIAS.KICK:
			addKickKey(keyToAdd);
			break;
		case ACTION_ALIAS.PUNCH:
			addPunchKey(keyToAdd);
			break;
		}
	};

	const addWalkLeftKey = function(keyToAdd) {
		walkLeft.add(keyToAdd);

		for(let i = 0; i < ACTION_SET.length; i++) {
			if(ACTION_SET[i] === walkLeft) continue;

			removeWalkLeftKey(keyToAdd);
		}

		writeCurrentMappingToStorage();
	};

	const addWalkRightKey = function(keyToAdd) {
		walkRight.add(keyToAdd);

		for(let i = 0; i < ACTION_SET.length; i++) {
			if(ACTION_SET[i] === walkRight) continue;

			removeWalkRightKey(keyToAdd);
		}

		writeCurrentMappingToStorage();
	};

	const addJumpKey = function(keyToAdd) {
		jump.add(keyToAdd);

		for(let i = 0; i < ACTION_SET.length; i++) {
			if(ACTION_SET[i] === jump) continue;

			removeJumpKey(keyToAdd);
		}

		writeCurrentMappingToStorage();
	};

	const addDashKey = function(keyToAdd) {
		dash.add(keyToAdd);

		for(let i = 0; i < ACTION_SET.length; i++) {
			if(ACTION_SET[i] === dash) continue;

			removeDashKey(keyToAdd);
		}

		writeCurrentMappingToStorage();
	};

	const addBlockKey = function(keyToAdd) {
		block.add(keyToAdd);

		for(let i = 0; i < ACTION_SET.length; i++) {
			if(ACTION_SET[i] === block) continue;

			removeBlockKey(keyToAdd);
		}

		writeCurrentMappingToStorage();
	};

	const addCrouchKey = function(keyToAdd) {
		crouch.add(keyToAdd);

		for(let i = 0; i < ACTION_SET.length; i++) {
			if(ACTION_SET[i] === crouch) continue;

			removeCrouchKey(keyToAdd);
		}

		writeCurrentMappingToStorage();
	};

	const addKickKey = function(keyToAdd) {
		kick.add(keyToAdd);

		for(let i = 0; i < ACTION_SET.length; i++) {
			if(ACTION_SET[i] === kick) continue;

			removeKickKey(keyToAdd);
		}

		writeCurrentMappingToStorage();
	};

	const addPunchKey = function(keyToAdd) {
		punch.add(keyToAdd);

		for(let i = 0; i < ACTION_SET.length; i++) {
			if(ACTION_SET[i] === punch) continue;

			removePunchKey(keyToAdd);
		}

		writeCurrentMappingToStorage();
	};

	this.removeKeyFromAction = function(keyToRemove, actionToRemoveFrom) {
		switch(actionToRemoveFrom) {
		case ACTION_ALIAS.WALK_LEFT:
			removeWalkLeftKey(keyToRemove);
			break;
		case ACTION_ALIAS.WALK_RIGHT:
			removeWalkRightKey(keyToRemove);
			break;
		case ACTION_ALIAS.JUMP:
			removeJumpKey(keyToRemove);
			break;
		case ACTION_ALIAS.DASH:
			removeDashKey(keyToRemove);
			break;
		case ACTION_ALIAS.BLOCK:
			removeBlockKey(keyToRemove);
			break;
		case ACTION_ALIAS.CROUCH:
			removeCrouchKey(keyToRemove);
			break;
		case ACTION_ALIAS.KICK:
			removeKickKey(keyToRemove);
			break;
		case ACTION_ALIAS.PUNCH:
			removePunchKey(keyToRemove);
			break;
		}

		writeCurrentMappingToStorage();
	};

	const removeWalkLeftKey = function(keyToRemove) {
		ACTION_SET[ACTION_INDEX.walkLeft].delete(keyToRemove);
	};

	const removeWalkRightKey = function(keyToRemove) {
		ACTION_SET[ACTION_INDEX.walkRight].delete(keyToRemove);
	};
	
	const removeJumpKey = function(keyToRemove) {
		ACTION_SET[ACTION_INDEX.jump].delete(keyToRemove);
	};
	
	const removeDashKey = function(keyToRemove) {
		ACTION_SET[ACTION_INDEX.dash].delete(keyToRemove);
	};
	
	const removeBlockKey = function(keyToRemove) {
		ACTION_SET[ACTION_INDEX.block].delete(keyToRemove);
	};
	
	const removeCrouchKey = function(keyToRemove) {
		ACTION_SET[ACTION_INDEX.crouch].delete(keyToRemove);
	};
	
	const removeKickKey = function(keyToRemove) {
		ACTION_SET[ACTION_INDEX.kick].delete(keyToRemove);
	};
	
	const removePunchKey = function(keyToRemove) {
		ACTION_SET[ACTION_INDEX.punch].delete(keyToRemove);
	};
}