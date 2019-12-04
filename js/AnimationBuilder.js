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
			//TODO: basic black belt enemy spritesheet doesn't exist
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
			case BELT.White: return getAnimationsWithData(playerWhiteBeltData, scale, true);
			case BELT.Yellow: return getAnimationsWithData(playerYellowBeltData, scale, true);
			case BELT.Tan: return getAnimationsWithData(playerTanBeltData, scale, true);
			case BELT.Brown: return getAnimationsWithData(playerBrownBeltData, scale, true);
			case BELT.Red: return getAnimationsWithData(playerRedBeltData, scale, true);
			case BELT.Black: return getAnimationsWithData(playerBlackBeltData, scale, true);
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

	const getAnimationsWithData = function(data, scale, isPlayer = false) {
		const result = {};
		result.idle = getAnimationWithData(data.idle, isPlayer);
		if(result.idle === null) {
			console.error("Idle animations are required for all characters");
		}

		result.walk = getAnimationWithData(data.walk, isPlayer);
		if(result.walk === null) {
			result.walk = getAnimationWithData(data.idle, isPlayer);
		}

		result.dash = getAnimationWithData(data.dash, isPlayer);
		if(result.dash === null) {
			result.dash = getAnimationWithData(data.idle, isPlayer);
		}

		result.jump = getAnimationWithData(data.jump, isPlayer);
		if(result.jump === null) {
			result.jump = getAnimationWithData(data.idle, isPlayer);
		}

		result.crouch = getAnimationWithData(data.crouch, isPlayer);
		if(result.crouch === null) {
			result.crouch = getAnimationWithData(data.idle, isPlayer);
		}

		result.punch = getAnimationWithData(data.punch, isPlayer);
		if(result.punch === null) {
			result.punch = getAnimationWithData(data.idle, isPlayer);
		}

		result.kick = getAnimationWithData(data.kick, isPlayer);
		if(result.kick === null) {
			result.kick = getAnimationWithData(data.idle, isPlayer);
		}

		result.block = getAnimationWithData(data.block, isPlayer);
		if(result.block === null) {
			result.block = getAnimationWithData(data.idle, isPlayer);
		}

		result.sweep = getAnimationWithData(data.sweep, isPlayer);
		if(result.sweep === null) {
			result.sweep = getAnimationWithData(data.idle, isPlayer);
		}

		result.j_kick = getAnimationWithData(data.j_kick, isPlayer);
		if(result.j_kick === null) {
			result.j_kick = getAnimationWithData(data.idle, isPlayer);
		}

		result.h_kick = getAnimationWithData(data.h_kick, isPlayer);
		if(result.h_kick === null) {
			result.h_kick = getAnimationWithData(data.idle, isPlayer);
		}

		result.knockback = getAnimationWithData(data.knockback, isPlayer);
		if(result.knockback === null) {
			result.knockback = getAnimationWithData(data.idle, isPlayer);
		}

		const animationKeys = Object.keys(result);
		for(let key of animationKeys) {
			if(result[key] === null) continue;

			result[key].scale = scale;
		}

		return result;
	};

	const getAnimationWithData = function(data, isPlayer = false) {
		if((data.name === undefined) || (data.name === null)) return null;
		return new SpriteAnimation(data.name, data.image, data.frames, data.width, data.height, data.frameTimes, data.reverses, data.loops, isPlayer);
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
			frames:[0],
			width:basicEnemySweep.width,
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
			frames:[0],
			width:yellowEnemySweep.width,
			height:yellowEnemySweep.height,
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
			frames:[0, 0],
			width:tanEnemySweep.width,
			height:tanEnemySweep.height,
			frameTimes:[36, 225],
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
			frames:[0, 0],
			width:brownEnemySweep.width,
			height:brownEnemySweep.height,
			frameTimes:[36, 225],
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
			frames:[0, 0],
			width:redEnemySweep.width,
			height:redEnemySweep.height,
			frameTimes:[36, 225],
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
			height:basicEnemyCrouch.height,
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
			frames:[0, 0],
			width:basicEnemySweep.width,
			height:basicEnemySweep.height,
			frameTimes:[36, 225],
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
			frames:[0, 1, 2, 3, 4, 5, 6],
			width:playerJumpWhite.width / 7,
			height:playerJumpWhite.height,
			frameTimes:[16, 125, 200, 150, 150, 250, 16],
			reverses:false,
			loops:false
		},
		crouch:{
			name:STATE.Crouch,
			image:playerCrouch,
			frames:[0],
			width:playerCrouch.width,
			height:playerCrouch.height,
			frameTimes:[275],
			reverses:false,
			loops:false
		},
		punch:{
			name:STATE.Punch,
			image:playerPunchWhite,
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
			frames:[0, 1, 2, 1],
			width:playerKickWhite.width / 3,
			height:playerKickWhite.height,
			frameTimes:[30*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 150*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 150*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 30*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		block:{
			name:STATE.Block,
			image:playerBlock,
			frames:[0],
			width:playerBlock.width,
			height:playerBlock.height,
			frameTimes:[275],
			reverses:false,
			loops:false
		},
		sweep:{
			name:STATE.Sweep,
			image:playerSweepWhite,
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
			frames:[0, 1, 0],
			width:playerJ_KickWhite.width / 2,
			height:playerJ_KickWhite.height,
			frameTimes:[160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		h_kick:{},
		knockback:{
			name:STATE.KnockBack,
			image:playerKnockbackWhite,
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
			frames:[0, 1, 2, 3, 4, 5, 6],
			width:playerJumpYellow.width / 7,
			height:playerJumpYellow.height,
			frameTimes:[16, 125, 200, 150, 150, 250, 16],
			reverses:false,
			loops:false
		},
		crouch:{
			name:STATE.Crouch,
			image:playerCrouch,
			frames:[0],
			width:playerCrouch.width,
			height:playerCrouch.height,
			frameTimes:[275],
			reverses:false,
			loops:false
		},
		punch:{
			name:STATE.Punch,
			image:playerPunchYellow,
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
			frames:[0, 1, 2, 1],
			width:playerKickYellow.width / 3,
			height:playerKickYellow.height,
			frameTimes:[60*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 170*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 140*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 60*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		block:{
			name:STATE.Block,
			image:playerBlock,
			frames:[0],
			width:playerBlock.width,
			height:playerBlock.height,
			frameTimes:[275],
			reverses:false,
			loops:false
		},
		sweep:{
			name:STATE.Sweep,
			image:playerSweepYellow,
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
			frames:[0, 1, 0],
			width:playerJ_KickYellow.width / 2,
			height:playerJ_KickYellow.height,
			frameTimes:[160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		h_kick:{},
		knockback:{
			name:STATE.KnockBack,
			image:playerKnockbackYellow,
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
			frames:[0, 1, 2, 3, 4, 5, 6],
			width:playerJumpTan.width / 7,
			height:playerJumpTan.height,
			frameTimes:[16, 125, 200, 150, 150, 250, 16],
			reverses:false,
			loops:false
		},
		crouch:{
			name:STATE.Crouch,
			image:playerCrouch,
			frames:[0],
			width:playerCrouch.width,
			height:playerCrouch.height,
			frameTimes:[275],
			reverses:false,
			loops:false
		},
		punch:{
			name:STATE.Punch,
			image:playerPunchTan,
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
			frames:[0, 1, 2, 1],
			width:playerKickTan.width / 3,
			height:playerKickTan.height,
			frameTimes:[60*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 150*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 130*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 60*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		block:{
			name:STATE.Block,
			image:playerBlock,
			frames:[0],
			width:playerBlock.width,
			height:playerBlock.height,
			frameTimes:[275],
			reverses:false,
			loops:false
		},
		sweep:{
			name:STATE.Sweep,
			image:playerSweepTan,
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
			frames:[0, 1, 0],
			width:playerJ_KickTan.width / 2,
			height:playerJ_KickTan.height,
			frameTimes:[160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		h_kick:{},
		knockback:{
			name:STATE.KnockBack,
			image:playerKnockbackTan,
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
			frames:[0, 1, 2, 3, 4, 5, 6],
			width:playerJumpBrown.width / 7,
			height:playerJumpBrown.height,
			frameTimes:[16, 125, 200, 150, 150, 250, 16],
			reverses:false,
			loops:false
		},
		crouch:{
			name:STATE.Crouch,
			image:playerCrouch,
			frames:[0],
			width:playerCrouch.width,
			height:playerCrouch.height,
			frameTimes:[275],
			reverses:false,
			loops:false
		},
		punch:{
			name:STATE.Punch,
			image:playerPunchBrown,
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
			frames:[0, 1, 2, 1],
			width:playerKickBrown.width / 3,
			height:playerKickBrown.height,
			frameTimes:[60*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 120*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 120*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 60*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		block:{
			name:STATE.Block,
			image:playerBlock,
			frames:[0],
			width:playerBlock.width,
			height:playerBlock.height,
			frameTimes:[275],
			reverses:false,
			loops:false
		},
		sweep:{
			name:STATE.Sweep,
			image:playerSweepBrown,
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
			frames:[0, 1, 0],
			width:playerJ_KickBrown.width / 2,
			height:playerJ_KickBrown.height,
			frameTimes:[200*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		h_kick:{},
		knockback:{
			name:STATE.KnockBack,
			image:playerKnockbackBrown,
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
			frames:[0, 1, 2, 3, 4, 5, 6],
			width:playerJumpRed.width / 7,
			height:playerJumpRed.height,
			frameTimes:[16, 125, 200, 150, 150, 250, 16],
			reverses:false,
			loops:false
		},
		crouch:{
			name:STATE.Crouch,
			image:playerCrouch,
			frames:[0],
			width:playerCrouch.width,
			height:playerCrouch.height,
			frameTimes:[275],
			reverses:false,
			loops:false
		},
		punch:{
			name:STATE.Punch,
			image:playerPunchRed,
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
			frames:[0, 1, 2, 1],
			width:playerKickRed.width / 3,
			height:playerKickRed.height,
			frameTimes:[60*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 110*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 60*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		block:{
			name:STATE.Block,
			image:playerBlock,
			frames:[0],
			width:playerBlock.width,
			height:playerBlock.height,
			frameTimes:[275],
			reverses:false,
			loops:false
		},
		sweep:{
			name:STATE.Sweep,
			image:playerSweepRed,
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
			frames:[0, 1, 0],
			width:playerJ_KickRed.width / 2,
			height:playerJ_KickRed.height,
			frameTimes:[180*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		h_kick:{},
		knockback:{
			name:STATE.KnockBack,
			image:playerKnockbackRed,
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
			frames:[0, 1, 2, 3, 4, 5, 6],
			width:playerJumpBlack.width / 7,
			height:playerJumpBlack.height,
			frameTimes:[16, 125, 200, 150, 150, 250, 16],
			reverses:false,
			loops:false
		},
		crouch:{
			name:STATE.Crouch,
			image:playerCrouch,
			frames:[0],
			width:playerCrouch.width,
			height:playerCrouch.height,
			frameTimes:[275],
			reverses:false,
			loops:false
		},
		punch:{
			name:STATE.Punch,
			image:playerPunchBlack,
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
			frames:[0, 1, 2, 1],
			width:playerKickBlack.width / 3,
			height:playerKickBlack.height,
			frameTimes:[60*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 90*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 90*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 60*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		block:{
			name:STATE.Block,
			image:playerBlock,
			frames:[0],
			width:playerBlock.width,
			height:playerBlock.height,
			frameTimes:[275],
			reverses:false,
			loops:false
		},
		sweep:{
			name:STATE.Sweep,
			image:playerSweepBlack,
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
			frames:[0, 1, 0],
			width:playerJ_KickBlack.width / 2,
			height:playerJ_KickBlack.height,
			frameTimes:[160*PLR_ATK_DELAYSCALE*PLR_WINDUP_DELAYSCALE, 167*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE, 100*PLR_ATK_DELAYSCALE*PLR_COOLDOWN_DELAYSCALE],
			reverses:false,
			loops:false
		},
		h_kick:{},
		knockback:{
			name:STATE.KnockBack,
			image:playerKnockbackBlack,
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
			frames:[0, 1, 2, 3],
			width:yellowBossWalk.width / 4,
			height:yellowBossWalk.height,
			frameTimes:[150],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:yellowBossJump,
			frames:[1],
			width:yellowBossJump.width / 5,
			height:yellowBossJump.height,
			frameTimes:[300],
			reverses:false,
			loops:false
		},
		crouch:{
			name:STATE.Crouch,
			image:yellowBossCrouch,
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
			frames:[0],
			width:yellowBossBlock.width,
			height:yellowBossBlock.height,
			frameTimes:[50],
			reverses:false,
			loops:false
		},
		sweep:{
			name:STATE.Sweep,
			image:yellowBossSweep,
			frames:[0, 1, 0],
			width:yellowBossSweep.width / 2,
			height:yellowBossSweep.height,
			frameTimes:[50, 150, 50],
			reverses:false,
			loops:false
		},
		c_punch:{},
		jump:{
			name:STATE.Jump,
			image:yellowBossJump,
			frames:[0, 1, 4],
			width:yellowBossJump.width / 5,
			height:yellowBossJump.height,
			frameTimes:[32, 380, 32],
			reverses:false,
			loops:false
		},
		j_punch:{},
		j_kick:{},
		h_kick:{
			name:STATE.H_Kick,
			image:yellowBossH_Kick,
			frames:[0, 1, 2, 3, 2, 3, 2, 3, 4, 5],
			width:yellowBossH_Kick.width / 6,
			height:yellowBossH_Kick.height,
			frameTimes:[100, 100, 75, 75, 75, 75, 75, 75, 50, 50],
			reverses:false,
			loops:false
		},
		knockback:{
			name:STATE.KnockBack,
			image:yellowBossKnockback,
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
			frames:[0, 1, 2, 3],
			width:tanBossWalk.width / 4,
			height:tanBossWalk.height,
			frameTimes:[150],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:tanBossWalk,
			frames:[0, 1, 2, 3],
			width:tanBossWalk.width / 4,
			height:tanBossWalk.height,
			frameTimes:[30, 300, 30],
			reverses:false,
			loops:false
		},
		jump:{
			name:STATE.Jump,
			image:tanBossJump,
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
			frames:[0],
			width:tanBossCrouch.width,
			height:tanBossCrouch.height,
			frameTimes:[50],
			reverses:false,
			loops:false},
		punch:{
			name:STATE.Punch,
			image:tanBossPunch,
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
			frames:[0, 1, 0],
			width:tanBossSweep.width / 2,
			height:tanBossSweep.height,
			frameTimes:[50, 150, 50],
			reverses:false,
			loops:false
		},
		j_kick:{},
		h_kick:{
			name:STATE.H_Kick,
			image:tanBossH_Kick,
			frames:[0, 1, 2, 3, 2, 3, 2, 3, 4, 5],
			width:tanBossH_Kick.width / 6,
			height:tanBossH_Kick.height,
			frameTimes:[100, 100, 75, 75, 75, 75, 75, 75, 50, 50],
			reverses:false,
			loops:false
		},
		knockback:{
			name:STATE.KnockBack,
			image:tanBossKnockback,
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
			frames:[0, 1, 2, 3],
			width:brownBossWalk.width / 4,
			height:brownBossWalk.height,
			frameTimes:[150],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:brownBossWalk,
			frames:[0, 1, 2, 3],
			width:brownBossWalk.width / 4,
			height:brownBossWalk.height,
			frameTimes:[30, 300, 30],
			reverses:false,
			loops:false
		},
		jump:{
			name:STATE.Jump,
			image:brownBossJump,
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
			frames:[0],
			width:brownBossCrouch.width,
			height:brownBossCrouch.height,
			frameTimes:[50],
			reverses:false,
			loops:false},
		punch:{
			name:STATE.Punch,
			image:brownBossPunch,
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
			frames:[0, 1, 3, 4],
			width:brownBossJump.width / 5,
			height:brownBossJump.height,
			frameTimes:[32, 150, 150, 32],
			reverses:false,
			loops:false
		},
		h_kick:{
			name:STATE.H_Kick,
			image:brownBossH_Kick,
			frames:[0, 1, 2, 3, 2, 3, 2, 3, 4, 5],
			width:brownBossH_Kick.width / 6,
			height:brownBossH_Kick.height,
			frameTimes:[100, 100, 75, 75, 75, 75, 75, 75, 50, 50],
			reverses:false,
			loops:false
		},
		knockback:{
			name:STATE.KnockBack,
			image:brownBossKnockback,
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
			frames:[0, 1, 2, 3],
			width:redBossWalk.width / 4,
			height:redBossWalk.height,
			frameTimes:[150],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:redBossWalk,
			frames:[0, 1, 2, 3],
			width:redBossWalk.width / 4,
			height:redBossWalk.height,
			frameTimes:[30, 300, 30],
			reverses:false,
			loops:false
		},
		jump:{
			name:STATE.Jump,
			image:redBossJump,
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
			frames:[0],
			width:redBossCrouch.width,
			height:redBossCrouch.height,
			frameTimes:[50],
			reverses:false,
			loops:false},
		punch:{
			name:STATE.Punch,
			image:redBossPunch,
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
			frames:[0, 1, 2, 3],
			width:blackBossWalk.width / 4,
			height:blackBossWalk.height,
			frameTimes:[150],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:blackBossWalk,
			frames:[0, 1, 2, 3],
			width:blackBossWalk.width / 4,
			height:blackBossWalk.height,
			frameTimes:[30, 300, 30],
			reverses:false,
			loops:false
		},
		jump:{
			name:STATE.Jump,
			image:blackBossJump,
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
			frames:[0],
			width:blackBossCrouch.width,
			height:blackBossCrouch.height,
			frameTimes:[50],
			reverses:false,
			loops:false},
		punch:{
			name:STATE.Punch,
			image:blackBossPunch,
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
			frames:[0],
			width:blackBossKnockback.width,
			height:blackBossKnockback.height,
			frameTimes:[625],
			reverses:false,
			loops:false
		}
	};
}
