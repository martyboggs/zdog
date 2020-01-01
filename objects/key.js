class Key {
	constructor() {
		this.y0 = -14;
		this.model = new Zdog.Rect({
			addTo: illo,
			width: 1,
			height: 26,
			translate: {y: this.y0},
			stroke: 4,
			color: '#c1bb27',
			fill: true,
		});

		new Zdog.Ellipse({
			addTo: this.model,
			diameter: 12,
			// quarters: 2,
			translate: { y: -20 },
			rotate: { z: TAU/4, y: TAU/2},
			stroke: 3,
			color: '#c1bb27',
		});

		new Zdog.Rect({
			addTo: this.model,
			width: 3,
			height: 1,
			translate: {x: 3, y: 10},
			stroke: 4,
			color: '#c1bb27',
			fill: true,
		});

		new Zdog.Rect({
			addTo: this.model,
			width: 3,
			height: 1,
			translate: {x: 3, y: 4},
			stroke: 4,
			color: '#c1bb27',
			fill: true,
		});

	}

	destroy() {
		this.model.remove();
		nonPlayers.keys.splice(nonPlayers.keys.indexOf(this), 1);
	}

	update() {
		// collision with player
		if (collision(this.model, player.model, 10)) {
			this.destroy();
			maps[level][room.z][room.x].keys -= 1;
			updateItems('key');
		}
	}
}
