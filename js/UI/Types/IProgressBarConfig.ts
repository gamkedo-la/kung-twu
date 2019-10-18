declare interface IProgressBarConfig {
	/**
	 * X position of the top-left corner of the progress bar
	 * @type {number}
	 */
	x: number;

	/**
	 * Y position of the top-left corner of the progress bar
	 * @type {number}
	 */
	y: number;

	/**
	 * Width of the entire progress bar
	 * @type {number}
	 */
	width: number;

	/**
	 * Height of the entire progress bar in pixels
	 * @type {number}
	 */
	height: number;

	/**
	 * The direction the progress bar will move toward as it fills.
	 * Can be one of the choices in the following strings:
	 * @type {("RIGHT" | "LEFT" | "TOP" | "BOTTOM")}
	 */
	destination: "RIGHT" | "LEFT" | "TOP" | "BOTTOM";

	/**
	 * The background color behind the progress bar
	 * Default: clear
	 * @type {string | CanvasGradient}
	 */
	bgColor: string | CanvasGradient;

	/**
	 * The color of the outline of the progress bar
	 * Default: clear
	 * @type {string | CanvasGradient}
	 */
	bgOutlineColor: string | CanvasGradient;

	/**
	 * The color of the progress bar
	 * @type {string | CanvasGradient}
	 */
	progressColor: string | CanvasGradient;

	/**
	 * Starting value of the progress bar. A normalized value between 0 and 1.
	 * @type {number}
	 */
	startingValue: number;
}
