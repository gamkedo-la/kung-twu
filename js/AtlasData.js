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