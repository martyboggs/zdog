class Steve extends LittleGuy {
	constructor() {
		super();
		
		this.model.color = this.arm1.color = this.arm2.color = '#c71b9f';
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
				'You' + (player.power < 1000 ? 'r power\'s pretty low.' : '\'ve got a boatload of power!') + ' Power lets you lift stuff with your wand. It\'s a great way to thwart enemies. Collect more magic turtles to get more power!';
			}
			showMessage(this.message, 10000);
		}
	}
}
