// an object that falls to the floor and fades out
// used for the bodies of your defeated opponents


function knockedOutBodyManager() {
    
  
    const DEBUG_BODIES = true; // console logs
    const SPRX = 0; // sprite used is frame 2 of the kick animation
    const SPRW = 40;
    const SPRH = 69;
    const BODYW = 40*1.5; // the sprites are stretched?!
    const BODYH = 69*1.5;
    const MAXY = 600; // the floor
    const MAX_BODIES = 25; // oldest is overwritten
    const MAX_AGE = 60; // frames till it disappears
    
    if (DEBUG_BODIES) console.log("Creating the knockedOutBodyManager...");

    // experimenting with data-oriented style just for fun
    // these are "ring buffers" that never grow in size after hitting max
    var max = 0;
    var img = [];
    var xpos = [];
    var ypos = [];
    var age = [];

	// called by processDefeatedEntities()
	this.add = function (enemy) {

        if (DEBUG_BODIES) console.log("New knocked out body " + max);

        img[max] = basicEnemyKick;
        xpos[max] = enemy.getPosition().x;
        ypos[max] = enemy.getPosition().y;
        age[max] = 0;

        max++;
        if (max>MAX_BODIES) max = 0;
    };

	this.draw = function () {
		for (var num = 0; num < max; num++) {
            
            //canvasContext.save();
			//canvasContext.translate(this.x, this.y);
			//canvasContext.rotate(this.r);
			//canvasContext.globalAlpha = MAX_ALPHA * (1 - (this.frame / this.frameCount)); // fade out
			//canvasContext.drawImage(this.img, Math.round(-this.img.width/2),Math.round(-this.img.height/2)); //	center,	draw
			//canvasContext.restore();
            
            

            if (age[num]<MAX_AGE) {
                canvasContext.drawImage(img[num],SPRX,0,SPRW,SPRH,xpos[num],ypos[num],BODYW,BODYH);
                age[num]++;
                xpos[num] += 0.0; // knockback - fixme which dir?
                ypos[num] += 0.5; // fall
                if (ypos[num]>MAXY) ypos[num]=MAXY; // hit the floor
            }
		}
	};
}
