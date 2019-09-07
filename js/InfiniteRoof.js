//Infinite Roof
function InfiniteRoof(posY) {
	const TILE_WIDTH = 71;
	const TOP_HEIGHT = 88;
	const TILE_TOPS = [];
	const TILE_BOTS = [];

	this.update = function(cameraXPos, shifts) {
		if(TILE_TOPS.length === 0) {
			initializeTiles();
		}

		for(let i = 0; i < TILE_TOPS.length; i++) {
			TILE_TOPS[i].update(0);
			TILE_BOTS[i].update(shifts);
		}

		let didShiftLeft = false;
		while(TILE_TOPS[0].getXPos() < cameraXPos - canvas.width / 2 - TILE_WIDTH) {
			const rightMostTileX = TILE_TOPS[TILE_TOPS.length - 1].getXPos();
			const leftMostTile = TILE_TOPS.shift();
			leftMostTile.setXPos(rightMostTileX + TILE_WIDTH);
			TILE_TOPS.push(leftMostTile);
			didShiftLeft = true;
		}

		if(didShiftLeft) {
			while(TILE_BOTS[0].getXPos() < cameraXPos - canvas.width / 2 - TILE_WIDTH) {
				const rightMostTileX = TILE_BOTS[TILE_BOTS.length - 1].getXPos();
				const leftMostTile = TILE_BOTS.shift();
				leftMostTile.setXPos(rightMostTileX + TILE_WIDTH);
				TILE_BOTS.push(leftMostTile);
			}
		} else {
			while(TILE_TOPS[TILE_TOPS.length - 1].getXPos() > cameraXPos + canvas.width / 2 + TILE_WIDTH) {
				const leftMostTileX = TILE_TOPS[0].getXPos();
				const rightMostTile = TILE_TOPS.pop();
				rightMostTile.setXPos(cameraXPos - (canvas.width / 2) - TILE_WIDTH);
				rightMostTile.setXPos(leftMostTileX - TILE_WIDTH);
				TILE_TOPS.unshift(rightMostTile);
			}

			while(TILE_BOTS[TILE_BOTS.length - 1].getXPos() > cameraXPos + canvas.width / 2 + TILE_WIDTH) {
				const leftMostTileX = TILE_BOTS[0].getXPos();
				const rightMostTile = TILE_BOTS.pop();
				rightMostTile.setXPos(cameraXPos - (canvas.width / 2) - TILE_WIDTH);
				rightMostTile.setXPos(leftMostTileX - TILE_WIDTH);
				TILE_BOTS.unshift(rightMostTile);
			}
		}
	};

	this.draw = function() {
		for(let i = 0; i < TILE_TOPS.length; i++) {
			TILE_TOPS[i].draw();
		}

		for(let i = 0; i < TILE_BOTS.length; i++) {
			TILE_BOTS[i].draw();
		}
	};

	const initializeTiles = function() {
		const tileCount = 4 + Math.floor(canvas.width / TILE_WIDTH);

		let currentXPos = -TILE_WIDTH / 2;
		for(let i = 0; i < tileCount; i++) {
			TILE_TOPS.push(new RoofTile(true, currentXPos + (i * TILE_WIDTH), posY));
			TILE_BOTS.push(new RoofTile(false, currentXPos + (i * TILE_WIDTH), posY + (0.8 * TOP_HEIGHT)));
		}
	};
}

function RoofTile(isTop, posX, posY) {
	let xPos = posX;
	let yPos = posY;

	this.getXPos = function() {
		return xPos;
	};

	this.setXPos = function(newXPos) {
		xPos = newXPos;
	};

	this.update = function(deltaX) {
		xPos += deltaX;
	};

	this.draw = function() {
		if(isTop) {
			canvasContext.drawImage(roofTileTop, xPos, yPos);
		} else {
			canvasContext.drawImage(roofTileBottom, xPos, yPos);
		}
	};
}