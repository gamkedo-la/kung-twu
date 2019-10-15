//Infinite Back Wall
function InfiniteWall(posY, scroll) {
	const TILE_WIDTH = 352;
	const SHADOW_WIDTH = 200;
	const TILES = [];
	const SHADOWS = [];
	const DELTA_PER_SHIFT = -2;

	this.update = function(cameraXPos, shifts) {
		if(TILES.length === 0) {
			initializeTiles(scroll);
		}

		for(let tile of TILES) {
			tile.update(DELTA_PER_SHIFT * shifts);
		}

		let didShiftLeft = false;
		while(TILES[0].getXPos() < cameraXPos - canvas.width / 2 - TILE_WIDTH) {
			const rightMostTileX = TILES[TILES.length - 1].getXPos();
			const leftMostTile = TILES.shift();
			leftMostTile.setXPos(rightMostTileX + TILE_WIDTH);
			TILES.push(leftMostTile);
			didShiftLeft = true;
		}

		if(didShiftLeft) {
			while(SHADOWS[0].getXPos() < cameraXPos - canvas.width / 2 - SHADOW_WIDTH) {
				const rightMostShadowX = SHADOWS[SHADOWS.length - 1].getXPos();
				const leftMostShadow = SHADOWS.shift();
				leftMostShadow.setXPos(rightMostShadowX + SHADOW_WIDTH);
				SHADOWS.push(leftMostShadow);
			}
		} else {
			while(TILES[TILES.length - 1].getXPos() > cameraXPos + canvas.width / 2 + TILE_WIDTH) {
				const leftMostTileX = TILES[0].getXPos();
				const rightMostTile = TILES.pop();
				rightMostTile.setXPos(cameraXPos - (canvas.width / 2) - TILE_WIDTH);
				rightMostTile.setXPos(leftMostTileX - TILE_WIDTH);
				TILES.unshift(rightMostTile);
			}

			while(SHADOWS[SHADOWS.length - 1].getXPos() > cameraXPos + canvas.width / 2 + SHADOW_WIDTH) {
				const leftMostShadowX = SHADOWS[0].getXPos();
				const rightMostShadow = SHADOWS.pop();
				rightMostShadow.setXPos(cameraXPos - (canvas.width / 2) - SHADOW_WIDTH);
				rightMostShadow.setXPos(leftMostShadowX - SHADOW_WIDTH);
				SHADOWS.unshift(rightMostShadow);
			}
		}
	};

	this.draw = function() {
		for(let tile of TILES) {
			tile.draw();
		}

		for(let shadow of SHADOWS) {
			shadow.draw();
		}
	};

	const initializeTiles = function(scroll) {
		const tileCount = 8 + Math.floor(canvas.width / TILE_WIDTH);

		let currentXPos = -TILE_WIDTH / 2;
		for(let i = 0; i < tileCount; i++) {
			let imageToUse = windowedWall;
			if(i % 4 === 0) {
				imageToUse = tiledWall;
			} else if(i % 4 === 1) {
				imageToUse = tiledWallScroll;
			} else if(i % 4 === 2) {
				imageToUse = scroll;
			}
			TILES.push(new WallTile(imageToUse, currentXPos + (i * TILE_WIDTH), posY));
		}

		const shadowCount = 4 + Math.floor(canvas.width / SHADOW_WIDTH);

		currentXPos = -SHADOW_WIDTH / 2;
		for(let i = 0; i < shadowCount; i++) {
			SHADOWS.push(new ShadowTile(currentXPos + (i * SHADOW_WIDTH), posY));
		}
	};

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

	function ShadowTile(posX, posY) {
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
			canvasContext.drawImage(wallGradient, xPos, yPos);
		};
	}
}