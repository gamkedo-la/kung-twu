// motion-blur anime-style wooshes
// made for Kung Twu by McF
// pools vars for "no gc" performance

const DEBUG_WOOSHES = false;
const DEG_TO_RAD = Math.PI/180;
const MAX_ALPHA = 0.6; // 1.0 = starts at full opaque
const WOOSH_FRAMECOUNT = 20; // how long they fade out for

function WooshFXManager(wooshImage) {

	var wooshPool = [];

	if (DEBUG_WOOSHES) console.log("Creating the WooshFXManager...");

	this.puff = function (x,y,img) {
		var num = irandomRange(5,12);
		for (var i=0; i<num; i++) {
			this.trigger(
				x + irandomRange(-2,2),
				y + irandomRange(-2,2),
				0,//Math.random()*360*DEG_TO_RAD, // sprite rot
				img,
				randomRange(-6,6),
				randomRange(-6,6),
				-1, // gravity
				0.9, // friction
				60); // frame lifespan
		}
	}
	this.smokePuff = function (x,y) {
		this.puff(x,y,smokeSprite);
	};
	this.starPuff = function (x,y) {
		this.puff(x,y,starSprite);
	};
	this.triggerPunch = function (pos,left) {
		if (left)
			this.trigger(pos.x+30,pos.y+48,0,wooshPunchPic);
		else
			this.trigger(pos.x+40,pos.y+48,180*DEG_TO_RAD,wooshPunchPic);
	};
	this.triggerKick = function (pos,left) {
		if (left)
			this.trigger(pos.x+30,pos.y+64,0,wooshKickPic);
		else
			this.trigger(pos.x+40,pos.y+64,0,wooshKickPic2);
	};
	this.triggerSweep = function (pos,left) {
		//TODO: Fix me, this is a copy of this.triggerJKick added to prevent errors
		if (left)
			this.trigger(pos.x+30,pos.y+64,0,wooshKickPic);
		else
			this.trigger(pos.x+40,pos.y+64,0,wooshKickPic2);
	};
	this.triggerJKick = function (pos,left) {
		if (left)
			this.trigger(pos.x+30,pos.y+64,0,wooshKickPic);
		else
			this.trigger(pos.x+40,pos.y+64,0,wooshKickPic2);
	};
	this.triggerHKick = function (pos,left) {
		if (left)
			this.trigger(pos.x+30,pos.y+64,0,wooshKickPic);
		else
			this.trigger(pos.x+40,pos.y+64,0,wooshKickPic2);
	};

	this.triggerKnockback = function (pos,left) {
		if (left)
			this.trigger(pos.x,pos.y+64,0,wooshKnockoutPic);
		else
			this.trigger(pos.x+10,pos.y+64,0,wooshKnockoutPic);
	};

	this.triggerHurt = function (pos,left) {
		if (left)
			this.trigger(pos.x+30,pos.y+64,0,wooshHurtPic);
		else
			this.trigger(pos.x+40,pos.y+64,0,wooshHurtPic);
	};

	this.triggerKnockout = function (pos,left) {
		if (left)
			this.trigger(pos.x+30,pos.y+64,0,wooshHurtPic);
		else
			this.trigger(pos.x+40,pos.y+64,0,wooshHurtPic);
	};

	this.triggerDashPlayer = function (pos,left) {
		if (left)
			this.trigger(pos.x+30,pos.y+64,0,wooshDashPlayerLPic);
		else
			this.trigger(pos.x+40,pos.y+64,0,wooshDashPlayerPic);
	};

	this.triggerDashEnemy = function (pos,left) {
		if (left)
			this.trigger(pos.x+30,pos.y+64,0,wooshDashEnemyLPic);
		else
			this.trigger(pos.x+40,pos.y+64,0,wooshDashEnemyPic);
	};

	// called by the custom fx above or on its own
	this.trigger = function (x, y, r, img, vx=0, vy=0, gravity=0, friction=1, frames=WOOSH_FRAMECOUNT) {
		var aWoosh = null;
		// look for a woosh
		for (var num = 0; num < wooshPool.length; num++) {
			if (!wooshPool[num].active) {
				aWoosh = wooshPool[num]; // reuse an old one
				if (DEBUG_WOOSHES) console.log("Reusing woosh " + num);
				break; // found one, don't need to look further
			}
		}
		if (!aWoosh) { // need to create a new one?
			aWoosh = new Woosh(wooshImage);
			wooshPool.push(aWoosh); // pool gets bigger
			if (DEBUG_WOOSHES) console.log("Creating new woosh " + (wooshPool.length-1));
		}
		// make it happen
		aWoosh.trigger(x, y, r, img, vx, vy, gravity, friction, frames);
	};

	this.draw = function () {
		for (var num = 0; num < wooshPool.length; num++) {
			if (wooshPool[num].active) {
				var aWoosh = wooshPool[num];
				aWoosh.draw();
			}
		}
	};
}


function Woosh(wooshImage) { // a single woosh, reused often

	this.active = false; // if true, manager reuses it
	this.img = wooshImage;
	this.frameCount = WOOSH_FRAMECOUNT; // length of animation 
	// size when full size
	this.w = 320; //wooshImage.width;
	this.h = 320; //wooshImage.height;
	// current state
	this.r = 0;
	this.x = 0;
	this.y = 0;
	this.frame = 0;
	this.vx = 0;
	this.vy = 0;
	this.friction = 0.9; // slowdown per frame
	this.gravity = 0;

	// you can change images
	this.trigger = function (x, y, r, img, vx=0, vy=0, gravity=0, friction=1, frames=WOOSH_FRAMECOUNT) {
		if (DEBUG_WOOSHES) console.log("Woosh pos:" + x + "," +  y + " ang:" + r);
		this.active = true;
		this.frame = 0;
		this.frameCount = frames;
		this.x = x;
		this.y = y;
		this.r = r;
		this.vx = vx;
		this.vy = vy;
		this.grav = gravity;
		this.friction = friction;
		if (img) this.img = img; // switching allowed
	};
    
	this.draw = function () {

		if (this.active) {

			// step
			this.frame++;
            
			// move
			this.vx *= this.friction;
			this.vy *= this.friction;
			this.vy += this.gravity;
			this.x += this.vx;
			this.y += this.vy;

			// draw
			canvasContext.save();
			canvasContext.translate(this.x, this.y);
			canvasContext.rotate(this.r);
			canvasContext.globalAlpha = MAX_ALPHA * (1 - (this.frame / this.frameCount)); // fade out
			canvasContext.drawImage(this.img, Math.round(-this.img.width/2),Math.round(-this.img.height/2)); //	center,	draw
			canvasContext.restore();

			// reuse
			this.active = this.frame < this.frameCount;

		}

	};

}

