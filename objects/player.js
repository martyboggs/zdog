class Player extends LittleMan {
    constructor() {
        super();

        this.arm1.rotate.x = TAU / 8;
    }

    update() {
        if (keys[65] === 2) {
            this.dir -= (this.speed >= 0 ? 3 : -3) * DTOR;
        }
        if (keys[68] === 2) {
            this.dir += (this.speed >= 0 ? 3 : -3) * DTOR;
        }
        this.speed = 0;
        if (keys[83] === 2) {
            this.speed = -3;
        }
        if (keys[87] === 2) {
            this.speed = 3
        }

        this.arm1.rotate.x += this.speed * DTOR * 5;
        this.arm2.rotate.x += this.speed * DTOR * 5;

        this.model.translate.x += this.speed * Math.cos(this.dir);
        this.model.translate.z += this.speed * Math.sin(this.dir);
        this.model.rotate.y = this.dir + TAU / 4;

        // stick grass to player
        for (var i = 0; i < nonPlayers.grasses.length; i += 1) {
            if (collision(this.model, nonPlayers.grasses[i].model, 10)) {
                nonPlayers.grasses[i].uprooted = true;
                nonPlayers.grasses[i].model.translate = {
                    x: nonPlayers.grasses[i].model.translate.x - this.model.translate.x, 
                    z: nonPlayers.grasses[i].model.translate.z - this.model.translate.z
                };
                this.model.addChild(nonPlayers.grasses[i].model);
                nonPlayers.grasses.splice(i, 1);
            }
        }

        // change room
        if (this.model.translate.z < -350) {
            changeRoom(0, -1);
        } else if (this.model.translate.z > 350) {
            changeRoom(0, 1);
        }
    }
}
