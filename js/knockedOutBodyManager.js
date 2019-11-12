// an object that falls to the floor and fades out
// used for the bodies of your defeated opponents


function knockedOutBodyManager() {
	
  
	const DEBUG_BODIES = false; // console logs
	const SPRX = 0; // sprite used is frame 2 of the kick animation
	const SPRW = 40;
	const SPRH = 69;
	const BODYW = 40*2; // the sprites are stretched?!
	const BODYH = 69*2;
	const MAX_BODIES = 25; // oldest is overwritten
	const MAX_AGE = 100; // frames till it disappears
    const SPINSPD = -6*DEG_TO_RAD; // degrees per frame
    const SPIN_RANDOMNESS = 15*DEG_TO_RAD;
	const FADE_OUT = true;
	const X_KICKBACK = -3; // starting velocities in px/frame
	const X_KICKBACK_RANDOMNESS = 2;
    const Y_KICKBACK = -5; // starts flying upward
    const Y_KICKBACK_RANDOMNESS = 3; 
	const BODYGRAV = 1; // accell downward per frame
	
	if (DEBUG_BODIES) console.log("Creating the knockedOutBodyManager...");

	// experimenting with data-oriented style just for fun - no objects! =)
	// these are "ring buffers" that never grow in size after hitting max
	var max = 0;
	var img = [];
	var xpos = [];
	var ypos = [];
	var xspd = [];
	var yspd = [];
	var age = [];
	var rotspd = [];

	// called by processDefeatedEntities()
	this.add = function (enemy) {

		if (DEBUG_BODIES) console.log("New knocked out body " + max);

		img[max] = basicEnemyKick;
		xpos[max] = enemy.getPosition().x;
		ypos[max] = enemy.getPosition().y;
		xspd[max] = X_KICKBACK + (Math.random()*(X_KICKBACK*2)-X_KICKBACK_RANDOMNESS);
        yspd[max] = Y_KICKBACK + (Math.random()*(Y_KICKBACK*2)-Y_KICKBACK_RANDOMNESS);
        rotspd[max] = SPINSPD + (Math.random()*(SPIN_RANDOMNESS*2)-SPIN_RANDOMNESS);
		age[max] = 0;

		if (!player.facingLeft()) xspd[max] *= -1;


		max++;
		if (max>MAX_BODIES) max = 0;
	};

	this.draw = function () {
		for (var num = 0; num < max; num++) {
			
			if (age[num]<MAX_AGE) {
				canvasContext.save();
				canvasContext.translate(xpos[num], ypos[num]);
                //canvasContext.rotate((xspd[num]>0?-1:1)*SPINSPD*age[num]);
                canvasContext.rotate((xspd[num]>0?-1:1)*rotspd[num]*age[num]);
				if (FADE_OUT) canvasContext.globalAlpha = 1-(age[num]/MAX_AGE);
				// untranslated/unrotated version: canvasContext.drawImage(img[num],SPRX,0,SPRW,SPRH,xpos[num],ypos[num],BODYW,BODYH);
				canvasContext.drawImage(img[num],SPRX,0,SPRW,SPRH,-BODYW/2,-BODYH/2,BODYW,BODYH);
				canvasContext.restore();
				age[num]++;
				xpos[num] += xspd[num];
				ypos[num] += yspd[num];
				// gravity
				yspd[num] += BODYGRAV;
				//if (ypos[num]>MAXY) ypos[num]=MAXY; // hit the floor? nah keep falling
			}
		}
	};
}
