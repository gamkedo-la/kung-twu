/**
 * Config object/interface to create SoundSprites. Contains default values, though each should be intentionally filled in for proper functionality.
 */
function SoundSpriteConfig() {
	/**
	 * The key string to reference this by
	 */
	this.key = "";
	/**
	 * Filepath of the audio file minus extension.
	 */
	this.filepath = "";
	/**
	 * Base volume of the track (Range: 0-1)
	 */
	this.baseVolume = 1;
	/**
	 * Audio bus name
	 */
	this.audioBus = "";
	/**
	 * Whether or not this track loops
	 */
	this.isLoop = false;
	/**
	 * Maximum number of sound instances that can play at one time
	 */
	this.maxInstances = 1;
	/**
	 * Fade out time
	 */
	this.fadeOutTime = 1.5;
}
