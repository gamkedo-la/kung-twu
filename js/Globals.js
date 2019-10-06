//Globals
//----------Drawing and Canvas---------//
let canvas;
let canvasContext;
let currentLanguage;

let DEBUG = false;
let CHEATS_ACTIVE = false;

const canvasClearColor = "black";

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

/** @type IProgressBarConfig */
let UIProgressBarDefaults;

//--------------Player-----------------//
let player = null;
let aiManager = null;
/** @type KeyMapper */
let keyMapper = null;
/** @type InputProcessor */
let inputProcessor = null;
let animationManager = null;

//-------------Camera------------------//
const deadZoneHalfWidth = 25;

//---------------Persistence-----------//
const version = 0.26;
/** @type LocalStorageHelper */
let localStorageHelper;
/** Contains keys of data to store in the browser's local storage */
const localStorageKey = {
	Version: "kungTwu-Version",
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
	StartingLevel:"kungTwu-StartingLevel"
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
	PAUSE: "pause",
	CONTROLS: "controls",
	GAME: "game",
	POWERUP:"powerUp",
	ENDING: "ending"
};

/**
 * Tracks whether the user has yet interacted with the window.
 * Scope: Global
 */
let didInteract = false;
let firstLoad;
/** 
 * Global Chronogram instance
 * Register your event for stopwatch-like timing in milliseconds.
 * Please look at Chronogram.js for more info on how to use it.
 * @type Chronogram 
 */
let timer;

const TOTAL_LEVELS = 5;
let currentLevel = 1;

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
	StartLevel:1
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
 * Css color string for setting debug collider color. 
 * Make sure DRAW_COLLIDERS global flag is set to true to see.
 */
const COLLIDER_COLOR = "yellow";

const ENTITY_TYPE = {
	Player: "player",
	Enemy: "enemy",
	Floor: "floor"
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
	CreditsText: "16px Tahoma"
};

let JPFont;
const CHAR_SIZE = {
	width:80,
	height:80
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