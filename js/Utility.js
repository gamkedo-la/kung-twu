//Utility
function lerp(start, end, amount) {
	return (1 - amount) * start + amount * end;
}

/**
 * Returns a float between 0 (inclusive) and num (non-inclusive)
 * @param {number} num 
 */
function random(num) {
	return Math.random() * num;
}

/**
 * Returns an integer between 0 (inclusive) and num (non-inclusive)
 * @param {number} num 
 */
function irandom(num) {
	return Math.floor(random(num));
}

/**
 * Returns a float between low (inclusive) and high (non-inclusive)
 * @param {number} low 
 * @param {number} high 
 */
function randomRange(low, high) {
	return random(high - low) + low;
}

/**
 * Returns an integer between low (inclusive) and high (non-inclusive)
 * Chops off the decimal points of passed low and high numbers
 * @param {number} low 
 * @param {number} high 
 */
function irandomRange(low, high) {
	low = Math.floor(low);
	high = Math.floor(high);
	return Math.floor(randomRange(low, high));
}

/**
 * Clamps a value between two boundaries
 * @param {number} value Value to clamp
 * @param {number} min Minimum boundary
 * @param {number} max Max boundary
 */
function clamp(value, min, max) {
	return Math.min(max, Math.max(min, value));
}

/**
 * A modulo function that does not mirror values when negative. Returns the result of this function.
 * @param {number} x value to perform function on
 * @param {number} n value to mod by
 */
function mod(x, n) {
	return (x % n + n) % n;
}

/**
 * 'Wraps' a numerical value between two boundaries. Returns the result of this function.
 * @param {number} x value to perform function on
 * @param {number} low the lower boundary
 * @param {number} high the upper boundary
 */
function wrap(x, low, high) {
	return mod(x - low, high - low) + low;
}

/**
 * Function for creating an axis aligned rectangle including
 * several useful helper methods.
 * @param {number} x x-position of upper left corner
 * @param {number} y y-position of upper left corner
 * @param {number} width width of rectangle
 * @param {number} height height of rectangle
 */
function Rectangle(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.anchor = {
		x: 0,
		y: 0
	};
	/**
	 * Gets the left-most x position of the Rectangle
	 */
	this.getLeft = () => this.x - this.anchor.x;
	/**
	 * Gets the right-most x position of the Rectangle
	 */
	this.getRight = () => this.x - this.anchor.x + this.width;
	/**
	 * Gets the top-most y position of the Rectangle
	 */
	this.getTop = () => this.y - this.anchor.y;
	/**
	 * Gets the bottom-most y position of the Rectangle
	 */
	this.getBottom = () => this.y - this.anchor.y + this.height;
	/**
	 * Gets the center position of the Rectangle as an object:
	 * {x: centerXPos, y: centerYPos }
	 */
	this.getCenterPos = () => {
		return {x: this.left + this.width/2, y: this.top + this.width/2};
	};
	/**
	 * Sets the anchor with x and y positions normalized/scaled positions from 0 to 1
	 */
	this.setAnchor = function(x, y) {
		this.anchor.x = this.left + (this.width * x);
		this.anchor.y = this.top + (this.height * y);
	};
}

function imageDataObject(image, clipX, clipY, clipWidth, clipHeight) {
	return {
		image:image,
		clipX:clipX,
		clipY:clipY,
		clipWidth:clipWidth,
		clipHeight:clipHeight
	};
}

function drawFromAtlas(context, imageData, drawX, drawY, drawWidth, drawHeight) {
	//		canvasContext.drawImage(titleBlock, 0, 0, titleBlock.width, titleBlock.height, titleBlockPos.x, titleBlockPos.y, titleBlockWidth, titleBlockHeight);        
	context.drawImage(imageData.image, imageData.clipX, imageData.clipY, imageData.clipWidth, imageData.clipHeight, drawX, drawY, drawWidth, drawHeight);
}
	