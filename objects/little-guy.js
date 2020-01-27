class LittleGuy {
	constructor() {
		this.speed = 0;
		this.maxSpeed = 5;
		this.dir = 0;
		this.ySpeed = 0;
		this.y0 = -24;
		this.action = 'walking';

		this.model = new Zdog.Rect({
			addTo: illo,
			stroke: 10,
			width: 5,
			height: 5,
			translate: { x: inc(-200, 200), y: this.y0, z: inc(-200, 200) },
			rotate: {y: Math.random() * TAU},
			color: colors.guys.shirt,
		});
		this.head = new Zdog.Shape({
			addTo: this.model,
			stroke: 10,
			translate: {x: 0, y: -13},
			color: colors.guys.skin,
		});
		this.arm1 = new Zdog.Shape({
			addTo: this.model,
			stroke: 3,
			path: [{}, {y: 10}],
			fill: true,
			translate: {x: 8, y: -6},
			color: colors.guys.shirt,
		});
		this.arm2 = new Zdog.Shape({
			addTo: this.model,
			stroke: 3,
			path: [{}, {y: 10}],
			fill: true,
			translate: {x: -8, y: -6},
			color: colors.guys.shirt,
		});
		this.pants = new Zdog.Rect({
			addTo: this.model,
			width: 5,
			height: 12,
			stroke: 6,
			translate: {x: 0, y: 15},
			color: colors.guys.pants,
		});

		this.shadow = new Zdog.Ellipse({
			addTo: illo,
			rotate: {x: TAU / 4},
			diameter: 15,
			stroke: 0,
			fill: true,
			translate: {x: 0},
			color: '#00000008',
		});
	}

	update() {
		switch (this.action) {
			case 'walking':
				this.arm1.rotate.x += DTOR * 5;
				this.arm2.rotate.x += DTOR * 5;
			break;
			case 'riding':
				this.arm1.rotate.x += DTOR * 15;
				this.arm2.rotate.x += DTOR * 15;
				this.model.translate = {
					x: this.ridee.model.translate.x,
					y: -100,
					z: this.ridee.model.translate.z,
				};
				this.model.rotate.y = this.ridee.model.rotate.y + TAU / 4;
			break;
		}

		this.shadow.translate.x = this.model.translate.x;
		this.shadow.translate.z = this.model.translate.z;
	}
}
