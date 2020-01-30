// game title
// showmessage bug, gets hidden
// collisions with inner walls
// more complex gameplay, more items
// sounds and music
// reindeer attack


const TAU = Zdog.TAU; // easier to read constant
const DTOR = TAU / 360;
let isSpinning = true;
var frame = 0;

var keys = { // 1 up, 2 down
	w: 1,
	a: 1,
	s: 1,
	d: 1,
	j: 1,
	ArrowUp: 1,
	ArrowLeft: 1,
	ArrowDown: 1,
	ArrowRight: 1,
};
var gameSize = 360;

var colors = {
	stick: '#5fd89e',
	background: [
		'#cef3e4',
		'#fbd5e4',
		'#f3eece',
		'#d3cef3',
		'#ced7f3',
	],
	player: {
		shirt: '#E57E94' || getRandomColor(),
		eyes: '#D3C0AB' || getRandomColor(),

	},
	guys: {
		shirt: '#96438B' || getRandomColor(),
		pants: '#B75C24' || getRandomColor(),
		skin: '#C00D19' || getRandomColor(),
	},
	badGuys: {
		shirt: '' || getRandomColor(),
	},
	steve: {
		shirt: '#D39718' || getRandomColor(),
		pants: '#A31777' || getRandomColor(),
	},
	turtle: {
		shell: '#44608b' || getRandomColor(),
		skin: '#c1bb27' || getRandomColor(),
	},
	door: '#926248' || getRandomColor(),
	key: '#c1bb27' || getRandomColor(),
	effects: {
		magic: '#000000' + '0D',
	},
	reindeer: {
		skin: '#ce9f81',
		antlers: '#000' || getRandomColor(),
		nose: '#000',
		mouth: '#000',
		legs: '#886429' || getRandomColor(),
	},
	plants: [/* populated later */],
};

function updateHealth(change) {
	if (player.lives < 0) return;
	player.health += change;
	if (player.health <= 0) {
		player.health = 0;
		if (player.lives > 0) {
			player.health = 5;
		}
		player.items.length = 0;
		updateItems();
		player.power = 0;
		updatePower();
		resetLevel();
		showMessage('You died');
		updateLives(-1);
		changeRoom(1, 1);
		player.model.translate.x = 0;
		player.model.translate.z = 0;
	}
	document.getElementById('health').innerHTML = player.health;
}
function updateLives(change) {
	player.lives += change;
	if (player.lives < 0) {
		showMessage('Game Over', 60 * 1000);
	}
	if (player.lives >= 0) {
		document.getElementById('lives').innerHTML = player.lives;
	}
}
function updateItems(item) {
	if (item) {
		player.items.push(item);
	}
	document.getElementById('items').innerHTML = player.items.length ? 'Items: ' + player.items.join(', ') : '';
}
function updatePower(change) {
	if (change) {
		player.power += change;
	}
	if (player.power > 3000) player.power = 3000;
	if (player.power < 0) player.power = 0;
	document.getElementById('power').innerHTML = player.power;
}
function showMessage(message, time) {
	var m = document.getElementById('messages');
	m.innerHTML = message;
	setTimeout(function () {
		m.innerHTML = '';
	}, time ? time : 5000);
}
function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
function lightenDarkenColor(col, amt) {
	var usePound = false;
	if (col[0] === "#") {
		col = col.slice(1);
		usePound = true;
	}
	var num = parseInt(col,16);
 	var r = (num >> 16) + amt;
	if (r > 255) r = 255;
	else if  (r < 0) r = 0; 
	var b = ((num >> 8) & 0x00FF) + amt;
	if (b > 255) b = 255;
	else if  (b < 0) b = 0;
	var g = (num & 0x0000FF) + amt;
	if (g > 255) g = 255;
	else if (g < 0) g = 0;
	return (usePound?'#':'') + (g | (b << 8) | (r << 16)).toString(16);
}

window.addEventListener('keydown', function (e) {
	if (keys[e.key] && keys[e.key] !== 2) keys[e.key] = 2;
});
window.addEventListener('keyup', function (e) {
	if (keys[e.key] && keys[e.key] !== 1) keys[e.key] = 1;
});

function inc(a, b) {
	return Math.round((b - a) * Math.random() + a);
}

var zdogCanvas = document.getElementById('zdog-canvas');
function resize() {
	zdogCanvas.width = innerWidth;
	zdogCanvas.height = innerHeight - 1;
	document.body.style.height = innerHeight - 1 + 'px';
}
resize();

let illo = new Zdog.Illustration({
	element: '.zdog-canvas',
	dragRotate: true,
	zoom: 2,
	rotate: {x: -TAU / 16},
	translate: {y: 80},
});

var nonPlayers = {
	reindeers: [],
	plants: [],
	turtles: [],
	littleGuys: [],
	badGuys: [],
	steves: [],
	effects: [],
	particles: [],
	keys: [],
	doors: [],
	splotches: [],
	boundaries: [],
};

var player = new Player();
changeRoom(1, 1);
document.getElementById('health').innerHTML = player.health;
document.getElementById('lives').innerHTML = player.lives;
document.getElementById('power').innerHTML = player.power;

var averageTimePerFrame = 0;
var time = 0;
function animate(timestamp) {
	for (var nonPlayer in nonPlayers) {
		for (var i = 0; i < nonPlayers[nonPlayer].length; i += 1) {
			nonPlayers[nonPlayer][i].update();
		}
	}
	player.update();

	// gravity
	let n;
	for (var nonPlayer in nonPlayers) {
		if (['plants', 'effects', 'doors', 'keys'].indexOf(nonPlayer) !== -1) continue;
		for (var i = 0; i < nonPlayers[nonPlayer].length; i += 1) {
			n = nonPlayers[nonPlayer][i];
			if (n.action === 'walking') {
				if (n.model.translate.y < n.y0 - 50) {
					n.action = 'floating-away';
					n.ySpeed = 0;
					maps[level][room.z][room.x][nonPlayer] -= 1;
				} else if (n.model.translate.y < n.y0) {
					n.ySpeed += 0.5;
					n.model.translate.y += n.ySpeed;
				} else {
					n.model.translate.y = n.y0;
					n.model.rotate.x = 0;
					n.model.rotate.z = 0;
				}
			} else if (n.action === 'floating-away') {
				n.ySpeed -= 0.5;
				n.model.translate.y += n.ySpeed;
				if (n.model.translate.y < n.y0 - 350) {
					n.model.remove();
					if (n.shadow) n.shadow.remove();
				}
			} else if (n.action === 'floating') {
				n.model.rotate.x += 0.007;
				n.model.rotate.z += 0.005;
				if (keys.j === 1) {
					n.action = 'walking';
					n.ySpeed = 0;
				}
			}
		}
	}

	illo.translate.x = -player.model.translate.x;

	illo.rotate.y = -player.model.translate.x / 2000;

	illo.updateRenderGraph();
	frame = requestAnimationFrame( animate );
	// document.getElementById('fps').innerHTML = frame / timestamp * 1000;
}

function collision(a, b, distance) {
	if (a.translate.x > b.translate.x - distance && a.translate.x < b.translate.x + distance &&
	a.translate.z > b.translate.z - distance && a.translate.z < b.translate.z + distance) {
		return true;
	}
	return false;
}

animate();

var fullscreen;
document.getElementById('fullscreenyes').addEventListener('click', function (e) {
	document.body.requestFullscreen();
	document.getElementById('fullscreen').style.display = 'none';
	setTimeout(function () {
		resize();
	}, 10);
	fullscreen = 'on';

	// let gl = zdogCanvas.getContext('webgl');
	// gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
});
document.getElementById('fullscreenno').addEventListener('click', function (e) {
	fullscreen = 'off';
	document.getElementById('fullscreen').style.display = 'none';
});
document.addEventListener('fullscreenchange', function (e) {
	if (!document.fullscreenElement) {
		document.getElementById('fullscreen').style.display = 'block';
	}
});
