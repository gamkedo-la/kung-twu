/**
 * SoundManager will interface with the SoundEngine to keep a simple, yet customizable API for the end user.
 * It currently owns its own SoundEngine instance, which it initializes on its own.
 * The user can interact directly with the engine by calling _getEngine().
 * Please read SoundGlobals.js for directions on how to implement and add new sounds.
 * 
 * An idea I had for expanding sound is to create your own 'sound randomizer box' which can randomly choose within an
 * array of key values, then call that SFX with playSFX(key) in this manager.
 */
function SoundManager() {

	/**
	 * @type SoundSprite
	 */
	let _currentMusic = null;

	/**
	 * Internal sfx bus volume value
	 */
	let _sfxBusVolume = 1;

	/**
	 * Internal bgm bus volume value
	 */
	let _bgmBusVolume = 1;

	// Local function to get bus volumes from localStorageHelper
	_setBusVolumesFromLocalStorage();

	/**
	 * Private core sound engine to hide unnecessary details.
	 * If you want to handle it manually, please use this._getEngine() to retrieve it.
	 */
	const _engine = new SoundEngine();

	/**
	 * Get the core SoundEngine for own handling
	 */
	this._getEngine = function() {
		return _engine;
	};

	/**
	 * Add a sound or multiple sounds to the SoundEngine.
	 * @param {SoundSpriteConfig | SoundSpriteConfig[]} configs SoundSprite configuration or array of configurations passed as object literals
	 */
	this.addSounds = function(configs) {
		_engine.addSounds(configs);
	};

	/**
	 * Plays a sound effect
	 * @param {string} key The key of the SoundSprite
	 * @param {number} volume The volume value to set (defaul: 1)
	 * @param {number} playbackspeed The playbackspeed multiplier. Will force a positive value (default: 1)
 	 * @returns the SoundSprite that was played
	 */
	this.playSFX = function(key, volume = 1, playbackspeed = 1) {
		const sound = _engine._getSound(key);
		if (sound) {
			// limit volume
			volume = clamp(volume, 0, 1);
			// set playback speed according to reverse bool
			playbackspeed = Math.abs(playbackspeed);

			sound.play(volume, playbackspeed);

			return sound;
		}
	};

	/**
	 * Plays a pseudo echo effect by playing multiple instances of a sound. Make sure sound max instance counts are at least the number of set iterations for the SoundSprite you are using this on.
	 * @param {SoundSprite} soundSprite
	 * @param {[number, number]} volRange
	 * @param {[number, number]} speedRange
	 * @param {number} iterations
	 * @param {number} intervalMs
	 */
	this.playEcho = function (key, volRange = [1, 0], speedRange = [1, .1], iterations = 5, intervalMs = 80) {
		_engine.playEcho(_engine._getSound(key), volRange, speedRange, iterations, intervalMs);
	};

	/**
	 * Get the key of the currently playing music, or return null if there is none playing.
	 */
	this.getCurrentBGMKey = function() {
		if (_currentMusic) {
			return _currentMusic.getKey();
		} else {
			return null;
		}
	};

	/**
	 * Sets the mute status of the sound engine
	 * @param {boolean} isMuted
	 */
	this.setMuted = function(isMuted) {
		_engine.setMuted(isMuted);
	};

	/**
	 * Gets the muted status of the sound engine as a bool
	 */
	this.getIsMuted = function() {
		return _engine.getIsMuted();
	};

	/**
	 * Gets the interaction status
	 */
	this.didUserInteract = function() {
		return _engine.getDidInteract();
	};

	/**
	 * Set the BGM bus volume of the SoundEngine
	 * @param {number} vol The volume to set the bus to. (Range: 0-1)
	 */
	this.setBGMVolume = function(vol) {
		Debug.isValid(vol, "number"); // type check to protect local storage and bus val

		const newVol = clamp(vol, 0, 1);
		_bgmBusVolume = newVol;
		_engine.setBusVolume(AudioBus.MUSIC, _bgmBusVolume);
		if (_currentMusic !== null && _currentMusic !== undefined) { // live adjusts only currently playing music. All subsequently played sounds will be affected
			_currentMusic.setVolume();
		}
		// update local storage value
		if (localStorage && localStorageHelper) {
			localStorageHelper.setFloat(localStorageKey.MusicVolume, newVol);
		}
	};
	this.setBGMVolume(_bgmBusVolume); // initilize bgm volume

	/**
	 * Get the current background music bus volume level. (Range: 0-1)
	 */
	this.getBGMVolume = function() {
		return _bgmBusVolume;
	};

	/**
	 * Set the SFX bus volume
	 * @param {number} vol The volume to set the bus to. (Range: 0-1)
	 */
	this.setSFXVolume = function(vol) {
		Debug.isValid(vol, "number"); // type check to protect local storage and bus val

		const newVol = clamp(vol, 0, 1);
		_sfxBusVolume = newVol;
		// update local storage value
		if (localStorage && localStorageHelper) {
			localStorageHelper.setFloat(localStorageKey.SFXVolume, newVol);
		}
		_engine.setBusVolume(AudioBus.SFX, _sfxBusVolume);
	};
	this.setSFXVolume(_sfxBusVolume); // initialize sfx volume

	/**
	 * Get the current sfx bus volume. (Range: 0-1)
	 */
	this.getSFXVolume = function() {
		return _sfxBusVolume;
	};

	/**
	 * Set the master bus volume
	 * @param {number} vol The volume to set the bus to. Range(0-1)
	 */
	this.setMasterVolume = function(vol) {
		_engine.setMasterVolume(clamp(vol, 0, 1));
		if (_currentMusic !== null && _currentMusic !== undefined) { // live adjusts only currently playing music. All subsequently played sounds will be affected.
			_currentMusic.setVolume();
		}
	};

	/**
	 * Retrieves the master bus volume level
	 */
	this.getMasterVolume = function() {
		return _engine.getMasterVolume();
	};

	/**
	 * Play a music track
	 * @param {string} key The key of the music track to play.
	 * @param {number} delay (optional) If there is a currently playing track, this is number of seconds
	 * the new track will wait before playing to allow the current one to fade out.
	 * (Default: 1.5 seconds)
	 * @param {number} fadeScale (optional) Multiply this number by the delay parameter to 
	 * determine the fade out time of the current track.
	 * (Default: 1.5 seconds)
	 */
	this.playBGM = function(key, delay = 1.5, fadeScale = 1.5) {
		const sound = _engine._getSound(key);
		if (sound) {
			if (_currentMusic !== null && _currentMusic !== undefined) {	
				// There is a currently playing BGM track: Fade it out, and start new track delayed by seconds
				_engine.transitionTo(_currentMusic, sound, delay * fadeScale, delay);
			} else {
				// There is no currently playing BGM track: Just start the new track immediately
				sound.play();
			}
			_currentMusic = sound;
			return sound;
		}
	};

	/**
	 * Fade the currently playing background music to a level in variable amount of seconds.
	 * @param {number} volume Volume to fade to. Range (0-1)
	 * @param {number} seconds The number of seconds it will take to fade
	 * @param {(inst: SoundInstance)=>void} onTargetReached An optional callback that fires when target volume is reached 
	 */
	this.fadeBGMTo = (volume, seconds, onTargetReached) => {
		if (_currentMusic) {
			_currentMusic.fadeTo(_currentMusic.getLastPlayed(), clamp(volume, 0, 1), seconds, onTargetReached);
		}
	};

	/**
	 * Stop a SoundSprite (all SoundInstances in it)
	 * @param {string} key The key of the SoundSprite to stop
	 * @param {boolean} allowFadeOut Allow the SoundSprite to fade out with its default fade out time.
	 */
	this.stopSound = function(key, allowFadeOut = true) {
		const sound = _engine._getSound(key);
		if (sound) {
			sound.stop(allowFadeOut);
		}
	};

	/**
	 * Stops the currently playing background music
	 * @param {boolean} allowFadeOut Will allow the track to fade out with its default fadeOutTime
	 * (default: true)
	 */
	this.stopBGM = function(allowFadeOut = true) {
		if (_currentMusic) {
			_currentMusic.stop(allowFadeOut);
		}
	};

	/**
	 * Stops all sounds. A relatively expensive task, especially if there are many sounds with many instances registered with the SoundEngine, 
	 * even more so if allowFadeOut is true. Please use sparingly. 
	 * Note to self: In future versions of a sound engine, it would probably be wiser to
	 * manage a list of current sound instances instead of cycling through every sound instance.
	 */
	this.stopAllSounds = function(allowFadeOut = true) {
		_engine.stopAllSounds(allowFadeOut);
		_currentMusic = null; // clears current music reference for fresh start
	};


	// ==== HELPERS ==== //
	function _setBusVolumesFromLocalStorage() {
		if (localStorage && localStorageHelper) {
			const sfxVol = localStorageHelper.getFloat(localStorageKey.SFXVolume);
			const bgmVol = localStorageHelper.getFloat(localStorageKey.MusicVolume);
			if (sfxVol !== null && sfxVol !== undefined && typeof sfxVol === "number" && !isNaN(sfxVol)) {
				_sfxBusVolume = sfxVol;
			}
			if (bgmVol !== null && bgmVol !== undefined && typeof bgmVol === "number" && !isNaN(bgmVol)) {
				_bgmBusVolume = bgmVol;
			}
		}
	}
}
