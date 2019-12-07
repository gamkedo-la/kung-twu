//Infinite Columns
function InfiniteColumn(image, verticalOffset) {
	const COLUMN_HEIGHT = 473;
	const COLUMN_SPACING = 600;
	const VERTICAL_INSET = 12;
	const column1 = new Column();
	const column2 = new Column();

	let yPos;
	let oldCameraX = null;
	let isMovingLeft = true;

	this.positionFirstColumn = function(xPos) {
		yPos = canvas.height - COLUMN_HEIGHT - VERTICAL_INSET - verticalOffset;
		column1.setPosition(xPos, yPos);
		column2.setPosition(xPos - COLUMN_SPACING, yPos);
	};

	this.update = function(cameraXPos) {
		if(oldCameraX === null) {
			oldCameraX = cameraXPos;
		} else {
			isMovingLeft = (oldCameraX > cameraXPos);
		}

		if(!column1.isOnScreen(cameraXPos)) {
			updateColumnLocation(column1, column2);
		}
		
		if(!column2.isOnScreen(cameraXPos)) {
			updateColumnLocation(column2, column1);
		}

		oldCameraX = cameraXPos;
	};

	this.draw = function(cameraXPos) {
		column1.draw(cameraXPos);
		column2.draw(cameraXPos);
	};

	const updateColumnLocation = function(offscreen, onscreen) {
		if(isMovingLeft) {
			if(offscreen.getPosition().x > onscreen.getPosition().x) {
				offscreen.setPosition(
					onscreen.getPosition().x - COLUMN_SPACING,
					yPos
				);
			}
		} else {
			if(offscreen.getPosition().x < onscreen.getPosition().x) {
				offscreen.setPosition(
					onscreen.getPosition().x + COLUMN_SPACING,
					yPos
				);
			}
		}
	};

	function Column() {
		let xPos = 0;
		let yPos = 0;
		const fadeZone = 6 * deadZoneHalfWidth;
		this.setPosition = function(newX, newY) {
			xPos = newX;
			yPos = newY;
		};

		this.getPosition = function() {
			return {x:xPos, y:yPos};
		};

		this.draw = function(cameraXPos) {
			canvasContext.save();

			if(isInDeadZone(cameraXPos)) {
				canvasContext.globalAlpha = 0.7;
			}
			canvasContext.drawImage(image, xPos, yPos);

			canvasContext.restore();
		};

		this.isOnScreen = function(cameraXPos) {
			if( (xPos + image.width > cameraXPos - (canvas.width / 2)) &&
				(xPos < cameraXPos + canvas.width / 2)) {
				return true;
			}

			return false;
		};

		const isInDeadZone = function(cameraXPos) {
			const deadZoneLeft = cameraXPos - (fadeZone);
			if(xPos < deadZoneLeft) {return false;}

			const deadZoneRight = cameraXPos + (fadeZone);
			if(xPos > deadZoneRight) {return false;}

			return true;
		};
	}
}