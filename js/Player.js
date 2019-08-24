//Player
function Player(config) {
	const SCALE = 1;
	const WALK_SPEED = 200;
	const JUMP_SPEED = -300;

	let health = 100;
	let currentDamage = 0;

	let currentAnimation;
	let position = {x:0, y:0};
	let velocity = {x:0, y:0};

	let isFacingLeft = true;
	let isOnGround = true;
	let isCrouching = false;
	let isBlocking = false;
	let isDashing = false;
	let isKnockingBack = false;

	let hasDash = false;
	let hasSweep = false;
	let hasJumpKick = false;
	let hasHelicopterKick = false;

	this.type = ENTITY_TYPE.Player;
	this.collisionBody;//initialized down below definition of buildBodyCollider() function
	this.fistBox = null;//TODO: Need to create
	this.footBox = null;//TODO: Need to create

	if(config != undefined) {
		if(config.x != undefined) {position.x = config.x;}
		if(config.y != undefined) {position.y = config.y;}
		if(config.hasDash != undefined) {hasDash = config.hasDash;}
		if(config.hasSweep != undefined) {hasSweep = config.hasSweep;}
		if(config.hasJumpKick != undefined) {hasJumpKick = config.hasJumpKick;}
		if(config.hasHelicopterKick != undefined) {hasHelicopterKick = config.hasHelicopterKick;}
	}

	this.update = function(deltaTime, gravity, floorHeight) {
		currentAnimation.update(deltaTime);

		if(!isKnockingBack) {
			processInput();
		} else {
			if(isFacingLeft) {
				velocity.x -= 10;
				if(velocity.x <= 0) {
					velocity.x = 0;
				}
			} else {
				velocity.x += 10;
				if(velocity.x >= 0) {
					velocity.x = 0;
				}
			}

			if((velocity.x == 0) && (isOnGround)) {
				isKnockingBack = false;
			}
		}

		const timeStep = deltaTime / 1000;//deltaTime is in milliseconds

		position.x += velocity.x * timeStep;

		fallDueToGravity(timeStep, gravity);

		//TODO: Temporary to keep player from falling off the canvas
		if(position.y > floorHeight - currentAnimation.getHeight()) {
			position.y = floorHeight - currentAnimation.getHeight();
			velocity.y = 0;
			isOnGround = true;
		}

		this.collisionBody.setPosition(position);//keep collider in sync with sprite position
	};

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
		return currentAnimation.getWidth();
	};

	this.getHeight = function() {
		return currentAnimation.getHeight();
	};

	this.getCurrentDamage = function() {
		return currentDamage;
	};

	const fallDueToGravity = function(timeStep, gravity) {
		velocity.y += gravity * timeStep;
		position.y += velocity.y * timeStep;
	};

	const processInput = function() {
		let stillCrouching = false;
		let stillBlocking = false;
		let stillDashing = false;
		let stillWalking = false;

		for(let i = 0; i < heldButtons.length; i++) {
			switch(heldButtons[i]) {
			case ALIAS.LEFT:
				stillWalking = true;
				walk(-WALK_SPEED);
				isFacingLeft = true;
				break;
			case ALIAS.RIGHT:
				stillWalking = true;
				walk(WALK_SPEED);
				isFacingLeft = false;
				break;
			case ALIAS.JUMP:
				jump();
				break;
			case ALIAS.CROUCH:
				stillCrouching = true;
				crouch();
				break;
			case ALIAS.BLOCK:
				stillBlocking = true;
				block();
				break;
			case ALIAS.DASH:
				stillDashing = true;
				dash();
				break;
			case ALIAS.PUNCH:
				punch();
				break;
			case ALIAS.KICK:
				kick();
				break;
			}
		}

		if (gamepadAPI.buttons.held(PAD_ALIAS.LEFT)) {
			stillWalking = true;
			walk(-WALK_SPEED);
			isFacingLeft = true;
		} else if (gamepadAPI.buttons.held(PAD_ALIAS.RIGHT)) {
			stillWalking = true;
			walk(WALK_SPEED);
			isFacingLeft = false;
		} else if (gamepadAPI.buttons.held(PAD_ALIAS.UP)) {
			jump()
		}

		if(!stillCrouching) {isCrouching = false;}
		if(!stillBlocking) {isBlocking = false;}
		if(!stillDashing) {isDashing = false;}
		if(!stillWalking) {walk(0);}
	};

	const walk = function(speed) {
		velocity.x = speed;
	};

	const jump = function() {
		if(isOnGround) {
			isOnGround = false;
			velocity.y = JUMP_SPEED;
			//currentAnimation = animations.jumping;
		}
	};

	const crouch = function() {
		if(isOnGround && !isCrouching) {
			console.log("I'm crouching now");
			isCrouching = true;
			//currentAnimation = animations.crouching;
		}
	};

	const block = function() {
		if(isOnGround && hasBlock && !isBlocking) {
			console.log("I'm blocking now");
			isBlocking = true;
			//currentAnimation = animations.blocking;
		}
	};

	const dash = function() {
		if(isOnGround && hasDash && !isDashing) {
			console.log("I'm dashing now");
			isDashing = true;
			//currentAnimation = animations.dashing;
		}
	};

	const punch = function() {
		if((currentAnimation === animations.punching) && (!currentAnimation.isFinished)) {
			return;
		} else {
			console.log("Trying to punch");
			//currentAnimation = animations.punching;
		}
	};

	const kick = function() {
		if(isStillKicking()) {return;}

		console.log("Trying to kick");
		if(isOnGround) {
			//currentAnimation = animations.kicking;
		} else {
			if(hasHelicopterKick && isHoldingLeftorRight()) {
				console.log("Helicopter Kick!!!!");
				//currentAnimation = animations.helicopterKicking;
			} else if(hasJumpKick) {
				console.log("Jump Kick");
				//currentAnimation = animations.jumpKicking;
			} else if(hasSweep) {
				console.log("Sweep");
				//currentAnimation = animations.sweeping;
			}
		}
	};

	this.draw = function() {
		currentAnimation.drawAt(position.x, position.y);

		this.collisionBody.draw();//colliders know to draw only when DRAW_COLLIDERS = true;
	};

	const initializeAnimations = function() {
		const anims = {};

		anims.idle = new SpriteAnimation("idle", tempPlayerPic, [0], tempPlayerPic.width * SCALE, tempPlayerPic.height * SCALE, [64], false, true);
		anims.idle.SCALE = SCALE;
		//animations.jumping = ...
		//animations.crouching = ...
		//animations.punching = ...
		//animations.kicking = ...
		//animations.blocking = ...
		//animations.dashing = ...
		//animations.sweeping = ...
		//animations.jumpKicking = ...
		// animations.helicopterKicking = ...

		return anims;
	};
	const animations = initializeAnimations();
	currentAnimation = animations.idle;

	const isHoldingLeftorRight = function() {
		for(let i = 0; i < heldButtons.length; i++) {
			if(heldButtons[i] === ALIAS.LEFT || gamepadAPI.buttons.held(PAD_ALIAS.LEFT)) {
				return true;
			} else if(heldButtons[i] === ALIAS.RIGHT || gamepadAPI.buttons.held(PAD_ALIAS.RIGHT)) {
				return true;
			}
		}

		return false;
	};

	const isStillKicking = function() {
		if(((currentAnimation === animations.kicking) ||
        (currentAnimation === animations.sweeping) ||
        (currentAnimation === animations.jumpKicking) ||
        (currentAnimation === animations.helicopterKicking)) &&
        (!currentAnimation.isFinished)) {
			return true;
		} else {
			return false;
		}
	};

	const buildBodyCollider = function() {
		const colliderType = ColliderType.Polygon;
		const colliderData = {};
		colliderData.position = position;

		const points = [];
		points.push({x:position.x, y:position.y});
		points.push({x:position.x, y:position.y + currentAnimation.getHeight()});
		points.push({x:position.x + currentAnimation.getWidth(), y:position.y + currentAnimation.getHeight()});
		points.push({x:position.x + currentAnimation.getWidth(), y:position.y});

		colliderData.points = points;

		return new Collider(colliderType, colliderData);
	};
	this.collisionBody = buildBodyCollider();

	this.didCollideWith = function(otherEntity) {
		if(isBlocking) {
			health -= (Math.ceil(otherEntity.getCurrentDamage() / 10));
		} else {
			health -= otherEntity.getCurrentDamage();

			isKnockingBack = true;

			velocity.y = -150;
			isOnGround = false;
			if(isFacingLeft) {
				velocity.x += 150;
			} else {
				velocity.x -= 150;
			}
		}

		if(health <= 0) {
			console.log("Your attempt failed.  Try again.");
			//TODO: Go to game over screen
		}
	};
}