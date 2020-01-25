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
	document.body.background = colors.background[level];
}

function changeRoom(x, z) {
	if (!maps[level][z] || !maps[level][z][x]) {
		if (z - room.z === 1) {
			player.model.translate.z = 350;
		} else if (z - room.z === -1) {
			player.model.translate.z = -350;
		}

		if (x - room.x === 1) {
			player.model.translate.x = 350;
		} else if (x - room.x === -1) {
			player.model.translate.x = -350;
		}
		return;
	}

	if (z - room.z === 1) {
		player.model.translate.z = -290;
	} else if (z - room.z === -1) {
		player.model.translate.z = 290;
	}

	if (x - room.x === 1) {
		player.model.translate.x = -290;
	} else if (x - room.x === -1) {
		player.model.translate.x = 290;
	}

	room.x = x;
	room.z = z;

	var obj = maps[level][room.z][room.x];

	// remove everything but player
	for (var nonPlayer in nonPlayers) {
		for (var i = 0; i < nonPlayers[nonPlayer].length; i += 1) {
			nonPlayers[nonPlayer][i].model.remove();
		}
		nonPlayers[nonPlayer].length = 0;
	}

	// add plants
	for (var i = 0; i < 10; i += 1) {
		nonPlayers.plants.push(new Plant());
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
