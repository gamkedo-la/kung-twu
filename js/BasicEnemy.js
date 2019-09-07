//Basic Enemy
function BasicEnemy(config) {
	const SCALE = 2;
	const WALK_SPEED = 200;
	const JUMP_SPEED = -300;
	const KNOCK_BACK_SPEED = 800;
	const ATTACK_RANGE = 100;

	const BASE_DAMAGE = 5;
	const DELTA_DAMAGE = 5;

	let stateManager;
	let hitBoxManager = new HitBoxManager(PlayerCollisionBodyData, PlayerAttackBodyData);

	let position = {x:0, y:0};
	let velocity = {x:0, y:0};
	this.health = 15;
	
	this.type = ENTITY_TYPE.BasicEnemy;
	this.collisionBody;//initialized down below definition of buildBodyCollider() function

	if(config != undefined) {
		if(config.x != undefined) {position.x = config.x;}
		if(config.y != undefined) {position.y = config.y;}
		if(config.hasDash != undefined) {hasDash = config.hasDash;}
		if(config.hasSweep != undefined) {hasSweep = config.hasSweep;}
		if(config.hasJumpKick != undefined) {hasJumpKick = config.hasJumpKick;}
		if(config.hasHelicopterKick != undefined) {hasHelicopterKick = config.hasHelicopterKick;}
		if(config.health != undefined) {this.health = config.health;}
		if(config.belt != undefined) {belt = config.belt;}//TODO: use the state manager for this instead
	}

	const initializeAnimations = function() {
		const anims = {};

		anims.idle = new SpriteAnimation("idle", tempEnemyIdlePic, [0, 1], tempEnemyIdlePic.width / 2, tempEnemyIdlePic.height, [200], false, true);
		anims.walk = new SpriteAnimation(STATE.Walk, playerWalkFwd, [0, 1, 2], playerWalkFwd.width / 3, playerIdle.height, [200], false, true);
		anims.dash = new SpriteAnimation(STATE.Dash, playerWalkBack, [0, 1, 2], playerWalkBack.width / 3, playerIdle.height, [200], false, true);
		//anims.jump = ...
		//anims.crouch = ...
		anims.punch = new SpriteAnimation(STATE.Punch, playerPunch, [0, 1, 2, 1], playerPunch.width / 3, playerPunch.height, [50, 100, 125, 50], false, false);
		anims.kick = new SpriteAnimation(STATE.Kick, playerKick, [0, 1, 2, 1], playerKick.width  / 3, playerKick.height, [50, 100, 125, 50], false, false);
		//anims.block = ...
		//anims.sweep = ...
		//anims.j-kick = ...
		//anims.h-kick = ...
		//anims.knockback = ...

		const animationKeys = Object.keys(anims);
		for(let i = 0; i < animationKeys.length; i++) {
			anims[animationKeys[i]].scale = SCALE;
		}

		return anims;
	};
	stateManager = new StateManager(initializeAnimations(), false, AITYPE.BasicWhite);
	this.collisionBody = hitBoxManager.bodyColliderForState(stateManager.getCurrentState(), position, SCALE, stateManager.getIsFacingLeft());
	this.attackBody = hitBoxManager.attackColliderForState(stateManager.getCurrentState(), position, SCALE, stateManager.getIsFacingLeft());

	this.getPosition = function() {
		return {x:position.x, y:position.y};
	};

	this.getWidth = function() {
		return stateManager.getCurrentAnimation().getWidth();
	};

	this.getHeight = function() {
		return stateManager.getCurrentAnimation().getHeight();
	};

	this.getCurrentDamage = function() {
		return (damageForState() + stateManager.getCurrentBelt() * DELTA_DAMAGE);
	};

	const damageForState = function() {
		const aState = stateManager.getCurrentState();
		switch(aState) {
		case STATE.Walk:
		case STATE.Jump:
		case STATE.Crouch:
		case STATE.Dash:
		case STATE.Idle:
		case STATE.Block:
		case STATE.KnockBack:
			return 0;
		case STATE.Punch:
			return 1 * BASE_DAMAGE;
		case STATE.Kick:
			return 2 * BASE_DAMAGE;
		case STATE.J_Kick:
			return 3 * BASE_DAMAGE;
		case STATE.Sweep:
			return 3 * BASE_DAMAGE;
		case STATE.H_Kick:
			return 4 * BASE_DAMAGE;
		}
	};

	this.setNewBelt = function(newBelt) {
		stateManager.setNewBelt(newBelt);
	};

	this.incrementBelt = function() {
		stateManager.incrementBelt();
	};

	this.update = function(deltaTime, gravity, playerPos, floorHeight) {
		const distToPlayer = playerPos.x - position.x;
		stateManager.update(deltaTime, distToPlayer);
		updateForState(stateManager.getCurrentState());

		if(stateManager.getIsNewState()) {
			this.collisionBody.points = hitBoxManager.bodyPointsForState(stateManager.getCurrentState(), position, SCALE, stateManager.getIsFacingLeft());
			this.attackBody = hitBoxManager.attackColliderForState(stateManager.getCurrentState(), position, SCALE, stateManager.getIsFacingLeft());
			if(this.attackBody != null) {
				this.attackBody.isActive = true;
			}
		}

		updatePosition(deltaTime, gravity, floorHeight);

		this.collisionBody.setPosition(position);//keep collider in sync with sprite position
		if(this.attackBody != null) {
			this.attackBody.setPosition(position);
		}
	};

	const updateForState = function(currentState) {
		switch(currentState) {
		case STATE.Walk:
			walk();
			break;
		case STATE.Jump:
			jump();
			break;
		case STATE.Crouch:
			crouch();
			break;
		case STATE.Dash:
			dash();
			break;
		case STATE.Idle:
			idle();
			break;
		case STATE.J_Kick:
			j_Kick();
			break;
		case STATE.Sweep:
			sweep();
			break;
		case STATE.H_Kick:
			h_kick();
			break;
		case STATE.Punch:
			punch();
			break;
		case STATE.Kick:
			kick();
			break;
		case STATE.Block:
			block();
			break;
		case STATE.KnockBack:
			respondToKnockBack();
			break;
		}
	};

	const updatePosition = function(deltaTime, gravity, floorHeight) {
		const timeStep = deltaTime / 1000;//deltaTime is in milliseconds
		position.x += velocity.x * timeStep;
		fallDueToGravity(timeStep, gravity);

		if(position.y > floorHeight - stateManager.getCurrentAnimation().getHeight()) {
			position.y = floorHeight - stateManager.getCurrentAnimation().getHeight();
			velocity.y = 0;
			if(!stateManager.getIsOnGround()) {
				stateManager.didLand();
			}
		}
	};

	const respondToKnockBack = function() {
		if(stateManager.getIsFacingLeft()) {
			velocity.x -= KNOCK_BACK_SPEED / 25;
			if(velocity.x <= 0) {
				velocity.x = 0;
			}
		} else {
			velocity.x += KNOCK_BACK_SPEED / 25;
			if(velocity.x >= 0) {
				velocity.x = 0;
			}
		}
	};

	const fallDueToGravity = function(timeStep, gravity) {
		velocity.y += gravity * timeStep;
		position.y += velocity.y * timeStep;
	};

	const walk = function() {
		let speed = WALK_SPEED;
		if(stateManager.getIsFacingLeft()) {
			speed = -WALK_SPEED;
		} 

		velocity.x = speed;
	};

	const jump = function() {
		if(stateManager.getIsNewState()) {
			velocity.y = JUMP_SPEED;
			//enemyJumpSound.play();//Is there going to be one of these?
		}
	};

	const crouch = function() {
		if(stateManager.getIsNewState()) {
			console.log("Basic Enemy is Crouching now");
			velocity.x = 0;
			//enemyCrouchSound.play();//Is there going to be one of these?
		}
	};

	const block = function() {
		if(stateManager.getIsNewState()) {
			console.log("Basic Enemy is Blocking now");
			velocity.x = 0;
			//enemyBlockSound.play();//Is there going to be one of these?
		}
	};

	const dash = function() {
		if(stateManager.getIsNewState()) {
			console.log("Basic Enemy is dashing now");
			//enemyDashSound.play();//Is there going to be one of these?
		}
	};

	const idle = function() {
		velocity.x = 0;
	};

	const punch = function() {
		if(stateManager.getIsNewState()) {
			velocity.x = 0;
			//enemyPunchSound.play();//Is there going to be one of these?
		}
	};

	const kick = function() {
		if(stateManager.getIsNewState()) {
			velocity.x = 0;
			//enemyKickSound.play();//Is there going to be one of these?
		}
	};

	const j_Kick = function() {
		if(stateManager.getIsNewState()) {
			console.log("Basic Enemy is Jump Kicking now");
			//enemyKickSound.play();//Is there going to be one of these?
		}
	};

	const h_kick = function() {
		if(stateManager.getIsNewState()) {
			console.log("Basic Enemy is Helicopter Kicking now");
			//enemyKickSound.play();//Is there going to be one of these?
		}
	};

	const sweep = function() {
		if(stateManager.getIsNewState()) {
			console.log("Basic Enemy is Sweeping now");
			//enemySweepSound.play();//Is there going to be one of these?
			velocity.x = 0;
		}
	};

	this.draw = function() {
		stateManager.drawAt(position.x, position.y);

		this.collisionBody.draw();//colliders know to draw only when DRAW_COLLIDERS = true;
		if(this.attackBody != null) {
			this.attackBody.draw();
		}
	};

	this.wasHitBy = function(otherEntity) {
		if(stateManager.getCurrentState() === STATE.Block) {
			this.health -= (Math.ceil(otherEntity.getCurrentDamage() / 10));
		} else if(stateManager.getCurrentState() === STATE.KnockBack) {
		//do nothing for now
		} else {//just got hit
			stateManager.wasHit();

			velocity.y = -KNOCK_BACK_SPEED / 2;
			if(stateManager.getIsFacingLeft()) {
				velocity.x += KNOCK_BACK_SPEED;
			} else {
				velocity.x -= KNOCK_BACK_SPEED;
			}

			this.health -= otherEntity.getCurrentDamage();
		}

		if(this.health <= 0) {
			//enemyDefeatedSound.play();//TODO: get one of these
		} else {
			basicEnemyHitSound.play();
		}
	};

	this.didHit = function() {
		this.attackBody.isActive = false;
	};
}