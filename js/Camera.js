function Camera() {
	let position = {x:0, y:0};
	let parent = null;

	this.getPosition = function () {
		return {x: position.x, y: position.y};
	};

	this.attach = function (entity) {
		if (entity.getPosition() != null) {
			parent = entity;
			position.x = parent.getPosition().x;
			position.y = parent.getPosition().y;
		}
	};

	this.detach = function () {
		parent = null;
	};

	this.update = function(deltaTime) {
		if (parent != null) {
			let deadZoneLeft = position.x - deadZoneHalfWidth;
			let deadZoneRight = position.x + deadZoneHalfWidth;

			if (parent.getVelocity().x != 0) {
				if (parent.getPosition().x < deadZoneLeft) {
					position.x = position.x + (parent.getPosition().x - deadZoneLeft);
				} else if (parent.getPosition().x > deadZoneRight) {
					position.x = position.x + (parent.getPosition().x - deadZoneRight);
				}
			} else if (position.x != parent.getPosition().x) {
				position.x = lerp(position.x, parent.getPosition().x, 0.1);
				if (Math.abs(position.x - parent.getPosition().x) < 1)
					position.x = parent.getPosition().x;
			}
		}
	};

	this.draw = function() {
		canvasContext.resetTransform();
		canvasContext.clearRect(0, 0, canvas.width, canvas.height);
		canvasContext.translate(-position.x + (canvas.width / 2), 0);
	};
}