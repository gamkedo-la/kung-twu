//Table Object
function Table(posX, posY, frontY, backY) {
	this.type = ENTITY_TYPE.Environment;
	let oldCameraPos;
	let position = {x:posX, y:posY};
	const thisBottom = posY + table.height;
	const thisRatio = 2 * ((frontY - thisBottom) / (frontY - backY));

	const colliderData = {};
	const colliderPoints = [
		{x:posX, y:posY + 24},
		{x:posX + table.width, y:posY + 24},
		{x:posX + table.width, y:posY + table.height},
		{x:posX, y:posY + table.height}
	];
	colliderData.points = colliderPoints;
	colliderData.position = {x:posX, y:posY};
	colliderData.environment = true;
	this.collisionBody = new Collider(ColliderType.Polygon, colliderData);

	this.getPosition = function() {
		return {x:position.x, y:position.y};
	};

	this.getWidth = function() {
		return table.width;
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
		if(position.x < oldCameraPos - (canvas.width / 2) - table.width) return;
		if(position.x > oldCameraPos + (canvas.width / 2)) return;

		canvasContext.drawImage(table, position.x, position.y);

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
		const otherEdges = otherEntity.getColliderEdges();
		const myEdges = this.getColliderEdges();
		if(!((otherEdges.highY - myEdges.lowY <= 0) && (otherEdges.highY - myEdges.lowY >= -4))) {
			if(otherEntity.getPosition().x < position.x) {
				position.x += 5;
			} else if(otherEntity.getPosition().x > position.x) {
				position.x -= 5;
			}
		}
	};

	this.didHit = function(otherEntity) {
		return;
	};
}