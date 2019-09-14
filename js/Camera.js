function Camera() {
	let position = {x:null, y:0};
	let parent = null;
	let minPos = -1000;//just some 
	let maxPos = 1000; //defaults

	this.getPosition = function () {
		if(position.x === null) {
			position.x = canvas.width/2;
		}
		return {x: position.x, y: position.y};
	};

	const setXPos = function(newXPos) {
		let posToUse = newXPos;
		if(posToUse < minPos) {
			posToUse = minPos;
		} else if(posToUse > maxPos) {
			posToUse = maxPos;
		}

		position.x = Math.floor(posToUse);
	};

	this.attach = function (entity) {
		if (entity.getPosition() != null) {
			parent = entity;
			setXPos(parent.getPosition().x);
			position.y = parent.getPosition().y;
		}
	};

	this.detach = function () {
		parent = null;
	};

	this.update = function() {
		if (parent != null) {
			let deadZoneLeft = position.x - deadZoneHalfWidth;
			let deadZoneRight = position.x + deadZoneHalfWidth;

			if (parent.getVelocity().x != 0) {
				if (parent.getPosition().x < deadZoneLeft) {
					setXPos(position.x + (parent.getPosition().x - deadZoneLeft));
				} else if (parent.getPosition().x > deadZoneRight) {
					setXPos(position.x + (parent.getPosition().x - deadZoneRight));
				}
			} else if (position.x != parent.getPosition().x) {
				setXPos(lerp(position.x, parent.getPosition().x, 0.1));
				if (Math.abs(position.x - parent.getPosition().x) < 1) {
					setXPos(parent.getPosition().x);
				}
			}
		}
	};

	this.setMinMaxPos = function(newMin, newMax) {
		minPos = newMin;
		maxPos = newMax;
	};

	this.draw = function() {
		canvasContext.resetTransform();
		canvasContext.clearRect(0, 0, canvas.width, canvas.height);
		canvasContext.translate(-position.x + (canvas.width / 2), 0);
	};
}