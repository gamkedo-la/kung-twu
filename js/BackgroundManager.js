//Background Image
function BackgroundImage(shiftDelta, anImage, aPosition) {
	const deltaPerShift = shiftDelta;
	const image = anImage;
	let position = aPosition;

	this.update = function(shifts) {
		position.x += (deltaPerShift * shifts);
	};

	this.draw = function() {
		canvasContext.drawImage(image, position.x, position.y);
	};
}

//Background Manager
function BackgroundManager() {
	const images = [];

	this.addImage = function(newImage) {
		images.push(newImage);
	};

	this.update = function(shifts) {
		for(let i = 0; i < images.length; i++) {
			images[i].update(shifts);
		}
	};

	this.draw = function() {
		for(let i = 0; i < images.length; i++) {
			images[i].draw();
		}
	};
}