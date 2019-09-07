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

const IDEAL_STRIKE_DIST = 60;

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
			return maxStrikeDistanceForWhiteBelt();
		case AITYPE.BasicYellow:
		case AITYPE.BasicTan:
		case AITYPE.BasicBrown:
		case AITYPE.BasicRed:
		case AITYPE.BossYellow:
		case AITYPE.BossTan:
		case AITYPE.BossBrown:
		case AITYPE.BossRed:
		case AITYPE.BossBlack:
			return IDEAL_STRIKE_DIST;
		}
	};

	const maxStrikeDistanceForWhiteBelt = function() {
		const rnd = Math.floor(40 * Math.random()) - 20;
		return (IDEAL_STRIKE_DIST + rnd);
	};

	const attackIfAppropriateFor = function(type, timeSinceAction, currentState, distToPlayer) {
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