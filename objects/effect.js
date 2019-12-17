class Effect {
	constructor(type, parent) {
		this.type = type;
console.log(type);
		if (this.type === 'magic') {
			this.circle1 = new Zdog.Ellipse({
				// addTo: parent,
				diameter: 35,
				rotate: { z: TAU/4, y: TAU/4},
				translate: {x: parent.translate.x, z: parent.translate.z},
				stroke: 5,
				color: '#fff',
			});
		}
	}

	update() {
		switch (this.type) {
			case 'magic':
				// this.circle1.diameter += 0.1;
			break;
		}

	}
}
