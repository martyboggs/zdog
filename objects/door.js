class Door {
	constructor() {
		this.y0 = -38;
		this.model = new Zdog.Rect({
			addTo: illo,
			width: 34,
			height: 76,
			translate: {y: this.y0},
			stroke: 2,
			color: colors.door,
			fill: true,
		});

		this.knob = new Zdog.Shape({
			addTo: this.model,
			translate: {x: 10, y: 0, z: 4},
			stroke: 5,
			color: colors.key,
		});

		this.keyhole = new Zdog.Rect({
			addTo: this.model,
			height: 5,
			width: 1,
			fill: true,
			translate: {x: 10, y: 9, z: 5},
			stroke: 2,
			color: '#000',
		});
	}

	destroy() {
	}

	update() {
		// collision with player
		if (!paused && !gameOver && player.key && collision(this.model, player.model, 20)) {
			player.key.model.remove();
			player.key = null;
			paused = true;
			levelUp.play();
			// no changeRoom after you win... so
			nonPlayers.keys.length = 0;
			setTimeout(function () {
				if (!maps[level + 1]) {
					gameOver = true;
					showMessage('You Win!');
				} else {
					level++;
					showMessage('Level ' + (level + 1));
					changeRoom(1, 1);
					player.model.translate.x = player.model.translate.z = 0;
				}
				paused = false;
			}, 2000);

		}
	}
}
