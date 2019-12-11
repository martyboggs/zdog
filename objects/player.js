class Player extends LittleMan {
	constructor() {
		super();

		this.arm1.rotate.x = TAU / 8;
	}

	update() {
		if (keys[65] === 2) {
			this.dir -= (this.speed >= 0 ? 3 : -3) * DTOR;
		}
		if (keys[68] === 2) {
			this.dir += (this.speed >= 0 ? 3 : -3) * DTOR;
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
			this.head.translate.x = Math.cos(frame / 1.5);

			this.arm1.rotate.x = Math.cos(frame / 2) - TAU / 3;
			// this.arm1.rotate.y = Math.sin(frame / 2);
			this.arm2.rotate.x = -Math.cos(frame / 2) - TAU / 3;
			// this.arm2.rotate.y = Math.sin(frame / 2);

			for (var nonPlayer in nonPlayers) {
				for (var i = 0; i < nonPlayers[nonPlayer].length; i += 1) {
					if (collision(this.model, nonPlayers[nonPlayer][i].model, 100)) {
						nonPlayers[nonPlayer][i].action = 'floating';
					}
				}
			}
		} else {
			this.arm1.rotate.x += this.speed * DTOR * 5;
			this.arm2.rotate.x += this.speed * DTOR * 5;
	
			this.model.translate.x += this.speed * Math.cos(this.dir);
			this.model.translate.z += this.speed * Math.sin(this.dir);
			this.model.rotate.y = this.dir + TAU / 4;
		}

		// change room
		if (this.model.translate.z < -350) {
			changeRoom(0, -1);
		} else if (this.model.translate.z > 350) {
			changeRoom(0, 1);
		}
		if (this.model.translate.x < -350) {
			changeRoom(-1, 0);
		} else if (this.model.translate.x > 350) {
			changeRoom(1, 0);
		}
	}
}
