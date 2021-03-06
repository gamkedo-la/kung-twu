const WALK_LEFT_STATE = {
	name:"walk left",
	canEnterFromStateWithActionAndBelt:function(belt, action, currentState) {
		if(action === ACTION.Left) {
			if((currentState === STATE.Idle) || (currentState === STATE.WalkRight)) {
				return true;
			}
		}

		return false;
	},

	nextStateForActionWithBelt:function(belt, action) {
		if(action === ACTION.Right) {
			return STATE.WalkRight;	
		} else if(action === ACTION.Hit) {
			return STATE.KnockBack;
		} else if(action === ACTION.Jump) {
			return STATE.Jump;
		} else if(action === ACTION.Crouch) {
			return STATE.Crouch;
		} else if((action === ACTION.Dash) && (belt >= BELT.Yellow)) {
			return STATE.Dash;
		} else if(action === ACTION.Punch) {
			return STATE.Punch;
		} else if(action === ACTION.Kick) {
			return STATE.Kick;
		} else if(action === ACTION.Block) {
			return STATE.Block;
		} else if(action === ACTION.Release) {
			return STATE.Idle;
		} else {
			return STATE.WalkLeft;
		}
	}
};

const WALK_RIGHT_STATE = {
	name:"walk right",
	canEnterFromStateWithActionAndBelt:function(belt, action, currentState) {
		if(action === ACTION.Right) {
			if((currentState === STATE.Idle) || (currentState === STATE.WalkLeft)) {
				return true;
			}
		}

		return false;
	},

	nextStateForActionWithBelt:function(belt, action) {
		if(action === ACTION.Left) {
			return STATE.WalkLeft;
		} else if(action === ACTION.Hit) {
			return STATE.KnockBack;
		} else if(action === ACTION.Jump) {
			return STATE.Jump;
		} else if(action === ACTION.Crouch) {
			return STATE.Crouch;
		} else if((action === ACTION.Dash) && (belt >= BELT.Yellow)) {
			return STATE.Dash;
		} else if(action === ACTION.Punch) {
			return STATE.Punch;
		} else if(action === ACTION.Kick) {
			return STATE.Kick;
		} else if(action === ACTION.Block) {
			return STATE.Block;
		} else if(action === ACTION.Release) {
			return STATE.Idle;
		} else {
			return STATE.WalkRight;
		}
	}
};

const JUMP_STATE = {
	name:"jump",
	canEnterFromStateWithActionAndBelt:function(belt, action, currentState) {
		if(action === ACTION.Jump) {
			if((currentState === STATE.WalkRight) || 
			(currentState === STATE.WalkLeft) || 
			(currentState === STATE.Idle)) {
				return true;
			}
		}

		return false;
	},

	nextStateForActionWithBelt:function(belt, action) {
		if((belt >= BELT.Brown) && (action === ACTION.Kick)) {
			return STATE.J_Kick;
		} else if(action === ACTION.Land) {
			return STATE.Idle;
		} else if(action === ACTION.Hit) {
			return STATE.KnockBack;
		} else {
			return STATE.Jump;
		}
	}
};

const CROUCH_STATE = {
	name:"crouch",
	canEnterFromStateWithActionAndBelt:function(belt, action, currentState) {
		if((currentState === STATE.Idle) && (action === ACTION.Crouch)) {
			return true;
		}

		return false;
	},

	nextStateForActionWithBelt:function(belt, action) {
		if((belt >= BELT.Tan) && (action === ACTION.Kick)) {
			return STATE.Sweep;
		} else if(action === ACTION.Hit) {
			return STATE.KnockBack;
		} else if(action === ACTION.Release) {
			return STATE.Idle;
		} else {
			return STATE.Crouch;
		}
	}
};

const DASH_STATE = {
	name:"dash",
	canEnterFromStateWithActionAndBelt:function(belt, action, currentState) {
		if(belt >= BELT.Yellow) {
			if((currentState === STATE.WalkRight) || 
			(currentState === STATE.WalkLeft) || 
			(currentState === STATE.Idle)) {
				return true;
			}
		}

		return false;
	},

	nextStateForActionWithBelt:function(belt, action) {
		if((belt >= BELT.Red) && (action === ACTION.Kick)) {
			return STATE.H_Kick;
		} else if(action === ACTION.End) {
			return STATE.Idle;
		} else if(action === ACTION.Hit) {
			return STATE.KnockBack;
		} else {
			return STATE.Dash;
		}
	}
};

const IDLE_STATE = {
	name:"idle",
	canEnterFromStateWithActionAndBelt:function(belt, action, currentState) {
		if(currentState === STATE.Sweep) {
			return false;
		} else if(action === ACTION.End) {
			if((currentState === STATE.Dash) || 
			(currentState === STATE.Punch) || 
			(currentState === STATE.Kick) || 
			(currentState === STATE.H_Kick) ||
			(currentState === STATE.KnockBack)) {
				return true;
			}
		} else if(action === ACTION.Land) {
			if((currentState === STATE.Jump) || 
			(currentState === STATE.J_Kick)) {
				return true;
			}
		} else if(action === ACTION.Release) {
			if((currentState === STATE.WalkRight) ||
			(currentState === STATE.WalkLeft) || 
			(currentState === STATE.Crouch) || 
			(currentState === STATE.Block)) {
				return true;
			}
		} 

		return false;
	},

	nextStateForActionWithBelt:function(belt, action) {
		if(action === ACTION.Hit) {
			return STATE.KnockBack;
		} else if(action === ACTION.Right) {
			return STATE.WalkRight;
		} else if(action === ACTION.Left) {
			return STATE.WalkLeft;
		} else if(action === ACTION.Jump) {
			return STATE.Jump;
		} else if(action === ACTION.Crouch) {
			return STATE.Crouch;
		} else if((action === ACTION.Dash) && (belt >= BELT.Yellow)) {
			return STATE.Dash;
		} else if(action === ACTION.Punch) {
			return STATE.Punch;
		} else if(action === ACTION.Kick) {
			return STATE.Kick;
		} else if(action === ACTION.Block) {
			return STATE.Block;
		} else if(action === ACTION.Release) {
			return STATE.Idle;
		} else {
			return STATE.Idle;
		}
	}
};

const J_KICK_STATE = {
	name:"jump kick",
	canEnterFromStateWithActionAndBelt:function(belt, action, currentState) {
		if(belt >= BELT.Brown) {
			if((currentState === STATE.Jump) && (action === ACTION.Kick)) {
				return true;
			}	
		}

		return false;
	},

	nextStateForActionWithBelt:function(belt, action) {
		if(action === ACTION.Hit) {
			return STATE.KnockBack;
		} else if(action === ACTION.Land) {
			return STATE.Idle;
		} else {
			return STATE.J_Kick;
		}
	}
};

const SWEEP_STATE = {
	name:"sweep",
	canEnterFromStateWithActionAndBelt:function(belt, action, currentState) {
		if(belt >= BELT.Tan) {
			if((currentState === STATE.Crouch) && (action === ACTION.Kick)) {
				return true;
			}
		}

		return false;
	},

	nextStateForActionWithBelt:function(belt, action) {
		if(action === ACTION.Hit) {
			return STATE.KnockBack;
		} else if(action === ACTION.End) {
			return STATE.Crouch;
		} else {
			return STATE.Sweep;
		}
	}
};

const H_KICK_STATE = {
	name:"helicopter kick",
	canEnterFromStateWithActionAndBelt:function(belt, action, currentState) {
		if(belt >= BELT.Red) {
			if((currentState === STATE.Dash) && (action === ACTION.Kick)) {
				return true;
			}
		}

		return false;
	},

	nextStateForActionWithBelt:function(belt, action) {
		if((action === ACTION.Land) || (action === ACTION.End)) {
			return STATE.Idle;
		} else {
			return STATE.H_Kick;
		}
	}
};

const PUNCH_STATE = {
	name:"punch",
	canEnterFromStateWithActionAndBelt:function(belt, action, currentState) {
		if(action === ACTION.Punch) {
			if((currentState === STATE.WalkRight) || 
			(currentState === STATE.WalkLeft) || 
			(currentState === STATE.Idle)) {
				return true;
			}
		}

		return false;
	},

	nextStateForActionWithBelt:function(belt, action) {
		if(action === ACTION.Hit) {
			return STATE.KnockBack;
		} else if(action === ACTION.End) {
			return STATE.Idle;
		} else {
			return STATE.Punch;
		}
	}
};

const KICK_STATE = {
	name:"kick",
	canEnterFromStateWithActionAndBelt:function(belt, action, currentState) {
		if(action === ACTION.Kick) {
			if((currentState === STATE.WalkRight) || 
			(currentState === STATE.WalkLeft) || 
			(currentState === STATE.Idle)) {
				return true;
			}
		}

		return false;
	},

	nextStateForActionWithBelt:function(belt, action) {
		if(action === ACTION.Hit) {
			return STATE.KnockBack;
		} else if(action === ACTION.End) {
			return STATE.Idle;
		} else {
			return STATE.Kick;
		}
	}
};

const BLOCK_STATE = {
	name:"block",
	canEnterFromStateWithActionAndBelt:function(belt, action, currentState) {
		if(action === ACTION.Block) {
			if((currentState === STATE.WalkRight) ||
			(currentState === STATE.WalkLeft) || 
			(currentState === STATE.Idle) || 
			(currentState === STATE.Crouch)) {
				return true;
			}
		}

		return false;
	},

	nextStateForActionWithBelt:function(belt, action) {
		if(action === ACTION.Release) {
			return STATE.Idle;
		} else {
			return STATE.Block;
		}
	}
};

const KNOCK_BACK_STATE = {
	name:"knock back",
	canEnterFromStateWithActionAndBelt:function(belt, action, currentState) {
		if((currentState === STATE.Block) || (currentState === STATE.H_Kick)) {
			return false;
		} else if(action === ACTION.Hit) {
			return true;
		}

		return false;
	},

	nextStateForActionWithBelt:function(belt, action) {
		if(action === ACTION.End) {
			return STATE.Idle;
		} else {
			return STATE.KnockBack;
		}
	}
};

//Character State
function StateManager(theAnimations, beltColor, rivalType, scale = 2) {
	let currentState = IDLE_STATE;
	let isNewState = true;
	let currentAnimations = theAnimations;
	let currentAnimation = currentAnimations.idle;
	let belt = beltColor;

	let landed = false;
	let isOnGround = true;
	let didGetHit = false;
	let isFacingLeft = true;
	let knockBackDidEnd = false;
	let timeSinceAction = 0;

	this.setNewBelt = function(newBelt) {
		belt = newBelt;
		currentAnimations = animationManager.getAnimationsFor(rivalType, belt, scale);
		currentAnimation = currentAnimations.idle;
	};

	this.incrementBelt = function() {
		this.setNewBelt(belt + 1);
	};

	this.getCurrentBelt = function() {
		return belt;
	};

	this.didLand = function() {
		landed = true;
		isOnGround = true;
	};

	this.isFalling = function() {
		landed = false;
		isOnGround = false;
	};

	this.getIsOnGround = function() {
		return (isOnGround === true);
	};

	this.wasHit = function() {
		didGetHit = true;
		isOnGround = false;
	};

	this.getCurrentAnimation = function() {
		if((currentAnimation === null) || (currentAnimation === undefined)) {
			currentAnimation = currentAnimations.idle;
			return currentAnimations.idle;
		}
		return currentAnimation;
	};

	this.getCurrentAnimationFrame = function() {
		return currentAnimation.getCurrentFrame();
	};

	this.getIsFacingLeft = function() {
		return (isFacingLeft == true);
	};

	this.getIsNewState = function() {
		return (isNewState === true);
	};

	this.getCurrentState = function() {
		switch(currentState) {
		case WALK_RIGHT_STATE:
			return STATE.WalkRight;
		case WALK_LEFT_STATE:
			return STATE.WalkLeft;
		case JUMP_STATE:
			return STATE.Jump;
		case CROUCH_STATE:
			return STATE.Crouch;
		case DASH_STATE:
			return STATE.Dash;
		case IDLE_STATE:
			return STATE.Idle;
		case J_KICK_STATE:
			return STATE.J_Kick;
		case SWEEP_STATE:
			return STATE.Sweep;
		case H_KICK_STATE:
			return STATE.H_Kick;
		case PUNCH_STATE:
			return STATE.Punch;
		case KICK_STATE:
			return STATE.Kick;
		case BLOCK_STATE:
			return STATE.Block;
		case KNOCK_BACK_STATE:
			return STATE.KnockBack;
		}
	};

	this.getAIType = function() {
		return rivalType;
	};

	this.quit = function() {
		this.reset();
	};

	this.reset = function() {
		currentState = IDLE_STATE;
		isNewState = true;
		currentAnimation = currentAnimations.idle;
	
		landed = false;
		isOnGround = true;
		didGetHit = false;
		isFacingLeft = true;
		knockBackDidEnd = false;
		timeSinceAction = 0;
	};

	this.update = function(deltaTime, distToPlayer = 0, shouldAttack, variance = 50, shouldJump = false) {
		currentAnimation.update(deltaTime);
		isNewState = false;
		let newState;

		checkAutoStateChanges();

		if(rivalType === AITYPE.Player) {
			updateStateWithUserInput();
		} else {
			updateStateWithAI(deltaTime, distToPlayer, shouldAttack, variance, shouldJump);
		}

		if(didGetHit) {
			didGetHit = false;

			newState = stateTranslator(currentState.nextStateForActionWithBelt(belt, ACTION.Hit));
			setNewState(newState);
		}
	};

	const checkAutoStateChanges = function() {
		let newState;
		if(knockBackDidEnd) {
			knockBackDidEnd = false;
			newState = stateTranslator(currentState.nextStateForActionWithBelt(belt, ACTION.End));
			setNewState(newState);
		}

		if(currentAnimation.isFinished()) {
			newState = stateTranslator(currentState.nextStateForActionWithBelt(belt, ACTION.End));
			setNewState(newState);
		}

		if(landed) {
			landed = false;

			newState = stateTranslator(currentState.nextStateForActionWithBelt(belt, ACTION.Land));
			setNewState(newState);
		}
	};

	const updateStateWithAI = function(deltaTime, distToPlayer, shouldAttack, variance, shouldJump) {
		let action = aiManager.nextAction(belt, rivalType, timeSinceAction, currentState, distToPlayer, shouldAttack, variance, shouldJump);

		let newState;
		if(action === null) {
			newState = currentState;
		} else {
			newState = stateTranslator(currentState.nextStateForActionWithBelt(belt, action));
		}

		if(newState !== currentState) {
			timeSinceAction = 0;

			if(action === ACTION.Left) {
				isFacingLeft = true;
			} else if(action === ACTION.Right) {
				isFacingLeft = false;
			} else if(action === ACTION.Jump) {
				isOnGround = false;	
			} else if(newState === H_KICK_STATE) {
				isOnGround = false;	
			} 
		} else {
			timeSinceAction += deltaTime;
		}

		setNewState(newState);

		if(distToPlayer > 0) {
			isFacingLeft = false;
		} else {
			isFacingLeft = true;
		}
	};

	this.drawAt = function(x = 0, y = 0, red = false) {
		let deltaXForFacing = 0;
		let deltaY = currentAnimation.getHeight() - animationForState(IDLE_STATE).getHeight();
		if(isFacingLeft) {
			deltaXForFacing = (currentAnimations.idle.getWidth() - currentAnimation.getWidth());
		}
		currentAnimation.drawAt(x + deltaXForFacing, y + deltaY, isFacingLeft, red);
	};

	const updateStateWithUserInput = function() {
		const releasedKeys = inputProcessor.getNewlyReleasedKeys();
		for(let releasedKey of releasedKeys) {
			const releasedAction = keyMapper.getAction(releasedKey);
			if(releasedAction != null) {//released something I care about
				setNewState(stateTranslator(currentState.nextStateForActionWithBelt(belt, ACTION.Release)));
			}
		}

		const newKeys = inputProcessor.getNewlyActiveKeys();
		let shouldReverse = false;
		for(let newKey of newKeys) {
			const newAction = keyMapper.getAction(newKey);
			if(newAction != null) {//something I care about is pressed
				const thisState = stateTranslator(currentState.nextStateForActionWithBelt(belt, newAction));
				setNewState(thisState, newAction);
			}

			if((newAction === ACTION.Left) && (!isFacingLeft)) {
				shouldReverse = true;
			} else if((newAction === ACTION.Right) && (isFacingLeft)) {
				shouldReverse = true;
			}
		}

		const activeKeys = inputProcessor.getCurrentlyActiveKeys();
		let isCrouching = false;
		for(let activeKey of activeKeys) {
			const activeAction = keyMapper.getAction(activeKey);
			if(activeAction === ACTION.Crouch) isCrouching = true;
			if(isContinuousAction(activeAction)) {//something I care about is pressed
				const thisState = stateTranslator(currentState.nextStateForActionWithBelt(belt, activeAction));
				setNewState(thisState, activeAction);
				if(thisState === BLOCK_STATE) {break;}
			}
		}

		if((currentState === CROUCH_STATE) &&(!isCrouching)) {
			setNewState(IDLE_STATE);
		}

		if(shouldReverse) {
			isFacingLeft = !isFacingLeft;
		}
	};

	const isContinuousAction = function(action) {
		return (
			(action === ACTION.Left) ||
			(action === ACTION.Right) ||
			(action === ACTION.Crouch) ||
			(action === ACTION.Block) 
		);
	};

	const setNewState = function(newState, action) {
		if(newState != currentState) {
			if(action != undefined) {
				updateLocalStateWithAction(action);
			}
			
			if (currentAnimation) {
				//Should always be defined now, but just in case
				currentAnimation.reset(); 
			}

			currentState = newState;
			currentAnimation = animationForState(currentState);
			isNewState = true;
		} 
	};

	const updateLocalStateWithAction = function(action) {
		switch(currentState) {
		case WALK_RIGHT_STATE:
			if(action === ACTION.Jump) {
				isOnGround = false;
			} else if(action === ACTION.Left) {
				isFacingLeft = true;
				isNewState = true;
			} 
			break;
		case WALK_LEFT_STATE:
			if(action === ACTION.Jump) {
				isOnGround = false;
			} else if(action === ACTION.Right) {
				isFacingLeft = false;
				isNewState = true;
			} 
			break;
		case DASH_STATE:
			if(action === ACTION.Kick) {
				isOnGround = false;//H_Kick
			}
			break;
		case IDLE_STATE:
			if(action === ACTION.Left) {
				isFacingLeft = true;
			} else if(action === ACTION.Right) {
				isFacingLeft = false;
			} else if(action === ACTION.Jump) {
				isOnGround = false;
			}
			break;
		}
	};

	const stateTranslator = function(state) {
		switch(state) {
		case STATE.Idle:
			return IDLE_STATE;
		case STATE.WalkRight:
			return WALK_RIGHT_STATE;
		case STATE.WalkLeft:
			return WALK_LEFT_STATE;
		case STATE.Jump:
			return JUMP_STATE;
		case STATE.Crouch:
			return CROUCH_STATE;
		case STATE.Dash:
			return DASH_STATE;
		case STATE.Sweep:
			return SWEEP_STATE;
		case STATE.J_Kick:
			return J_KICK_STATE;
		case STATE.H_Kick:
			return H_KICK_STATE;
		case STATE.Punch:
			return PUNCH_STATE;
		case STATE.Kick:
			return KICK_STATE;
		case STATE.Block:
			return BLOCK_STATE;
		case STATE.KnockBack:
			return KNOCK_BACK_STATE;
		case IDLE_STATE:
			return STATE.Idle;
		case WALK_RIGHT_STATE:
			return STATE.WalkRight;
		case WALK_LEFT_STATE:
			return STATE.WalkLeft;
		case JUMP_STATE:
			return STATE.Jump;
		case CROUCH_STATE:
			return STATE.Crouch;
		case DASH_STATE:
			return STATE.Dash;
		case SWEEP_STATE:
			return STATE.Sweep;
		case J_KICK_STATE:
			return STATE.J_Kick;
		case H_KICK_STATE:
			return STATE.H_Kick;
		case PUNCH_STATE:
			return STATE.Punch;
		case KICK_STATE:
			return STATE.Kick;
		case BLOCK_STATE:
			return STATE.Block;
		case KNOCK_BACK_STATE:
			return STATE.KnockBack;
		}
	};

	const animationForState = function(state) {
		let selectedAnimation;
		switch(state) {
		case IDLE_STATE:
			selectedAnimation = currentAnimations.idle;
			break;
		case WALK_RIGHT_STATE:
		case WALK_LEFT_STATE:
			selectedAnimation = currentAnimations.walk;
			break;
		case JUMP_STATE:
			selectedAnimation = currentAnimations.jump;
			break;
		case CROUCH_STATE:
			selectedAnimation = currentAnimations.crouch;
			break;
		case DASH_STATE:
			selectedAnimation = currentAnimations.dash;
			break;
		case SWEEP_STATE:
			selectedAnimation = currentAnimations.sweep;
			break;
		case J_KICK_STATE:
			selectedAnimation = currentAnimations.j_kick;
			break;
		case H_KICK_STATE:
			selectedAnimation = currentAnimations.h_kick;
			break;
		case PUNCH_STATE:
			selectedAnimation = currentAnimations.punch;
			break;
		case KICK_STATE:
			selectedAnimation = currentAnimations.kick;
			break;
		case BLOCK_STATE:
			selectedAnimation = currentAnimations.block;
			break;
		case KNOCK_BACK_STATE:
			selectedAnimation = currentAnimations.knockback;
			break;
		}

		if(selectedAnimation === undefined) {
			return currentAnimations.idle;
		} else {
			return selectedAnimation;
		}
	};
}