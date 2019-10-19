/**
 * The recipe to create a GameTimer
 * Pass an object literal of this into a GameTimer constructor
 */
declare interface IGameTimerConfig {
	/** (optional) The position to render the timer. This will be left-aligned. (Default {x:0, y:0})*/
	position?: {x: number, y: number};
	/** (optional) The number of decimal places to render the time with. (Default: 0) */
	decimalPlaces?: number;
	/** (optional) The number to set the time to. Does not immediately start timer. (Default: 0) */
	startTime?: number; 
	/** (optional, default: 10) The number to set the minimum threshold before time starts to animate/warn player before hitting 0 */
	timeWarningThreshold?: number;
	/** (optional, default: false) Start timer immediately on instantiation */
	startNow?: boolean;
	/** (optional) Text to display on zero, leave blank or "" to just show numbers */
	onZeroText?: string;
}