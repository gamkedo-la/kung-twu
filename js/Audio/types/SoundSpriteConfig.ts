/**
 * Config object/interface to create SoundSprites. Contains default values, though each should be intentionally filled in for proper functionality.
 */
declare interface SoundSpriteConfig {
	/**
	 * The key string to reference this by
	 */
	key: string;
	/**
	 * Filepath of the audio file minus extension.
	 */
	filepath: string;
	/**
	 * Base volume of the track (Range: 0-1)
	 */
	baseVolume: number;
	/**
	 * Audio bus name
	 */
	audioBus: string;
	/**
	 * Whether or not this track loops
	 */
	isLoop: boolean;
	/**
	 * Maximum number of sound instances that can play at one time
	 */
	maxInstances: number;
	/**
	 * Fade out time
	 */
	fadeOutTime: number;
}
