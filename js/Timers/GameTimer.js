/**
 * Timer to both keep track of time and render the number of seconds left. 
 * Composed of a CountDownTimer with a draw function. Must be updated with deltaTime every frame for accurate timing.
 * @param {number} startingTime (optional) The number to set the time to. Does not immediately start timer. (Default: 0)
 * @param {number} decimalPlaces (optional) The number of decimal places to render the time with. (Default: 0)
 */
function GameTimer(time = 0, decimalPlaces = 0) {
	const _timer = new CountDownTimer(true);
	
	_timer.reset(time);
	/**
	 * Internal number of decimal places to render the timer
	 */
	let _decimalPlaces = Math.max(0, decimalPlaces);
	/**
	 * Get decimal places of the timer
	 */
	this.getDecimalPlaces = function() {
		return _decimalPlaces;
	};

	/**
	 * Set decimal places of the timer
	 */
	this.setDecimalPlaces = function(numPlaces) {
		_decimalPlaces = Math.max(0, numPlaces);
	};

	/**
	 * Pauses the timer
	 */
	this.pause = function() {
		_timer.setPause(true);
	};

	/**
	 * Resumes the timer if it was paused
	 */
	this.resume = function() {
		_timer.setPause(false);
	};

	/**
	 * Returns whether or not the timer is paused
	 */
	this.getPaused = function() {
		return _timer.getPause();
	};

	this.onZero = _timer.onZero;

	/**
	 * Resets the timer to a set number of seconds. Deactivates it if it were active. Ready to be started again with start()
	 * With a customizable time input, this leaves things flexibly to give each stage its own time limit.
	 * @param {number} seconds The number of seconds. Required to set this value.
	 */
	this.reset = function(seconds) {
		Debug.isValid(seconds, "number"); // It's important to pass a number here to make sure timer is reset to a value.
		_timer.reset(seconds);
	};
	
	/**
	 * Sets the timer to a value without changing its active status. If it is currently active, it will continue counting down from the new set time.
	 * Please use reset(seconds) to deactivate and set the time if you need that behavior.
	 */
	this.setTime = function(seconds) {
		_timer.setTime(seconds);
	};

	this.getTime = function() {
		return _timer.getTime();
	};

	/**
	 * Gets whether or not the timer is actively counting down. Timer can be active and paused at the same time.
	 * Active status happens only after start is called and ends until it reaches its destination.
	 * Timer's active status will be set to inactive if reset is called
	 */
	this.getActive = function() {
		_timer.getActive();
	};

	/**
	 * 
	 * @param {number} seconds (optional) The number of seconds to set the timer to when starting. 
	 * If left undefined it will use the current number of seconds on the clock. Please make sure to set this before either via reset or setTime to make sure alarm doesn't sound immediately.
	 */
	this.start = function(seconds) {
		if (seconds) {
			_timer.setTime(seconds);
		}

		_timer.start();
	};

	/**
	 * Updates the GameTimer's internal counting mechanism
	 * @param {number} deltaTime Pass delta time in milliseconds passed since last frame
	 */
	this.update = function(deltaTime) {
		_timer.update(deltaTime);
	};

	/**
	 * Renders text to the screen. 
	 * TODO: needs implementation.
	 */
	this.draw = function() {
		// The display time as a string
		const displayTime = _getFullRoundedTime() + "";
		console.log(displayTime);

		// TODO: Draw the text via the text rendering system here
		// Please use the functions below to get the values needed
		//
		//

	};

	/**
	 * Helper to return current time with _decimalPlaces number of decimal places.
	 */
	function _getFullRoundedTime() {
		const decimalShift = Math.pow(10, _decimalPlaces);
		return Math.round(Math.round(_timer.getTime() * decimalShift) / decimalShift);
	}

	/**
	 * Helper to get time as an integer. No decimal places.
	 */
	function _getTimeAsInt () {
		return Math.floor(_timer.getTime());
	}

	/**
	 * Helper to get time decimal place values. Intended to be used for displaying separate sizes
	 */
	function _getTimeDecimalPlaces() {
		return _getFullRoundedTime() % 1;
	}
}