class Key {
	constructor() {
		this.y0 = -15;
		this.model = new Zdog.Rect({
			addTo: illo,
			width: 1,
			height: 26,
			translate: {y: this.y0},
			stroke: 4,
			color: colors.key,
			fill: true,
		});

		new Zdog.Ellipse({
			addTo: this.model,
			diameter: 12,
			// quarters: 2,
			translate: { y: -20 },
			rotate: { z: TAU/4, y: TAU/2},
			stroke: 3,
			color: colors.key,
		});

		new Zdog.Rect({
			addTo: this.model,
			width: 3,
			height: 1,
			translate: {x: 3, y: 10},
			stroke: 4,
			color: colors.key,
			fill: true,
		});

		new Zdog.Rect({
			addTo: this.model,
			width: 3,
			height: 1,
			translate: {x: 3, y: 4},
			stroke: 4,
			color: colors.key,
			fill: true,
		});

		this.shadow = new Zdog.Ellipse({
			addTo: illo,
			rotate: {x: TAU / 4},
			diameter: 15,
			stroke: 0,
			fill: true,
			translate: {x: 0},
			color: '#00000008',
		});
	}

	destroy() {
		this.model.remove();
		this.shadow.remove();
		nonPlayers.keys.splice(nonPlayers.keys.indexOf(this), 1);
		keysound.play();
	}

	update() {
		// collision with player
		if (collision(this.model, player.model, 10)) {
			this.destroy();
			maps[level][room.z][room.x].keys -= 1;
			updateItems('key');
		}

		this.shadow.translate.x = this.model.translate.x;
		this.shadow.translate.z = this.model.translate.z;
	}
}
