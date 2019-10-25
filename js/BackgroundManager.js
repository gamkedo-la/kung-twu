//BackgroundSprite Object
function BackgroundSprite(image, posX, posY, depth) {
	this.type = ENTITY_TYPE.Environment;
	let oldCameraPos;
	let position = {x:posX, y:posY};

	this.update = function(cameraXPos, shifts) {
		oldCameraPos = cameraXPos;
		if((position.x > cameraXPos - canvas.width / 2) && (position.x < cameraXPos + canvas.width / 2)) {
			position.x -= (shifts * depth);
		}
	};

	this.draw = function() {
		if(position.x < oldCameraPos - (canvas.width / 2) - image.width) return;
		if(position.x > oldCameraPos + (canvas.width / 2)) return;

		canvasContext.drawImage(image, position.x, position.y);
	};
}

//Background Manager
function BackgroundManager() {
	const images = [];

	this.addImage = function(newImage) {
		images.push(newImage);
	};

	this.update = function(cameraXPos, shifts) {
		for(let image of images) {
			image.update(cameraXPos, shifts);
		}
	};

	this.draw = function() {
		for(let image of images) {
			image.draw();
		}
	};
}