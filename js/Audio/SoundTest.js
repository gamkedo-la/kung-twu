// Create SoundSprites
const soundSpriteConfigs = [
	{
		key: "1_UP",
		filepath: "../../audio/1_UP",
		baseVolume: .1,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 2,
		fadeOutTime: 0
	},
	{
		key: "TitleBGM",
		filepath: "../../audio/gameplayMusicV1",
		baseVolume: .5,
		audioBus: AudioBus.MUSIC,
		isLoop: true,
		maxInstances: 2,
		fadeOutTime: 1.5
	},		
	{
		key: "BossBGM",
		filepath: "../../audio/DragonPulse",
		baseVolume: .25,
		audioBus: AudioBus.MUSIC,
		isLoop: true,
		maxInstances: 2,
		fadeOutTime: 1.5
	},
	{
		key: "Footsteps",
		filepath: "../../audio/Footsteps",
		baseVolume: .4,
		audioBus: AudioBus.SFX,
		isLoop: false,
		maxInstances: 2,
		fadeOutTime: 0
	}
];

// Create the SoundManager
const sounds = new SoundManager();

// Add SoundSprites
sounds.addSounds(soundSpriteConfigs);


// ======== Test Functionality =========
// Play Sounds
const bossBGM = document.getElementById("bossBGM");
bossBGM.addEventListener("click", () => {
	sounds.playBGM("BossBGM");
});

const titleBGM = document.getElementById("titleBGM");
titleBGM.addEventListener("click", () => {
	sounds.playBGM("TitleBGM");
});

const oneupSFX = document.getElementById("oneupSFX");
oneupSFX.addEventListener("click", () => {
	sounds.playSFX("1_UP");
});

const footstepSFX = document.getElementById("footstepSFX");
footstepSFX.addEventListener("click", () => {
	sounds.playSFX("Footsteps");
});

// Stop All Sounds
const stopAll = document.getElementById("stopAll");
stopAll.addEventListener("click", () => {
	sounds.stopAllSounds();
});

// Fade BGM Slider
const fadeBGMTo = document.getElementById("fadeBGMTo");
const fadeBGMTime = document.getElementById("fadeBGMTime");
// Activate button
const fadeBGM = document.getElementById("fadeBGM");
fadeBGM.addEventListener("click", () => {
	sounds.fadeBGMTo(parseFloat(fadeBGMTo.value), parseFloat(fadeBGMTime.value));
});

// Bus sliders
const sfxBus = document.getElementById("sfxBus");
sfxBus.value = sounds.getSFXVolume() + "";
sfxBus.addEventListener("input", (evt) => {
	sounds.setSFXVolume(parseFloat(evt.target.value, 10));
});

const musicBus = document.getElementById("musicBus");
musicBus.value = sounds.getBGMVolume() + "";
musicBus.addEventListener("input", (evt) => {
	sounds.setBGMVolume(parseFloat(evt.target.value, 10));
});

const masterBus = document.getElementById("masterBus");
masterBus.value = sounds.getMasterVolume() + "";
masterBus.addEventListener("input", (evt) => {
	sounds.setMasterVolume(parseFloat(evt.target.value, 10));
});


