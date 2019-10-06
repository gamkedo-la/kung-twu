/**
 * UI Progress Bar displays a rectangular bar with progress value.
 * @param {IProgressBarConfig} config Configuration object to create the UIProgressBar
 */
function UIProgressBar(config) {
	// Validate needed variable types for safe use below
	Debug.isValid(config, "object");
	// If this causes an error, it means defaults object global var probably was not instantiated before this constructor was called
	Debug.isValid(UIProgressBarDefaults, IProgressBarConfig); 
	// If this causes an error, instantiation of the canvasContext global var has not happened before the call to this constrctor.
	Debug.isValid(canvasContext, CanvasRenderingContext2D);

	// ========== Local Variables =========== //
	/**
	 * This object's reference to the global canvas rendering context
	 * @type CanvasRenderingContext2D 
	 */
	let _ctx = canvasContext;
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
			x = _progressBar.right;
			break;
		case "LEFT":
			x = _progressBar.left;
			break;
		case "TOP":
			x = _progressBar.left + _progressBar.width/2;
			break;
		case "BOTTOM":
			x = _progressBar.left + _progressBar.width/2;
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
			y = _progressBar.top + _progressBar.height/2;
			break;
		case "LEFT":
			y = _progressBar.top + _progressBar.height/2;
			break;
		case "TOP":
			y = _progressBar.top;
			break;
		case "BOTTOM":
			y = _progressBar.bottom;
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
	 * Renders the progress bar to the canvas!
	 */
	this.draw = function() {
		_ctx.save();
		_drawBaseBar();
		_drawProgressBar();
		_ctx.restore();
	};

	// =========== Private Functions =============
	/**
	 * Initializes the values of the UIProgressBar from the config
	 */
	function _initialize() {
		// Grab defaults from global UIProgressBarDefaults to fall back on
		let _defaults = UIProgressBarDefaults;
		// Set values
		_destination = config.destination || _defaults.destination;
		_bgColor = config.bgColor || _defaults.bgColor;
		_bgOutlineColor = config.bgOutlineColor || _defaults.bgOutlineColor;
		_progressColor = config.progressColor || _defaults.progressColor;
		_value = config.startingValue || _defaults.startingValue;

		// Dimensions used in Rectangles
		const _x = config.x || _defaults.x;
		const _y = config.x || _defaults.y;
		const _width = config.width || _defaults.width;
		const _height = config.height || _defaults.height;
		
		// Create Rectangles
		_baseBar = new Rectangle(_x, _y, _width, _height);
		_progressBar = new Rectangle(0, 0, 0, 0); // it's zero now, but _setProgressRect local function will fix that
		_updateProgressBarRect(_value);
	}

	/**
	 * Sets the _progressBar's rectangle values to their appropriate positions.
	 * Should be internally called after a value is set.
	 */
	function _updateProgressBarRect() {
		// hmm there must be a more functional way to handle this calculation?...
		switch (_destination) {
		case "RIGHT":
			_progressBar.x = _baseBar.left;
			_progressBar.y = _baseBar.top;
			_progressBar.width = _value * _baseBar.width;
			_progressBar.height = _baseBar.height;
			break;
		case "LEFT":
			_progressBar.x = _baseBar.left + (1 - _baseBar.width * _value);
			_progressBar.y = _baseBar.top;
			_progressBar.width = _baseBar.width * _value;
			_progressBar.height = _baseBar.height;
			break;
		case "TOP":
			_progressBar.x = _baseBar.left;
			_progressBar.y = _baseBar.top + (1 - _baseBar.height * _value);
			_progressBar.width = _baseBar.width;
			_progressBar.height = _baseBar.height * _value;
			break;
		case "BOTTOM":
			_progressBar.x = _baseBar.left;
			_progressBar.y = _baseBar.top;
			_progressBar.width = _baseBar.width;
			_progressBar.height = _baseBar.height * _value;
			break;
		}
	}

	/**
	 * Draws the base rectangle
	 */
	function _drawBaseBar() {
		_ctx.rect(_baseBar.left, _baseBar.top, _baseBar.width, _baseBar.height);
		_ctx.fillStyle(_bgColor);
		_ctx.strokeStyle(_bgOutlineColor);
		_ctx.stroke();
		_ctx.fill();
	}

	/**
	 * Draws the progress bar
	 */
	function _drawProgressBar() {
		_ctx.rect(_progressBar.left, _progressBar.top, _progressBar.width, _progressBar.height);
		_ctx.fillStyle(_progressColor);
		_ctx.strokeStyle("rgba(0,0,0,0)"); // no border, since it will be drawn by baseBar
		_ctx.stroke();
		_ctx.fill();
	}
}
