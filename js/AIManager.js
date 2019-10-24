//AI Manager
const AITYPE = {
	Standard: "standard",
	Boss: "boss",
	Player: "player"
};

const COOLDOWN = {
	White: 700,
	Yellow: 650,
	Tan: 600,
	Brown: 500,
	Red: 400,
	Black: 350
};

const IDEAL_STRIKE_DIST = 100;//60;
const BUFFER_DIST = 140;

function AIManager() {
	this.coolDownForBelt = function (belt) {
		switch (belt) {
		case BELT.White:
			return COOLDOWN.White;
		case BELT.Yellow:
			return COOLDOWN.Yellow;
		case BELT.Tan:
			return COOLDOWN.Tan;
		case BELT.Brown:
			return COOLDOWN.Brown;
		case BELT.Red:
			return COOLDOWN.Red;
		case BELT.Black:
			return COOLDOWN.Black;
		}
	};

	this.coolDownForBeltAndType = function (belt, type) {
		if (type === AITYPE.Standard) {
			switch (belt) {
			case BELT.White:
				return COOLDOWN.White;
			case BELT.Yellow:
				return COOLDOWN.Yellow;
			case BELT.Tan:
				return COOLDOWN.Tan;
			case BELT.Brown:
				return COOLDOWN.Brown;
			case BELT.Red:
				return COOLDOWN.Red;
			case BELT.Black:
				return COOLDOWN.Black;
			}
		} else if (type === AITYPE.Boss) {
			switch (belt) {
			case BELT.Yellow:
				return 0.5 * COOLDOWN.Yellow;
			case BELT.Tan:
				return 0.5 * COOLDOWN.Tan;
			case BELT.Brown:
				return 0.5 * COOLDOWN.Brown;
			case BELT.Red:
				return 0.5 * COOLDOWN.Red;
			case BELT.Black:
				return 0.5 * COOLDOWN.Black;
			}
		}
	};

	this.actionForTypeTimeStateAndPos = function (belt, type, timeSinceAction, currentState, distToPlayer, shouldAttack) {
		const thisCoolDown = this.coolDownForBeltAndType(belt, type);
		if (timeSinceAction < 2 * thisCoolDown / 3) {
			return null;
		} else if (timeSinceAction < thisCoolDown) {
			if ((distToPlayer > IDEAL_STRIKE_DIST) && (currentState === WALK_LEFT_STATE)) {
				return attackIfAppropriateFor(belt, type, 2 * timeSinceAction, currentState, distToPlayer, shouldAttack, thisCoolDown);
			} else if ((distToPlayer < -IDEAL_STRIKE_DIST) && (currentState === WALK_RIGHT_STATE)) {
				return attackIfAppropriateFor(belt, type, 2 * timeSinceAction, currentState, distToPlayer, shouldAttack, thisCoolDown);
			} else {
				return null;
			}
		}

		const desiredDistance = desiredApproachDistance(belt, type, shouldAttack);
		if (shouldAttack) {
			if ((currentState === BLOCK_STATE) ||
				(currentState === CROUCH_STATE)) {
				return ACTION.Release;
			}

			if (distToPlayer > maxStrikeDistanceForBeltAndType(belt, type)) {
				return ACTION.Right;
			} else if (distToPlayer < -maxStrikeDistanceForBeltAndType(belt, type)) {
				return ACTION.Left;
			} else {
				return attackIfAppropriateFor(belt, type, timeSinceAction, currentState, distToPlayer, shouldAttack, thisCoolDown);
			}
		} else {
			if (distToPlayer > 0) {
				if (distToPlayer > desiredDistance + BUFFER_DIST) {
					return ACTION.Right;
				} else if (distToPlayer < desiredDistance - BUFFER_DIST) {
					return ACTION.Left;
				} else {
					return ACTION.Release;
				}
			} else {
				if (distToPlayer < -desiredDistance - BUFFER_DIST) {
					return ACTION.Left;
				} else if (distToPlayer > -desiredDistance + BUFFER_DIST) {
					return ACTION.Right;
				} else {
					return ACTION.Release;
				}
			}
		}
	};

	const desiredApproachDistance = function (belt, type, shouldAttack) {
		let strikeDistance = maxStrikeDistanceForBeltAndType(belt, type);
		if (type === AITYPE.Standard) {
			switch (belt) {
			case BELT.White:
				if (shouldAttack) {
					return strikeDistance;
				} else {
					return 6 * strikeDistance;
				}
			case BELT.Yellow:
				if (shouldAttack) {
					return strikeDistance;
				} else {
					return 5.5 * strikeDistance;
				}
			case BELT.Tan:
				if (shouldAttack) {
					return strikeDistance;
				} else {
					return 5 * strikeDistance;
				}
			case BELT.Brown:
				if (shouldAttack) {
					return strikeDistance;
				} else {
					return 4.5 * strikeDistance;
				}
			case BELT.Red:
				if (shouldAttack) {
					return strikeDistance;
				} else {
					return 3.5 * strikeDistance;
				}
			case BELT.Black:
				if (shouldAttack) {
					return strikeDistance;
				} else {
					return 2.5 * strikeDistance;
				}
			}
		} else if (type === AITYPE.Boss) {
			switch (belt) {
			case BELT.Yellow:
			case BELT.Tan:
			case BELT.Brown:
			case BELT.Red:
			case BELT.Black:
				return strikeDistance;
			}
		}
	};

	const maxStrikeDistanceForBeltAndType = function (belt, type) {
		let range = IDEAL_STRIKE_DIST;
		if (type === AITYPE.Standard) {
			switch (belt) {
			case BELT.White:
				range = 30;
				break;
			case BELT.Yellow:
				range = 24;
				break;
			case BELT.Tan:
				range = 18;
				break;
			case BELT.Brown:
				range = 10;
				break;
			case BELT.Red:
				range = 4;
				break;
			case BELT.Black:
				range = 0;
				break;
			}
		} else if (type === AITYPE.Boss) {
			switch (belt) {
			case BELT.Yellow:
				range = 18;
				break;
			case BELT.Tan:
				range = 10;
				break;
			case BELT.Brown:
				range = 8;
				break;
			case BELT.Red:
				range = 4;
				break;
			case BELT.Black:
				range = 0;
				break;
			}
		}

		return maxStrikeDistance(range);
	};

	const maxStrikeDistance = function (range) {
		const rnd = Math.floor(range * Math.random() - range / 2);
		return (IDEAL_STRIKE_DIST + rnd);
	};

	const attackIfAppropriateFor = function (belt, type, timeSinceAction, currentState, distToPlayer, shouldAttack, cooldown) {
		if (shouldAttack != undefined) {
			if (!shouldAttack) {
				const approachModifier = 50 * Math.random();
				if (distToPlayer < 200 + approachModifier) {
					return ACTION.Release;
				} else if (currentState === BLOCK_STATE) {
					return ACTION.Release;
				}
			}
		}

		if (type === AITYPE.Standard) {
			switch (belt) {
			case BELT.White:
				if (timeSinceAction > cooldown) {
					return attackActionForWhiteBelt();
				}
				break;
			case BELT.Yellow:
				if (timeSinceAction > cooldown) {
					return attackActionForYellowBelt();
				}
				break;
			case BELT.Tan:
				if (timeSinceAction > cooldown) {
					return attackActionForTanBelt(currentState);
				}
				break;
			case BELT.Brown:
				if (timeSinceAction > cooldown) {
					return attackActionForBrownBelt(currentState);
				}
				break;
			case BELT.Red:
				if (timeSinceAction > cooldown) {
					return attackActionForRedBelt(currentState);
				}
				break;
			case BELT.Black:
				if (timeSinceAction > cooldown) {
					return attackActionForBlackBelt(currentState);
				}
				break;
			}
		} else if (type === AITYPE.Boss) {
			switch (belt) {
			case BELT.Yellow:
				if (timeSinceAction > cooldown) {
					return attackActionForYellowBossBelt(currentState);
				}
				break;
			case BELT.Tan:
				if (timeSinceAction > cooldown) {
					return attackActionForTanBossBelt(currentState);
				}
				break;
			case BELT.Brown:
				if (timeSinceAction > cooldown) {
					return attackActionForBrownBossBelt(currentState);
				}
				break;
			case BELT.Red:
				if (timeSinceAction > cooldown) {
					return attackActionForRedBossBelt(currentState);
				}
				break;
			case BELT.Black:
				if (timeSinceAction > cooldown) {
					return attackActionForBlackBossBelt(currentState);
				}
				break;
			}
		}

		return ACTION.Release;
	};

	const attackActionForWhiteBelt = function () {
		const rnd = Math.floor(10 * Math.random());
		if (rnd % 3 < 2) {
			return ACTION.Punch;
		} else {
			return ACTION.Kick;
		}
	};

	const attackActionForYellowBelt = function () {
		const rnd = (Math.floor(100 * Math.random())) % 7;

		if (rnd < 2) {
			return ACTION.Punch;
		} else if (rnd < 4) {
			return ACTION.Kick;
		} else if (rnd < 5) {
			return ACTION.Block;
		} else if (rnd < 6) {
			return ACTION.Dash;
		} else {
			return ACTION.Jump;
		}
	};

	const attackActionForTanBelt = function (currentState) {
		const rnd = (Math.floor(100 * Math.random())) % 9;

		if (currentState === CROUCH_STATE) {
			if (rnd < 5) {
				return ACTION.Kick;
			} else if (rnd < 7) {
				return ACTION.Crouch;
			} else {
				return ACTION.Release;
			}
		} else {
			if (rnd < 2) {
				return ACTION.Punch;
			} else if (rnd < 4) {
				return ACTION.Kick;
			} else if (rnd < 5) {
				return ACTION.Block;
			} else if (rnd < 6) {
				return ACTION.Dash;
			} else if (rnd < 7) {
				return ACTION.Jump;
			} else {
				return ACTION.Crouch;
			}
		}
	};

	const attackActionForBrownBelt = function (currentState) {
		const rnd = (Math.floor(100 * Math.random())) % 9;

		if (currentState === CROUCH_STATE) {
			if (rnd < 5) {
				return ACTION.Kick;
			} else if (rnd < 7) {
				return ACTION.Crouch;
			} else {
				return ACTION.Release;
			}
		} else if (currentState === JUMP_STATE) {
			if (rnd < 7) {
				return ACTION.Kick;
			}
		} else {
			if (rnd < 2) {
				return ACTION.Punch;
			} else if (rnd < 4) {
				return ACTION.Kick;
			} else if (rnd < 5) {
				return ACTION.Block;
			} else if (rnd < 6) {
				return ACTION.Dash;
			} else if (rnd < 7) {
				return ACTION.Crouch;
			} else {
				return ACTION.Jump;
			}
		}
	};

	const attackActionForRedBelt = function (currentState) {
		const rnd = (Math.floor(100 * Math.random())) % 9;

		if (currentState === CROUCH_STATE) {
			if (rnd < 5) {
				return ACTION.Kick;
			} else if (rnd < 7) {
				return ACTION.Crouch;
			} else {
				return ACTION.Release;
			}
		} else if (currentState === JUMP_STATE) {
			if (rnd < 7) {
				return ACTION.Kick;
			}
		} else if (currentState === DASH_STATE) {
			if (rnd < 7) {
				return ACTION.Kick;
			}
		} else {
			if (rnd < 2) {
				return ACTION.Punch;
			} else if (rnd < 4) {
				return ACTION.Kick;
			} else if (rnd < 5) {
				return ACTION.Block;
			} else if (rnd < 6) {
				return ACTION.Dash;
			} else if (rnd < 7) {
				return ACTION.Crouch;
			} else {
				return ACTION.Jump;
			}
		}
	};

	const attackActionForBlackBelt = function (currentState) {
		return attackActionForRedBelt(currentState);
	};

	const attackActionForYellowBossBelt = function () {
		const rnd = (Math.floor(100 * Math.random())) % 14;

		if (rnd < 4) {
			return ACTION.Punch;
		} else if (rnd < 8) {
			return ACTION.Kick;
		} else if (rnd < 9) {
			return ACTION.Block;
		} else if (rnd < 10) {
			return ACTION.Crouch;
		} else if (rnd < 11) {
			return ACTION.Jump;
		} else {
			return ACTION.Dash;
		}
	};

	const attackActionForTanBossBelt = function (currentState) {
		const rnd = (Math.floor(100 * Math.random())) % 11;

		if (currentState === CROUCH_STATE) {
			if (rnd < 7) {
				return ACTION.Kick;
			} else if (rnd < 10) {
				return ACTION.Crouch;
			} else {
				return ACTION.Release;
			}
		} else {
			if (rnd < 2) {
				return ACTION.Punch;
			} else if (rnd < 4) {
				return ACTION.Kick;
			} else if (rnd < 5) {
				return ACTION.Block;
			} else if (rnd < 6) {
				return ACTION.Dash;
			} else if (rnd < 8) {
				return ACTION.Jump;
			} else {
				return ACTION.Crouch;
			}
		}
	};

	const attackActionForBrownBossBelt = function (currentState) {
		const rnd = (Math.floor(100 * Math.random())) % 11;

		if (currentState === CROUCH_STATE) {
			if (rnd < 6) {
				return ACTION.Kick;
			} else if (rnd < 8) {
				return ACTION.Crouch;
			} else {
				return ACTION.Release;
			}
		} else if (currentState === JUMP_STATE) {
			if (rnd < 9) {
				return ACTION.Kick;
			}
		} else {
			if (rnd < 2) {
				return ACTION.Punch;
			} else if (rnd < 4) {
				return ACTION.Kick;
			} else if (rnd < 5) {
				return ACTION.Block;
			} else if (rnd < 7) {
				return ACTION.Dash;
			} else if (rnd < 8) {
				return ACTION.Crouch;
			} else {
				return ACTION.Jump;
			}
		}
	};

	const attackActionForRedBossBelt = function (currentState) {
		const rnd = (Math.floor(100 * Math.random())) % 11;

		if (currentState === CROUCH_STATE) {
			if (rnd < 6) {
				return ACTION.Kick;
			} else if (rnd < 8) {
				return ACTION.Crouch;
			} else {
				return ACTION.Release;
			}
		} else if (currentState === JUMP_STATE) {
			if (rnd < 9) {
				return ACTION.Kick;
			}
		} else if (currentState === DASH_STATE) {
			if (rnd < 9) {
				return ACTION.Kick;
			}
		} else {
			if (rnd < 2) {
				return ACTION.Punch;
			} else if (rnd < 5) {
				return ACTION.Kick;
			} else if (rnd < 6) {
				return ACTION.Block;
			} else if (rnd < 7) {
				return ACTION.Jump;
			} else if (rnd < 8) {
				return ACTION.Crouch;
			} else {
				return ACTION.Dash;
			}
		}
	};

	const attackActionForBlackBossBelt = function (currentState) {
		//TODO: Does the final boss have a special skill nobody else does?
		const rnd = (Math.floor(100 * Math.random())) % 11;

		if (currentState === CROUCH_STATE) {
			if (rnd < 6) {
				return ACTION.Kick;
			} else if (rnd < 8) {
				return ACTION.Crouch;
			} else {
				return ACTION.Release;
			}
		} else if (currentState === JUMP_STATE) {
			if (rnd < 9) {
				return ACTION.Kick;
			}
		} else if (currentState === DASH_STATE) {
			if (rnd < 9) {
				return ACTION.Kick;
			}
		} else {
			if (rnd < 2) {
				return ACTION.Punch;
			} else if (rnd < 5) {
				return ACTION.Kick;
			} else if (rnd < 6) {
				return ACTION.Block;
			} else if (rnd < 7) {
				return ACTION.Jump;
			} else if (rnd < 8) {
				return ACTION.Crouch;
			} else {
				return ACTION.Dash;
			}
		}
	};
}