//Collider
const ColliderType = {
	Polygon:"polygon",
	Circle:"circle"
};

function Collider(type, data) {
	this.type = type;
	this.center = {x:0, y:0};
	this.radius = 1;
	this.points = [];
	this.isActive = true;
	
	for(let i = 0; i < data.points.length; i++) {
		this.points[i] = {x:data.points[i].x, y:data.points[i].y};
	}

	let position = {x:data.position.x, y:data.position.y};
	
	this.findCenterAndRadiusOfPoints = function(points) {
		let minX = points[0].x;
		let maxX = points[0].x; 
		let minY = points[0].y; 
		let maxY = points[0].y;
		
		for(let i = 1; i < points.length; i++) {
			minX = Math.min(minX, points[i].x);
			maxX = Math.max(maxX, points[i].x);
			minY = Math.min(minY, points[i].y);
			maxY = Math.max(maxY, points[i].y);
		}
		
		const halfDeltaX = (maxX - minX) / 2;
		const centerX = minX + (halfDeltaX);
		const halfDeltaY = (maxY - minY) / 2;
		const centerY = minY + (halfDeltaY);
		
		this.center = {x: centerX, y: centerY};
		
		//Divide by 0.707 (cos(45)) to account for worst case distance from center to a corner => polygon radii are ~30% too big (which is fine)
		this.radius = Math.max(Math.abs(halfDeltaX / 0.707), Math.abs(halfDeltaY / 0.707));		
	};
		
	if(this.type === ColliderType.Polygon) {
		this.points = data.points;
		this.findCenterAndRadiusOfPoints(this.points);
	} else if(this.type === ColliderType.Circle) {
		this.center = data.center;
		this.radius = data.radius;
		this.points = null;
	}
	
	this.setPosition = function(newPosition) {
		const deltaX = newPosition.x - position.x;
		const deltaY = newPosition.y - position.y;

		if(this.type === ColliderType.Polygon) {
			for(let i = 0; i < this.points.length; i++) {
				this.points[i].x += deltaX;
				this.points[i].y += deltaY;
			}
		}
		
		this.center.x += deltaX;
		this.center.y += deltaY;
		
		position.x = newPosition.x;
		position.y = newPosition.y;
	};

	this.getPosition = function() {
		return {x:position.x, y:position.y};
	};
	
	this.draw = function() {
		if(DRAW_COLLIDERS) {
			switch(this.type) {
			case ColliderType.Polygon:
				// fix: some kick frames have no this.points defined
				if (this.points && this.points.length) { // does data exist?
					canvasContext.beginPath();
					canvasContext.strokeStyle = COLLIDER_COLOR;
					canvasContext.moveTo(this.points[0].x, this.points[0].y);
					for(let i = 0; i < this.points.length; i++) {
						canvasContext.lineTo(this.points[i].x, this.points[i].y);
					}
					canvasContext.lineTo(this.points[0].x, this.points[0].y);
					canvasContext.stroke();
				}
				break;
			case ColliderType.Circle:
				canvasContext.beginPath();
				canvasContext.strokeStyle = COLLIDER_COLOR;
				canvasContext.lineWidth = 2;
				canvasContext.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
				canvasContext.stroke();
				break;
			}
		}
	};
}

//Collision Manager
function CollisionManager(player) {
	const entities = new Set();
	this.player = player;
	this.defeatedEntities = [];

	this.addEntity = function(newEntity) {
		const beforeLength = entities.size;
		entities.add(newEntity);

		return (!(beforeLength === entities.size));
	};
	
	this.removeEntity = function(entityToRemove) {
		if(entities.has(entityToRemove)) {
			entities.delete(entityToRemove);

			return true;
		}

		return false;
	};
	
	this.clearWorld = function() {
		entities.clear();
	};

	const checkEntityAttack = function(entity1, entity2) {
		if((entity1.attackBody != null) && (entity1.attackBody.isActive)) {
			return colliderCheck(entity1.attackBody, entity2.collisionBody);
		}

		return false;
	};
	
	const colliderCheck = function(collider1, collider2) {
		if(withinSquareRadii(collider1, collider2)) {
			//if both objects are circles, the above check is a valid collision
			if((collider1.type === ColliderType.Circle) &&
               (collider2.type === ColliderType.Circle)) {
				return true;
			}
            
			if(checkCollisionBetween(collider1, collider2)) {
				return true;
			}
		}

		return false;
	};
    
	const checkAttacks = function(entity, player) {
		if(entity.type === ENTITY_TYPE.Player) {
			return;//ignore collisions with player (player can't inflict self-damage)
		}

		const defeated = {entity:false, player:false};

		if(checkEntityAttack(entity, player)) {
			//entity successfully hit player
			player.wasHitBy(entity);
			if(player.health <= 0) {defeated.player = true;}
			entity.didHit(player);
		}

		if(checkEntityAttack(player, entity)) {
			entity.wasHitBy(player);
			if(entity.health <= 0) {defeated.entity = true;}
			player.didHit(entity);
		}

		return defeated;
	};
    
	this.doCollisionChecks = function() {
		this.defeatedEntities.length = 0;//Empties the array - Don't you love JavaScript?

		for(let entity of entities) {
			const entityPosition = entity.getPosition();
			if( (entityPosition.x > GAME_FIELD.right) || 
				(entityPosition.x < GAME_FIELD.x - entity.getWidth())) {continue;}//entity is not on screen => bail out early

			const wasDefeated = checkAttacks(entity, this.player);
			if(wasDefeated.entity) {
				this.defeatedEntities.push(entity);
			} else if(wasDefeated.player) {
				this.defeatedEntities.push(player);
				return;//player has been defeated - we're done here
			}
		}		
	};

	const withinSquareRadii = function(body1, body2) {
		const squareDist =  (body1.center.x - body2.center.x) * (body1.center.x - body2.center.x) +
							(body1.center.y - body2.center.y) * (body1.center.y - body2.center.y);
		const squareRadius = (body1.radius + body2.radius) * (body1.radius + body2.radius);

		return (squareDist <= squareRadius);
	};

	const checkCollisionBetween = function(body1, body2) {
		if(body1.type === ColliderType.Polygon) {
			if(body2.type === ColliderType.Polygon) {
				return polygonVPolygon(body1, body2);
			} else if(body2.type === ColliderType.Circle) {
				return polygonVCircle(body1, body2);
			}
		} else if(body1.type === ColliderType.Circle) {
			if(body2.type === ColliderType.Polygon) {
				return polygonVCircle(body2, body1);//reverse the order so polygon passed as first parameter
			}
		}
	};

	const polygonVPolygon = function(body1, body2) {
		const body2Points = body2.points;
		for(let i = 0; i < body2Points.length; i++) {
			if(pointInPolygon(body2Points[i], body1.points)) {
				//at least 1 point of polygon2 is inside polygon1 => collision occurred

				return true;
			}
		}

		const body1Points = body1.points;
		for(let i = 0; i < body1Points.length; i++) {
			if(pointInPolygon(body1Points[i], body2.points)) {
				//at least 1 point of polygon2 is inside polygon1 => collision occurred

				return true;
			}
		}

		return false;
	};

	const pointInPolygon = function(target, polygon) {
		let temp1;
		let temp2;

		// How many times the ray crosses a line-segment
		let crossings = 0;

		// Iterate through each line
		for (let i = 0; i < polygon.length; i++) {
			if(polygon[i].x < polygon[(i + 1) % polygon.length].x) {
				temp1 = polygon[i].x;
				temp2 = polygon[(i + 1) % polygon.length].x;
			} else {
				temp1 = polygon[(i + 1) % polygon.length].x;
				temp2 = polygon[i].x;
			}

			//First check if the ray is possible to cross the line
			if (target.x > temp1 && target.x <= temp2 && (target.y < polygon[i].y || target.y <= polygon[(i + 1) % polygon.length].y)) {
				let eps = 0.000001;

				//Calculate the equation of the line
				let dx = polygon[(i + 1) % polygon.length].x - polygon[i].x;
				let dy = polygon[(i + 1) % polygon.length].y - polygon[i].y;
				let k;

				if (Math.abs(dx) < eps) {
					k = Number.MAX_VALUE;
				} else {
					k = dy / dx;
				}

				let m = polygon[i].y - k * polygon[i].x;
				//Find if the ray crosses the line
				let y2 = k * target.x + m;
				if (target.y <= y2) {
					crossings++;
				}
			}
		}

		if (crossings % 2 === 1) {
			return true;
		} else {
			return false;
		}
	};

	const polygonVCircle = function(polygon, circle) {
		for(let i = 0; i < polygon.points.length; i++) {//loop through each side of the polygon to check for a circle-line collision on each
			const start = polygon.points[i];//start point of this edge
			let end;
			if(i < polygon.points.length - 1) {//end point of this edge, loop back to beginning
				end = polygon.points[i + 1];
			} else {
				end = polygon.points[0];
			}

			const side = {x:end.x - start.x, y:end.y - start.y};
			const circleToStart = {x:circle.center.x - start.x, y:circle.center.y - start.y};//line from circle center to start point of polygon side
			const magnitudeOfSide = magnitudeOfVec(side);

			//how much of the circle-start vector is in line with this polygon side?
			const scalarProjection = dotProduct(circleToStart, side) / (magnitudeOfSide * magnitudeOfSide);

			//if between 0 and 1, the circle center is between this side's start and end points
			//add/subtract circleRadius/magnitude of side to account for collisions on the end points of the polygon side
			if((scalarProjection >= -(circle.radius / magnitudeOfSide)) && (scalarProjection <= (1 + circle.radius / magnitudeOfSide))) {
				const vectorProjection = {x:scalarProjection * side.x, y:scalarProjection * side.y};

				//Rejection vector is that portion of circle-start vector which is perpendicular to the polygon side
				const vectorRejection = {x:circleToStart.x - vectorProjection.x, y:circleToStart.y - vectorProjection.y};
				const magnitudeRejection = magnitudeOfVec(vectorRejection);

				//if the magnitude of the rejection vector is less than the circle radius, there is a collision
				if(magnitudeRejection <= circle.radius) {
					return true;
				}
			}
		}

		return false;
	};
}

function magnitudeOfVec(vector) {
	return Math.sqrt(((vector.x * vector.x) + (vector.y * vector.y)));
}

function dotProduct(vec1, vec2) {
	return (vec1.x * vec2.x) + (vec1.y * vec2.y);
}
