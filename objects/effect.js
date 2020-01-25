class Effect {
	constructor(type, parent) {
		this.type = type;
		this.parent = parent;
		this.start = frame;

		if (this.type === 'magic') {
			this.model = new Zdog.Ellipse({
				addTo: illo,
				diameter: 35,
				rotate: { x: TAU/4},
				translate: {x: parent.model.translate.x, y: -2, z: parent.model.translate.z},
				stroke: 2,
				color: colors.effects.magic,
				scale: {x: 0, y: 0},
			});
		}
	}

	update() {
		switch (this.type) {
			case 'magic':
				this.model.scale.x += 0.1;
				this.model.scale.y += 0.1;

				if ((frame - this.start) % 14 === 0) {
					this.model.scale.x = 0;
					this.model.scale.y = 0;
				}
			break;
		}

	}
}
