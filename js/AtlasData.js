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