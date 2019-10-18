// Please check SoundInstructions.txt for info on using sound

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
 * SoundSprite Configurations.
 * This is the list of configurations telling the SoundEngine details about the sounds we want in-game.
 * @type SoundSpriteConfig[]
 * Properties in a config:
 * @property key: string - a value from Sounds, please enter your own if you are adding a new sound
 * @property filepath: string - the relative filepath to the raw audio file - no extension, the engine will figure that out.
 * 		Please make sure that you have uploaded both .mp3 and .ogg versions of the sound in the same directory location to work correctly
 * @property baseVolume: number - (range: 0-1) The base volume of the track. After filling out a spriteConfig here and dropping the audio files in the right place, you can test this baseValue out in the soundtest.html file in the root directory. Move the knob around under BaseVolume Test
 * @property audioBus: string - a value from AudioBus. Please set to either AudioBus.SFX or AudioBus.MUSIC
 * @property isLoop: boolean - whether or not this track is to be looped by the engine. Most music will be, most sfx will not.
 * @property maxInstances - the max number of times this audio file can be played at any given time in the game. 
 * 	Once instances have run out, the engine will override the oldest one. It may cause popping, so make sure to set this value higher if it is played frequently in fast intervals
 * @property fadeOutTime: number - the number of seconds the sound instance will take to fade out when sound.stopAllSounds is called if allowFadeOut=true in that function
 */
const soundSpriteConfigs = [
	{
		key: Sounds.SFX_1UP,
		filepath: "./audio/1_UP",
		baseVolume: .3,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 3,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_BoneCrack,
		filepath: "./audio/boneCrack",
		baseVolume: .25,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 3,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_EnemyHit,
		filepath: "./audio/BasicEnemyHit",
		baseVolume: .6,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 3,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_Footsteps,
		filepath: "./audio/Footsteps",
		baseVolume: .5,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 3,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_LowHealth,
		filepath: "./audio/lowHealth",
		baseVolume: .6,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 3,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_LowPain,
		filepath: "./audio/lowPain",
		baseVolume: .5,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 3,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_MenuNav,
		filepath: "./audio/MenuNavigation",
		baseVolume: .8,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 3,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_MenuSelect,
		filepath: "./audio/MenuSelection",
		baseVolume: .5,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 3,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_PauseLow,
		filepath: "./audio/PauseSoundLow",
		baseVolume: .5,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 3,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_PlayerBlock,
		filepath: "./audio/PlayerBlocking",
		baseVolume: .45,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 3,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_PlayerFail,
		filepath: "./audio/PlayerFailed",
		baseVolume: .5,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 3,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_PlayerHit,
		filepath: "./audio/PlayerHit",
		baseVolume: .9,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 3,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_PlayerJump,
		filepath: "./audio/PlayerJump",
		baseVolume: .325,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 3,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_PlayerKick,
		filepath: "./audio/PlayerKick",
		baseVolume: .425,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 3,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_PlayerPunch,
		filepath: "./audio/PlayerPunch",
		baseVolume: .3,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 3,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_ResumeLow,
		filepath: "./audio/ResumeSoundLow",
		baseVolume: .5,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 3,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_Swish_01,
		filepath: "./audio/SwishTrim1",
		baseVolume: 1,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 3,
		fadeOutTime: 0
	},
	{
		key: Sounds.SFX_Swish_02,
		filepath: "./audio/SwishTrim2",
		baseVolume: .65,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 3,
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
