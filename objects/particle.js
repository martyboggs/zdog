class Particle {
	constructor(translate, velocity) {
		this.xDir = Math.random() - 0.5;
		this.zDir = Math.random() - 0.5;
		this.velocity = Object.assign({}, velocity);

		this.model = new Zdog.Shape({
			addTo: illo,
			translate: translate,
			stroke: 3,
			color: colors.turtle.shell,
		});
	}

	destroy() {
		this.model.remove();
		nonPlayers.particles.splice(nonPlayers.particles.indexOf(this), 1);
	}

	update() {
		this.model.translate.x += this.xDir;
		this.model.translate.z += this.zDir;

		this.model.translate.x += this.velocity.x;
		this.model.translate.z += this.velocity.z;

		this.velocity.y += 0.09;
		this.model.translate.y += this.velocity.y;

		if (this.model.translate.y > 0) this.destroy();
	}
}
