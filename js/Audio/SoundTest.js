// SoundTest should be loaded separately from game's Main.js since it initializes its own SoundManager

// Create the SoundManager
sound = new SoundManager();

// Add SoundSprites
sound.addSounds(soundSpriteConfigs);


// ======== Test Functionality =========
// Play Sounds
const bossBGM = document.getElementById("bossBGM");
bossBGM.addEventListener("click", () => {
	sound.playBGM(Sounds.BGM_Boss);
});

const titleBGM = document.getElementById("titleBGM");
titleBGM.addEventListener("click", () => {
	sound.playBGM(Sounds.BGM_Title);
});

const oneupSFX = document.getElementById("oneupSFX");
oneupSFX.addEventListener("click", () => {
	sound.playSFX(Sounds.SFX_1UP);
});

const footstepSFX = document.getElementById("footstepSFX");
footstepSFX.addEventListener("click", () => {
	sound.playSFX(Sounds.SFX_Footsteps);
});

// Stop All Sounds
const stopAll = document.getElementById("stopAll");
stopAll.addEventListener("click", () => {
	sound.stopAllSounds();
});

// Sound Volume Test
const soundList = document.getElementById("soundList");
const soundTestSlider = document.getElementById("soundTestSlider");
const soundTestPlay = document.getElementById("soundTestPlay");
const soundTestStop = document.getElementById("soundTestStop");
const soundTestVolDisplay = document.getElementById("soundTestVolDisplay");
const soundTestVolDisplayOld = document.getElementById("soundTestVolDisplayOld");
const keys = Object.getOwnPropertyNames(Sounds);
for (let i = 0; i < keys.length; i++) {
	const option = document.createElement("option");
	option.innerText = Sounds[keys[i]];
	soundList.appendChild(option);
}

soundTestPlay.addEventListener("click", () => {
	//sound.stopAllSounds();
	const key = soundList.value;
	const snd = sound.playSFX(key);
	snd._setBaseVolume(parseFloat(soundTestSlider.value));
	snd.setVolume(1);
});

soundTestStop.addEventListener("click", () => {
	const key = soundList.value;
	sound.stopSound(key);
});

soundList.addEventListener("input", () => {
	updateBaseVolume();
});

function updateBaseVolume() {
	const baseVol = sound._getEngine()._getSound(soundList.value).getBaseVolume() + "";
	soundTestVolDisplay.innerText = baseVol;
	soundTestSlider.value = baseVol;
	soundTestVolDisplayOld.innerText = baseVol;
}
updateBaseVolume(); // initialize value for first option that appears on list


soundTestSlider.addEventListener("input", () => {
	soundTestVolDisplay.innerText = soundTestSlider.value;
	const snd = sound._getEngine()._getSound(soundList.value);
	snd._setBaseVolume(parseFloat(soundTestSlider.value));
	snd.setVolume();

});


// Fade BGM Slider
const fadeBGMTo_ = document.getElementById("fadeBGMTo");
const fadeBGMTime_ = document.getElementById("fadeBGMTime");
// Activate button
const fadeBGM_ = document.getElementById("fadeBGM");
fadeBGM_.addEventListener("click", () => {
	sound.fadeBGMTo(parseFloat(fadeBGMTo_.value), parseFloat(fadeBGMTime_.value));
});

// Bus sliders
const sfxBus_ = document.getElementById("sfxBus");
sfxBus_.value = sound.getSFXVolume() + "";
sfxBus_.addEventListener("input", (evt) => {
	sound.setSFXVolume(parseFloat(evt.target.value, 10));
});

const musicBus_ = document.getElementById("musicBus");
musicBus_.value = sound.getBGMVolume() + "";
musicBus_.addEventListener("input", (evt) => {
	sound.setBGMVolume(parseFloat(evt.target.value, 10));
});

const masterBus_ = document.getElementById("masterBus");
masterBus_.value = sound.getMasterVolume() + "";
masterBus_.addEventListener("input", (evt) => {
	sound.setMasterVolume(parseFloat(evt.target.value, 10));
});
