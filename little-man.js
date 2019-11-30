class LittleMan {
    constructor() {
        this.model = new Zdog.Rect({
            addTo: illo,
            stroke: 10,
            width: 10,
            height: 10,
            translate: {x: 0, y: -75},
            color: '#00ff88',
        });
        this.head = new Zdog.Shape({
            addTo: this.model,
            stroke: 10,
            translate: {x: 0, y: -15},
            color: '#999966',
        });
        this.pants = new Zdog.Rect({
            addTo: this.model,
            width: 5,
            height: 5,
            stroke: 10,
            translate: {x: 0, y: 15},
            color: '#0000ff',
        });
    }
}
