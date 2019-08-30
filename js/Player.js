//Player
function Player(config) {
	const SCALE = 2;
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
		updateAnimation(deltaTime);
		this.collisionBody.points = getColliderPoints();

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

		if(position.y > floorHeight - currentAnimation.getHeight()) {
			position.y = floorHeight - currentAnimation.getHeight();
			velocity.y = 0;
			isOnGround = true;
		}

		this.collisionBody.setPosition(position);//keep collider in sync with sprite position
	};

	const updateAnimation = function(deltaTime) {
		currentAnimation.update(deltaTime);
		
		if(currentAnimation.isFinished()) {
			currentAnimation.reset();
			currentAnimation = animations.idle;
		}
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
		let stillPunching = false;
		let stillKicking = false;
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
				stillPunching = true;
				punch();
				break;
			case ALIAS.KICK:
				stillKicking = true;
				kick();
				break;
			}
		}

		if (getAxis(HORIZONTAL_AXIS) < 0) {
			stillWalking = true;
			walk(-WALK_SPEED);
			isFacingLeft = true;
		} else if (getAxis(HORIZONTAL_AXIS) > 0) {
			stillWalking = true;
			walk(WALK_SPEED);
			isFacingLeft = false;
		}

		if (getAxis(VERTICAL_AXIS) < 0) {
			jump();
		}

		if(!stillCrouching) {isCrouching = false;}
		if(!stillBlocking) {isBlocking = false;}
		if(!stillDashing) {isDashing = false;}
		if((!stillWalking) && (!stillPunching) && (!stillKicking)) {
			walk(0);
		}
	};

	const walk = function(speed) {
		velocity.x = speed;

		if(speed == 0) {
			currentAnimation = animations.idle;
		} else {
			currentAnimation = animations.walkingFwd;
		}
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
		if(isOnGround && !isBlocking) {
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
		console.log("Punching");
		if((currentAnimation === animations.punching) && (!currentAnimation.isFinished())) {
			return;
		} else {
			currentAnimation = animations.punching;
			playerPunchSound.play();
		}
	};

	const kick = function() {
		console.log("Kicking");
		if(isStillKicking()) {return;}

		if(isOnGround) {
			currentAnimation = animations.kicking;
			playerKickSound.play();
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
		let deltaXForFacing = 0;
		if(isFacingLeft) {
			deltaXForFacing = (animations.idle.getWidth() - currentAnimation.getWidth());
		}

		currentAnimation.drawAt(position.x + deltaXForFacing, position.y, isFacingLeft);

		this.collisionBody.draw();//colliders know to draw only when DRAW_COLLIDERS = true;
	};

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
        (!currentAnimation.isFinished())) {
			return true;
		} else {
			return false;
		}
	};

	const getColliderPoints = function() {
		let deltaXForFacing = 0;
		if(isFacingLeft) {
			deltaXForFacing = (animations.idle.getWidth() - currentAnimation.getWidth());
		}

		const points = [];
		points.push({x:position.x + deltaXForFacing, y:position.y});
		points.push({x:position.x + deltaXForFacing, y:position.y + currentAnimation.getHeight()});
		points.push({x:position.x + deltaXForFacing + currentAnimation.getWidth(), y:position.y + currentAnimation.getHeight()});
		points.push({x:position.x + deltaXForFacing + currentAnimation.getWidth(), y:position.y});

		return points;
	};

	const buildBodyCollider = function() {
		const colliderType = ColliderType.Polygon;
		const colliderData = {};
		colliderData.position = position;

		points = getColliderPoints();

		colliderData.points = points;

		return new Collider(colliderType, colliderData);
	};

	const initializeAnimations = function() {
		const anims = {};

		anims.idle = new SpriteAnimation("idle", playerIdle, [0, 1], playerIdle.width / 2, playerIdle.height, [200], false, true);
		anims.walkingFwd = new SpriteAnimation("walk_fwd", playerWalkFwd, [0, 1, 2], playerWalkFwd.width / 3, playerIdle.height, [200], false, true);
		anims.walkingBack = new SpriteAnimation("walk_back", playerWalkBack, [0, 1, 2], playerWalkBack.width / 3, playerIdle.height, [200], false, true);
		//anims.jumping = ...
		//anims.crouching = ...
		anims.punching = new SpriteAnimation("punching", playerPunch, [0, 1, 2, 1], playerPunch.width / 3, playerPunch.height, [50, 100, 125, 50], false, false);
		anims.kicking = new SpriteAnimation("kicking", playerKick, [0, 1, 2, 1], playerKick.width  / 3, playerKick.height, [50, 100, 125, 50], false, false);
		//anims.blocking = ...
		//anims.dashing = ...
		//anims.sweeping = ...
		//anims.jumpKicking = ...
		//anims.helicopterKicking = ...

		const animationKeys = Object.keys(anims);
		for(let i = 0; i < animationKeys.length; i++) {
			anims[animationKeys[i]].scale = SCALE;
		}

		return anims;
	};
	const animations = initializeAnimations();
	currentAnimation = animations.idle;
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