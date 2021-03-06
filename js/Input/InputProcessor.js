//Input Processor
function InputProcessor() {
	const newKeys = new Set();
	const currentKeys = new Set();
	const releasedKeys = new Set();

	this.clear = function() {
		newKeys.clear();
		releasedKeys.clear();
		gamepad.clear();
	};

	this.getNewlyActiveKeys = function() {
		let result = gamepad.buttons.getJustPressed();
		result = result.concat(gamepad.axes.getJustPressed());
		return result.concat(Array.from(newKeys));
	};

	this.getCurrentlyActiveKeys = function() {
		let result = gamepad.buttons.getHeld();
		result = result.concat(gamepad.axes.getHeld());
		return result.concat(Array.from(currentKeys));
	};

	this.getNewlyReleasedKeys = function() {
		let result = gamepad.buttons.getJustReleased();
		result = result.concat(gamepad.axes.getJustReleased());
		result = result.concat(Array.from(releasedKeys));
		return result;
	};

	/**
	 * Event handler which receives Keyboard KeyCode's and MouseButton's when down
	 */
	this.addActiveKey = function(newActiveKey) {
		if(!currentKeys.has(newActiveKey)) {
			newKeys.add(newActiveKey);
			currentKeys.add(newActiveKey);	
		}
	};

	/**
	 * Event handler which recieves Keyboard KeyCode's and MouseButton's when released
	 */
	this.releaseKey = function(keyReleased) {
		let removedKey = false;
		if(currentKeys.has(keyReleased)) {
			currentKeys.delete(keyReleased);
			removedKey = true;
		}

		newKeys.delete(keyReleased);

		if(removedKey) {
			releasedKeys.add(keyReleased);
		}
	};
}