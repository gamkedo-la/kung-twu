//Vase
function Vase(posX, posY, index, frontY, backY) {
	this.type = ENTITY_TYPE.Environment;
	let oldCameraPos;
	let position = {x:posX, y:posY};
	const height = decorationSpritesheet.height;
	const width = decorationSpritesheet.width / 8;//8 images in decorations spritesheet
	const clipXPos = index * width;
	const thisBottom = posY + height;
	const thisRatio = 2 * ((frontY - thisBottom) / (frontY - backY));

	const colliderData = {};
	const colliderPoints = [
		{x:posX, y:posY},
		{x:posX + width, y:posY},
		{x:posX + width, y:posY + height},
		{x:posX, y:posY + height}
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

	this.update = function(cameraXPos, shifts) {
		oldCameraPos = cameraXPos;
		position.x -= (shifts * thisRatio);

		this.collisionBody.setPosition(position); //keep collider in sync with sprite position
	};

	this.draw = function() {
		if(position.x < oldCameraPos - (canvas.width / 2) - width) return;
		if(position.x > oldCameraPos + (canvas.width / 2)) return;

		canvasContext.drawImage(decorationSpritesheet, clipXPos, 0, width, height, position.x, position.y, width, height);

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

	this.didHit = function(otherEntity) {
		return;
	};
}