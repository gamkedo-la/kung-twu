//Infinite Roof
function InfiniteRoof(posY) {
	const TILE_WIDTH = 72;
	const TOP_HEIGHT = 88;
	const TILE_TOPS = [];
	const TILE_BOTS = [];
	let boards;

	this.getTop = function() {
		return TILE_TOPS[0].getYPos();
	};

	this.update = function(cameraXPos, shifts) {
		if(TILE_TOPS.length === 0) {
			initializeTiles();
		}

		for(let i = 0; i < TILE_TOPS.length; i++) {
			TILE_TOPS[i].update(-shifts);
			TILE_BOTS[i].update(shifts / 2);
		}

		boards.update(cameraXPos);

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
		for(let top of TILE_TOPS) {
			top.draw();
		}

		boards.draw();

		for(let bot of TILE_BOTS) {
			bot.draw();
		}
	};

	const initializeTiles = function() {
		const tileCount = 4 + Math.floor(canvas.width / TILE_WIDTH);

		let currentXPos = -TILE_WIDTH / 2;
		for(let i = 0; i < tileCount; i++) {
			TILE_TOPS.push(new RoofTile(true, currentXPos + (i * TILE_WIDTH), posY));
			TILE_BOTS.push(new RoofTile(false, currentXPos + (i * TILE_WIDTH), posY + (1.1 * TOP_HEIGHT)));
		}

		const verticalOffset = canvas.height - TILE_BOTS[0].getYPos() - 0.75 * TOP_HEIGHT;
		boards = new InfiniteSurface(ROOF_CONFIG, verticalOffset);
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

	this.getYPos = function() {
		return yPos;
	};

	this.update = function(deltaX) {
		xPos += (2 * deltaX);
	};

	this.draw = function() {
		if(isTop) {
			canvasContext.drawImage(roofTileTop, xPos, yPos);
		} else {
			canvasContext.drawImage(roofTileBottom, xPos, yPos);
		}
	};
}