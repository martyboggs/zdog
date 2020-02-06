class Player extends LittleGuy {
	constructor() {
		super();
		this.stunnedTimer = 0;
		this.health = 5;
		this.lives = 3;
		this.power = 0;
		this.action = 'walking';
		this.turtle;
		this.dyingFrame;
		this.key;

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
		if (this.action === 'walking') {
			if (keys.a === 2 || keys.ArrowLeft === 2) {
				this.dir -= 3 * DTOR;
			}
			if (keys.d === 2 || keys.ArrowRight === 2) {
				this.dir += 3 * DTOR;
			}
			this.speed = 0;
			if (keys.s === 2 || keys.ArrowDown === 2) {
				this.speed = -2;
			}
			if (keys.w === 2 || keys.ArrowUp === 2) {
				this.speed = 3
			}

			// magic
			if (keys.j === 2) {
				if (!this.sound) {
					this.sound = magic.play();
				}

				this.head.translate.x = Math.cos(frame / 1.5);
				this.arm1.rotate.x = Math.cos(frame / 2) - TAU / 3;
				this.arm2.rotate.x = -Math.cos(frame / 2) - TAU / 3;
				for (var j = 0; j < canFloat.length; j += 1) {
					if (canFloat[j] === 'badGuys' && player.power <= 2000) continue;
					if (canFloat[j] === 'littleGuys' && player.power <= 1000) continue;
					if (canFloat[j] === 'reindeers' && player.power <= 1000) continue;
					for (var i = 0; i < nonPlayers[canFloat[j]].length; i += 1) {
						if (nonPlayers[canFloat[j]][i].action === 'floating-away') continue;
						if (collision(this.model, nonPlayers[canFloat[j]][i].model, 100)) {
							if (!nonPlayers[canFloat[j]][i].effect) {
								nonPlayers[canFloat[j]][i].effect = new Effect('magic', nonPlayers[canFloat[j]][i]);
								nonPlayers.effects.push(nonPlayers[canFloat[j]][i].effect);
							}
							nonPlayers[canFloat[j]][i].action = 'floating';
							nonPlayers[canFloat[j]][i].model.translate.y -= 0.5;
						}
					}
				}
				updatePower(-1);
			} else {
				// remove magic effect
				for (var i = 0; i < nonPlayers.effects.length; i += 1) {
					if (nonPlayers.effects[i].type === 'magic') {
						nonPlayers.effects[i].model.remove();
						nonPlayers.effects[i].parent.effect = null;
						nonPlayers.effects.splice(i, 1);
					}
				}

				if (this.sound) {
					magic.stop(this.sound);
					this.sound = null;
				}

				this.arm1.rotate.x += this.speed * DTOR * 5;
				this.arm2.rotate.x += this.speed * DTOR * 5;
		
				this.model.translate.x += this.speed * Math.cos(this.dir);
				this.model.translate.z += this.speed * Math.sin(this.dir);
			}

			if (this.key) {
				this.arm1.rotate.x = 0;
			}
		} else if (this.action === 'eating') {
			// do nothing
		} else  if (this.action === 'dying') {
			if (!this.dyingFrame) this.dyingFrame = frame;
			this.model.rotate.z += TAU / 4 / 10;
			this.model.rotate.x -= TAU / 4 / 10;
			if (frame - this.dyingFrame > 120) {
				this.action = 'walking';
				this.model.rotate.x = 0;
				this.model.rotate.z = 0;
				this.dyingFrame = 0;
				stopAttacking = false;
				playerDied();
			}
		}

		this.model.rotate.y = this.dir + TAU / 4;

		// change room
		if (this.model.translate.z < -gameSize) {
			changeRoom(room.x, room.z - 1);
		} else if (this.model.translate.z > gameSize) {
			changeRoom(room.x, room.z + 1);
		}
		if (this.model.translate.x < -gameSize) {
			changeRoom(room.x - 1, room.z);
		} else if (this.model.translate.x > gameSize) {
			changeRoom(room.x + 1, room.z);
		}

		if (this.stunnedTimer) {
			this.stunnedTimer -= 1;
			this.model.color = this.arm1.color = this.arm2.color = this.stunnedTimer % 6 === 0 ? colors.player.shirt : 'red';
		}

		this.shadow.translate.x = this.model.translate.x;
		this.shadow.translate.z = this.model.translate.z;
	}
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
