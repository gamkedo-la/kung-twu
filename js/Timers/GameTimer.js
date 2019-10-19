"use strict";

/**
 * Timer to both keep track of time and render the number of seconds left. 
 * Two events intended for game event type of help are onZero (fires on zero) and onWarningCount (fires on each whole number time count below the time warning threshold).
 * Composed of a CountDownTimer with a draw function. Must be updated with deltaTime every frame for accurate timing.
 * @param {IGameTimerConfig} config
 */
function GameTimer(config) {
	// ========= SETTINGS ========== //
	// Time below this amount will start a text scale animation
	const _TIMER_WARNING_THRESHOLD = config.timeWarningThreshold || 10;
	// lerps an actual text scale value to chase the text scale
	const _TEXT_SCALE_LERP_CHASE_FACTOR =  .5; // must be greater than 0, less or equal to 1
	/** Size in pixels of the gap/space between seconds text rendering and decimal number text rendering */
	const TEXT_SECONDS_DECIMAL_GAP_SIZE = 2;
	/** The image scale of the numbers to be rendered to the left of the decimal point */
	let _textBaseScale = .4;
	let _textScale = 1;
	let _actualTextScale = _textScale;
	/** The image scale of the numbers to be rendered to the right of the decimal point */
	let  _decimalRelImageScale = .67;
	/** There is this image blend effect that will attempt to make the time appear to move smoothly. This is the length of frames of the smear effect */
	let _trailLength = 7;
	/** Text that displays when time is up, use "" to fallback to just zeroes */
	let _onZeroText = config.onZeroText || "";
	let _onZeroTextScale = 1; // scale of the onZeroText. Does not have an affect when _onZeroText = ""

	// ========= END SETTINGS ========= //

	/**
	 * Sets the scale of the images
	 */
	this.setTextScale = function(scale) {
		_textScale = scale;
	};

	this.getTextScale = function() {
		return _textScale;
	};

	/**
	 * Sets the number of frames the blend trail effect will cover. May increase drama as the timer counts down
	 */
	this.setTrailLength = function(length) {
		_trailLength = length;
	};

	/**
	 * Gets the number of frames the timer has set to blend the timer image
	 */
	this.getTrailLength = function() {
		return _trailLength;
	};

	const _timer = new CountDownTimer(true);

	
	_timer.reset(config.startTime || 0);
	/**
	 * Internal number of decimal places to render the timer
	 */
	let _decimalPlaces = Math.max(0, config.decimalPlaces || 0);
	/**
	 * Get decimal places of the timer
	 */
	this.getNumOfDecimalPlaces = function() {
		return _decimalPlaces;
	};

	/**
	 * Set decimal places of the timer
	 * @param {number} numPlaces Number of zero-padded decimal places to render
	 */
	this.setNumOfDecimalPlaces = function(numPlaces) {
		_decimalPlaces = Math.max(0, numPlaces);
	};

	/**
	 * Pauses the timer
	 */
	this.pause = function() {
		_timer.setPause(true);
	};

	let _position = config.position || {x: 0, y: 0};
	this.getPosition = function() {
		return _position;
	};

	/**
	 * Set the rendering position. This will be where the decimal point will be.
	 * @param {number} x
	 * @param {number} y
	 */
	this.setPosition = function(x, y) {
		_position.x = x;
		_position.y = y;
	};

	/**
	 * Tracks the times of the last _trailLength frames for slight smear/blur animation
	 * @type number[]
	 */
	let _lastTimes = [];
	_lastTimes.push(config.startTime);
	this.timeLastFrames = _lastTimes;

	/**
	 * 
	 * @param {string} onZeroText Replacement text instead of number display. Set to "" to count as null.
	 */
	this.setOnZeroText = function(onZeroText, scale) {
		_onZeroText = onZeroText;
		_onZeroTextScale = scale;
	};

	this.getOnZeroText = function() {
		return _onZeroText;
	};

	/** @type EventHandle<number> */
	const _onWarningCount = new EventHandle();
	this.onWarningCount = _onWarningCount;

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
	 * Sets the timer to a value without affecting its active status. If it is currently active, it will continue counting down from the new set time.
	 * Please use reset(seconds) to deactivate and set the time if you need that behavior.
	 */
	this.setTime = function(seconds) {
		_timer.setTime(seconds);
	};

	/**
	 * Gets the remaining time as a floating point number
	 */
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
	if (config.startNow) {this.start();}

	/**
	 * Updates the GameTimer's internal counting mechanism
	 * @param {number} deltaTime Pass delta time in milliseconds passed since last frame
	 */
	this.update = function(deltaTime) {
		const timer = _timer;
		const time = timer.getTime();
		
		// Update the timer
		timer.update(deltaTime);

		// Adjust the timer scale when under the warning threshold (set in the constant above)
		if (time < _TIMER_WARNING_THRESHOLD) {
			_textScale = Math.min(1  - time % 1.0 + .5, 1);

			if (_lastTimes[_lastTimes.length-1] % 1.0 < time % 1.0) {
				_onWarningCount.send(Math.floor(time));
			}
		}

		const textScale = _textScale * _textBaseScale;
		// Calculate text scale
		if (_actualTextScale !== textScale) {
			_actualTextScale = lerp(_actualTextScale, textScale, _TEXT_SCALE_LERP_CHASE_FACTOR);
		}

		// Update last time array (its length is the _trailLength var)
		_addLastTime(time);
	};

	/**
	 * Renders text to the screen. 
	 */
	this.draw = function() {

		// Retrieve the string values to render the current time
		const secondsStr = _getTimeWholeDigitsStr(_timer.getTime(), 0);
		const decimalsStr = _getTimeDecimalDigitsStr(_timer.getTime(), _decimalPlaces);

		// Grab the font
		const font = JPFont;
		if (!font) return; // perhaps we should make a fallback for this if font doesn't load for some reason?

		// Render text
		if (_timer.getTime() > 0 || _onZeroText === "") {
			// Time is greater than zero or we just don't need to worry about zero replacement text:
			_drawTime(font, secondsStr, decimalsStr, _position, 1);
			if (_lastTimes.length > 0) {
				for (let i = _lastTimes.length - 1; i >= 0; i--) {
					// calculate time nums to strings for last time values
					const seconds = _getTimeWholeDigitsStr(_lastTimes[i], 0);
					const decimals = _getTimeDecimalDigitsStr(_lastTimes[i], _decimalPlaces);
					// render the trail of last times
					_drawTime(font, seconds, decimals, _position, i/(_lastTimes.length-1) * .5);
				}
			}
		} else {
			// Time is up, and we have onZero replacement text to render
			const lang = currentLanguage;
			if (lang) {
				// edit this to change position/alignment/scale of the final text if we have it set above
				font.printTextAt(_onZeroText, _position, TextAlignment.Left,_onZeroTextScale * _textBaseScale, lang, 1);
			}
			
		}

	};

	/**
	 * Draws both the whole numbers and decimals at different sizes based on the local constants SECONDS_IMAGE_SCALE, and DECIMALS_IMAGE_SCALE
	 * @param {fontSystem} font The font to render with (JPFont)
	 * @param {string} secondsStr The seconds whole number as a string
	 * @param {string} decimalsStr The decimals padded with zeroes as a string
	 * @param {{x: number, y: number}} position The position to render at, left-aligned
	 * @param {number} alpha range(0-1) Transparency
	 */
	function _drawTime(font, secondsStr, decimalsStr, position, alpha) {
		const lang = currentLanguage;
		font.printTextAt(secondsStr, position, TextAlignment.Left, _actualTextScale, lang, alpha);
		font.printTextAt(decimalsStr, {x: position.x + TEXT_SECONDS_DECIMAL_GAP_SIZE + _getSecondsTextWidth(), y: position.y}, TextAlignment.Left, _actualTextScale * _decimalRelImageScale, lang, alpha);
	}

	function _addLastTime(time) {
		if (_trailLength === 0) return;

		while (_lastTimes.length >= _trailLength) {
			_lastTimes.shift();
		}

		_lastTimes.push(time);
	}

	this.getSecondsTextWidth = _getSecondsTextWidth;
	function _getSecondsTextWidth() {
		const lang = currentLanguage;
		return _getTextWidth(_getTimeWholeDigitsStr(_timer.getTime(), 0), _actualTextScale, lang);
	}
	this.getDecimalTextWidth = function() {
		const lang = currentLanguage;
		return _getTextWidth(_getTimeDecimalDigitsStr(_timer.getTime(), _decimalPlaces), _actualTextScale * _decimalRelImageScale, lang);
	};

	this.getFullTextWidth = function() {

	};

	/**
	 * 
	 * @param {string} text 
	 * @param {number} scale 
	 * @param {any} lang Most likely will be currentLanguage
	 */
	function _getTextWidth(text, scale, lang) {
		// grab global variables
		const font = JPFont;
		if (font && lang) { // check that they're okay to use
			return font.getStringWidth(text, scale, lang);
		} else {
			throw new Error("JPFont or currentLanguage is not set! Cannot read the width of GameTimer text");
		}
	}

	/**
	 * Helper to return current time with _decimalPlaces number of decimal places.
	 * @param {number} wholeZeroPad The number of zeros to pad number if shorter than this number in digit length
	 * @param {number} decimalZeroPad Same as wholeZeroPad but for decimal digits.
	 */
	this.getTimeStr = function(wholeZeroPad, decimalZeroPad) {
		return _getTimeWholeDigitsStr(_timer.getTime(), wholeZeroPad) + "." + _getTimeDecimalDigitsStr(_timer.getTime(), decimalZeroPad);
	};

	/**
	 * Helper to get whole number digits of remaining time. Intended to be used for displaying separate styling for seconds/decimals. Returns String!
	 * @param {number} time The time to get the whole digits of
	 * @param {number} numZeroPad The number of zeros to pad number if shorter than this passed number in digit length
	 */
	this.getTimeWholeDigitsStr = _getTimeWholeDigitsStr;
	function _getTimeWholeDigitsStr (time, numZeroPad = 0) {
		return _padZeroes(Math.floor(time), numZeroPad);
	}

	/**
	 * Helper to get time decimal place values. Intended to be used for displaying separate styling for seconds/decimals. Returns String!
	 * @param {number} time The time to get the decimal digits of.
	 * @param {number} decimalPlaces Number of decimal places to get
	 * @param {number} numZeroPad (optional)The number of zeros to pad number if shorter than this passed number in digit length. Will fallback to decimal places if not specified.
	 */
	this.getTimeDecimalDigitsStr = _getTimeDecimalDigitsStr;
	function _getTimeDecimalDigitsStr(time, decimalPlaces, numZeroPad) {
		let numStr = (time % 1) + "";
		let startIndex = numStr.indexOf(".");

		if (startIndex === -1) { // just in case there's no "."
			return _padZeroes(0, numZeroPad || decimalPlaces); // return string of 0's
		} else {
			startIndex ++;
		}
		numStr = _padZeroes(numStr.substring(startIndex, startIndex + decimalPlaces), numZeroPad || decimalPlaces);
		return numStr;
	}

	/**
	 * Pad number with zeroes if shorter than digitPlaces length
	 * @param {number} num number to pad
	 * @param {number} digitPlaces number of places
	 */
	function _padZeroes(num, digitPlaces) {
		let numStr = num.toString(10);
		while (numStr.length < digitPlaces) {
			numStr = "0" + numStr;
		}
		return numStr;
	}
}
