class BadGuy extends LittleGuy {
	constructor() {
		super();
		
		this.maxSpeed = (level < 3 ? level / 2 : 2) * Math.random() + 0.9;

		this.model.color = this.arm1.color = this.arm2.color = colors.badGuys.shirt;
	}

	update() {
		// walk toward player
		if (this.action === 'walking') {
			this.model.rotate.y = Math.atan2(
				player.model.translate.z - this.model.translate.z,
				player.model.translate.x - this.model.translate.x, 
			);
			if (!gameOver && !stopAttacking) {
				this.model.translate.x += this.maxSpeed * Math.cos(this.model.rotate.y);
				this.model.translate.z += this.maxSpeed * Math.sin(this.model.rotate.y);
			}

			// face forward
			this.model.rotate.y += TAU / 4;
		}

		// collision with player
		if (this.action !== 'floating-away') {
			if (!gameOver && !stopAttacking && !player.stunnedTimer && collision(this.model, player.model, 10)) {
				updateHealth(-1);
				player.stunnedTimer = 30;
				hurt.play();
				player.model.translate.x += 30 * Math.cos(this.model.rotate.y);
				player.model.translate.z += 30 * Math.sin(this.model.rotate.y);
			}
		}

		this.shadow.translate.x = this.model.translate.x;
		this.shadow.translate.z = this.model.translate.z;
	}
}
