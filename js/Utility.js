//Utility
function lerp(start, end, amount) {
	return (1 - amount) * start + amount * end;
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
	