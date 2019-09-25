//Input
const KEY_BACKSPACE = 8;
const KEY_TAB = 9;
const KEY_ENTER = 13;
const KEY_ESCAPE = 27;
const KEY_SPACE = 32;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const DIGIT_0 = 48;
const DIGIT_1 = 49;
const DIGIT_2 = 50;

const DIGIT_3 = 51;
const DIGIT_4 = 52;
const DIGIT_5 = 53;
const DIGIT_6 = 54;
const DIGIT_7 = 55;

const DIGIT_8 = 56;
const DIGIT_9 = 57;

const KEY_A = 65;
const KEY_B = 66;
const KEY_C = 67;
const KEY_D = 68;
const KEY_E = 69;
const KEY_F = 70;
const KEY_G = 71;
const KEY_H = 72;
const KEY_I = 73;
const KEY_J = 74;
const KEY_K = 75;
const KEY_L = 76;
const KEY_M = 77;
const KEY_N = 78;
const KEY_O = 79;
const KEY_P = 80;
const KEY_Q = 81;  
const KEY_R = 82;
const KEY_S = 83;
const KEY_T = 84;
const KEY_U = 85;
const KEY_V = 86;
const KEY_W = 87;
const KEY_X = 88;
const KEY_Y = 89;
const KEY_Z = 90;

const KEY_PLUS = 187;
const KEY_MINUS = 189;
const KEY_TILDE = 192;

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
	UP:KEY_UP,
	DOWN:KEY_DOWN,
	LEFT:KEY_LEFT,
	RIGHT:KEY_RIGHT,
	SELECT1:KEY_ENTER,
	SELECT2:KEY_SPACE,
	HELP:KEY_H,
	SETTINGS:KEY_S,
	CREDITS:KEY_C,
	BACK:KEY_ESCAPE,
	CHEATS:KEY_O,
	DEBUG:KEY_TILDE,
	POINTER:LEFT_MOUSE_BUTTON,
	CONTEXT:RIGHT_MOUSE_BUTTON,
	PAUSE:KEY_P,
	QUIT:KEY_Q,
	VOLUME_UP:KEY_PLUS,
	VOLUME_DOWN:KEY_MINUS,
	MUTE:KEY_M,
	LEVEL_UP:KEY_L //Debug mode input
};

const AXIS_PRECISION = 0.50;

function initializeInput() {
	document.addEventListener("keydown",keyPress);
	document.addEventListener("keyup",keyRelease);
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
		pressedButton = LEFT_MOUSE_BUTTON;
		notifyCurrentScene(pressedButton, true);
	} else if(evt.button === 1) {//right mouse button is button 1
		pressedButton = RIGHT_MOUSE_BUTTON;
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