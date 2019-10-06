//SoundandMusic
/** 
 * The audio format of the game, automatically set through the function setFormat.
 * Can either be ".mp3" or ".ogg"
 * @type string 
 */
let audioFormat;

/**
 * Global current music HTMLAudioElement <audio>
 * @type HTMLAudioElement
 */
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
let oneUpSound;
let footstepsSound;
let lowHealthSound;
let menuNavigationSound;
let menuSelectionSound;
let swish1Sound;
let swish2Sound;
const EFFECTS_BASE = 0.75;
let menuMusic;
let gameMusic;
let bossMusic1;
let bossMusic2;
let gameOverMusic;
const GAMEPLAY_BASE = 1.5;
const GAMEPLAY2_BASE = 0.6;
const DRAGON_BASE = 1.25;
const DRAGON2_BASE = 0.35;
const WARRIOR_BASE = 0.35;
let musicVolume;
let effectsVolume;
/** @type backgroundMusicClass */
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
	// Load global vars with SoundOverlapsClass objects
	pauseSound = new SoundOverlapsClass(assetPath.Audio + "PauseSoundLow");
	resumeSound = new SoundOverlapsClass(assetPath.Audio + "ResumeSoundLow");
	playerJumpSound = new SoundOverlapsClass(assetPath.Audio + "PlayerJump");
	playerPunchSound = new SoundOverlapsClass(assetPath.Audio + "PlayerPunch");
	playerKickSound = new SoundOverlapsClass(assetPath.Audio + "PlayerKick");
	playerBlockSound = new SoundOverlapsClass(assetPath.Audio + "PlayerBlocking");
	playerHitSound = new SoundOverlapsClass(assetPath.Audio + "PlayerHit");
	playerFailedSound = new SoundOverlapsClass(assetPath.Audio + "PlayerFailed");
	basicEnemyHitSound = new SoundOverlapsClass(assetPath.Audio + "BasicEnemyHit");
	basicEnemyDefeated = new SoundOverlapsClass(assetPath.Audio + "lowPain");
	oneUpSound = new SoundOverlapsClass(assetPath.Audio + "1_UP");
	footstepsSound = new SoundOverlapsClass(assetPath.Audio + "Footsteps");
	lowHealthSound = new SoundOverlapsClass(assetPath.Audio + "lowHealth");
	menuNavigationSound = new SoundOverlapsClass(assetPath.Audio + "MenuNavigation");
	menuSelectionSound = new SoundOverlapsClass(assetPath.Audio + "MenuSelection");
	swish1Sound = new SoundOverlapsClass(assetPath.Audio + "SwishTrim1");
	swish2Sound = new SoundOverlapsClass(assetPath.Audio + "SwishTrim2");

	menuMusic = assetPath.Audio + "gameplayMusicV1";
	gameMusic = assetPath.Audio + "gameplayMusicV2";
	bossMusic1 = assetPath.Audio + "DragonPulse";
	bossMusic2 = assetPath.Audio + "DragonPulse_v2";
	gameOverMusic = assetPath.Audio + "AWarriorsResolution(loop)";

	currentBackgroundMusic = new backgroundMusicClass();
}

/**
 * Sets the audio format that will be used by the entire game
 */
function setFormat() {
	// Create dummy HTMLAudioElement to test compatibility
	const audio = new Audio(); 
	// Set audio type depending on compatibility
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
		
		// Fades out currently playing song in one second
		if (musicSound) {
			_fadeTo(0, 1, () => console.log("faded out song from loopstarting a new one"));
		}
		

		musicSound = new Audio(filenameWithPath + audioFormat);
		musicSound.loop = true;

		// Injects and sets a new variable baseVolume into the HTMLSoundElement (value between 0-1) 
		// It is multiplied by global musicVolume var in this.setVolume to set the HTMLAudioElement volume value
		musicSound.baseVolume = getBaseVolumeForTrack(filenameWithPath);
		musicSound.play();
		this.setVolume(musicVolume);
	};

	/**
	 * Pauses the currently playing music
	 */
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
			let newVolume = Math.pow(musicSound.baseVolume * volume, 2);
			if(newVolume < 0) {
				newVolume = 0;
			} else if(newVolume > 1) {
				newVolume = 1;
			}

			musicSound.volume = newVolume;
		}
	};

	/**
	 * Fades out current music track and starts a new one at indicated times.
	 * Returns a NodeJS.Timeout of the new track starting for own handling if needed.
	 * @param {string} newTrackFilePath Filepath + name of the new track to start
	 * @param {number} fadeOutTime The time (in seconds) to fade the currently playing track
	 * @param {number} startingTime The delay (in seconds) before the next track begins (lets current track fade a bit before starting new one)
	 */
	this.transitionTo = function(newTrackFilePath, fadeOutTime, startingTime) {
		const grain = 1000/60; // ms
		let timeCounter = 0; // tracks the time before starting new track
		const startingTimeInMs = startingTime * 1000; // converts ahead of time so it doesn't need to every frame
		const currentTrack = musicSound; // get global current music track
		if (currentTrack) {
			this.fadeOut(fadeOutTime);
		}
		
		// The interval to check how much time has passed before starting new track loop
		const interval = setInterval(() => {
			timeCounter += grain;
			if (timeCounter >= startingTimeInMs) {
				clearInterval(interval);
				this.loopSong(newTrackFilePath);
			}
		}, grain);
		return interval;
	};

	/**
	 * Helper to cancel a fade or transition before it finishes
	 * @param {NodeJS.Timeout} intervalID The handle that came out of a fade or transition event in this class
	 */
	this.cancelFadeEvent = function(intervalID) {
		clearInterval(intervalID);
	};

	/**
	 * Fades the track to 0 volume from track's current volume over a set period of time
	 * Please read the fadeto function backgroundMusicClass for more details
	 * @param {number} seconds Seconds it takes to fade out
	 * @param {(track: HTMLAudioElement) => void} onTargetReached Optional callback to send when the fade has reached its target. Please make sure to bind 'this' ahead of time if necessary.
	 */
	this.fadeOut = function(seconds, onTargetReached) {
		return _fadeTo(0, seconds, (track) => {
			track.pause();
			if (onTargetReached) {
				onTargetReached(track);
			}
		});
	};

	/**
	 * Fades the track's volume level from where its at to track's baseVolume (custom injected variable) over a set period of time
	 * Please read the local fadeto function in backgroundMusicClass for more details
	 * @param {number} seconds Seconds it takes to fade in
	 * @param {(track: HTMLAudioElement) => void} onTargetReached Optional callback to send when the fade has reached its target. Please make sure to bind 'this' ahead of time if necessary.
	 */
	this.fadeIn = function(seconds, onTargetReached) {
		if (musicSound) {
			// Following the forumula set in setVolume in this class. 
			// Not sure why we're taking volume level to power of 2.
			return _fadeTo(Math.pow(musicSound.baseVolume * musicVolume, 2), seconds, onTargetReached);
		} else {
			console.log("Warning! Tried to fadeIn music, but musicSound was " + (typeof musicSound === "object" ? "null" : "undefined" + "!"));
			return null;
		}
	};

	/**
	 * Simple fade to a target volume in a set amount of seconds. If you need to set a starting value, please do that before calling.
	 * Returns the NodeJS.Timeout so you can stop it on your own with clearInterval if needed before it reaches its target.
	 * Returns null if volume is already at the passed targetVol or no track could be found in the musicSound global var
	 * @param {number} targetVol
	 * @param {number} seconds 
	 * @param {(track: HTMLAudioElement) => void} onTargetReached Optional callback to send when the fade has reached its target. Please make sure to bind 'this' ahead of time if necessary.
	 * @returns NodeJS.Timeout | null
	 */
	this.fadeTo = _fadeTo;

	/**
	 * Simple fade to a target volume in a set amount of seconds. If you need to set a starting value, please do that before calling.
	 * Returns the NodeJS.Timeout so you can stop it on your own with clearInterval if needed before it reaches its target.
	 * Returns null if volume is already at the passed targetVol or no track could be found in the musicSound global var
	 * @param {number} targetVol
	 * @param {number} seconds 
	 * @param {(track: HTMLAudioElement) => void} onTargetReached Optional callback to send when the fade has reached its target. Receives the HTMLAudioElement. 
	 * Please make sure to bind 'this' ahead of time if necessary.
	 * @returns NodeJS.Timeout | null
	 */
	function _fadeTo(targetVol, seconds, onTargetReached) {
		/** @type HTMLAudioElement */
		const track = musicSound;
		if (!track) {
			console.log(`Warning! Tried to fade track, but track in musicSound global variable was ${(typeof musicSound === "object" ? "null" : "undefined")}!`);
			return null;
		}
		/** @type number */
		const startingVol = track.volume;

		if (startingVol == targetVol) return null;
		const diff = targetVol - startingVol;
		const grain = 60; // in fps
		const fadePerFrame = diff / grain / seconds;

		// Set up a new interval that will fade the track
		const fadeInterval = setInterval(() => {
			const currentVol = track.volume;
			// Check if we have arrived
			if (currentVol > targetVol - Math.abs(fadePerFrame) && 
			currentVol < targetVol + Math.abs(fadePerFrame) || currentVol == targetVol) 
			{
				track.volume = targetVol; // make sure volume is at target
				clearInterval(fadeInterval); // clear this interval so it is no longer called
				if (onTargetReached) {
					onTargetReached(track);
				}
			} else {
				const newVal = track.volume + fadePerFrame;
				// Increment/decrement volume at the fadePerFrame value
				track.volume = clamp(newVal, 0, 1);
				if (newVal > 1 || newVal < 0) {
					console.log("Warning! Attempted to set volume to a value outside of the 0 to 1 range!");
				}
			}
		}, 1000/grain);
		return fadeInterval;
	}

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

/**
 * Sets global audio muting
 */
function toggleMute() {
	isMuted = !isMuted;
	currentBackgroundMusic.setVolume(musicVolume);
}

/**
 * Sets the global SFX volume level
 * @param {number} amount The volume level to set where 0 is inaudible and 1 is full volume.
 * The function clamps the value between 0 and 1 should it exceed these boundaries
 * @returns void
 */
function setEffectsVolume(amount) {
	effectsVolume = amount;
	if(effectsVolume > 1.0) {
		effectsVolume = 1.0;
	} else if (effectsVolume < 0.0) {
		effectsVolume = 0.0;
	}

	localStorageHelper.setItem(localStorageKey.SFXVolume, effectsVolume);
}

/**
 * Sets the global SFX volume level
 * @param {number} amount The volume level to set where 0 is inaudible and 1 is full volume.
 * The function clamps the value between 0 and 1 should it exceed these boundaries
 * @returns void
 */
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

/**
 * Relatively increases the level of both SFX and Music global volume levels by the VOLUME_INCREMENT constant
 */
function turnVolumeUp() {
	setMusicVolume(musicVolume + VOLUME_INCREMENT);
	setEffectsVolume(effectsVolume + VOLUME_INCREMENT);
}

/**
 * Relatively decreases the level of both SFX and Music global volume levels by the VOLUME_INCREMENT constant
 */
function turnVolumeDown() {
	setMusicVolume(musicVolume - VOLUME_INCREMENT);
	setEffectsVolume(effectsVolume - VOLUME_INCREMENT);
}
