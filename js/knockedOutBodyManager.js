// an object that falls to the floor and fades out
// used for the bodies of your defeated opponents

const DEBUG_BODIES = true;
const MAX_BODIES = 25; // ring buffer - oldest is overwritten

function knockedOutBodyManager() {
    
	if (DEBUG_BODIES) console.log("Creating the knockedOutBodyManager...");

    var anims = [];
    var bodyX = [];
    var bodyY = [];
    var bodyAge = [];
    var bodyNum = 0;

	// called by processDefeatedEntities()
	this.add = function (x,y,anim) {
        if (DEBUG_BODIES) console.log("New knocked out body " + bodyNum);
        anims[bodyNum] = anim;
        bodyX[bodyNum] = x;
        bodyY[bodyNum] = y;
        bodyAge[bodyNum] = 0;
        bodyNum++;
        if (bodyNum>MAX_BODIES) bodyNum = 0;
    };

	this.draw = function () {
		for (var num = 0; num < anims.length; num++) {
            
            //canvasContext.save();
			//canvasContext.translate(this.x, this.y);
			//canvasContext.rotate(this.r);
			//canvasContext.globalAlpha = MAX_ALPHA * (1 - (this.frame / this.frameCount)); // fade out
			//canvasContext.drawImage(this.img, Math.round(-this.img.width/2),Math.round(-this.img.height/2)); //	center,	draw
			//canvasContext.restore();
            
            // appears to work, but nothing visible
            if (anims[num]) {
                anims[num].drawAt(bodyX[num],bodyY[num]);
                bodyAge[bodyNum]++;
                bodyY -= 0.25; // fall
            }

		}
	};
}
