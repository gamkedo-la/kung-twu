//Hit Box Data
const PlayerCollisionBodyData = {
	walk:{left:[{x:19, y:3}, {x:19, y:53}, {x:34, y:53}, {x:34, y:3}],
		right:[{x:3, y:2}, {x:3, y:53}, {x:19, y:53}, {x:19, y:2}]},
	jump:{left:[{x:17, y:3}, {x:17, y:53}, {x:32, y:53}, {x:32, y:3}],
		right:[{x:4, y:2}, {x:4, y:53}, {x:22, y:53}, {x:22, y:2}]},
	crouch:{left:[{x:17, y:3}, {x:17, y:53}, {x:32, y:53}, {x:32, y:3}],
		right:[{x:4, y:2}, {x:4, y:53}, {x:22, y:53}, {x:22, y:2}]},
	dash:{left:[{x:17, y:3}, {x:17, y:53}, {x:32, y:53}, {x:32, y:3}],
		right:[{x:4, y:2}, {x:4, y:53}, {x:22, y:53}, {x:22, y:2}]},
	idle:{left:[{x:17, y:3}, {x:17, y:53}, {x:32, y:53}, {x:32, y:3}],
		right:[{x:4, y:2}, {x:4, y:53}, {x:22, y:53}, {x:22, y:2}]},
	j_kick:{left:[{x:17, y:3}, {x:17, y:53}, {x:32, y:53}, {x:32, y:3}],
		right:[{x:4, y:2}, {x:4, y:53}, {x:22, y:53}, {x:22, y:2}]},
	sweep:{left:[{x:17, y:3}, {x:17, y:53}, {x:32, y:53}, {x:32, y:3}],
		right:[{x:4, y:2}, {x:4, y:53}, {x:22, y:53}, {x:22, y:2}]},
	h_kick:{left:[{x:17, y:3}, {x:17, y:53}, {x:32, y:53}, {x:32, y:3}],
		right:[{x:4, y:2}, {x:4, y:53}, {x:22, y:53}, {x:22, y:2}]},
	punch:{left:[{x:12, y:3}, {x:12, y:53}, {x:22, y:53}, {x:22, y:3}],
		right:[{x:12, y:2}, {x:12, y:53}, {x:22, y:53}, {x:22, y:2}]},
	kick:{left:[{x:22, y:5}, {x:22, y:53}, {x:32, y:53}, {x:32, y:5}],
		right:[{x:4, y:5}, {x:4, y:53}, {x:18, y:53}, {x:18, y:5}]},
	block:{left:[{x:17, y:3}, {x:17, y:53}, {x:32, y:53}, {x:32, y:3}],
		right:[{x:4, y:2}, {x:4, y:53}, {x:22, y:53}, {x:22, y:2}]},
	knockback:{left:[{x:17, y:3}, {x:17, y:53}, {x:32, y:53}, {x:32, y:3}],
		right:[{x:4, y:2}, {x:4, y:53}, {x:22, y:53}, {x:22, y:2}]}
};

const PlayerAttackBodyData = {
	j_kick:{left:[{x:23, y:19}, {x:23, y:36}, {x:-13, y:36}, {x:-13, y:19}],
		right:[{x:13, y:19}, {x:13, y:36}, {x:48, y:36}, {x:48, y:19}]},
	sweep:{left:[{x:23, y:19}, {x:23, y:36}, {x:-13, y:36}, {x:-13, y:19}],
		right:[{x:13, y:19}, {x:13, y:36}, {x:48, y:36}, {x:48, y:19}]},
	h_kick:{left:[{x:23, y:19}, {x:23, y:36}, {x:-13, y:36}, {x:-13, y:19}],
		right:[{x:13, y:19}, {x:13, y:36}, {x:48, y:36}, {x:48, y:19}]},
	punch:{left:[{x:33, y:19}, {x:33, y:36}, {x:-13, y:36}, {x:-13, y:19}],
		right:[{x:3, y:19}, {x:3, y:36}, {x:51, y:36}, {x:51, y:19}]},
	kick:{left:[{x:23, y:19}, {x:23, y:36}, {x:-13, y:36}, {x:-13, y:19}],
		right:[{x:13, y:19}, {x:13, y:36}, {x:48, y:36}, {x:48, y:19}]}
};