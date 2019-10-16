/**
 * SoundManager will interface with the SoundEngine to keep a simple, yet customizable API for the end user.
 */
function SoundManager() {

	/**
	 * @type SoundSprite
	 */
	let _currentMusic = null;
	let _sfxBusVolume = 1;
	
	let _bgmBusVolume = 1;
	

	const _engine = new SoundEngine();

	/**
	 * Get the engine for own handling
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
	 * Set the BGM bus volume of the SoundEngine
	 * @param {number} vol The volume to set the bus to. Range (0-1)
	 */
	this.setBGMVolume = function(vol) {
		_bgmBusVolume = clamp(vol, 0, 1);
		_engine.setBusVolume(AudioBus.MUSIC, _bgmBusVolume);
		if (_currentMusic !== null && _currentMusic !== undefined) {
			_currentMusic.setVolume();
		}
	};
	this.setBGMVolume(_bgmBusVolume); // initilize bgm volume

	this.getBGMVolume = function() {
		return _bgmBusVolume;
	};

	/**
	 * Set the SFX bus volume of the SoundEngine
	 * @param {number} vol The volume to set the bus to. Range (0-1)
	 */
	this.setSFXVolume = function(vol) {
		_sfxBusVolume = clamp(vol, 0, 1);
		_engine.setBusVolume(AudioBus.SFX, _sfxBusVolume);
	};
	this.setSFXVolume(_sfxBusVolume); // initialize sfx volume

	this.getSFXVolume = function() {
		return _sfxBusVolume;
	};

	/**
	 * Set the Master bus volume of the SoundEngine
	 * @param {number} vol The volume to set the bus to. Range(0-1)
	 */
	this.setMasterVolume = function(vol) {
		_engine.setMasterVolume(clamp(vol, 0, 1));
	};
	this.getMasterVolume = function() {
		return _engine.getMasterVolume();
	};

	/**
	 * Play a music track
	 * @param {string} key The key of the SoundSprite music track
	 * @param {number} delay (optional) If there is a currently playing track, this is number of seconds
	 * the new track will wait before playing to allow the current one to fade out.
	 * Default: 1.5 seconds
	 * @param {number} fadeScale (optional) Multiply this number by the delay parameter to 
	 * determine the fade out time of the current track.
	 * Default: 1.5
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

	this.stopBGM = function(allowFadeOut = true) {
		if (_currentMusic) {
			_currentMusic.stop(allowFadeOut);
		}
	};

	this.stopAllSounds = function(allowFadeOut = true) {
		_engine.stopAllSounds(allowFadeOut);
		_currentMusic = null; // clears current music reference for fresh start
	};
}
