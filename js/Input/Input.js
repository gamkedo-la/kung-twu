/**
 * 
 */
function InputManager() {
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
		window.addEventListener("gamepadconnected", gamepad.connect);
		window.addEventListener("gamepaddisconnected", gamepad.disconnect);
	}

	/** Releases input listeners from the window and document */
	this.finalize = function finalize() {
		document.removeEventListener("keydown", keyPress);
		document.removeEventListener("keyup", keyRelease);
		document.removeEventListener("mousedown", mouseButtonPressed);
		document.removeEventListener("mouseup", mouseButtonReleased);
		document.removeEventListener("mousemove", calculateMousePos);
	
		//The following events are on the window as  
		//they don't seem to work on the document
		window.removeEventListener("gamepadconnected", gamepad.connect);
		window.removeEventListener("gamepaddisconnected", gamepad.disconnect);
	}

	// ============== EVENT HANDLERS ==================== //
	function notifyCurrentScene(newInput, pressed) {
		if(!SceneState.control(newInput, pressed)) {
			//Do something if required because the scene didn't handle the input
		}
	}
	function keyPress(evt) {
		evt.preventDefault();
	
		if(inputProcessor != null) {
			inputProcessor.addActiveKey(evt.keyCode);
		}
	
		notifyCurrentScene(evt.keyCode, true);
	}
	
	function keyRelease(evt) {
		evt.preventDefault();
	
		if(inputProcessor != null) {
			inputProcessor.releaseKey(evt.keyCode);
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
	
		if(inputProcessor != null) {
			inputProcessor.addActiveKey(pressedButton);
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
	
		if(inputProcessor != null) {
			inputProcessor.releaseKey(evt.keyCode);
		}
	}
	
	function calculateMousePos(evt) {
		const rect = canvas.getBoundingClientRect();
		mouseX = evt.clientX - rect.left;
		mouseY = evt.clientY - rect.top;
	}
}


// ============ HELPER FUNCTIONS ============= //
function mouseInside(x, y, width, height) {
	return mouseX > x && mouseX < x + width && mouseY > y	&& mouseY < y + height;
}

function pointInside(pointX, pointY, x, y, width, height) {
	return pointX > x && pointX < x + width && pointY > y && pointY < y + height;
}