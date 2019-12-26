class Snail {
	constructor() {
		this.y0 = -8;
		this.action = 'walking';

		this.model = new Zdog.Rect({
			addTo: illo,
			width: 2,
			height: 2,
			translate: { x: inc(-300, 300), y: this.y0, z: inc(-300, 300) },
			rotate: {y: Math.random() * TAU},
			stroke: 16,
			color: '#44608b',
			fill: true,
		});

		new Zdog.Rect({
			addTo: this.model,
			width: 1,
			height: 2,
			translate: { x: 10, y: 4 },
			stroke: 7,
			color: '#c1bb27',
			fill: true,
		});

		for (var i = 0; i < 4; i += 1) {
			new Zdog.Rect({
				addTo: this.model,
				width: 1,
				height: 2,
				translate: { x: (i > 1 ? 1 : -1) * 4 - 1, y: 6, z: (i % 2 === 0 ? 1 : -1) * 8 },
				stroke: 3,
				color: '#c1bb27',
				fill: true,
			});
		}
	}

	destroy() {
		this.model.remove();
		nonPlayers.snails.splice(nonPlayers.snails.indexOf(this), 1);
	}

	update() {
		if (collision(this.model, player.model, 10)) {
			this.destroy();
			map[room.z][room.x].snails -= 1;
			updatePower(500);
		}

		switch (this.action) {
			case 'walking':
				this.model.translate.x += 0.1 * Math.cos(this.model.rotate.y);
				this.model.translate.z += 0.1 * Math.sin(this.model.rotate.y);
		
				this.model.rotate.y += TAU / 1080;		
			break;
			case 'eating':
			break;
		}

	}
}
