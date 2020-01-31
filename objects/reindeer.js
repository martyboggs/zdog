class Reindeer {
	constructor() {
		this.action = 'walking';
		this.y0 = -52;
		this.ySpeed = 0;
		this.color = lightenDarkenColor(colors.reindeer.skin, 50 * Math.random() - 25);
		this.sustainRun = -121;

		this.model = new Zdog.Rect({
			addTo: illo,
			width: 40,
			height: 10,
			translate: { x: inc(-gameSize, gameSize), y: this.y0, z: inc(-gameSize, gameSize) },
			rotate: {y: Math.random() * TAU},
			stroke: 45,
			color: this.color,
			fill: true,
		});
		this.currentAngle = this.model.rotate.y;
		this.startSpeed = 0.7 + 0.5 * Math.random();
		this.speed = this.startSpeed;
		this.goalSpeed = this.speed;
		this.matchPlayerAngle = 0.03;
		this.matchAngle = 0.025;
		this.deceleration = -0.01;
		this.acceleration = 0.1;
		
		this.head = new Zdog.Shape({
			addTo: this.model,
			stroke: 40,
			translate: {x: 50, y: -30},
			color: lightenDarkenColor(this.color, 20),
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

		this.shadow = new Zdog.RoundedRect({
			addTo: illo,
			rotate: {x: TAU / 4},
			width: 80,
			cornerRadius: 40,
			height: 50,
			stroke: 0,
			fill: true,
			translate: {x: 0},
			color: '#00000008',
		});

		if (Math.random() > 0.97) {
			this.rider = new LittleGuy();
			this.rider.action = 'riding';
			this.rider.ridee = this;
			this.rider.shadow.remove();
			nonPlayers.littleGuys.push(this.rider);
		}
	}

	destroy() {
		this.model.remove();
		this.shadow.remove();
		nonPlayers.reindeers.splice(nonPlayers.reindeers.indexOf(this), 1);
	}

	update() {
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
				//         this.goalSpeed = 0.25;
				//         this.turn = this.turn === 1 ? -1 : 1;
				//     }
				// }

				// bob head
				this.head.translate.y = 2 * Math.cos(frame * Math.round(this.speed) / 15) - 30;

				// move legs
				for (var i = 0; i < this.legs.length; i += 1) {
					this.legs[i].rotate.z = (
						Math.abs(
							(frame + i * 20) % 60 - 30
						) - 15
					) * DTOR * this.speed;
				}

				// turn
				// this.model.rotate.y += this.goalSpeed * TAU / 1080;
				var diff = Math.atan2(
					player.model.translate.z - this.model.translate.z, 
					player.model.translate.x - this.model.translate.x,
				);

				if (frame - this.sustainRun < 120, Math.abs(this.currentAngle - diff) < TAU / 32) {
					// fast!
					this.goalSpeed = this.startSpeed * 3;
					if (!this.sustainRun) this.sustainRun = frame;
				} else {
					this.sustainRun = 0;
					this.goalSpeed = this.startSpeed;
					this.model.rotate.y += diff > this.model.rotate.y ? this.matchPlayerAngle : -this.matchPlayerAngle;
				}

				// ...
				// if (Math.abs(this.model.rotate.y - diff) > Math.PI) {
			break;
			case 'breaking':
				for (var i = 0; i < this.legs.length; i += 1) {
					if (this.legs[i].rotate.z > -60 * DTOR) {
						this.legs[i].rotate.z -= 1 * DTOR;
					}
				}
			break;
		}

		// collision with player
		if (this.action !== 'floating-away') {
			if (!gameOver && !stopAttacking && !player.stunnedTimer && collision(this.model, player.model, 10)) {
				updateHealth(-1);
				player.stunnedTimer = 30;

				player.model.translate.x += 30 * Math.cos(this.model.rotate.y);
				player.model.translate.z += 30 * Math.sin(this.model.rotate.y);
			}
		}

		this.speed += this.speed < this.goalSpeed ? this.acceleration : this.deceleration;
		this.currentAngle += this.currentAngle < this.model.rotate.y ? this.matchAngle : -this.matchAngle;

		// move reindeer
		if (this.action !== 'floating' && this.action !== 'floating-away') {
			this.model.translate.x += this.speed * Math.cos(this.currentAngle);
			this.model.translate.z += this.speed * Math.sin(this.currentAngle);
		}
		
		this.boundaryCollision();

		if (this.shadow) {
			this.shadow.translate.x = this.model.translate.x;
			this.shadow.translate.z = this.model.translate.z;
			this.shadow.rotate.z = this.model.rotate.y;
		}
	}

	boundaryCollision() {
		if (this.model.translate.z < -gameSize + 100 && (!maps[level][room.z - 1] || !maps[level][room.z - 1][room.x])) { // top
			this.model.translate.z = -gameSize + 100;
		} else if (this.model.translate.z > gameSize - 100 && (!maps[level][room.z + 1] || !maps[level][room.z + 1][room.x])) { // bottom
			this.model.translate.z = gameSize - 100;
		}
		if (this.model.translate.x < -gameSize + 30 && (!maps[level][room.z][room.x - 1])) {
			this.model.translate.x = -gameSize + 30;
		} else if (this.model.translate.x > gameSize - 30 && (!maps[level][room.z][room.x + 1])) {
			this.model.translate.x = gameSize - 30;
		}
	}
}
