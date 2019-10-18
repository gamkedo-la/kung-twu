// Sound Constants
/// =========================================================
/// * To add a new sound to the game                        *
/// * 1. Add a new property key to Sounds                   *
/// * 2. Create a new entry in soundSpriteConfigs           *
/// =========================================================

/// =========================================================
/// * To access current sound hooks:                        *
/// * 1. Search codebase for "@SoundHook"                   *
/// * 2. For sections that need work done "@SoundHook:TODO" *
/// * 3. For sound parameter implementation "@SoundParam"   *
/// * 4. Please leave a comment with these tags in them if  *
/// * you create a new @SoundHook or @SoundParam            *
/// =========================================================

/**
 * Game's globally accessible SoundManager
 * @type SoundManager
 */
let sound;

/**
 * Keys to access sounds with
 */
const Sounds = {
	SFX_1UP: "SFX_1UP",
	SFX_BoneCrack: "SFX_BoneCrack",
	SFX_EnemyHit: "SFX_EnemyHit",
	SFX_Footsteps: "SFX_Footsteps",
	SFX_LowHealth: "SFX_LowHealth",
	SFX_LowPain: "SFX_LowPain",
	SFX_MenuNav: "SFX_MenuNav",
	SFX_MenuSelect: "SFX_MenuSelect",
	SFX_PauseLow: "SFX_PauseLow",
	SFX_PlayerBlock: "SFX_PlayerBlock",
	SFX_PlayerFail: "SFX_PlayerFail",
	SFX_PlayerHit: "SFX_PlayerHit",
	SFX_PlayerJump: "SFX_PlayerJump",
	SFX_PlayerKick: "SFX_PlayerKick",
	SFX_PlayerPunch: "SFX_PlayerPunch",
	SFX_ResumeLow: "SFX_ResumeLow",
	SFX_Swish_01: "SFX_Swish_01",
	SFX_Swish_02: "SFX_Swish_02",
	BGM_Boss: "BGM_Boss",
	BGM_GamePlay: "BGM_GamePlay",
	BGM_Title: "BGM_Title",
	BGM_GameOver: "BGM_GameOver"
}; Object.freeze(Sounds);
// ========================

/**
 * Audio busses
 */
const AudioBus = {
	SFX: "SFX",
	MUSIC: "MUSIC",
	NONE: "NONE"
}; Object.freeze(AudioBus);

/**
 * SoundSprite Configuration 
 */
const soundSpriteConfigs = [
	{
		key: Sounds.SFX_1UP,
		filepath: "./audio/1_UP",
		baseVolume: .3,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 2,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_BoneCrack,
		filepath: "./audio/boneCrack",
		baseVolume: .25,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 2,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_EnemyHit,
		filepath: "./audio/BasicEnemyHit",
		baseVolume: .6,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 2,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_Footsteps,
		filepath: "./audio/Footsteps",
		baseVolume: .5,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 2,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_LowHealth,
		filepath: "./audio/lowHealth",
		baseVolume: .6,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 2,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_LowPain,
		filepath: "./audio/lowPain",
		baseVolume: .5,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 2,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_MenuNav,
		filepath: "./audio/MenuNavigation",
		baseVolume: .8,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 5,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_MenuSelect,
		filepath: "./audio/MenuSelection",
		baseVolume: .5,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 4,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_PauseLow,
		filepath: "./audio/PauseSoundLow",
		baseVolume: .5,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 2,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_PlayerBlock,
		filepath: "./audio/PlayerBlocking",
		baseVolume: .45,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 2,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_PlayerFail,
		filepath: "./audio/PlayerFailed",
		baseVolume: .5,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 2,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_PlayerHit,
		filepath: "./audio/PlayerHit",
		baseVolume: .9,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 2,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_PlayerJump,
		filepath: "./audio/PlayerJump",
		baseVolume: .325,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 2,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_PlayerKick,
		filepath: "./audio/PlayerKick",
		baseVolume: .425,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 2,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_PlayerPunch,
		filepath: "./audio/PlayerPunch",
		baseVolume: .3,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 2,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_ResumeLow,
		filepath: "./audio/ResumeSoundLow",
		baseVolume: .5,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 2,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_Swish_01,
		filepath: "./audio/SwishTrim1",
		baseVolume: 1,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 2,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_Swish_02,
		filepath: "./audio/SwishTrim2",
		baseVolume: .65,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 2,
		fadeOutTime: 0
	},
	{
		key: Sounds.BGM_Title,
		filepath: "./audio/gameplayMusicV1",
		baseVolume: .85,
		audioBus: AudioBus.MUSIC,
		isLoop: true,
		maxInstances: 2,
		fadeOutTime: 1.5
	},		
	{
		key: Sounds.BGM_GamePlay,
		filepath: "./audio/gameplayMusicV2",
		baseVolume: .35,
		audioBus: AudioBus.MUSIC,
		isLoop: true,
		maxInstances: 2,
		fadeOutTime: 1.5
	},
	{
		key: Sounds.BGM_Boss,
		filepath: "./audio/Dragon Pulse_v2",
		baseVolume: .35,
		audioBus: AudioBus.MUSIC,
		isLoop: true,
		maxInstances: 2,
		fadeOutTime: 1.5
	},
	{
		key: Sounds.BGM_GameOver,
		filepath: "./audio/AWarriorsResolution(loop)",
		baseVolume: .35,
		audioBus: AudioBus.MUSIC,
		isLoop: true,
		maxInstances: 2,
		fadeOutTime: 1.5
	},
];
