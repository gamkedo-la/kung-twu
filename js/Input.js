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

const DPAD_UP = "DPad-Up";
const DPAD_DOWN = "DPad-Down";
const DPAD_LEFT = "DPad-Left";
const DPAD_RIGHT = "DPad-Right";

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
	VOLUME_UP:KEY_PLUS,
	VOLUME_DOWN:KEY_MINUS,
	MUTE:KEY_M,
	LEVEL_UP:KEY_L //Debug mode input
};

const PAD_ALIAS = {
	UP: DPAD_UP,
	DOWN: DPAD_DOWN,
	LEFT: DPAD_LEFT,
	RIGHT: DPAD_RIGHT
};
const AXIS_PRECISION = 0.2;
const HORIZONTAL_AXIS = "horizontal";
const VERTICAL_AXIS = "vertical";
let gamepadAPI = {
	controllerIndex: undefined,
	active: false,
	connect: function (evt) {
		gamepadAPI.controllerIndex = evt.gamepad.index;
		gamepadAPI.active = true;
		console.log("Gamepad connected.");
	},

	disconnect: function () {
		gamepadAPI.active = false;
		delete gamepadAPI.controllerIndex;
		console.log("Gamepad disconnected.");
	},

	update: function () {
		gamepadAPI.buttons.cache = [];
		for (let i = 0; i < gamepadAPI.buttons.status.length; i++) {
			gamepadAPI.buttons.cache[i] = gamepadAPI.buttons.status[i];
		}
		gamepadAPI.buttons.status = [];
		let c = navigator.getGamepads()[gamepadAPI.controllerIndex] || {};
		let pressed = [];
		if (c.buttons) {
			for (let i = 0, l = c.buttons.length; i < l; i++) {
				if (c.buttons[i].pressed) {
					pressed[i] = gamepadAPI.buttons.layout[i];
				}
			}
		}
		let axes = [];
		if (c.axes) {
			for (let i = 0, l = c.axes.length; i < l; i++) {
				axes[i] = c.axes[i].toFixed(2);
			}
		}
		gamepadAPI.axes.status = axes;
		gamepadAPI.buttons.status = pressed;

		return pressed;
	},
	buttons: {
		layout: {
			12: DPAD_UP,
			13: DPAD_DOWN,
			14: DPAD_LEFT,
			15: DPAD_RIGHT
		},
		cache: [],
		status: [],
		pressed: function (button, hold) {
			let newPress = false;
			for (let i = 0, l = gamepadAPI.buttons.status.length; i < l; i++) {
				if (gamepadAPI.buttons.status[i] == button) {
					newPress = true;
					if (!hold) {
						for (let j = 0, len=gamepadAPI.buttons.cache.length; j < len; j++) {
							if (gamepadAPI.buttons.cache[j] == button) {
								newPress = false;
							}
						}
					}
				}
			}
			return newPress;
		},
		held: function (button) {
			return gamepadAPI.buttons.pressed(button, "hold");
		}
	},
	axes: {
		status: []
	}
};

function getAxis(axis) {
	if (HORIZONTAL_AXIS.localeCompare(axis, undefined, { sensitivity: "accent" }) == 0) {
		for (let i = 0; i < heldButtons.length; i++) {
			if (heldButtons[i] === ALIAS.LEFT)
				return -1.0;
			else if (heldButtons[i] === ALIAS.RIGHT)
				return 1.0;
		}

		if (gamepadAPI.active) {
			if (gamepadAPI.buttons.held(PAD_ALIAS.LEFT))
				return -1.0;
			else if (gamepadAPI.buttons.held(PAD_ALIAS.RIGHT))
				return 1.0;

			let axis = gamepadAPI.axes.status[0];
			return axis > -AXIS_PRECISION && axis < AXIS_PRECISION ? 0.0 : axis;
		}
	} else if (VERTICAL_AXIS.localeCompare(axis, undefined, { sensitivity: "accent" }) == 0) {
		for (let i = 0; i < heldButtons.length; i++) {
			if (heldButtons[i] === ALIAS.UP)
				return -1.0;
			else if (heldButtons[i] === ALIAS.DOWN)
				return 1.0;
		}

		if (gamepadAPI.active) {
			if (gamepadAPI.buttons.held(PAD_ALIAS.UP))
				return -1.0;
			else if (gamepadAPI.buttons.held(PAD_ALIAS.DOWN))
				return 1.0;

			let axis = gamepadAPI.axes.status[1];
			return axis > -AXIS_PRECISION && axis < AXIS_PRECISION ? 0.0 : axis;
		}
	}

	return 0.0;
}

function initializeInput() {
	document.addEventListener("keydown",keyPress);
	document.addEventListener("keyup",keyRelease);
	document.addEventListener("mousedown", mouseButtonPressed);
	document.addEventListener("mouseup", mouseButtonReleased);
	document.addEventListener("mousemove", calculateMousePos);
	// The following events don't work on document it appears
	window.addEventListener("gamepadconnected", gamepadAPI.connect);
	window.addEventListener("gamepaddisconnected", gamepadAPI.disconnect);
}

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
		pressedButton = LEFT_MOUSE_BUTTON;
		notifyCurrentScene(pressedButton, true);
	} else if(evt.button === 1) {//right mouse button is button 1
		pressedButton = RIGHT_MOUSE_BUTTON;
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
		releasedButton = LEFT_MOUSE_BUTTON;
		notifyCurrentScene(releasedButton, false);
	} else if(evt.button === 1) {//right mouse button is button 1
		releasedButton = RIGHT_MOUSE_BUTTON;
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

function mouseInside(x, y, width, height) {
	return mouseX > x && mouseX < x + width && mouseY > y	&& mouseY < y + height;
}

function pointInside(pointX, pointY, x, y, width, height) {
	return pointX > x && pointX < x + width && pointY > y && pointY < y + height;
}