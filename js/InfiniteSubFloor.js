//Inifinite SubFloor
function InfiniteSubFloor(columnImage) {
	const UNDERGRD_CLIP = {x:0, y:titleScreenBG.height - 100, width:canvas.width, height: 60};
	let undergroundXPos = 0;
	const UNDRGRD_Y_POS = canvas.height - UNDERGRD_CLIP.height;
	const COLUMN_SPACING = 600;
	const COLUMN_CLIP = {x:0, y:415, width:53, height:58};
	const column1 = new Column(columnImage);
	const column2 = new Column(columnImage);
	let isColumn = true;
	let yPos;
	let oldCameraX = null;
	let isMovingLeft = true;


	const BRICKS = [];
	const BRICK_CLIP = {x:0, y:0, width:71, height:55};

	this.positionFirstColumn = function(xPos) {
		column1.setPosition(xPos, yPos);
		column2.setPosition(xPos - COLUMN_SPACING, yPos);
	};

	this.initializeForLevel = function(aLevel) {
		yPos = canvas.height - COLUMN_CLIP.height;
		if(aLevel === 1) {
			isColumn = true;
		} else {
			isColumn = false;
			yPos += 6;
			initializeBricks();
		}
	};

	this.update = function(cameraXPos) {
		if(oldCameraX === null) {
			oldCameraX = cameraXPos;
		} else {
			isMovingLeft = (oldCameraX > cameraXPos);
		}

		if(isColumn && currentLevel > 1) {
			this.initializeForLevel(currentLevel);
		} else if(!isColumn && currentLevel === 1) {
			this.initializeForLevel(currentLevel);
		}

		if(isColumn) {
			undergroundXPos = cameraXPos - canvas.width / 2;
			updateColumn(cameraXPos);
		} else {
			updateBricks(cameraXPos);
		}

		oldCameraX = cameraXPos;
	};

	const updateColumn = function(cameraXPos) {
		if(!column1.isOnScreen(cameraXPos)) {
			updateColumnLocation(column1, column2);
		}
		
		if(!column2.isOnScreen(cameraXPos)) {
			updateColumnLocation(column2, column1);
		}
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

	const updateBricks = function(cameraXPos) {
		let didShiftLeft = false;
		while(BRICKS[0].getXPos() < cameraXPos - canvas.width / 2 - BRICK_CLIP.width) {
			const rightMostTileX = BRICKS[BRICKS.length - 1].getXPos();
			const leftMostTile = BRICKS.shift();
			leftMostTile.setXPos(rightMostTileX + BRICK_CLIP.width);
			BRICKS.push(leftMostTile);
			didShiftLeft = true;
		}

		if(!didShiftLeft) {
			while(BRICKS[BRICKS.length - 1].getXPos() > cameraXPos + canvas.width / 2 + BRICK_CLIP.width) {
				const leftMostTileX = BRICKS[0].getXPos();
				const rightMostTile = BRICKS.pop();
				rightMostTile.setXPos(cameraXPos - (canvas.width / 2) - BRICK_CLIP.width);
				rightMostTile.setXPos(leftMostTileX - BRICK_CLIP.width);
				BRICKS.unshift(rightMostTile);
			}
		}
	};

	this.draw = function() {
		if(isColumn) {
			canvasContext.drawImage(titleScreenBG, 
				UNDERGRD_CLIP.x, UNDERGRD_CLIP.y, UNDERGRD_CLIP.width, UNDERGRD_CLIP.height,
				undergroundXPos, UNDRGRD_Y_POS, UNDERGRD_CLIP.width, UNDERGRD_CLIP.height);
			drawColumns();
		} else {
			drawBricks();
		}
	};

	const drawColumns = function() {
		column1.draw();
		column2.draw();
	};

	const drawBricks = function() {
		for(let brick of BRICKS) {
			brick.draw();
		}
	};

	const initializeBricks = function() {
		const tileCount = 4 + Math.floor(canvas.width / BRICK_CLIP.width);

		let currentXPos = -BRICK_CLIP.width / 2;
		for(let i = 0; i < tileCount; i++) {
			BRICKS.push(new Brick(currentXPos + (i * BRICK_CLIP.width), yPos));
		}
	};

	function Column(image) {
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
			canvasContext.drawImage(image, COLUMN_CLIP.x, COLUMN_CLIP.y, COLUMN_CLIP.width, COLUMN_CLIP.height, xPos, yPos, COLUMN_CLIP.width, COLUMN_CLIP.height);
		};

		this.isOnScreen = function(cameraXPos) {
			if( (xPos + image.width > cameraXPos - (canvas.width / 2)) &&
				(xPos < cameraXPos + canvas.width / 2)) {
				return true;
			}

			return false;
		};
	}

	function Brick(posX, posY) {
		let xPos = posX;
		let yPos = posY;
	
		this.getXPos = function() {
			return xPos;
		};
	
		this.setXPos = function(newXPos) {
			xPos = newXPos;
		};
	
		this.getYPos = function() {
			return yPos;
		};
	
		this.update = function(deltaX) {
			xPos += deltaX;
		};
	
		this.draw = function() {
			canvasContext.drawImage(roofTileTop,
				BRICK_CLIP.x, BRICK_CLIP.y, BRICK_CLIP.width, BRICK_CLIP.height,
				xPos, yPos, BRICK_CLIP.width, BRICK_CLIP.height);
		};
	}
}