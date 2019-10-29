// an object that falls to the floor and fades out
// used for the bodies of your defeated opponents


function knockedOutBodyManager() {
	
  
	const DEBUG_BODIES = false; // console logs
	const SPRX = 0; // sprite used is frame 2 of the kick animation
	const SPRW = 40;
	const SPRH = 69;
	const BODYW = 40*2; // the sprites are stretched?!
	const BODYH = 69*2;
	//const MAXY = 700; // the floor?
	const MAX_BODIES = 25; // oldest is overwritten
	const MAX_AGE = 100; // frames till it disappears
	const SPINSPD = -5*DEG_TO_RAD; // degrees per frame
	const FADE_OUT = true;
	const X_KICKBACK = -5; // starting velocities in px/frame
	const Y_KICKBACK = -10; // starts flying upward
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

	// called by processDefeatedEntities()
	this.add = function (enemy) {

		if (DEBUG_BODIES) console.log("New knocked out body " + max);

		img[max] = basicEnemyKick;
		xpos[max] = enemy.getPosition().x;
		ypos[max] = enemy.getPosition().y;
		xspd[max] = X_KICKBACK;
		yspd[max] = Y_KICKBACK;
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
				canvasContext.rotate(SPINSPD*age[num]);
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
