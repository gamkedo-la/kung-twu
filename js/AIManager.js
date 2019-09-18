//AI Manager
const AITYPE = {
	BasicWhite:"basicWhite",
	BasicYellow:"basicYellow",
	BasicTan:"basicTan",
	BasicBrown:"basicBrown",
	BasicRed:"basicRed",	
	BossYellow:"bossYellow",
	BossTan:"bossTan",
	BossBrown:"bossBrown",
	BossRed:"bossRed",
	BossBlack:"bossBlack",
};

const COOLDOWN = {
	White:800,
	Yellow:750,
	Tan:700,
	Brown:650,
	Red:550,
	Black:450
};

const IDEAL_STRIKE_DIST = 60;
const BUFFER_DIST = 140;

function AIManager() {
	this.coolDownForBelt = function(belt) {
		switch(belt) {
		case BELT.White:
			return COOLDOWN.White;
		case BELT.Yellow:
			return COOLDOWN.Yellow;
		case BELT.Tan:
			return COOLDOWN.Tan;
		case BELT.Brown:
			return COOLDOWN.Brown;
		case BELT.Red:
			return COOLDOWN.Red;
		case BELT.Black:
			return COOLDOWN.Black;																														
		}
	};

	this.coolDownForType = function(aiType) {
		switch(aiType) {
		case AITYPE.BasicWhite:
			return COOLDOWN.White;
		case AITYPE.BasicYellow:
			return COOLDOWN.Yellow;
		case AITYPE.BasicTan:
			return COOLDOWN.Tan;
		case AITYPE.BasicBrown:
			return COOLDOWN.Brown;
		case AITYPE.BasicRed:
			return COOLDOWN.Red;
		case AITYPE.BossYellow:
			return (0.75 * COOLDOWN.Yellow);
		case AITYPE.BossTan:
			return (0.75 * COOLDOWN.Tan);
		case AITYPE.BossBrown:
			return (0.75 * COOLDOWN.Brown);
		case AITYPE.BossRed:
			return (0.75 * COOLDOWN.Red);
		case AITYPE.BossBlack:
			return (0.75 * COOLDOWN.Black);																														
		}
	};

	this.actionForTypeTimeStateAndPos = function(type, timeSinceAction, currentState, distToPlayer, shouldAttack) {
		const thisCoolDown = this.coolDownForType(type);

		if((distToPlayer >= 0) && (currentState === WALK_LEFT_STATE)) {//walking away from player
			return attackIfAppropriateFor(type, 2 * timeSinceAction, currentState, distToPlayer, shouldAttack, thisCoolDown);
		} else if((distToPlayer <= 0) && (currentState === WALK_RIGHT_STATE)) {
			return attackIfAppropriateFor(type, 2 * timeSinceAction, currentState, distToPlayer, shouldAttack, thisCoolDown);
		}
		
		if(timeSinceAction < thisCoolDown) return currentState;
		
		const desiredDistance = desiredApproachDistance(type, shouldAttack);
		if(shouldAttack) {
			if(distToPlayer > maxStrikeDistanceForType(type)) {
				return ACTION.Right;
			} else if(distToPlayer < -maxStrikeDistanceForType(type)) {
				return ACTION.Left;
			} else {
				return attackIfAppropriateFor(type, timeSinceAction, currentState, distToPlayer, shouldAttack, thisCoolDown);
			}
		} else {
			if(distToPlayer > 0) {
				if(distToPlayer > desiredDistance + BUFFER_DIST) {
					return ACTION.Right;
				} else if(distToPlayer < desiredDistance - BUFFER_DIST) {
					return ACTION.Left;
				} else {
					return ACTION.Release;
				}
			} else {
				if(distToPlayer < -desiredDistance - BUFFER_DIST) {
					return ACTION.Left;
				} else if(distToPlayer > -desiredDistance + BUFFER_DIST) {
					return ACTION.Right;
				} else {
					return ACTION.Release;
				}
			}
		}
	};

	const desiredApproachDistance = function(type, shouldAttack) {
		let strikeDistance = maxStrikeDistanceForType(type);
		switch(type) {
		case AITYPE.BasicWhite:
			if(shouldAttack) {
				return strikeDistance;
			} else {
				return 5 * strikeDistance;
			}
		case AITYPE.BasicYellow:
			if(shouldAttack) {
				return strikeDistance;
			} else {
				return 4.5 * strikeDistance;
			}
		case AITYPE.BasicTan:
			if(shouldAttack) {
				return strikeDistance;
			} else {
				return 4 * strikeDistance;
			}
		case AITYPE.BasicBrown:
			if(shouldAttack) {
				return strikeDistance;
			} else {
				return 3.5 * strikeDistance;
			}
		case AITYPE.BasicRed:
			if(shouldAttack) {
				return strikeDistance;
			} else {
				return 2.5 * strikeDistance;
			}
		case AITYPE.BossYellow:
		case AITYPE.BossTan:
		case AITYPE.BossBrown:
		case AITYPE.BossRed:
		case AITYPE.BossBlack:
			return strikeDistance;
		}	
	};

	const maxStrikeDistanceForType = function(type) {
		let range = IDEAL_STRIKE_DIST;
		switch(type) {
		case AITYPE.BasicWhite:
			range = 40;
			break;
		case AITYPE.BasicYellow:
			range = 34;
			break;
		case AITYPE.BasicTan:
			range = 28;
			break;
		case AITYPE.BasicBrown:
			range = 20;
			break;
		case AITYPE.BasicRed:
			range = 10;
			break;
		case AITYPE.BossYellow:
			range = 28;
			break;
		case AITYPE.BossTan:
			range = 20;
			break;
		case AITYPE.BossBrown:
			range = 10;
			break;
		case AITYPE.BossRed:
			range = 6;
			break;
		case AITYPE.BossBlack:
			range = 0;
			break;
		}

		return maxStrikeDistance(range);
	};

	const maxStrikeDistance = function(range) {
		const rnd = Math.floor(range * Math.random() - range / 2);
		return (IDEAL_STRIKE_DIST + rnd);
	};

	const attackIfAppropriateFor = function(type, timeSinceAction, currentState, distToPlayer, shouldAttack, cooldown) {
		if(shouldAttack != undefined) {
			if(!shouldAttack) {
				const approachModifier = 50 * Math.random();
				if(distToPlayer < 200 + approachModifier) {
					return ACTION.Release;
				}
			} 
			
		}

		switch(type) {
		case AITYPE.BasicWhite:
			if(timeSinceAction > cooldown) {
				return attackActionForWhiteBelt();
			} 
			break;
		case AITYPE.BasicYellow:
			if(timeSinceAction > cooldown) {
				return attackActionForYellowBelt();
			}
			break;
		case AITYPE.BasicTan:
			if(timeSinceAction > cooldown) {
				return attackActionForTanBelt(currentState);
			}
			break;
		case AITYPE.BasicBrown:
			if(timeSinceAction > cooldown) {
				return attackActionForBrownBelt(currentState);
			}
			break;
		case AITYPE.BasicRed:
			if(timeSinceAction > cooldown) {
				return attackActionForRedBelt(currentState);
			}
			break;
		case AITYPE.BossYellow:
			if(timeSinceAction > cooldown) {
				return attackActionForYellowBossBelt();
			}
			break;
		case AITYPE.BossTan:
			if(timeSinceAction > cooldown) {
				return attackActionForTanBossBelt(currentState);
			}
			break;
		case AITYPE.BossBrown:
			if(timeSinceAction > cooldown) {
				return attackActionForBrownBossBelt(currentState);
			}
			break;
		case AITYPE.BossRed:
			if(timeSinceAction > cooldown) {
				return attackActionForRedBossBelt(currentState);
			}
			break;
		case AITYPE.BossBlack:
			if(timeSinceAction > cooldown) {
				return attackActionForBlackBossBelt(currentState);
			}
			break;
		}

		return ACTION.Release;
	};

	const attackActionForWhiteBelt = function() {
		const rnd = Math.floor(10 * Math.random());
		if(rnd % 3 < 2) {
			return ACTION.Punch;
		} else {
			return ACTION.Kick;
		}
	};

	const attackActionForYellowBelt = function() {
		const rnd = (Math.floor(100 * Math.random())) % 7;

		if(rnd < 2) {
			return ACTION.Punch;
		} else if(rnd< 4) {
			return ACTION.Kick;
		} else if(rnd < 5) {
			return ACTION.Block;
		} else if(rnd < 6) {
			return ACTION.Dash;
		} else {
			return ACTION.Jump;
		}
	};

	const attackActionForTanBelt = function(currentState) {
		const rnd = (Math.floor(100 * Math.random())) % 9;

		if(currentState === CROUCH_STATE) {
			if(rnd < 5) {
				return ACTION.Kick;
			} else if(rnd < 7) {
				return ACTION.Crouch;
			} else {
				return ACTION.Release;
			}
		} else {
			if(rnd < 2) {
				return ACTION.Punch;
			} else if(rnd< 4) {
				return ACTION.Kick;
			} else if(rnd < 5) {
				return ACTION.Block;
			} else if(rnd < 6) {
				return ACTION.Dash;
			} else if(rnd < 7) {
				return ACTION.Jump;
			} else {
				return ACTION.Crouch;
			}
		}
	};

	const attackActionForBrownBelt = function(currentState) {
		const rnd = (Math.floor(100 * Math.random())) % 9;

		if(currentState === CROUCH_STATE) {
			if(rnd < 5) {
				return ACTION.Kick;
			} else if(rnd < 7) {
				return ACTION.Crouch;
			} else {
				return ACTION.Release;
			}
		} else if(currentState === JUMP_STATE) {
			if(rnd < 7) {
				return ACTION.Kick;
			}
		} else {
			if(rnd < 2) {
				return ACTION.Punch;
			} else if(rnd< 4) {
				return ACTION.Kick;
			} else if(rnd < 5) {
				return ACTION.Block;
			} else if(rnd < 6) {
				return ACTION.Dash;
			} else if(rnd < 7) {
				return ACTION.Crouch;
			} else {
				return ACTION.Jump;
			}
		}
	};

	const attackActionForRedBelt = function(currentState) {
		const rnd = (Math.floor(100 * Math.random())) % 9;

		if(currentState === CROUCH_STATE) {
			if(rnd < 5) {
				return ACTION.Kick;
			} else if(rnd < 7) {
				return ACTION.Crouch;
			} else {
				return ACTION.Release;
			}
		} else if(currentState === JUMP_STATE) {
			if(rnd < 7) {
				return ACTION.Kick;
			}
		} else if(currentState === DASH_STATE) {
			if(rnd < 7) {
				return ACTION.Kick;
			}
		} else {
			if(rnd < 2) {
				return ACTION.Punch;
			} else if(rnd< 4) {
				return ACTION.Kick;
			} else if(rnd < 5) {
				return ACTION.Block;
			} else if(rnd < 6) {
				return ACTION.Dash;
			} else if(rnd < 7) {
				return ACTION.Crouch;
			} else {
				return ACTION.Jump;
			}
		}
	};

	const attackActionForYellowBossBelt = function() {
		const rnd = (Math.floor(100 * Math.random())) % 11;

		if(rnd < 2) {
			return ACTION.Punch;
		} else if(rnd< 4) {
			return ACTION.Kick;
		} else if(rnd < 5) {
			return ACTION.Block;
		} else if(rnd < 6) {
			return Action.Crouch;
		} else if(rnd < 7) {
			return ACTION.Jump;
		} else {
			return ACTION.Dash;
		}	
	};

	const attackActionForTanBossBelt = function(currentState) {
		const rnd = (Math.floor(100 * Math.random())) % 11;

		if(currentState === CROUCH_STATE) {
			if(rnd < 7) {
				return ACTION.Kick;
			} else if(rnd < 10) {
				return ACTION.Crouch;
			} else {
				return ACTION.Release;
			}
		} else {
			if(rnd < 2) {
				return ACTION.Punch;
			} else if(rnd< 4) {
				return ACTION.Kick;
			} else if(rnd < 5) {
				return ACTION.Block;
			} else if(rnd < 6) {
				return ACTION.Dash;
			} else if(rnd < 8) {
				return ACTION.Jump;
			} else {
				return ACTION.Crouch;
			}
		}
	};

	const attackActionForBrownBossBelt = function(currentState) {
		const rnd = (Math.floor(100 * Math.random())) % 11;

		if(currentState === CROUCH_STATE) {
			if(rnd < 6) {
				return ACTION.Kick;
			} else if(rnd < 8) {
				return ACTION.Crouch;
			} else {
				return ACTION.Release;
			}
		} else if(currentState === JUMP_STATE) {
			if(rnd < 9) {
				return ACTION.Kick;
			}
		} else {
			if(rnd < 2) {
				return ACTION.Punch;
			} else if(rnd< 4) {
				return ACTION.Kick;
			} else if(rnd < 5) {
				return ACTION.Block;
			} else if(rnd < 7) {
				return ACTION.Dash;
			} else if(rnd < 8) {
				return ACTION.Crouch;
			} else {
				return ACTION.Jump;
			}
		}
	};

	const attackActionForRedBossBelt = function(currentState) {
		const rnd = (Math.floor(100 * Math.random())) % 11;

		if(currentState === CROUCH_STATE) {
			if(rnd < 6) {
				return ACTION.Kick;
			} else if(rnd < 8) {
				return ACTION.Crouch;
			} else {
				return ACTION.Release;
			}
		} else if(currentState === JUMP_STATE) {
			if(rnd < 9) {
				return ACTION.Kick;
			}
		} else if(currentState === DASH_STATE) {
			if(rnd < 9) {
				return ACTION.Kick;
			}
		} else {
			if(rnd < 2) {
				return ACTION.Punch;
			} else if(rnd< 5) {
				return ACTION.Kick;
			} else if(rnd < 6) {
				return ACTION.Block;
			} else if(rnd < 7) {
				return ACTION.Jump;
			} else if(rnd < 8) {
				return ACTION.Crouch;
			} else {
				return ACTION.Dash;
			}
		}
	};

	const attackActionForBlackBossBelt = function(currentState) {
		//TODO: Does the final boss have a special skill nobody else does?
		const rnd = (Math.floor(100 * Math.random())) % 11;

		if(currentState === CROUCH_STATE) {
			if(rnd < 6) {
				return ACTION.Kick;
			} else if(rnd < 8) {
				return ACTION.Crouch;
			} else {
				return ACTION.Release;
			}
		} else if(currentState === JUMP_STATE) {
			if(rnd < 9) {
				return ACTION.Kick;
			}
		} else if(currentState === DASH_STATE) {
			if(rnd < 9) {
				return ACTION.Kick;
			}
		} else {
			if(rnd < 2) {
				return ACTION.Punch;
			} else if(rnd< 5) {
				return ACTION.Kick;
			} else if(rnd < 6) {
				return ACTION.Block;
			} else if(rnd < 7) {
				return ACTION.Jump;
			} else if(rnd < 8) {
				return ACTION.Crouch;
			} else {
				return ACTION.Dash;
			}
		}
	};
}