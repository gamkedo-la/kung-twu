//Background Image
function BackgroundImage(shiftDelta, anImage, aPosition) {
	const deltaPerShift = shiftDelta;
	const image = anImage;
	let position = aPosition;
	this.getPosition = function() {
		return {x:position.x, y:position.y};
	};

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
		for(let image of images) {
			image.update(shifts);
		}
	};

	this.draw = function() {
		for(let image of images) {
			image.draw();
		}
	};
}