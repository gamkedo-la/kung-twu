function KTGamePad(inputManager) {
	Debug.isValid(inputManager, InputManager);
	// ========= Private Variables ===========
	/**
	 * Private reference to the game's InputManager
	 * @type InputManager
	 */
	const _input = inputManager;

	/**
	 * Set by hand here to log debug messages or not in all KTGamePad's.
	 */
	const _DEBUG = true;

	/**
	 * Whether this controller is actively connected or not.
	 * @returns boolean 
	 */
	let _active = false;

	
	/**
	 * The gamepad's index as registered by the window/browser
	 */
	let _controllerIndex = null; // perhaps -1?

	// ========== Public Getters ===============
	/**
	 * Get whether this controller is actively connected or not.
	 * @returns boolean
	 */
	this.getActive = () => _active;

	// =========== Public Properties ===========
	// Need an input processor here for axes and buttons!
  

	// ========== Public Functions  ==============
	this.initialize = function() {
		if (_input) {
			_input.onGamePadConnected.subscribe(connect, false, this);
			_input.onGamePadDisconnected.subscribe(disconnect, false, this);
		} else {
			if (_DEBUG) {
			//console.log('ERROR! The InputManager reference in the KTGamePad instance is either null or undefined. Could not initialize KTGamePad!');
			}
		}
	};

	// ================== Publicly Called Events =======================
	this.update = function() {
		let controller = navigator.getGamepads()[gamepad.controllerIndex];
		if (controller) {
			this.buttons.update(controller.buttons);
			this.axes.update(controller.axes);
		}
	}

	// ================== PRIVATE EVENT HANDLERS =======================
	/**
	 * Event handler/processor when gamepad is connected. 
	 * Note: Currently set to work for only one singleton gamepad.
	 * @param {GamepadEvent} evt 
	 */
	function connect (evt) {
		const controllerIndex = evt.gamepad.index;
		_controllerIndex = controllerIndex;
		_active = true;
		//if (_DEBUG) console.log('Gamepad Connected! Controller Index: ' + controllerIndex);
	}

	/**
	 * Event handler/processor when gamepad is connected.
	 * When subscribing event, make sure to include an explicit 'this' binding.
	 * @param {GamepadEvent} evt 
	 */
	function disconnect (evt) {
		const controllerIndex = evt.gamepad.index;
		// If controller index of disconnected controller matches this controller
		if (controllerIndex === _controllerIndex) {
			// Disconnect this controller
			_controllerIndex = null;
			_active = false;
			//if (_DEBUG) console.log('Gamepad Disconnected! Controller Index: ' + controllerIndex);
		}	
	}

	


	
}