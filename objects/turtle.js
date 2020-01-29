class Turtle {
	constructor() {
		this.y0 = -9;
		this.action = 'walking';
		this.dyingFrame = 0; 

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
		switch (this.action) {
			case 'walking':
				if (collision(this.model, player.model, 10)) {
					player.action = 'eating';
					this.action = 'dying';
					maps[level][room.z][room.x].turtles -= 1;
				}
		
				this.model.translate.x += 0.1 * Math.cos(this.model.rotate.y);
				this.model.translate.z += 0.1 * Math.sin(this.model.rotate.y);
		
				this.model.rotate.y += TAU / 1080;		
			break;
			case 'dying':
				player.arm1.rotate.x = 0.7 * TAU;
				player.arm1.rotate.z = 0;
				player.arm2.rotate.x = 0.7 * TAU;
				player.arm2.rotate.z = 0;
				player.model.addChild(this.model);
				this.model.translate.x = 0;
				this.model.translate.z = -13;
				this.model.translate.y = -15;
				this.dyingFrame = frame;
				this.action = 'dying2';
			break;
			case 'dying2':
				if (frame - this.dyingFrame < 40 && frame % 2) {
					nonPlayers.particles.push(new Particle({
						x: player.model.translate.x + 5 * Math.cos(player.model.rotate.y - TAU/4),
						y: player.model.translate.y - 15,
						z: player.model.translate.z + 5 * Math.sin(player.model.rotate.y - TAU/4)
					}, {
						x: Math.cos(player.model.rotate.y - TAU/4), 
						y: 0, 
						z: Math.sin(player.model.rotate.y - TAU/4)
					}));
				}
				this.model.translate.y = -15 + Math.abs((frame - this.dyingFrame) % 10 - 5);
				if (frame - this.dyingFrame > 60) {
					updatePower(500);
					sound.play();
					player.action = 'walking';
					player.model.removeChild(this.model);
					player.arm1.rotate.x = 0.9 * TAU;
					player.arm2.rotate.x = 0.8 * TAU;
					this.destroy();
				}
			break;
		}

		if (this.shadow) {
			this.shadow.translate.x = this.model.translate.x;
			this.shadow.translate.z = this.model.translate.z;
		}
	}
}
