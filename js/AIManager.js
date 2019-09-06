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

function AIManager() {
	this.actionForTypeTimeStateAndPos = function(type, state, newInput) {

		switch(type) {
		case AITYPE.BasicWhite:
		case AITYPE.BasicYellow:
		case AITYPE.BasicTan:
		case AITYPE.BasicBrown:
		case AITYPE.BasicRed:	
		case AITYPE.BossYellow:
		case AITYPE.BossTan:
		case AITYPE.BossBrown:
		case AITYPE.BossRed:
		case AITYPE.BossBlack:
			return ACTION.Idle;
		}
	};
}