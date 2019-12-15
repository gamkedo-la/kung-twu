//Globals
//----------Localization---------------//
const Language = {
	English:"English",
	Spanish:"Spanish",
	Japanese:"Japanese",
	French:"French",
	Russian:"Russian",
	Polish:"Polish"
};

//----------Drawing and Canvas---------//
let canvas;
/** @type CanvasRenderingContext2D */
let canvasContext;
let currentLanguage;

let DEBUG = false;
let CHEATS_ACTIVE = false;

const canvasClearColor = "black";

const VASE_PIECES = [];

const Color = {
	Red: "red",
	Blue: "blue",
	Green: "green",
	White: "white",
	Black: "black",
	Yellow: "yellow",
	Purple: "purple",
	Aqua: "aqua",
	Orange: "orange",
	Tan:"tan",
	Brown:"brown",
	SaddleBrown:"SaddleBrown",
	Grey:"grey",
	DarkGrey:"darkgrey"
};

const InitializedImages = {
	basicWhite:false,
	basicYellow:false,
	basicTan:false,
	basicBrown:false,
	basicRed:false,
	bossYellow:false,
	bossTan:false,
	bossBrown:false,
	bossRed:false,
	bossBlack:false,
	playerWhite:false,
	playerYellow:false,
	playerTan:false,
	playerBrown:false,
	playerRed:false,
	playerBlack:false
};

/** @type IProgressBarConfig */
let UIProgressBarDefaults;

//--------------Player-----------------//
let player = null;
let playerBelt;
let aiManager = null;
/** @type KeyMapper */
let keyMapper = null;
/** @type InputProcessor */
let inputProcessor = null;
let animationManager = null;

//-------------Camera------------------//
const deadZoneHalfWidth = 25;

//---------------Persistence-----------//
const BELT = {
	White:0,
	Yellow:1,
	Tan:2,
	Brown:3,
	Red:4,
	Black:5
};

const ASSIST_DEFAULT = {
	MaxHealth:100,
	StartBelt:BELT.White,
	StartLevel:1,
	BaseEnemyHealth:20,
	EnemyBaseStrength:5,
	BossBaseHealth:100,
	BossBaseStrength:10,
	PlayerBaseDamage:10,
	InvincibleDuration:1000,
	KnockbackSpeed:800,
	EnemiesPerLevel:10,
	LevelTime:100,
	GangCount:1,
	GameSpeed:5
};

/** @type LocalStorageHelper */
let localStorageHelper;
/** Contains keys of data to store in the browser's local storage */
const localStorageKey = {
	Version: "kungTwu-Version",
	GameVolume: "kungTwu-GameVolume",
	MusicVolume: "kungTwu-MusicVolume",
	SFXVolume: "kungTwu-EffectsVolume",
	Language: "kungTwu-Language",
	FirstLoad: "kungTwu-FirstLoad",
	WalkLeftKeys: "kungTwu-WalkLeft",
	WalkRightKeys: "kungTwu-WalkRight",
	JumpKeys: "kungTwu-Jump",
	DashKeys: "kungTwu-Dash",
	BlockKeys: "kungTwu-Block",
	CrouchKeys: "kungTwu-Crouch",
	KickKeys: "kungTwu-Kick",
	PunchKeys: "kungTwu-Punch",
	HighScore:"kungTwu-HighScore",
	PlayerMaxHealth:"kungTwu-PlayerMaxHealth",
	StartingBelt:"kungTwu-StartingBelt",
	StartingLevel:"kungTwu-StartingLevel",
	BaseEnemyHealth:"kungTwu-BaseEnemyHealth",
	PlayerBaseDamage:"kungTwu-PlayerBaseDamage",
	InvincibleDuration:"kungTwu-InvincibleDuration",
	KnockbackSpeed:"kungTwu-KnockbackSpeed",
	EnemyStrength:"kungTwu-EnemyStrength",
	BossStrength:"kungTwu-BossStrength",
	BossHealth:"kungTwu-BossHealth",
	EnemiesPerLevel:"kungTwu-EnemiesPerLevel",
	LevelTime:"kungTwu-LevelTime",
	GangCount:"kungTwu-GangCount",
	GameSpeed:"kungTwu-GameSpeed"
};

const VALUES = {
	Version: 1.1,
	GameVolume: 10,
	MusicVolume: 10,
	SFXVolume: 10,
	Language: Language.English,
	FirstLoad: true,
	WalkLeftKeys: undefined,
	WalkRightKeys: undefined,
	JumpKeys: undefined,
	DashKeys: undefined,
	BlockKeys: undefined,
	CrouchKeys: undefined,
	KickKeys: undefined,
	PunchKeys: undefined,
	HighScore: 0,
	PlayerMaxHealth: ASSIST_DEFAULT.MaxHealth,
	StartingBelt: ASSIST_DEFAULT.StartBelt,
	StartingLevel: ASSIST_DEFAULT.StartLevel,
	BaseEnemyHealth: ASSIST_DEFAULT.BaseEnemyHealth,
	PlayerBaseDamage: ASSIST_DEFAULT.PlayerBaseDamage,
	InvincibleDuration: ASSIST_DEFAULT.InvincibleDuration,
	KnockbackSpeed: ASSIST_DEFAULT.KnockbackSpeed,
	EnemyStrength: ASSIST_DEFAULT.EnemyBaseStrength,
	BossStrength: ASSIST_DEFAULT.BossBaseStrength,
	BossHealth: ASSIST_DEFAULT.BossBaseHealth,
	EnemiesPerLevel: ASSIST_DEFAULT.EnemiesPerLevel,
	LevelTime: ASSIST_DEFAULT.LevelTime,
	GangCount: ASSIST_DEFAULT.GangCount,
	GameSpeed: ASSIST_DEFAULT.GameSpeed,
};

const setValueForKeyName = function(keyName, value) {
	switch(keyName) {
	case localStorageKey.Version: 
		VALUES.Version = value;
		break;
	case localStorageKey.GameVolume: 
		VALUES.GameVolume = value;
		break;
	case localStorageKey.MusicVolume: 
		VALUES.MusicVolume = value;
		break;
	case localStorageKey.SFXVolume: 
		VALUES.SFXVolume = value;
		break;
	case localStorageKey.Language: 
		VALUES.Language = value;
		break;
	case localStorageKey.FirstLoad: 
		VALUES.FirstLoad = value;
		break;
	case localStorageKey.WalkLeftKeys: 
		VALUES.WalkLeftKeys = value;
		break;
	case localStorageKey.WalkRightKeys: 
		VALUES.WalkRightKeys = value;
		break;
	case localStorageKey.JumpKeys: 
		VALUES.JumpKeys = value;
		break;
	case localStorageKey.DashKeys: 
		VALUES.DashKeys = value;
		break;
	case localStorageKey.BlockKeys: 
		VALUES.BlockKeys = value;
		break;
	case localStorageKey.CrouchKeys: 
		VALUES.CrouchKeys = value;
		break;
	case localStorageKey.KickKeys: 
		VALUES.KickKeys = value;
		break;
	case localStorageKey.PunchKeys: 
		VALUES.PunchKeys = value;
		break;
	case localStorageKey.HighScore: 
		VALUES.HighScore = value;
		break;
	case localStorageKey.PlayerMaxHealth: 
		VALUES.PlayerMaxHealth = value;
		break;
	case localStorageKey.StartingBelt: 
		VALUES.StartingBelt = value;
		break;
	case localStorageKey.StartingLevel: 
		VALUES.StartingLevel = value;
		break;
	case localStorageKey.BaseEnemyHealth: 
		VALUES.BaseEnemyHealth = value;
		break;
	case localStorageKey.PlayerBaseDamage: 
		VALUES.PlayerBaseDamage = value;
		break;
	case localStorageKey.InvincibleDuration: 
		VALUES.InvincibleDuration = value;
		break;
	case localStorageKey.KnockbackSpeed: 
		VALUES.KnockbackSpeed = value;
		break;
	case localStorageKey.EnemyStrength: 
		VALUES.EnemyStrength = value;
		break;
	case localStorageKey.BossStrength: 
		VALUES.BossStrength = value;
		break;
	case localStorageKey.BossHealth: 
		VALUES.BossHealth = value;
		break;
	case localStorageKey.EnemiesPerLevel: 
		VALUES.EnemiesPerLevel = value;
		break;
	case localStorageKey.LevelTime: 
		VALUES.LevelTime = value;
		break;
	case localStorageKey.GangCount: 
		VALUES.GangCount = value;
		break;
	case localStorageKey.GameSpeed: 
		VALUES.GameSpeed = value;
		break;
	}
};

const valueForKeyName = function(keyName) {
	switch(keyName) {
	case localStorageKey.Version: return VALUES.Version;
	case localStorageKey.GameVolume: return VALUES.GameVolume;
	case localStorageKey.MusicVolume: return VALUES.MusicVolume;
	case localStorageKey.SFXVolume: return VALUES.SFXVolume;
	case localStorageKey.Language: return VALUES.Language;
	case localStorageKey.FirstLoad: return VALUES.FirstLoad;
	case localStorageKey.WalkLeftKeys: return VALUES.WalkLeftKeys;
	case localStorageKey.WalkRightKeys: return VALUES.WalkRightKeys;
	case localStorageKey.JumpKeys: return VALUES.JumpKeys;
	case localStorageKey.DashKeys: return VALUES.DashKeys;
	case localStorageKey.BlockKeys: return VALUES.BlockKeys;
	case localStorageKey.CrouchKeys: return VALUES.CrouchKeys;
	case localStorageKey.KickKeys: return VALUES.KickKeys;
	case localStorageKey.PunchKeys: return VALUES.PunchKeys;
	case localStorageKey.HighScore: return VALUES.HighScore;
	case localStorageKey.PlayerMaxHealth: return VALUES.PlayerMaxHealth;
	case localStorageKey.StartingBelt: return VALUES.StartingBelt;
	case localStorageKey.StartingLevel: return VALUES.StartingLevel;
	case localStorageKey.BaseEnemyHealth: return VALUES.BaseEnemyHealth;
	case localStorageKey.PlayerBaseDamage: return VALUES.PlayerBaseDamage;
	case localStorageKey.InvincibleDuration: return VALUES.InvincibleDuration;
	case localStorageKey.KnockbackSpeed: return VALUES.KnockbackSpeed;
	case localStorageKey.EnemyStrength: return VALUES.EnemyStrength;
	case localStorageKey.BossStrength: return VALUES.BossStrength;
	case localStorageKey.BossHealth: return VALUES.BossHealth;
	case localStorageKey.EnemiesPerLevel: return VALUES.EnemiesPerLevel;
	case localStorageKey.LevelTime: return VALUES.LevelTime;
	case localStorageKey.GangCount: return VALUES.GangCount;
	case localStorageKey.GameSpeed: return VALUES.GameSpeed;
	}
};

//----------State Management----------//
let pauseManager;
let wooshFX;
let foregroundDecorations;
let wallDecorations;

const CAUSE = {
	Keypress: "keypress",
	Focus: "focus"
};

const SCENE = {
	TITLE: "title",
	SETTINGS: "settings",
	CREDITS: "credits",
	HELP: "help",
	ASSIST: "assist",
	SLIDER: "slider",
	PAUSE: "pause",
	CONTROLS: "controls",
	LEVEL_INTRO:"levelIntro",
	GAME: "game",
	POWERUP:"powerUp",
	ENDING: "ending"
};

const STATE = {
	Idle:"idle",
	WalkLeft:"walkLeft",
	WalkRight:"walkRight",
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
	Crouch:"crouch",
	Hit:"hit",
	Jump:"jump",
	Release:"release",
	Punch:"punch",
	Kick:"kick",
	Land:"land",
	End:"end",
	Block:"block",
	Dash:"dash",
	NoChange:"noChange"
};

/**
 * Tracks whether the user has yet interacted with the window.
 * Scope: Global
 */
let didInteract = false;

/** 
 * Global Chronogram instance
 * Register your event for stopwatch-like timing in milliseconds.
 * Please look at Chronogram.js for more info on how to use it.
 * @type Chronogram 
 */
let timer;

const TOTAL_LEVELS = 5;
let currentLevel = 1;

const SLIDER_NAMES = {
	MaxHealth:"maxHealth",
	StartBelt:"startBelt",
	StartLevel:"startLevel",
	BaseEnemyHealth:"baseEnemyHealth",
	EnemyBaseStrength:"enemyBaseStrength",
	BossBaseHealth:"bossBaseHealth",
	BossBaseStrength:"bossBaseStrength",
	PlayerBaseDamage:"playerBaseDamage",
	InvincibleDuration:"invincibleDuration",
	KnockbackSpeed:"knockbackSpeed",
	EnemiesPerLevel:"enemiesPerLevel",
	LevelTime:"levelTime",
	GangCount:"gangCount",
	GameSpeed:"gameSpeed",
	GameVolume:"gameVolume",
	MusicVolume:"musicVolume",
	SFXVolume:"sfxVolume"
};

//------------Asset Management----------//
const assetPath = {
	Audio: "./audio/",
	Image: "images/"
};

//----------Collision Management---------//
const GAME_FIELD = {
	//configured in Main.js
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	right: 0,
	bottom: 0,
	midX: 0,
	midY: 0
};
/**
 * Flag for debugging colliders. Will draw them if set to true.
 */
const DRAW_COLLIDERS = false;
/**
 * CSS color string for setting debug collider color. 
 * Make sure DRAW_COLLIDERS global flag is set to true to see.
 */
const COLLIDER_COLOR = "yellow";

const ENTITY_TYPE = {
	Player: "player",
	Enemy: "enemy",
	Floor: "floor",
	Environment:"environment"
};

//---------------Audio------------------//
let isMuted = false;

//------------Text------------------//
const TextAlignment = {
	Left: "left",
	Right: "right",
	Center: "center"
}; Object.freeze(TextAlignment);

const Fonts = {
	MainTitle: "40px Tahoma",
	Subtitle: "30px Tahoma",
	ButtonTitle: "20px Tahoma",
	CreditsText: "16px Tahoma",
	BoldCredits: "bold 18px Tahoma"
};

/** @type fontSystem */
let JPFont;
const CHAR_SIZE = {
	width:82,
	height:82
};

const fontOverhangRatio = 4 / 5; // Currently 4/5 is correct for "Tahoma" font. Change if font changes

//////////////////////////////////////
//------------- Input --------------//
//////////////////////////////////////
/** @type InputManager */
let input;
/**
 * Keys to reference Action KeySets stored in the KeyMapper
 */
const ACTION_KEYS = {
	WALK_LEFT:"walkLeft",
	WALK_RIGHT:"walkRight",
	JUMP:"jump",
	DASH:"dash",
	BLOCK:"block",
	CROUCH:"crouch",
	KICK:"kick",
	PUNCH:"punch",
}; Object.freeze(ACTION_KEYS);

/**
 * Keys to reference Nav KeySets stored in the KeyMapper
 */
const NAV_KEYS = {
	UP:"navUp",
	DOWN:"navDown",
	LEFT:"navLeft",
	RIGHT:"navRight",
	SELECT:"navSelect",
	BACK:"navBack",
	PAUSE:"navPause"
}; Object.freeze(NAV_KEYS);

/**
 * A list of Navigation Actions
 */
const NAV_ACTION = {
	UP:"navUp",
	DOWN:"navDown",
	LEFT:"navLeft",
	RIGHT:"navRight",
	SELECT:"navSelect",
	BACK:"navBack",
	PAUSE:"navPause"
}; Object.freeze(NAV_ACTION);

/**
 * Represents the type of action of a KeySet
 */
const ACTION_TYPE = {
	ACTION: "ACTION",
	NAV: "NAV"
}; Object.freeze(ACTION_TYPE);

/**
 * Input Codes matching with KeyboardEvent keyCode's. Used when querying input
 */
const KeyCode = {
	BACKSPACE: 8, TAB: 9, ENTER: 13, ESCAPE: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40,
	DIGIT_0: 48, DIGIT_1: 49, DIGIT_2: 50, DIGIT_3: 51, DIGIT_4: 52, DIGIT_5: 53, DIGIT_6: 54, DIGIT_7: 55, DIGIT_8: 56, DIGIT_9: 57,
	A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81,   R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90,
	PLUS: 187, MINUS: 189, TILDE: 192
}; Object.freeze(KeyCode);

/**
 * Way to translate from an index into KeyCode to get a printable word, used for key remapping
 */
const KeyName = [];
KeyName[KeyCode.BACKSPACE] = "Backspace";
KeyName[KeyCode.TAB] = "Tab";
KeyName[KeyCode.ENTER] = "Enter";
KeyName[KeyCode.ESCAPE] = "Esc";
KeyName[KeyCode.SPACE] = "Space";
KeyName[KeyCode.LEFT] = "LeftArrow";
KeyName[KeyCode.UP] = "UpArrow";
KeyName[KeyCode.RIGHT] = "RightArrow";
KeyName[KeyCode.DOWN] = "DownArrow";
KeyName[KeyCode.DIGIT_0] = "0";
KeyName[KeyCode.DIGIT_1] = "1";
KeyName[KeyCode.DIGIT_2] = "2";
KeyName[KeyCode.DIGIT_3] = "3";
KeyName[KeyCode.DIGIT_4] = "4";
KeyName[KeyCode.DIGIT_5] = "5";
KeyName[KeyCode.DIGIT_6] = "6";
KeyName[KeyCode.DIGIT_7] = "7";
KeyName[KeyCode.DIGIT_8] = "8";
KeyName[KeyCode.DIGIT_9] = "9";
KeyName[KeyCode.A] = "A";
KeyName[KeyCode.B] = "B";
KeyName[KeyCode.C] = "C";
KeyName[KeyCode.D] = "D";
KeyName[KeyCode.E] = "E";
KeyName[KeyCode.F] = "F";
KeyName[KeyCode.G] = "G";
KeyName[KeyCode.H] = "H";
KeyName[KeyCode.I] = "I";
KeyName[KeyCode.J] = "J";
KeyName[KeyCode.K] = "K";
KeyName[KeyCode.L] = "L";
KeyName[KeyCode.M] = "M";
KeyName[KeyCode.N] = "N";
KeyName[KeyCode.O] = "O";
KeyName[KeyCode.P] = "P";
KeyName[KeyCode.Q] = "Q";
KeyName[KeyCode.R] = "R";
KeyName[KeyCode.S] = "S";
KeyName[KeyCode.T] = "T";
KeyName[KeyCode.U] = "U";
KeyName[KeyCode.V] = "V";
KeyName[KeyCode.W] = "W";
KeyName[KeyCode.X] = "X";
KeyName[KeyCode.Y] = "Y";
KeyName[KeyCode.Z] = "Z";
KeyName[KeyCode.PLUS] = "+";
KeyName[KeyCode.MINUS] = "-";
KeyName[KeyCode.TILDE] = "~";
// can add non-keycode strings here to prettify phrasing in key remapper of inputs
KeyName["leftStickLeft"] = "Stick_1_Left";
function lookupKeyName(withCode) { // print nice name, if one is defined above
	var returnCode = KeyName[withCode];
	if(returnCode) {
		return returnCode;
	}
	return withCode; // no keyName available, use string
}

/**
 * Input Codes representing Mouse buttons. Used when querying input
 */
const MouseButton = {
	LEFT: "LeftMouseButton",
	RIGHT: "RightMouseButton"
}; Object.freeze(MouseButton);

/**
 * Globally accessible mouse positions that are automatically updated
 * for anyone to read.
 */
let mouseY = 0;
let mouseX = 0;

// Gamepad Buttons 
const CROSS_BUTTON = "cross";
const CIRCLE_BUTTON = "circle";
const SQUARE_BUTTON = "square";
const TRIANGLE_BUTTON = "triangle";
const LEFT_STICK_BUTTON = "leftStickButton";
const RIGHT_STICK_BUTTON = "rightStickButton";
const LEFT_STICK_LEFT = "leftStickLeft";
const LEFT_STICK_RIGHT = "leftStickRight";
const LEFT_STICK_UP = "leftStickUp";
const LEFT_STICK_DOWN = "leftStickDown";
const RIGHT_STICK_LEFT = "rightStickLeft";
const RIGHT_STICK_RIGHT = "rightStickRight";
const RIGHT_STICK_UP = "rightStickUp";
const RIGHT_STICK_DOWN = "rightStickDown";
const L1_BUTTON = "l1";
const L2_BUTTON = "l2";
const R1_BUTTON = "r1";
const R2_BUTTON = "r2";
const PAD_SHARE = "padShare";
const PAD_OPTIONS = "padOptions";
const PAD_POWER = "padPower";
const DPAD_LEFT = "DPadLeft";
const DPAD_RIGHT = "DPadRight";
const DPAD_UP = "DPadUp";
const DPAD_DOWN = "DPadDown";

const heldButtons = [];

const ALIAS = {
	UP:KeyCode.UP,
	DOWN:KeyCode.DOWN,
	LEFT:KeyCode.LEFT,
	RIGHT:KeyCode.RIGHT,
	SELECT1:KeyCode.ENTER,
	SELECT2:KeyCode.SPACE,
	HELP:KeyCode.H,
	ASSIST:KeyCode.Z,
	SETTINGS:KeyCode.S,
	CREDITS:KeyCode.C,
	BACK:KeyCode.ESCAPE,
	CHEATS:KeyCode.O,
	DEBUG:KeyCode.TILDE,
	POINTER:MouseButton.LEFT,
	CONTEXT:MouseButton.RIGHT,
	PAUSE:KeyCode.P,
	QUIT:KeyCode.Q,
	VOLUME_UP:KeyCode.PLUS,
	VOLUME_DOWN:KeyCode.MINUS,
	MUTE:KeyCode.M,
	LEVEL_UP:KeyCode.L //Debug mode input
}; Object.freeze(ALIAS);

const AXIS_PRECISION = 0.50;