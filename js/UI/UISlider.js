function Rectangle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.anchor = {
    x: anchorX,
    y: anchorY
  }
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
    return {x: this.left + this.width/2, y: this.top + this.width/2}
  }
  /**
   * Sets the anchor with x and y positions normalized/scaled positions from 0 to 1
   */
  this.setAnchor = function(x, y) {
    this.anchor.x = this.left + (this.width * x);
    this.anchor.y = this.top + (this.height * y);
  }
}

/**
 * 
 */
function UITextureButton(image, x, y,) {
  const _DEBUG = true;
  
  this.image = image;
  this.state = State.NONE;
  this.rectangle = new Rectangle(x, y, image.width, image.height);
  
  /** The active state of the button */
  const State = {
    NONE: "NONE",
    HOVER: "HOVER",
    PRESSED: "PRESSED"
  };
  
  
  this.update = function() {
    const pointerX = mouseX;
    const pointerY = mouseY;
    const rect = this.rectangle;

    switch(this.state) {
      case State.NONE: stateNone(mouseX, mouseY, rect);
      break;
      case State.HOVER: stateHover();
      break;
      case State.PRESSED: statePressed();
      break;
    }
  
    if (pointerX >= rect.left && pointerX <= rect.right 
      && pointerY >= rect.top && pointerY <= rect.bottom) {

      }
  }

  function stateNone() {

  }
  function stateHover() {

  }
  function statePressed() {

  }

  function setActive() {
    
  }

}


function UIProgressBar() {

}

/**
 * Creates a horizontal slider, useful for menu UI
 */
function UISlider(x, y, width, height, lowVal, highVal, isHorizontal = true, ) {

}