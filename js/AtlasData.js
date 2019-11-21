const ATLAS_ROW0  = 1;
const ATLAS_ROW1  = 72;
const ATLAS_ROW2  = 143;
const ATLAS_ROW3  = 214;
const ATLAS_ROW4  = 285;
const ATLAS_ROW5  = 356;
const ATLAS_ROW6  = 427;
const ATLAS_ROW7  = 498;
const ATLAS_ROW8  = 569;
const ATLAS_ROW9  = 640;
const ATLAS_ROW10 = 711;
const ATLAS_ROW11 = 782;
const ATLAS_ROW12 = 853;
const ATLAS_ROW13 = 924;
const ATLAS_ROW14 = 995;

//Image Atlas Data
/*
	name:STATE.,
	image:characterAtlas,
	clipX:,
	clipY:,
	clipWidth:,
	clipHeight:69,
	frameWidth:,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[200],
	reverses:false,
	loops:true
*/

//---------Start Player Atlas Data--------//

const wooshDashPlayerPicData = {
	name:STATE.Dash,
	image:characterAtlas,
	clipX:0,
	clipY:ATLAS_ROW12,
	clipWidth:142,
	clipHeight:142,
	frameWidth:142,
	frameCount:1,
	frames:[0],
	frameTimes:[225],
	reverses:false,
	loops:false
};

const wooshDashPlayerLPicData = {
	name:STATE.Dash,
	image:characterAtlas,
	clipX:142,
	clipY:ATLAS_ROW12,
	clipWidth:142,
	clipHeight:142,
	frameWidth:142,
	frameCount:1,
	frames:[0],
	frameTimes:[225],
	reverses:false,
	loops:false
};

//---------Start Player White Belt Atlas Data--------//

const playerIdleWhiteData = {
	name:STATE.Idle,
	image:characterAtlas,
	clipX:142,
	clipY:ATLAS_ROW0,
	clipWidth:80,
	clipHeight:69,
	frameWidth:40,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[200],
	reverses:false,
	loops:true
};

const playerWalkWhiteData = {
	name:STATE.WalkRight,
	image:characterAtlas,
	clipX:310,
	clipY:ATLAS_ROW6,
	clipWidth:109,
	clipHeight:69,
	frameWidth:36,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[200],
	reverses:false,
	loops:true
};

const playerPunchWhiteData = {
	name:STATE.Punch,
	image:characterAtlas,
	clipX:148,
	clipY:ATLAS_ROW6,
	clipWidth:162,
	clipHeight:69,
	frameWidth:54,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50, 150, 225, 50],
	reverses:false,
	loops:false
};

const playerKickWhiteData = {
	name:STATE.Kick,
	image:characterAtlas,
	clipX:0,
	clipY:ATLAS_ROW6,
	clipWidth:148,
	clipHeight:69,
	frameWidth:49,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50, 150, 225, 50],
	reverses:false,
	loops:false
};

const playerKnockbackWhiteData = {
	name:STATE.KnockBack,
	image:characterAtlas,
	clipX:222,
	clipY:ATLAS_ROW0,
	clipWidth:312,
	clipHeight:69,
	frameWidth:78,
	frameCount:4,
	frames:[0, 1, 2, 3],
	frameTimes:[50],
	reverses:false,
	loops:false
};

//---------Start Player Yellow Belt Atlas Data--------//

const playerIdleYellowData = {
	name:STATE.Idle,
	image:characterAtlas,
	clipX:142,
	clipY:ATLAS_ROW1,
	clipWidth:80,
	clipHeight:69,
	frameWidth:40,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[200],
	reverses:false,
	loops:true
};

const playerWalkYellowData = {
	name:STATE.WalkRight,
	image:characterAtlas,
	clipX:310,
	clipY:ATLAS_ROW7,
	clipWidth:109,
	clipHeight:69,
	frameWidth:36,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[200],
	reverses:false,
	loops:true
};

const playerPunchYellowData = {
	name:STATE.Punch,
	image:characterAtlas,
	clipX:148,
	clipY:ATLAS_ROW7,
	clipWidth:162,
	clipHeight:69,
	frameWidth:54,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50, 150, 225, 50],
	reverses:false,
	loops:false
};

const playerKickYellowData = {
	name:STATE.Kick,
	image:characterAtlas,
	clipX:0,
	clipY:ATLAS_ROW7,
	clipWidth:148,
	clipHeight:69,
	frameWidth:49,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50, 150, 225, 50],
	reverses:false,
	loops:false
};

const playerKnockbackYellowData = {
	name:STATE.KnockBack,
	image:characterAtlas,
	clipX:222,
	clipY:ATLAS_ROW1,
	clipWidth:312,
	clipHeight:69,
	frameWidth:78,
	frameCount:4,
	frames:[0, 1, 2, 3],
	frameTimes:[50],
	reverses:false,
	loops:false
};

//---------Start Player Tan Belt Atlas Data--------//

const playerIdleTanData = {
	name:STATE.Idle,
	image:characterAtlas,
	clipX:142,
	clipY:ATLAS_ROW2,
	clipWidth:80,
	clipHeight:69,
	frameWidth:40,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[200],
	reverses:false,
	loops:true
};

const playerWalkTanData = {
	name:STATE.WalkRight,
	image:characterAtlas,
	clipX:310,
	clipY:ATLAS_ROW8,
	clipWidth:109,
	clipHeight:69,
	frameWidth:36,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[200],
	reverses:false,
	loops:true
};

const playerPunchTanData = {
	name:STATE.Punch,
	image:characterAtlas,
	clipX:148,
	clipY:ATLAS_ROW8,
	clipWidth:162,
	clipHeight:69,
	frameWidth:54,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50, 150, 225, 50],
	reverses:false,
	loops:false
};

const playerKickTanData = {
	name:STATE.Kick,
	image:characterAtlas,
	clipX:0,
	clipY:ATLAS_ROW8,
	clipWidth:148,
	clipHeight:69,
	frameWidth:49,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50, 150, 225, 50],
	reverses:false,
	loops:false
};

const playerKnockbackTanData = {
	name:STATE.KnockBack,
	image:characterAtlas,
	clipX:222,
	clipY:ATLAS_ROW2,
	clipWidth:312,
	clipHeight:69,
	frameWidth:78,
	frameCount:4,
	frames:[0, 1, 2, 3],
	frameTimes:[50],
	reverses:false,
	loops:false
};

//---------Start Player Brown Belt Atlas Data--------//

const playerIdleBrownData = {
	name:STATE.Idle,
	image:characterAtlas,
	clipX:142,
	clipY:ATLAS_ROW3,
	clipWidth:80,
	clipHeight:69,
	frameWidth:40,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[200],
	reverses:false,
	loops:true
};

const playerWalkBrownData = {
	name:STATE.WalkRight,
	image:characterAtlas,
	clipX:310,
	clipY:ATLAS_ROW9,
	clipWidth:109,
	clipHeight:69,
	frameWidth:36,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[200],
	reverses:false,
	loops:true
};

const playerPunchBrownData = {
	name:STATE.Punch,
	image:characterAtlas,
	clipX:148,
	clipY:ATLAS_ROW9,
	clipWidth:162,
	clipHeight:69,
	frameWidth:54,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50, 150, 225, 50],
	reverses:false,
	loops:false
};

const playerKickBrownData = {
	name:STATE.Kick,
	image:characterAtlas,
	clipX:0,
	clipY:ATLAS_ROW9,
	clipWidth:148,
	clipHeight:69,
	frameWidth:49,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50, 150, 225, 50],
	reverses:false,
	loops:false
};

const playerKnockbackBrownData = {
	name:STATE.KnockBack,
	image:characterAtlas,
	clipX:222,
	clipY:ATLAS_ROW3,
	clipWidth:312,
	clipHeight:69,
	frameWidth:78,
	frameCount:4,
	frames:[0, 1, 2, 3],
	frameTimes:[50],
	reverses:false,
	loops:false
};

//---------Start Player Red Belt Atlas Data--------//

const playerIdleRedData = {
	name:STATE.Idle,
	image:characterAtlas,
	clipX:142,
	clipY:ATLAS_ROW4,
	clipWidth:80,
	clipHeight:69,
	frameWidth:40,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[200],
	reverses:false,
	loops:true
};

const playerWalkRedData = {
	name:STATE.WalkRight,
	image:characterAtlas,
	clipX:310,
	clipY:ATLAS_ROW10,
	clipWidth:109,
	clipHeight:69,
	frameWidth:36,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[200],
	reverses:false,
	loops:true
};

const playerPunchRedData = {
	name:STATE.Punch,
	image:characterAtlas,
	clipX:148,
	clipY:ATLAS_ROW10,
	clipWidth:162,
	clipHeight:69,
	frameWidth:54,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50, 150, 225, 50],
	reverses:false,
	loops:false
};

const playerKickRedData = {
	name:STATE.Kick,
	image:characterAtlas,
	clipX:0,
	clipY:ATLAS_ROW10,
	clipWidth:148,
	clipHeight:69,
	frameWidth:49,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50, 150, 225, 50],
	reverses:false,
	loops:false
};

const playerKnockbackRedData = {
	name:STATE.KnockBack,
	image:characterAtlas,
	clipX:222,
	clipY:ATLAS_ROW4,
	clipWidth:312,
	clipHeight:69,
	frameWidth:78,
	frameCount:4,
	frames:[0, 1, 2, 3],
	frameTimes:[50],
	reverses:false,
	loops:false
};

//---------Start Player Black Belt Atlas Data--------//

const playerIdleBlackData = {
	name:STATE.Idle,
	image:characterAtlas,
	clipX:142,
	clipY:ATLAS_ROW5,
	clipWidth:80,
	clipHeight:69,
	frameWidth:40,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[200],
	reverses:false,
	loops:true
};

const playerWalkBlackData = {
	name:STATE.WalkRight,
	image:characterAtlas,
	clipX:310,
	clipY:ATLAS_ROW11,
	clipWidth:109,
	clipHeight:69,
	frameWidth:36,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[200],
	reverses:false,
	loops:true
};

const playerPunchBlackData = {
	name:STATE.Punch,
	image:characterAtlas,
	clipX:148,
	clipY:ATLAS_ROW11,
	clipWidth:162,
	clipHeight:69,
	frameWidth:54,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50, 150, 225, 50],
	reverses:false,
	loops:false
};

const playerKickBlackData = {
	name:STATE.Kick,
	image:characterAtlas,
	clipX:0,
	clipY:ATLAS_ROW11,
	clipWidth:148,
	clipHeight:69,
	frameWidth:49,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50, 150, 225, 50],
	reverses:false,
	loops:false
};

const playerKnockbackBlackData = {
	name:STATE.KnockBack,
	image:characterAtlas,
	clipX:222,
	clipY:ATLAS_ROW5,
	clipWidth:312,
	clipHeight:69,
	frameWidth:78,
	frameCount:4,
	frames:[0, 1, 2, 3],
	frameTimes:[50],
	reverses:false,
	loops:false
};

//---------Start Basic Enemy Atlas Data--------//

const wooshDashEnemyPicData = {
	name:STATE.Dash,
	image:characterAtlas,
	clipX:213,
	clipY:ATLAS_ROW12,
	clipWidth:142,
	clipHeight:142,
	frameWidth:142,
	frameCount:1,
	frames:[0],
	frameTimes:[225],
	reverses:false,
	loops:false
};

const wooshDashEnemyLPicData = {
	name:STATE.Dash,
	image:characterAtlas,
	clipX:284,
	clipY:ATLAS_ROW12,
	clipWidth:142,
	clipHeight:142,
	frameWidth:142,
	frameCount:1,
	frames:[0],
	frameTimes:[225],
	reverses:false,
	loops:false
};


//---------Start White Enemy Atlas Data--------//

const basicEnemyIdleData = {
	name:STATE.Idle,
	image:characterAtlas,
	clipX:568,
	clipY:ATLAS_ROW10,
	clipWidth:80,
	clipHeight:69,
	frameWidth:40,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[200],
	reverses:false,
	loops:true
};

const basicEnemyWalkData = {
	name:STATE.WalkRight,
	image:characterAtlas,
	clipX:750,
	clipY:ATLAS_ROW5,
	clipWidth:111,
	clipHeight:69,
	frameWidth:37,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[200],
	reverses:false,
	loops:true
};

const basicEnemyDashData = {
	name:STATE.Dash,
	image:characterAtlas,
	clipX:568,
	clipY:ATLAS_ROW0,
	clipWidth:111,
	clipHeight:69,
	frameWidth:37,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[75],
	reverses:false,
	loops:false
};

const basicEnemyJumpData = {
	name:STATE.Jump,
	image:characterAtlas,
	clipX:424,
	clipY:ATLAS_ROW6,
	clipWidth:123,
	clipHeight:69,
	frameWidth:41,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[50],
	reverses:false,
	loops:false
};

const basicEnemyCrouchData = {
	name:STATE.Crouch,
	image:characterAtlas,
	clipX:679,
	clipY:ATLAS_ROW0,
	clipWidth:55,
	clipHeight:69,
	frameWidth:55,
	frameCount:1,
	frames:[0],
	frameTimes:[200],
	reverses:false,
	loops:false
};

const basicEnemyPunchData = {
	name:STATE.Punch,
	image:characterAtlas,
	clipX:750,
	clipY:ATLAS_ROW0,
	clipWidth:159,
	clipHeight:69,
	frameWidth:53,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50, 150, 225, 50],
	reverses:false,
	loops:false
};

const basicEnemyKickData = {
	name:STATE.Kick,
	image:characterAtlas,
	clipX:568,
	clipY:ATLAS_ROW5,
	clipWidth:153,
	clipHeight:69,
	frameWidth:51,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50, 150, 225, 50],
	reverses:false,
	loops:false
};

const basicEnemyBlockData = {
	name:STATE.Block,
	image:characterAtlas,
	clipX:922,
	clipY:ATLAS_ROW0,
	clipWidth:39,
	clipHeight:69,
	frameWidth:39,
	frameCount:1,
	frames:[0],
	frameTimes:[200],
	reverses:false,
	loops:false
};

const basicEnemyKnockbackData = {
	name:STATE.KnockBack,
	image:characterAtlas,
	clipX:875,
	clipY:ATLAS_ROW5,
	clipWidth:32,
	clipHeight:69,
	frameWidth:32,
	frameCount:1,
	frames:[0],
	frameTimes:[625],
	reverses:false,
	loops:false
};

const basicEnemySweepData = {
	name:STATE.Sweep,
	image:characterAtlas,
	clipX:969,
	clipY:ATLAS_ROW0,
	clipWidth:55,
	clipHeight:69,
	frameWidth:55,
	frameCount:1,
	frames:[0],
	frameTimes:[225],
	reverses:false,
	loops:false
};

const basicEnemyJumpKickData = {
	name:STATE.J_Kick,
	image:characterAtlas,
	clipX:922,
	clipY:ATLAS_ROW5,
	clipWidth:102,
	clipHeight:69,
	frameWidth:51,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[75, 125],
	reverses:false,
	loops:false
};

const basicEnemyHKickData = {
	name:STATE.H_Kick,
	image:characterAtlas,
	clipX:660,
	clipY:ATLAS_ROW10,
	clipWidth:102,
	clipHeight:69,
	frameWidth:51,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[125, 125],
	reverses:false,
	loops:false
};

//---------Start Yellow Enemy Atlas Data--------//

const yellowEnemyIdleData = {
	name:STATE.Idle,
	image:characterAtlas,
	clipX:568,
	clipY:ATLAS_ROW11,
	clipWidth:80,
	clipHeight:69,
	frameWidth:40,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[200],
	reverses:false,
	loops:true
};

const yellowEnemyWalkData = {
	name:STATE.WalkRight,
	image:characterAtlas,
	clipX:750,
	clipY:ATLAS_ROW6,
	clipWidth:111,
	clipHeight:69,
	frameWidth:37,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[200],
	reverses:false,
	loops:true
};

const yellowEnemyDashData = {
	name:STATE.Dash,
	image:characterAtlas,
	clipX:568,
	clipY:ATLAS_ROW1,
	clipWidth:111,
	clipHeight:69,
	frameWidth:37,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[75],
	reverses:false,
	loops:false
};

const yellowEnemyJumpData = {
	name:STATE.Jump,
	image:characterAtlas,
	clipX:424,
	clipY:ATLAS_ROW7,
	clipWidth:123,
	clipHeight:69,
	frameWidth:41,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[50],
	reverses:false,
	loops:false
};

const yellowEnemyCrouchData = {
	name:STATE.Crouch,
	image:characterAtlas,
	clipX:679,
	clipY:ATLAS_ROW1,
	clipWidth:55,
	clipHeight:69,
	frameWidth:55,
	frameCount:1,
	frames:[0],
	frameTimes:[200],
	reverses:false,
	loops:false
};

const yellowEnemyPunchData = {
	name:STATE.Punch,
	image:characterAtlas,
	clipX:750,
	clipY:ATLAS_ROW1,
	clipWidth:159,
	clipHeight:69,
	frameWidth:53,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50, 150, 225, 50],
	reverses:false,
	loops:false
};

const yellowEnemyKickData = {
	name:STATE.Kick,
	image:characterAtlas,
	clipX:568,
	clipY:ATLAS_ROW6,
	clipWidth:153,
	clipHeight:69,
	frameWidth:51,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50, 150, 225, 50],
	reverses:false,
	loops:false
};

const yellowEnemyBlockData = {
	name:STATE.Block,
	image:characterAtlas,
	clipX:922,
	clipY:ATLAS_ROW1,
	clipWidth:39,
	clipHeight:69,
	frameWidth:39,
	frameCount:1,
	frames:[0],
	frameTimes:[200],
	reverses:false,
	loops:false
};

const yellowEnemyKnockbackData = {
	name:STATE.KnockBack,
	image:characterAtlas,
	clipX:875,
	clipY:ATLAS_ROW6,
	clipWidth:32,
	clipHeight:69,
	frameWidth:32,
	frameCount:1,
	frames:[0],
	frameTimes:[625],
	reverses:false,
	loops:false
};

const yellowEnemySweepData = {
	name:STATE.Sweep,
	image:characterAtlas,
	clipX:969,
	clipY:ATLAS_ROW1,
	clipWidth:55,
	clipHeight:69,
	frameWidth:55,
	frameCount:1,
	frames:[0],
	frameTimes:[225],
	reverses:false,
	loops:false
};

const yellowEnemyJumpKickData = {
	name:STATE.J_Kick,
	image:characterAtlas,
	clipX:922,
	clipY:ATLAS_ROW6,
	clipWidth:102,
	clipHeight:69,
	frameWidth:51,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[75, 125],
	reverses:false,
	loops:false
};

const yellowEnemyHKickData = {
	name:STATE.H_Kick,
	image:characterAtlas,
	clipX:660,
	clipY:ATLAS_ROW11,
	clipWidth:102,
	clipHeight:69,
	frameWidth:51,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[125, 125],
	reverses:false,
	loops:false
};

//---------Start Tan Enemy Atlas Data--------//

const tanEnemyIdleData = {
	name:STATE.Idle,
	image:characterAtlas,
	clipX:568,
	clipY:ATLAS_ROW12,
	clipWidth:80,
	clipHeight:69,
	frameWidth:40,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[200],
	reverses:false,
	loops:true
};

const tanEnemyWalkData = {
	name:STATE.WalkRight,
	image:characterAtlas,
	clipX:750,
	clipY:ATLAS_ROW7,
	clipWidth:111,
	clipHeight:69,
	frameWidth:37,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[200],
	reverses:false,
	loops:true
};

const tanEnemyDashData = {
	name:STATE.Dash,
	image:characterAtlas,
	clipX:568,
	clipY:ATLAS_ROW2,
	clipWidth:111,
	clipHeight:69,
	frameWidth:37,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[75],
	reverses:false,
	loops:false
};

const tanEnemyJumpData = {
	name:STATE.Jump,
	image:characterAtlas,
	clipX:424,
	clipY:ATLAS_ROW8,
	clipWidth:123,
	clipHeight:69,
	frameWidth:41,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[50],
	reverses:false,
	loops:false
};

const tanEnemyCrouchData = {
	name:STATE.Crouch,
	image:characterAtlas,
	clipX:679,
	clipY:ATLAS_ROW2,
	clipWidth:55,
	clipHeight:69,
	frameWidth:55,
	frameCount:1,
	frames:[0],
	frameTimes:[200],
	reverses:false,
	loops:false
};

const tanEnemyPunchData = {
	name:STATE.Punch,
	image:characterAtlas,
	clipX:750,
	clipY:ATLAS_ROW2,
	clipWidth:159,
	clipHeight:69,
	frameWidth:53,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50, 150, 225, 50],
	reverses:false,
	loops:false
};

const tanEnemyKickData = {
	name:STATE.Kick,
	image:characterAtlas,
	clipX:568,
	clipY:ATLAS_ROW7,
	clipWidth:153,
	clipHeight:69,
	frameWidth:51,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50, 150, 225, 50],
	reverses:false,
	loops:false
};

const tanEnemyBlockData = {
	name:STATE.Block,
	image:characterAtlas,
	clipX:922,
	clipY:ATLAS_ROW2,
	clipWidth:39,
	clipHeight:69,
	frameWidth:39,
	frameCount:1,
	frames:[0],
	frameTimes:[200],
	reverses:false,
	loops:false
};

const tanEnemyKnockbackData = {
	name:STATE.KnockBack,
	image:characterAtlas,
	clipX:875,
	clipY:ATLAS_ROW7,
	clipWidth:32,
	clipHeight:69,
	frameWidth:32,
	frameCount:1,
	frames:[0],
	frameTimes:[625],
	reverses:false,
	loops:false
};

const tanEnemySweepData = {
	name:STATE.Sweep,
	image:characterAtlas,
	clipX:969,
	clipY:ATLAS_ROW2,
	clipWidth:55,
	clipHeight:69,
	frameWidth:55,
	frameCount:1,
	frames:[0],
	frameTimes:[225],
	reverses:false,
	loops:false
};

const tanEnemyJumpKickData = {
	name:STATE.J_Kick,
	image:characterAtlas,
	clipX:922,
	clipY:ATLAS_ROW7,
	clipWidth:102,
	clipHeight:69,
	frameWidth:51,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[75, 125],
	reverses:false,
	loops:false
};

const tanEnemyHKickData = {
	name:STATE.H_Kick,
	image:characterAtlas,
	clipX:660,
	clipY:ATLAS_ROW12,
	clipWidth:102,
	clipHeight:69,
	frameWidth:51,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[125, 125],
	reverses:false,
	loops:false
};

//---------Start Brown Enemy Atlas Data--------//

const brownEnemyIdleData = {
	name:STATE.Idle,
	image:characterAtlas,
	clipX:568,
	clipY:ATLAS_ROW13,
	clipWidth:80,
	clipHeight:69,
	frameWidth:40,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[200],
	reverses:false,
	loops:true
};

const brownEnemyWalkData = {
	name:STATE.WalkRight,
	image:characterAtlas,
	clipX:750,
	clipY:ATLAS_ROW8,
	clipWidth:111,
	clipHeight:69,
	frameWidth:37,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[200],
	reverses:false,
	loops:true
};

const brownEnemyDashData = {
	name:STATE.Dash,
	image:characterAtlas,
	clipX:568,
	clipY:ATLAS_ROW3,
	clipWidth:111,
	clipHeight:69,
	frameWidth:37,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[75],
	reverses:false,
	loops:false
};

const brownEnemyJumpData = {
	name:STATE.Jump,
	image:characterAtlas,
	clipX:424,
	clipY:ATLAS_ROW9,
	clipWidth:123,
	clipHeight:69,
	frameWidth:41,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[50],
	reverses:false,
	loops:false
};

const brownEnemyCrouchData = {
	name:STATE.Crouch,
	image:characterAtlas,
	clipX:679,
	clipY:ATLAS_ROW3,
	clipWidth:55,
	clipHeight:69,
	frameWidth:55,
	frameCount:1,
	frames:[0],
	frameTimes:[200],
	reverses:false,
	loops:false
};

const brownEnemyPunchData = {
	name:STATE.Punch,
	image:characterAtlas,
	clipX:750,
	clipY:ATLAS_ROW3,
	clipWidth:159,
	clipHeight:69,
	frameWidth:53,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50, 150, 225, 50],
	reverses:false,
	loops:false
};

const brownEnemyKickData = {
	name:STATE.Kick,
	image:characterAtlas,
	clipX:568,
	clipY:ATLAS_ROW8,
	clipWidth:153,
	clipHeight:69,
	frameWidth:51,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50, 150, 225, 50],
	reverses:false,
	loops:false
};

const brownEnemyBlockData = {
	name:STATE.Block,
	image:characterAtlas,
	clipX:922,
	clipY:ATLAS_ROW3,
	clipWidth:39,
	clipHeight:69,
	frameWidth:39,
	frameCount:1,
	frames:[0],
	frameTimes:[200],
	reverses:false,
	loops:false
};

const brownEnemyKnockbackData = {
	name:STATE.KnockBack,
	image:characterAtlas,
	clipX:875,
	clipY:ATLAS_ROW8,
	clipWidth:32,
	clipHeight:69,
	frameWidth:32,
	frameCount:1,
	frames:[0],
	frameTimes:[625],
	reverses:false,
	loops:false
};

const brownEnemySweepData = {
	name:STATE.Sweep,
	image:characterAtlas,
	clipX:969,
	clipY:ATLAS_ROW3,
	clipWidth:55,
	clipHeight:69,
	frameWidth:55,
	frameCount:1,
	frames:[0],
	frameTimes:[225],
	reverses:false,
	loops:false
};

const brownEnemyJumpKickData = {
	name:STATE.J_Kick,
	image:characterAtlas,
	clipX:922,
	clipY:ATLAS_ROW8,
	clipWidth:102,
	clipHeight:69,
	frameWidth:51,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[75, 125],
	reverses:false,
	loops:false
};

const brownEnemyHKickData = {
	name:STATE.H_Kick,
	image:characterAtlas,
	clipX:660,
	clipY:ATLAS_ROW13,
	clipWidth:102,
	clipHeight:69,
	frameWidth:51,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[125, 125],
	reverses:false,
	loops:false
};

//---------Start Red Enemy Atlas Data--------//

const redEnemyIdleData = {
	name:STATE.Idle,
	image:characterAtlas,
	clipX:426,
	clipY:ATLAS_ROW11,
	clipWidth:80,
	clipHeight:69,
	frameWidth:40,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[200],
	reverses:false,
	loops:true
};

const redEnemyWalkData = {
	name:STATE.WalkRight,
	image:characterAtlas,
	clipX:750,
	clipY:ATLAS_ROW9,
	clipWidth:111,
	clipHeight:69,
	frameWidth:37,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[200],
	reverses:false,
	loops:true
};

const redEnemyDashData = {
	name:STATE.Dash,
	image:characterAtlas,
	clipX:568,
	clipY:ATLAS_ROW4,
	clipWidth:111,
	clipHeight:69,
	frameWidth:37,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[75],
	reverses:false,
	loops:false
};

const redEnemyJumpData = {
	name:STATE.Jump,
	image:characterAtlas,
	clipX:424,
	clipY:ATLAS_ROW10,
	clipWidth:123,
	clipHeight:69,
	frameWidth:41,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[50],
	reverses:false,
	loops:false
};

const redEnemyCrouchData = {
	name:STATE.Crouch,
	image:characterAtlas,
	clipX:679,
	clipY:ATLAS_ROW4,
	clipWidth:55,
	clipHeight:69,
	frameWidth:55,
	frameCount:1,
	frames:[0],
	frameTimes:[200],
	reverses:false,
	loops:false
};

const redEnemyPunchData = {
	name:STATE.Punch,
	image:characterAtlas,
	clipX:750,
	clipY:ATLAS_ROW4,
	clipWidth:159,
	clipHeight:69,
	frameWidth:53,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50, 150, 225, 50],
	reverses:false,
	loops:false
};

const redEnemyKickData = {
	name:STATE.Kick,
	image:characterAtlas,
	clipX:568,
	clipY:ATLAS_ROW9,
	clipWidth:153,
	clipHeight:69,
	frameWidth:51,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50, 150, 225, 50],
	reverses:false,
	loops:false
};

const redEnemyBlockData = {
	name:STATE.Block,
	image:characterAtlas,
	clipX:922,
	clipY:ATLAS_ROW9,
	clipWidth:39,
	clipHeight:69,
	frameWidth:39,
	frameCount:1,
	frames:[0],
	frameTimes:[200],
	reverses:false,
	loops:false
};

const redEnemyKnockbackData = {
	name:STATE.KnockBack,
	image:characterAtlas,
	clipX:875,
	clipY:ATLAS_ROW9,
	clipWidth:32,
	clipHeight:69,
	frameWidth:32,
	frameCount:1,
	frames:[0],
	frameTimes:[625],
	reverses:false,
	loops:false
};

const redEnemySweepData = {
	name:STATE.Sweep,
	image:characterAtlas,
	clipX:969,
	clipY:ATLAS_ROW4,
	clipWidth:55,
	clipHeight:69,
	frameWidth:55,
	frameCount:1,
	frames:[0],
	frameTimes:[225],
	reverses:false,
	loops:false
};

const redEnemyJumpKickData = {
	name:STATE.J_Kick,
	image:characterAtlas,
	clipX:922,
	clipY:ATLAS_ROW9,
	clipWidth:102,
	clipHeight:69,
	frameWidth:51,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[75, 125],
	reverses:false,
	loops:false
};

const redEnemyHKickData = {
	name:STATE.H_Kick,
	image:characterAtlas,
	clipX:762,
	clipY:ATLAS_ROW10,
	clipWidth:102,
	clipHeight:69,
	frameWidth:51,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[125, 125],
	reverses:false,
	loops:false
};

//---------Start Boss Atlas Data--------//

//---------Start Boss Yellow Belt Atlas Data--------//

const yellowBossIdleData = {
	name:STATE.Idle,
	image:bossAtlas,
	clipX:0,
	clipY:ATLAS_ROW0 + 2,
	clipWidth:304,
	clipHeight:67,
	frameWidth:38,
	frameCount:8,
	frames:[0, 1, 2, 3, 4, 5, 6, 7],
	frameTimes:[100],
	reverses:false,
	loops:true
};

const yellowBossWalkData = {
	name:STATE.WalkRight,
	image:bossAtlas,
	clipX:759,
	clipY:ATLAS_ROW0 + 2,
	clipWidth:144,
	clipHeight:67,
	frameWidth:36,
	frameCount:4,
	frames:[0, 1, 2, 3],
	frameTimes:[100],
	reverses:false,
	loops:true
};

const yellowBossPunchData = {
	name:STATE.Punch,
	image:bossAtlas,
	clipX:621,
	clipY:ATLAS_ROW0 + 2,
	clipWidth:120,
	clipHeight:67,
	frameWidth:36,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[100],
	reverses:false,
	loops:false
};

const yellowBossKickData = {
	name:STATE.Kick,
	image:bossAtlas,
	clipX:345,
	clipY:ATLAS_ROW0 + 2,
	clipWidth:228,
	clipHeight:67,
	frameWidth:57,
	frameCount:4,
	frames:[0, 1, 2, 3],
	frameTimes:[100],
	reverses:false,
	loops:false
};

const yellowBossCrouchData = {
	name:STATE.Crouch,
	image:bossAtlas,
	clipX:0,
	clipY:ATLAS_ROW5 + 2,
	clipWidth:31,
	clipHeight:67,
	frameWidth:31,
	frameCount:1,
	frames:[0],
	frameTimes:[100],
	reverses:false,
	loops:false
};

const yellowBossSweepData = {
	name:STATE.Sweep,
	image:bossAtlas,
	clipX:156,
	clipY:ATLAS_ROW5 + 2,
	clipWidth:100,
	clipHeight:67,
	frameWidth:50,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[100],
	reverses:false,
	loops:false
};

const yellowBossJumpData = {
	name:STATE.Jump,
	image:bossAtlas,
	clipX:0,
	clipY:ATLAS_ROW6 + 2,
	clipWidth:108,
	clipHeight:67,
	frameWidth:36,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50],
	reverses:false,
	loops:false
};

const yellowBossSpinKickData = {
	name:STATE.SpinKick,
	image:bossAtlas,
	clipX:140,
	clipY:ATLAS_ROW6 + 2,
	clipWidth:66,
	clipHeight:67,
	frameWidth:36,
	frameCount:6,
	frames:[0, 1, 2, 3, 2, 3, 2, 3, 4, 5],
	frameTimes:[50],
	reverses:false,
	loops:false
};

//---------Start Boss Tan Belt Atlas Data--------//

const tanBossIdleData = {
	name:STATE.Idle,
	image:bossAtlas,
	clipX:0,
	clipY:ATLAS_ROW1 + 2,
	clipWidth:304,
	clipHeight:67,
	frameWidth:38,
	frameCount:8,
	frames:[0, 1, 2, 3, 4, 5, 6, 7],
	frameTimes:[100],
	reverses:false,
	loops:true
};

const tanBossWalkData = {
	name:STATE.WalkRight,
	image:bossAtlas,
	clipX:759,
	clipY:ATLAS_ROW1 + 2,
	clipWidth:144,
	clipHeight:67,
	frameWidth:36,
	frameCount:4,
	frames:[0, 1, 2, 3],
	frameTimes:[100],
	reverses:false,
	loops:true
};

const tanBossPunchData = {
	name:STATE.Punch,
	image:bossAtlas,
	clipX:621,
	clipY:ATLAS_ROW1 + 2,
	clipWidth:120,
	clipHeight:67,
	frameWidth:36,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[100],
	reverses:false,
	loops:false
};

const tanBossKickData = {
	name:STATE.Kick,
	image:bossAtlas,
	clipX:345,
	clipY:ATLAS_ROW1 + 2,
	clipWidth:228,
	clipHeight:67,
	frameWidth:57,
	frameCount:4,
	frames:[0, 1, 2, 3],
	frameTimes:[100],
	reverses:false,
	loops:false
};

const tanBossCrouchData = {
	name:STATE.Crouch,
	image:bossAtlas,
	clipX:31,
	clipY:ATLAS_ROW5 + 2,
	clipWidth:31,
	clipHeight:67,
	frameWidth:31,
	frameCount:1,
	frames:[0],
	frameTimes:[100],
	reverses:false,
	loops:false
};

const tanBossSweepData = {
	name:STATE.Sweep,
	image:bossAtlas,
	clipX:256,
	clipY:ATLAS_ROW5 + 2,
	clipWidth:100,
	clipHeight:67,
	frameWidth:50,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[100],
	reverses:false,
	loops:false
};

const tanBossJumpData = {
	name:STATE.Jump,
	image:bossAtlas,
	clipX:0,
	clipY:ATLAS_ROW7 + 2,
	clipWidth:108,
	clipHeight:67,
	frameWidth:36,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50],
	reverses:false,
	loops:false
};

const tanBossSpinKickData = {
	name:STATE.SpinKick,
	image:bossAtlas,
	clipX:140,
	clipY:ATLAS_ROW6 + 2,
	clipWidth:66,
	clipHeight:67,
	frameWidth:36,
	frameCount:6,
	frames:[0, 1, 2, 3, 2, 3, 2, 3, 4, 5],
	frameTimes:[50],
	reverses:false,
	loops:false
};

//---------Start Boss Brown Belt Atlas Data--------//

const brownBossIdleData = {
	name:STATE.Idle,
	image:bossAtlas,
	clipX:0,
	clipY:ATLAS_ROW2 + 2,
	clipWidth:304,
	clipHeight:67,
	frameWidth:38,
	frameCount:8,
	frames:[0, 1, 2, 3, 4, 5, 6, 7],
	frameTimes:[100],
	reverses:false,
	loops:true
};

const brownBossWalkData = {
	name:STATE.WalkRight,
	image:bossAtlas,
	clipX:759,
	clipY:ATLAS_ROW2 + 2,
	clipWidth:144,
	clipHeight:67,
	frameWidth:36,
	frameCount:4,
	frames:[0, 1, 2, 3],
	frameTimes:[100],
	reverses:false,
	loops:true
};

const brownBossPunchData = {
	name:STATE.Punch,
	image:bossAtlas,
	clipX:621,
	clipY:ATLAS_ROW2 + 2,
	clipWidth:120,
	clipHeight:67,
	frameWidth:36,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[100],
	reverses:false,
	loops:false
};

const brownBossKickData = {
	name:STATE.Kick,
	image:bossAtlas,
	clipX:345,
	clipY:ATLAS_ROW2 + 2,
	clipWidth:228,
	clipHeight:67,
	frameWidth:57,
	frameCount:4,
	frames:[0, 1, 2, 3],
	frameTimes:[100],
	reverses:false,
	loops:false
};

const brownBossCrouchData = {
	name:STATE.Crouch,
	image:bossAtlas,
	clipX:62,
	clipY:ATLAS_ROW5 + 2,
	clipWidth:31,
	clipHeight:67,
	frameWidth:31,
	frameCount:1,
	frames:[0],
	frameTimes:[100],
	reverses:false,
	loops:false
};

const brownBossSweepData = {
	name:STATE.Sweep,
	image:bossAtlas,
	clipX:356,
	clipY:ATLAS_ROW5 + 2,
	clipWidth:100,
	clipHeight:67,
	frameWidth:50,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[100],
	reverses:false,
	loops:false
};

const brownBossJumpData = {
	name:STATE.Jump,
	image:bossAtlas,
	clipX:0,
	clipY:ATLAS_ROW8 + 2,
	clipWidth:108,
	clipHeight:67,
	frameWidth:36,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50],
	reverses:false,
	loops:false
};

const brownBossSpinKickData = {
	name:STATE.SpinKick,
	image:bossAtlas,
	clipX:140,
	clipY:ATLAS_ROW6 + 2,
	clipWidth:66,
	clipHeight:67,
	frameWidth:36,
	frameCount:6,
	frames:[0, 1, 2, 3, 2, 3, 2, 3, 4, 5],
	frameTimes:[50],
	reverses:false,
	loops:false
};

//---------Start Boss Red Belt Atlas Data--------//

const redBossIdleData = {
	name:STATE.Idle,
	image:bossAtlas,
	clipX:0,
	clipY:ATLAS_ROW3 + 2,
	clipWidth:304,
	clipHeight:67,
	frameWidth:38,
	frameCount:8,
	frames:[0, 1, 2, 3, 4, 5, 6, 7],
	frameTimes:[100],
	reverses:false,
	loops:true
};

const redBossWalkData = {
	name:STATE.WalkRight,
	image:bossAtlas,
	clipX:759,
	clipY:ATLAS_ROW3 + 2,
	clipWidth:144,
	clipHeight:67,
	frameWidth:36,
	frameCount:4,
	frames:[0, 1, 2, 3],
	frameTimes:[100],
	reverses:false,
	loops:true
};

const redBossPunchData = {
	name:STATE.Punch,
	image:bossAtlas,
	clipX:621,
	clipY:ATLAS_ROW3 + 2,
	clipWidth:120,
	clipHeight:67,
	frameWidth:36,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[100],
	reverses:false,
	loops:false
};

const redBossKickData = {
	name:STATE.Kick,
	image:bossAtlas,
	clipX:345,
	clipY:ATLAS_ROW3 + 2,
	clipWidth:228,
	clipHeight:67,
	frameWidth:57,
	frameCount:4,
	frames:[0, 1, 2, 3],
	frameTimes:[100],
	reverses:false,
	loops:false
};

const redBossCrouchData = {
	name:STATE.Crouch,
	image:bossAtlas,
	clipX:93,
	clipY:ATLAS_ROW5 + 2,
	clipWidth:31,
	clipHeight:67,
	frameWidth:31,
	frameCount:1,
	frames:[0],
	frameTimes:[100],
	reverses:false,
	loops:false
};

const redBossSweepData = {
	name:STATE.Sweep,
	image:bossAtlas,
	clipX:456,
	clipY:ATLAS_ROW5 + 2,
	clipWidth:100,
	clipHeight:67,
	frameWidth:50,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[100],
	reverses:false,
	loops:false
};

const redBossJumpData = {
	name:STATE.Jump,
	image:bossAtlas,
	clipX:0,
	clipY:ATLAS_ROW9 + 2,
	clipWidth:108,
	clipHeight:67,
	frameWidth:36,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50],
	reverses:false,
	loops:false
};

const redBossSpinKickData = {
	name:STATE.SpinKick,
	image:bossAtlas,
	clipX:140,
	clipY:ATLAS_ROW6 + 2,
	clipWidth:66,
	clipHeight:67,
	frameWidth:36,
	frameCount:6,
	frames:[0, 1, 2, 3, 2, 3, 2, 3, 4, 5],
	frameTimes:[50],
	reverses:false,
	loops:false
};

//---------Start Boss Black Belt Atlas Data--------//

const blackBossIdleData = {
	name:STATE.Idle,
	image:bossAtlas,
	clipX:0,
	clipY:ATLAS_ROW4 + 2,
	clipWidth:304,
	clipHeight:67,
	frameWidth:38,
	frameCount:8,
	frames:[0, 1, 2, 3, 4, 5, 6, 7],
	frameTimes:[100],
	reverses:false,
	loops:true
};

const blackBossWalkData = {
	name:STATE.WalkRight,
	image:bossAtlas,
	clipX:759,
	clipY:ATLAS_ROW4 + 2,
	clipWidth:144,
	clipHeight:67,
	frameWidth:36,
	frameCount:4,
	frames:[0, 1, 2, 3],
	frameTimes:[100],
	reverses:false,
	loops:true
};

const blackBossPunchData = {
	name:STATE.Punch,
	image:bossAtlas,
	clipX:621,
	clipY:ATLAS_ROW4 + 2,
	clipWidth:120,
	clipHeight:67,
	frameWidth:36,
	frameCount:3,
	frames:[0, 1, 2],
	frameTimes:[100],
	reverses:false,
	loops:false
};

const blackBossKickData = {
	name:STATE.Kick,
	image:bossAtlas,
	clipX:345,
	clipY:ATLAS_ROW4 + 2,
	clipWidth:228,
	clipHeight:67,
	frameWidth:57,
	frameCount:4,
	frames:[0, 1, 2, 3],
	frameTimes:[100],
	reverses:false,
	loops:false
};

const blackBossCrouchData = {
	name:STATE.Crouch,
	image:bossAtlas,
	clipX:124,
	clipY:ATLAS_ROW5 + 2,
	clipWidth:31,
	clipHeight:67,
	frameWidth:31,
	frameCount:1,
	frames:[0],
	frameTimes:[100],
	reverses:false,
	loops:false
};

const blackBossSweepData = {
	name:STATE.Sweep,
	image:bossAtlas,
	clipX:556,
	clipY:ATLAS_ROW5 + 2,
	clipWidth:100,
	clipHeight:67,
	frameWidth:50,
	frameCount:2,
	frames:[0, 1],
	frameTimes:[100],
	reverses:false,
	loops:false
};

const blackBossJumpData = {
	name:STATE.Jump,
	image:bossAtlas,
	clipX:0,
	clipY:ATLAS_ROW10 + 2,
	clipWidth:108,
	clipHeight:67,
	frameWidth:36,
	frameCount:3,
	frames:[0, 1, 2, 1],
	frameTimes:[50],
	reverses:false,
	loops:false
};

const blackBossSpinKickData = {
	name:STATE.SpinKick,
	image:bossAtlas,
	clipX:140,
	clipY:ATLAS_ROW6 + 2,
	clipWidth:66,
	clipHeight:67,
	frameWidth:36,
	frameCount:6,
	frames:[0, 1, 2, 3, 2, 3, 2, 3, 4, 5],
	frameTimes:[50],
	reverses:false,
	loops:false
};

//end of boss data

const vaseData = {
	name:"vase1",
	clipX:0,
	clipY:0,
	clipWidth: 35,
	clipHeight: 35,
	frameWidth:35,
	frameCount:1,
	frames:[0],
	frameTimes:[200],
	reverses:false,
	loops:true
};

//Environment Data
const bambooLightData = {
	name:"bambooLight",
	clipX:0,
	clipY:0,
	clipWidth:80,
	clipHeight:371
};

const bambooDarkData = {
	name:"bambooDark",
	clipX:80,
	clipY:0,
	clipWidth:62,
	clipHeight:370
};

const waterfallSheetData = {
	name:"waterfallSheet",
	clipX:142,
	clipY:0,
	clipWidth:800,
	clipHeight:133
};

const spearData = {
	name:"spear",
	clipX:947,
	clipY:0,
	clipWidth:77,
	clipHeight:77
};

const statueData = {
	name:"statue",
	clipX:960,
	clipY:77,
	clipWidth:64,
	clipHeight:93
};

const carpetData = {
	name:"carpet",
	clipX:142,
	clipY:133,
	clipWidth:162,
	clipHeight:162
};

const carpet2Data = {
	name:"carpet2",
	clipX:241,
	clipY:298,
	clipWidth:162,
	clipHeight:242
};

const wallArtSnakeData = {
	name:"snakeArt",
	clipX:304,
	clipY:133,
	clipWidth:125,
	clipHeight:165
};

const wallArtLeopardData = {
	name:"leopardArt",
	clipX:429,
	clipY:133,
	clipWidth:108,
	clipHeight:173
};

const wallArtCraneData = {
	name:"craneArt",
	clipX:537,
	clipY:133,
	clipWidth:154,
	clipHeight:119
};

const wallArtTigerData = {
	name:"tigerArt",
	clipX:691,
	clipY:133,
	clipWidth:116,
	clipHeight:152
};

const wallArtDragonData = {
	name:"dragonArt",
	clipX:334,
	clipY:583,
	clipWidth:330,
	clipHeight:171
};

const paintingData = {
	name:"painting",
	clipX:842,
	clipY:170,
	clipWidth:182,
	clipHeight:268
};

const roofTileBottomData = {
	name:"roofTileBottom",
	clipX:143,
	clipY:295,
	clipWidth:74,
	clipHeight:72
};

const wallGradientData = {
	name:"wallGradient",
	clipX:403,
	clipY:316,
	clipWidth:202,
	clipHeight:212
};

const tableData = {
	name:"table",
	clipX:538,
	clipY:252,
	clipWidth:72,
	clipHeight:64
};

const lampData = {
	name:"lamp",
	clipX:610,
	clipY:252,
	clipWidth:46,
	clipHeight:74
};

const titleScreenBirdData = {
	name:"birdAnimation",
	clipX:656,
	clipY:286,
	clipWidth:164,
	clipHeight:24
};

const HTGDpaintingData = {
	name:"HTGDLogoScroll",
	clipX:605,
	clipY:326,
	clipWidth:178,
	clipHeight:257
};

const selectorData = {
	name:"selector",
	clipX:784,
	clipY:326,
	clipWidth:40,
	clipHeight:40
};

const wooshHurtPicData = {
	name:"wooshHurt",
	clipX:783,
	clipY:366,
	clipWidth:58,
	clipHeight:58
};

const wooshKnockoutPicData = {
	name:"wooshKnockout",
	clipX:783,
	clipY:424,
	clipWidth:58,
	clipHeight:58
};

const smokeSpriteData = {
	name:"smoke",
	clipX:786,
	clipY:482,
	clipWidth:41,
	clipHeight:42
};

const starSpriteData = {
	name:"star",
	clipX:793,
	clipY:524,
	clipWidth:22,
	clipHeight:22
};

const lvl1ColumnData = {
	name:"lvl1Column",
	clipX:0,
	clipY:371,
	clipWidth:47,
	clipHeight:475
};

const lvl2ColumnData = {
	name:"lvl2Column",
	clipX:47,
	clipY:371,
	clipWidth:47,
	clipHeight:475
};

const lvl3ColumnData = {
	name:"lvl3Column",
	clipX:94,
	clipY:371,
	clipWidth:47,
	clipHeight:475
};

const lvl4ColumnData = {
	name:"lvl4Column",
	clipX:141,
	clipY:371,
	clipWidth:47,
	clipHeight:475
};

const lvl5ColumnData = {
	name:"lvl5Column",
	clipX:188,
	clipY:371,
	clipWidth:47,
	clipHeight:475
};

const roofTileTopData = {
	name:"roofTileBricks",
	clipX:666,
	clipY:583,
	clipWidth:74,
	clipHeight:90
};

const tempLeftWallData = {
	name:"roofTileBricks",
	clipX:908,
	clipY:550,
	clipWidth:58,
	clipHeight:474
};

const tempRightWallData = {
	name:"roofTileBricks",
	clipX:966,
	clipY:550,
	clipWidth:58,
	clipHeight:474
};
