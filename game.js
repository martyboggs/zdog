// colors
// game title
// showmessage bug, gets hidden
// boundary walls // collisions with inner walls
// more complex gameplay
// sounds and music
// arrow key support
// make guys ride reindeers
// eat turtles animation
// show message when you eat your first turtle
// ground patches
// fake shadows
// reindeer attack

const TAU = Zdog.TAU; // easier to read constant
const DTOR = TAU / 360;
let isSpinning = true;
var frame = 0;

var keys = { // 1 up, 2 down
	65: 1,
	68: 1,
	83: 1,
	87: 1,
	74: 1, // j
};

var colors = {
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
	door: '#c1bb27' || getRandomColor(),
	key: '#c1bb27' || getRandomColor(),
	effects: {
		magic: '#ffffff99' || getRandomColor(),
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
	if (keys[e.which] && keys[e.which] !== 2) keys[e.which] = 2;
});
window.addEventListener('keyup', function (e) {
	if (keys[e.which] && keys[e.which] !== 1) keys[e.which] = 1;
});

function inc(a, b) {
	return Math.round((b - a) * Math.random() + a);
}

var zdogCanvas = document.getElementById('zdog-canvas');
function resize() {
	zdogCanvas.width = innerWidth;
	zdogCanvas.height = innerHeight - 1;
	document.body.style.height = innerHeight - 1 + 'px';
	console.log(innerHeight);
}
resize();

let illo = new Zdog.Illustration({
	element: '.zdog-canvas',
	dragRotate: true,
	zoom: 2,
	rotate: {x: -TAU / 16},
	translate: {y: 80},
});
var frame = 0;
