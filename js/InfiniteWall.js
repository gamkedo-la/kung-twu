//Infinite Back Wall
function InfiniteWall(posY) {
	const TILE_WIDTH = 352;
	const TILES = [];
	const DELTA_PER_SHIFT = -2;

	this.update = function(cameraXPos, shifts) {
		if(TILES.length === 0) {
			initializeTiles();
		}

		for(let i = 0; i < TILES.length; i++) {
			TILES[i].update(DELTA_PER_SHIFT * shifts);
		}

		let didShiftLeft = false;
		while(TILES[0].getXPos() < cameraXPos - canvas.width / 2 - TILE_WIDTH) {
			const rightMostTileX = TILES[TILES.length - 1].getXPos();
			const leftMostTile = TILES.shift();
			leftMostTile.setXPos(rightMostTileX + TILE_WIDTH);
			TILES.push(leftMostTile);
			didShiftLeft = true;
		}

		if(!didShiftLeft) {
			while(TILES[TILES.length - 1].getXPos() > cameraXPos + canvas.width / 2 + TILE_WIDTH) {
				const leftMostTileX = TILES[0].getXPos();
				const rightMostTile = TILES.pop();
				rightMostTile.setXPos(cameraXPos - (canvas.width / 2) - TILE_WIDTH);
				rightMostTile.setXPos(leftMostTileX - TILE_WIDTH);
				TILES.unshift(rightMostTile);
			}
		}
	};

	this.draw = function() {
		for(let i = 0; i < TILES.length; i++) {
			TILES[i].draw();
		}
	};

	const initializeTiles = function() {
		const tileCount = 4 + Math.floor(canvas.width / TILE_WIDTH);

		let currentXPos = -TILE_WIDTH / 2;
		for(let i = 0; i < tileCount; i++) {
			let imageToUse = windowedWall;
			if(i % 2 === 0) {
				imageToUse = tiledWall;
			}
			TILES.push(new WallTile(imageToUse, currentXPos + (i * TILE_WIDTH), posY));
		}
	};
}

function WallTile(image, posX, posY) {
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
		canvasContext.drawImage(image, xPos, yPos);
	};
}