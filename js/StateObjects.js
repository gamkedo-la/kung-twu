const STATE = {
	Idle:"idle",
	Walk:"walk",
	Jump:"jump",
	Crouch:"crouch",
	Dash:"dash",
	Sweep:"sweep",
	J_Kick:"j-kick",
	H_Kick:"h-kick",
	Punch:"punch",
	Kick:"kick",
	Block:"block",
	KnockBack:"knock-back"
};

const ACTION = {
	Left:"left",
	Right:"right",
	Down:"down",
	Hit:"hit",
	Jump:"jump",
	Release:"release",
	Punch:"punch",
	Kick:"kick",
	Land:"land",
	End:"end",
	Block:"block",
	Dash:"dash"
};

const BELT = {
	White:0,
	Yellow:1,
	Tan:2,
	Brown:3,
	Red:4,
	Black:5
};

const WALK_STATE = {
	canEnterFromStateWithActionAndBelt:function(belt, action, currentState) {
		if(currentState === STATE.Idle) {
			if((action === ACTION.Right) || (action === ACTION.Left)) {
				return true;
			}
		} 

		return false;
	},

	nextStateForActionWithBelt:function(belt, action) {
		if(action === ACTION.Hit) {
			return STATE.KnockBack;
		} else if(action === ACTION.Jump) {
			return STATE.Jump;
		} else if(action === ACTION.Crouch) {
			console.log(action);
			return STATE.Crouch;
		} else if(action === ACTION.Dash) {
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
			return STATE.Walk;
		}
	}
};

const JUMP_STATE = {
	canEnterFromStateWithActionAndBelt:function(belt, action, currentState) {
		if(action === ACTION.Jump) {
			if((currentState === STATE.Walk) || (currentState === STATE.Idle)) {
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
	canEnterFromStateWithActionAndBelt:function(belt, action, currentState) {
		if((currentState === STATE.Idle) && (action === ACTION.Down)) {
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
	canEnterFromStateWithActionAndBelt:function(belt, action, currentState) {
		if(belt >= BELT.Yellow) {
			if((currentState === STATE.Walk) || (currentState === STATE.Idle)) {
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
			if((currentState === STATE.Walk) || 
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
		} else if((action === ACTION.Left) || (action === ACTION.Right)) {
			return STATE.Walk;
		} else if(action === ACTION.Jump) {
			return STATE.Jump;
		} else if(action === ACTION.Down) {
			return STATE.Crouch;
		} else if(action === ACTION.Dash) {
			return STATE.Dash;
		} else if(action === ACTION.Punch) {
			return STATE.Punch;
		} else if(action === ACTION.Kick) {
			return STATE.Kick;
		} else if(action === ACTION.Block) {
			return STATE.Block;
		} else {
			return STATE.Idle;
		}
	}
};

const J_KICK_STATE = {
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
	canEnterFromStateWithActionAndBelt:function(belt, action, currentState) {
		if(belt >= BELT.Red) {
			if((currentState === STATE.Dash) && (action === ACTION.Kick)) {
				return true;
			}
		}

		return false;
	},

	nextStateForActionWithBelt:function(belt, action) {
		if(action === ACTION.Land) {
			return STATE.Idle;
		} else {
			return STATE.H_Kick;
		}
	}
};

const PUNCH_STATE = {
	canEnterFromStateWithActionAndBelt:function(belt, action, currentState) {
		if(action === ACTION.Punch) {
			if((currentState === STATE.Walk) || (currentState === STATE.Idle)) {
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
	canEnterFromStateWithActionAndBelt:function(belt, action, currentState) {
		if(action === ACTION.Kick) {
			if((currentState === STATE.Walk) || (currentState === STATE.Idle)) {
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
	canEnterFromStateWithActionAndBelt:function(belt, action, currentState) {
		if(action === ACTION.Block) {
			if((currentState === STATE.Walk) || 
			(currentState === STATE.Idle) || 
			(currentState === STATE.Crouch)) {//TODO: Might need to change this (block crouch?)
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
function StateManager(theAnimations, isPlayerManager, aiType) {
	let currentState = IDLE_STATE;
	let isNewState = true;
	let currentAnimation = theAnimations.idle;
	let oldInput = heldButtons;
	let belt = BELT.White;
	let landed = false;
	let isOnGround = true;
	let didGetHit = false;
	let isFacingLeft = true;
	let knockBackDidEnd = false;
	let attemptingToWalk = null;
	let timeSinceAction = 0;

	this.setNewBelt = function(newBelt) {
		belt = newBelt;
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
		if(currentState === KNOCK_BACK_STATE) {
			knockBackDidEnd = true;
		}
	};

	this.getIsOnGround = function() {
		return (isOnGround === true);
	};

	this.wasHit = function() {
		didGetHit = true;
		isOnGround = false;
	};

	this.getCurrentAnimation = function() {
		return currentAnimation;
	};

	this.getIsFacingLeft = function() {
		return (isFacingLeft == true);
	};

	this.getIsNewState = function() {
		return (isNewState === true);
	};

	this.getCurrentState = function() {
		switch(currentState) {
		case WALK_STATE:
			return STATE.Walk;
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

	this.update = function(deltaTime, distToPlayer = 0) {
		currentAnimation.update(deltaTime);
		isNewState = false;
		let newState;

		checkAutoStateChanges();

		if(isPlayerManager) {
			updateStateWithUserInput(heldButtons);
		} else {
			updateStateWithAI(deltaTime, distToPlayer);
		}

		if(didGetHit) {
			didGetHit = false;

			newState = stateTranslator(currentState.nextStateForActionWithBelt(belt, ACTION.Hit));
			setNewState(newState);
		}
	};

	const checkAutoStateChanges = function() {
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

	const updateStateWithAI = function(deltaTime, distToPlayer) {
		let action = aiManager.actionForTypeTimeStateAndPos(aiType, timeSinceAction, currentState, distToPlayer);

		newState = stateTranslator(currentState.nextStateForActionWithBelt(belt, action));
		if(newState != currentState) {
			timeSinceAction = 0;

			if(action === ACTION.Left) {
				isFacingLeft = true;
			} else if(action === ACTION.Right) {
				isFacingLeft = false;
			} else if(action === ACTION.Jump) {
				isOnGround = false;	
			}

		} else {
			timeSinceAction += deltaTime;
		}
		setNewState(newState);
	};

	this.drawAt = function(x = 0, y = 0) {
		let deltaXForFacing = 0;
		if(isFacingLeft) {
			deltaXForFacing = (theAnimations.idle.getWidth() - currentAnimation.getWidth());
		}
		currentAnimation.drawAt(x + deltaXForFacing, y, isFacingLeft);
	};

	const updateStateWithUserInput = function(input) {
		const delta = deltaInput(input);

		if(delta.newInput != null) {
			let aNewInput = processNewInput(delta.newInput);

			if(aNewInput != null) {
				setNewState(stateTranslator(currentState.nextStateForActionWithBelt(belt, aNewInput)));
			}
		}

		if(delta.released != null) {
			let aReleasedInput = processReleasedInput(delta.released);
			if(aReleasedInput != null) {
				setNewState(stateTranslator(currentState.nextStateForActionWithBelt(belt, aReleasedInput)));
			}
		}		

		if(currentState === IDLE_STATE) {
			if(attemptingToWalk === ALIAS.LEFT) {
				newState = stateTranslator(currentState.nextStateForActionWithBelt(belt, ACTION.Left));
				setNewState(newState);
				isFacingLeft = true;
			} else if(attemptingToWalk === ALIAS.RIGHT) {
				newState = stateTranslator(currentState.nextStateForActionWithBelt(belt, ACTION.Right));
				setNewState(newState);
				isFacingLeft = false;
			}
		}
	};

	const deltaInput = function(input) {
		attemptingToWalk = null;
		const mutableInput = input.slice();

		for(let i = oldInput.length - 1; i >= 0; i--) {
			const anOldInput = oldInput[i];
			for(let j = mutableInput.length; j >= 0; j--) {
				const thisInput = mutableInput[j];
				if(anOldInput == thisInput) {
					oldInput.splice(i, 1);
					mutableInput.splice(j, 1);
				}

				if(thisInput === ALIAS.LEFT) {
					attemptingToWalk = ALIAS.LEFT;
				} else if(thisInput === ALIAS.RIGHT) {
					attemptingToWalk = ALIAS.RIGHT;
				}
			}
		}

		let released = null;
		let newlyPressed = null;
		if(oldInput.length > 0) {released = oldInput;}
		if(mutableInput.length > 0) {newlyPressed = mutableInput;}

		oldInput = input.slice();

		return {released:released, newInput:newlyPressed};
	};

	const processNewInput = function(newInput) {
		//just pushed some new keys => have new actions to process
		for(let i = 0; i < newInput.length; i++) {
			const currentButton = newInput[i];

			switch(currentState) {
			case WALK_STATE:
				if(currentButton === ALIAS.JUMP) {
					isOnGround = false;
					return ACTION.Jump;
				} else if(currentButton === ALIAS.CROUCH) {
					return ACTION.Crouch;
				} else if(currentButton === ALIAS.DASH) {
					return ACTION.Dash;
				} else if(currentButton === ALIAS.PUNCH) {
					return ACTION.Punch;
				} else if(currentButton === ALIAS.KICK) {
					return ACTION.Kick;
				} else if(currentButton === ALIAS.BLOCK) {
					return ACTION.Block;
				} else if(currentButton === ALIAS.LEFT) {
					isFacingLeft = true;	//Changing to face left
					isNewState = true;		//is like a state change
					return ACTION.Left;
				} else if(currentButton === ALIAS.RIGHT) {
					isFacingLeft = false;	//Changing to face right
					isNewState = true;		//is like a state change
					return ACTION.Right;
				}
				break;
			case JUMP_STATE:
				if(currentButton === ALIAS.KICK) {
					return ACTION.Kick;
				}
				break;
			case CROUCH_STATE:
				if(currentButton === ALIAS.KICK) {
					return ACTION.Sweep;
				}
				break;
			case DASH_STATE:
				if(currentButton === ALIAS.KICK) {
					isOnGround = false;//H_Kick
					return ACTION.Kick;
				}
				break;
			case IDLE_STATE:
				if(currentButton === ALIAS.LEFT) {
					isFacingLeft = true;
					return ACTION.Left;
				} else if(currentButton === ALIAS.RIGHT) {
					isFacingLeft = false;
					return ACTION.Right;
				} else if(currentButton === ALIAS.JUMP) {
					isOnGround = false;
					return ACTION.Jump;
				} else if(currentButton === ALIAS.DOWN) {
					return ACTION.Down;
				} else if(currentButton === ALIAS.DASH) {
					return ACTION.Dash;
				} else if(currentButton === ALIAS.PUNCH) {
					return ACTION.Punch;
				} else if(currentButton === ALIAS.KICK) {
					return ACTION.Kick;
				} else if(currentButton === ALIAS.BLOCK) {
					return ACTION.Block;
				}
				break;
			}
		}

		return null;
	};

	const processReleasedInput = function(released) {
		//released some keys => have released actions
		for(let i = 0; i < released.length; i++) {
			const currentButton = released[i];

			switch(currentState) {
			case WALK_STATE:
				if((currentButton === ALIAS.LEFT) || (currentButton === ALIAS.RIGHT)) {
					return ACTION.Release;
				}
				break;
			case CROUCH_STATE:
				if(currentButton === ALIAS.DOWN) {
					return ACTION.Release;
				}
				break;
			case BLOCK_STATE:
				if(currentButton === ALIAS.DASH) {
					return ACTION.Release;
				}
				break;
			}
		}

		return null;
	};

	const setNewState = function(newState) {
		if(newState != currentState) {
			currentAnimation.reset();

			currentState = newState;
			currentAnimation = animationForState(currentState);
			isNewState = true;
		} 
	};

	const stateTranslator = function(state) {
		switch(state) {
		case STATE.Idle:
			return IDLE_STATE;
		case STATE.Walk:
			return WALK_STATE;
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
		case WALK_STATE:
			return STATE.Walk;
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
			selectedAnimation = theAnimations.idle;
			break;
		case WALK_STATE:
			selectedAnimation = theAnimations.walk;
			break;
		case JUMP_STATE:
			selectedAnimation = theAnimations.jump;
			break;
		case CROUCH_STATE:
			selectedAnimation = theAnimations.crouch;
			break;
		case DASH_STATE:
			selectedAnimation = theAnimations.dash;
			break;
		case SWEEP_STATE:
			selectedAnimation = theAnimations.sweep;
			break;
		case J_KICK_STATE:
			selectedAnimation = theAnimations.j_kick;
			break;
		case H_KICK_STATE:
			selectedAnimation = theAnimations.h_kick;
			break;
		case PUNCH_STATE:
			selectedAnimation = theAnimations.punch;
			break;
		case KICK_STATE:
			selectedAnimation = theAnimations.kick;
			break;
		case BLOCK_STATE:
			selectedAnimation = theAnimations.block;
			break;
		case KNOCK_BACK_STATE:
			selectedAnimation = theAnimations.knockback;
			break;
		}

		if(selectedAnimation === undefined) {
			return theAnimations.idle;
		} else {
			return selectedAnimation;
		}
	};
}