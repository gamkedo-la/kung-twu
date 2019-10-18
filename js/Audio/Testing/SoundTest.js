// SoundTest should be loaded separately from game's Main.js since it initializes its own SoundManager

// Create the SoundManager
sound = new SoundManager();

// Add SoundSprites
sound.addSounds(soundSpriteConfigs);

// ======== Test Functionality =========
// Play Sounds
const bossBGM_ = document.getElementById("bossBGM");
bossBGM_.addEventListener("click", () => {
	sound.playBGM(Sounds.BGM_Boss);
});

const titleBGM_ = document.getElementById("titleBGM");
titleBGM_.addEventListener("click", () => {
	sound.playBGM(Sounds.BGM_Title);
});

const oneupSFX_ = document.getElementById("oneupSFX");
oneupSFX_.addEventListener("click", () => {
	sound.playSFX(Sounds.SFX_1UP);
});

const footstepSFX_ = document.getElementById("footstepSFX");
footstepSFX_.addEventListener("click", () => {
	sound.playSFX(Sounds.SFX_Footsteps);
});

// Stop All Sounds
const stopAll_ = document.getElementById("stopAll");
stopAll_.addEventListener("click", () => {
	sound.stopAllSounds();
});

// Sound Volume Test
const soundList_ = document.getElementById("soundList");
const soundTestSlider_ = document.getElementById("soundTestSlider");
const soundTestPlay_ = document.getElementById("soundTestPlay");
const soundTestStop_ = document.getElementById("soundTestStop");
const soundTestSpeed_ = document.getElementById("soundTestSpeed");
const soundTestReversed_ = document.getElementById("soundTestReversed");
const soundTestVolDisplay_ = document.getElementById("soundTestVolDisplay");
const soundTestVolDisplayOld_ = document.getElementById("soundTestVolDisplayOld");
const keys_ = Object.getOwnPropertyNames(Sounds);
for (let i = 0; i < keys_.length; i++) {
	const option = document.createElement("option");
	option.innerText = Sounds[keys_[i]];
	soundList_.appendChild(option);
}

soundTestPlay_.addEventListener("click", () => {
	//sound.stopAllSounds();
	const key = soundList_.value;
	const snd = sound.playSFX(key, 1, parseFloat(soundTestSpeed_.value));
	snd._setBaseVolume(parseFloat(soundTestSlider_.value));
});

soundTestStop_.addEventListener("click", () => {
	const key = soundList_.value;
	sound.stopSound(key);
});

soundList_.addEventListener("input", () => {
	updateBaseVolume();
});

function updateBaseVolume() {
	const baseVol = sound._getEngine()._getSound(soundList_.value).getBaseVolume() + "";
	soundTestVolDisplay_.innerText = baseVol;
	soundTestSlider_.value = baseVol;
	soundTestVolDisplayOld_.innerText = baseVol;
}
updateBaseVolume(); // initialize value for first option that appears on list


soundTestSlider_.addEventListener("input", () => {
	soundTestVolDisplay_.innerText = soundTestSlider_.value;
	const snd = sound._getEngine()._getSound(soundList_.value);
	snd._setBaseVolume(parseFloat(soundTestSlider_.value));
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

//// SOUND RANDOMIZER /////
// sound randomiser is a British one
const sfxRandomButton_ = document.getElementById("sfxRandomButton");
const sfxRandomSounds_ = document.getElementById("sfxRandomSounds");
const sfxAddRandom_ = document.getElementById("addRandom");
const sfxRemoveRandom_ = document.getElementById("removeRandom");
const sfxRandomDisplay_ = document.getElementById("sfxRandomDisplay");
const sfxRandomVolRangeMin_ = document.getElementById("sfxRandomVolRangeMin");
const sfxRandomVolRangeMax_ = document.getElementById("sfxRandomVolRangeMax");
const sfxRandomSpdRangeMin_ = document.getElementById("sfxRandomSpdRangeMin");
const sfxRandomSpdRangeMax_ = document.getElementById("sfxRandomSpdRangeMax");
const randomizer = new SFXRandomizerBox(sound, 2, [.8, 1], [.8, 1.2],
	[
		Sounds.SFX_PlayerBlock, 
		Sounds.SFX_PlayerFail, 
		Sounds.SFX_PlayerHit, 
		Sounds.SFX_PlayerJump, 
		Sounds.SFX_PlayerKick, 
		Sounds.SFX_PlayerPunch
	]
);

sfxRandomVolRangeMin_.addEventListener("input", ()=>{
	const val = parseFloat(sfxRandomVolRangeMin_.value);
	randomizer.setVolumeRandMin(val);
});
sfxRandomVolRangeMax_.addEventListener("input", ()=>{
	const val = parseFloat(sfxRandomVolRangeMax_.value);
	randomizer.setVolumeRandMax(val);
});
sfxRandomSpdRangeMin_.addEventListener("input", ()=>{
	const val = parseFloat(sfxRandomSpdRangeMin_.value);
	randomizer.setSpeedRandMin(val);
});
sfxRandomSpdRangeMax_.addEventListener("input", ()=>{
	const val = parseFloat(sfxRandomSpdRangeMax_.value);
	randomizer.setSpeedRandMax(val);
});

sfxRandomButton_.addEventListener("click", ()=> {
	const sprite = randomizer.play();
	sfxRandomDisplay_.innerText = sprite.getKey();
});
