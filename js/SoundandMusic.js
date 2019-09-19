//SoundandMusic
let audioFormat;
let musicSound = null;
let pauseSound;
let resumeSound;
let playerJumpSound;
let playerPunchSound;
let playerKickSound;
let playerBlockSound;
let playerHitSound;
let playerFailedSound;
let basicEnemyHitSound;
let basicEnemyDefeated;
const EFFECTS_BASE = 0.75;
let menuMusic;
let gameMusic;
let bossMusic1;
let bossMusic2;
let gameOverMusic;
const GAMEPLAY_BASE = 1.0;
const GAMEPLAY2_BASE = 0.75;
const DRAGON_BASE = 0.35;
const DRAGON2_BASE = 0.35;
const WARRIOR_BASE = 0.35;
let musicVolume;
let effectsVolume;
let currentBackgroundMusic;
const VOLUME_INCREMENT = 0.05;

function configureGameAudio() {
	musicVolume = parseFloat(localStorageHelper.getItem(localStorageKey.MusicVolume));
	effectsVolume = parseFloat(localStorageHelper.getItem(localStorageKey.SFXVolume));
	
	if(isNaN(musicVolume)) {
		musicVolume = 1;
	}
	
	if(isNaN(effectsVolume)) {
		effectsVolume = 1;
	}	
}

function loadAudio() {
	pauseSound = new SoundOverlapsClass(assetPath.Audio + "PauseSoundLow");
	resumeSound = new SoundOverlapsClass(assetPath.Audio + "ResumeSoundLow");
	playerJumpSound = new SoundOverlapsClass(assetPath.Audio + "PlayerJump");
	playerPunchSound = new SoundOverlapsClass(assetPath.Audio + "PlayerPunch");
	playerKickSound = new SoundOverlapsClass(assetPath.Audio + "PlayerKick");
	playerBlockSound = new SoundOverlapsClass(assetPath.Audio + "PlayerBlocking");
	playerHitSound = new SoundOverlapsClass(assetPath.Audio + "PlayerHit");
	playerFailedSound = new SoundOverlapsClass(assetPath.Audio + "PlayerFailed");
	basicEnemyHitSound = new SoundOverlapsClass(assetPath.Audio + "lowPain");
	basicEnemyDefeated = new SoundOverlapsClass(assetPath.Audio + "BasicEnemyHit");
	menuMusic = assetPath.Audio + "gameplayMusicV1";
	gameMusic = assetPath.Audio + "gameplayMusicV2";
	bossMusic1 = assetPath.Audio + "DragonPulse";
	bossMusic2 = assetPath.Audio + "DragonPulse_v2";
	gameOverMusic = assetPath.Audio + "AWarriorsResolution(loop)";

	currentBackgroundMusic = new backgroundMusicClass();
}

function setFormat() {
	const audio = new Audio();
	if (audio.canPlayType("audio/mp3")) {
		audioFormat = ".mp3";
	} else {
		audioFormat = ".ogg";
	}
}

function backgroundMusicClass() {
	let currentFileName;
	this.loopSong = function(filenameWithPath) {
		currentFileName = filenameWithPath;
		setFormat(); // calling this to ensure that audioFormat is set before needed

		if (musicSound != null) {
			musicSound.pause();
			musicSound = null;
		}
		musicSound = new Audio(filenameWithPath + audioFormat);
		musicSound.loop = true;
		musicSound.baseVolume = getBaseVolumeForTrack(filenameWithPath);
		this.setVolume(musicVolume);
	};

	this.pauseSound = function() {
		if(musicSound != null) {
			musicSound.pause();
		}
	};

	this.resumeSound = function() {
		if(musicSound != null) {
			musicSound.play();
		}
	};

	this.startOrStopMusic = function() {
		if (musicSound.paused) {
			musicSound.play();
		} else {
			musicSound.pause();
		}
	};
	
	this.setVolume = function(volume) {
		if(isMuted) {
			musicSound.volume = 0;
		} else {
			musicSound.volume = Math.pow(musicSound.baseVolume * volume, 2);
		}
		
		if(musicSound.volume === 0) {
			musicSound.pause();
		} else if (musicSound.paused) {
			musicSound.play();
		}
	};

	this.getCurrentTrack = function() {
		return currentFileName;
	};

	const getBaseVolumeForTrack = function(newTrack) {
		switch(newTrack) {
		case menuMusic:
			return GAMEPLAY_BASE;
		case gameMusic:
			return GAMEPLAY2_BASE;
		case bossMusic1:
			return DRAGON_BASE;
		case bossMusic2:
			return DRAGON2_BASE;
		case gameOverMusic:
			return WARRIOR_BASE;
		}
	};
}

function SoundOverlapsClass(filenameWithPath) {
	setFormat();

	const fullFilename = filenameWithPath;
	let soundIndex = 0;
	const sounds = [new Audio(fullFilename + audioFormat), new Audio(fullFilename + audioFormat)];

	this.play = function() {
		if(!didInteract) {return;}
		if(!sounds[soundIndex].paused) {
			sounds.splice(soundIndex, 0, new Audio(fullFilename + audioFormat));
		}
		sounds[soundIndex].currentTime = 0;
		sounds[soundIndex].volume = Math.pow(EFFECTS_BASE * effectsVolume * !isMuted, 2);
		sounds[soundIndex].play();

		soundIndex = (++soundIndex) % sounds.length;
	};
}

function toggleMute() {
	isMuted = !isMuted;
	currentBackgroundMusic.setVolume(musicVolume);
}

function setEffectsVolume(amount) {
	effectsVolume = amount;
	if(effectsVolume > 1.0) {
		effectsVolume = 1.0;
	} else if (effectsVolume < 0.0) {
		effectsVolume = 0.0;
	}

	localStorageHelper.setItem(localStorageKey.SFXVolume, effectsVolume);
}

function setMusicVolume(amount){
	musicVolume = amount;
	if(musicVolume > 1.0) {
		musicVolume = 1.0;
	} else if (musicVolume < 0.0) {
		musicVolume = 0.0;
	}
	currentBackgroundMusic.setVolume(musicVolume);
	localStorageHelper.setItem(localStorageKey.MusicVolume, musicVolume);
}

function turnVolumeUp() {
	setMusicVolume(musicVolume + VOLUME_INCREMENT);
	setEffectsVolume(effectsVolume + VOLUME_INCREMENT);
}

function turnVolumeDown() {
	setMusicVolume(musicVolume - VOLUME_INCREMENT);
	setEffectsVolume(effectsVolume - VOLUME_INCREMENT);
}