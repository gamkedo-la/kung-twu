//Infinite Back Wall
function InfiniteWall(posY, scroll, silhouette, minPos, maxPos) {
	const TILE_WIDTH = 352;
	const SHADOW_WIDTH = 200;
	const TILES = [];
	const SHADOWS = [];
	const DELTA_PER_SHIFT = -2;
	let lastCameraPos;

	this.update = function(cameraXPos, shifts) {
		lastCameraPos = cameraXPos;

		if(TILES.length === 0) {
			initializeTiles(scroll, silhouette);
		}

		for(let tile of TILES) {
			tile.update(DELTA_PER_SHIFT * shifts);
		}

		let didShiftLeft = false;
		while(SHADOWS[0].getXPos() < cameraXPos - canvas.width / 2 - SHADOW_WIDTH) {
			const rightMostShadowX = SHADOWS[SHADOWS.length - 1].getXPos();
			const leftMostShadow = SHADOWS.shift();
			leftMostShadow.setXPos(rightMostShadowX + SHADOW_WIDTH);
			SHADOWS.push(leftMostShadow);
			didShiftLeft = true;
		}

		if(!didShiftLeft) {
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
			tile.draw(lastCameraPos);
		}

		for(let shadow of SHADOWS) {
			shadow.draw();
		}
	};

	const initializeTiles = function(scroll, silhouette) {
		const tileCount = 2 + Math.ceil((maxPos - minPos + canvas.width) / TILE_WIDTH);

		let imageToUse;
		let decorationToUse = null;
		let decorationIndex = 0;
		let currentXPos = minPos - (canvas.width / 2) - (TILE_WIDTH / 2);
		for(let i = 0; i < tileCount; i++) {
			if((i === 0) ||(i === 1) || (i === tileCount - 1) || (i === tileCount - 2)) {
				//0, 1, 18 & 19
				imageToUse = tiledWall;
			} else if((i === 2) || (i === tileCount - 3)) {
				//2 & 17
				imageToUse = scroll;
			} else if((i === 3) || (i === tileCount - 4)) {
				//3 & 16
				imageToUse = tiledWallScroll;
			} else if(i % 2 === 0) {
				//4, 6, 8, 10, 12, 14
				imageToUse = tiledWall;
				if(decorationIndex === 0) {
					decorationToUse = spear;
					decorationIndex = 1;
				} else if(decorationIndex === 1) {
					decorationToUse = carpet;
					decorationIndex = 2;
				} else if(decorationIndex === 2) {
					decorationToUse = carpet2;
					decorationIndex = 3;
				} else if(decorationIndex === 3) {
					decorationToUse = painting;
					decorationIndex = 4;
				} else if(decorationIndex === 4) {
					decorationToUse = HTGDpainting;
					decorationIndex = 5;
				} else if(decorationIndex === 5) {
					decorationToUse = silhouette;
					decorationIndex = 0;
				}
			} else {
				//5, 7, 9, 11, 13, 15
				imageToUse = windowedWall;
			}

			const thisTile = new WallTile(imageToUse, currentXPos + (i * TILE_WIDTH), posY);
			thisTile.setDecoration(decorationToUse);
			TILES.push(thisTile);
			decorationToUse = null;
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
		let decoration = null;
	
		this.getXPos = function() {
			return xPos;
		};
	
		this.setXPos = function(newXPos) {
			xPos = newXPos;
		};

		this.setDecoration = function(aDecoration) {
			decoration = aDecoration;
		};
	
		this.update = function(deltaX) {
			xPos += deltaX;
		};
	
		this.draw = function(cameraXPos) {
			if(xPos < cameraXPos - (canvas.width / 2) - image.width) return;
			if(xPos > cameraXPos + canvas.width / 2) return;

			canvasContext.drawImage(image, xPos, yPos);

			if(decoration != null) {
				if(decoration === spear) {
					canvasContext.drawImage(decoration, xPos + (image.width - decoration.width)/2, yPos + 200);
				} else if(decoration === carpet) {
					canvasContext.drawImage(decoration, xPos + (image.width - decoration.width)/2, yPos + 175);
				} else if(decoration === carpet2) {
					canvasContext.drawImage(decoration, xPos + (image.width - decoration.width)/2, yPos + 150);
				} else if(decoration === painting) {
					canvasContext.drawImage(decoration, xPos + (image.width - decoration.width)/2, yPos + 150);
				} else if(decoration === HTGDpainting) {
					canvasContext.drawImage(decoration, xPos + (image.width - decoration.width)/2, yPos + 150);
				} else if(decoration === silhouette) {
					canvasContext.drawImage(decoration, xPos + (image.width - decoration.width)/2, yPos + 175);
				}
			}
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