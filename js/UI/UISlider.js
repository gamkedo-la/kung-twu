/**
 * 
 */
function UITextureButton(image, x, y) {
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
	};

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
function UISlider(x, y, width = 150, height = 10, lowVal = 0, highVal = 100, intialValue = 50, steps = 10, isHorizontal = true, color = Color.Aqua) {
	const RADIUS = (isHorizontal? height : width);
	const SPAN = highVal - lowVal;
	const INCREMENT = SPAN / steps;

	let path = null;
	let indicatorPath = null;

	let currentValue = intialValue;
	let hasNewValue = true;
	this.hasFocus = false;

	this.setValue = function(newValue) {
		if(newValue === currentValue) {return;}

		if(newValue < lowVal) {
			currentValue = lowVal;
		} else if(newValue > highVal) {
			currentValue = highVal;
		} else {
			currentValue = newValue;
		}

		hasNewValue = true;
	};

	this.setValueForClick = function(pointerX, pointerY) {
		if(isHorizontal) {
			this.setValue(SPAN * (pointerX - x) / width);
		} else {
			this.setValue(SPAN * (pointerY - y) / height);
		}
	};

	this.getValue = function() {
		return currentValue;
	};

	this.increment = function() {
		this.setValue(currentValue + INCREMENT);
	};

	this.decrement = function() {
		this.setValue(currentValue - INCREMENT);
	};

	this.update = function(deltaTime) {

	};

	this.wasClicked = function(pointerX, pointerY) {
		let transformedX = pointerX;
		if(canvasContext.mozCurrentTransform != undefined) {
			transformedX -= canvasContext.mozCurrentTransform[4];
		} else {
			transformedX -= canvasContext.getTransform().m41;
		}

		if(pointInside(transformedX, pointerY, x, y, width, height)) {
			return true;
		} else {
			return false;
		}
	};

	this.draw = function() {
		if(hasNewValue) {
			buildPath();
			hasNewValue = false;
		}

		canvasContext.save();
		canvasContext.strokeStyle = color;
		canvasContext.stroke(path);

		canvasContext.fillStyle = color;
		canvasContext.fill(indicatorPath);

		canvasContext.restore();	
	};

	const buildPath = function() {
//		canvasContext.save();

//		canvasContext.beginPath();
		path = new Path2D();
		const indicatorCenter = {x:0, y:0};

		if(isHorizontal) {
			path.moveTo(x + RADIUS, y);
			path.lineTo(x + width - RADIUS, y);
			path.arc(x + width - RADIUS, y + height / 2, height / 2, -Math.PI / 2, Math.PI / 2, false);
			path.lineTo(x + RADIUS, y + height);
			path.arc(x + RADIUS, y + height / 2, height / 2, Math.PI / 2, -Math.PI / 2, false);

			indicatorCenter.x = x + (width * (currentValue - lowVal) / SPAN);
			indicatorCenter.y = y + height / 2;
		} else {
			path.moveTo(x, y + RADIUS);
			path.arc(x + width / 2, y + RADIUS, width / 2, -Math.PI, 0, false);
			path.lineTo(x + width, y + height - RADIUS);
			path.arc(x + width / 2, y + height - RADIUS, width / 2, 0, -Math.PI, false);

			indicatorCenter.x = x + width / 2;
			indicatorCenter.y = y + (height * (currentValue - lowVal) / SPAN);
		}

		path.closePath();

		indicatorPath = new Path2D();
		indicatorPath.arc(indicatorCenter.x, indicatorCenter.y, RADIUS, 0, 2 * Math.PI);

//		canvasContext.restore();
	};
}