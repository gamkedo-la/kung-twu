//Player
function Player(config) {
	const SCALE = 2;
	const SCREEN_MARGIN = 10;
	const WALK_SPEED = 200;
	const JUMP_SPEED = -600;
	const KNOCK_BACK_SPEED = 800;
	const INVINCIBLE_DURATION = 1000;
	let invincibleTime = 0;
	let isInvincible = false;

	const BASE_DAMAGE = 10;
	const DELTA_DAMAGE = 5;

	let stateManager;
	let hitBoxManager = new HitBoxManager(
		PlayerCollisionBodyData,
		PlayerAttackBodyData);

	let position = { x: 0, y: 0 };
	let velocity = { x: 0, y: 0 };

	this.type = ENTITY_TYPE.Player;
	this.health = MAX_PLAYER_HEALTH;

	if (config != undefined) {
		if (config.x != undefined) {
			position.x = config.x;
		}
		if (config.y != undefined) {
			position.y = config.y;
		}
	}

	const animations = animationManager.getAnimationsFor(RIVAL_TYPE.player, BELT.White, SCALE);
	stateManager = new StateManager(animations, BELT.White, AITYPE.Player);

	this.collisionBody = hitBoxManager.bodyColliderForState(
		stateManager.getCurrentState(),
		position,
		SCALE,
		stateManager.getIsFacingLeft());

	this.attackBody = hitBoxManager.attackColliderForState(
		stateManager.getCurrentState(),
		position,
		SCALE,
		stateManager.getIsFacingLeft());

	this.getPosition = function() {
		return { x: position.x, y: position.y };
	};

	this.getVelocity = function() {
		return { x: velocity.x, y: velocity.y };
	};

	this.isMoving = function() {
		return velocity.x != 0 || velocity.y != 0;
	};

	this.getWidth = function() {
		return stateManager.getCurrentAnimation().getWidth();
	};

	this.getHeight = function() {
		return stateManager.getCurrentAnimation().getHeight();
	};

	this.getCurrentDamage = function() {
		return damageForState() + stateManager.getCurrentBelt() * DELTA_DAMAGE;
	};

	const damageForState = function() {
		const aState = stateManager.getCurrentState();
		switch (aState) {
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
			return 1.5 * BASE_DAMAGE;
		case STATE.J_Kick:
			return 2.0 * BASE_DAMAGE;
		case STATE.Sweep:
			return 2.0 * BASE_DAMAGE;
		case STATE.H_Kick:
			return 2.5 * BASE_DAMAGE;
		}
	};

	this.setNewBelt = function(newBelt) {
		stateManager.setNewBelt(newBelt);
	};

	this.incrementBelt = function() {
		stateManager.incrementBelt();
	};

	this.quit = function() {
		stateManager.quit();

		if (config != undefined) {
			if (config.x != undefined) {
				position.x = config.x;
			}
			if (config.y != undefined) {
				position.y = config.y;
			}
		}

		this.reset(position);
	};

	this.reset = function(startPos) {
		velocity = { x: 0, y: 0 };

		this.health = 100;

		position.x = startPos.x;
		position.y = startPos.y;

		stateManager.reset();
		this.collisionBody = hitBoxManager.bodyColliderForState(
			stateManager.getCurrentState(),
			position,
			SCALE,
			stateManager.getIsFacingLeft());

		this.attackBody = hitBoxManager.attackColliderForState(
			stateManager.getCurrentState(),
			position,
			SCALE,
			stateManager.getIsFacingLeft());
	};

	this.update = function(deltaTime, gravity, floorHeight, levelMin, levelMax) {
		if(isInvincible) {
			invincibleTime += deltaTime;
			if(invincibleTime >= INVINCIBLE_DURATION) {
				isInvincible = false;
				invincibleTime = 0;
			}
		}

		stateManager.update(deltaTime);
		updateForState(stateManager.getCurrentState());

		if (stateManager.getIsNewState()) {
			this.collisionBody.points = hitBoxManager.bodyPointsForState(
				stateManager.getCurrentState(),
				position,
				SCALE,
				stateManager.getIsFacingLeft());

			this.attackBody = hitBoxManager.attackColliderForState(
				stateManager.getCurrentState(),
				position,
				SCALE,
				stateManager.getIsFacingLeft());
		}

		if(this.attackBody != null) {
			const thisState = stateManager.getCurrentState();
			const currentFrame = stateManager.getCurrentAnimationFrame();
			this.attackBody.isActive = hitBoxManager.attackColliderIsActiveFor(thisState, currentFrame);
		}

		updatePosition(deltaTime, gravity, floorHeight, levelMin, levelMax);

		this.collisionBody.setPosition(position); //keep collider in sync with sprite position
		if (this.attackBody != null) {
			this.attackBody.setPosition(position);
		}
	};

	const updateForState = function(currentState) {
		switch (currentState) {
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
		const timeStep = deltaTime / 1000; //deltaTime is in milliseconds

		if((velocity.x > 0) && (stateManager.getIsFacingLeft())) {
			velocity.x = -velocity.x;
		} else if((velocity.x < 0) && (!stateManager.getIsFacingLeft())) {
			velocity.x = -velocity.x;
		}

		position.x += velocity.x * timeStep;
		const animWidth = stateManager.getCurrentAnimation().getWidth();
		const animHeight = stateManager.getCurrentAnimation().getHeight();

		if (position.x < levelMin + SCREEN_MARGIN) {
			position.x = levelMin + SCREEN_MARGIN;
		} else if (position.x > levelMax - SCREEN_MARGIN - animWidth) {
			position.x = levelMax - SCREEN_MARGIN - animWidth;
		}

		fallDueToGravity(timeStep, gravity);

		if (velocity.y > 0) {
			if (position.y > floorHeight - animHeight) {
				position.y = floorHeight - animHeight;
				velocity.y = 0;
				if (!stateManager.getIsOnGround()) {
					stateManager.didLand();
				}
			}
		}
	};

	const respondToKnockBack = function() {
		if(velocity.x < 0) {
			velocity.x += KNOCK_BACK_SPEED / 25;
			if (velocity.x >= 0) {
				velocity.x = 0;
			}
		} else if(velocity.x > 0) {
			velocity.x -= KNOCK_BACK_SPEED / 25;
			if (velocity.x <= 0) {
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
		if (stateManager.getIsNewState()) {
			velocity.y = JUMP_SPEED;
			playerJumpSound.play();
		}
	};

	const crouch = function() {
		console.log("I'm crouching now");
		if (stateManager.getIsNewState()) {
			//playerCrouchSound.play();
		}
	};

	const dash = function() {
		if (stateManager.getIsNewState()) {
			let speed = -4 * WALK_SPEED;
			if (stateManager.getIsFacingLeft()) {
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
		if (stateManager.getIsNewState()) {
			playerBlockSound.play();
		}
	};

	const punch = function() {
		if (stateManager.getIsNewState()) {
			velocity.x = 0;
			playerPunchSound.play();
			if (wooshFX) wooshFX.triggerPunch(position,stateManager.getIsFacingLeft());
		}
	};

	const kick = function() {
		if (stateManager.getIsNewState()) {
			velocity.x = 0;
			playerKickSound.play();
			if (wooshFX) wooshFX.triggerKick(position,stateManager.getIsFacingLeft());
		}
	};

	const j_Kick = function() {
		console.log("Jump Kicking");
		if (stateManager.getIsNewState()) {
			playerKickSound.play();
			if (wooshFX) wooshFX.triggerJKick(position,stateManager.getIsFacingLeft());
		}
	};

	const h_kick = function() {
		console.log("Helicopter Kicking");
		if (stateManager.getIsNewState()) {
			//playerHelicopterKickSound.play();
			if (wooshFX) wooshFX.triggerHKick(position,stateManager.getIsFacingLeft());
		}
	};

	const sweep = function() {
		console.log("Sweeping !!!");
		if (stateManager.getIsNewState()) {
			//playerSweepSound.play();
			velocity.x = 0;
			if (wooshFX) wooshFX.triggerSweep(position,stateManager.getIsFacingLeft(),wooshKickPic);
		}
	};

	this.draw = function() {
		if((isInvincible) && (invincibleTime % 200 < 50)) {
			//do nothing for now
		} else{
			stateManager.drawAt(position.x, position.y);
		}

		this.collisionBody.draw(); //colliders know to draw only when DRAW_COLLIDERS = true;
		if (this.attackBody != null) {
			this.attackBody.draw();
		}
	};

	this.wasHitBy = function(otherEntity) {
		if(isInvincible) {return;}

		if (stateManager.getCurrentState() === STATE.Block) {
			this.health -= Math.ceil(otherEntity.getCurrentDamage() / 10);
		} else if (stateManager.getCurrentState() === STATE.KnockBack) {
			//do nothing for now
		} else {
			//just got hit
			stateManager.wasHit();
			isInvincible = true;

			velocity.y = -KNOCK_BACK_SPEED / 2;
			if(otherEntity.getPosition().x < position.x) {
				velocity.x = KNOCK_BACK_SPEED;
			} else if(otherEntity.getPosition().x > position.x){
				velocity.x = -KNOCK_BACK_SPEED;
			} else if(stateManager.getIsFacingLeft()) {
				velocity.x = KNOCK_BACK_SPEED;
			} else {
				velocity.x = -KNOCK_BACK_SPEED;
			}

			this.health -= otherEntity.getCurrentDamage();
		}

		if (this.health <= 0) {
			this.health = 0;
			playerFailedSound.play();
		} else {
			playerHitSound.play();
		}
	};

	this.didHit = function() {
		this.attackBody = null;
	};
}
