//Animation
function SpriteAnimation(name, //string identifier for this animation
	image, //image in which the frames reside
	frames = [0], //array of frame indexes to use for this animation
	frameWidth = 32, //width of each frame
	frameHeight = 32, //height of each frame
	frameTimes = [64],//array of milliseconds to show each frame
	reverses = false, //boolean indicates if animation reverses (true)
	loops = false,
	redImage,
	context = canvasContext) { //boolean indicates if animation loops (true) 

	this.name = name;
	this.image = image;
	this.scale = 1;
	let finished = false; //only becomes true if reverses is false and loops is false (i.e. does neither)
	this.isFinished = function() {
		return finished;
	};

	let times;
	let isInReverse = false;
	let currentFrameIndex = frames[0];
	const framesPerRow = Math.round(image.width / frameWidth);
    
	let remainderTime = 0;

	this.getCurrentFrame = function() {
		return currentFrameIndex;
	};

	this.getContext = function() {
		if(image.getContext("2d") != undefined) {
			return image.getContext("2d");
		} else {
			return context;
		}
	};

	this.getSize = function() {
		return {width:this.scale * image.width, height:this.scale * image.height};
	};

	this.reset = function() {
		remainderTime = 0;
		isInReverse = false;
		currentFrameIndex = frames[0];
		finished = false;
	};
    
	this.update = function(deltaTime) {
		if(times == null) {return;}

		remainderTime += deltaTime;
		while(remainderTime >= times[currentFrameIndex]) {
			remainderTime -= times[currentFrameIndex];
			currentFrameIndex = nextFrameIndex(currentFrameIndex, frames);
		}
	};

	this.drawAt = function(x = 0, y = 0, flipped = false, red = false) {
		const thisFrameRect = getCurrentFrameRect();
		
		context.save();
		
		let drawPosX = x;
		let drawPosY = y;
		if(flipped) {
			context.translate(x + (this.scale * thisFrameRect.width), y);
			context.scale(-1, 1);
			drawPosX = 0;
			drawPosY = 0;
		}

		if((red) && (redImage !== undefined)) {
			context.drawImage(redImage, 
				thisFrameRect.x, thisFrameRect.y, thisFrameRect.width, thisFrameRect.height,
				drawPosX, drawPosY, thisFrameRect.width * this.scale, thisFrameRect.height * this.scale);	
		} else {
			context.drawImage(image, 
				thisFrameRect.x, thisFrameRect.y, thisFrameRect.width, thisFrameRect.height,
				drawPosX, drawPosY, thisFrameRect.width * this.scale, thisFrameRect.height * this.scale);
		}

		context.restore();
	};

	this.getWidth = function() {
		return (frameWidth * this.scale);
	};

	this.getHeight = function() {
		return (frameHeight * this.scale);
	};

	const makeRedImage = function() {
		if(image.getContext != undefined) {
			const normalContext = image.getContext("2d");
			const redContext = redImage.getContext("2d");
			try {
				const imageData = normalContext.getImageData(0, 0, redImage.width, redImage.height);
				const data = imageData.data;
				for(let i = 0; i < data.length; i += 4) {
					data[i] += 75;
					if(data[i] > 255) {
						data[i] = 255;
					}
					data[i + 1] -= 50;
					if(data[i + 1] < 0) {
						data[i + 1] = 0;
					}
					data[i + 2] -= 50;
					if(data[i + 2] < 0) {
						data[i + 2] = 0;
					}
				}

				redContext.putImageData(imageData, 0, 0);
			} catch(error) {
				//console.log("Need to run on a server");
				return;
			}
		}
	};

	if((redImage !== undefined) && (redImage === null)) {
		redImage = document.createElement("canvas");
		redImage.width = image.width;
		redImage.height = image.height;
		makeRedImage();
	} 

	const getCurrentFrameRect = function() {
		const nowFrameIndex = frames[currentFrameIndex];
		const xClipPos = frameWidth * (nowFrameIndex % framesPerRow);
		const yClipPos = frameHeight * (Math.floor(nowFrameIndex / framesPerRow));
		return {x:xClipPos, y:yClipPos, width:frameWidth, height:frameHeight};
	};

	const initializeFrameTimes = function(frameTimes, frames) {
		let newFrameTimes = [];
		if(frameTimes.length != frames.length) {
			for(let i = 0; i < frames.length; i++) {
				newFrameTimes.push(frameTimes[0]);
			}
		} else {
			newFrameTimes = frameTimes;
		}

		return newFrameTimes;
	};
	times = initializeFrameTimes(frameTimes, frames);//need to call this function now that it is defined

	const nextFrameIndex = function(currentFrame, frames) {
		let newFrameIndex;
		if(isInReverse) {
			newFrameIndex = currentFrame - 1;
			if(newFrameIndex < 0) {
				newFrameIndex = currentFrame + 1;
				isInReverse = false;
			} 
		} else {
			newFrameIndex = currentFrame + 1;
			if(newFrameIndex >= frames.length) {
				if(reverses) {
					newFrameIndex = currentFrame - 1;
					isInReverse = true;
				} else if(loops) {
					newFrameIndex = 0;
				} else {
					newFrameIndex = currentFrame;
					finished = true;
				}
			}
		}

		return newFrameIndex;
	};
}