var room = {x: 1, z: 1};
var map = [
	[{reindeers: 10}, {steves: 1}, {}],
	[{reindeers: 4},  {reindeers: 3, snails: 15},   {badGuys: 5, reindeers: 2, littleGuys: 4}],
	[{},              {},               {reindeers: 5}],
	[null,            {},               null],
];
function changeRoom(x, z) {
	if (!map[z] || !map[z][x]) {
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

	var obj = map[room.z][room.x];

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
	console.log(room, obj);
}
