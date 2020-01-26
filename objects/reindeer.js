class Reindeer {
	constructor() {
		this.goalAngle;
		this.action = 'walking';
		this.turn = Math.random() > 0.5 ? 1 : -1;
		this.speed;
		this.maxSpeed = 0.5 + 0.5 * Math.random();
		this.y0 = -52;
		this.ySpeed = 0;

		this.model = new Zdog.Rect({
			addTo: illo,
			width: 40,
			height: 10,
			translate: { x: inc(-200, 200), y: this.y0, z: inc(-200, 200) },
			rotate: {y: Math.random() * TAU},
			stroke: 45,
			color: '#882' + String(inc(100, 999)),
			fill: true,
		});
		
		this.head = new Zdog.Shape({
			addTo: this.model,
			stroke: 40,
			translate: {x: 50, y: -30},
			color: '#882' + String(inc(100, 999)),
		});

		this.antlers = new Zdog.Ellipse({
			addTo: this.head,
			diameter: 15,
			quarters: 2,
			translate: { y: -30 },
			rotate: { z: TAU/4, y: TAU/4},
			stroke: 5,
			color: colors.reindeer.antlers,
		});

		this.eye = new Zdog.Shape({
			addTo: this.head,
			rotate: {y: TAU / 4},
			stroke: 4,
			fill: true,
			translate: {x: 15, y: -2, z: 7},
			color: '#fff',
		});

		this.eye2 = new Zdog.Shape({
			addTo: this.head,
			rotate: {y: TAU / 4},
			stroke: 4,
			fill: true,
			translate: {x: 15, y: -2, z: -7},
			color: '#fff',
		});

		this.pupil = new Zdog.Shape({
			addTo: this.head,
			rotate: {y: TAU / 4},
			stroke: 2,
			fill: true,
			translate: {x: 15, y: -2, z: 7},
		});

		this.pupil2 = new Zdog.Shape({
			addTo: this.head,
			rotate: {y: TAU / 4},
			stroke: 2,
			fill: true,
			translate: {x: 15, y: -2, z: -7},
		});

		this.nose = new Zdog.Shape({
			addTo: this.head,
			rotate: {y: TAU / 4},
			stroke: 5,
			fill: true,
			translate: {x: 20, y: 5},
			color: colors.reindeer.nose,
		});

		this.mouth = new Zdog.Rect({
			addTo: this.head,
			width: 15,
			height: 1,
			rotate: {y: TAU / 4},
			stroke: 1,
			fill: true,
			translate: {x: 13, y: 12},
			color: colors.reindeer.mouth,
		});
		
		this.legs = [];
		for (var i = 0; i < 4; i += 1) {
			this.legs.push(new Zdog.Anchor({ // optimize
				addTo: this.model,
				width: 0,
				height: 0,
				translate: {x: (i < 2 ? 30 : -30), y: 17, z: 10 * (i % 2 === 0 ? 1 : -1)},
				stroke: 10,
				color: colors.reindeer.legs,
				fill: true
			}));
			new Zdog.Rect({
				addTo: this.legs[this.legs.length - 1],
				width: 0,
				height: 30,
				stroke: 5,
				translate: {y: 17},
				color: colors.reindeer.legs,
				fill: true
			});
		}
	}

	destroy() {
		this.model.remove();
		nonPlayers.reindeers.splice(nonPlayers.reindeers.indexOf(this), 1);
	}

	update() {
		this.speed = this.maxSpeed;

		switch (this.action) {
			case 'walking':
				// // remove
				// if (!collision(this.model, {translate: {x: 0, z: 0}}, 300)) {
				// 	this.destroy();
				// }

				// // reindeer collision
				// var obstacles = nonPlayers.reindeers.concat(player);
				// for (var i = obstacles.length - 1; i >= 0; i -= 1) {
				//     if (obstacles[i] === this) continue;
				//     if (collision(this.model, obstacles[i].model, 50)) {
				//         this.speed = 0.25;
				//         this.turn = this.turn === 1 ? -1 : 1;
				//     }
				// }

				// bob head
				this.head.translate.y = 2 * Math.cos(frame * this.speed / 15) - 30;

				// move legs
				for (var i = 0; i < this.legs.length; i += 1) {
					this.legs[i].rotate.z = (Math.abs((frame + i * 20) % 60 - 30) - 15) * DTOR;
				}

				// turn
				this.model.rotate.y = this.model.rotate.y + this.turn * TAU / 1080;

				// move reindeer
				this.model.translate.x += this.speed * Math.cos(this.model.rotate.y);
				this.model.translate.z += this.speed * Math.sin(this.model.rotate.y);
			break;
			case 'reading':
				for (var i = 0; i < this.legs.length; i += 1) {
					if (this.legs[i].rotate.z > -60 * DTOR) {
						this.legs[i].rotate.z -= 1 * DTOR;
					}
				}
			break;
		}
	}
}
