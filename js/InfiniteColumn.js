//Infinite Columns
function InfiniteColumn() {
	const COLUMN_WIDTH = 43;
	const COLUMN_HEIGHT = 473;
	const COLUMN_SPACING = 600;
	const column1 = new Column();
	const column2 = new Column();

	let yPos;

	this.positionFirstColumn = function(xPos) {
		yPos = canvas.height - COLUMN_HEIGHT;
		column1.setPosition(xPos, yPos);
		column2.setPosition(xPos - COLUMN_SPACING, yPos);
	};

	this.update = function(cameraXPos) {
		if(!column1.isOnScreen(cameraXPos)) {
			updateColumnLocation(column1, column2, cameraXPos);
		}
		
		if(!column2.isOnScreen(cameraXPos)) {
			updateColumnLocation(column2, column1, cameraXPos);
		}
	};

	this.draw = function() {
		column1.draw();
		column2.draw();
	};

	const updateColumnLocation = function(offscreen, onscreen, cameraXPos) {
		const leftDist = onscreen.getPosition().x - (cameraXPos - canvas.width / 2) - COLUMN_WIDTH;
		if(leftDist > COLUMN_SPACING) {
			offscreen.setPosition(
				(cameraXPos - canvas.width / 2) - COLUMN_WIDTH,
				yPos
			);
		}

		const rightDist = (cameraXPos + canvas.width / 2) - onscreen.getPosition().x;
		if(rightDist > COLUMN_SPACING) {
			offscreen.setPosition(
				(cameraXPos + canvas.width / 2),
				yPos
			);
		}
	};

	function Column() {
		let xPos = 0;
		let yPos = 0;
		this.setPosition = function(newX, newY) {
			xPos = newX;
			yPos = newY;
		};

		this.getPosition = function() {
			return {x:xPos, y:yPos};
		};

		this.draw = function() {
			canvasContext.drawImage(tempColumn, xPos, yPos);
		};

		this.isOnScreen = function(cameraXPos) {
			if( (xPos + tempColumn.width > cameraXPos - (canvas.width / 2)) &&
				(xPos < cameraXPos + canvas.width / 2)) {
				return true;
			}

			return false;
		};
	}
}