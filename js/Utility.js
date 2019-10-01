//Utility
function lerp(start, end, amount) {
	return (1 - amount) * start + amount * end;
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
		x: anchorX,
		y: anchorY};
	/**
	 * Gets the left-most x position of the Rectangle
	 */
	this.left = () => this.x - this.anchor.x;
	/**
	 * Gets the right-most x position of the Rectangle
	 */
	this.right = () => this.x - this.anchor.x + this.width;
	/**
	 * Gets the top-most y position of the Rectangle
	 */
	this.top = () => this.y - this.anchor.y;
	/**
	 * Gets the bottom-most y position of the Rectangle
	 */
	this.bottom = () => this.y - this.anchor.y + this.height;
	/**
	 * Gets the center position of the Rectangle as an object:
	 * {x: centerXPos, y: centerYPos }
	 */
	this.center = () => {
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
  