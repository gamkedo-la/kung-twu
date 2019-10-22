//Display Points
function DisplayPoints(points, startPos) {
	const VELOCITY = -50 / 1000;
	const TOT_SHOW_TIME = 1000;
	const TOT_FADE_TIME = 500;

	let timeShown = 0;
	let timeFading = 0;

	this.points = points;
	let pointsString = points.toString();
	this.position = {x:startPos.x, y:startPos.y};
	let alpha = 1.0;
	this.isComplete = false;

	this.update = function(deltaTime) {
		timeShown += deltaTime;
		if(timeShown > TOT_SHOW_TIME) {
			timeFading = timeShown - TOT_SHOW_TIME;
			alpha = 1.0 - (timeFading / TOT_FADE_TIME);
			if(alpha <= 0) {
				alpha = 0;
				this.isComplete = true;
			}
		}
		this.position.y += (VELOCITY * deltaTime);
	};

	this.draw = function() {
		//Leave as plain text
		colorText(pointsString,
			this.position.x, this.position.y,
			Color.White, Fonts.CreditsText,
			TextAlignment.Center, alpha, true);
	};
}