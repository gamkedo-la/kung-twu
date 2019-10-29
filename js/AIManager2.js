//AI Type
const AITYPE = {
	Standard: "standard",
	Boss: "boss",
	Player: "player"
};

//AI Manager 2
function AIManager2() {
	const WATCH_DIST = 250;
	const WATCH_COOLDOWN = 250;
	const WATCH_ANTI_HUNT = 75;
	const ATTACK_DIST = 75;

	this.nextAction = function (belt, type, timeSinceAction, currentState, distToPlayer, shouldAttack, watchVariance) {
		if(shouldAttack) {
			return actionForAttacker(belt, type, timeSinceAction, currentState, distToPlayer);
		} else {
			return actionForWatcher(distToPlayer, timeSinceAction, watchVariance);
		}
	};

	const actionForAttacker = function(belt, type, time, state, distance) {
		const variance = attackVarianceForBeltAndType(belt, type);
		if(distance < 0) {
			return actionForRightAttacker(belt, type, time, state, -distance, variance);
		} else if(distance > 0) {
			return actionForLeftAttacker(belt, type, time, state, distance, variance);
		} else {
			const aRand = Math.floor(100 * Math.random());
			if(aRand % 2 === 0) {
				return actionForLeftAttacker(belt, type, time, state, -distance, variance);
			} else {
				return actionForRightAttacker(belt, type, time, state, distance, variance);
			}
		}
	};

	const actionForLeftAttacker = function(belt, type, time, state, distance, variance) {
		//Distance has been adjusted to be positive or zero
		if(distance > ATTACK_DIST + variance) {
			//Too far left to attack, so move right instead
			return ACTION.Right;
		} else {
			return attackForAttacker(belt, type, time, state);
		}
	};

	const actionForRightAttacker = function(belt, type, time, state, distance, variance) {
		if(distance > ATTACK_DIST + variance) {
			//Too far right to attack, so move left instead
			return ACTION.Left;
		} else {
			return attackForAttacker(belt, type, time, state);
		}
	};

	const attackForAttacker = function(belt, type, time, state) {
		const cooldown = cooldownForBeltAndType(belt, type);
		if(time >= cooldown) {
			return attackActionFor(belt, type, state);
		} else {
			return ACTION.Idle;
		}
	};

	const attackActionFor = function(belt, type, state) {
		if(type === AITYPE.Standard) {
			return standardEnemyAttackFor(belt, state);
		} else if(type === AITYPE.Boss) {
			return bossAttackFor(belt, state);
		}
	};

	const standardEnemyAttackFor = function(belt, state) {
		switch(belt) {
		case BELT.White: return whiteEnemyAttackFor(state);
		case BELT.Yellow:return yellowEnemyAttackFor(state);
		case BELT.Tan:return tanEnemyAttackFor(state);
		case BELT.Brown:return brownEnemyAttackFor(state);
		case BELT.Red:return redEnemyAttackFor(state);
		}
	};

	const whiteEnemyAttackFor = function(state) {
		if(state === CROUCH_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 20) {
				return ACTION.Crouch;
			} else {
				return ACTION.Release;
			}
		} else if(state === BLOCK_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 20) {
				return ACTION.Block;
			} else {
				return ACTION.Release;
			}
		}

		const newAction = Math.floor(100 * Math.random());
		if(newAction < 20) {
			return ACTION.Crouch;
		} else if(newAction < 40) {
			return ACTION.Jump;
		} else if(newAction < 60) {
			return ACTION.Punch;
		} else if(newAction < 80) {
			return ACTION.Kick;
		} else {
			return ACTION.Block;
		}
	};

	const yellowEnemyAttackFor = function(state) {
		if(state === CROUCH_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 20) {
				return ACTION.Crouch;
			} else {
				return ACTION.Release;
			}
		} else if(state === BLOCK_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 20) {
				return ACTION.Block;
			} else {
				return ACTION.Release;
			}
		}

		const newAction = Math.floor(100 * Math.random());
		if(newAction < 15) {
			return ACTION.Crouch;
		} else if(newAction < 30) {
			return ACTION.Jump;
		} else if(newAction < 45) {
			return ACTION.Punch;
		} else if(newAction < 60) {
			return ACTION.Kick;
		} else if(newAction < 75){
			return ACTION.Block;
		} else {
			return ACTION.Dash;
		}
	};

	const tanEnemyAttackFor = function(state) {
		if(state === CROUCH_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 10) {
				return ACTION.Crouch;
			} else if(continueAction <= 80) {
				return ACTION.Kick;//This becomes a Sweep
			} else {
				return ACTION.Release;
			}
		} else if(state === BLOCK_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 10) {
				return ACTION.Block;
			} else {
				return ACTION.Release;
			}
		}

		const newAction = Math.floor(100 * Math.random());
		if(newAction < 25) {
			return ACTION.Crouch;
		} else if(newAction < 40) {
			return ACTION.Jump;
		} else if(newAction < 55) {
			return ACTION.Punch;
		} else if(newAction < 70) {
			return ACTION.Kick;
		} else if(newAction < 85){
			return ACTION.Block;
		} else {
			return ACTION.Dash;
		}
	};

	const brownEnemyAttackFor = function(state) {
		if(state === CROUCH_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 10) {
				return ACTION.Crouch;
			} else if(continueAction <= 80) {
				return ACTION.Kick;//This becomes a Sweep
			} else {
				return ACTION.Release;
			}
		} else if(state === BLOCK_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 10) {
				return ACTION.Block;
			} else {
				return ACTION.Release;
			}
		} else if(state === JUMP_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 80) {
				return ACTION.Kick;//This becomes a Jump Kick
			}
		}

		const newAction = Math.floor(100 * Math.random());
		if(newAction < 15) {
			return ACTION.Crouch;
		} else if(newAction < 40) {
			return ACTION.Jump;
		} else if(newAction < 55) {
			return ACTION.Punch;
		} else if(newAction < 70) {
			return ACTION.Kick;
		} else if(newAction < 85){
			return ACTION.Block;
		} else {
			return ACTION.Dash;
		}
	};

	const redEnemyAttackFor = function(state) {
		if(state === CROUCH_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 5) {
				return ACTION.Crouch;
			} else if(continueAction <= 80) {
				return ACTION.Kick;//This becomes a Sweep
			} else {
				return ACTION.Release;
			}
		} else if(state === BLOCK_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 5) {
				return ACTION.Block;
			} else {
				return ACTION.Release;
			}
		} else if(state === JUMP_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 80) {
				return ACTION.Kick;//This becomes a Jump Kick
			}
		} else if(state === DASH_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 80) {
				return ACTION.Kick;//This becomes a Helicopter Kick
			}
		}

		const newAction = Math.floor(100 * Math.random());
		if(newAction < 15) {
			return ACTION.Crouch;
		} else if(newAction < 30) {
			return ACTION.Jump;
		} else if(newAction < 45) {
			return ACTION.Punch;
		} else if(newAction < 60) {
			return ACTION.Kick;
		} else if(newAction < 75){
			return ACTION.Block;
		} else {
			return ACTION.Dash;
		}
	};

	const bossAttackFor = function(belt, state) {
		switch(belt) {
		case BELT.Yellow: return yellowBossAttackFor(state);
		case BELT.Tan: return tanBossAttackFor(state);
		case BELT.Brown: return brownBossAttackFor(state);
		case BELT.Red: return redBossAttackFor(state);
		case BELT.Black: return blackBossAttackFor(state);
		}
	};

	const yellowBossAttackFor = function(state) {
		if(state === CROUCH_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 20) {
				return ACTION.Crouch;
			} else {
				return ACTION.Release;
			}
		} else if(state === BLOCK_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 20) {
				return ACTION.Block;
			} else {
				return ACTION.Release;
			}
		}

		const newAction = Math.floor(100 * Math.random());
		if(newAction < 11) {
			return ACTION.Crouch;
		} else if(newAction < 22) {
			return ACTION.Jump;
		} else if(newAction < 33) {
			return ACTION.Punch;
		} else if(newAction < 44) {
			return ACTION.Kick;
		} else if(newAction < 66){
			return ACTION.Block;
		} else {
			return ACTION.Dash;
		}
	};

	const tanBossAttackFor = function(state) {
		if(state === CROUCH_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 10) {
				return ACTION.Crouch;
			} else if(continueAction <= 80) {
				return ACTION.Kick;//This becomes a Sweep
			} else {
				return ACTION.Release;
			}
		} else if(state === BLOCK_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 10) {
				return ACTION.Block;
			} else {
				return ACTION.Release;
			}
		}

		const newAction = Math.floor(100 * Math.random());
		if(newAction < 11) {
			return ACTION.Dash;
		} else if(newAction < 22) {
			return ACTION.Jump;
		} else if(newAction < 33) {
			return ACTION.Punch;
		} else if(newAction < 44) {
			return ACTION.Kick;
		} else if(newAction < 66){
			return ACTION.Block;
		} else {
			return ACTION.Crouch;
		}
	};

	const brownBossAttackFor = function(state) {
		if(state === CROUCH_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 10) {
				return ACTION.Crouch;
			} else if(continueAction <= 80) {
				return ACTION.Kick;//This becomes a Sweep
			} else {
				return ACTION.Release;
			}
		} else if(state === BLOCK_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 10) {
				return ACTION.Block;
			} else {
				return ACTION.Release;
			}
		} else if(state === JUMP_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 80) {
				return ACTION.Kick;//This becomes a Jump Kick
			}
		}

		const newAction = Math.floor(100 * Math.random());
		if(newAction < 11) {
			return ACTION.Crouch;
		} else if(newAction < 22) {
			return ACTION.Dash;
		} else if(newAction < 33) {
			return ACTION.Punch;
		} else if(newAction < 44) {
			return ACTION.Kick;
		} else if(newAction < 66){
			return ACTION.Block;
		} else {
			return ACTION.Jump;
		}
	};

	const redBossAttackFor = function(state) {
		if(state === CROUCH_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 5) {
				return ACTION.Crouch;
			} else if(continueAction <= 80) {
				return ACTION.Kick;//This becomes a Sweep
			} else {
				return ACTION.Release;
			}
		} else if(state === BLOCK_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 5) {
				return ACTION.Block;
			} else {
				return ACTION.Release;
			}
		} else if(state === JUMP_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 80) {
				return ACTION.Kick;//This becomes a Jump Kick
			}
		} else if(state === DASH_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 80) {
				return ACTION.Kick;//This becomes a Helicopter Kick
			}
		}

		const newAction = Math.floor(100 * Math.random());
		if(newAction < 11) {
			return ACTION.Crouch;
		} else if(newAction < 22) {
			return ACTION.Jump;
		} else if(newAction < 33) {
			return ACTION.Punch;
		} else if(newAction < 44) {
			return ACTION.Kick;
		} else if(newAction < 66){
			return ACTION.Block;
		} else {
			return ACTION.Dash;
		}
	};

	const blackBossAttackFor = function(state) {
		if(state === CROUCH_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 5) {
				return ACTION.Crouch;
			} else if(continueAction <= 80) {
				return ACTION.Kick;//This becomes a Sweep
			} else {
				return ACTION.Release;
			}
		} else if(state === BLOCK_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 5) {
				return ACTION.Block;
			} else {
				return ACTION.Release;
			}
		} else if(state === JUMP_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 80) {
				return ACTION.Kick;//This becomes a Jump Kick
			}
		} else if(state === DASH_STATE) {
			const continueAction = Math.floor(100 * Math.random());
			if(continueAction <= 80) {
				return ACTION.Kick;//This becomes a Helicopter Kick
			}
		}

		const newAction = Math.floor(100 * Math.random());
		if(newAction < 17) {
			return ACTION.Crouch;
		} else if(newAction < 34) {
			return ACTION.Jump;
		} else if(newAction < 51) {
			return ACTION.Punch;
		} else if(newAction < 68) {
			return ACTION.Kick;
		} else if(newAction < 85){
			return ACTION.Block;
		} else {
			return ACTION.Dash;
		}
	};

	const cooldownForBeltAndType = function(belt, type) {
		if(type === AITYPE.Standard) {
			switch(belt) {
			case BELT.White: return 500;
			case BELT.Yellow: return 475;
			case BELT.Tan: return 450;
			case BELT.Brown: return 425;
			case BELT.Red: return 400;
			case BELT.Black: return 300;
			}
		} else if(type === AITYPE.Boss) {
			switch(belt) {
			case BELT.White: return 450;
			case BELT.Yellow: return 425;
			case BELT.Tan: return 400;
			case BELT.Brown: return 375;
			case BELT.Red: return 350;
			case BELT.Black: return 300;
			}
		} else {
			console.error(`Called cooldowndForBeltAndType with invalid AIType: ${type} or belt: ${belt}`);
			return 500;//This exists to prevent crashes
		}
	};

	const attackVarianceForBeltAndType = function(belt, type) {
		let result;
		if(type === AITYPE.Standard) {
			switch(belt) {
			case BELT.White:
				result = 24;
				break;
			case BELT.Yellow:
				result = 20;
				break;
			case BELT.Tan:
				result = 18;
				break;
			case BELT.Brown:
				result = 16;
				break;
			case BELT.Red:
				result = 12;
				break;
			}
		} else if(type === AITYPE.Boss) {
			switch(belt) {
			case BELT.Yellow:
				result = 18;
				break;
			case BELT.Tan:
				result = 14;
				break;
			case BELT.Brown:
				result = 10;
				break;
			case BELT.Red:
				result = 4;
				break;
			case BELT.Black:
				result = 0;
				break;
			}
		}

		return (Math.floor(result * Math.random()) - (result/2));
	};

	const actionForWatcher = function(distance, time, variance) {
		//distance < 0 => Enemy is left of Player
		//distance > 0 => Enemy is right of Player
		if(distance < 0) {
			return actionForRightWatcher(-distance, variance, time);
		} else if(distance > 0) {
			return actionForLeftWatcher(distance, variance, time);
		} else {
			const aRand = 100 * Math.floor(Math.random());
			if(aRand % 2 === 0) {
				return actionForLeftWatcher(-distance, variance, time);
			} else {
				return actionForRightWatcher(distance, variance, time);
			}
		}
	};

	const actionForLeftWatcher = function(distance, variance, time) {
		//Distance has been adjusted to be positive or zero
		if(Math.abs(distance - WATCH_DIST) < WATCH_ANTI_HUNT + variance) {
			return ACTION.Release;
		} else if(time < WATCH_COOLDOWN) {
			return ACTION.NoChange;
		}

		if(distance < WATCH_DIST + variance) {
			//Too close to player, need to move left to back away
			return ACTION.Left;
		} else if(distance > WATCH_DIST + variance) {
			//Too far from player, need to move right to close in
			return ACTION.Right;
		} else {
			//distance is perfect, what do we do now? (should be nothing)
			return ACTION.NoChange;
		}
	};

	const actionForRightWatcher = function(distance, variance, time) {
		//Distance has been adjusted to be positive or zero
		if(Math.abs(distance - WATCH_DIST) < WATCH_ANTI_HUNT + variance) {
			return ACTION.Release;
		} else if(time < WATCH_COOLDOWN) {
			return ACTION.NoChange;
		}

		if(distance < WATCH_DIST + variance) {
			//Too close to player, need to move right to back away
			return ACTION.Right;
		} else if(distance > WATCH_DIST + variance) {
			//Too far from player, need to move left to close in
			return ACTION.Left;
		} else {
			//distance is perfect, what do we do now? (should be nothing)
			return ACTION.NoChange;
		}
	};
}