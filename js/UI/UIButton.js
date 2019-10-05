//UIButton
function UIButton(stringsKey, x, y, height, padding = 2, onClick, color = Color.Blue) {
	const bounds = {};
	let isHovering = false;
	this.title = getLocalizedStringForKey(stringsKey);
    
	this.onClick = onClick;

	const setBounds = function(title, x, y, height, padding) {
		bounds.width = getTextWidth(title, Fonts.ButtonTitle) + padding * 2;
		bounds.height = height;
        
		bounds.x = x;// - (bounds.width/2);
		bounds.y = y;// - (height * fontOverhangRatio) + height;
	};

	setBounds(this.title, x, y, height, padding);

	this.getBounds = function() {
		return bounds;
	};

	this.updateTitle = function() {
		this.title = getLocalizedStringForKey(stringsKey);
		setBounds(this.title, bounds.x, bounds.y, bounds.height, padding);
	};

	this.updateXPosition = function(newX) {
		bounds.x = newX;
	};

	this.updateYPosition = function(newY) {
		bounds.y = newY;
	};

	const didHit = function(pointerX, pointerY) {
		let transformedX = pointerX;
		if(canvasContext.mozCurrentTransform != undefined) {
			transformedX -= canvasContext.mozCurrentTransform[4];
		} else {
			transformedX -= canvasContext.getTransform().m41;
		}

		if(pointInside(transformedX, pointerY, bounds.x, bounds.y, bounds.width, bounds.height)) {
			return true;
		} else {
			return false;
		}
	};

	this.respondIfClicked = function(pointerX, pointerY) {
		if(didHit(pointerX, pointerY)) {
			menuSelectionSound.play();
			this.onClick();
			return true;
		} else {
			return false;
		}
	};

	this.draw = function() {
		const fontOverhangAdjustment = (bounds.height - padding * 2) * fontOverhangRatio;
		const posX = bounds.x + padding;
		const posY = bounds.y + padding + fontOverhangAdjustment;
        
		colorText(this.title, posX, posY, color, Fonts.ButtonTitle, TextAlignment.Left);

		const wasHit = didHit(mouseX, mouseY);
		if((DEBUG) || wasHit) { // draw bounds for buttons in semi-transparent colors
			const BGColor = Color.Aqua;
            
			const tempAlpha = canvasContext.globalAlpha;
			canvasContext.globalAlpha = 0.2;
            
			drawRect(bounds.x, bounds.y, bounds.width, bounds.height, BGColor);
            
			canvasContext.globalAlpha = tempAlpha;
		}

		if(wasHit && !isHovering) {
			menuNavigationSound.play();
			isHovering = true;
		}
		
		if(!wasHit) {
			isHovering = false;
		}
	};
}