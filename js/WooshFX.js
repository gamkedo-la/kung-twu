// motion-blur anime-style wooshes
// made for Kung Twu by McF
// pools vars for "no gc" performance

const DEBUG_WOOSHES = false;
const DEG_TO_RAD = Math.PI/180;

function WooshFXManager(wooshImage) {
	var wooshPool = [];
    var num, aWoosh;

	if (DEBUG_WOOSHES) console.log("Creating the WooshFXManager...");

    // game-specific effects
    this.triggerPunch = function (pos,left) {
        if (left)
            this.trigger(pos.x-20,pos.y+45,0,wooshPunchPic);
        else
            this.trigger(pos.x+110,pos.y+45,180*DEG_TO_RAD,wooshPunchPic);
    };
    this.triggerKick = function (pos,left) {
        if (left)
            this.trigger(pos.x-20,pos.y+20,0,wooshKickPic);
        else
            this.trigger(pos.x+110,pos.y+20,180*DEG_TO_RAD,wooshKickPic);
    };
    this.triggerJKick = function (pos,left) {
        if (left)
            this.trigger(pos.x-20,pos.y+20,0,wooshKickPic);
        else
            this.trigger(pos.x+110,pos.y+20,180*DEG_TO_RAD,wooshKickPic);
    };
    this.triggerHKick = function (pos,left) {
        if (left)
            this.trigger(pos.x-20,pos.y+20,0,wooshKickPic);
        else
            this.trigger(pos.x+110,pos.y+20,180*DEG_TO_RAD,wooshKickPic);
    };

    // called by the custom fx above or on its own
    this.trigger = function (x, y, r, img) {
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
		aWoosh.trigger(x, y, r, img);
	};

	this.draw = function () {
		for (num = 0; num < wooshPool.length; num++) {
			if (wooshPool[num].active) {
				aWoosh.draw();
			}
		}
	};
}


function Woosh(wooshImage) { // a single woosh, reused often

    const GROW_AND_SHRINK = false; // if false, it gets bigger only
	this.active = false; // if true, manager reuses it
	this.img = wooshImage;
	this.frameCount = 8; // length of animation 
    // size when full size
    this.w = 320; //wooshImage.width;
	this.h = 320; //wooshImage.height;
    // current state
    this.r = 0;
	this.x = 0;
	this.y = 0;
    this.frame = 0;
    var offset, percent, currentSize; // reused

    // you can change images
    this.trigger = function (x, y, r, img) {
		if (DEBUG_WOOSHES) console.log("Woosh pos:" + x + "," +  y + " ang:" + r);
		this.active = true;
		this.frame = 0;
		this.x = x;
		this.y = y;
        this.r = r;
        if (img) this.img = img; // switching allowed
    };
    
	this.draw = function () {

		if (this.active) {

            // animate
            percent = this.frame / this.frameCount;
            currentSize = this.w * (percent);
            if (GROW_AND_SHRINK) { 
                if (this.frame > this.frameCount / 2) { // shrink at 50% time
                    currentSize = this.w - (currentSize*2); // get smaller
                } else { // still growing
                    currentSize *= 2; // full size at halfway point
                }
            }
			offset = currentSize / 2; // center

            // draw
            canvasContext.save(); //	allows	us	to	undo	translate	movement	and	rotate	spin
            canvasContext.globalAlpha = 1 - percent; // fade out
            canvasContext.translate(this.x, this.y);
            canvasContext.rotate(this.r);
            canvasContext.scale(currentSize/this.img.width,currentSize/this.img.width); 
            //canvasContext.translate(-offset,-offset);
            canvasContext.drawImage(this.img, -offset,-offset); //	center,	draw
            //canvasContext.drawImage(this.img,0,0); // draw
            canvasContext.globalAlpha = 1;
            canvasContext.restore(); //	undo	the	translation	movement	and	rotation	since	save()

            // step
            this.frame++;
			this.active = this.frame < this.frameCount; // keep going?

		}

	};

}

