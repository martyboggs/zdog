class Door {
	constructor() {
		this.y0 = -38;
		this.model = new Zdog.Rect({
			addTo: illo,
			width: 34,
			height: 76,
			translate: {y: this.y0},
			stroke: 2,
			color: '#c1bb27',
			fill: true,
		});
	}

	destroy() {
	}

	update() {
		// collision with player
		if (player.items.indexOf('key') !== -1 && collision(this.model, player.model, 20)) {
			player.items.splice(player.items.indexOf('key'), 1);
			updateItems();
			if (!maps[level + 1]) {
				showMessage('You Win!');
			} else {
				level++;
				showMessage('Level ' + (level + 1));
				changeRoom(1, 1);
				player.model.translate.x = player.model.translate.z = 0;
			}
		}
	}
}
