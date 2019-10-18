/**
 * 
 * @param {number} startingTime (optional) The number to set the time to. Does not immediately start timer. (Default: 0)
 */
function GameTimer(time = 0, decimalPlaces = 0) {
	const _timer = new CountDownTimer(true);
	/**
	 * Internal number of decimal places to render the timer
	 */
	const _decimalPlaces = Math.max(0, decimalPlaces);
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

	this.reset = function(seconds) {
		_timer.reset(seconds);
	};

	/**
	 * Active status happens only after start is called and ends until it reaches its destination
	 */
	this.getActive = function() {
		_timer.getActive();
	};

	/**
	 * Sets the time without starting the timer
	 */
	this.setTime = function(time) {
		_timer.setTime(time);
	};
	this.setTime(time);

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

	this.draw = function() {

	};
}