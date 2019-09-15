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
		if(timeSinceAction < this.coolDownForType(type)) return currentState;
		
		const desiredDistance = desiredApproachDistance(type, shouldAttack);
		if(shouldAttack) {
			if(distToPlayer > maxStrikeDistanceForType(type)) {
				return ACTION.Right;
			} else if(distToPlayer < -maxStrikeDistanceForType(type)) {
				return ACTION.Left;
			} else {
				return attackIfAppropriateFor(type, timeSinceAction, currentState, distToPlayer, shouldAttack);
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

	const attackIfAppropriateFor = function(type, timeSinceAction, currentState, distToPlayer, shouldAttack) {
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
			if(timeSinceAction > COOLDOWN.White) {
				return attackActionForWhiteBelt();
			} else {
				return ACTION.Release;
			}
		case AITYPE.BasicYellow:
		case AITYPE.BasicTan:
		case AITYPE.BasicBrown:
		case AITYPE.BasicRed:
			return ACTION.Kick;
		case AITYPE.BossYellow:
		case AITYPE.BossTan:
		case AITYPE.BossBrown:
		case AITYPE.BossRed:
		case AITYPE.BossBlack:
			return ACTION.Release;
		}
	};

	const attackActionForWhiteBelt = function() {
		const rnd = Math.floor(10 * Math.random());
		if(rnd % 3 < 2) {
			return ACTION.Punch;
		} else {
			return ACTION.Kick;
		}
	};
}