/**
 * Class that will function as a mold for creating new sound objects. 
 * These will be instantiated at load-time to be stored and used by an audio manager/engine class 
 * to easily create sounds on the fly with their intended levels/properties.
 * @param {SoundEngine} soundEngine SoundEngine instance
 * @param {string} key The key which to reference this SoundDescription by.
 * @param {string} filepath The path to the sound resource
 * @param {number} baseVolume The intended base volume of the sound
 * @param {string} audioBus The key of the 'bus' to affect the sound through, which is a value within AudioBus enum object. Audio bus will affect gain only.
 * @param {boolean} isLoop (true) will loop, (false) will not loop
 * @param {number} maxInstances The max number of SoundInstances playable at a given time. Behavior will stop the oldest instance and start a new one.
 * @param {number} fadeOutTime The number of seconds of fading out a sound when calling "stop".
 */
function SoundDescription(soundEngine, key, filepath, baseVolume, audioBus, isLoop, maxInstances, fadeOutTime = 0) {
	const _engine = soundEngine;
	/**
	 * The base volume level for the track that can be easily adjusted
	 * Range (0 - 1)
	 */
	this.baseVolume = clamp(baseVolume, 0, 1);

	/**
	 * The key by which the audio engine will reference this SoundDescription by.
	 * @type {string}
	 */
	this.key = key;

	/**
	 * The key of the 'bus' to affect the sound through, which is a value within AudioBus enum object. Audio bus will affect gain only.
	 * @type {string}
	 */
	this.audioBus = audioBus;

	/**
	 * A reference to the target audio file's relative filepath
	 * @type {string}
	 */
	this.filepath = filepath;

	/**
	 * Whether or not this sound will loop
	 * @type {boolean}
	 */
	this.isLoop = isLoop;

	/**
	 * The number of audio files that can play at a given time
	 * @type {number}
	 */
	this.maxInstances = maxInstances;

	/**
	 * The number of seconds of fading out a sound when calling "stop".
	 */
	this.fadeOutTime = fadeOutTime;

	/**
	 * Creates a new SoundInstance
	 */
	this.createInstance = function() {
		return new SoundOverlaps(_engine, this.filepath + _engine.getAudioFormat(), this.baseVolume, 1, this.audioBus, this.isLoop, this.maxInstances, this.fadeOutTime);
	};
}
