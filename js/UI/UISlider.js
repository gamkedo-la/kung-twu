/**
 * 
 * @param {HTMLImageElement} image The html <img> to render
 * @param {number} x x-position
 * @param {number} y y-position
 * @param {number} xAnchor
 */
function UITextureButton(image, x, y) {
	const _DEBUG = true;
	
	this.image = image;
	this.state = State.NONE;
	this.rectangle = new Rectangle(x, y, image.width, image.height);
	
	/** Enumeration of possible button States */
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

/**
 * Creates a slider, useful for menu UI
 */
function UISlider(x, y, width = 150, height = 10, label = "", 
	lowVal = 0, lowLabel = "", highVal = 100, highLabel = "", intialValue = 50, 
	steps = 10, isHorizontal = true, color = Color.Aqua) {

  const RADIUS = (isHorizontal? height : width);
  /**
   * The difference between high and low values
   */
	const SPAN = highVal - lowVal;
	const INCREMENT = SPAN / steps;
	const LABEL_PADDING = 10;

	let path = null;
	let indicatorPath = null;
//	let shadowPath = null;
	let positivePath = null;
	let negativePath = null;

	let currentValue;
	let hasNewValue = true;
	this.hasFocus = false;

	this.setValue = function(newValue) {
		if(newValue === currentValue) {return;}

		if(newValue < lowVal) {
			currentValue = lowVal;
		} else if(newValue > highVal) {
			currentValue = highVal;
		} else {
			let lowerValue = lowVal;
			let higherValue = lowVal + INCREMENT;

			while(higherValue < newValue) {
				lowerValue = higherValue;
				higherValue += INCREMENT;
			}

			const lowerDelta = newValue - lowerValue;
			const higherDelta = higherValue - newValue;

			let valueToUse;
			if(lowerDelta <= higherDelta) {
				valueToUse = lowerValue;
			} else {
				valueToUse = higherValue;
			}

			if(valueToUse < lowVal) {
				currentValue = lowVal;
			} else if(valueToUse > highVal) {
				currentValue = highVal;
			} else {
				currentValue = valueToUse;
			}
		}

		hasNewValue = true;
	};
	this.setValue(intialValue);

	this.setValueForClick = function(pointerX, pointerY) {
		if(isHorizontal) {
			this.setValue(SPAN * (pointerX - x) / width);
		} else {
			this.setValue(SPAN * (pointerY - y) / height);
		}

		menuSelectionSound.play();
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
		canvasContext.strokeStyle = Color.Black;
		canvasContext.lineWidth = 2;
		canvasContext.stroke(path);

		canvasContext.fillStyle = color;
		canvasContext.fill(positivePath);

		canvasContext.fillStyle = Color.Grey;
		canvasContext.fill(negativePath);

//		canvasContext.fillStyle = Color.Black;
//		canvasContext.fill(shadowPath);
		canvasContext.fillStyle = color;
		canvasContext.fill(indicatorPath);
		canvasContext.strokeStyle = Color.Black;
		canvasContext.lineWidth = 1;
		canvasContext.stroke(indicatorPath);

		if(isHorizontal) {
			colorText(label, x + width / 2, y - LABEL_PADDING, Color.White, Fonts.ButtonTitle, TextAlignment.Center, 1, true);
			colorText(lowLabel, x, y + 2 * height + LABEL_PADDING, Color.White, Fonts.ButtonTitle, TextAlignment.Left, 1, true);
			colorText(highLabel, x + width, y + 2 * height + LABEL_PADDING, Color.White, Fonts.ButtonTitle, TextAlignment.Right, 1, true);
		} else {
			colorText(label, x + width / 2, y - 4 * LABEL_PADDING, Color.White, Fonts.ButtonTitle, TextAlignment.Center, 1, true);
			colorText(lowLabel, x + width / 2, y + height + 2 * LABEL_PADDING, Color.White, Fonts.ButtonTitle, TextAlignment.Center, 1, true);
			colorText(highLabel, x + width / 2, y - LABEL_PADDING, Color.White, Fonts.ButtonTitle, TextAlignment.Center, 1, true);
		}

		canvasContext.restore();	
	};

	const buildPath = function() {
		let indicatorCenter;

		if(isHorizontal) {
			buildHorizontalOutline();
			indicatorCenter = setHorizontalIndicatorCenter();
			buildHorizontalPositive(indicatorCenter);
			buildHorizontalNegative(indicatorCenter);
		} else {
			buildVerticalOutline();
			indicatorCenter = setVerticalIndicatorCenter();
			buildVerticalPositive(indicatorCenter);
			buildVerticalNegative(indicatorCenter);
		}

		indicatorPath = buildIndicatorPath(indicatorCenter);
//		indicatorCenter.x += 2;
//		shadowPath = buildIndicatorPath(indicatorCenter);
	};

	const buildHorizontalOutline = function() {
		path = new Path2D();
		path.moveTo(x + RADIUS, y);
		path.lineTo(x + width - RADIUS, y);
		path.arc(x + width - RADIUS, y + height / 2, height / 2, -Math.PI / 2, Math.PI / 2, false);
		path.lineTo(x + RADIUS, y + height);
		path.arc(x + RADIUS, y + height / 2, height / 2, Math.PI / 2, -Math.PI / 2, false);
		path.closePath();
	};

	const setHorizontalIndicatorCenter = function() {
		const centerX = x + RADIUS / 2 + ((width - RADIUS) * (currentValue - lowVal) / SPAN);
		const centerY = y + height / 2;
		return {x:centerX, y:centerY};
	};

	const buildHorizontalPositive = function(indicatorCenter) {
		positivePath = new Path2D();
		positivePath.moveTo(x + RADIUS, y);
		positivePath.lineTo(indicatorCenter.x, y);
		positivePath.lineTo(indicatorCenter.x, y + height);
		positivePath.lineTo(x + RADIUS, y + height);
		positivePath.arc(x + RADIUS, y + height / 2, height / 2, Math.PI / 2, -Math.PI / 2, false);
		positivePath.closePath();
	};

	const buildHorizontalNegative = function(indicatorCenter) {
		negativePath = new Path2D();
		negativePath.moveTo(indicatorCenter.x, y);
		negativePath.lineTo(x + width - RADIUS, y);
		negativePath.arc(x + width - RADIUS, y + height / 2, height / 2, -Math.PI / 2, Math.PI / 2, false);
		negativePath.lineTo(indicatorCenter.x, y + height);
		negativePath.closePath();
	};


	const buildVerticalOutline = function() {
		path = new Path2D();
		path.moveTo(x, y + RADIUS);
		path.arc(x + width / 2, y + RADIUS, width / 2, -Math.PI, 0, false);
		path.lineTo(x + width, y + height - RADIUS);
		path.arc(x + width / 2, y + height - RADIUS, width / 2, 0, -Math.PI, false);
		path.closePath();
	};

	const setVerticalIndicatorCenter = function() {
		const centerX = x + width / 2;
		const centerY = y + RADIUS / 2 + ((height - RADIUS) * (currentValue - lowVal) / SPAN);
		return {x:centerX, y:centerY};
	};

	const buildIndicatorPath = function(center) {
		const thisPath = new Path2D();
		thisPath.arc(center.x, center.y, RADIUS, 0, 2 * Math.PI);
		thisPath.closePath();

		return thisPath;
	};

	const buildVerticalPositive = function(indicatorCenter) {
		positivePath = new Path2D();
		positivePath.moveTo(x, indicatorCenter.y);
		positivePath.lineTo(x + width, indicatorCenter.y);
		positivePath.lineTo(x + width, y + height - RADIUS);
		positivePath.arc(x + width / 2, y + height - RADIUS, width / 2, 0, -Math.PI, false);
		positivePath.closePath();
	};

	const buildVerticalNegative = function(indicatorCenter) {
		negativePath = new Path2D();
		negativePath.moveTo(x, y + RADIUS);
		negativePath.arc(x + width / 2, y + RADIUS, width / 2, -Math.PI, 0, false);
		negativePath.lineTo(x + width, indicatorCenter.y);
		negativePath.lineTo(x, indicatorCenter.y);
		negativePath.closePath();
	};

}