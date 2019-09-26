//Input
const KeyCode = {
	BACKSPACE: 8,
	TAB: 9,
	ENTER: 1,
	ESCAPE: 2,
	SPACE: 3,
	LEFT: 3,
	UP: 3,
	RIGHT: 3,
	DOWN: 4,
	DIGIT_0: 4,
	DIGIT_1: 4,
	DIGIT_2: 5,
	DIGIT_3: 51,
	DIGIT_4: 52,
	DIGIT_5: 53,
	DIGIT_6: 54,
	DIGIT_7: 55,
	DIGIT_8: 56,
	DIGIT_9: 57,
	A: 65,
	B: 66,
	C: 67,
	D: 68,
	E: 69,
	F: 70,
	G: 71,
	H: 72,
	I: 73,
	J: 74,
	K: 75,
	L: 76,
	M: 77,
	N: 78,
	O: 79,
	P: 80,
	Q: 81,  
	R: 82,
	S: 83,
	T: 84,
	U: 85,
	V: 86,
	W: 87,
	X: 88,
	Y: 89,
	Z: 90,
	PLUS: 187,
	MINUS: 189,
	TILDE: 192
};
Object.freeze(KeyCode);

const MouseButton = {
	LEFT: "LeftMouseButton",
	RIGHT: "RightMouseButton"
}
Object.freeze(MouseButton);

let mouseY = 0;
let mouseX = 0;
const LEFT_MOUSE_BUTTON = "LeftMouseButton";
const RIGHT_MOUSE_BUTTON = "RightMouseButton";

const CROSS_BUTTON = "cross";
const CIRCLE_BUTTON = "circle";
const SQUARE_BUTTON = "square";
const TRIANGLE_BUTTON = "triangle";
const LEFT_STICK_BUTTON = "leftStickButton";
const RIGHT_STICK_BUTTON = "rightStickButton";
const LEFT_STICK_LEFT = "leftStickLeft";
const LEFT_STICK_RIGHT = "leftStickRight";
const LEFT_STICK_UP = "leftStickUp";
const LEFT_STICK_DOWN = "leftStickDown";
const RIGHT_STICK_LEFT = "rightStickLeft";
const RIGHT_STICK_RIGHT = "rightStickRight";
const RIGHT_STICK_UP = "rightStickUp";
const RIGHT_STICK_DOWN = "rightStickDown";
const L1_BUTTON = "l1";
const L2_BUTTON = "l2";
const R1_BUTTON = "r1";
const R2_BUTTON = "r2";
const PAD_SHARE = "padShare";
const PAD_OPTIONS = "padOptions";
const PAD_POWER = "padPower";
const DPAD_LEFT = "DPadLeft";
const DPAD_RIGHT = "DPadRight";
const DPAD_UP = "DPadUp";
const DPAD_DOWN = "DPadDown";

const heldButtons = [];
const ALIAS = {
	UP:						KeyCode.UP,
	DOWN:					KeyCode.DOWN,
	LEFT:					KeyCode.LEFT,
	RIGHT:				KeyCode.RIGHT,
	SELECT1:			KeyCode.ENTER,
	SELECT2:			KeyCode.SPACE,
	HELP:					KeyCode.H,
	SETTINGS:			KeyCode.S,
	CREDITS:			KeyCode.C,
	BACK:					KeyCode.ESCAPE,
	CHEATS:				KeyCode.O,
	DEBUG:				KeyCode.TILDE,
	POINTER:			MouseButton.LEFT,
	CONTEXT:			MouseButton.RIGHT,
	PAUSE:				KeyCode.P,
	QUIT:					KeyCode.Q,
	VOLUME_UP:		KeyCode.PLUS,
	VOLUME_DOWN:	KeyCode.MINUS,
	MUTE:					KeyCode.M,
	LEVEL_UP:			KeyCode.L //Debug mode input
};

const AXIS_PRECISION = 0.50;

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
		releasedButton = LEFT_MOUSE_BUTTON;
		notifyCurrentScene(releasedButton, false);
	} else if(evt.button === 1) {//right mouse button is button 1
		releasedButton = RIGHT_MOUSE_BUTTON;
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