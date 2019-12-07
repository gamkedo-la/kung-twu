// an object that falls to the floor and fades out
// used for the bodies of your defeated opponents


function knockedOutBodyManager() {
//	const DEBUG_BODIES = false; // console logs
	const DOMINO_KNOCKBACKS = true; // knockback other enemies, matrix-style
	const DOMINO_RANGE = 64; // pixels from spinning body to a conscious enemy
	const SPRX = 0; // sprite used is frame 2 of the kick animation
	const SPRW = 40;
	const SPRH = 69;
	const MAX_BODIES = 25; // oldest is overwritten
	const MAX_AGE = 100 * 17; // time in milliseconds until it disappears
	const SPINSPD = -12 * DEG_TO_RAD / 17; // degrees per millisecond
	const SPIN_RANDOMNESS = 15*DEG_TO_RAD;
	const FADE_OUT = true;
	const X_KICKBACK = -3; // starting velocities in px/frame
	const X_KICKBACK_RANDOMNESS = 2;
	const Y_KICKBACK = -5; // starts flying upward
	const Y_KICKBACK_RANDOMNESS = 3; 
	const BODYGRAV = 1 / 17; // accell downward per millisecond

	let playerCount = 0;
	
	//if (DEBUG_BODIES) console.log("Creating the knockedOutBodyManager...");

	// experimenting with data-oriented style just for fun - no objects! =)
	// these are "ring buffers" that never grow in size after hitting max
	let max = 0;
	const img = [];
	const scale = [];
	const xpos = [];
	const ypos = [];
	const xspd = [];
	const yspd = [];
	const age = [];
	const rotspd = [];

	// called by processDefeatedEntities()
	this.add = function (enemy, thisSprite = basicEnemyKick) {

		//if (DEBUG_BODIES) console.log("New knocked out body " + max);

		img[max] = thisSprite;
		img[max].isPlayer = (enemy === player);
		scale[max] = enemy.getScale();
		xpos[max] = enemy.getPosition().x;
		ypos[max] = enemy.getPosition().y;
		xspd[max] = (X_KICKBACK + (Math.random()*(X_KICKBACK*2)-X_KICKBACK_RANDOMNESS)) / 17;
		yspd[max] = (Y_KICKBACK + (Math.random()*(Y_KICKBACK*2)-Y_KICKBACK_RANDOMNESS)) / 17;
		rotspd[max] = (SPINSPD + (Math.random()*(SPIN_RANDOMNESS*2)-SPIN_RANDOMNESS)) / 17;
		age[max] = 0;

		if (!player.facingLeft()) xspd[max] *= -1;

		max++;
		if (max>MAX_BODIES) max = 0;
	};

	this.update = function(deltaTime) {
		for(let num = 0; num < max; num++) {
			age[num] += deltaTime;
			xpos[num] += xspd[num] * deltaTime;
			ypos[num] += yspd[num] * deltaTime;

			// gravity
			yspd[num] += BODYGRAV;

			if ((DOMINO_KNOCKBACKS) && (!img[num].isPlayer)) { // just for fun
				var enemies = SceneState.scenes[SCENE.GAME].getCurrentEnemyList();
				for (let i = 0; i < enemies.length; i++) {
					var dist = enemies[i].distanceFrom(xpos[num],ypos[num]);
					if (dist <= DOMINO_RANGE) {
						//if (DEBUG_BODIES) console.log('domino distance: ' + dist.toFixed(1));
						if (enemies[i].getBumped) enemies[i].getBumped({type:ENTITY_TYPE.Enemy},xspd[num],yspd[num]);
					}
				}                    
			} else if(img[num].isPlayer) {
				playerCount++;
				if(playerCount % 17 === 0) {
					playerCount = 0;
				}
			}
		}

		for(let num = max-1; num >= 0; num--) {
			if(ypos[num] > 900) {
				img.splice(num, 1);
				scale.splice(num, 1);
				xpos.splice(num, 1);
				ypos.splice(num, 1);
				xspd.splice(num, 1);
				yspd.splice(num, 1);
				age.splice(num, 1);
				rotspd.splice(num, 1);
				max--;
			}
		}		
	};

	this.draw = function () {
		for (var num = 0; num < max; num++) {
			
			if (age[num]<MAX_AGE) {
				canvasContext.save();
				canvasContext.translate(xpos[num], ypos[num]);

				canvasContext.rotate((xspd[num]>0?-1:1)*rotspd[num]*age[num]);
				if (FADE_OUT) canvasContext.globalAlpha = 1-(age[num]/MAX_AGE);
				canvasContext.drawImage(img[num],SPRX,0,SPRW - 2,SPRH,-SPRW/2,-SPRH/2,SPRW * scale[num],SPRH * scale[num]);
				canvasContext.restore();

				// little extra game over juice: if this is the player, spam particles
				if ((img[num].isPlayer) && (playerCount % 17 === 16)) { 
					wooshFX.smallPuff(xpos[num], ypos[num]);
					wooshFX.starPuff(xpos[num], ypos[num]);
				}
			}
		}
	};
}
