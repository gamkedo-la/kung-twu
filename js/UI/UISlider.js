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
			//TODO: Need implementation
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

function UISlider(x, y, width = 150, height = 10, label = "", 
	lowVal = 0, lowLabel = "", highVal = 100, highLabel = "", intialValue = 50, 
	steps = 10, isHorizontal = true, aColor = Color.Aqua, valueLabels = null) {

	const LABEL_SCALE = height / 40;//0.3;
	const LABEL_HEIGHT = JPFont.getCharacterHeight(LABEL_SCALE);
	const RADIUS = (isHorizontal? height : width);
	const SPAN = highVal - lowVal;
	const INCREMENT = Math.floor(SPAN / (steps));
	const ALLOWED_VALUES = [];
	for(let i = lowVal; i <= highVal; i+=INCREMENT) {
		ALLOWED_VALUES.push(i);
	}

	const LABEL_PADDING = height;

	let color = aColor;
	let path = null;
	let indicatorPath = null;
	let positivePath = null;
	let negativePath = null;

	let currentValue;
	let valueIndex;
	let hasNewValue = true;
	this.hasFocus = false;

	this.getWidth = function() {
		return width;
	};

	this.getHeight = function() {
		return height;
	};

	this.getTitle = function() {
		return label;
	};

	this.setValue = function(newValue) {
		if(newValue === currentValue) {return;}

		if(newValue <= lowVal) {
			currentValue = lowVal;
			valueIndex = 0;
		} else if(newValue >= highVal) {
			currentValue = highVal;
			if(valueLabels !==null) {
				valueIndex = valueLabels.length - 1;
			}
		} else {
			let lowerValue;
			let higherValue;

			let i = 0;
			for(; i < ALLOWED_VALUES.length; i++) {
				const aValue = ALLOWED_VALUES[i];
				if(aValue >= newValue) {
					lowerValue = ALLOWED_VALUES[i - 1];
					higherValue = ALLOWED_VALUES[i];
					break;
				}
			}

			if(currentValue === higherValue) {
				currentValue = lowerValue;
				valueIndex = i - 1;
			} else {
				currentValue = higherValue;
				valueIndex = i;
			}
		}


		hasNewValue = true;
	};
	this.setValue(intialValue);

	this.setValueForClick = function(pointerX, pointerY) {
		if(isHorizontal) {
			this.setValue(lowVal + (SPAN * (pointerX - x)) / width);
		} else {
			this.setValue(lowVal + (SPAN * (pointerY - y)) / height);
		}

		sound.playSFX(Sounds.SFX_MenuSelect);
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

	this.drawWithColor = function(newColor) {
		color = newColor;
		this.draw();
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

		canvasContext.fillStyle = color;
		canvasContext.fill(indicatorPath);
		canvasContext.strokeStyle = Color.Black;
		canvasContext.lineWidth = 1;
		canvasContext.stroke(indicatorPath);

		if(isHorizontal) {
			JPFont.printTextAt(label, {x:x + width / 2, y:y - LABEL_PADDING - 2 * LABEL_HEIGHT}, TextAlignment.Center, 2 * LABEL_SCALE);
			JPFont.printTextAt(lowLabel, {x:x, y:y + 2 * LABEL_PADDING}, TextAlignment.Center, LABEL_SCALE);
			JPFont.printTextAt(highLabel, {x:x + width, y:y + 2 * LABEL_PADDING}, TextAlignment.Center, LABEL_SCALE);
			if(valueLabels === null) {
				JPFont.printTextAt(currentValue.toString(), {x:x + width / 2, y:y + 3 * LABEL_PADDING}, TextAlignment.Center, 1.5 * LABEL_SCALE);
			} else {
				JPFont.printTextAt(valueLabels[valueIndex], {x:x + width / 2, y:y + 3 * LABEL_PADDING}, TextAlignment.Center, 1.5 * LABEL_SCALE);
			}
		} else {
			JPFont.printTextAt(label, {x:x + width / 2, y:y - 4 * LABEL_PADDING}, TextAlignment.Center, LABEL_SCALE);
			JPFont.printTextAt(lowLabel, {x:x + width / 2, y:y + height}, TextAlignment.Center, LABEL_SCALE);
			JPFont.printTextAt(highLabel, {x:x + width / 2, y:y - 2 * LABEL_PADDING}, TextAlignment.Center, LABEL_SCALE);
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