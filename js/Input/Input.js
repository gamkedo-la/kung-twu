//Input Commons
function initializeInput() {
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

function notifyCurrentScene(newInput, pressed) {
	if(!SceneState.control(newInput, pressed)) {
		//Do something if required because the scene didn't handle the input
	}
}

/**
 * Subscribe to this handle to receive callbacks on key presses.
 * Callback Signature: (evt: KeyboardEvent) => void
 */
const onKeyPress = new EventHandle();
/**
 * Subscribe to this handle to receive callbacks on key releases.
 * Callback Signature: (evt: KeyboardEvent) => void
 */
const onKeyRelease = new EventHandle();
/**
 * Subscribe to this handle to receive callbacks on mouse buttons presses.
 * Callback Signature: (evt: KeyboardEvent) => void
 */
const onMouseButtonPressed = new EventHandle();
/**
 * Subscribe to this handle to receive callbacks on mouse button releases.
 * Callback Signature: (evt: MouseEvent) => void
 */
const onMouseButtonReleased = new EventHandle();
/**
 * Subscribe to this handle to receive callbacks on mouse move.
 * Callback Signature: (evt: MouseEvent, mouseX, mouseY) => void
 * mouseX and mouseY are the calculated positions in the game frame.
 */
const onMouseMove = new EventHandle();

function keyPress(evt) {
	evt.preventDefault();

	if(inputProcessor != null) {
		inputProcessor.addActiveKey(evt.keyCode);
	}

	notifyCurrentScene(evt.keyCode, true);
	onKeyPress.send(evt);
}



function keyRelease(evt) {
	evt.preventDefault();

	if(inputProcessor != null) {
		inputProcessor.releaseKey(evt.keyCode);
	}

	notifyCurrentScene(evt.keyCode, false);
	onKeyRelease.send(evt);
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
	onMouseButtonPressed.send(evt);
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
	onMouseButtonReleased.send(evt);
}

function calculateMousePos(evt) {
	const rect = canvas.getBoundingClientRect();
	mouseX = evt.clientX - rect.left;
	mouseY = evt.clientY - rect.top;
	onMouseMove.send(evt, mouseX, mouseY);
}

function mouseInside(x, y, width, height) {
	return mouseX > x && mouseX < x + width && mouseY > y	&& mouseY < y + height;
}

function pointInside(pointX, pointY, x, y, width, height) {
	return pointX > x && pointX < x + width && pointY > y && pointY < y + height;
}