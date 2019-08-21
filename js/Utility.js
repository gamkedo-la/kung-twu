//Utility
function isTerrain(entity) {
	if(entity.type === ENTITY_TYPE.Floor) {
		return true;
	}

	return false;
}