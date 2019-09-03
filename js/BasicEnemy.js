//Basic Enemy
function BasicEnemy(config) {
	const SCALE = 2;
	const WALK_SPEED = 200;
	const JUMP_SPEED = -300;
	const ATTACK_RANGE = 100;

	let currentDamage = 0;
	let currentAnimation;
	let position = {x:0, y:0};
	let velocity = {x:0, y:0};
	let health = 10;
	
	let isFacingLeft = true;
	let isOnGround = true;
	let isCrouching = false;
	let isBlocking = false;
	let isDashing = false;
	
	let hasDash = false;
	let hasSweep = false;
	let hasJumpKick = false;
	let hasHelicopterKick = false;

	this.type = ENTITY_TYPE.BasicEnemy;
	this.collisionBody;//initialized down below definition of buildBodyCollider() function

	if(config != undefined) {
		if(config.x != undefined) {position.x = config.x;}
		if(config.y != undefined) {position.y = config.y;}
		if(config.hasDash != undefined) {hasDash = config.hasDash;}
		if(config.hasSweep != undefined) {hasSweep = config.hasSweep;}
		if(config.hasJumpKick != undefined) {hasJumpKick = config.hasJumpKick;}
		if(config.hasHelicopterKick != undefined) {hasHelicopterKick = config.hasHelicopterKick;}
		if(config.health != undefined) {health = config.health;}
	}

	this.getPosition = function() {
		return {x:position.x, y:position.y};
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

	this.update = function(deltaTime, gravity, playerPos, floorHeight) {
		currentAnimation.update(deltaTime);

		const timeStep = deltaTime / 1000;//deltaTime is in milliseconds

		position.x += velocity.x * timeStep;
		
		fallDueToGravity(timeStep, gravity);

		//TODO: Temporary to keep player from falling off the canvas
		if(position.y > floorHeight - currentAnimation.getHeight()) {
			position.y = floorHeight - currentAnimation.getHeight();
			isOnGround = true;
		}		

		doAI(playerPos);

		this.collisionBody.setPosition(position);//keep collider in sync with sprite position
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
		currentDamage = 0;
		isFacingLeft = true;
	};

	const moveRight = function() {
		position.x += 10;
		currentDamage = 0;
		isFacingLeft = false;
	};

	const jump = function() {
		if(isOnGround) {
			isOnGround = false;
			//currentAnimation = animations.jumping;
			currentDamage = 0;
		}
	};

	const crouch = function() {
		if(isOnGround && !isCrouching) {
			console.log("I'm crouching now");
			isCrouching = true;
			//currentAnimation = animations.crouching;
			currentDamage = 0;
		}
	};

	const block = function() {
		if(isOnGround && !isBlocking) {
			console.log("I'm blocking now");
			isBlocking = true;
			//currentAnimation = animations.blocking;
			currentDamage = 0;
		}
	};

	const dash = function() {
		if(isOnGround && hasDash && !isDashing) {
			console.log("I'm dashing now");
			isDashing = true;
			//currentAnimation = animations.dashing;
			currentDamage = 0;
		}
	};

	const punch = function() {
		if((currentAnimation === animations.punching) && (!currentAnimation.isFinished())) {
			return;
		} else {
			console.log("Trying to punch");
			//currentAnimation = animations.punching;
			currentDamage = 10;
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
				currentDamage = 40;
			} else if(hasJumpKick) {
				console.log("Jump Kick");
				//currentAnimation = animations.jumpKicking;
				currentDamage = 30;
			} else if(hasSweep) {
				console.log("Sweep");
				//currentAnimation = animations.sweeping;
				currentDamage = 20;
			}
		}
	};

	this.draw = function() {
		currentAnimation.drawAt(position.x, position.y, isFacingLeft);

		this.collisionBody.draw();//colliders know to draw only when DRAW_COLLIDERS = true;
	};

	const initializeAnimations = function() {
		const anims = {};

		anims.idle = new SpriteAnimation("idle", tempEnemyIdlePic, [0, 1], tempEnemyIdlePic.width / 2, tempEnemyIdlePic.height, [200], false, true);
		//anims.jumping = ...
		//anims.crouching = ...
		//anims.punching = ...
		//anims.kicking = ...
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
        (!currentAnimation.isFinished())) {
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

	this.didCollideWith = function(thiscollider, otherEntity) {
		currentDamage = 10;//TODO: Remove this once enemies can attack
		if(isBlocking) {
			health -= (Math.ceil(otherEntity.getCurrentDamage() / 10));
		} else {
			health -= otherEntity.getCurrentDamage();
		}
		
		if(health <= 0) {
			console.log("Enemy defeated.");
		}
	};
}