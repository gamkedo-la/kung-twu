//Rival UI Image
function RivalUIImage(image, x, y, cameraXPos) {
	const offscreen = document.createElement("canvas");
	offscreen.width = image.width / 2;
	offscreen.height = image.height;
	const offscreenCtx = offscreen.getContext("2d");
	offscreenCtx.translate(offscreen.width / 2, offscreen.height / 2);
	let rotation = 0;
	let position = {x:x - offscreen.width / 4 - cameraXPos, y:y - offscreen.height / 4};
	let velocity = {x:0, y:0};
	const DELTA_THETA = -1.0;
	let alpha = 1;
	let animatedTime = 0;
	let isDefeated = false;
	const FALL_TIME = 1000;
	const FADE_TIME = 500;
	this.isComplete = false;

	this.wasDefeated = function() {
		if(!isDefeated) {
			isDefeated = true;
			velocity.x = 0.075;
			velocity.y = -0.1;
		}
	};

	this.getWasDefeated = function() {
		return isDefeated;
	};

	this.update = function(deltaTime) {
		if(isDefeated) {
			animatedTime += deltaTime;

			velocity.y += (0.3 * deltaTime / 1000);

			if(animatedTime > FALL_TIME) {
				//start fading out
				const fadingTime = animatedTime - FALL_TIME;
				alpha = 1 - (fadingTime / FADE_TIME);
				if(alpha < 0) {
					alpha = 0;
					this.isComplete = true;
				}
			} 

			position.y += velocity.y * deltaTime;
			rotation = DELTA_THETA * deltaTime / 1000;
		}

		position.x += velocity.x * deltaTime;
	};

	this.draw = function(cameraX) {
		offscreenCtx.clearRect(-offscreen.width / 2, -offscreen.height / 2, offscreen.width, offscreen.height);
		offscreenCtx.rotate(rotation);
		offscreenCtx.drawImage(image, 0, 0, image.width / 2, image.height, -offscreen.width / 4, -offscreen.height / 4, image.width / 4, image.height / 2);

		canvasContext.drawImage(offscreen, cameraX + position.x, position.y);
	};
}