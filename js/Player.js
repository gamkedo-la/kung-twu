//Player
function Player(config) {
	const SCALE = 2;
	const WALK_SPEED = 200;
	const JUMP_SPEED = -500;
	const KNOCK_BACK_SPEED = 800;

	let health = 100;
	let currentDamage = 0;

	let stateManager;
	let hitBoxManager = new PlayerHitBoxManager();

	let position = {x:0, y:0};
	let velocity = {x:0, y:0};

	this.type = ENTITY_TYPE.Player;

	if(config != undefined) {
		if(config.x != undefined) {position.x = config.x;}
		if(config.y != undefined) {position.y = config.y;}
		if(config.hasDash != undefined) {hasDash = config.hasDash;}
		if(config.hasSweep != undefined) {hasSweep = config.hasSweep;}
		if(config.hasJumpKick != undefined) {hasJumpKick = config.hasJumpKick;}
		if(config.hasHelicopterKick != undefined) {hasHelicopterKick = config.hasHelicopterKick;}
	}

	const initializeAnimations = function() {
		const anims = {};

		anims.idle = new SpriteAnimation(STATE.Idle, playerIdle, [0, 1], playerIdle.width / 2, playerIdle.height, [200], false, true);
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

	stateManager = new StateManager(initializeAnimations(), true);
	this.collisionBody = hitBoxManager.bodyColliderForState(stateManager.getCurrentState(), position, stateManager.getIsFacingLeft());
	this.fistBox = null;//TODO: Need to create
	this.footBox = null;//TODO: Need to create

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
		return currentDamage;
	};

	this.setNewBelt = function(newBelt) {
		stateManager.setNewBelt(newBelt);
	};

	this.update = function(deltaTime, gravity, floorHeight) {
		stateManager.update(deltaTime);
		updateForState(stateManager.getCurrentState());

		if(stateManager.getIsNewState()) {
			this.collisionBody.points = hitBoxManager.bodyPointsForState(stateManager.getCurrentState(), position, stateManager.getIsFacingLeft());
		}

		updatePosition(deltaTime, gravity, floorHeight);

		this.collisionBody.setPosition(position);//keep collider in sync with sprite position
	};

	const updateForState = function(currentState) {
		switch(currentState) {
		case STATE.Walk:
			walk();
			break;
		case STATE.Jump:
			jump();
			break;
			/*case STATE.Crouch:
			crouch();
			break;
		case STATE.Dash:
			dash();
			break;*/
		case STATE.Idle:
			idle();
			break;
			/*case STATE.J_Kick:
			j_Kick();
			break;
		case STATE.Sweep:
			sweep();
			break;
		case STATE.H_Kick:
			h_kick();
			break;*/
		case STATE.Punch:
			punch();
			break;
		case STATE.Kick:
			kick();
			break;
			/*case STATE.Block:
			block();
			break;*/
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
			//playerJumpSound.play();
		}
	};

	const crouch = function() {
		console.log("I'm crouching now");
		if(stateManager.getIsNewState()) {
			//playerCrouchSound.play();
		}
	};

	const dash = function() {
		console.log("I'm dashing now");
		if(stateManager.getIsNewState()) {
			//playerDashSound.play();
		}
	};

	const idle = function() {
		velocity.x = 0;
	};

	const block = function() {
		console.log("I'm blocking now");
		if(stateManager.getIsNewState()) {
			//playerBlockSound.play();
		}
	};

	const punch = function() {
		if(stateManager.getIsNewState()) {
			playerPunchSound.play();
		}
	};

	const kick = function() {
		if(stateManager.getIsNewState()) {
			playerKickSound.play();
		}
	};

	const j_Kick = function() {
		console.log("Jump Kicking");
		if(stateManager.getIsNewState()) {
			//playerJumpKickSound.play();
		}
	};

	const h_kick = function() {
		console.log("Helicopter Kicking");
		if(stateManager.getIsNewState()) {
			//playerJumpKickSound.play();
		}
	};

	this.draw = function() {
		stateManager.drawAt(position.x, position.y);

		this.collisionBody.draw();//colliders know to draw only when DRAW_COLLIDERS = true;
	};

	this.didCollideWith = function(thiscollider, otherEntity) {
		if(thiscollider === this.collisionBody) {
			wasHit(otherEntity);
		} else {
			didHit();
		}
	};

	const didHit = function() {
		console.log("Hit another student!");
	};

	const wasHit = function(otherEntity) {
		if(stateManager.getCurrentState() === STATE.Block) {
			health -= (Math.ceil(otherEntity.getCurrentDamage() / 10));
		} else if(stateManager.getCurrentState() === STATE.KnockBack) {
		//do nothing for a minute
		} else {//just got hit
			stateManager.wasHit();

			health -= otherEntity.getCurrentDamage();

			velocity.y = -KNOCK_BACK_SPEED / 2;
			if(stateManager.getIsFacingLeft()) {
				velocity.x += KNOCK_BACK_SPEED;
			} else {
				velocity.x -= KNOCK_BACK_SPEED;
			}
		}

		if(health <= 0) {
			console.log("Your attempt failed.  Try again.");
			//TODO: Go to game over screen
		}
	};
}