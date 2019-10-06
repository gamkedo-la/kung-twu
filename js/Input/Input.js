/**
 * Initializes and finalizes connection to the window/document
 * Plan to become the center for input querying and management.
 * @param {InputProcessor} inputProcessor
 * @param {gamepad} gamepad
 */
function InputManager(inputProcessor, gamepad) {
	if (!(inputProcessor instanceof InputProcessor)) {
		throw new Error("inputProcessor param passed into InputManager is not a valid instanceof InputProcessor!");
	}
	if (!gamepad) {
		throw new Error("Please pass valid gamepad into InputManager. It is either null or undefined!");
	}
	const _gamepad = gamepad;
	const _inputProcessor = inputProcessor;

	/** Fires when a Gamepad has connected to the window */
	this.onGamePadConnected = new EventHandle();
	this.onGamePadDisconnected = new EventHandle();

	/** Initializes input listeners to the window and document */
	this.initialize = function initialize() {
		document.addEventListener("keydown", keyPress);
		document.addEventListener("keyup", keyRelease);
		document.addEventListener("mousedown", mouseButtonPressed);
		document.addEventListener("mouseup", mouseButtonReleased);
		document.addEventListener("mousemove", calculateMousePos);
	
		//The following events are on the window as
		//they don't seem to work on the document
		window.addEventListener("gamepadconnected", _gamepad.connect);
		window.addEventListener("gamepaddisconnected", _gamepad.disconnect);
	};

	/** Releases input listeners from the window and document */
	this.finalize = function finalize() {
		document.removeEventListener("keydown", keyPress);
		document.removeEventListener("keyup", keyRelease);
		document.removeEventListener("mousedown", mouseButtonPressed);
		document.removeEventListener("mouseup", mouseButtonReleased);
		document.removeEventListener("mousemove", calculateMousePos);
	
		//The following events are on the window as  
		//they don't seem to work on the document
		window.removeEventListener("gamepadconnected", _gamepad.connect);
		window.removeEventListener("gamepaddisconnected", _gamepad.disconnect);
	};

	// ============== EVENT HANDLERS ==================== //
	function notifyCurrentScene(newInput, pressed) {
		if(!SceneState.control(newInput, pressed)) {
			//Do something if required because the scene didn't handle the input
		}
	}
	function keyPress(evt) {
		evt.preventDefault();
		// Testing Music Transition, will delete soon!
		if (evt.keyCode == KeyCode.O) {
			currentBackgroundMusic.transitionTo(bossMusic1, 3, 1);
		}
			
		if(_inputProcessor != null) {
			_inputProcessor.addActiveKey(evt.keyCode);
		}
	
		notifyCurrentScene(evt.keyCode, true);
	}
	
	function keyRelease(evt) {
		evt.preventDefault();
	
		if(_inputProcessor != null) {
			_inputProcessor.releaseKey(evt.keyCode);
		}
		
		notifyCurrentScene(evt.keyCode, false);
	}
	
	function mouseButtonPressed(evt) {
		evt.preventDefault();

		let pressedButton;
		if (evt.button === 0) {//left mouse button is button 0
			pressedButton = MouseButton.LEFT;
			notifyCurrentScene(pressedButton, true);
		} else if(evt.button === 1) {//right mouse button is button 1
			pressedButton = MouseButton.RIGHT;
			notifyCurrentScene(pressedButton, true);
		}
	
		if(_inputProcessor != null) {
			_inputProcessor.addActiveKey(pressedButton);
		}
	}
	
	function mouseButtonReleased(evt) {
		evt.preventDefault();

		let releasedButton;
		if (evt.button === 0) {//left mouse button is button 0
			releasedButton = MouseButton.LEFT;
			notifyCurrentScene(releasedButton, false);
		} else if(evt.button === 1) {//right mouse button is button 1
			releasedButton = MouseButton.RIGHT;
			notifyCurrentScene(releasedButton, false);
		}
	
		if(_inputProcessor != null) {
			_inputProcessor.releaseKey(evt.keyCode);
		}
	}
	
	function calculateMousePos(evt) {
		const rect = canvas.getBoundingClientRect();
		mouseX = evt.clientX - rect.left;
		mouseY = evt.clientY - rect.top;
	}
}


// ============ HELPER FUNCTIONS Globally available ============= //
function mouseInside(x, y, width, height) {
	return mouseX > x && mouseX < x + width && mouseY > y	&& mouseY < y + height;
}

function pointInside(pointX, pointY, x, y, width, height) {
	return pointX > x && pointX < x + width && pointY > y && pointY < y + height;
}