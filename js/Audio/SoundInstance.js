/**
 * This class represents a single HTMLAudioElement with extra metadata. It will be managed by SoundOverlap class, and probably not interacted with directly by users.
 * @param {SoundSprite} soundSprite
 * @param {string} filename Filename + extension. Please get the compatible extension from AudioEngine.getSoundFormat
 */
class SoundInstance {
	/** @type SoundSprite */
	sprite;

	/**
	 * Sound's filename including extension
	 */
	filename;

	/**
	 * The inner HTMLAudioElement
	 * @type {HTMLAudioElement}
	 */
	_element;

	/**
	 * The inner HTMLAudioElement
	 */
	get element() { return this._element; }

	/**
	 * Current handles to a NodeJS.Timeout
	 * @type {number[]}
	 */
	_fades = [];

	/**
	 * The 'dial' the api turns for setting volume. Under the hood it calculates bus volume values.
	 */
	_volume = 1;

	constructor(soundSprite, filename) {
		this.sprite = soundSprite;
		this._element = new Audio(filename);
		this.filename = filename;
	}

	/**
	 * Adds a fade to the SoundInstance. Used by fading functions, not to be handled directly.
	 * @param {NodeJS.Timeout} fade 
	 */
	setFade(fade) {
		const _fades = this._fades;
		if (_fades.indexOf(fade) === -1) {
			_fades.push(fade);
		}
	}

	/**
	 * Cancels a specific fade on this SoundInstance. (Currently not used, but may become necessary while bug testing)
	 */
	cancelFade(fade) {
		const _fades = this._fades;
		const index = _fades.indexOf(fade);
		if (index !== -1) {
			_fades.splice(index, 1);
		}
	}

	/**
	 * Sets the looping status of this instance
	 * @param {boolean} isLoop
	 */
	setLoop(isLoop) {
		this._element.loop = isLoop;
	}

	/**
	 * Sets the looping status of this instance
	 * @param {boolean} isLoop
	 */
	getLoop() {
		return this._element.loop;
	}


	/**
	 * Gets the current fading status of the sound instance
	 */
	getIsFading() {
		(this._fades.length > 0) ? true : false;
	}
	/**
	 * Cancels the current fade if there are any
	 */
	cancelFadeAll() {
		const _fades = this._fades;
		while (_fades.length > 0) {
			const fade = _fades.shift();
			clearInterval(fade);
		}
	}

	getIsPlaying() {
		return !this._element.paused;
	}

	getIsPaused() {
		return this._element.paused;
	}

	getVolume() {
		return this._volume;
	}

	/**
	 * Make sure that the sound sprite updates volume after a call to this fn
	 */
	setVolume(vol) {
		if (typeof vol === "number" && !Number.isNaN(vol)) {
			this._volume = clamp(vol, 0, 1);
		}
		else {
			throw new Error("Trying to set volume to a value that is not a number!");
		}
	}

	/**
	 * Sets the inner volume directly. Used by the SoundEngine and typically should not be used directly.
	 * @param {number} vol 
	 */
	_setInnerVolume(vol) {
		this._element.volume = clamp(vol, 0, 1);
	}

	/**
	 * Pauses the audio
	 */
	pause() {
		this._element.pause();
	}

	/**
	 * Start playing the audio
	 */
	play() {
		this._element.play()
			.catch((err) => {
				if (err === "DomException") {
					// Console message to display when sounds fire before the user has the opportunity to interact with the page.
					console.log("For your enjoyment of the web, the game has prevented sounds from playing.\nPlease click or tap anywhere on the screen to allow sound.");
				} else {
					// Generic error
					console.log("Audio Error: ", err);
				}
				
			});
	}

	/**
	 * Set the current track time
	 * @param {number} seconds The number of seconds
	 */
	setCurrentTime(seconds) {
		this._element.currentTime = seconds;
	}

	/**
	 * Get the current track time
	 */
	getCurrentTime() {
		return this._element.currentTime;
	}

	/**
	 * Checks if instance of a SoundSprite
	 * @param {SoundSprite} soundSprite
	 */
	isInstanceOf(soundSprite) {
		return (soundSprite === this.sprite);
	}
}
