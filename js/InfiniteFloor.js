//Infinite Floor
function InfiniteFloor() {
	let yPos = 0;
	let plankCount = 0;
	this.setYPos = function(newYPos) {
		yPos = newYPos;
	};

	this.getMidHeight = function() {
		return yPos + singlePlank.height / 2;
	};

	this.setTotalWidth = function(width) {
		totalWidth = width;
		plankCount = 4 + Math.ceil(width / singlePlank.width);
	};

	this.update = function() {
	};

	this.draw = function() {//1,0,-0.1,1,0,0
/*		const straightWidth = singlePlank.width;
		const centerXPos = (canvas.width / 2) - (straightWidth / 2);
		canvasContext.save();

		canvasContext.drawImage(singlePlank, centerXPos, yPos);
		canvasContext.setTransform(1,0,-0.0005,1,0,0);
		canvasContext.drawImage(singlePlank, centerXPos + straightWidth, yPos);


//		for(let i = 0; i < plankCount; i++) {
//			const skewValue = 0.05 * ((i - 2) - Math.floor(plankCount/2));
//			canvasContext.setTransform(1,0,skewValue,1,0,0);
//			canvasContext.drawImage(singlePlank, -i*skewValue, yPos);
//		}

		canvasContext.restore();*/
	};
}