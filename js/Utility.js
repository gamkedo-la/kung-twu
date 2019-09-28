//Utility
function isTerrain(entity) {
	if(entity.type === ENTITY_TYPE.Floor) {
		return true;
	}

	return false;
}

function lerp(start, end, amount) {
	return (1 - amount) * start + amount * end;
}
