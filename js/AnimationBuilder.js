const RIVAL_TYPE = {
	basic:"basic",
	tall:"tall",
	short:"short",
	player:"player"
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
			case BELT.White: return getAnimationsWithData(playerWhiteBeltData, scale);
				//TODO: Only white belt spritesheets exist for the player
			case BELT.Yellow: return getAnimationsWithData(playerYellowBeltData, scale);
			case BELT.Tan: return getAnimationsWithData(playerTanBeltData, scale);
			case BELT.Brown: return getAnimationsWithData(playerBrownBeltData, scale);
			case BELT.Red: return getAnimationsWithData(playerRedBeltData, scale);
			case BELT.Black: return getAnimationsWithData(playerBlackBeltData, scale);
			}
		}
	};

	const getAnimationsWithData = function(data, scale) {
		const result = {};
		result.idle = getAnimationWithData(data.idle);
		if(result.idle === null) {
			console.error("Idle animations are required for all characters");
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
		return new SpriteAnimation(data.name, data.image, data.frames, data.width, data.height, data.frameTimes, data.reverses, data.loops);
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
			image:playerWalkBack,
			frames:[0, 1, 2],
			width:playerWalkBack.width / 3,
			height:playerWalkBack.height,
			frameTimes:[200],
			reverses:false,
			loops:false
		},
		jump:{},
		crouch:{},
		punch:{
			name:STATE.Punch,
			image:basicEnemyPunch,
			frames:[0, 1, 2, 1],
			width:basicEnemyPunch.width / 3,
			height:basicEnemyPunch.height,
			frameTimes:[50, 150, 225, 50],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:basicEnemyKick,
			frames:[0, 1, 2, 1],
			width:basicEnemyKick.width / 3,
			height:basicEnemyKick.height,
			frameTimes:[50, 150, 225, 50],
			reverses:false,
			loops:false
		},
		block:{},
		sweep:{},
		j_kick:{},
		h_kick:{},
		knockback:{}
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
			image:playerWalkBack,
			frames:[0, 1, 2],
			width:playerWalkBack.width / 3,
			height:playerWalkBack.height,
			frameTimes:[200],
			reverses:false,
			loops:false
		},
		jump:{},
		crouch:{},
		punch:{
			name:STATE.Punch,
			image:yellowEnemyPunch,
			frames:[0, 1, 2, 1],
			width:yellowEnemyPunch.width / 3,
			height:yellowEnemyPunch.height,
			frameTimes:[50, 150, 225, 50],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:yellowEnemyKick,
			frames:[0, 1, 2, 1],
			width:yellowEnemyKick.width / 3,
			height:yellowEnemyKick.height,
			frameTimes:[50, 150, 225, 50],
			reverses:false,
			loops:false
		},
		block:{},
		sweep:{},
		j_kick:{},
		h_kick:{},
		knockback:{}
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
			image:playerWalkBack,
			frames:[0, 1, 2],
			width:playerWalkBack.width / 3,
			height:playerWalkBack.height,
			frameTimes:[200],
			reverses:false,
			loops:false
		},
		jump:{},
		crouch:{},
		punch:{
			name:STATE.Punch,
			image:tanEnemyPunch,
			frames:[0, 1, 2, 1],
			width:tanEnemyPunch.width / 3,
			height:tanEnemyPunch.height,
			frameTimes:[50, 150, 225, 50],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:tanEnemyKick,
			frames:[0, 1, 2, 1],
			width:tanEnemyKick.width / 3,
			height:tanEnemyKick.height,
			frameTimes:[50, 150, 225, 50],
			reverses:false,
			loops:false
		},
		block:{},
		sweep:{},
		j_kick:{},
		h_kick:{},
		knockback:{}
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
			image:playerWalkBack,
			frames:[0, 1, 2],
			width:playerWalkBack.width / 3,
			height:playerWalkBack.height,
			frameTimes:[200],
			reverses:false,
			loops:false
		},
		jump:{},
		crouch:{},
		punch:{
			name:STATE.Punch,
			image:brownEnemyPunch,
			frames:[0, 1, 2, 1],
			width:brownEnemyPunch.width / 3,
			height:brownEnemyPunch.height,
			frameTimes:[50, 150, 225, 50],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:brownEnemyKick,
			frames:[0, 1, 2, 1],
			width:brownEnemyKick.width / 3,
			height:brownEnemyKick.height,
			frameTimes:[50, 150, 225, 50],
			reverses:false,
			loops:false
		},
		block:{},
		sweep:{},
		j_kick:{},
		h_kick:{},
		knockback:{}
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
			image:playerWalkBack,
			frames:[0, 1, 2],
			width:playerWalkBack.width / 3,
			height:playerWalkBack.height,
			frameTimes:[200],
			reverses:false,
			loops:false
		},
		jump:{},
		crouch:{},
		punch:{
			name:STATE.Punch,
			image:redEnemyPunch,
			frames:[0, 1, 2, 1],
			width:redEnemyPunch.width / 3,
			height:redEnemyPunch.height,
			frameTimes:[50, 150, 225, 50],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:redEnemyKick,
			frames:[0, 1, 2, 1],
			width:redEnemyKick.width / 3,
			height:redEnemyKick.height,
			frameTimes:[50, 150, 225, 50],
			reverses:false,
			loops:false
		},
		block:{},
		sweep:{},
		j_kick:{},
		h_kick:{},
		knockback:{}
	};

	const basicBlackBeltData = {
		/*		idle:{
			name:STATE.Idle,
			image:blackEnemyIdle,
			frames:[0, 1],
			width:blackEnemyIdle.width / 2,
			height:blackEnemyIdle.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		walk:{
			name:STATE.WalkRight,
			image:blackEnemyWalk,
			frames:[0, 1, 2],
			width:blackEnemyWalk.width / 3,
			height:blackEnemyWalk.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:playerWalkBack,
			frames:[0, 1, 2],
			width:playerWalkBack.width / 3,
			height:playerWalkBack.height,
			frameTimes:[200],
			reverses:false,
			loops:false
		},
		jump:{},
		crouch:{},
		punch:{
			name:STATE.Punch,
			image:blackEnemyPunch,
			frames:[0, 1, 2, 1],
			width:blackEnemyPunch.width / 3,
			height:blackEnemyPunch.height,
			frameTimes:[50, 150, 225, 50],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:blackEnemyKick,
			frames:[0, 1, 2, 1],
			width:blackEnemyKick.width / 3,
			height:blackEnemyKick.height,
			frameTimes:[50, 150, 225, 50],
			reverses:false,
			loops:false
		},
		block:{},
		sweep:{},
		j_kick:{},
		h_kick:{},
		knockback:{}*/
	};

	const playerWhiteBeltData = {
		idle:{
			name:STATE.Idle,
			image:playerIdle,
			frames:[0, 1],
			width:playerIdle.width / 2,
			height:playerIdle.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		walk:{
			name:STATE.WalkRight,
			image:playerWalkFwd,
			frames:[0, 1, 2],
			width:playerWalkFwd.width / 3,
			height:playerWalkFwd.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:playerWalkBack,
			frames:[0, 1, 2],
			width:playerWalkBack.width / 3,
			height:playerWalkBack.height,
			frameTimes:[200],
			reverses:false,
			loops:false
		},
		jump:{},
		crouch:{},
		punch:{
			name:STATE.Punch,
			image:playerPunch,
			frames:[0, 1, 2, 1],
			width:playerPunch.width / 3,
			height:playerPunch.height,
			frameTimes:[30, 80, 100, 30],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:playerKick,
			frames:[0, 1, 2, 1],
			width:playerKick.width / 3,
			height:playerKick.height,
			frameTimes:[60, 120, 150, 60],
			reverses:false,
			loops:false
		},
		block:{},
		sweep:{},
		j_kick:{},
		h_kick:{},
		knockback:{}
	};

	const playerYellowBeltData = {
		/*		idle:{
			name:STATE.Idle,
			image:playerIdle,
			frames:[0, 1],
			width:playerIdle.width / 2,
			height:playerIdle.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		walk:{
			name:STATE.WalkRight,
			image:playerWalkFwd,
			frames:[0, 1, 2],
			width:playerWalkFwd.width / 3,
			height:playerWalkFwd.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:playerWalkBack,
			frames:[0, 1, 2],
			width:playerWalkBack.width / 3,
			height:playerWalkBack.height,
			frameTimes:[200],
			reverses:false,
			loops:false
		},
		jump:{},
		crouch:{},
		punch:{
			name:STATE.Punch,
			image:playerPunch,
			frames:[0, 1, 2, 1],
			width:playerPunch.width / 3,
			height:playerPunch.height,
			frameTimes:[30, 80, 100, 30],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:playerKick,
			frames:[0, 1, 2, 1],
			width:playerKick.width / 3,
			height:playerKick.height,
			frameTimes:[60, 120, 150, 60],
			reverses:false,
			loops:false
		},
		block:{},
		sweep:{},
		j_kick:{},
		h_kick:{},
		knockback:{}*/
	};

	const playerTanBeltData = {
		/*		idle:{
			name:STATE.Idle,
			image:playerIdle,
			frames:[0, 1],
			width:playerIdle.width / 2,
			height:playerIdle.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		walk:{
			name:STATE.WalkRight,
			image:playerWalkFwd,
			frames:[0, 1, 2],
			width:playerWalkFwd.width / 3,
			height:playerWalkFwd.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:playerWalkBack,
			frames:[0, 1, 2],
			width:playerWalkBack.width / 3,
			height:playerWalkBack.height,
			frameTimes:[200],
			reverses:false,
			loops:false
		},
		jump:{},
		crouch:{},
		punch:{
			name:STATE.Punch,
			image:playerPunch,
			frames:[0, 1, 2, 1],
			width:playerPunch.width / 3,
			height:playerPunch.height,
			frameTimes:[30, 80, 100, 30],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:playerKick,
			frames:[0, 1, 2, 1],
			width:playerKick.width / 3,
			height:playerKick.height,
			frameTimes:[60, 120, 150, 60],
			reverses:false,
			loops:false
		},
		block:{},
		sweep:{},
		j_kick:{},
		h_kick:{},
		knockback:{}*/
	};

	const playerBrownBeltData = {
		/*		idle:{
			name:STATE.Idle,
			image:playerIdle,
			frames:[0, 1],
			width:playerIdle.width / 2,
			height:playerIdle.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		walk:{
			name:STATE.WalkRight,
			image:playerWalkFwd,
			frames:[0, 1, 2],
			width:playerWalkFwd.width / 3,
			height:playerWalkFwd.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:playerWalkBack,
			frames:[0, 1, 2],
			width:playerWalkBack.width / 3,
			height:playerWalkBack.height,
			frameTimes:[200],
			reverses:false,
			loops:false
		},
		jump:{},
		crouch:{},
		punch:{
			name:STATE.Punch,
			image:playerPunch,
			frames:[0, 1, 2, 1],
			width:playerPunch.width / 3,
			height:playerPunch.height,
			frameTimes:[30, 80, 100, 30],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:playerKick,
			frames:[0, 1, 2, 1],
			width:playerKick.width / 3,
			height:playerKick.height,
			frameTimes:[60, 120, 150, 60],
			reverses:false,
			loops:false
		},
		block:{},
		sweep:{},
		j_kick:{},
		h_kick:{},
		knockback:{}*/
	};

	const playerRedBeltData = {
		/*		idle:{
			name:STATE.Idle,
			image:playerIdle,
			frames:[0, 1],
			width:playerIdle.width / 2,
			height:playerIdle.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		walk:{
			name:STATE.WalkRight,
			image:playerWalkFwd,
			frames:[0, 1, 2],
			width:playerWalkFwd.width / 3,
			height:playerWalkFwd.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:playerWalkBack,
			frames:[0, 1, 2],
			width:playerWalkBack.width / 3,
			height:playerWalkBack.height,
			frameTimes:[200],
			reverses:false,
			loops:false
		},
		jump:{},
		crouch:{},
		punch:{
			name:STATE.Punch,
			image:playerPunch,
			frames:[0, 1, 2, 1],
			width:playerPunch.width / 3,
			height:playerPunch.height,
			frameTimes:[30, 80, 100, 30],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:playerKick,
			frames:[0, 1, 2, 1],
			width:playerKick.width / 3,
			height:playerKick.height,
			frameTimes:[60, 120, 150, 60],
			reverses:false,
			loops:false
		},
		block:{},
		sweep:{},
		j_kick:{},
		h_kick:{},
		knockback:{}*/
	};

	const playerBlackBeltData = {
		/*		idle:{
			name:STATE.Idle,
			image:playerIdle,
			frames:[0, 1],
			width:playerIdle.width / 2,
			height:playerIdle.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		walk:{
			name:STATE.WalkRight,
			image:playerWalkFwd,
			frames:[0, 1, 2],
			width:playerWalkFwd.width / 3,
			height:playerWalkFwd.height,
			frameTimes:[200],
			reverses:false,
			loops:true
		},
		dash:{
			name:STATE.Dash,
			image:playerWalkBack,
			frames:[0, 1, 2],
			width:playerWalkBack.width / 3,
			height:playerWalkBack.height,
			frameTimes:[200],
			reverses:false,
			loops:false
		},
		jump:{},
		crouch:{},
		punch:{
			name:STATE.Punch,
			image:playerPunch,
			frames:[0, 1, 2, 1],
			width:playerPunch.width / 3,
			height:playerPunch.height,
			frameTimes:[30, 80, 100, 30],
			reverses:false,
			loops:false
		},
		kick:{
			name:STATE.Kick,
			image:playerKick,
			frames:[0, 1, 2, 1],
			width:playerKick.width / 3,
			height:playerKick.height,
			frameTimes:[60, 120, 150, 60],
			reverses:false,
			loops:false
		},
		block:{},
		sweep:{},
		j_kick:{},
		h_kick:{},
		knockback:{}*/
	};
}