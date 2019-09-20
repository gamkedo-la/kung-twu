// motion-blur anime-style wooshes
// made for Kung Twu by McF
// pools vars for "no gc" performance

const DEBUG_WOOSHES = false;
const DEG_TO_RAD = Math.PI/180;

function WooshFXManager(wooshImage) {
	var wooshPool = [];
    var num, aWoosh;

	if (DEBUG_WOOSHES) console.log("Creating the WooshFXManager...");

    this.triggerPunch = function (pos,left) {
        if (left)
            this.trigger(pos.x-20,pos.y+45,0);
        else // right
            this.trigger(pos.x+110,pos.y+45,180*DEG_TO_RAD);
    }

    this.triggerKick = function (pos,left) {
        if (left)
            this.trigger(pos.x-20,pos.y+20,0);
        else // right
            this.trigger(pos.x+110,pos.y+20,180*DEG_TO_RAD);
    }

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
	this.w = 100; //wooshImage.width;
	this.h = 100; //wooshImage.height;
	this.r = 0;
	this.x = 0;
	this.y = 0;
	this.frame = 0;
	this.frameCount = 10;

	this.trigger = function (x, y, r) {
		if (DEBUG_WOOSHES) console.log("Woosh pos:" + x + "," +  y + " ang:" + r);
		this.active = true;
		this.frame = 0;
		this.x = x;
		this.y = y;
		this.r = r;
    };
    
	this.draw = function () {

		if (this.active) {

			var currentSize = this.w * (this.frame / this.frameCount);
			//if (this.frame > this.frameCount / 2) { // shrink at 50% time
			//	currentSize = this.w - currentSize;
			//}
			var offset = currentSize / 2;

            canvasContext.save(); //	allows	us	to	undo	translate	movement	and	rotate	spin
            canvasContext.globalAlpha = 1 - (this.frame / this.frameCount);
            
            canvasContext.translate(this.x, this.y);
            canvasContext.rotate(this.r);
            canvasContext.scale(currentSize/this.w,currentSize/this.h); 
            canvasContext.drawImage(this.img, -offset,-offset); //	center,	draw
        
            
            // unrotated, works great
            /*
            canvasContext.drawImage(
				this.img, 0, 0,
				this.w, this.h,
				this.x - offset, this.y - offset,
				currentSize, currentSize);
            */

            canvasContext.globalAlpha = 1;
            canvasContext.restore(); //	undo	the	translation	movement	and	rotation	since	save()

			this.frame++;
			this.active = this.frame < this.frameCount;

		}

	};

}

