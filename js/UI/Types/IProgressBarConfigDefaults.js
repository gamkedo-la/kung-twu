/**
 * @type IProgressBarConfig
 * @description An interface with the recipe to create a UIProgressBar, containing default values. 
 * Create your custom UIProgressBar using object literal notation like in the examples below. 
 * If you forget the parameters, hitting "space + ctrl" on Windows or "space + cmd" on Mac while your cursor 
 * is inside the config object literal should bring up suggestions in autocomplete if using Sublime/VSCode.
 * Note: All parameters left unfilled in an object literal will be filled in by the default values.
 * ```javascript
 * // Example using object literal notation
 * var progBarCustom = new UIProgressBar({
 *  x: 0,
 *  y: 0,
 *  width: 100,
 *  height: 10,
 *  destination: "RIGHT"
 * // missing params to be filled in by default values...
 * });
 * ```
 */
function IProgressBarConfigDefaults() {
	/**
	 * X position of the top-left corner of the progress bar
	 * @type {number}
	 */
	this.x = 0;
	/**
	 * Y position of the top-left corner of the progress bar
	 * @type {number}
	 */
	this.y = 0;
	/**
	 * Width of the entire progress bar
	 * @type {number}
	 */
	this.width = 0;
	/**
	 * Height of the entire progress bar in pixels
	 * @type {number}
	 */
	this.height = 0;
	/**
	 * The direction the progress bar will move toward as it fills.
	 * Can be one of the choices in the following strings:
	 * @type {("RIGHT" | "LEFT" | "TOP" | "BOTTOM")}
	 */
	this.destination = "RIGHT";
	/**
	 * The background color behind the progress bar
	 * Default: clear
	 * @type {string | CanvasGradient}
	 */
	this.bgColor = "rgba(0,0,0,0)";
	/**
	 * The color of the outline of the progress bar
	 * Default: clear
	 * @type {string | CanvasGradient}
	 */
	this.bgOutlineColor = "rgba(0,0,0,0)";

	/**
	 * The color of the progress bar
	 * @type {string | CanvasGradient}
	 */
	this.progressColor = "rgba(0, 0, 255, 1)";
	/**
	 * Starting value of the progress bar. A normalized value between 0 and 1.
	 * @type {number}
	 */
	this.startingValue = 0;
}
