//Table Object
function Table(posX, posY, isFront) {
	this.type = ENTITY_TYPE.Environment;
	let oldCameraPos;
	let position = {x:posX, y:posY};

	const colliderData = {};
	const colliderPoints = [
		{x:posX, y:posY},
		{x:posX + table.width, y:posY},
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
		if(!isFront) {
			position.x -= (2 * shifts);
		}

		this.collisionBody.setPosition(position); //keep collider in sync with sprite position
	};

	this.draw = function() {
		if(position.x < oldCameraPos - (canvas.width / 2) - table.width) return;
		if(position.x > oldCameraPos + (canvas.width / 2)) return;

		canvasContext.drawImage(table, position.x, position.y);

		this.collisionBody.draw(); //colliders know to draw only when DRAW_COLLIDERS = true;
	};

	this.wasHitBy = function(otherEntity) {
		//		console.log(`Somebody bumped me!!! (${otherEntity.type})`);
		return;
	};

	this.didHit = function(otherEntity) {
		return;
	};
}