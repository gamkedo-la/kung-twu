/**
 * UIProgressBar is basically a health bar with the purpose of user interaction in mind, aimed to be flexible enough to work with other UI components.
 * Bar can be orientated in any one of the four 90-degree directions, and progress value can be set by normalized 0-1 value or screen position.
 * Constructor takes a configuration object with the type IProgressBarConfig that is intended to be written in object-literal notation.
 * Any value not filled in will fall back to the default values in IProgressBarConfig.
 * @param {IProgressBarConfig} config Configuration object to create the UIProgressBar
 */
function UIProgressBar(config) {
	// Validate needed variable types for safe use below
	Debug.isValid(config, "object");

	// ========== Local Variables ========== //

	/** 
	 * Primary rectangle of the progress bar. Used for referencing left, right, top, bottom, x, y.
	 * This will be internally set before any changes to progress bar Rectangle are made.
	 * @type {Rectangle} 
	 */
	let _baseBar;
	/**
	 * The Rectangle of the progress bar
	 * @type {Rectangle} 
	 */
	let _progressBar;
	/** 
	 * The current percentage of progress, a normalized number between 0 and 1.
	 * @type {number} 
	 */
	let _value;
	/** 
	 * Determines the bar's orientation based on the destination of progress.
	 * Answers the question: Which direction does this bar increase?
	 * @type {("RIGHT" | "LEFT" | "TOP" | "BOTTOM")} 
	 */
	let _destination;
	/** 
	 * The CSS color string or CanvasGradient of the background rect fillColor. Default is clear.
	 * @type {string | CanvasGradient} 
	 */
	let _bgColor;
	/**
	 * The CSS color string or CanvasGradient of the background's outline/strokeStyle. Default is clear.
	 * @type {string | CanvasGradient} 
	 */
	let _bgOutlineColor;
	/** 
	 * The CSS color string or CanvasGradient of the progress bar's fillStyle.
	 * @type {string | CanvasGradient} 
	 */
	let _progressColor;

	// Initialize the local variables above
	_initialize();

	// ============ Public Interface ================= //
	// ============ Getters and Setters =============== //
	/**
	 * Sets the position of the top-left corner of this progress bar
	 * @param {number} x x-position
	 * @param {number} y y-position
	 */
	this.setPosition = function(x, y) {
		_baseBar.x = x || _baseBar.x;
		_baseBar.y = y || _baseBar.y;
		_updateProgressBarRect();
	};

	/**
	 * Sets the width and height of this progress bar
	 * @param {number} width
	 * @param {height} height
	 */
	this.setDimensions = function(width, height) {
		_baseBar.width = width || _baseBar.width;
		_baseBar.height = height || _baseBar.height;
		_updateProgressBarRect();
	};

	/**
	 * Gets the top-left corner x-position of the background base bar
	 */
	this.getX = function() { return _baseBar.x; };
	/**
	 * Gets the top-left corner y-position of the background base bar
	 */
	this.getY = function() { return _baseBar.y; };
	/**
	 * Gets the width of the background base bar
	 */
	this.getWidth = function() { return _baseBar.width; };
	/**
	 * Gets the height of the background base bar
	 */
	this.getHeight = function() { return _baseBar.height; };
	/**
	 * Gets the percentage of progress as a normalized value (0-1)
	 */
	this.getValue = function() { return _value; };
	/**
	 * Sets the background color
	 * @param {string | CanvasGradient} color
	 */
	this.setBackgroundColor = function(color) {
		_bgColor = color;
	};
	/**
	 * Sets the background outline color
	 * @param {string | CanvasGradient} color
	 */
	this.setBackgroundOutlineColor = function(color) {
		_bgOutlineColor = color;
	};
	/**
	 * Sets the background outline color
	 * @param {string | CanvasGradient} color
	 */
	this.setProgressBarColor = function(color) {
		_progressColor = color;
	};

	/**
	 * Gets the x location of the centered position of the progress point.
	 * This is intended for binding something like a button or image on top of this point.
	 * Note: Decided to split function into two separate X/Y getters to prevent 
	 * needing to create objects every frame in interest of performance/Garbage Collection.
	 * @returns {number}
	 */
	this.getProgressPositionX = function() {
		let x = 0;
		switch(_destination) {
		case "RIGHT":
			x = _progressBar.getRight();
			break;
		case "LEFT":
			x = _progressBar.getLeft();
			break;
		case "TOP":
			x = _progressBar.getLeft() + _progressBar.width/2;
			break;
		case "BOTTOM":
			x = _progressBar.getLeft() + _progressBar.width/2;
			break;
		default:
			throw new Error("UIProgressBar destination set to an invalid value!");
		}
		return x;
	};

	/**
	 * Gets the y location of the centered position of the progress point.
	 * This is intended for binding something like a button or image on top of this point.
	 * Note: Decided to split function into two separate X/Y getters to prevent 
	 * needing to create objects every frame in interest of performance/Garbage Collection.
	 * @returns {number}
	 */
	this.getProgressPositionY = function() {
		let y = 0;
		switch(_destination) {
		case "RIGHT":
			y = _progressBar.getTop() + _progressBar.height/2;
			break;
		case "LEFT":
			y = _progressBar.getTop() + _progressBar.height/2;
			break;
		case "TOP":
			y = _progressBar.getTop();
			break;
		case "BOTTOM":
			y = _progressBar.getBottom();
			break;
		default:
			throw new Error("UIProgressBar destination set to an invalid value!");
		}
		return y;
	};

	/**
	 * Set the progress bar's value. 
	 * @param {number} value The value to set. Should be a number between 0 and 1, though it will automatically clamp the value.
	 */
	this.setValue = function(value) {
		if (value != undefined) {
			_value = clamp(value, 0, 1);
			_updateProgressBarRect();
		}
	};

	/**
	 * Sets the value by screen position
	 * @param {number} x
	 * @param {number} y
	 */
	this.setValueByScreenPos = function(x, y) {
		switch(_destination) {
		case "LEFT":
			_value = 1 - (x - _baseBar.getLeft()) / _baseBar.width;
			break;
		case "RIGHT":
			_value = (x - _baseBar.getLeft()) / _baseBar.width;
			break;
		case "TOP":
			_value = 1 - (y - _baseBar.getTop())/ _baseBar.height;
			break;
		case "BOTTOM":
			_value = (y - _baseBar.getTop())/ _baseBar.height;
			break;
		}
		_value = clamp(_value, 0, 1);
		_updateProgressBarRect();
	};

	/**
	 * Renders the progress bar to the canvas!
	 */
	this.draw = function() {
		canvasContext.save();
		_drawBaseBar();
		_drawProgressBar();	
		canvasContext.restore();
	};

	/**
	 * Helper to make a linear gradient in a particular direction with evenly-spaced color stops
	 * (Necessary for this object since it takes the inner basebar background rectangle dimensions into account.)
	 * @param {("RIGHT" | "LEFT" | "TOP" | "BOTTOM")} direction
	 * @param {string[]} colors A list of colors
	 * @returns {CanvasGradient} Returns a canvas gradient, or null if direction is not one of the four viable options
	 */
	this.makeGradient = function(direction, ...colors) {
		const left = _baseBar.getLeft();
		const right = _baseBar.getRight();
		const top = _baseBar.getTop();
		const bottom = _baseBar.getBottom();
		/** @type CanvasGradient */
		let grad = null;

		// Create the gradient, setting its x/y values according to the _baseBar dimensions
		switch (direction) {
		case "RIGHT":
			grad = canvasContext.createLinearGradient(left, 0, right, 0);
			break;
		case "LEFT":
			grad = canvasContext.createLinearGradient(right, 0, left, 0);
			break;
		case "BOTTOM":
			grad = canvasContext.createLinearGradient(0, top, 0, bottom);
			break;
		case "TOP":
			grad = canvasContext.createLinearGradient(0, bottom, 0, top);
			break;
		default:
			//console.log("Warning! Param direction in makeGradient was not a valid direction! Falling back to default destination.");
			return this.makeGradient(_destination);
		}

		// add gradient color stops
		for (let i = 0; i < colors.length; i++) {
			grad.addColorStop(i/(colors.length - 1) , colors[i]);
		}

		return grad;
	}; // End this.makeGradient

	// =========== Private Functions =============
	/**
	 * Initializes the values of the UIProgressBar from the config
	 */
	function _initialize() {
		// Grab defaults from global UIProgressBarDefaults to fall back on
		let _defaults = new IProgressBarConfig();
		// Set values
		_destination = config.destination || _defaults.destination;
		_bgColor = config.bgColor || _defaults.bgColor;
		_bgOutlineColor = config.bgOutlineColor || _defaults.bgOutlineColor;
		_progressColor = config.progressColor || _defaults.progressColor;
		_value = config.startingValue || _defaults.startingValue;
		_value = clamp(_value, 0, 1);
		// Dimensions used in Rectangles
		const _x = config.x || _defaults.x;
		const _y = config.y || _defaults.y;
		const _width = config.width || _defaults.width;
		const _height = config.height || _defaults.height;
		
		// Create Rectangles
		_baseBar = new Rectangle(_x, _y, _width, _height);
		_progressBar = new Rectangle(0, 0, 0, 0); // it's zero now, but _setProgressRect local function will fix that
		_updateProgressBarRect();
	}

	/**
	 * Sets the _progressBar's rectangle values to their appropriate positions.
	 * Should be internally called after a value is set.
	 */
	function _updateProgressBarRect() {
		// hmm there must be a more functional way to handle this calculation?...
		switch (_destination) {
		case "RIGHT":
			_progressBar.x = _baseBar.getLeft();
			_progressBar.y = _baseBar.getTop();
			_progressBar.width = _value * _baseBar.width;
			_progressBar.height = _baseBar.height;
			break;
		case "LEFT":
			_progressBar.x = _baseBar.getRight() + (1 - _baseBar.width * _value);
			_progressBar.y = _baseBar.getTop();
			_progressBar.width = _baseBar.width * _value;
			_progressBar.height = _baseBar.height;
			break;
		case "TOP":
			_progressBar.x = _baseBar.getLeft();
			_progressBar.y = _baseBar.getBottom() + (1 - _baseBar.height * _value);
			_progressBar.width = _baseBar.width;
			_progressBar.height = _baseBar.height * _value;
			break;
		case "BOTTOM":
			_progressBar.x = _baseBar.getLeft();
			_progressBar.y = _baseBar.getTop();
			_progressBar.width = _baseBar.width;
			_progressBar.height = _baseBar.height * _value;
			break;
		}

	}

	/**
	 * Draws the base rectangle
	 */
	function _drawBaseBar() {
		canvasContext.fillStyle = _bgColor;
		canvasContext.strokeStyle = _bgOutlineColor;
		canvasContext.beginPath();
		canvasContext.rect(_baseBar.getLeft(), _baseBar.getTop(), _baseBar.width, _baseBar.height);
		canvasContext.closePath();

		canvasContext.fill();
		canvasContext.stroke();
	}

	/**
	 * Draws the progress bar
	 */
	function _drawProgressBar() {
		canvasContext.fillStyle = _progressColor;
		canvasContext.beginPath();
		canvasContext.rect(_progressBar.getLeft(), _progressBar.getTop(), _progressBar.width, _progressBar.height);
		canvasContext.closePath();

		canvasContext.fill();
	}
}
