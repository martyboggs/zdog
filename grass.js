class Grass {
    constructor() {
        this.action;
        this.model = new Zdog.Rect({
            addTo: illo,
            width: 2,
            height: 2,
            translate: { x: inc(-300, 300), y: -15, z: inc(-300, 300) },
            rotate: {y: inc(1, 360) * DTOR},
            stroke: 30,
            color: '#00' + String(inc(10, 99)) + '00',
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
