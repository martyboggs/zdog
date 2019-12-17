class LittleMan {
	constructor() {
		this.speed = 0;
		this.maxSpeed = 5;
		this.dir = 0;
		this.ySpeed = 0;
		this.y0 = -25;
		this.action = 'walking';

		this.model = new Zdog.Rect({
			addTo: illo,
			stroke: 10,
			width: 5,
			height: 5,
			translate: { x: inc(-200, 200), y: this.y0, z: inc(-200, 200) },
			rotate: {y: Math.random() * TAU},
			color: '#00ff88',
		});
		this.head = new Zdog.Shape({
			addTo: this.model,
			stroke: 10,
			translate: {x: 0, y: -13},
			color: '#999966',
		});
		this.arm1 = new Zdog.Shape({
			addTo: this.model,
			stroke: 3,
			path: [{}, {y: 10}],
			fill: true,
			translate: {x: 8, y: -6},
			color: '#00ff88',
		});
		this.arm2 = new Zdog.Shape({
			addTo: this.model,
			stroke: 3,
			path: [{}, {y: 10}],
			fill: true,
			translate: {x: -8, y: -6},
			color: '#00ff88',
		});
		this.pants = new Zdog.Rect({
			addTo: this.model,
			width: 5,
			height: 12,
			stroke: 6,
			translate: {x: 0, y: 15},
			color: '#0000ff',
		});
	}

	update() {
		switch (this.action) {
			case 'walking':
				this.arm1.rotate.x += DTOR * 5;
				this.arm2.rotate.x += DTOR * 5;
			break;
		}
	}
}
