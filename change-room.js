var room = {x: 1, z: 1};
var map = [
	[{reindeers: 10}, {littleMans: 10}, {}],
	[{reindeers: 4}, {reindeers: 3}, {badGuys: 5, reindeers: 2, littleMans: 4}],
	[{}, {}, {reindeers: 5}],
];
function changeRoom(x, z) {
	if (!map[room.z + z] || !map[room.z + z][room.x + x]) {
		if (z === 1) {
			player.model.translate.z = 350;
		} else if (z === -1) {
			player.model.translate.z = -350;
		}

		if (x === 1) {
			player.model.translate.x = 350;
		} else if (x === -1) {
			player.model.translate.x = -350;
		}
		return;
	}

	room.x += x;
	room.z += z;

	if (z === 1) {
		player.model.translate.z = -290;
	} else if (z === -1) {
		player.model.translate.z = 290;
	}

	if (x === 1) {
		player.model.translate.x = -290;
	} else if (x === -1) {
		player.model.translate.x = 290;
	}

	var obj = map[room.z][room.x];

	// remove nonPlayers
	for (var nonPlayer in nonPlayers) {
		for (var i = 0; i < nonPlayers[nonPlayer].length; i += 1) {
			nonPlayers[nonPlayer][i].model.remove();
		}
		nonPlayers[nonPlayer].length = 0;
	}

	// grow plant
	for (var i = 0; i < 10; i += 1) {
		nonPlayers.plants.push(new Plant());
	}

	// objects
	for (var prop in obj) {
		if (nonPlayers[prop]) {
			for (var i = 0; i < obj[prop] - 1; i += 1) {
				nonPlayers[prop].push(eval('new ' + prop.charAt(0).toUpperCase() + prop.slice(1, -1) + '()'));
			}
		}
	}
	console.log(room, obj);
}
changeRoom(0, 0);
