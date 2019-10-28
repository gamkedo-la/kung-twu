//Boss Intro Text
function BossIntroText(text, position, alignment, scale) {
	const VELOCITY = -50 / 1000;
	const TOT_SHOW_TIME = 1000;
	const TOT_FADE_TIME = 1500;
	const TEXT_ARRAY = text.split("\n");
	const LINE_HEIGHT = JPFont.getCharacterHeight(scale);

	let timeShown = 0;
	let timeFading = 0;

	this.position = {x:position.x, y:position.y};
	let alpha = 1.0;
	this.isComplete = false;

	this.update = function(deltaTime, camerXPos) {
		timeShown += deltaTime;
		if(timeShown > TOT_SHOW_TIME) {
			timeFading = timeShown - TOT_SHOW_TIME;
			alpha = 1.0 - (timeFading / TOT_FADE_TIME);
			if(alpha <= 0) {
				alpha = 0;
				this.isComplete = true;
			}

			this.position.y += (VELOCITY * deltaTime);
		}

		this.position.x = camerXPos;
	};

	this.draw = function() {
		for(let i = 0; i < TEXT_ARRAY.length; i++) {
			JPFont.printTextAt(TEXT_ARRAY[i], {x: this.position.x, y:this.position.y + LINE_HEIGHT * i}, alignment, scale, undefined, alpha);
		}
	};
}