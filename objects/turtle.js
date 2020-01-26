class Turtle {
	constructor() {
		this.y0 = -9;
		this.action = 'walking';

		this.model = new Zdog.Rect({
			addTo: illo,
			width: 2,
			height: 2,
			translate: { x: inc(-300, 300), y: this.y0, z: inc(-300, 300) },
			rotate: {y: Math.random() * TAU},
			stroke: 16,
			color: colors.turtle.shell,
			fill: true,
		});

		new Zdog.Rect({
			addTo: this.model,
			width: 1,
			height: 2,
			translate: { x: 10, y: 4 },
			stroke: 7,
			color: colors.turtle.skin,
			fill: true,
		});

		for (var i = 0; i < 4; i += 1) {
			new Zdog.Rect({
				addTo: this.model,
				width: 1,
				height: 2,
				translate: { x: (i > 1 ? 1 : -1) * 4 - 1, y: 6, z: (i % 2 === 0 ? 1 : -1) * 8 },
				stroke: 3,
				color: colors.turtle.skin,
				fill: true,
			});
		}

		this.shadow = new Zdog.Ellipse({
			addTo: illo,
			rotate: {x: TAU / 4},
			diameter: 25,
			stroke: 0,
			fill: true,
			translate: {x: 0},
			color: '#00000008',
		});
	}

	destroy() {
		this.model.remove();
		this.shadow.remove();
		nonPlayers.turtles.splice(nonPlayers.turtles.indexOf(this), 1);
	}

	update() {
		if (collision(this.model, player.model, 10)) {
			this.destroy();
			maps[level][room.z][room.x].turtles -= 1;
			updatePower(500);
			sound.play();
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

		this.shadow.translate.x = this.model.translate.x;
		this.shadow.translate.z = this.model.translate.z;
	}
}
