// motion-blur anime-style wooshes
// made for Kung Twu by McF
// pools vars for "no gc" performance

function WooshFXManager(wooshImage) {
	const DEBUG_WOOSHES = true;
	var wooshPool = [];
	var num, aWoosh;

	if (DEBUG_WOOSHES) console.log("Creating the WooshFXManager...");

	this.trigger = function (x, y, r) {
		aWoosh = null;
		// look for a woosh
		for (num = 0; num < wooshPool.length; num++) {
			if (!wooshPool[num].active) {
				aWoosh = wooshPool[num]; // reuse an old one
				if (DEBUG_WOOSHES) console.log("Reusing woosh " + num);
			}
		}
		if (!aWoosh) { // need to create a new one?
			aWoosh = new Woosh(wooshImage);
			wooshPool.push(aWoosh); // pool gets bigger
			if (DEBUG_WOOSHES) console.log("Creating new woosh " + (wooshPool.length-1));
		}
		// make it happen
		aWoosh.trigger(x, y, r); active = true;
	};

	this.draw = function () {
		for (num = 0; num < wooshPool.length; num++) {
			if (wooshPool[num].active) {
				aWoosh.draw();
			}
		}
	};
}


function Woosh(wooshImage) {

	this.active = false;
	this.img = wooshImage;
	this.w = wooshImage.width;
	this.h = wooshImage.height;
	this.r = 0;
	this.x = 0;
	this.y = 0;
	this.frame = 0;
	this.frameCount = 16;

	this.trigger = function (x, y) {
		if (DEBUG_WOOSHES) console.log("Woosh at " + x + "," +  y);
		this.active = true;
		this.frame = 0;
		this.x = x;
		this.y = y;
		this.r = r;
	};

	this.draw = function () {

		if (this.active) {

			var currentSize = this.w * (this.frame / this.frameCount);
			if (this.frame > this.frameCount / 2) { // shrink at 50% time
				currentSize = this.w - currentSize;
			}
			var offset = currentSize / 2;

			canvasContext.drawImage(
				this.img, 0, 0,
				this.w, this.h,
				this.x - offset, this.y - offset,
				currentSize, currentSize);

			this.frame++;
			this.active = this.frame < this.frameCount;

		}

	};

}

