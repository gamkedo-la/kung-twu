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
	White:900,
	Yellow:850,
	Tan:800,
	Brown:750,
	Red:650,
	Black:550
};

function AIManager() {
	this.actionForTypeTimeStateAndPos = function(type, timeSinceAction, currentState, distToPlayer) {
		if((distToPlayer > maxApproachDistanceForType(type)) || (distToPlayer < -maxApproachDistanceForType(type))) {
			return ACTION.Release;
		} else if(distToPlayer > maxStrikeDistanceForType(type)) {
			return ACTION.Right;
		} else if(distToPlayer < -maxStrikeDistanceForType(type)) {
			return ACTION.Left;
		} else {
			return attackIfAppropriateFor(type, timeSinceAction, currentState, distToPlayer);
		}
	};

	const maxApproachDistanceForType = function(type) {
		switch(type) {
		case AITYPE.BasicWhite:
		case AITYPE.BasicYellow:
		case AITYPE.BasicTan:
		case AITYPE.BasicBrown:
		case AITYPE.BasicRed:
			return 10000;
		case AITYPE.BossYellow:
		case AITYPE.BossTan:
		case AITYPE.BossBrown:
		case AITYPE.BossRed:
		case AITYPE.BossBlack:
			return 200;
		}
	};

	const maxStrikeDistanceForType = function(type) {
		switch(type) {
		case AITYPE.BasicWhite:
		case AITYPE.BasicYellow:
		case AITYPE.BasicTan:
		case AITYPE.BasicBrown:
		case AITYPE.BasicRed:
			return 60;
		case AITYPE.BossYellow:
		case AITYPE.BossTan:
		case AITYPE.BossBrown:
		case AITYPE.BossRed:
		case AITYPE.BossBlack:
			return 80;
		}
	};

	const attackIfAppropriateFor = function(type, timeSinceAction, currentState, distToPlayer) {
		switch(type) {
		case AITYPE.BasicWhite:
			if(timeSinceAction > COOLDOWN.White) {
				return ACTION.Kick;
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
}