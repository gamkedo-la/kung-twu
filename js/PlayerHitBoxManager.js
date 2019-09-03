//Player Hitbox Manager
function PlayerHitBoxManager() {
	this.bodyColliderForState = function(state, position, facingLeft) {
		const colliderType = ColliderType.Polygon;
		const colliderData = {};
		colliderData.position = position;

		const points = this.bodyPointsForState(state, position, facingLeft);

		colliderData.points = points;

		return new Collider(colliderType, colliderData);
	};

	this.bodyPointsForState = function(state, position, facingLeft) {
		switch(state) {
		case STATE.Walk:
			return pointsForWalk(position, facingLeft);
		case STATE.Jump:
			return pointsForJump(position, facingLeft);
		case STATE.Crouch:
			return pointsForCrouch(position, facingLeft);
		case STATE.Dash:
			return pointsForDash(position, facingLeft);
		case STATE.Idle:
			return pointsForIdle(position, facingLeft);
		case STATE.J_Kick:
			return pointsForJ_Kick(position, facingLeft);
		case STATE.Sweep:
			return pointsForSweep(position, facingLeft);
		case STATE.H_Kick:
			return pointsForH_kick(position, facingLeft);
		case STATE.Punch:
			return pointsForPunch(position, facingLeft);
		case STATE.Kick:
			return pointsForKick(position, facingLeft);
		case STATE.Block:
			return pointsForBlock(position, facingLeft);
		case STATE.KnockBack:
			return pointsForKnockBack(position, facingLeft);
		}
	};

	const pointsForWalk = function(position, facingLeft) {
		const points = [];

		if(facingLeft) {
			points.push({x:position.x + 38, y:position.y + 6});
			points.push({x:position.x + 38, y:position.y + 106});
			points.push({x:position.x + 68, y:position.y + 106});
			points.push({x:position.x + 68, y:position.y + 6});

		} else {
			points.push({x:position.x + 6, y:position.y + 3});
			points.push({x:position.x + 6, y:position.y + 106});
			points.push({x:position.x + 38, y:position.y + 106});
			points.push({x:position.x + 38, y:position.y + 3});
		}

		return points;
	};

	const pointsForJump = function(position, facingLeft) {
		const points = [];

		return points;
	};	
	
	const pointsForCrouch = function(position, facingLeft) {
		const points = [];

		return points;
	};

	const pointsForDash = function(position, facingLeft) {
		const points = [];

		return points;
	};	
	
	const pointsForIdle = function(position, facingLeft) {
		const points = [];
		if(facingLeft) {
			points.push({x:position.x + 34, y:position.y + 6});
			points.push({x:position.x + 34, y:position.y + 106});
			points.push({x:position.x + 64, y:position.y + 106});
			points.push({x:position.x + 64, y:position.y + 6});

		} else {
			points.push({x:position.x + 8, y:position.y + 3});
			points.push({x:position.x + 8, y:position.y + 106});
			points.push({x:position.x + 44, y:position.y + 106});
			points.push({x:position.x + 44, y:position.y + 3});
		}

		return points;		
	};

	const pointsForJ_Kick = function(position, facingLeft) {
		const points = [];

		return points;
	};	
	
	const pointsForSweep = function(position, facingLeft) {
		const points = [];

		return points;
	};

	const pointsForH_kick = function(position, facingLeft) {
		const points = [];

		return points;
	};	
	
	const pointsForPunch = function(position, facingLeft) {
		const points = [];

		if(facingLeft) {
			points.push({x:position.x + 24, y:position.y + 6});
			points.push({x:position.x + 24, y:position.y + 106});
			points.push({x:position.x + 44, y:position.y + 106});
			points.push({x:position.x + 44, y:position.y + 6});

		} else {
			points.push({x:position.x + 24, y:position.y + 3});
			points.push({x:position.x + 24, y:position.y + 106});
			points.push({x:position.x + 44, y:position.y + 106});
			points.push({x:position.x + 44, y:position.y + 3});
		}

		return points;
	};

	const pointsForKick = function(position, facingLeft) {
		const points = [];

		if(facingLeft) {
			points.push({x:position.x + 44, y:position.y + 10});
			points.push({x:position.x + 44, y:position.y + 106});
			points.push({x:position.x + 64, y:position.y + 106});
			points.push({x:position.x + 64, y:position.y + 10});

		} else {
			points.push({x:position.x + 8, y:position.y + 10});
			points.push({x:position.x + 8, y:position.y + 106});
			points.push({x:position.x + 36, y:position.y + 106});
			points.push({x:position.x + 36, y:position.y + 10});
		}

		return points;
	};	
	
	const pointsForBlock = function(position, facingLeft) {
		const points = [];

		return points;
	};

	const pointsForKnockBack = function(position, facingLeft) {
		const points = [];

		return points;
	};
}