class Plant {
	constructor() {
		this.y0 = -15;
		this.action;
		this.model = new Zdog.Rect({
			addTo: illo,
			width: 2,
			height: 2,
			translate: { x: inc(-300, 300), y: this.y0, z: inc(-300, 300) },
			rotate: {y: Math.random() * TAU},
			stroke: 30,
			color: '#00' + String(inc(66, 99)) + '00',
			fill: true,
		});
	}

	update() {
		switch (this.action) {
			case 'growing':
			break;
			case 'eating':
			break;
		}

	}
}
