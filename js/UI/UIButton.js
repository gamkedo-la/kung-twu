//UIButton
function UIButton(stringsKey, x, y, height, padding = 2, onClick, color = Color.Blue, language = null) {
	const bounds = {};
	const TITLE_SCALE = 0.3;
	let isHovering = false;
	this.title = getLocalizedStringForKey(stringsKey);
    
	this.onClick = onClick;

	const setBounds = function(title, x, y, height, padding) {
		if(JPFont === undefined) {
			console.error(`JPFont undefined. Button Title:${title}`);
			return;
		}
		if(language === null) {
			bounds.width = JPFont.getStringWidth(title, TITLE_SCALE) + padding * 2;
		} else {
			bounds.width = JPFont.getStringWidth(title, TITLE_SCALE, language) + padding * 2;
		}
		
		bounds.height = JPFont.getCharacterHeight(TITLE_SCALE);
        
		bounds.x = x;
		bounds.y = y;
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
		const posX = bounds.x + padding;
		const posY = bounds.y;// + padding + fontOverhangAdjustment;
		
		if(language === null) {
			JPFont.printTextAt(this.title, {x:posX,y:posY}, TextAlignment.Left, TITLE_SCALE);
		} else {
			JPFont.printTextAt(this.title, {x:posX,y:posY}, TextAlignment.Left, TITLE_SCALE, language);
		}

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