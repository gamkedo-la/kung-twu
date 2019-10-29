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
	punch:{left:[{x:20, y:2}, {x:20, y:33}, {x:-19, y:33}, {x:-19, y:2}],
		right:[{x:14, y:3}, {x:14, y:33}, {x:53, y:33}, {x:53, y:3}]},
	kick:{left:[{x:43, y:12}, {x:43, y:60}, {x:-18, y:60}, {x:-18, y:12}],
		right:[{x:-3, y:12}, {x:-3, y:60}, {x:53, y:60}, {x:53, y:12}]}
};

const BasicEnemyCollisionBodyData = {
	walk:{left:[{x:17, y:-4}, {x:17, y:46}, {x:36, y:46}, {x:36, y:-4}],
		right:[{x:1, y:-4}, {x:1, y:46}, {x:21, y:46}, {x:21, y:-4}]},
	jump:{left:[{x:15, y:3}, {x:15, y:46}, {x:34, y:46}, {x:34, y:3}],
		right:[{x:2, y:2}, {x:2, y:46}, {x:24, y:46}, {x:24, y:2}]},
	crouch:{left:[{x:10, y:14}, {x:10, y:56}, {x:26, y:56}, {x:26, y:14}],
		right:[{x:10, y:14}, {x:10, y:56}, {x:26, y:56}, {x:26, y:14}]},
	dash:{left:[{x:15, y:3}, {x:15, y:46}, {x:34, y:46}, {x:34, y:3}],
		right:[{x:2, y:2}, {x:2, y:46}, {x:24, y:46}, {x:24, y:2}]},
	idle:{left:[{x:15, y:3}, {x:15, y:52}, {x:34, y:52}, {x:34, y:3}],
		right:[{x:2, y:2}, {x:2, y:52}, {x:24, y:52}, {x:24, y:2}]},
	j_kick:{left:[{x:15, y:3}, {x:15, y:46}, {x:34, y:46}, {x:34, y:3}],
		right:[{x:2, y:2}, {x:2, y:46}, {x:24, y:46}, {x:24, y:2}]},
	sweep:{left:[{x:15, y:3}, {x:15, y:46}, {x:34, y:46}, {x:34, y:3}],
		right:[{x:2, y:2}, {x:2, y:46}, {x:24, y:46}, {x:24, y:2}]},
	h_kick:{left:[{x:15, y:3}, {x:15, y:46}, {x:34, y:46}, {x:34, y:3}],
		right:[{x:2, y:2}, {x:2, y:46}, {x:24, y:46}, {x:24, y:2}]},
	punch:{left:[{x:10, y:3}, {x:10, y:46}, {x:24, y:46}, {x:24, y:3}],
		right:[{x:4, y:2}, {x:4, y:46}, {x:24, y:46}, {x:24, y:2}]},
	kick:{left:[{x:20, y:3}, {x:20, y:52}, {x:34, y:52}, {x:34, y:3}],
		right:[{x:2, y:3}, {x:2, y:52}, {x:20, y:52}, {x:20, y:3}]},
	block:{left:[{x:15, y:3}, {x:15, y:46}, {x:34, y:46}, {x:34, y:3}],
		right:[{x:2, y:2}, {x:2, y:46}, {x:24, y:46}, {x:24, y:2}]},
	knockback:{left:[{x:15, y:3}, {x:15, y:46}, {x:34, y:46}, {x:34, y:3}],
		right:[{x:2, y:2}, {x:2, y:46}, {x:24, y:46}, {x:24, y:2}]}
};