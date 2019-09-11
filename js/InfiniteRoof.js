//Infinite Roof
function InfiniteRoof(posY) {
	const TILE_WIDTH = 71;
	const TOP_HEIGHT = 88;
	const POST_WIDTH = 88; 
	const POST_HEIGHT = 60;
	const FIRST_POST_INDEX = 0;
	const LAST_POST_INDEX = 14;
	const TILE_TOPS = [];
	const POSTS = [];
	const TILE_BOTS = [];
	const CENTER_POST_INDEX = 7;

	this.getTop = function() {
		return TILE_TOPS[0].getYPos();
	};

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

			while(POSTS[0].isOnScreen(cameraXPos)) {
				insertPost();
				shiftImages(1);
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

			while(POSTS[POSTS.length - 1].isOnScreen(cameraXPos)) {
				addPost();
				shiftImages(-1);
			}
		}
	};

	const insertPost = function() {
		const lastPost = POSTS.pop();
		lastPost.reset();
		lastPost.setPosition(POSTS[0].getPosition().x - POST_WIDTH, POSTS[0].getPosition().y);
		lastPost.setImageIndex(FIRST_POST_INDEX);
		POSTS.unshift(lastPost);
	};

	const addPost = function() {
		const firstPost = POSTS.shift();
		firstPost.reset();
		const lastPostPos = POSTS[POSTS.length - 1].getPosition();
		firstPost.setPosition(lastPostPos.x + POST_WIDTH, lastPostPos.y);
		firstPost.setImageIndex(LAST_POST_INDEX);
		POSTS.push(firstPost);
	};

	const shiftImages = function(indexDelta) {
		if(indexDelta > 0) {
			for(let i = 1; i < POSTS.length; i++) {
				POSTS[i].incrementImageIndex();
			}	
		} else if(indexDelta < 0) {
			for(let i = 0; i < POSTS.length - 1; i++) {
				POSTS[i].decrementImageIndex();
			}	
		}
	};

	this.draw = function() {
		for(let i = 0; i < TILE_TOPS.length; i++) {
			TILE_TOPS[i].draw();
		}

		for(let i = 0; i < POSTS.length; i++) {
			POSTS[i].draw();
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

		for(let postIndex = -CENTER_POST_INDEX; postIndex <= CENTER_POST_INDEX; postIndex++) {
			const aPost = new RoofPost();
			aPost.reset();
			aPost.setPosition((canvas.width / 2) + (postIndex * POST_WIDTH), posY + 20);
			aPost.setImageIndex(postIndex + CENTER_POST_INDEX);
			POSTS.push(aPost);
		}
	};

	function RoofPost() {
		const SPRITES_PER_ROW = 16;
		let xPos;
		let yPos;
		let row;
		let col;
		let imageIndex;
		let baseOffset;

		this.reset = function() {
			xPos = 0;
			yPos = 0;
			row = 0;
			col = 0;
			this.setImageIndex(CENTER_POST_INDEX);
			baseOffset = 0;
		};

		this.setPosition = function(newX, newY) {
			xPos = newX;
			yPos = newY;
		};

		this.getPosition = function() {
			return {x:xPos, y:yPos};
		};

		this.setImageIndex = function(newIndex) {
			imageIndex = newIndex;
			setRowColForIndex();
			setBaseOffsetForIndex();
		};

		this.incrementImageIndex = function() {
			this.setImageIndex(imageIndex + 1);
		};

		this.decrementImageIndex = function() {
			this.setImageIndex(imageIndex - 1);
		};

		this.isOnScreen = function(cameraXPos) {
			if(((getDrawPos() + POST_WIDTH) > cameraXPos - (canvas.width / 2)) && //right of left side
				((getDrawPos()) < cameraXPos + (canvas.width / 2))) {//left of right side
				return true;
			} 
			return false;
		};

		const setRowColForIndex = function() {
			row = Math.floor(imageIndex / SPRITES_PER_ROW);
			col = imageIndex % SPRITES_PER_ROW;
		};

		const setBaseOffsetForIndex = function() {
			switch(imageIndex) {
			case 0:
				baseOffset = 63;
				break;
			case 1:
				baseOffset = 59;
				break;
			case 2:
				baseOffset = 55;
				break;
			case 3:
				baseOffset = 51;
				break;
			case 4:
				baseOffset = 47;
				break;
			case 5:
				baseOffset = 43;
				break;
			case 6:
				baseOffset = 40;
				break;
			case 7:
				baseOffset = 35;
				break;
			case 8:
				baseOffset = 31;
				break;
			case 9:
				baseOffset = 27;
				break;
			case 10:
				baseOffset = 25;
				break;
			case 11:
				baseOffset = 24;
				break;
			case 12:
				baseOffset = 23;
				break;
			case 13:
				baseOffset = 23;
				break;
			case 14:
				baseOffset = 23;
				break;
			}
		};

		const getDrawPos = function() {
			return (xPos - baseOffset);
		};

		this.draw = function() {
			const drawPosX = getDrawPos();
			canvasContext.drawImage(roofPosts, 
				col * POST_WIDTH, row * POST_HEIGHT, 
				POST_WIDTH, POST_HEIGHT,
				drawPosX, yPos, POST_WIDTH, POST_HEIGHT);
		};
	}
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