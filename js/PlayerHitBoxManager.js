//Player Hitbox Manager
function PlayerHitBoxManager() {
	this.bodyColliderForState = function(state, position, scale, facingLeft) {
		const colliderType = ColliderType.Polygon;
		const colliderData = {};
		colliderData.position = position;

		const points = this.bodyPointsForState(state, position, scale, facingLeft);

		colliderData.points = points;

		return new Collider(colliderType, colliderData);
	};

	this.bodyPointsForState = function(state, position, scale, facingLeft) {
		switch(state) {
		case STATE.Walk:
			return pointsForWalk(position, scale, facingLeft);
		case STATE.Jump:
			return pointsForJump(position, scale, facingLeft);
		case STATE.Crouch:
			return pointsForCrouch(position, scale, facingLeft);
		case STATE.Dash:
			return pointsForDash(position, scale, facingLeft);
		case STATE.Idle:
			return pointsForIdle(position, scale, facingLeft);
		case STATE.J_Kick:
			return pointsForJ_Kick(position, scale, facingLeft);
		case STATE.Sweep:
			return pointsForSweep(position, scale, facingLeft);
		case STATE.H_Kick:
			return pointsForH_kick(position, scale, facingLeft);
		case STATE.Punch:
			return pointsForPunch(position, scale, facingLeft);
		case STATE.Kick:
			return pointsForKick(position, scale, facingLeft);
		case STATE.Block:
			return pointsForBlock(position, scale, facingLeft);
		case STATE.KnockBack:
			return pointsForKnockBack(position, scale, facingLeft);
		}
	};

	const pointsForWalk = function(position, scale, facingLeft) {
		const points = [];

		if(facingLeft) {
			points.push({x:position.x + (scale * 19), y:position.y + (scale * 3)});
			points.push({x:position.x + (scale * 19), y:position.y + (scale * 53)});
			points.push({x:position.x + (scale * 34), y:position.y + (scale * 53)});
			points.push({x:position.x + (scale * 34), y:position.y + (scale * 3)});

		} else {
			points.push({x:position.x + (scale * 3), y:position.y + (scale * 2)});
			points.push({x:position.x + (scale * 3), y:position.y + (scale * 53)});
			points.push({x:position.x + (scale * 19), y:position.y + (scale * 53)});
			points.push({x:position.x + (scale * 19), y:position.y + (scale * 2)});
		}

		return points;
	};

	const pointsForJump = function(position, scale, facingLeft) {
		return pointsForIdle(position, scale, facingLeft);
/*		const points = [];

		return points;*/
	};	
	
	const pointsForCrouch = function(position, scale, facingLeft) {
		return pointsForIdle(position, scale, facingLeft);
/*		const points = [];

		return points;*/
	};

	const pointsForDash = function(position, scale, facingLeft) {
		return pointsForIdle(position, scale, facingLeft);
/*		const points = [];

		return points;*/
	};	
	
	const pointsForIdle = function(position, scale, facingLeft) {
		const points = [];
		if(facingLeft) {
			points.push({x:position.x + (scale * 17), y:position.y + (scale * 3)});
			points.push({x:position.x + (scale * 17), y:position.y + (scale * 53)});
			points.push({x:position.x + (scale * 32), y:position.y + (scale * 53)});
			points.push({x:position.x + (scale * 32), y:position.y + (scale * 3)});

		} else {
			points.push({x:position.x + (scale * 4), y:position.y + (scale * 2)});
			points.push({x:position.x + (scale * 4), y:position.y + (scale * 53)});
			points.push({x:position.x + (scale * 22), y:position.y + (scale * 53)});
			points.push({x:position.x + (scale * 22), y:position.y + (scale * 2)});
		}

		return points;		
	};

	const pointsForJ_Kick = function(position, scale, facingLeft) {
		return pointsForJump(position, scale, facingLeft);
		const points = [];

		return points;
	};	
	
	const pointsForSweep = function(position, scale, facingLeft) {
		return pointsForIdle(position, scale, facingLeft);
/*		const points = [];

		return points;*/
	};

	const pointsForH_kick = function(position, scale, facingLeft) {
		return pointsForIdle(position, scale, facingLeft);
/*		const points = [];

		return points;*/
	};	
	
	const pointsForPunch = function(position, scale, facingLeft) {
		const points = [];

		if(facingLeft) {
			points.push({x:position.x + (scale * 12), y:position.y + (scale * 3)});
			points.push({x:position.x + (scale * 12), y:position.y + (scale * 53)});
			points.push({x:position.x + (scale * 22), y:position.y + (scale * 53)});
			points.push({x:position.x + (scale * 22), y:position.y + (scale * 3)});

		} else {
			points.push({x:position.x + (scale * 12), y:position.y + (scale * 2)});
			points.push({x:position.x + (scale * 12), y:position.y + (scale * 53)});
			points.push({x:position.x + (scale * 22), y:position.y + (scale * 53)});
			points.push({x:position.x + (scale * 22), y:position.y + (scale * 2)});
		}

		return points;
	};

	const pointsForKick = function(position, scale, facingLeft) {
		const points = [];

		if(facingLeft) {
			points.push({x:position.x + (scale * 22), y:position.y + (scale * 5)});
			points.push({x:position.x + (scale * 22), y:position.y + (scale * 53)});
			points.push({x:position.x + (scale * 32), y:position.y + (scale * 53)});
			points.push({x:position.x + (scale * 32), y:position.y + (scale * 5)});

		} else {
			points.push({x:position.x + (scale * 4), y:position.y + (scale * 5)});
			points.push({x:position.x + (scale * 4), y:position.y + (scale * 53)});
			points.push({x:position.x + (scale * 18), y:position.y + (scale * 53)});
			points.push({x:position.x + (scale * 18), y:position.y + (scale * 5)});
		}

		return points;
	};	
	
	const pointsForBlock = function(position, scale, facingLeft) {
		return pointsForIdle(position, scale, facingLeft);
/*		const points = [];

		return points;*/
	};

	const pointsForKnockBack = function(position, scale, facingLeft) {
		return pointsForIdle(position, scale, facingLeft);
/*		const points = [];

		return points;*/
	};

	this.attackColliderForState = function(state, position, scale, facingLeft) {
		if(isAttackingState(state)) {
			const colliderType = ColliderType.Polygon;
			const colliderData = {};
			colliderData.position = position;
	
			const points = this.attackPointsForState(state, position, scale, facingLeft);
	
			colliderData.points = points;
	
			return new Collider(colliderType, colliderData);
		} else {
			return null;
		}
	};

	const isAttackingState = function(state) {
		switch(state) {
		case STATE.Idle:
		case STATE.Walk:
		case STATE.Jump:
		case STATE.Crouch:
		case STATE.Dash:
		case STATE.Block:
		case STATE.KnockBack:
			return false;
		case STATE.Sweep:
		case STATE.J_Kick:
		case STATE.H_Kick:
		case STATE.Punch:
		case STATE.Kick:
			return true;
		}
	};

	this.attackPointsForState = function(state, position, scale, facingLeft) {
		switch(state) {
		case STATE.J_Kick:
			return attackPointsForJ_Kick(position, scale, facingLeft);
		case STATE.Sweep:
			return attackPointsForSweep(position, scale, facingLeft);
		case STATE.H_Kick:
			return attackPointsForH_kick(position, scale, facingLeft);
		case STATE.Punch:
			return attackPointsForPunch(position, scale, facingLeft);
		case STATE.Kick:
			return attackPointsForKick(position, scale, facingLeft);
		default:
			return null;
		} 
	};

	const attackPointsForJ_Kick = function(position, scale, facingLeft) {
/*		const points = [];

		return points;*/
		return attackPointsForKick(position, scale, facingLeft);
	};	
	
	const attackPointsForSweep = function(position, scale, facingLeft) {
		const points = [];

		return points;
	};

	const attackPointsForH_kick = function(position, scale, facingLeft) {
		const points = [];

		return points;
	};

	const attackPointsForPunch = function(position, scale, facingLeft) {
		const points = [];

		if(facingLeft) {
			points.push({x:position.x + (scale * 33), y:position.y + (scale * 19)});
			points.push({x:position.x + (scale * 33), y:position.y + (scale * 36)});
			points.push({x:position.x - (scale * 13), y:position.y + (scale * 36)});
			points.push({x:position.x - (scale * 13), y:position.y + (scale * 19)});
		} else {
			points.push({x:position.x + (scale * 3), y:position.y + (scale * 19)});
			points.push({x:position.x + (scale * 3), y:position.y + (scale * 36)});
			points.push({x:position.x + (scale * 51), y:position.y + (scale * 36)});
			points.push({x:position.x + (scale * 51), y:position.y + (scale * 19)});
		}

		return points;
	};

	const attackPointsForKick = function(position, scale, facingLeft) {
		const points = [];

		if(facingLeft) {
			points.push({x:position.x + (scale * 23), y:position.y + (scale * 19)});
			points.push({x:position.x + (scale * 23), y:position.y + (scale * 36)});
			points.push({x:position.x - (scale * 13), y:position.y + (scale * 36)});
			points.push({x:position.x - (scale * 13), y:position.y + (scale * 19)});
		} else {
			points.push({x:position.x + (scale * 13), y:position.y + (scale * 19)});
			points.push({x:position.x + (scale * 13), y:position.y + (scale * 36)});
			points.push({x:position.x + (scale * 48), y:position.y + (scale * 36)});
			points.push({x:position.x + (scale * 48), y:position.y + (scale * 19)});
		}

		return points;
	};	
}