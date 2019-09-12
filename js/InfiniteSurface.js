//Floor Config based on sprite characteristics
const FLOOR_CONFIG = {
	centerIndex:29,
	tileWidth:17,
	tileHeight:104,
	firstIndex:0,
	lastIndex:58,
	spritesPerRow:60,
	spriteWidth:74,
	spriteHeight:104,
	deltaBaseOffset:2,
	spriteSheet:floorboardSheet
};

const ROOF_CONFIG = {
	centerIndex:29,
	tileWidth:17,
	tileHeight:104,
	firstIndex:0,
	lastIndex:58,
	spritesPerRow:60,
	spriteWidth:74,
	spriteHeight:52,
	deltaBaseOffset:2,
	spriteSheet:floorboardSheet //TODO: Switch to the correct spritesheet
};

//Infinite Surface (works for roof and floor)
function InfiniteSurface(config, verticalOffset) {
	const CENTER_INDEX = config.centerIndex;
	const TILE_WIDTH = config.tileWidth;
	const TILE_HEIGHT = config.tileHeight;
	const FIRST_INDEX = config.firstIndex;
	const LAST_INDEX = config.lastIndex;

	const VERTICAL_OFFSET = verticalOffset;

	const Y_POS = canvas.height - TILE_HEIGHT - VERTICAL_OFFSET;
	const tiles = [];

	this.getMidHeight = function() {
		return Y_POS + TILE_HEIGHT / 2;
	};

	this.update = function(cameraXPos) {
		if(tiles.length == 0) {
			initializeTiles();
		}

		let shifts = 0;

		while(tiles[0].isOnScreen(cameraXPos)) {
			insertTile();
			shiftImages(1);
			shifts++;
		}

		while(tiles[tiles.length - 1].isOnScreen(cameraXPos)) {
			addTile();
			shiftImages(-1);
			shifts--;
		}

		return shifts;
	};

	this.draw = function() {
		for(let i = 0; i < tiles.length; i++) {
			tiles[i].draw();
		}
	};

	const initializeTiles = function() {
		for(let tileIndex = -CENTER_INDEX; tileIndex <= CENTER_INDEX; tileIndex++) {
			const aTile = new Tile(config);
			aTile.reset();
			aTile.setPosition((canvas.width / 2) + (tileIndex * TILE_WIDTH), Y_POS);
			aTile.setImageIndex(tileIndex + CENTER_INDEX);
			tiles.push(aTile);
		}
	};

	const insertTile = function() {
		const lastTile = tiles.pop();
		lastTile.reset();
		lastTile.setPosition(tiles[0].getPosition().x - TILE_WIDTH, tiles[0].getPosition().y);
		lastTile.setImageIndex(FIRST_INDEX);
		tiles.unshift(lastTile);
	};

	const addTile = function() {
		const firstTile = tiles.shift();
		firstTile.reset();
		const lastTilePos = tiles[tiles.length - 1].getPosition();
		firstTile.setPosition(lastTilePos.x + TILE_WIDTH, lastTilePos.y);
		firstTile.setImageIndex(LAST_INDEX);
		tiles.push(firstTile);
	};

	const shiftImages = function(indexDelta) {
		if(indexDelta > 0) {
			for(let i = 1; i < tiles.length; i++) {
				tiles[i].incrementImageIndex();
			}	
		} else if(indexDelta < 0) {
			for(let i = 0; i < tiles.length - 1; i++) {
				tiles[i].decrementImageIndex();
			}	
		}
	};

	function Tile(config) {
		const SPRITES_PER_ROW = config.spritesPerRow;
		const SPRITE_WIDTH = config.spriteWidth;
		const SPRITE_HEIGHT = config.spriteHeight;
		const DELTA_BASE_OFFSET = config.deltaBaseOffset;
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
			this.setImageIndex(CENTER_INDEX);
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
			if(((getDrawPos() + SPRITE_WIDTH) > cameraXPos - (canvas.width / 2)) && //right of left side
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
			if(imageIndex <= CENTER_INDEX) {
				baseOffset = 0;
			} else{
				baseOffset = (((imageIndex - CENTER_INDEX) * DELTA_BASE_OFFSET) - 1);//just based on sprite sheet
			}
		};

		const getDrawPos = function() {
			return (xPos - baseOffset);
		};

		this.draw = function() {
			const drawPosX = getDrawPos();
			canvasContext.drawImage(config.spriteSheet, 
				col * SPRITE_WIDTH, row * SPRITE_HEIGHT, 
				SPRITE_WIDTH, SPRITE_HEIGHT,
				drawPosX, yPos, SPRITE_WIDTH, SPRITE_HEIGHT);
		};
	}
}