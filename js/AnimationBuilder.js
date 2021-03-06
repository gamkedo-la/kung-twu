// since attack animation frametimes are located on many different lines
// this is used to scale all player punch+kick delays as set below
// in order to quickly iterate on the player's attack speeds globally
const PLR_ATK_DELAYSCALE = 1.0; // multiplies delay, so 0.5=fast 1=normal 2=slow

// an attempt to reduce player perception of "input lag"
const PLR_WINDUP_DELAYSCALE = 0.2; // lower the delay between button press and attack (1st two frames only)
const PLR_COOLDOWN_DELAYSCALE = 1.5; // and raise the cooldown time to compensate (last 2 frames only)

const RIVAL_TYPE = {
	basic:"basic",
	tall:"tall",
	short:"short",
	player:"player",
	boss:"boss"
};

//Animation Builder
function AnimationBuilder() {
	this.getAnimationsFor = function(rivalType, belt, scale) {
		if(rivalType === RIVAL_TYPE.basic) {
			switch(belt) {
			case BELT.White: return getAnimationsWithData(basicWhiteBeltData, scale);
			case BELT.Yellow: return getAnimationsWithData(basicYellowBeltData, scale);
			case BELT.Tan: return getAnimationsWithData(basicTanBeltData, scale);
			case BELT.Brown: return getAnimationsWithData(basicBrownBeltData, scale);
			case BELT.Red: return getAnimationsWithData(basicRedBeltData, scale);
			case BELT.Black: return getAnimationsWithData(basicBlackBeltData, scale);
			}
		} else if(rivalType === RIVAL_TYPE.tall) {
			switch(belt) {
			case BELT.White:
			case BELT.Yellow:
			case BELT.Tan:
			case BELT.Brown:
			case BELT.Red:
			case BELT.Black:
			}
		} else if(rivalType === RIVAL_TYPE.short) {
			switch(belt) {
			case BELT.White:
			case BELT.Yellow:
			case BELT.Tan:
			case BELT.Brown:
			case BELT.Red:
			case BELT.Black:
			}
		} else if(rivalType === RIVAL_TYPE.player) {
			switch(belt) {
			case BELT.White: return getAnimationsWithData(playerWhiteBeltData, scale);
			case BELT.Yellow: return getAnimationsWithData(playerYellowBeltData, scale);
			case BELT.Tan: return getAnimationsWithData(playerTanBeltData, scale);
			case BELT.Brown: return getAnimationsWithData(playerBrownBeltData, scale);
			case BELT.Red: return getAnimationsWithData(playerRedBeltData, scale);
			case BELT.Black: return getAnimationsWithData(playerBlackBeltData, scale);
			}
		} else if(rivalType === RIVAL_TYPE.boss) {
			switch(belt) {
			case BELT.White: return getAnimationsWithData(basicWhiteBeltData, scale);
			case BELT.Yellow: return getAnimationsWithData(bossYellowBeltData, scale);
			case BELT.Tan: return getAnimationsWithData(bossTanBeltData, scale);
			case BELT.Brown: return getAnimationsWithData(bossBrownBeltData, scale);
			case BELT.Red: return getAnimationsWithData(bossRedBeltData, scale);
			case BELT.Black: return getAnimationsWithData(bossBlackBeltData, scale);
			}
		}
	};

	const getAnimationsWithData = function(data, scale) {
		const result = {};
		result.idle = getAnimationWithData(data.idle);
		if(result.idle === null) {
			//console.error("Idle animations are required for all characters");
		}

		result.walk = getAnimationWithData(data.walk);
		if(result.walk === null) {
			result.walk = getAnimationWithData(data.idle);
		}

		result.dash = getAnimationWithData(data.dash);
		if(result.dash === null) {
			result.dash = getAnimationWithData(data.idle);
		}

		result.jump = getAnimationWithData(data.jump);
		if(result.jump === null) {
			result.jump = getAnimationWithData(data.idle);
		}

		result.crouch = getAnimationWithData(data.crouch);
		if(result.crouch === null) {
			result.crouch = getAnimationWithData(data.idle);
		}

		result.punch = getAnimationWithData(data.punch);
		if(result.punch === null) {
			result.punch = getAnimationWithData(data.idle);
		}

		result.kick = getAnimationWithData(data.kick);
		if(result.kick === null) {
			result.kick = getAnimationWithData(data.idle);
		}

		result.block = getAnimationWithData(data.block);
		if(result.block === null) {
			result.block = getAnimationWithData(data.idle);
		}

		result.sweep = getAnimationWithData(data.sweep);
		if(result.sweep === null) {
			result.sweep = getAnimationWithData(data.idle);
		}

		result.j_kick = getAnimationWithData(data.j_kick);
		if(result.j_kick === null) {
			result.j_kick = getAnimationWithData(data.idle);
		}

		result.h_kick = getAnimationWithData(data.h_kick);
		if(result.h_kick === null) {
			result.h_kick = getAnimationWithData(data.idle);
		}

		result.knockback = getAnimationWithData(data.knockback);
		if(result.knockback === null) {
			result.knockback = getAnimationWithData(data.idle);
		}

		const animationKeys = Object.keys(result);
		for(let key of animationKeys) {
			if(result[key] === null) continue;

			result[key].scale = scale;
		}

		return result;
	};

	const getAnimationWithData = function(data) {
		if((data.name === undefined) || (data.name === null)) return null;
		return new SpriteAnimation(data.name, data.image, data.frames, data.width, data.height, data.frameTimes, data.reverses, data.loops, data.redImage);
	};

	const basicWhiteBeltData = {
		idle:{
			name:STATE.Idle,
			image:basicEnemyIdle,
			frames:[0, 1],
			width:basicEnemyIdle.width / 2,
			height:basicEnemyIdle.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		walk:{
			name:STATE.WalkRight,
			image:basicEnemyWalk,
			frames:[0, 1, 2],
			width:basicEnemyWalk.width / 3,
			height:basicEnemyWalk.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:basicEnemyDash,
			frames:[0, 1, 2],
			width:basicEnemyDash.width / 3,
			height:basicEnemyDash.height,
			frameTimes:[75],
			reverses:false,
			loops:false
		},
		jump:{
			name:STATE.Jump,
			image:basicEnemyJump,
			frames:[0],
			width:basicEnemyJump.width / 3,
			height:basicEnemyJump.height,
			frameTimes:[250],
			reverses:false,
			loops:false
		},
		crouch:{
			name:STATE.Crouch,
			image:basicEnemyCrouch,
			frames:[0],
			width:basicEnemyCrouch.width,
			height:basicEnemyCrouch.height,
			frameTimes:[200],
			reverses:false,
			loops:false
		},
		punch:{
			name:STATE.Punch,
			image:basicEnemyPunch,
			frames:[0, 1, 2, 2, 1],
			width:basicEnemyPunch.width / 3,
			height:basicEnemyPunch.height,
			frameTimes:[50, 350, 36, 225, 50],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:basicEnemyKick,
			frames:[0, 1, 2, 2, 1],
			width:basicEnemyKick.width / 3,
			height:basicEnemyKick.height,
			frameTimes:[50, 350, 36, 225, 50],
			reverses:false,
			loops:false
		},
		block:{
			name:STATE.Block,
			image:basicEnemyBlock,
			frames:[0],
			width:basicEnemyBlock.width,
			height:basicEnemyBlock.height,
			frameTimes:[200],
			reverses:false,
			loops:false
		},
		sweep:{
			name:STATE.Sweep,
			image:basicEnemySweep,
			frames:[0, 1],
			width:basicEnemySweep.width /2,
			height:basicEnemySweep.height,
			frameTimes:[225],
			reverses:false,
			loops:false
		},
		j_kick:{
			name:STATE.J_Kick,
			image:basicEnemyJumpKick,
			frames:[0, 1, 0],
			width:basicEnemyJumpKick.width / 2,
			height:basicEnemyJumpKick.height,
			frameTimes:[250, 150, 100],
			reverses:false,
			loops:false
		},
		h_kick:{
			name:STATE.H_Kick,
			image:basicEnemyHKick,
			frames:[0, 1, 0, 1],
			width:basicEnemyHKick.width / 2,
			height:basicEnemyHKick.height,
			frameTimes:[250, 250],
			reverses:false,
			loops:false
		},
		knockback:{
			name:STATE.KnockBack,
			image:basicEnemyKnockback,
			frames:[0],
			width:basicEnemyKnockback.width,
			height:basicEnemyKnockback.height,
			frameTimes:[625],
			reverses:false,
			loops:false
		}
	};

	const basicYellowBeltData = {
		idle:{
			name:STATE.Idle,
			image:yellowEnemyIdle,
			frames:[0, 1],
			width:yellowEnemyIdle.width / 2,
			height:yellowEnemyIdle.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		walk:{
			name:STATE.WalkRight,
			image:yellowEnemyWalk,
			frames:[0, 1, 2],
			width:yellowEnemyWalk.width / 3,
			height:yellowEnemyWalk.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:yellowEnemyDash,
			frames:[0, 1, 2],
			width:yellowEnemyDash.width / 3,
			height:yellowEnemyDash.height,
			frameTimes:[30, 300, 30],
			reverses:false,
			loops:false
		},
		jump:{
			name:STATE.Jump,
			image:yellowEnemyJump,
			frames:[0],
			width:yellowEnemyJump.width / 3,
			height:yellowEnemyJump.height,
			frameTimes:[250],
			reverses:false,
			loops:false
		},
		crouch:{
			name:STATE.Crouch,
			image:yellowEnemyCrouch,
			frames:[0],
			width:yellowEnemyCrouch.width,
			height:yellowEnemyCrouch.height,
			frameTimes:[200],
			reverses:false,
			loops:false
		},
		punch:{
			name:STATE.Punch,
			image:yellowEnemyPunch,
			frames:[0, 1, 2, 2, 1],
			width:yellowEnemyPunch.width / 3,
			height:yellowEnemyPunch.height,
			frameTimes:[50, 300, 36, 225, 50],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:yellowEnemyKick,
			frames:[0, 1, 2, 2, 1],
			width:yellowEnemyKick.width / 3,
			height:yellowEnemyKick.height,
			frameTimes:[50, 300, 36, 225, 50],
			reverses:false,
			loops:false
		},
		block:{
			name:STATE.Block,
			image:yellowEnemyBlock,
			frames:[0],
			width:yellowEnemyBlock.width,
			height:yellowEnemyBlock.height,
			frameTimes:[200],
			reverses:false,
			loops:false
		},
		sweep:{
			name:STATE.Sweep,
			image:yellowEnemySweep,
			frames:[0, 1],
			width:basicEnemySweep.width /2,
			height:basicEnemySweep.height,
			frameTimes:[225],
			reverses:false,
			loops:false
		},
		j_kick:{
			name:STATE.J_Kick,
			image:yellowEnemyJumpKick,
			frames:[0, 1, 0],
			width:yellowEnemyJumpKick.width / 2,
			height:yellowEnemyJumpKick.height,
			frameTimes:[250, 150, 100],
			reverses:false,
			loops:false
		},
		h_kick:{
			name:STATE.H_Kick,
			image:yellowEnemyHKick,
			frames:[0, 1, 0, 1],
			width:yellowEnemyHKick.width / 2,
			height:yellowEnemyHKick.height,
			frameTimes:[250, 250],
			reverses:false,
			loops:false
		},
		knockback:{
			name:STATE.KnockBack,
			image:yellowEnemyKnockback,
			frames:[0],
			width:yellowEnemyKnockback.width,
			height:yellowEnemyKnockback.height,
			frameTimes:[625],
			reverses:false,
			loops:false
		}
	};

	const basicTanBeltData = {
		idle:{
			name:STATE.Idle,
			image:tanEnemyIdle,
			frames:[0, 1],
			width:tanEnemyIdle.width / 2,
			height:tanEnemyIdle.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		walk:{
			name:STATE.WalkRight,
			image:tanEnemyWalk,
			frames:[0, 1, 2],
			width:tanEnemyWalk.width / 3,
			height:tanEnemyWalk.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:tanEnemyDash,
			frames:[0, 1, 2],
			width:tanEnemyDash.width / 3,
			height:tanEnemyDash.height,
			frameTimes:[30, 300, 30],
			reverses:false,
			loops:false
		},
		jump:{
			name:STATE.Jump,
			image:tanEnemyJump,
			frames:[0],
			width:tanEnemyJump.width / 3,
			height:tanEnemyJump.height,
			frameTimes:[250],
			reverses:false,
			loops:false
		},
		crouch:{
			name:STATE.Crouch,
			image:tanEnemyCrouch,
			frames:[0],
			width:tanEnemyCrouch.width,
			height:tanEnemyCrouch.height,
			frameTimes:[200],
			reverses:false,
			loops:false
		},
		punch:{
			name:STATE.Punch,
			image:tanEnemyPunch,
			frames:[0, 1, 2, 2, 1],
			width:tanEnemyPunch.width / 3,
			height:tanEnemyPunch.height,
			frameTimes:[50, 250, 36, 225, 50],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:tanEnemyKick,
			frames:[0, 1, 2, 2, 1],
			width:tanEnemyKick.width / 3,
			height:tanEnemyKick.height,
			frameTimes:[50, 250, 36, 225, 50],
			reverses:false,
			loops:false
		},
		block:{
			name:STATE.Block,
			image:tanEnemyBlock,
			frames:[0],
			width:tanEnemyBlock.width,
			height:tanEnemyBlock.height,
			frameTimes:[200],
			reverses:false,
			loops:false
		},
		sweep:{
			name:STATE.Sweep,
			image:tanEnemySweep,
			frames:[0, 1],
			width:basicEnemySweep.width /2,
			height:basicEnemySweep.height,
			frameTimes:[225],
			reverses:false,
			loops:false
		},
		j_kick:{
			name:STATE.J_Kick,
			image:tanEnemyJumpKick,
			frames:[0, 1, 0],
			width:tanEnemyJumpKick.width / 2,
			height:tanEnemyJumpKick.height,
			frameTimes:[250, 150, 100],
			reverses:false,
			loops:false
		},
		h_kick:{
			name:STATE.H_Kick,
			image:tanEnemyHKick,
			frames:[0, 1, 0, 1],
			width:tanEnemyHKick.width / 2,
			height:tanEnemyHKick.height,
			frameTimes:[250, 250],
			reverses:false,
			loops:false
		},
		knockback:{
			name:STATE.KnockBack,
			image:tanEnemyKnockback,
			frames:[0],
			width:tanEnemyKnockback.width,
			height:tanEnemyKnockback.height,
			frameTimes:[625],
			reverses:false,
			loops:false
		}
	};

	const basicBrownBeltData = {
		idle:{
			name:STATE.Idle,
			image:brownEnemyIdle,
			frames:[0, 1],
			width:brownEnemyIdle.width / 2,
			height:brownEnemyIdle.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		walk:{
			name:STATE.WalkRight,
			image:brownEnemyWalk,
			frames:[0, 1, 2],
			width:brownEnemyWalk.width / 3,
			height:brownEnemyWalk.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:brownEnemyDash,
			frames:[0, 1, 2],
			width:brownEnemyDash.width / 3,
			height:brownEnemyDash.height,
			frameTimes:[30, 300, 30],
			reverses:false,
			loops:false
		},
		jump:{
			name:STATE.Jump,
			image:brownEnemyJump,
			frames:[0],
			width:brownEnemyJump.width / 3,
			height:brownEnemyJump.height,
			frameTimes:[250],
			reverses:false,
			loops:false
		},
		crouch:{
			name:STATE.Crouch,
			image:brownEnemyCrouch,
			frames:[0],
			width:brownEnemyCrouch.width,
			height:brownEnemyCrouch.height,
			frameTimes:[200],
			reverses:false,
			loops:false
		},
		punch:{
			name:STATE.Punch,
			image:brownEnemyPunch,
			frames:[0, 1, 2, 2, 1],
			width:brownEnemyPunch.width / 3,
			height:brownEnemyPunch.height,
			frameTimes:[50, 200, 36, 225, 50],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:brownEnemyKick,
			frames:[0, 1, 2, 2, 1],
			width:brownEnemyKick.width / 3,
			height:brownEnemyKick.height,
			frameTimes:[50, 200, 36, 225, 50],
			reverses:false,
			loops:false
		},
		block:{
			name:STATE.Block,
			image:brownEnemyBlock,
			frames:[0],
			width:brownEnemyBlock.width,
			height:brownEnemyBlock.height,
			frameTimes:[200],
			reverses:false,
			loops:false
		},
		sweep:{
			name:STATE.Sweep,
			image:brownEnemySweep,
			frames:[0, 1],
			width:basicEnemySweep.width /2,
			height:basicEnemySweep.height,
			frameTimes:[225],
			reverses:false,
			loops:false
		},
		j_kick:{
			name:STATE.J_Kick,
			image:brownEnemyJumpKick,
			frames:[0, 1, 1, 0],
			width:brownEnemyJumpKick.width / 2,
			height:brownEnemyJumpKick.height,
			frameTimes:[300, 36, 150, 100],
			reverses:false,
			loops:false
		},
		h_kick:{
			name:STATE.H_Kick,
			image:brownEnemyHKick,
			frames:[0, 1, 0, 1],
			width:brownEnemyHKick.width / 2,
			height:brownEnemyHKick.height,
			frameTimes:[250, 250],
			reverses:false,
			loops:false
		},
		knockback:{
			name:STATE.KnockBack,
			image:brownEnemyKnockback,
			frames:[0],
			width:brownEnemyKnockback.width,
			height:brownEnemyKnockback.height,
			frameTimes:[625],
			reverses:false,
			loops:false
		}
	};

	const basicRedBeltData = {
		idle:{
			name:STATE.Idle,
			image:redEnemyIdle,
			frames:[0, 1],
			width:redEnemyIdle.width / 2,
			height:redEnemyIdle.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		walk:{
			name:STATE.WalkRight,
			image:redEnemyWalk,
			frames:[0, 1, 2],
			width:redEnemyWalk.width / 3,
			height:redEnemyWalk.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:redEnemyDash,
			frames:[0, 1, 2],
			width:redEnemyDash.width / 3,
			height:redEnemyDash.height,
			frameTimes:[30, 300, 30],
			reverses:false,
			loops:false
		},
		jump:{
			name:STATE.Jump,
			image:redEnemyJump,
			frames:[0],
			width:redEnemyJump.width / 3,
			height:redEnemyJump.height,
			frameTimes:[250],
			reverses:false,
			loops:false
		},
		crouch:{
			name:STATE.Crouch,
			image:redEnemyCrouch,
			frames:[0],
			width:redEnemyCrouch.width,
			height:redEnemyCrouch.height,
			frameTimes:[200],
			reverses:false,
			loops:false
		},
		punch:{
			name:STATE.Punch,
			image:redEnemyPunch,
			frames:[0, 1, 2, 2, 1],
			width:redEnemyPunch.width / 3,
			height:redEnemyPunch.height,
			frameTimes:[50, 175, 36, 225, 50],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:redEnemyKick,
			frames:[0, 1, 2, 2, 1],
			width:redEnemyKick.width / 3,
			height:redEnemyKick.height,
			frameTimes:[50, 175, 36, 225, 50],
			reverses:false,
			loops:false
		},
		block:{
			name:STATE.Block,
			image:redEnemyBlock,
			frames:[0],
			width:redEnemyBlock.width,
			height:redEnemyBlock.height,
			frameTimes:[200],
			reverses:false,
			loops:false
		},
		sweep:{
			name:STATE.Sweep,
			image:redEnemySweep,
			frames:[0, 1],
			width:basicEnemySweep.width /2,
			height:basicEnemySweep.height,
			frameTimes:[225],
			reverses:false,
			loops:false
		},
		j_kick:{
			name:STATE.J_Kick,
			image:redEnemyJumpKick,
			frames:[0, 1, 1, 0],
			width:redEnemyJumpKick.width / 2,
			height:redEnemyJumpKick.height,
			frameTimes:[250, 36, 150, 100],
			reverses:false,
			loops:false
		},
		h_kick:{
			name:STATE.H_Kick,
			image:redEnemyHKick,
			frames:[0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
			width:redEnemyHKick.width / 2,
			height:redEnemyHKick.height,
			frameTimes:[125, 125, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75],
			reverses:false,
			loops:false
		},
		knockback:{
			name:STATE.KnockBack,
			image:redEnemyKnockback,
			frames:[0],
			width:redEnemyKnockback.width,
			height:redEnemyKnockback.height,
			frameTimes:[625],
			reverses:false,
			loops:false
		}
	};

	const basicBlackBeltData = {
		idle:{
			name:STATE.Idle,
			image:basicEnemyIdle,//blackEnemyIdle,
			frames:[0, 1],
			width:basicEnemyIdle.width/2,//blackEnemyIdle.width / 2,
			height:basicEnemyIdle.height,//blackEnemyIdle.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		walk:{
			name:STATE.WalkRight,
			image:basicEnemyWalk,//blackEnemyWalk,
			frames:[0, 1, 2],
			width:basicEnemyWalk.width/3,//blackEnemyWalk.width / 3,
			height:basicEnemyWalk.height,//blackEnemyWalk.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:basicEnemyDash,
			frames:[0, 1, 2],
			width:basicEnemyDash.width / 3,
			height:basicEnemyDash.height,
			frameTimes:[30, 300, 30],
			reverses:false,
			loops:false
		},
		jump:{
			name:STATE.Jump,
			image:basicEnemyJump,
			frames:[0],
			width:basicEnemyJump.width / 3,
			height:basicEnemyJump.height,
			frameTimes:[250],
			reverses:false,
			loops:false
		},
		crouch:{
			name:STATE.Crouch,
			image:basicEnemyCrouch,
			frames:[0],
			width:basicEnemyCrouch.width,
			height:69,
			frameTimes:[200],
			reverses:false,
			loops:false
		},
		punch:{
			name:STATE.Punch,
			image:basicEnemyPunch,//blackEnemyPunch,
			frames:[0, 1, 2, 2, 1],
			width:basicEnemyPunch.width/3,//blackEnemyPunch.width / 3,
			height:basicEnemyPunch.height,//blackEnemyPunch.height,
			frameTimes:[50, 150, 36, 225, 50],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:basicEnemyKick,//blackEnemyKick,
			frames:[0, 1, 2, 2, 1],
			width:basicEnemyKick.width/3,//blackEnemyKick.width / 3,
			height:basicEnemyKick.height,//blackEnemyKick.height,
			frameTimes:[50, 150, 36, 225, 50],
			reverses:false,
			loops:false
		},
		block:{
			name:STATE.Block,
			image:basicEnemyBlock,
			frames:[0],
			width:basicEnemyBlock.width,
			height:basicEnemyBlock.height,
			frameTimes:[200],
			reverses:false,
			loops:false
		},
		sweep:{
			name:STATE.Sweep,
			image:basicEnemySweep,
			frames:[0, 1],
			width:basicEnemySweep.width,
			height:basicEnemySweep.height,
			frameTimes:[225],
			reverses:false,
			loops:false
		},
		j_kick:{
			name:STATE.J_Kick,
			image:basicEnemyJumpKick,
			frames:[0, 1, 1, 0],
			width:basicEnemyJumpKick.width / 2,
			height:basicEnemyJumpKick.height,
			frameTimes:[200, 36, 150, 100],
			reverses:false,
			loops:false
		},
		h_kick:{
			name:STATE.H_Kick,
			image:basicEnemyHKick,
			frames:[0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
			width:basicEnemyHKick.width / 2,
			height:basicEnemyHKick.height,
			frameTimes:[125, 125, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75],
			reverses:false,
			loops:false
		},
		knockback:{
			name:STATE.KnockBack,
			image:basicEnemyKnockback,
			frames:[0],
			width:basicEnemyKnockback.width,
			height:basicEnemyKnockback.height,
			frameTimes:[625],
			reverses:false,
			loops:false
		}
	};

	const playerWhiteBeltData = {
		idle:{
			name:STATE.Idle,
			image:playerIdleWhite,
			redImage:redPlayerIdleWhite,
			frames:[0, 1],
			width:playerIdleWhite.width / 2,
			height:playerIdleWhite.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		walk:{
			name:STATE.WalkRight,
			image:playerWalkWhite,
			redImage:redPlayerWalkWhite,
			frames:[0, 1, 2],
			width:playerWalkWhite.width / 3,
			height:playerWalkWhite.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:playerWalkWhite,
			redImage:redPlayerWalkWhite,
			frames:[0, 1, 2],
			width:playerWalkWhite.width / 3,
			height:playerWalkWhite.height,
			frameTimes:[75],
			reverses:false,
			loops:false
		},
		jump:{
			name:STATE.Jump,
			image:playerJumpWhite,
			redImage:redPlayerJumpWhite,
			frames:[0, 1, 2, 3, 4, 5, 6],
			width:playerJumpWhite.width / 7,
			height:playerJumpWhite.height,
			frameTimes:[16, 175, 200, 150, 150, 250, 16],
			reverses:false,
			loops:false
		},
		crouch:{
			name:STATE.Crouch,
			image:playerCrouchWhite,
			redImage:redPlayerCrouchWhite,
			frames:[0],
			width:playerCrouchWhite.width,
			height:playerCrouchWhite.height,
			frameTimes:[275],
			reverses:false,
			loops:false
		},
		punch:{
			name:STATE.Punch,
			image:playerPunchWhite,
			redImage:redPlayerPunchWhite,
			frames:[0, 1, 2, 1],
			width:playerPunchWhite.width / 3,
			height:playerPunchWhite.height,
			frameTimes:[30*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 150*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 150*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 30*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:playerKickWhite,
			redImage:redPlayerKickWhite,
			frames:[0, 1, 2, 1],
			width:playerKickWhite.width / 3,
			height:playerKickWhite.height,
			frameTimes:[30*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 150*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 150*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 30*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		block:{
			name:STATE.Block,
			image:playerBlockWhite,
			redImage:redPlayerBlockWhite,
			frames:[0],
			width:playerBlockWhite.width,
			height:playerBlockWhite.height,
			frameTimes:[275],
			reverses:false,
			loops:false
		},
		sweep:{
			name:STATE.Sweep,
			image:playerSweepWhite,
			redImage:redPlayerSweepWhite,
			frames:[0, 1, 2, 3, 4, 5, 6],
			width:playerSweepWhite.width / 7,
			height:playerSweepWhite.height,
			frameTimes:[100],
			reverses:false,
			loops:false
		},
		j_kick:{
			name:STATE.J_Kick,
			image:playerJ_KickWhite,
			redImage:redPlayerJ_KickWhite,
			frames:[0, 1, 0],
			width:playerJ_KickWhite.width / 2,
			height:playerJ_KickWhite.height,
			frameTimes:[160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		h_kick:{
			name:STATE.H_Kick,
			image:playerH_KickWhite,
			redImage:redPlayerH_KickWhite,
			frames:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			width:playerH_KickWhite.width / 10,
			height:playerH_KickWhite.height,
			frameTimes:[160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		knockback:{
			name:STATE.KnockBack,
			image:playerKnockbackWhite,
			redImage:redPlayerKnockbackWhite,
			frames:[0, 1, 2, 3],
			width:playerKnockbackWhite.width / 4,
			height:playerKnockbackWhite.height,
			frameTimes:[100,100,100,100],
			reverses:false,
			loops:false
		}
	};

	const playerYellowBeltData = {
		idle:{
			name:STATE.Idle,
			image:playerIdleYellow,
			redImage:redPlayerIdleYellow,
			frames:[0, 1],
			width:playerIdleYellow.width / 2,
			height:playerIdleYellow.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		walk:{
			name:STATE.WalkRight,
			image:playerWalkYellow,
			redImage:redPlayerWalkYellow,
			frames:[0, 1, 2],
			width:playerWalkYellow.width / 3,
			height:playerWalkYellow.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:playerWalkYellow,
			redImage:redPlayerWalkYellow,
			frames:[0, 1, 2],
			width:playerWalkYellow.width / 3,
			height:playerWalkYellow.height,
			frameTimes:[75],
			reverses:false,
			loops:false
		},
		jump:{
			name:STATE.Jump,
			image:playerJumpYellow,
			redImage:redPlayerJumpYellow,
			frames:[0, 1, 2, 3, 4, 5, 6],
			width:playerJumpYellow.width / 7,
			height:playerJumpYellow.height,
			frameTimes:[16, 175, 200, 150, 150, 250, 16],
			reverses:false,
			loops:false
		},
		crouch:{
			name:STATE.Crouch,
			image:playerCrouchYellow,
			redImage:redPlayerCrouchYellow,
			frames:[0],
			width:playerCrouchYellow.width,
			height:playerCrouchYellow.height,
			frameTimes:[275],
			reverses:false,
			loops:false
		},
		punch:{
			name:STATE.Punch,
			image:playerPunchYellow,
			redImage:redPlayerPunchYellow,
			frames:[0, 1, 2, 1],
			width:playerPunchYellow.width / 3,
			height:playerPunchYellow.height,
			frameTimes:[30*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 130*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 130*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 30*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:playerKickYellow,
			redImage:redPlayerKickYellow,
			frames:[0, 1, 2, 1],
			width:playerKickYellow.width / 3,
			height:playerKickYellow.height,
			frameTimes:[60*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 170*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 140*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 60*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		block:{
			name:STATE.Block,
			image:playerBlockYellow,
			redImage:redPlayerBlockYellow,
			frames:[0],
			width:playerBlockYellow.width,
			height:playerBlockYellow.height,
			frameTimes:[275],
			reverses:false,
			loops:false
		},
		sweep:{
			name:STATE.Sweep,
			image:playerSweepYellow,
			redImage:redPlayerSweepYellow,
			frames:[0, 1, 2, 3, 4, 5, 6],
			width:playerSweepYellow.width / 7,
			height:playerSweepYellow.height,
			frameTimes:[100],
			reverses:false,
			loops:false
		},
		j_kick:{
			name:STATE.J_Kick,
			image:playerJ_KickYellow,
			redImage:redPlayerJ_KickYellow,
			frames:[0, 1, 0],
			width:playerJ_KickYellow.width / 2,
			height:playerJ_KickYellow.height,
			frameTimes:[160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		h_kick:{
			name:STATE.H_Kick,
			image:playerH_KickYellow,
			redImage:redPlayerH_KickYellow,
			frames:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			width:playerH_KickYellow.width / 10,
			height:playerH_KickYellow.height,
			frameTimes:[160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		knockback:{
			name:STATE.KnockBack,
			image:playerKnockbackYellow,
			redImage:redPlayerKnockbackYellow,
			frames:[0, 1, 2, 3],
			width:playerKnockbackYellow.width / 4,
			height:playerKnockbackYellow.height,
			frameTimes:[60,60,60,60],
			reverses:false,
			loops:false
		}
	};

	const playerTanBeltData = {
		idle:{
			name:STATE.Idle,
			image:playerIdleTan,
			redImage:redPlayerIdleTan,
			frames:[0, 1],
			width:playerIdleTan.width / 2,
			height:playerIdleTan.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		walk:{
			name:STATE.WalkRight,
			image:playerWalkTan,
			redImage:redPlayerWalkTan,
			frames:[0, 1, 2],
			width:playerWalkTan.width / 3,
			height:playerWalkTan.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:playerWalkTan,
			redImage:redPlayerWalkTan,
			frames:[0, 1, 2],
			width:playerWalkTan.width / 3,
			height:playerWalkTan.height,
			frameTimes:[75],
			reverses:false,
			loops:false
		},
		jump:{
			name:STATE.Jump,
			image:playerJumpTan,
			redImage:redPlayerJumpTan,
			frames:[0, 1, 2, 3, 4, 5, 6],
			width:playerJumpTan.width / 7,
			height:playerJumpTan.height,
			frameTimes:[16, 175, 200, 150, 150, 250, 16],
			reverses:false,
			loops:false
		},
		crouch:{
			name:STATE.Crouch,
			image:playerCrouchTan,
			redImage:redPlayerCrouchTan,
			frames:[0],
			width:playerCrouchTan.width,
			height:playerCrouchTan.height,
			frameTimes:[275],
			reverses:false,
			loops:false
		},
		punch:{
			name:STATE.Punch,
			image:playerPunchTan,
			redImage:redPlayerPunchTan,
			frames:[0, 1, 2, 1],
			width:playerPunchTan.width / 3,
			height:playerPunchTan.height,
			frameTimes:[30*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 110*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 110*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 30*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:playerKickTan,
			redImage:redPlayerKickTan,
			frames:[0, 1, 2, 1],
			width:playerKickTan.width / 3,
			height:playerKickTan.height,
			frameTimes:[60*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 150*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 130*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 60*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		block:{
			name:STATE.Block,
			image:playerBlockTan,
			redImage:redPlayerBlockTan,
			frames:[0],
			width:playerBlockTan.width,
			height:playerBlockTan.height,
			frameTimes:[275],
			reverses:false,
			loops:false
		},
		sweep:{
			name:STATE.Sweep,
			image:playerSweepTan,
			redImage:redPlayerSweepTan,
			frames:[0, 1, 2, 3, 4, 5, 6],
			width:playerSweepTan.width / 7,
			height:playerSweepTan.height,
			frameTimes:[100],
			reverses:false,
			loops:false
		},
		j_kick:{
			name:STATE.J_Kick,
			image:playerJ_KickTan,
			redImage:redPlayerJ_KickTan,
			frames:[0, 1, 0],
			width:playerJ_KickTan.width / 2,
			height:playerJ_KickTan.height,
			frameTimes:[160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		h_kick:{
			name:STATE.H_Kick,
			image:playerH_KickTan,
			redImage:redPlayerH_KickTan,
			frames:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			width:playerH_KickTan.width / 10,
			height:playerH_KickTan.height,
			frameTimes:[160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		knockback:{
			name:STATE.KnockBack,
			image:playerKnockbackTan,
			redImage:redPlayerKnockbackTan,
			frames:[0, 1, 2, 3],
			width:playerKnockbackTan.width / 4,
			height:playerKnockbackTan.height,
			frameTimes:[60,60,60,60],
			reverses:false,
			loops:false
		}
	};

	const playerBrownBeltData = {
		idle:{
			name:STATE.Idle,
			image:playerIdleBrown,
			redImage:redPlayerIdleBrown,
			frames:[0, 1],
			width:playerIdleBrown.width / 2,
			height:playerIdleBrown.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		walk:{
			name:STATE.WalkRight,
			image:playerWalkBrown,
			redImage:redPlayerWalkBrown,
			frames:[0, 1, 2],
			width:playerWalkBrown.width / 3,
			height:playerWalkBrown.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:playerWalkBrown,
			redImage:redPlayerWalkBrown,
			frames:[0, 1, 2],
			width:playerWalkBrown.width / 3,
			height:playerWalkBrown.height,
			frameTimes:[75],
			reverses:false,
			loops:false
		},
		jump:{
			name:STATE.Jump,
			image:playerJumpBrown,
			redImage:redPlayerJumpBrown,
			frames:[0, 1, 2, 3, 4, 5, 6],
			width:playerJumpBrown.width / 7,
			height:playerJumpBrown.height,
			frameTimes:[16, 175, 200, 150, 150, 250, 16],
			reverses:false,
			loops:false
		},
		crouch:{
			name:STATE.Crouch,
			image:playerCrouchBrown,
			frames:[0],
			width:playerCrouchBrown.width,
			height:playerCrouchBrown.height,
			frameTimes:[275],
			reverses:false,
			loops:false
		},
		punch:{
			name:STATE.Punch,
			image:playerPunchBrown,
			redImage:redPlayerPunchBrown,
			frames:[0, 1, 2, 1],
			width:playerPunchBrown.width / 3,
			height:playerPunchBrown.height,
			frameTimes:[30*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 90*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 30*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:playerKickBrown,
			redImage:redPlayerKickBrown,
			frames:[0, 1, 2, 1],
			width:playerKickBrown.width / 3,
			height:playerKickBrown.height,
			frameTimes:[60*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 120*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 120*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 60*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		block:{
			name:STATE.Block,
			image:playerBlockBrown,
			redImage:redPlayerBlockBrown,
			frames:[0],
			width:playerBlockBrown.width,
			height:playerBlockBrown.height,
			frameTimes:[275],
			reverses:false,
			loops:false
		},
		sweep:{
			name:STATE.Sweep,
			image:playerSweepBrown,
			redImage:redPlayerSweepBrown,
			frames:[0, 1, 2, 3, 4, 5, 6],
			width:playerSweepBrown.width / 7,
			height:playerSweepBrown.height,
			frameTimes:[100],
			reverses:false,
			loops:false
		},
		j_kick:{
			name:STATE.J_Kick,
			image:playerJ_KickBrown,
			redImage:redPlayerJ_KickBrown,
			frames:[0, 1, 0],
			width:playerJ_KickBrown.width / 2,
			height:playerJ_KickBrown.height,
			frameTimes:[200*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		h_kick:{
			name:STATE.H_Kick,
			image:playerH_KickBrown,
			redImage:redPlayerH_KickBrown,
			frames:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			width:playerH_KickBrown.width / 10,
			height:playerH_KickBrown.height,
			frameTimes:[160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		knockback:{
			name:STATE.KnockBack,
			image:playerKnockbackBrown,
			redImage:redPlayerKnockbackBrown,
			frames:[0, 1, 2, 3],
			width:playerKnockbackBrown.width / 4,
			height:playerKnockbackBrown.height,
			frameTimes:[60,60,60,60],
			reverses:false,
			loops:false
		}
	};

	const playerRedBeltData = {
		idle:{
			name:STATE.Idle,
			image:playerIdleRed,
			redImage:redPlayerIdleRed,
			frames:[0, 1],
			width:playerIdleRed.width / 2,
			height:playerIdleRed.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		walk:{
			name:STATE.WalkRight,
			image:playerWalkRed,
			redImage:redPlayerWalkRed,
			frames:[0, 1, 2],
			width:playerWalkRed.width / 3,
			height:playerWalkRed.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:playerWalkRed,
			redImage:redPlayerWalkRed,
			frames:[0, 1, 2],
			width:playerWalkRed.width / 3,
			height:playerWalkRed.height,
			frameTimes:[75],
			reverses:false,
			loops:false
		},
		jump:{
			name:STATE.Jump,
			image:playerJumpRed,
			redImage:redPlayerJumpRed,
			frames:[0, 1, 2, 3, 4, 5, 6],
			width:playerJumpRed.width / 7,
			height:playerJumpRed.height,
			frameTimes:[16, 175, 200, 150, 150, 250, 16],
			reverses:false,
			loops:false
		},
		crouch:{
			name:STATE.Crouch,
			image:playerCrouchRed,
			redImage:redPlayerCrouchRed,
			frames:[0],
			width:playerCrouchRed.width,
			height:playerCrouchRed.height,
			frameTimes:[275],
			reverses:false,
			loops:false
		},
		punch:{
			name:STATE.Punch,
			image:playerPunchRed,
			redImage:redPlayerPunchRed,
			frames:[0, 1, 2, 1],
			width:playerPunchRed.width / 3,
			height:playerPunchRed.height,
			frameTimes:[30*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 70*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 90*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 30*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:playerKickRed,
			redImage:redPlayerKickRed,
			frames:[0, 1, 2, 1],
			width:playerKickRed.width / 3,
			height:playerKickRed.height,
			frameTimes:[60*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 110*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 60*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		block:{
			name:STATE.Block,
			image:playerBlockRed,
			redImage:redPlayerBlockRed,
			frames:[0],
			width:playerBlockRed.width,
			height:playerBlockRed.height,
			frameTimes:[275],
			reverses:false,
			loops:false
		},
		sweep:{
			name:STATE.Sweep,
			image:playerSweepRed,
			redImage:redPlayerSweepRed,
			frames:[0, 1, 2, 3, 4, 5, 6],
			width:playerSweepRed.width / 7,
			height:playerSweepRed.height,
			frameTimes:[100],
			reverses:false,
			loops:false
		},
		j_kick:{
			name:STATE.J_Kick,
			image:playerJ_KickRed,
			redImage:redPlayerJ_KickRed,
			frames:[0, 1, 0],
			width:playerJ_KickRed.width / 2,
			height:playerJ_KickRed.height,
			frameTimes:[180*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		h_kick:{
			name:STATE.H_Kick,
			image:playerH_KickRed,
			redImage:redPlayerH_KickRed,
			frames:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			width:playerH_KickRed.width / 10,
			height:playerH_KickRed.height,
			frameTimes:[160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		knockback:{
			name:STATE.KnockBack,
			image:playerKnockbackRed,
			redImage:redPlayerKnockbackRed,
			frames:[0, 1, 2, 3],
			width:playerKnockbackRed.width / 4,
			height:playerKnockbackRed.height,
			frameTimes:[60,60,60,60],
			reverses:false,
			loops:false
		}
	};

	const playerBlackBeltData = {
		idle:{
			name:STATE.Idle,
			image:playerIdleBlack,
			redImage:redPlayerIdleBlack,
			frames:[0, 1],
			width:playerIdleBlack.width / 2,
			height:playerIdleBlack.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		walk:{
			name:STATE.WalkRight,
			image:playerWalkBlack,
			redImage:redPlayerWalkBlack,
			frames:[0, 1, 2],
			width:playerWalkBlack.width / 3,
			height:playerWalkBlack.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:playerWalkBlack,
			redImage:redPlayerWalkBlack,
			frames:[0, 1, 2],
			width:playerWalkBlack.width / 3,
			height:playerWalkBlack.height,
			frameTimes:[75],
			reverses:false,
			loops:false
		},
		jump:{
			name:STATE.Jump,
			image:playerJumpBlack,
			redImage:redPlayerJumpBlack,
			frames:[0, 1, 2, 3, 4, 5, 6],
			width:playerJumpBlack.width / 7,
			height:playerJumpBlack.height,
			frameTimes:[16, 175, 200, 150, 150, 250, 16],
			reverses:false,
			loops:false
		},
		crouch:{
			name:STATE.Crouch,
			image:playerCrouchBlack,
			redImage:redPlayerCrouchBlack,
			frames:[0],
			width:playerCrouchBlack.width,
			height:playerCrouchBlack.height,
			frameTimes:[275],
			reverses:false,
			loops:false
		},
		punch:{
			name:STATE.Punch,
			image:playerPunchBlack,
			redImage:redPlayerPunchBlack,
			frames:[0, 1, 2, 1],
			width:playerPunchBlack.width / 3,
			height:playerPunchBlack.height,
			frameTimes:[30*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 50*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 80*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 30*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:playerKickBlack,
			redImage:redPlayerKickBlack,
			frames:[0, 1, 2, 1],
			width:playerKickBlack.width / 3,
			height:playerKickBlack.height,
			frameTimes:[60*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 90*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 90*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 60*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		block:{
			name:STATE.Block,
			image:playerBlockBlack,
			redImage:redPlayerBlockBlack,
			frames:[0],
			width:playerBlockBlack.width,
			height:playerBlockBlack.height,
			frameTimes:[275],
			reverses:false,
			loops:false
		},
		sweep:{
			name:STATE.Sweep,
			image:playerSweepBlack,
			redImage:redPlayerSweepBlack,
			frames:[0, 1, 2, 3, 4, 5, 6],
			width:playerSweepBlack.width / 7,
			height:playerSweepBlack.height,
			frameTimes:[100],
			reverses:false,
			loops:false
		},
		j_kick:{
			name:STATE.J_Kick,
			image:playerJ_KickBlack,
			redImage:redPlayerJ_KickBlack,
			frames:[0, 1, 0],
			width:playerJ_KickBlack.width / 2,
			height:playerJ_KickBlack.height,
			frameTimes:[160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		h_kick:{
			name:STATE.H_Kick,
			image:playerH_KickBlack,
			redImage:redPlayerH_KickBlack,
			frames:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			width:playerH_KickBlack.width / 10,
			height:playerH_KickBlack.height,
			frameTimes:[160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		knockback:{
			name:STATE.KnockBack,
			image:playerKnockbackBlack,
			redImage:redPlayerKnockbackBlack,
			frames:[0, 1, 2, 3],
			width:playerKnockbackBlack.width / 4,
			height:playerKnockbackBlack.height,
			frameTimes:[60,60,60,60],
			reverses:false,
			loops:false
		}
	};

	const bossYellowBeltData = {
		idle:{
			name:STATE.Idle,
			image:yellowBossIdle,
			redImage:redYellowBossIdle,
			frames:[0, 1, 2, 3, 4, 5, 6, 7],
			width:yellowBossIdle.width / 8,
			height:yellowBossIdle.height,
			frameTimes:[150],
			reverses:false,
			loops:true
		},
		walk:{
			name:STATE.WalkRight,
			image:yellowBossWalk,
			redImage:redYellowBossWalk,
			frames:[0, 1, 2, 3],
			width:yellowBossWalk.width / 4,
			height:yellowBossWalk.height,
			frameTimes:[150],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:yellowBossDash,
			redImage:redYellowBossDash,
			frames:[0],
			width:yellowBossDash.width,
			height:yellowBossDash.height,
			frameTimes:[150],
			reverses:false,
			loops:false
		},
		crouch:{
			name:STATE.Crouch,
			image:yellowBossCrouch,
			redImage:redYellowBossCrouch,
			frames:[0],
			width:yellowBossCrouch.width,
			height:yellowBossCrouch.height,
			frameTimes:[50],
			reverses:false,
			loops:false
		},
		punch:{
			name:STATE.Punch,
			image:yellowBossPunch,
			redImage:redYellowBossPunch,
			frames:[0, 1, 2, 1],
			width:yellowBossPunch.width / 3,
			height:yellowBossPunch.height,
			frameTimes:[50, 250, 125, 50],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:yellowBossKick,
			redImage:redYellowBossKick,
			frames:[0, 1, 2, 3, 2, 1],
			width:yellowBossKick.width / 4,
			height:yellowBossKick.height,
			frameTimes:[50, 175, 175, 125, 50, 50],
			reverses:false,
			loops:false
		},
		block:{
			name:STATE.Block,
			image:yellowBossBlock,
			redImage:redYellowBossBlock,
			frames:[0],
			width:yellowBossBlock.width,
			height:yellowBossBlock.height,
			frameTimes:[50],
			reverses:false,
			loops:false
		},
		sweep:{},//Yellow Bosses can't Sweep
		c_punch:{
			name:STATE.C_Punch,
			image:yellowBossC_Punch,
			//redImage:redYellowBossC_Punch,
			frames:[0, 1, 0],
			width:yellowBossC_Punch.width / 2,
			height:yellowBossC_Punch.height,
			frameTimes:[50, 150, 50],
			reverses:false,
			loops:false
		},
		jump:{
			name:STATE.Jump,
			image:yellowBossJump,
			redImage:redYellowBossJump,
			frames:[0, 1, 4],
			width:yellowBossJump.width / 5,
			height:yellowBossJump.height,
			frameTimes:[32, 380, 32],
			reverses:false,
			loops:false
		},
		j_punch:{
			name:STATE.J_Punch,
			image:yellowBossJ_Punch,
			//redImage:redYellowBossJ_Punch,
			frames:[0, 1, 2, 1, 4],
			width:yellowBossJ_Punch.width / 5,
			height:yellowBossJ_Punch.height,
			frameTimes:[32, 50, 300, 50, 32],
			reverses:false,
			loops:false
		},
		j_kick:{},//Yellow Bosses can't Jump Kick
		h_kick:{},//Yellow Bosses can't Helicopter Kick
		knockback:{
			name:STATE.KnockBack,
			image:yellowBossKnockback,
			redImage:redYellowBossKnockback,
			frames:[0],
			width:yellowBossKnockback.width,
			height:yellowBossKnockback.height,
			frameTimes:[625],
			reverses:false,
			loops:false
		}
	};

	const bossTanBeltData = {
		idle:{
			name:STATE.Idle,
			image:tanBossIdle,
			redImage:redTanBossIdle,
			frames:[0, 1, 2, 3, 4, 5, 6, 7],
			width:tanBossIdle.width / 8,
			height:tanBossIdle.height,
			frameTimes:[150],
			reverses:false,
			loops:true
		},
		walk:{
			name:STATE.WalkRight,
			image:tanBossWalk,
			redImage:redTanBossWalk,
			frames:[0, 1, 2, 3],
			width:tanBossWalk.width / 4,
			height:tanBossWalk.height,
			frameTimes:[150],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:tanBossDash,
			redImage:redTanBossDash,
			frames:[0],
			width:tanBossDash.width,
			height:tanBossDash.height,
			frameTimes:[150],
			reverses:false,
			loops:false
		},
		jump:{
			name:STATE.Jump,
			image:tanBossJump,
			redImage:redTanBossJump,
			frames:[0, 1, 4],
			width:tanBossJump.width / 5,
			height:tanBossJump.height,
			frameTimes:[32, 380, 32],
			reverses:false,
			loops:false
		},
		crouch:{
			name:STATE.Crouch,
			image:tanBossCrouch,
			redImage:redTanBossCrouch,
			frames:[0],
			width:tanBossCrouch.width,
			height:tanBossCrouch.height,
			frameTimes:[50],
			reverses:false,
			loops:false},
		punch:{
			name:STATE.Punch,
			image:tanBossPunch,
			redImage:redTanBossPunch,
			frames:[0, 1, 2, 1],
			width:tanBossPunch.width / 3,
			height:tanBossPunch.height,
			frameTimes:[50, 225, 125, 50],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:tanBossKick,
			redImage:redTanBossKick,
			frames:[0, 1, 2, 3, 2, 1],
			width:tanBossKick.width / 4,
			height:tanBossKick.height,
			frameTimes:[50, 150, 150, 125, 50, 50],
			reverses:false,
			loops:false
		},
		block:{
			name:STATE.Block,
			image:tanBossBlock,
			redImage:redTanBossBlock,
			frames:[0],
			width:tanBossBlock.width,
			height:tanBossBlock.height,
			frameTimes:[50],
			reverses:false,
			loops:false
		},
		sweep:{
			name:STATE.Sweep,
			image:tanBossSweep,
			redImage:redTanBossSweep,
			frames:[0, 1, 0],
			width:tanBossSweep.width / 2,
			height:tanBossSweep.height,
			frameTimes:[50, 150, 50],
			reverses:false,
			loops:false
		},
		j_kick:{},//Tan bosses can't Jump Kick
		h_kick:{},//Tan bosses can't Helicopter Kick
		knockback:{
			name:STATE.KnockBack,
			image:tanBossKnockback,
			redImage:redTanBossKnockback,
			frames:[0],
			width:tanBossKnockback.width,
			height:tanBossKnockback.height,
			frameTimes:[625],
			reverses:false,
			loops:false
		}
	};

	const bossBrownBeltData = {
		idle:{
			name:STATE.Idle,
			image:brownBossIdle,
			redImage:redBrownBossIdle,
			frames:[0, 1, 2, 3, 4, 5, 6, 7],
			width:brownBossIdle.width / 8,
			height:brownBossIdle.height,
			frameTimes:[150],
			reverses:false,
			loops:true
		},
		walk:{
			name:STATE.WalkRight,
			image:brownBossWalk,
			redImage:redBrownBossWalk,
			frames:[0, 1, 2, 3],
			width:brownBossWalk.width / 4,
			height:brownBossWalk.height,
			frameTimes:[150],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:brownBossDash,
			redImage:redBrownBossDash,
			frames:[0],
			width:brownBossDash.width,
			height:brownBossDash.height,
			frameTimes:[150],
			reverses:false,
			loops:false
		},
		jump:{
			name:STATE.Jump,
			image:brownBossJump,
			redImage:redBrownBossJump,
			frames:[0, 1, 4],
			width:brownBossJump.width / 5,
			height:brownBossJump.height,
			frameTimes:[32, 380, 32],
			reverses:false,
			loops:false
		},
		crouch:{
			name:STATE.Crouch,
			image:brownBossCrouch,
			redImage:redBrownBossCrouch,
			frames:[0],
			width:brownBossCrouch.width,
			height:brownBossCrouch.height,
			frameTimes:[50],
			reverses:false,
			loops:false},
		punch:{
			name:STATE.Punch,
			image:brownBossPunch,
			redImage:redBrownBossPunch,
			frames:[0, 1, 2, 1],
			width:brownBossPunch.width / 3,
			height:brownBossPunch.height,
			frameTimes:[50, 200, 125, 50],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:brownBossKick,
			redImage:redBrownBossKick,
			frames:[0, 1, 2, 3, 2, 1],
			width:brownBossKick.width / 4,
			height:brownBossKick.height,
			frameTimes:[50, 125, 125, 125, 50, 50],
			reverses:false,
			loops:false
		},
		block:{
			name:STATE.Block,
			image:brownBossBlock,
			redImage:redBrownBossBlock,
			frames:[0],
			width:brownBossBlock.width,
			height:brownBossBlock.height,
			frameTimes:[50],
			reverses:false,
			loops:false
		},
		sweep:{
			name:STATE.Sweep,
			image:brownBossSweep,
			redImage:redBrownBossSweep,
			frames:[0, 1, 0],
			width:brownBossSweep.width / 2,
			height:brownBossSweep.height,
			frameTimes:[50, 150, 50],
			reverses:false,
			loops:false
		},
		j_kick:{
			name:STATE.Jump,
			image:brownBossJump,
			redImage:redBrownBossJump,
			frames:[0, 1, 3, 4],
			width:brownBossJump.width / 5,
			height:brownBossJump.height,
			frameTimes:[32, 150, 150, 32],
			reverses:false,
			loops:false
		},
		h_kick:{},//Brown Bosses can't Helicopter Kick
		knockback:{
			name:STATE.KnockBack,
			image:brownBossKnockback,
			redImage:redBrownBossKnockback,
			frames:[0],
			width:brownBossKnockback.width,
			height:brownBossKnockback.height,
			frameTimes:[625],
			reverses:false,
			loops:false
		}
	};

	const bossRedBeltData = {
		idle:{
			name:STATE.Idle,
			image:redBossIdle,
			redImage:redRedBossIdle,
			frames:[0, 1, 2, 3, 4, 5, 6, 7],
			width:redBossIdle.width / 8,
			height:redBossIdle.height,
			frameTimes:[150],
			reverses:false,
			loops:true
		},
		walk:{
			name:STATE.WalkRight,
			image:redBossWalk,
			redImage:redRedBossWalk,
			frames:[0, 1, 2, 3],
			width:redBossWalk.width / 4,
			height:redBossWalk.height,
			frameTimes:[150],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:redBossDash,
			redImage:redRedBossDash,
			frames:[0],
			width:redBossDash.width,
			height:redBossDash.height,
			frameTimes:[150],
			reverses:false,
			loops:false
		},
		jump:{
			name:STATE.Jump,
			image:redBossJump,
			redImage:redRedBossJump,
			frames:[0, 1, 4],
			width:redBossJump.width / 5,
			height:redBossJump.height,
			frameTimes:[32, 380, 32],
			reverses:false,
			loops:false
		},
		crouch:{
			name:STATE.Crouch,
			image:redBossCrouch,
			redImage:redRedBossCrouch,
			frames:[0],
			width:redBossCrouch.width,
			height:redBossCrouch.height,
			frameTimes:[50],
			reverses:false,
			loops:false},
		punch:{
			name:STATE.Punch,
			image:redBossPunch,
			redImage:redRedBossPunch,
			frames:[0, 1, 2, 1],
			width:redBossPunch.width / 3,
			height:redBossPunch.height,
			frameTimes:[50, 175, 125, 50],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:redBossKick,
			redImage:redRedBossKick,
			frames:[0, 1, 2, 3, 2, 1],
			width:redBossKick.width / 4,
			height:redBossKick.height,
			frameTimes:[50, 100, 100, 125, 50, 50],
			reverses:false,
			loops:false
		},
		block:{
			name:STATE.Block,
			image:redBossBlock,
			redImage:redRedBossBlock,
			frames:[0],
			width:redBossBlock.width,
			height:redBossBlock.height,
			frameTimes:[50],
			reverses:false,
			loops:false
		},
		sweep:{
			name:STATE.Sweep,
			image:redBossSweep,
			redImage:redRedBossSweep,
			frames:[0, 1, 0],
			width:redBossSweep.width / 2,
			height:redBossSweep.height,
			frameTimes:[50, 150, 50],
			reverses:false,
			loops:false
		},
		j_kick:{
			name:STATE.Jump,
			image:redBossJump,
			redImage:redRedBossJump,
			frames:[0, 1, 3, 4],
			width:redBossJump.width / 5,
			height:redBossJump.height,
			frameTimes:[32, 150, 150, 32],
			reverses:false,
			loops:false
		},
		h_kick:{
			name:STATE.H_Kick,
			image:redBossH_Kick,
			redImage:redRedBossH_Kick,
			frames:[0, 1, 2, 3, 2, 3, 2, 3, 4, 5],
			width:redBossH_Kick.width / 6,
			height:redBossH_Kick.height,
			frameTimes:[110],
			reverses:false,
			loops:false
		},
		knockback:{
			name:STATE.KnockBack,
			image:redBossKnockback,
			redImage:redRedBossKnockback,
			frames:[0],
			width:redBossKnockback.width,
			height:redBossKnockback.height,
			frameTimes:[625],
			reverses:false,
			loops:false
		}
	};

	const bossBlackBeltData = {
		idle:{
			name:STATE.Idle,
			image:blackBossIdle,
			redImage:redBlackBossIdle,
			frames:[0, 1, 2, 3, 4, 5, 6, 7],
			width:blackBossIdle.width / 8,
			height:blackBossIdle.height,
			frameTimes:[150],
			reverses:false,
			loops:true
		},
		walk:{
			name:STATE.WalkRight,
			image:blackBossWalk,
			redImage:redBlackBossWalk,
			frames:[0, 1, 2, 3],
			width:blackBossWalk.width / 4,
			height:blackBossWalk.height,
			frameTimes:[150],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:blackBossDash,
			redImage:redBlackBossDash,
			frames:[0],
			width:blackBossDash.width,
			height:blackBossDash.height,
			frameTimes:[150],
			reverses:false,
			loops:false
		},
		jump:{
			name:STATE.Jump,
			image:blackBossJump,
			redImage:redBlackBossJump,
			frames:[0, 1, 4],
			width:blackBossJump.width / 5,
			height:blackBossJump.height,
			frameTimes:[32, 380, 32],
			reverses:false,
			loops:false
		},
		crouch:{
			name:STATE.Crouch,
			image:blackBossCrouch,
			redImage:redBlackBossCrouch,
			frames:[0],
			width:blackBossCrouch.width,
			height:blackBossCrouch.height,
			frameTimes:[50],
			reverses:false,
			loops:false},
		punch:{
			name:STATE.Punch,
			image:blackBossPunch,
			redImage:redBlackBossPunch,
			frames:[0, 1, 2, 1],
			width:blackBossPunch.width / 3,
			height:blackBossPunch.height,
			frameTimes:[50, 150, 225, 50],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:blackBossKick,
			redImage:redBlackBossKick,
			frames:[0, 1, 2, 3, 2, 1],
			width:blackBossKick.width / 4,
			height:blackBossKick.height,
			frameTimes:[50, 75, 75, 125, 50, 50],
			reverses:false,
			loops:false
		},
		block:{
			name:STATE.Block,
			image:blackBossBlock,
			redImage:redBlackBossBlock,
			frames:[0],
			width:blackBossBlock.width,
			height:blackBossBlock.height,
			frameTimes:[50],
			reverses:false,
			loops:false
		},
		sweep:{
			name:STATE.Sweep,
			image:blackBossSweep,
			redImage:redBlackBossSweep,
			frames:[0, 1, 0],
			width:blackBossSweep.width / 2,
			height:blackBossSweep.height,
			frameTimes:[50, 150, 50],
			reverses:false,
			loops:false
		},
		j_kick:{
			name:STATE.Jump,
			image:blackBossJump,
			redImage:redBlackBossJump,
			frames:[0, 1, 3, 4],
			width:blackBossJump.width / 5,
			height:blackBossJump.height,
			frameTimes:[32, 150, 150, 32],
			reverses:false,
			loops:false
		},
		h_kick:{
			name:STATE.H_Kick,
			image:blackBossH_Kick,
			redImage:redBlackBossH_Kick,
			frames:[0, 1, 2, 3, 2, 3, 2, 3, 4, 5],
			width:blackBossH_Kick.width / 6,
			height:blackBossH_Kick.height,
			frameTimes:[110],
			reverses:false,
			loops:false
		},
		knockback:{
			name:STATE.KnockBack,
			image:blackBossKnockback,
			redImage:redBlackBossKnockback,
			frames:[0],
			width:blackBossKnockback.width,
			height:blackBossKnockback.height,
			frameTimes:[625],
			reverses:false,
			loops:false
		}
	};
}
