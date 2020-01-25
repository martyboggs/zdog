class Player extends LittleGuy {
	constructor() {
		super();
		this.stunnedTimer = 0;
		this.health = 5;
		this.lives = 3;
		this.power = 0;
		this.items = [];

		this.model.color = this.arm1.color = this.arm2.color = colors.player.shirt;

		new Zdog.Rect({
			addTo: this.head,
			stroke: 2,
			width: 1,
			height: 1,
			fill: true,
			translate: {x: 2, y: -1, z: -4},
			color: colors.player.eyes,
		});

		new Zdog.Rect({
			addTo: this.head,
			stroke: 2,
			width: 1,
			height: 1,
			fill: true,
			translate: {x: -2, y: -1, z: -4},
			color: colors.player.eyes,
		});

		this.arm1.rotate.x = -TAU / 8;
	}

	update() {
		if (keys[65] === 2) {
			this.dir -= 3 * DTOR;
		}
		if (keys[68] === 2) {
			this.dir += 3 * DTOR;
		}
		this.speed = 0;
		if (keys[83] === 2) {
			this.speed = -3;
		}
		if (keys[87] === 2) {
			this.speed = 3
		}

		// // stick plant to player
		// for (var i = 0; i < nonPlayers.plants.length; i += 1) {
		//     if (collision(this.model, nonPlayers.plants[i].model, 10)) {
		//         nonPlayers.plants[i].uprooted = true;
		//         nonPlayers.plants[i].model.translate = {
		//             x: nonPlayers.plants[i].model.translate.x - this.model.translate.x, 
		//             z: nonPlayers.plants[i].model.translate.z - this.model.translate.z
		//         };
		//         this.model.addChild(nonPlayers.plants[i].model);
		//         nonPlayers.plants.splice(i, 1);
		//     }
		// }

		// magic
		if (keys[74] === 2) {
			if (!this.sound) {
				this.sound = magic.play();
			}

			this.head.translate.x = Math.cos(frame / 1.5);
			this.arm1.rotate.x = Math.cos(frame / 2) - TAU / 3;
			this.arm2.rotate.x = -Math.cos(frame / 2) - TAU / 3;
			for (var nonPlayer in nonPlayers) {
				if (nonPlayer === 'plants' || nonPlayer === 'effects' || nonPlayer === 'doors') continue;
				if (nonPlayer === 'littleGuys' && player.power <= 2000) continue;
				if (nonPlayer === 'badGuys' && player.power <= 2000) continue;
				if (nonPlayer === 'reindeers' && player.power <= 1000) continue;
				for (var i = 0; i < nonPlayers[nonPlayer].length; i += 1) {
					if (nonPlayers[nonPlayer][i].action === 'floating-away') continue;
					if (collision(this.model, nonPlayers[nonPlayer][i].model, 100)) {
						if (!nonPlayers[nonPlayer][i].effect) {
							nonPlayers[nonPlayer][i].effect = new Effect('magic', nonPlayers[nonPlayer][i]);
							nonPlayers.effects.push(nonPlayers[nonPlayer][i].effect);
						}
						nonPlayers[nonPlayer][i].action = 'floating';
						nonPlayers[nonPlayer][i].model.translate.y -= 0.5;
					}
				}
			}
			updatePower(-1);
		} else {
			// remove magic effect
			for (var nonPlayer in nonPlayers) {
				if (nonPlayer === 'effects') {
					for (var i = 0; i < nonPlayers[nonPlayer].length; i += 1) {
						if (nonPlayers[nonPlayer][i].type === 'magic') {
							nonPlayers[nonPlayer][i].model.remove();
							nonPlayers[nonPlayer][i].parent.effect = null;
							nonPlayers[nonPlayer].splice(i, 1);
						}
					}
				}
			}

			if (this.sound) {
				magic.stop(this.sound);
				delete this.sound;
			}

			this.arm1.rotate.x += this.speed * DTOR * 5;
			this.arm2.rotate.x += this.speed * DTOR * 5;
	
			this.model.translate.x += this.speed * Math.cos(this.dir);
			this.model.translate.z += this.speed * Math.sin(this.dir);
		}

		this.model.rotate.y = this.dir + TAU / 4;
// bug: when die, key is lost and not put back
		// change room
		if (this.model.translate.z < -350) {
			changeRoom(room.x, room.z - 1);
		} else if (this.model.translate.z > 350) {
			changeRoom(room.x, room.z + 1);
		}
		if (this.model.translate.x < -350) {
			changeRoom(room.x - 1, room.z);
		} else if (this.model.translate.x > 350) {
			changeRoom(room.x + 1, room.z);
		}

		if (this.stunnedTimer) {
			this.stunnedTimer -= 1;
			this.model.color = this.arm1.color = this.arm2.color = this.stunnedTimer % 6 === 0 ? colors.player.shirt : 'red';
		}
	}
}
