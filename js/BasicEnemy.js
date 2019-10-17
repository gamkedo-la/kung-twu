//Basic Enemy
function BasicEnemy(config) {
	const WALK_SPEED = 250;
	const JUMP_SPEED = -600;
	const KNOCK_BACK_SPEED = 800;

	let BASE_DAMAGE = null;
	const DELTA_DAMAGE = 5;

	let scale = 2;
	let stateManager;
	let hitBoxManager = new HitBoxManager(BasicEnemyCollisionBodyData, PlayerAttackBodyData);

	let position = {x:0, y:0};
	let velocity = {x:0, y:0};

	let baseHealth = localStorageHelper.getInt(localStorageKey.BaseEnemyHealth);
	if((baseHealth === undefined) || (baseHealth === null) || (isNaN(baseHealth))) {
		baseHealth = ASSIST_DEFAULT.BaseEnemyHealth;
		localStorageHelper.setInt(localStorageKey.BaseEnemyHealth, baseHealth);
	}
	this.health = null;//initialized when first hit by player
	this.score = 100;
	
	this.type = ENTITY_TYPE.Enemy;
	this.collisionBody;//initialized down below definition of buildBodyCollider() function

	if(config != undefined) {
		if(config.x != undefined) {position.x = config.x;}
		if(config.y != undefined) {position.y = config.y;}
		if(config.health != undefined) {this.health = config.health;}
		if(config.scale != undefined) {scale = config.scale;}

		let belt = BELT.White;
		if(config.belt != undefined) {belt = config.belt;}
		let rivalType = RIVAL_TYPE.basic;
		if(config.rivalType != undefined) {rivalType = config.rivalType;}
		let aiType = AITYPE.Standard;
		if(config.aiType != undefined) {aiType = config.aiType;}

		const animations = animationManager.getAnimationsFor(rivalType, belt, scale);
		stateManager = new StateManager(animations, belt, aiType);
	} else {
		const animations = animationManager.getAnimationsFor(RIVAL_TYPE.basic, BELT.White, scale);
		stateManager = new StateManager(animations, BELT.White, AITYPE.Standard);
	}	
	
	const scoreForBelt = function(belt) {
		return (100 + belt * 50);
	};

	this.score = scoreForBelt(stateManager.getCurrentBelt());
	this.collisionBody = hitBoxManager.bodyColliderForState(stateManager.getCurrentState(), position, scale, stateManager.getIsFacingLeft());
	this.attackBody = hitBoxManager.attackColliderForState(stateManager.getCurrentState(), position, scale, stateManager.getIsFacingLeft());

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
		if(BASE_DAMAGE === null) {
			if(this.getAIType() === AITYPE.Boss) {
				BASE_DAMAGE = localStorageHelper.getInt(localStorageKey.BossStrength);
				if((BASE_DAMAGE === undefined) || (BASE_DAMAGE === null) || (isNaN(BASE_DAMAGE))) {
					BASE_DAMAGE = ASSIST_DEFAULT.BossBaseStrength;
					localStorageHelper.setInt(localStorageKey.BossStrength, BASE_DAMAGE);
				}
			} else {
				BASE_DAMAGE = localStorageHelper.getInt(localStorageKey.EnemyStrength);
				if((BASE_DAMAGE === undefined) || (BASE_DAMAGE === null) || (isNaN(BASE_DAMAGE))) {
					BASE_DAMAGE = ASSIST_DEFAULT.EnemyBaseStrength;
					localStorageHelper.setInt(localStorageKey.EnemyStrength, BASE_DAMAGE);
				}	
			}
		}

		return (damageForState() + stateManager.getCurrentBelt() * DELTA_DAMAGE);
	};

	this.getBelt = function() {
		return stateManager.getCurrentBelt();
	};

	this.getAIType = function() {
		return stateManager.getAIType();
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

	this.update = function(deltaTime, gravity, playerPos, minX, maxX, floorHeight, shouldAttack) {
		const distToPlayer = playerPos.x - position.x;
		stateManager.update(deltaTime, distToPlayer, shouldAttack);
		updateForState(stateManager.getCurrentState());

		if(stateManager.getIsNewState()) {
			this.collisionBody.points = hitBoxManager.bodyPointsForState(stateManager.getCurrentState(), position, scale, stateManager.getIsFacingLeft());
			this.attackBody = hitBoxManager.attackColliderForState(stateManager.getCurrentState(), position, scale, stateManager.getIsFacingLeft());
		}

		if(this.attackBody != null) {
			const thisState = stateManager.getCurrentState();
			const currentFrame = stateManager.getCurrentAnimationFrame();
			this.attackBody.isActive = hitBoxManager.attackColliderIsActiveFor(thisState, currentFrame);
		}

		updatePosition(deltaTime, minX, maxX, gravity, floorHeight);

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

	const updatePosition = function(deltaTime, minX, maxX, gravity, floorHeight) {
		const timeStep = deltaTime / 1000;//deltaTime is in milliseconds

		position.x += velocity.x * timeStep;
		if(position.x < minX) {
			position.x = minX;
		} else if(position.x > maxX) {
			position.x = maxX;
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

		if (wooshFX) wooshFX.triggerKnockback(position,(velocity.x>0));

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
			// @SoundHook:TODO: enemyJumpSound.play();//Is there going to be one of these?
		}
	};

	const crouch = function() {
		if(stateManager.getIsNewState()) {
			console.log("Basic Enemy is Crouching now");
			velocity.x = 0;
			// @SoundHook:TODO enemyCrouchSound.play();//Is there going to be one of these?
		}
	};

	const block = function() {
		if(stateManager.getIsNewState()) {
			console.log("Basic Enemy is Blocking now");
			velocity.x = 0;
			// @SoundHook:TODO enemyBlockSound.play();//Is there going to be one of these?
		}
	};

	const dash = function() {
		if(stateManager.getIsNewState()) {
			console.log("Basic Enemy is dashing now");
			// @SoundHook:TODO enemyDashSound.play();//Is there going to be one of these?
		}
	};

	const idle = function() {
		velocity.x = 0;
	};

	const punch = function() {
		if(stateManager.getIsNewState()) {
			velocity.x = 0;
			// @SoundHook:TODO enemyPunchSound.play();//Is there going to be one of these?
			if (wooshFX) wooshFX.triggerPunch(position,stateManager.getIsFacingLeft());
		}
	};

	const kick = function() {
		if(stateManager.getIsNewState()) {
			velocity.x = 0;
			// @SoundHook:TODO enemyKickSound.play();//Is there going to be one of these?
			if (wooshFX) wooshFX.triggerKick(position,stateManager.getIsFacingLeft());
		}
	};

	const j_Kick = function() {
		if(stateManager.getIsNewState()) {
			console.log("Basic Enemy is Jump Kicking now");
			// @SoundHook:TODO enemyKickSound.play();//Is there going to be one of these?
			if (wooshFX) wooshFX.triggerJKick(position,stateManager.getIsFacingLeft());
		}
	};

	const h_kick = function() {
		if(stateManager.getIsNewState()) {
			console.log("Basic Enemy is Helicopter Kicking now");
			// @SoundHook:TODO enemyKickSound.play();//Is there going to be one of these?
			if (wooshFX) wooshFX.triggerHKick(position,stateManager.getIsFacingLeft());
		}
	};

	const sweep = function() {
		if(stateManager.getIsNewState()) {
			console.log("Basic Enemy is Sweeping now");
			// @SoundHook:TODO enemySweepSound.play();//Is there going to be one of these?
			velocity.x = 0;
			if (wooshFX) wooshFX.triggerSweep(position,stateManager.getIsFacingLeft(),wooshKickPic);
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
		if(this.health === null) {
			this.health = healthForBelt(stateManager.getCurrentBelt());
		}
		
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
			// @SoundHook basicEnemyDefeated.play();
			sound.playSFX(Sounds.SFX_LowPain);
		} else {
			// @SoundHook basicEnemyHitSound.play();
			sound.playSFX(Sounds.SFX_EnemyHit);
		}
	};

	this.didHit = function() {
		this.attackBody = null;
	};

	const healthForBelt = function(belt) {
		switch(belt) {
		case BELT.White: return (baseHealth);//This is 1+ White belt kick from player
		case BELT.Yellow: return (1.25 * baseHealth);//this is 1+ Yellow belt kick from player
		case BELT.Tan: return (1.5 * baseHealth);//this is 1+ ten belt kick from player
		case BELT.Brown: return (1.75 * baseHealth);//this is 1+ Brown belt kick from player
		case BELT.Red: return (2 * baseHealth);//this is 1+ Red belt kick from player
		case BELT.Black: return (2.5 * baseHealth);//this is 1+ Black belt kick from player
		}
	};
}