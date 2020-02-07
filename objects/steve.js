class Steve extends LittleGuy {
	constructor() {
		super();
		
		this.model.color = this.arm1.color = this.arm2.color = colors.steve.shirt;
		this.pants.color = colors.steve.pants;
	}

	update() {
		// walk toward player
		if (this.action === 'walking') {
			// face forward
			this.model.rotate.y = Math.atan2(
				player.model.translate.z - this.model.translate.z,
				player.model.translate.x - this.model.translate.x, 
			);
			this.model.rotate.y += TAU / 4;
		}

		// collision with player
		if (collision(this.model, player.model, 10)) {
			if (!this.message) {
				this.message = 'Hey bro! ' + 
				// (Math.random() > 0.5 ? 'Why are you swinging your arms like that? ' : '') + 
				'You' + (player.power < 1000 ? 'r power\'s pretty low.' : '\'ve got a boatload of power!') + ' Power lets you lift stuff with MAGIC. It\'s a great way to thwart enemies. Eat more of these small, green animals to get more power!';
			}
			showMessage(this.message, 10000);
		}

		this.shadow.translate.x = this.model.translate.x;
		this.shadow.translate.z = this.model.translate.z;
	}
}
