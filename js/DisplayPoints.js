//Display Points
function DisplayPoints(points, startPos, destination) {
	const VELOCITY = -50 / 1000;
	const TOT_SHOW_TIME = 1000;
	const TOT_FADE_TIME = 1250;

	let timeShown = 0;
	let timeFading = 0;

	this.points = points;
	let pointsString;
	if(points >= 0) {
		pointsString = `+${points.toString()}`;
	} else {
		pointsString = points.toString();
	}
	this.position = {x:startPos.x, y:startPos.y};
	let alpha = 1.0;
	this.isComplete = false;

	this.update = function(deltaTime, cameraXPos) {
		timeShown += deltaTime;
		if(timeShown > TOT_SHOW_TIME) {
			timeFading = timeShown - TOT_SHOW_TIME;
			alpha = 1.0 - (timeFading / TOT_FADE_TIME);
			if(alpha <= 0) {
				alpha = 0;
				this.isComplete = true;
			}
		}

		updatePosition(this.position, deltaTime, cameraXPos);
	};

	const updatePosition = function(positionToUpdate, deltaTime, cameraXPos) {
		if(timeShown <= TOT_SHOW_TIME) {
			positionToUpdate.y += (VELOCITY * deltaTime);
		} else {
			const percentComplete = (timeShown - TOT_SHOW_TIME) / TOT_FADE_TIME;
			const deltaX = (cameraXPos - canvas.width / 2) + destination.x - positionToUpdate.x;
			const deltaY = destination.y - positionToUpdate.y;
			positionToUpdate.x += (percentComplete * deltaX);
			positionToUpdate.y += (percentComplete * deltaY);
		}
	};

	this.draw = function() {
		if(points >= 0) {
			JPFont.printTextAt(pointsString, this.position, TextAlignment.Center, 0.25);
		} else {
			JPFont.printRedTextAt(pointsString, this.position, TextAlignment.Center, 0.25);

		}
	};
}