//Player
function Player(config) {
	const SCALE = 2;
	const SCREEN_MARGIN = 10;
	const WALK_SPEED = 200;
	const JUMP_SPEED = -600;
	const KNOCK_BACK_SPEED = 800;

	const BASE_DAMAGE = 10;
	const DELTA_DAMAGE = 5;

	let stateManager;
	let hitBoxManager = new HitBoxManager(PlayerCollisionBodyData, PlayerAttackBodyData);

	let position = {x:0, y:0};
	let velocity = {x:0, y:0};

	this.type = ENTITY_TYPE.Player;
	this.health = 100;

	if(config != undefined) {
		if(config.x != undefined) {position.x = config.x;}
		if(config.y != undefined) {position.y = config.y;}
	}

	const initializeAnimations = function() {
		const anims = {};

		anims.idle = new SpriteAnimation(STATE.Idle, playerIdle, [0, 1], playerIdle.width / 2, playerIdle.height, [200], false, true);
		anims.walk = new SpriteAnimation(STATE.WalkRight, playerWalkFwd, [0, 1, 2], playerWalkFwd.width / 3, playerWalkFwd.height, [200], false, true);
		anims.dash = new SpriteAnimation(STATE.Dash, playerWalkBack, [0, 1, 2], playerWalkBack.width / 3, playerWalkBack.height, [50], false, false);
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

	stateManager = new StateManager(initializeAnimations(), true, null);
	this.collisionBody = hitBoxManager.bodyColliderForState(stateManager.getCurrentState(), position, SCALE, stateManager.getIsFacingLeft());
	this.attackBody = hitBoxManager.attackColliderForState(stateManager.getCurrentState(), position, SCALE, stateManager.getIsFacingLeft());

	this.getPosition = function() {
		return {x:position.x, y:position.y};
	};

	this.getVelocity = function () {
		return {x: velocity.x, y: velocity.y};
	};

	this.isMoving = function () {
		return velocity.x != 0 || velocity.y != 0;
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
		case STATE.WalkRight:
		case STATE.WalkLeft:
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
			return 1.25 * BASE_DAMAGE;
		case STATE.J_Kick:
			return 1.5 * BASE_DAMAGE;
		case STATE.Sweep:
			return 1.5 * BASE_DAMAGE;
		case STATE.H_Kick:
			return 2 * BASE_DAMAGE;
		}
	};

	this.setNewBelt = function(newBelt) {
		stateManager.setNewBelt(newBelt);
	};

	this.incrementBelt = function() {
		stateManager.incrementBelt();
	};

	this.reset = function() {
		velocity = {x:0, y:0};
	
		this.health = 100;
	
		if(config != undefined) {
			if(config.x != undefined) {position.x = config.x;}
			if(config.y != undefined) {position.y = config.y;}
		}

		stateManager.reset();
		this.collisionBody = hitBoxManager.bodyColliderForState(stateManager.getCurrentState(), position, SCALE, stateManager.getIsFacingLeft());
		this.attackBody = hitBoxManager.attackColliderForState(stateManager.getCurrentState(), position, SCALE, stateManager.getIsFacingLeft());
	};

	this.update = function(deltaTime, gravity, floorHeight, levelMin, levelMax) {
		stateManager.update(deltaTime);
		updateForState(stateManager.getCurrentState());

		if(stateManager.getIsNewState()) {
			this.collisionBody.points = hitBoxManager.bodyPointsForState(stateManager.getCurrentState(), position, SCALE, stateManager.getIsFacingLeft());
			this.attackBody = hitBoxManager.attackColliderForState(stateManager.getCurrentState(), position, SCALE, stateManager.getIsFacingLeft());
			if(this.attackBody != null) {
				this.attackBody.isActive = true;
			}
		}

		updatePosition(deltaTime, gravity, floorHeight, levelMin, levelMax);

		this.collisionBody.setPosition(position);//keep collider in sync with sprite position
		if(this.attackBody != null) {
			this.attackBody.setPosition(position);
		}
	};

	const updateForState = function(currentState) {
		switch(currentState) {
		case STATE.WalkRight:
			walkRight();
			break;
		case STATE.WalkLeft:
			walkLeft();
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

	const updatePosition = function(deltaTime, gravity, floorHeight, levelMin, levelMax) {
		const timeStep = deltaTime / 1000;//deltaTime is in milliseconds
		position.x += velocity.x * timeStep;

		if(position.x < levelMin + SCREEN_MARGIN) {
			position.x = levelMin + SCREEN_MARGIN;
		} else if(position.x > levelMax - SCREEN_MARGIN - stateManager.getCurrentAnimation().getWidth()) {
			position.x = levelMax - SCREEN_MARGIN - stateManager.getCurrentAnimation().getWidth();
		}

		fallDueToGravity(timeStep, gravity);

		if(velocity.y > 0) {
			if(position.y > floorHeight - stateManager.getCurrentAnimation().getHeight()) {
				position.y = floorHeight - stateManager.getCurrentAnimation().getHeight();
				velocity.y = 0;
				if(!stateManager.getIsOnGround()) {
					stateManager.didLand();
				}
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

	const walkRight = function() {
		velocity.x = WALK_SPEED;
	};


	const walkLeft = function() {
		velocity.x = -WALK_SPEED;
	};

	const jump = function() {
		if(stateManager.getIsNewState()) {
			velocity.y = JUMP_SPEED;
			playerJumpSound.play();
		}
	};

	const crouch = function() {
		console.log("I'm crouching now");
		if(stateManager.getIsNewState()) {
			//playerCrouchSound.play();
		}
	};

	const dash = function() {
		if(stateManager.getIsNewState()) {
			let speed = -4 * WALK_SPEED;
			if(stateManager.getIsFacingLeft()) {
				speed = 4 * WALK_SPEED;
			} 

			velocity.x = speed;
			//playerDashSound.play();
		}
	};

	const idle = function() {
		velocity.x = 0;
	};

	const block = function() {
		console.log("I'm blocking now");
		if(stateManager.getIsNewState()) {
			playerBlockSound.play();
		}
	};

	const punch = function() {
		if(stateManager.getIsNewState()) {
			velocity.x = 0;
			playerPunchSound.play();
		}
	};

	const kick = function() {
		if(stateManager.getIsNewState()) {
			velocity.x = 0;
			playerKickSound.play();
		}
	};

	const j_Kick = function() {
		console.log("Jump Kicking");
		if(stateManager.getIsNewState()) {
			playerKickSound.play();
		}
	};

	const h_kick = function() {
		console.log("Helicopter Kicking");
		if(stateManager.getIsNewState()) {
			//playerHelicopterKickSound.play();
		}
	};

	const sweep = function() {
		console.log("Sweeping !!!");
		if(stateManager.getIsNewState()) {
			//playerSweepSound.play();
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
			playerFailedSound.play();
			console.log("Your attempt failed.  Try again.");
			//TODO: Go to game over screen
		} else {
			playerHitSound.play();
		}
	};

	this.didHit = function() {
		this.attackBody.isActive = false;
	};
}