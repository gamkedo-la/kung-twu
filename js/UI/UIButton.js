//UIButton
function UIButton(stringsKey, x, y, height, padding = 2, onClick, color = Color.Blue, language = null, scale = 0.3) {
	const bounds = {};
	let TITLE_SCALE = scale;
	let isHovering = false;
	this.title = getLocalizedStringForKey(stringsKey);
    let titleArray = [];
    
    this.selectorIndex = 0; // if set, we know what uibutton corresponds to which menu item so we can move its cursor
    
	this.onClick = onClick;

	const setBounds = function(title, x, y, height, padding) {
		if(JPFont === undefined) {
			console.error(`JPFont undefined. Button Title:${title}`);
			return;
		}

		titleArray = title.split("\n");
		if(titleArray.length > 1) {
			if(language === null) {
				let maxLineWidth = 0;
				for(let aLine of titleArray) {
					const thisWidth = JPFont.getStringWidth(aLine, TITLE_SCALE) + padding * 2;
					if(thisWidth > maxLineWidth) {
						maxLineWidth = thisWidth;
					}
				}
				bounds.width = maxLineWidth;
			} else {
				let maxLineWidth = 0;
				for(let aLine of titleArray) {
					const thisWidth = JPFont.getStringWidth(aLine, TITLE_SCALE, language) + padding * 2;
					if(thisWidth > maxLineWidth) {
						maxLineWidth = thisWidth;
					}
				}
				bounds.width = maxLineWidth;
			}

			bounds.height = (titleArray.length * JPFont.getCharacterHeight(TITLE_SCALE)) + ((titleArray.length - 1) * padding);
		} else {
			if(language === null) {
				bounds.width = JPFont.getStringWidth(title, TITLE_SCALE) + padding * 2;
			} else {
				bounds.width = JPFont.getStringWidth(title, TITLE_SCALE, language) + padding * 2;
			}
			
			bounds.height = JPFont.getCharacterHeight(TITLE_SCALE);
		}
        
		bounds.x = x;
		bounds.y = y;
	};

	setBounds(this.title, x, y, height, padding);

	this.getBounds = function() {
		return bounds;
	};

	this.setScale = function(newScale) {
		TITLE_SCALE = newScale;
		setBounds(this.title, x, y, height, padding);
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
			sound.playSFX(Sounds.SFX_MenuSelect);
			this.onClick();
			return true;
		} else {
			return false;
		}
	};

	this.draw = function() {
		const posX = bounds.x + padding;
		const posY = bounds.y;// + padding + fontOverhangAdjustment;
		
		if(titleArray.length > 1) {
			for(let i = 0; i < titleArray.length; i++) {
				const thisLine = titleArray[i];
				if(language === null) {
					JPFont.printTextAt(thisLine, {x:posX,y:posY + i * (bounds.height/2)}, TextAlignment.Left, TITLE_SCALE);
				} else {
					JPFont.printTextAt(thisLine, {x:posX,y:posY+ i * (bounds.height/2)}, TextAlignment.Left, TITLE_SCALE, language);
				}	
			}			
		} else {
			if(language === null) {
				JPFont.printTextAt(this.title, {x:posX,y:posY}, TextAlignment.Left, TITLE_SCALE);
			} else {
				JPFont.printTextAt(this.title, {x:posX,y:posY}, TextAlignment.Left, TITLE_SCALE, language);
			}	
		}

		const wasHit = didHit(mouseX, mouseY);
		if((DEBUG) || wasHit) { // draw bounds for buttons in semi-transparent colors
			const BGColor = Color.Aqua;
            
			canvasContext.save();
			canvasContext.globalAlpha = 0.2;
            
			drawRect(bounds.x, bounds.y, bounds.width, bounds.height, BGColor);
            
            canvasContext.restore();
            
            // also move the menu cursor icon
            if (this.selectorIndex!=null && SceneState.currentScene==SCENE.TITLE) {
                SceneState.scenes[SCENE.TITLE].moveSelector(this.selectorIndex);
            }

		}

		if(wasHit && !isHovering) {
			sound.playSFX(Sounds.SFX_MenuNav);
			isHovering = true;
		}
		
		if(!wasHit) {
			isHovering = false;
		}
	};
}