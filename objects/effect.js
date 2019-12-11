class Effect {
	constructor(type, parent) {
		this.type = type;

		if (this.type === 'magic') {
			this.circle1 = new Zdog.Ellipse({
				addTo: parent,
				diameter: 15,
				// rotate: { z: TAU/4, y: TAU/4},
				stroke: 2,
				color: '#fff',
			});
		}
	}

	update() {
		switch (this.type) {
			case 'magic':
				this.
			break;
		}

	}
}
