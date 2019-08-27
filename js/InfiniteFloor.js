//Infinite Floor
function InfiniteFloor() {
	const CENTER_PLANK_INDEX = 29;	//Based on
	const PLANK_WIDTH = 17;			//
	const PLANK_HEIGHT = 104;		//the image
	const FIRST_PLANK_INDEX = 0;
	const LAST_PLANK_INDEX = 58;

	const yPos = canvas.height - PLANK_HEIGHT;
	const planks = [];

	this.getMidHeight = function() {
		return yPos + PLANK_HEIGHT / 2;
	};

	this.update = function(cameraXPos) {
		if(planks.length == 0) {
			initializePlanks();
		}

		let shifts = 0;

		while(planks[0].isOnScreen(cameraXPos)) {
			insertPlank();
			shiftImages(1);
			shifts++;
		}

		while(planks[planks.length - 1].isOnScreen(cameraXPos)) {
			addPlank();
			shiftImages(-1);
			shifts--;
		}

		return shifts;
	};

	this.draw = function() {
		for(let i = 0; i < planks.length; i++) {
			planks[i].draw();
		}
	};

	const initializePlanks = function() {
		for(let plankIndex = -CENTER_PLANK_INDEX; plankIndex <= CENTER_PLANK_INDEX; plankIndex++) {
			const aPlank = new Plank();
			aPlank.reset();
			aPlank.setPosition((canvas.width / 2) + (plankIndex * PLANK_WIDTH), yPos);
			aPlank.setImageIndex(plankIndex + CENTER_PLANK_INDEX);
			planks.push(aPlank);
		}
	};

	const insertPlank = function() {
		const lastPlank = planks.pop();
		lastPlank.reset();
		lastPlank.setPosition(planks[0].getPosition().x - PLANK_WIDTH, planks[0].getPosition().y);
		lastPlank.setImageIndex(FIRST_PLANK_INDEX);
		planks.unshift(lastPlank);
	};

	const addPlank = function() {
		const firstPlank = planks.shift();
		firstPlank.reset();
		const lastPlankPos = planks[planks.length - 1].getPosition();
		firstPlank.setPosition(lastPlankPos.x + PLANK_WIDTH, lastPlankPos.y);
		firstPlank.setImageIndex(LAST_PLANK_INDEX);
		planks.push(firstPlank);
	};

	const shiftImages = function(indexDelta) {
		if(indexDelta > 0) {
			for(let i = 1; i < planks.length; i++) {
				planks[i].incrementImageIndex();
			}	
		} else if(indexDelta < 0) {
			for(let i = 0; i < planks.length - 1; i++) {
				planks[i].decrementImageIndex();
			}	
		}
	};

	function Plank() {
		const SPRITES_PER_ROW = 60;		//based on
		const PLANK_SPRITE_WIDTH = 74;	// plank 
		const PLANK_SPRITE_HEIGHT = 104;//sprite sheet
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
			this.setImageIndex(CENTER_PLANK_INDEX);
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
			if(((getDrawPos() + PLANK_SPRITE_WIDTH) > cameraXPos - (canvas.width / 2)) && //right of left side
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
			if(imageIndex <= CENTER_PLANK_INDEX) {
				baseOffset = 0;
			} else{
				baseOffset = (((imageIndex - CENTER_PLANK_INDEX) * 2) - 1);//just based on sprite sheet
			}
		};

		const getDrawPos = function() {
			return (xPos - baseOffset);
		};

		this.draw = function() {
			const drawPosX = getDrawPos();
			canvasContext.drawImage(floorboardSheet, 
				col * PLANK_SPRITE_WIDTH, row * PLANK_SPRITE_HEIGHT, 
				PLANK_SPRITE_WIDTH, PLANK_SPRITE_HEIGHT,
				drawPosX, yPos, PLANK_SPRITE_WIDTH, PLANK_SPRITE_HEIGHT);
		};
	}
}