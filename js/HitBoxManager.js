//Player Hitbox Manager
function HitBoxManager(bodyData, attackData) {
	this.bodyColliderForState = function(state, position, scale, facingLeft) {
		const colliderType = ColliderType.Polygon;
		const colliderData = {};
		colliderData.position = position;

		const points = this.bodyPointsForState(state, position, scale, facingLeft);

		colliderData.points = points;

		return new Collider(colliderType, colliderData);
	};

	this.bodyPointsForState = function(state, position, scale, facingLeft) {
		let theseData;

		switch(state) {
		case STATE.WalkRight:
			theseData = bodyData.walk.right;
			break;
		case STATE.WalkLeft:
			theseData = bodyData.walk.left;
			break;
		case STATE.Jump:
			if(facingLeft) {
				theseData = bodyData.jump.left;
			} else {
				theseData = bodyData.jump.right;
			}
			break;
		case STATE.Crouch:
			if(facingLeft) {
				theseData = bodyData.crouch.left;
			} else {
				theseData = bodyData.crouch.right;
			}
			break;
		case STATE.Dash:
			if(facingLeft) {
				theseData = bodyData.dash.left;
			} else {
				theseData = bodyData.dash.right;
			}
			break;
		case STATE.Idle:
			if(facingLeft) {
				theseData = bodyData.idle.left;
			} else {
				theseData = bodyData.idle.right;
			}
			break;
		case STATE.J_Kick:
			if(facingLeft) {
				theseData = bodyData.j_kick.left;
			} else {
				theseData = bodyData.j_kick.right;
			}
			break;
		case STATE.Sweep:
			if(facingLeft) {
				theseData = bodyData.sweep.left;
			} else {
				theseData = bodyData.sweep.right;
			}
			break;
		case STATE.H_Kick:
			if(facingLeft) {
				theseData = bodyData.h_kick.left;
			} else {
				theseData = bodyData.h_kick.right;
			}
			break;
		case STATE.Punch:
			if(facingLeft) {
				theseData = bodyData.punch.left;
			} else {
				theseData = bodyData.punch.right;
			}
			break;
		case STATE.Kick:
			if(facingLeft) {
				theseData = bodyData.kick.left;
			} else {
				theseData = bodyData.kick.right;
			}
			break;
		case STATE.Block:
			if(facingLeft) {
				theseData = bodyData.block.left;
			} else {
				theseData = bodyData.block.right;
			}
			break;
		case STATE.KnockBack:
			if(facingLeft) {
				theseData = bodyData.knockback.left;
			} else {
				theseData = bodyData.knockback.right;
			}
			break;
		default:
			break;
		}

		return pointsFor(position, scale, theseData);
	};

	const pointsFor = function(position, scale, theData) {
		const points = [];

		points.push({x:position.x + (scale * theData[0].x), y:position.y + (scale * theData[0].y)});
		points.push({x:position.x + (scale * theData[1].x), y:position.y + (scale * theData[1].y)});
		points.push({x:position.x + (scale * theData[2].x), y:position.y + (scale * theData[2].y)});
		points.push({x:position.x + (scale * theData[3].x), y:position.y + (scale * theData[3].y)});

		return points;
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

	this.attackColliderIsActiveFor = function(state, frame, aiType) {
		switch(state) {
		case STATE.Idle:
		case STATE.WalkRight:
		case STATE.WalkLeft:
		case STATE.Jump:
		case STATE.Crouch:
		case STATE.Dash:
		case STATE.Block:
		case STATE.KnockBack:
			return false;
		case STATE.Sweep:
			if(aiType === AITYPE.Player) {
				return (frame === 4);
			} else if(aiType === AITYPE.Standard) {
				return (frame === 1);
			} else {
				return true;
			}
		case STATE.J_Kick:
			if(aiType === AITYPE.Boss) {
				return (frame === 3);
			} else if(aiType === AITYPE.Standard) {
				return (frame === 3);
			} else {
				return (frame === 1);
			}
		case STATE.H_Kick:
			if(aiType === AITYPE.Player) {
				return (((frame > 3) && (frame < 5)) || ((frame > 5) && (frame < 8)));
			} else {
				return (frame > 1);
			}
		case STATE.Punch: 
			if(aiType === AITYPE.Boss) {
				return (frame === 3);
			} else if(aiType === AITYPE.Standard) {
				return (frame === 3);
			} else {
				return (frame === 2);
			}	
		case STATE.Kick: 
			if(aiType === AITYPE.Boss) {
				return (frame === 3);
			} else if(aiType === AITYPE.Standard) {
				return (frame === 3);
			} else {
				return (frame === 2);
			}
		}
	};

	const isAttackingState = function(state) {
		switch(state) {
		case STATE.Idle:
		case STATE.WalkRight:
		case STATE.WalkLeft:
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
		let theseData;

		switch(state) {
		case STATE.J_Kick:
			if(facingLeft) {
				theseData = attackData.j_kick.left;
			} else {
				theseData = attackData.j_kick.right;
			}
			break;
		case STATE.Sweep:
			if(facingLeft) {
				theseData = attackData.sweep.left;
			} else {
				theseData = attackData.sweep.right;
			}
			break;
		case STATE.H_Kick:
			if(facingLeft) {
				theseData = attackData.h_kick.left;
			} else {
				theseData = attackData.h_kick.right;
			}
			break;
		case STATE.Punch:
			if(facingLeft) {
				theseData = attackData.punch.left;
			} else {
				theseData = attackData.punch.right;
			}
			break;
		case STATE.Kick:
			if(facingLeft) {
				theseData = attackData.kick.left;
			} else {
				theseData = attackData.kick.right;
			}
			break;
		default:
			return null;
		} 

		return pointsFor(position, scale, theseData);
	};
}