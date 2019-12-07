//Hourglass Manager 2
function HourglassManager(totalTime, pos, screenLeft, width) {
	const TIME_PER_GLASS = 30;//in seconds
	const GLASSES = [];

	const position = {x:pos.x - screenLeft, y:pos.y};
	const glassCount = Math.ceil(totalTime / TIME_PER_GLASS);
	const deltaX = Math.floor(width / glassCount);
	const populateGlasses = function() {
		let theTime = 0;
		let glassXPos = position.x;
		
		for(let i = 0; i < glassCount; i++) {
			const anHourglass = new Hourglass({x: glassXPos, y:position.y}, screenLeft, TIME_PER_GLASS);
			theTime += anHourglass.time;
			GLASSES.push(anHourglass);
			glassXPos += deltaX;
		}

		return theTime / 1000;
	};
	this.time = populateGlasses();

	this.timeIsUp = false;

	this.update = function(deltaTime) {//deltaTime is in milliseconds
		if(GLASSES.length <= 0) {
			this.timeIsUp = true;
			return;
		}

		GLASSES[GLASSES.length - 1].update(deltaTime);
		
		if(GLASSES[GLASSES.length - 1].isExpired) {
			//play pop sound
			GLASSES.pop();
		}
	};

	this.draw = function(cameraX) {
		for(let glass of GLASSES) {
			glass.draw(cameraX);
		}
	};

	function Hourglass(pos, left, time) {
		const FRAME_WIDTH = 76;
		const FRAME_HEIGHT = 74;
		const FRAME_TIME = time * 100;// (1000/10) to convert to seconds and divide by 10
		const position = {x:pos.x, y:pos.y};
		const velocity = {x:0, y:0};
		let alpha = 1;

		let animation = new SpriteAnimation("hourglass", //string identifier for this animation
			hourglassAnimation, //image in which the frames reside
			[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], //array of frame indexes to use for this animation
			FRAME_WIDTH, //width of each frame
			FRAME_HEIGHT, //height of each frame
			[125, 125, 125, 125, 125, 125, FRAME_TIME, FRAME_TIME, FRAME_TIME, FRAME_TIME, FRAME_TIME, FRAME_TIME, FRAME_TIME, FRAME_TIME, FRAME_TIME],//array of milliseconds to show each frame
			false, //boolean indicates if animation reverses (true)
			false);

		let rotatingAnimation = new SpriteAnimation("rotating", //string identifier for this animation
			hourglassAnimation, //image in which the frames reside
			[0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4], //array of frame indexes to use for this animation
			FRAME_WIDTH, //width of each frame
			FRAME_HEIGHT, //height of each frame
			[50],//array of milliseconds to show each frame
			false, //boolean indicates if animation reverses (true)
			false);

		const ROT_TIME = 20 * 50;
		let timeRotating = 0;

		let isRotating = false;
		let countdownFinished = false;
		this.isExpired = false;
		this.time = ROT_TIME + (125 * 6) + (FRAME_TIME * 9);

		this.update = function(deltaTime) {
			if(animation.isFinished()) {
				if(!countdownFinished) {
					velocity.x = 0.1;
					velocity.y = -0.2;	
				}
				countdownFinished = true;
				isRotating = true;
			} else {
				animation.update(deltaTime);
			}

			if(countdownFinished) {
				rotatingAnimation.update(deltaTime);

				timeRotating += deltaTime;
				alpha = 1 - timeRotating / ROT_TIME;

				position.x += velocity.x * deltaTime;
				position.y += velocity.y * deltaTime;
				velocity.y += (1.0 * deltaTime / 1000);

				if(rotatingAnimation.isFinished()) {
					this.isExpired = true;
				}
			}
		};

		this.draw = function(screenLeft) {
			if(isRotating) {
				canvasContext.save();
				canvasContext.globalAlpha = alpha;
				rotatingAnimation.drawAt(position.x + screenLeft, position.y);
				canvasContext.restore();
			} else {
				animation.drawAt(position.x + screenLeft, position.y);
			}
		};
	}
}