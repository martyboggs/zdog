class Reindeer {
    constructor() {
        this.goalAngle;

        this.speed = {
            x: [1, -1][inc(0,1)],
            y: 1,
            z: [1, -1][inc(0,1)],
        };
        this.maxSpeed = 1 + Math.random();
        this.model = new Zdog.Rect({
            addTo: illo,
            width: 80,
            height: 20,
            translate: { x: inc(-200, 200), z: inc(-200, 200) },
            rotate: {y: inc(1, 360) * DTOR},
            stroke: 90,
            color: '#882' + String(inc(100, 999)),
            fill: true,
        });
        
        this.head = new Zdog.Shape({
            addTo: this.model,
            stroke: 80,
            translate: {x: 100, y: -60},
            color: '#888888',
        });

        this.antlers = new Zdog.Ellipse({
            addTo: this.head,
            diameter: 30,
            quarters: 2,
            translate: { y: -60 },
            rotate: { z: TAU/4, y: TAU/4},
            stroke: 10,
            color: '#000',
        });
        
        this.legs = [];
        for (var i = 0; i < 4; i += 1) {
            this.legs.push(new Zdog.Rect({
                addTo: this.model,
                width: 0,
                height: 0,
                translate: {x: (i < 2 ? 60 : -60), y: 35, z: 20 * (i % 2 === 0 ? 1 : -1)},
                stroke: 10,
                color: '#886429',
                fill: true
            }));
            new Zdog.Rect({
                addTo: this.legs[this.legs.length - 1],
                width: 0,
                height: 60,
                stroke: 10,
                translate: {y: 35},
                color: '#886429',
                fill: true
            });
        }
    }

    update() {
        // bounce off walls
        if (this.model.translate.x < -300) {
            this.speed.x = 1 * this.maxSpeed;
        } else if (this.model.translate.x > 300) {
            this.speed.x = -1 * this.maxSpeed;
        }

        if (this.model.translate.z < -300) {
            this.speed.z = 1 * this.maxSpeed;
        } else if (this.model.translate.z > 300) {
            this.speed.z = -1 * this.maxSpeed;
        }

        // rotate reindeer
        this.model.rotate.y = Math.atan2(this.speed.z, this.speed.x);
        // this.goalAngle = Math.atan2(this.speed.z, this.speed.x);
        // if (this.model.rotate.y < this.goalAngle) {
        //     this.model.rotate.y += TAU/90;
        // } else {
        //     this.model.rotate.y -= TAU/90;
        // }

        // move reindeer
        this.model.translate.x += this.speed.x;
        this.model.translate.z += this.speed.z;

        // bob head
        this.head.translate.y = 5 * Math.cos(frame * this.maxSpeed / 15) - 60;

        // move legs
        for (var i = 0; i < this.legs.length; i += 1) {
            this.legs[i].rotate.z = (Math.abs((frame + i * 20) % 60 - 30) - 15) * DTOR;
        }
    }
}
