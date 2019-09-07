//Globals
//----------Drawing and Canvas---------//
let canvas;
let canvasContext;
let currentLanguage;

let DEBUG = false;
let CHEATS_ACTIVE = false;

const canvasClearColor = "black";

const Color = {
	Red:"red",
	Blue:"blue",
	Green:"green",
	White:"white",
	Black:"black",
	Yellow:"yellow",
	Purple:"purple",
	Aqua:"aqua"
};

//--------------Player-----------------//
let player = null;
let aiManager = null;

//-------------Camera------------------//
const deadZoneHalfWidth = 25;

//---------------Persistence-----------//
const version = 0.1;
let localStorageHelper;
const localStorageKey = {
	Version:"kungTwu-Version",
	MusicVolume:"kungTwu-MusicVolume",
	SFXVolume:"kungTwu-EffectsVolume",
	Language:"kungTwu-Language",
	FirstLoad:"kungTwu-FirstLoad"
};

//----------State Management----------//
let pauseManager;
const CAUSE = {
	Keypress: "keypress",
	Focus: "focus",
};

const SCENE = {
	LOADING:"loading",
	TITLE:"title",
	SETTINGS:"settings",
	CREDITS:"credits",
	HELP:"help",
	PAUSE:"pause",
	GAME:"game",
	ENDING:"ending"
};

let didInteract = false;
let firstLoad;
let timer;
const TOTAL_LEVELS = 5;
let currentLevel = 1;

//------------Asset Management----------//
const assetPath = {
	Audio:"./audio/",
	Image:"images/"
};

//----------Collision Management---------//
const GAME_FIELD = {//configured in Main.js
	x:0,
	y:0,
	width:0,
	height:0,
	right:0,
	bottom:0,
	midX:0,
	midY:0
};

const DRAW_COLLIDERS = true;
const COLLIDER_COLOR = "yellow";

const ENTITY_TYPE = {
	Player:"player",
	BasicEnemy:"basicEnemy",
	Floor:"floor"
};

//---------------Audio------------------//
let isMuted = false;

//------------Text------------------//
const TextAlignment = {
	Left:"left",
	Right:"right",
	Center:"center"
};

const Fonts = {
	MainTitle:"40px Tahoma",
	Subtitle:"30px Tahoma",
	ButtonTitle:"20px Tahoma",
	CreditsText:"16px Tahoma"
};

const fontOverhangRatio = 4/5; // Currently 4/5 is correct for "Tahoma" font. Change if font changes