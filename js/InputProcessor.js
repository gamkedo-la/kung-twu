//Input Processor
function InputProcessor() {
	const newKeys = new Set();
	const currentKeys = new Set();
	const releasedKeys = new Set();

	this.update = function() {
		newKeys.clear();
		releasedKeys.clear();
	};

	this.getNewlyActiveKeys = function() {
		return Array.from(newKeys);
	};

	this.newlyActiveKeysHas = function(keyToLookFor) {
		return newKeys.has(keyToLookFor);
	};

	this.getCurrentlyActiveKeys = function() {
		return Array.from(currentKeys);
	};

	this.getNewlyReleasedKeys = function() {
		return Array.from(releasedKeys);
	};

	this.addActiveKey = function(newActiveKey) {
		newKeys.add(newActiveKey);
		currentKeys.add(newActiveKey);
	};

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