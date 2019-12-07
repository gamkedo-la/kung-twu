//Infinite Lamps
function InfiniteLamp(verticalOffset) {
	const LAMP_WIDTH = 64;
	const LAMP_HEIGHT = 74;
	const LAMP_SPACING = 400;
	const VERTICAL_INSET = 36;
	const lamp1 = new Lamp();
	const lamp2 = new Lamp();

	let yPos;

	this.positionFirstLamp = function(xPos) {
		yPos = canvas.height - LAMP_HEIGHT - VERTICAL_INSET - verticalOffset;
		lamp1.setPosition(xPos, yPos);
		lamp2.setPosition(xPos - LAMP_SPACING, yPos);
	};

	this.update = function(cameraXPos, shifts) {
		if(!lamp1.isOnScreen(cameraXPos)) {
			updateLampLocation(lamp1, lamp2, cameraXPos);
		}
		
		if(!lamp2.isOnScreen(cameraXPos)) {
			updateLampLocation(lamp2, lamp1, cameraXPos);
		}
		
		lamp1.shift(shifts);
		lamp2.shift(shifts);
	};

	this.draw = function() {
		lamp1.draw();
		lamp2.draw();
	};

	const updateLampLocation = function(offscreen, onscreen, cameraXPos) {
		const leftDist = onscreen.getPosition().x - (cameraXPos - canvas.width / 2) - LAMP_WIDTH;
		if(leftDist > LAMP_SPACING) {
			offscreen.setPosition(
				(cameraXPos - canvas.width / 2) - LAMP_WIDTH,
				yPos
			);
		}

		const rightDist = (cameraXPos + canvas.width / 2) - onscreen.getPosition().x;
		if(rightDist > LAMP_SPACING) {
			offscreen.setPosition(
				(cameraXPos + canvas.width / 2),
				yPos
			);
		}
	};

	function Lamp() {
		let xPos = 0;
		let yPos = 0;
		this.setPosition = function(newX, newY) {
			xPos = newX;
			yPos = newY;
		};

		this.getPosition = function() {
			return {x:xPos, y:yPos};
		};

		this.shift = function(shifts) {
			xPos -= shifts;
		};

		this.draw = function() {
			canvasContext.drawImage(lamp, xPos, yPos);
		};

		this.isOnScreen = function(cameraXPos) {
			if( (xPos + lamp.width > cameraXPos - (canvas.width / 2)) &&
				(xPos < cameraXPos + canvas.width / 2)) {
				return true;
			}

			return false;
		};
	}
}