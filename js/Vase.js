//Vase
function Vase(posX, posY, index, frontY, backY) {
	this.type = ENTITY_TYPE.Environment;
	let oldCameraPos;
	const position = {x:posX, y:posY};
	const velocity = {x:0, y:0};
	let isBroken = false;
	const BROKEN_TIME = 500;
	const FADE_TIME = 200;
	const HIT_X_VEL = 350;
	const HIT_Y_VEL = -400;
	const AIR_FRICTION = 5;
	const GRND_FRICTION = 30;
	let timeSinceBroke = 0;
	const height = decorationSpritesheet.height;
	const width = decorationSpritesheet.width / 8;//8 images in decorations spritesheet
	const clipXPos = index * width;
	const thisBottom = posY + height;
	const thisRatio = 2 * ((frontY - thisBottom) / (frontY - backY));

	const colliderData = {};
	const colliderPoints = [
		{x:posX + 25, y:posY + 24},
		{x:posX + width - 25, y:posY + 24},
		{x:posX + width - 25, y:posY + height},
		{x:posX + 25, y:posY + height}
	];
	colliderData.points = colliderPoints;
	colliderData.position = {x:posX, y:posY};
	colliderData.environment = true;
	this.collisionBody = new Collider(ColliderType.Polygon, colliderData);

	this.getPosition = function() {
		return {x:position.x, y:position.y};
	};

	this.getWidth = function() {
		return width;
	};

	this.getColliderEdges = function() {
		return {
			lowX: colliderPoints[0].x, 
			highX:colliderPoints[1].x, 
			lowY: colliderPoints[0].y, 
			highY:colliderPoints[2].y};
	};

	this.getCurrentDamage = function() {
		return 0;
	};

	this.getIsBroken = function() {
		return (isBroken === true);
	};

	this.shouldDraw = function() {
		if((isBroken) && (timeSinceBroke >= BROKEN_TIME + FADE_TIME)) {
			return false;
		}

		return true;
	};

	this.update = function(deltaTime, gravity, cameraXPos, shifts) {
		if(isBroken) {
			timeSinceBroke += deltaTime;
		}

		oldCameraPos = cameraXPos;
		position.x -= (shifts * thisRatio);

		updateXVelForFriction(AIR_FRICTION);

		position.x += (velocity.x * deltaTime / 1000);

		fallDueToGravity(deltaTime / 1000, gravity);

		if (velocity.y > 0) {
			if (position.y > posY) {
				position.y = posY;
				velocity.y = 0;
				updateXVelForFriction(GRND_FRICTION);
			}
		}

		this.collisionBody.setPosition(position); //keep collider in sync with sprite position
	};

	const updateXVelForFriction = function(friction) {
		if(velocity.x < 0) {
			velocity.x += friction;
			if(velocity.x > 0) velocity.x = 0;
		} else if(velocity.x > 0) {
			velocity.x -= friction;
			if(velocity.x < 0) velocity.x = 0;
		}
	};

	const fallDueToGravity = function(timeStep, gravity) {
		velocity.y += gravity * timeStep;
		position.y += velocity.y * timeStep;
	};

	this.draw = function() {
		if(position.x < oldCameraPos - (canvas.width / 2) - width) return;
		if(position.x > oldCameraPos + (canvas.width / 2)) return;

		if(!isBroken) {
			//TODO: Need broken image
			canvasContext.drawImage(decorationSpritesheet, clipXPos, 0, width, height, position.x, position.y, width, height);
		} else {
			if(timeSinceBroke >= BROKEN_TIME) {
				canvasContext.save();
				canvasContext.globalAlpha = 1 - ((timeSinceBroke - BROKEN_TIME) / FADE_TIME);
			}

			canvasContext.drawImage(decorationSpritesheet, clipXPos, 0, width, height, position.x, position.y, width, height);

			if(timeSinceBroke >= BROKEN_TIME) {
				canvasContext.restore();
			}
		}

		this.collisionBody.draw(); //colliders know to draw only when DRAW_COLLIDERS = true;
	};

	this.wasHitBy = function(otherEntity) {
		const otherEdges = otherEntity.getColliderEdges();
		const myEdges = this.getColliderEdges();
		if(!((otherEdges.highY - myEdges.lowY <= 0) && (otherEdges.highY - myEdges.lowY >= -4))) {
			if(otherEntity.getPosition().x < position.x) {
				position.x += 1;
			} else if(otherEntity.getPosition().x > position.x) {
				position.x -= 1;
			}
		}
	};

	this.wasAttackedBy = function(otherEntity) {
		if(isBroken) return;
		isBroken = true;

		const otherEdges = otherEntity.getColliderEdges();
		const myEdges = this.getColliderEdges();
		if(!((otherEdges.highY - myEdges.lowY <= 0) && (otherEdges.highY - myEdges.lowY >= -4))) {
			if(otherEntity.getPosition().x < position.x) {
				velocity.x = HIT_X_VEL;
				velocity.y = HIT_Y_VEL;
			} else if(otherEntity.getPosition().x > position.x) {
				velocity.x = -HIT_X_VEL;
				velocity.y = HIT_Y_VEL;
			}
		}
	};

	this.didHit = function(otherEntity) {
		return;
	};
}