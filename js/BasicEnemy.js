//Basic Enemy
function BasicEnemy(config) {
	const SCALE = 1;
	const WALK_SPEED = 200;
	const JUMP_SPEED = -300;
	const ATTACK_RANGE = 100;

	let currentAnimation;
	let position = {x:0, y:0};
	let velocity = {x:0, y:0};
    
	let isOnGround = true;
	let isCrouching = false;
	let isBlocking = false;
	let isDashing = false;
	
	let hasDash = false;
	let hasSweep = false;
	let hasJumpKick = false;
	let hasHelicopterKick = false;

	if(config != undefined) {
		if(config.x != undefined) {position.x = config.x;}
		if(config.y != undefined) {position.y = config.y;}
		if(config.hasDash != undefined) {hasDash = config.hasDash;}
		if(config.hasSweep != undefined) {hasSweep = config.hasSweep;}
		if(config.hasJumpKick != undefined) {hasJumpKick = config.hasJumpKick;}
		if(config.hasHelicopterKick != undefined) {hasHelicopterKick = config.hasHelicopterKick;}
	}

	this.update = function(deltaTime, gravity, playerPos) {
		currentAnimation.update(deltaTime);

		const timeStep = deltaTime / 1000;//deltaTime is in milliseconds

		position.x += velocity.x * timeStep;
		
		fallDueToGravity(timeStep, gravity);

		//TODO: Temporary to keep player from falling off the canvas
		if(position.y > canvas.height - currentAnimation.getHeight()) {
			position.y = canvas.height - currentAnimation.getHeight();
			isOnGround = true;
		}		

		doAI(playerPos);
	};

	const fallDueToGravity = function(timeStep, gravity) {
		velocity.y += gravity * timeStep;
		position.y += velocity.y * timeStep;
	};

	const doAI = function(playerPos) {
		let stillCrouching = false;
		let stillBlocking = false;
		let stillDashing = false;

		if(playerPos.x > position.x + ATTACK_RANGE) {
			moveRight();
		} else if(playerPos.x < position.x - ATTACK_RANGE) {
			moveLeft();
		} else {
			//TODO: Logic to determine what kind of attack to do
		}

		if(!stillCrouching) {isCrouching = false;}
		if(!stillBlocking) {isBlocking = false;}
		if(!stillDashing) {isDashing = false;}
	};

	const moveLeft = function() {
		position.x -= 10;
	};

	const moveRight = function() {
		position.x += 10;
	};

	const jump = function() {
		if(isOnGround) {
			isOnGround = false;
			//currentAnimation = animations.jumping;
			console.log("Need to jump now, also need some gravity to make you land");
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

	this.draw = function(deltaTime) {
		currentAnimation.drawAt(position.x, position.y);
	};

	const initializeAnimations = function() {
		const anims = {};

		anims.idle = new SpriteAnimation("idle", tempEnemyPic, [0], tempEnemyPic.width * SCALE, tempEnemyPic.height * SCALE, [64], false, true);
		anims.idle.SCALE = SCALE;
		//animations.jumping = ...
		//animations.crouching = ...
		//animations.punching = ...
		//animations.kicking = ...
		//animations.blocking = ...
		//animations.dashing = ...
		//animations.sweeping = ...
		//animations.jumpKicking = ...
		//animations.helicopterKicking = ...

		return anims;
	};
	const animations = initializeAnimations();
	currentAnimation = animations.idle;

	const isHoldingLeftorRight = function() {
		for(let i = 0; i < heldButtons.length; i++) {
			if(heldButtons[i] === ALIAS.LEFT) {
				return true;
			} else if(heldButtons[i] === ALIAS.RIGHT) {
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
}