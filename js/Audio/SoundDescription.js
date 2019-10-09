/**
 * Class that will function as a mold for creating new sound objects. 
 * These will be instantiated at load-time to be stored and used by an audio manager/engine class 
 * to easily create sounds on the fly with their intended levels/properties.
 * @param {string} key The key which to reference this SoundDescription by.
 * @param {string} filepath The path to the sound resource
 * @param {number} baseVolume The intended base volume of the sound
 * @param {string} audioBus The key of the 'bus' to affect the sound through, which is a value within AudioBus enum object. Audio bus will affect gain only.
 * @param {boolean} isLoop (true) will loop, (false) will not loop
 */
function SoundDescription(key, filepath, baseVolume, audioBus, isLoop) {
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
}
