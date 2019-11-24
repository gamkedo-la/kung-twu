//Player
function Player(config) {
	const SCALE = 2;
	const SCREEN_MARGIN = 10;
	const WALK_SPEED = 200;
    const JUMP_SPEED = -600;
    const DIZZY_STARS_LOW_HP = 25; // at or below this health, we spawn particles
    const FLICKER_LOW_HP = 25; // at or below this health, we flicker
	let KNOCK_BACK_SPEED = null;
	let INVINCIBLE_DURATION = null;
	let invincibleTime = 0;
	let isInvincible = false;
	let canFall = false;

	let baseDamage = localStorageHelper.getInt(localStorageKey.PlayerBaseDamage);
	if((baseDamage === undefined) || (baseDamage === null) || (isNaN(baseDamage))) {
		baseDamage = ASSIST_DEFAULT.PlayerBaseDamage;
		localStorageHelper.setInt(localStorageKey.PlayerBaseDamage, baseDamage);
	}
	const DELTA_DAMAGE = 5;

	let stateManager;
	let hitBoxManager = new HitBoxManager(
		PlayerCollisionBodyData,
		PlayerAttackBodyData);

	let position = { x: 0, y: 0 };
	let velocity = { x: 0, y: 0 };

	this.type = ENTITY_TYPE.Player;
	this.health = ASSIST_DEFAULT.MaxHealth;
	this.pointsToShow = {points:null, position:{x:0, y:0}};

	if (config != undefined) {
		if (config.x != undefined) {
			position.x = config.x;
		}
		if (config.y != undefined) {
			position.y = config.y;
		}

		if (config.health != undefined) {
			this.health = config.health;
		}
	}

	const animations = animationManager.getAnimationsFor(RIVAL_TYPE.player, playerBelt, SCALE);
	stateManager = new StateManager(animations, playerBelt, AITYPE.Player);

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

	this.getMaxHealth = function() {
		if ((config != undefined) && (config.health != undefined)) {
			return config.health;
		}

		return ASSIST_DEFAULT.MaxHealth;
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
			return 1 * baseDamage;
		case STATE.Kick:
			return 1.5 * baseDamage;
		case STATE.J_Kick:
			return 2.0 * baseDamage;
		case STATE.Sweep:
			return 2.0 * baseDamage;
		case STATE.H_Kick:
			return 2.5 * baseDamage;
		}
	};

	this.setNewBelt = function(newBelt) {
		playerBelt = newBelt;
		stateManager.setNewBelt(newBelt);
	};

	this.incrementBelt = function() {
		playerBelt++;
		stateManager.incrementBelt();
	};

	this.getCurrentBelt = function() {
		return stateManager.getCurrentBelt();
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
		playerBelt = localStorageHelper.getInt(localStorageKey.StartingBelt);
		stateManager.setNewBelt(playerBelt);
	};

	this.reset = function(startPos) {
		velocity = { x: 0, y: 0 };

		this.health = ASSIST_DEFAULT.MaxHealth;
		if(config != undefined) {
			if (config.health != undefined) {
				this.health = config.health;
			} 
		}

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

		const stateNow = stateManager.getCurrentState();
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

			if(stateNow === STATE.KnockBack) {
				if(stateManager.getIsFacingLeft()) {
					position.x -= playerKnockbackWhiteData.frameWidth / 2;
				} else {
					position.x += playerKnockbackWhiteData.frameWidth / 2;
				}
			}
		}

		if(this.attackBody != null) {
			const thisState = stateManager.getCurrentState();
			const currentFrame = stateManager.getCurrentAnimationFrame();
			const attackBodyStatus = (this.attackBody.isActive === true);
			this.attackBody.isActive = hitBoxManager.attackColliderIsActiveFor(thisState, currentFrame, AITYPE.Player);
			if((!attackBodyStatus) && (this.attackBody.isActive)) {
				whooshForState(thisState);
            }		
        }

        updatePosition(deltaTime, gravity, floorHeight, levelMin, levelMax);
        
        // puff of dust on the floor if we just landed
        var onGround = stateManager.getIsOnGround();
        if (onGround && !this.onGroundlastFrame) {
            //console.log("just landed: DUST PUFF");
            if (wooshFX) wooshFX.triggerLanding(position.x,position.y);
        }
        this.onGroundlastFrame = onGround;

        // visual feedback if the player is about to die
        if (this.health <= DIZZY_STARS_LOW_HP) {
            //console.log("DANGER! HP is " + this.health);
            if (Math.random()<0.1) { // occasionally
                if (wooshFX) wooshFX.trigger( // spawn a star near our head
                    position.x+50+randomRange(-20,20),
                    position.y+10+randomRange(-4,4),
                    0,starSprite,
                    randomRange(-0.5,0.5), // vel
                    randomRange(-0.25,-0.75),
                    0,0.99,60);
            }
        }

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

		if((stateManager.getCurrentState() !== STATE.Dash) && (stateManager.getCurrentState() !== STATE.Block)) {
			if((velocity.x > 0) && (stateManager.getIsFacingLeft())) {
				velocity.x = -velocity.x;
			} else if((velocity.x < 0) && (!stateManager.getIsFacingLeft())) {
				velocity.x = -velocity.x;
			}
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
				respondToLanding();
				canFall = false;
			} else if(canFall) {
				stateManager.isFalling();
			}
		}
	};

	const whooshForState = function(state) {
		switch(state) {
		case STATE.J_Kick:
			if (wooshFX) wooshFX.triggerJKick(position,stateManager.getIsFacingLeft());
			break;
		case STATE.Sweep:
			if (wooshFX) wooshFX.triggerSweep(position,stateManager.getIsFacingLeft(),wooshKickPic);
			break;
		case STATE.H_Kick:
			if (wooshFX) wooshFX.triggerHKick(position,stateManager.getIsFacingLeft());
			break;
		case STATE.Punch:
			if (wooshFX) wooshFX.triggerPunch(position,stateManager.getIsFacingLeft());
			break;
		case STATE.Kick:
			if (wooshFX) wooshFX.triggerKick(position,stateManager.getIsFacingLeft());
			break;
        case STATE.SpinKick: // dual woosh woo hoo
            if (wooshFX) wooshFX.triggerSpinKick(position,stateManager.getIsFacingLeft());
            break;
		}
	};

	const respondToLanding = function() {
		velocity.y = 0;
		if (!stateManager.getIsOnGround()) {
			stateManager.didLand();
		}
	};

	const respondToKnockBack = function() {
		if (wooshFX) wooshFX.triggerKnockback(position,(velocity.x>0));

		if(velocity.x < 0) {
			velocity.x += ASSIST_DEFAULT.KnockbackSpeed / 10;
			if (velocity.x >= 0) {
				velocity.x = 0;
			}
		} else if(velocity.x > 0) {
			velocity.x -= ASSIST_DEFAULT.KnockbackSpeed / 10;
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
			sound.playSFX(Sounds.SFX_PlayerJump);
		}
	};

	const crouch = function() {
		if (stateManager.getIsNewState()) {
		}
	};

	const dash = function() {
		if (stateManager.getIsNewState()) {
			let speed = -1.5 * WALK_SPEED;
			if (stateManager.getIsFacingLeft()) {
				speed = 1.5 * WALK_SPEED;
			}

			velocity.x = speed;
			sound.playSFX(Sounds.SFX_Swish_01);
			if (wooshFX) wooshFX.triggerDashPlayer(position,(velocity.x>0));

		}
	};

	const idle = function() {
		velocity.x = 0;
	};

	const block = function() {
		if(velocity.x < 0) {
			velocity.x += KNOCK_BACK_SPEED / 35;
			if (velocity.x >= 0) {
				velocity.x = 0;
			}
		} else if(velocity.x > 0) {
			velocity.x -= KNOCK_BACK_SPEED / 35;
			if (velocity.x <= 0) {
				velocity.x = 0;
			}
		}

		if (stateManager.getIsNewState()) {
			sound.playSFX(Sounds.SFX_PlayerBlock);
		}
	};

	const punch = function() {
		if (stateManager.getIsNewState()) {
			velocity.x = 0;
			sound.playSFX(Sounds.SFX_PlayerPunch);
		}
	};

	const kick = function() {
		if (stateManager.getIsNewState()) {
			velocity.x = 0;
			sound.playSFX(Sounds.SFX_PlayerKick);
		}
	};

	const j_Kick = function() {
		console.log("Jump Kicking");
		if (stateManager.getIsNewState()) {
			sound.playSFX(Sounds.SFX_PlayerKick);
		}
	};

	const h_kick = function() {
		console.log("Helicopter Kicking");
		if (stateManager.getIsNewState()) {
		}
	};

	const sweep = function() {
		console.log("Sweeping !!!");
		if (stateManager.getIsNewState()) {
			sound.playSFX(Sounds.SFX_Swish_02);
			velocity.x = 0;
		}
	};

	this.draw = function() {
        
        // very spammy debug information to help locate the player if needed
        //if (Math.random()<0.01) console.log("Player x:" + position.x);
        
        if((isInvincible) && (invincibleTime % 200 < 50)) {
			//do nothing for now
		} else{
            
            if (this.health <= FLICKER_LOW_HP) {
                if (Date.now() % 500 < 250) { // on/off twice per second
                    canvasContext.globalAlpha = 0.25;
                }
            }

            stateManager.drawAt(position.x, position.y);

            if (this.health <= FLICKER_LOW_HP) {
                canvasContext.globalAlpha = 1;
            }
		}

        this.collisionBody.draw(); //colliders know to draw only when DRAW_COLLIDERS = true;
        
		if (this.attackBody != null) {
			this.attackBody.draw();
		}
	};

	this.wasHitBy = function(otherEntity) {
		if(otherEntity.type === ENTITY_TYPE.Environment) {
			resetPositionWithEdges(this.getColliderEdges(), otherEntity.getColliderEdges());
			this.collisionBody.setPosition(position); //keep collider in sync with sprite position
			return;
		}

		initializeInvincibleTime();
		initializeKnockbackSpeed();

		if(isInvincible) {return;}

		if (stateManager.getCurrentState() === STATE.Block) {
			this.health -= Math.ceil(otherEntity.getCurrentDamage() / 10);
			if(otherEntity.getPosition().x < position.x) {
				//enemy is to the left
				velocity.x = KNOCK_BACK_SPEED / 10;
				console.log(`OtherEntityPos: ${otherEntity.getPosition().x}, MyPos: ${position.x}, MyVel:${velocity.x}`);
			} else {
				//enemy is to the right
				velocity.x = -KNOCK_BACK_SPEED / 10;
			}
		} else if (stateManager.getCurrentState() === STATE.KnockBack) {
			//do nothing for now
		} else {
			//just got hit
			stateManager.wasHit();
			isInvincible = true;

			velocity.y = -KNOCK_BACK_SPEED / 2;

			if(otherEntity.getPosition().x < position.x) {
				//enemy is to the left
				velocity.x = KNOCK_BACK_SPEED;
				if(!stateManager.getIsFacingLeft()) {
					//TODO: Should we ensure we are facing the direction of the attack after getting hit?
					//stateManager.shouldFaceLeft(true);
				}
			} else {
				//enemy is to the right
				velocity.x = -KNOCK_BACK_SPEED;
				if(stateManager.getIsFacingLeft()) {
					//TODO: Should we ensure we are facing the direction of the attack after getting hit?
					//stateManager.shouldFaceLeft(false);
				}
			}

			this.health -= otherEntity.getCurrentDamage();
		}

		if (this.health <= 0) {
			this.health = 0;
			sound.playSFX(Sounds.SFX_PlayerFail);
		} else if(otherEntity.type !== ENTITY_TYPE.Environment) {
			sound.playSFX(Sounds.SFX_PlayerHit);
		}
	};

	this.didHit = function(otherEntity) {
		this.attackBody = null;
		this.pointsToShow.points = pointsToShowForState(stateManager.getCurrentState());
		
		if(otherEntity.type === ENTITY_TYPE.Environment) {
			this.pointsToShow.points = -this.pointsToShow.points;
		}
		
		const otherPos = otherEntity.getPosition();
		this.pointsToShow.position = {x:otherPos.x, y:otherPos.y - 10};
	};

	const initializeKnockbackSpeed = function() {
		if(KNOCK_BACK_SPEED === null) {
			KNOCK_BACK_SPEED = localStorageHelper.getInt(localStorageKey.KnockbackSpeed);
			if((KNOCK_BACK_SPEED === undefined) || (KNOCK_BACK_SPEED === null) || (isNaN(KNOCK_BACK_SPEED))) {
				KNOCK_BACK_SPEED = ASSIST_DEFAULT.KnockbackSpeed;
				localStorageHelper.setInt(localStorageKey.KnockbackSpeed, KNOCK_BACK_SPEED);
			}
		}
	};

	const initializeInvincibleTime = function() {
		if(INVINCIBLE_DURATION === null) {
			INVINCIBLE_DURATION = localStorageHelper.getInt(localStorageKey.InvincibleDuration);
			if((INVINCIBLE_DURATION === undefined) || (INVINCIBLE_DURATION === null) || (isNaN(INVINCIBLE_DURATION))) {
				INVINCIBLE_DURATION = ASSIST_DEFAULT.InvincibleDuration;
				localStorageHelper.setInt(localStorageKey.InvincibleDuration, INVINCIBLE_DURATION);
			}
		}
	};

	const pointsToShowForState = function(state) {
		switch(state) {
		case STATE.Kick: return 50;
		case STATE.Punch: return 100;
		case STATE.Sweep: return 100;
		case STATE.J_Kick: return 150;
		case STATE.H_Kick: return 150;
		}
	};

	const resetPositionWithEdges = function(myEdges, otherEdges) {
		//velocity is known, edges of both colliders is known
		if(!stateManager.getIsOnGround()) {
			//land on top of the other object
			position.y -= (myEdges.highY - otherEdges.lowY);
			if(velocity.y >= 0) {
				respondToLanding();
			}
			canFall = true;
		} else if((myEdges.highY - otherEdges.lowY > 0) && (myEdges.highY - otherEdges.lowY < 4)) {
			position.y -= (myEdges.highY - otherEdges.lowY);
			if(velocity.y >= 0) {
				respondToLanding();
			}
		} else {
			if(velocity.x > 0) {
				//Player is moving to the right
				if(position.x < otherEdges.lowX) {
					//Player is to the left of other object => move to left
					position.x -= (myEdges.highX - otherEdges.lowX);
				}
			} else if(velocity.x < 0) {
				//Player is moving to the left
				if((position.x > otherEdges.lowX) && (position.x < otherEdges.highX)) {
					//Player is the right of other object => move to right
					position.x -= (myEdges.lowX - otherEdges.highX);
				}
			}
		}
	};

	this.getColliderEdges = function() {
		return {
			lowX: this.collisionBody.points[0].x, 
			highX:this.collisionBody.points[2].x, 
			lowY: this.collisionBody.points[0].y, 
			highY:this.collisionBody.points[1].y
		};
	};
    
	// used by knockedOutBodyManager since stateManager is private
	this.facingLeft = function() { 
		return stateManager.getIsFacingLeft();
	};

}
