/**
 * SoundManager will interface with the SoundEngine to keep a simple, yet customizable API for the end user.
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
	 * @returns the SoundSprite that was played
	 */
	this.playSFX = function(key) {
		const sound = _engine._getSound(key);
		if (sound) {
			sound.play();
			return sound;
		}
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
	 * Set the BGM bus volume of the SoundEngine
	 * @param {number} vol The volume to set the bus to. (Range: 0-1)
	 */
	this.setBGMVolume = function(vol) {
		_bgmBusVolume = clamp(vol, 0, 1);
		_engine.setBusVolume(AudioBus.MUSIC, _bgmBusVolume);
		if (_currentMusic !== null && _currentMusic !== undefined) { // live adjusts only currently playing music. All subsequently played sounds will be affected
			_currentMusic.setVolume();
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
		_sfxBusVolume = clamp(vol, 0, 1);
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
}
