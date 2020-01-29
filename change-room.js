var room = {x: 1, z: 1};
var level = 0;
var maps = [
	[
		[{reindeers: 10}, {turtles: 4, doors: 1}, {}],
		[{reindeers: 4},  {steves: 1, keys: 1, turtles: 3},   {reindeers: 2, littleGuys: 4}],
		[{},              {},               {reindeers: 5}],
		[null,            {},               null],
	],
	[
		[{reindeers: 1},              {turtles: 1}, {}],
		[{reindeers: 4},              {reindeers: 2, turtles: 3},   {badGuys: 5, reindeers: 2, littleGuys: 4}],
		[{doors: 1, badGuys: 3},      {keys: 1},               {reindeers: 5}],
		[null,                        {reindeers: 15},           null],
	],
	[
		[{reindeers: 10}, {turtles: 4, badGuys: 3}, {}],
		[{reindeers: 4},  {reindeers: 3, steves: 1, badGuys: 3},   {badGuys: 5, doors: 1, reindeers: 2, littleGuys: 4}],
		[{keys: 1},      {},               {reindeers: 5}],
		[null,            {},               null],
	],
	[
		[{reindeers: 10},         {turtles: 4, badGuys: 3}, {}],
		[{reindeers: 4},          {badGuys: 3, reindeers: 3, steves: 1, turtles: 3},   {badGuys: 5, reindeers: 2, littleGuys: 4}],
		[{doors: 1, badGuys: 10}, {badGuys: 12, keys: 1},                             {reindeers: 5}],
		[null,            {},               null],
	],
];
var originalMaps = [];
for (var i = 0; i < maps.length; i += 1) {
	originalMaps[i] = [];
	for (var j = 0; j < maps[i].length; j += 1) {
		originalMaps[i][j] = [];
		for (var k = 0; k < maps[i][j].length; k += 1) {
			if (!maps[i][j][k]) {
				originalMaps[i][j][k] = null;
			} else {
				originalMaps[i][j][k] = Object.assign({}, maps[i][j][k]);
			}
		}
	}
}

function resetLevel() {
	for (var i = 0; i < maps[level].length; i += 1) {
		for (var j = 0; j < maps[level][i].length; j += 1) {
			maps[level][i][j] = Object.assign({}, originalMaps[level][i][j]);
		}
	}
}

function addBoundaries() {
	if (!maps[level][room.z + 1] || !maps[level][room.z + 1][room.x]) { // bottom
		createWall('x', 300, 12);
	}
	if (!maps[level][room.z - 1] || !maps[level][room.z - 1][room.x]) { // top
		createWall('x', -300, 12);
	}

	if (!maps[level][room.z][room.x - 1]) { // left
		createWall('z', -gameSize - 10, 30);
	}
	if (!maps[level][room.z][room.x + 1]) { // right
		createWall('z', gameSize + 10, 30);
	}
}

function createWall(axis, offset, interval) {
	var stick = {
		addTo: illo,
		width: 3,
		height: 65,
		stroke: 2,
		color: colors.stick,
		fill: true,
		translate: {},
		rotate: {},
	};
	var size = gameSize - (axis==='z'?50:0);
	for (var i = 0; i < Math.round(2 * size / interval) + 2; i += 1) {
		var height = 30 * Math.random() + 45;
		stick.height = height;
		stick.translate[axis] = interval * i - size;
		stick.translate[axis==='x'?'z':'x'] = offset;
		stick.translate.y = -(height / 2);
		stick.rotate = {
			x: (10 * Math.random() - 5) * TAU / 360,
			z: (10 * Math.random() - 5) * TAU / 360,
		};
		nonPlayers.boundaries.push({
			model: new Zdog.Rect(stick),
			update: function () {}
		});
	}
}

function changeRoom(x, z) {
	document.body.style.background = colors.background[level];
	colors.plants[0] = lightenDarkenColor(colors.background[level], -10);
	colors.plants[1] = lightenDarkenColor(colors.background[level], -20);
	colors.plants[2] = lightenDarkenColor(colors.background[level], -30);

	if (!maps[level][z] || !maps[level][z][x]) { // if no room
		if (z - room.z === 1) { // if moving down
			player.model.translate.z = gameSize - 100;
		} else if (z - room.z === -1) { // if moving up
			player.model.translate.z = -gameSize + 100;
		}

		if (x - room.x === 1) {
			player.model.translate.x = gameSize;
		} else if (x - room.x === -1) {
			player.model.translate.x = -gameSize;
		}
		return;
	}

	if (z - room.z === 1) {
		player.model.translate.z = -(gameSize - 60) + 100;
	} else if (z - room.z === -1) {
		player.model.translate.z = (gameSize - 60) - 100;
	}

	if (x - room.x === 1) {
		player.model.translate.x = -(gameSize - 60);
	} else if (x - room.x === -1) {
		player.model.translate.x = (gameSize - 60);
	}

	room.x = x;
	room.z = z;

	var obj = maps[level][room.z][room.x];

	// remove everything but player
	for (var nonPlayer in nonPlayers) {
		for (var i = 0; i < nonPlayers[nonPlayer].length; i += 1) {
			nonPlayers[nonPlayer][i].model.remove();
			if (nonPlayers[nonPlayer][i].shadow) nonPlayers[nonPlayer][i].shadow.remove();
		}
		nonPlayers[nonPlayer].length = 0;
	}

	// add boundaries
	addBoundaries();

	// add plants
	for (var i = 0; i < 10; i += 1) {
		nonPlayers.plants.push(new Plant());
	}

	// add splotches
	for (var i = 0; i < 3; i += 1) {
		nonPlayers.splotches.push({
			model: new Zdog.Ellipse({
				addTo: illo,
				translate: {
					x: 1000 * Math.random() - 500,
					z: 500 * Math.random() - 250 - 500 
				},
				rotate: {x: TAU / 4},
				diameter: inc(100, 1305),
				stroke: 0,
				fill: true,
				color: '#00000003',
			}),
			update: function () {}
		});
	}

	// add objects
	for (var prop in obj) {
		if (nonPlayers[prop]) {
			for (var i = 0; i < obj[prop]; i += 1) {
				nonPlayers[prop].push(eval('new ' + prop.charAt(0).toUpperCase() + prop.slice(1, -1) + '()'));
			}
		}
	}
}
