//Game Pad Process
const gamepad = {
	controllerIndex: undefined,
	active: false,
	connect: function (evt) {
		gamepad.controllerIndex = evt.gamepad.index;
		gamepad.active = true;
		console.log("Gamepad connected.");
	},

	disconnect: function() {
		gamepad.active = false;
		delete gamepad.controllerIndex;
		console.log("Gamepad disconnected.");
	},

	update: function() {
		let controller = navigator.getGamepads()[gamepad.controllerIndex];
		if (controller) {
			gamepad.buttons.update(controller.buttons);
			gamepad.axes.update(controller.axes);
		}
	},

	clear: function() {
		gamepad.buttons.clear();
		gamepad.axes.clear();
	},

	buttons: {
		/** @type string[] */
		justPressed: [],
		getJustPressed: function() {
			return gamepad.buttons.justPressed;
		},
		/** @type string[] */
		held: [],
		getHeld: function() {
			return gamepad.buttons.held;
		},
		/** @type string[] */
		justReleased: [],
		getJustReleased: function() {
			return gamepad.buttons.justReleased;
		},
		
		/**
		 * 
		 * @param {string[]} controllerButtons 
		 */
		update: function(controllerButtons) {
			
			gamepad.buttons.justPressed = [];
			gamepad.buttons.justReleased = [];

			for(let i = 0; i < controllerButtons.length; i++) {
				const thisButton = controllerButtons[i];
				let thisButtonName = gamepadButtonNameForIndex(i);
				let wasHeld = false;
				let j = 0; 
				for(;j < gamepad.buttons.held.length; j++) {
					if(thisButtonName === gamepad.buttons.held[j]) {
						wasHeld = true;
						break;
					}
				}

				if(thisButton.pressed) {
					if(!wasHeld) {
						gamepad.buttons.justPressed.push(thisButtonName);
						gamepad.buttons.held.push(thisButtonName);
					}
				} else {
					if(wasHeld) {
						gamepad.buttons.held.splice(j, 1);
						gamepad.buttons.justReleased.push(thisButtonName);
					}
				}//end if/else button was pressed
			}//end loop through gamepad buttons
		},//end buttons.update()

		clear: function() {
			gamepad.buttons.justPressed = [];
			gamepad.buttons.justReleased = [];
		}
	},//end buttons object

	axes: {
		justPressed: [],
		getJustPressed: function() {
			return gamepad.axes.justPressed;
		},
		held: [],
		getHeld: function() {
			return gamepad.axes.held;
		},
		justReleased: [],
		getJustReleased: function() {
			let result = gamepad.axes.justReleased;
			return result;
		},
		update: function(controllerAxes) {
			for(let i = 0; i < controllerAxes.length; i++) {
				updateGamepadAxisStatus(i, controllerAxes[i]);
			}
		},

		clear: function() {
			gamepad.axes.justPressed = [];
			gamepad.axes.justReleased = [];
		},
	}//end axes object
};//end gamepad object

function gamepadButtonNameForIndex(index) {
	switch(index) {
	case 0: return CROSS_BUTTON;
	case 1: return CIRCLE_BUTTON;
	case 2: return SQUARE_BUTTON;
	case 3: return TRIANGLE_BUTTON;												
	case 4: return L1_BUTTON;
	case 5: return R1_BUTTON;
	case 6: return L2_BUTTON;
	case 7: return R2_BUTTON;												
	case 8: return PAD_SHARE;
	case 9: return PAD_OPTIONS;
	case 10: return LEFT_STICK_BUTTON;
	case 11: return RIGHT_STICK_BUTTON;												
	case 12: return DPAD_UP;
	case 13: return DPAD_DOWN;
	case 14: return DPAD_LEFT;
	case 15: return DPAD_RIGHT;	
	case 16: return PAD_POWER;											
	}
}

function gamepadAxisNameForIndexAndValue(index, value) {
	switch(index) {
	case 0:
		if(value <= 0) {
			return LEFT_STICK_LEFT;
		} else {
			return LEFT_STICK_RIGHT;
		}
	case 1:
		if(value <= 0) {
			return LEFT_STICK_UP;
		} else {
			return LEFT_STICK_DOWN;
		}
	case 2:
		if(value <= 0) {
			return RIGHT_STICK_LEFT;
		} else {
			return RIGHT_STICK_RIGHT;
		}
	case 3:
		if(value <= 0) {
			return RIGHT_STICK_UP;
		} else {
			return RIGHT_STICK_DOWN;
		}
	}
}

function getWasAxisHeld(name) {
	for(j = 0; j < gamepad.axes.held.length; j++) {
		if(name === gamepad.axes.held[j]) {
			return {wasHeld:true, index:j};
		}
	}

	return {wasHeld:false, index:null};
}

function updateGamepadAxisStatus(index, value) {
	if(Math.abs(value) > AXIS_PRECISION) {
		processPressedAxis(gamepadAxisNameForIndexAndValue(index, value));
	} else if(Math.abs(value) > 0.1) {
		processReleasedAxis(gamepadAxisNameForIndexAndValue(index, value));
	} else {
		processReleasedAxis(gamepadAxisNameForIndexAndValue(index, value + 1));
		processReleasedAxis(gamepadAxisNameForIndexAndValue(index, value - 1));
	}
}

function processPressedAxis(name) {
	if(!getWasAxisHeld(name).wasHeld) {
		gamepad.axes.justPressed.push(name);
		gamepad.axes.held.push(name);
	}
}

function processReleasedAxis(name) {
	let heldData = getWasAxisHeld(name);

	if(heldData.wasHeld) {
		gamepad.axes.held.splice(heldData.index, 1);
		gamepad.axes.justReleased.push(name);
	}
}