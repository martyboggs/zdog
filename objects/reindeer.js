class Reindeer {
    constructor() {
        this.goalAngle;
        this.action = 'walking';

        this.maxSpeed = 0.5 + 0.5 * Math.random();
        this.model = new Zdog.Rect({
            addTo: illo,
            width: 40,
            height: 10,
            translate: { x: inc(-200, 200), y: -52, z: inc(-200, 200) },
            rotate: {y: Math.random() * TAU},
            stroke: 45,
            color: '#882' + String(inc(100, 999)),
            fill: true,
        });
        
        this.head = new Zdog.Shape({
            addTo: this.model,
            stroke: 40,
            translate: {x: 50, y: -30},
            color: '#888888',
        });

        this.antlers = new Zdog.Ellipse({
            addTo: this.head,
            diameter: 15,
            quarters: 2,
            translate: { y: -30 },
            rotate: { z: TAU/4, y: TAU/4},
            stroke: 5,
            color: '#000',
        });

        this.eye = new Zdog.Shape({
            addTo: this.head,
            rotate: {y: TAU / 4},
            stroke: 2,
            fill: true,
            translate: {x: 15, y: -2, z: 7},
        });

        this.eye2 = new Zdog.Shape({
            addTo: this.head,
            rotate: {y: TAU / 4},
            stroke: 2,
            fill: true,
            translate: {x: 15, y: -2, z: -7},
        });

        this.nose = new Zdog.Shape({
            addTo: this.head,
            rotate: {y: TAU / 4},
            stroke: 5,
            fill: true,
            translate: {x: 20, y: 5},
        });

        this.mouth = new Zdog.Rect({
            addTo: this.head,
            width: 15,
            height: 1,
            rotate: {y: TAU / 4},
            stroke: 1,
            fill: true,
            translate: {x: 13, y: 12}
        });
        
        this.legs = [];
        for (var i = 0; i < 4; i += 1) {
            this.legs.push(new Zdog.Anchor({ // optimize
                addTo: this.model,
                width: 0,
                height: 0,
                translate: {x: (i < 2 ? 30 : -30), y: 17, z: 10 * (i % 2 === 0 ? 1 : -1)},
                stroke: 10,
                color: '#886429',
                fill: true
            }));
            new Zdog.Rect({
                addTo: this.legs[this.legs.length - 1],
                width: 0,
                height: 30,
                stroke: 5,
                translate: {y: 17},
                color: '#886429',
                fill: true
            });
        }
    }

    destroy() {
        this.model.remove();
        nonPlayers.reindeers.splice(nonPlayers.reindeers.indexOf(this), 1);
    }

    update() {
        switch (this.action) {
            case 'walking':
                // remove
                if (this.model.translate.x < -300) {
                    this.destroy();
                } else if (this.model.translate.x > 300) {
                    this.destroy();
                }
                if (this.model.translate.z < -300) {
                    this.destroy();
                } else if (this.model.translate.z > 300) {
                    this.destroy();
                }

                this.model.rotate.y += TAU / 1080;

                // move reindeer
                this.model.translate.x += this.maxSpeed * Math.cos(this.model.rotate.y);
                this.model.translate.z += this.maxSpeed * Math.sin(this.model.rotate.y);

                // bob head
                this.head.translate.y = 2 * Math.cos(frame * this.maxSpeed / 15) - 30;

                // move legs
                for (var i = 0; i < this.legs.length; i += 1) {
                    this.legs[i].rotate.z = (Math.abs((frame + i * 20) % 60 - 30) - 15) * DTOR;
                }
            break;
            case 'reading':
                for (var i = 0; i < this.legs.length; i += 1) {
                    if (this.legs[i].rotate.z > -60 * DTOR) {
                        this.legs[i].rotate.z -= 1 * DTOR;
                    }
                }
            break;
        }


    }
}
