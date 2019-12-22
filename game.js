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
var score = {
	points: 0,
	health: 5,
	lives: 3,
};
document.getElementById('health').innerHTML = score.health;
document.getElementById('lives').innerHTML = score.lives;

function updateHealth(change) {
	if (score.lives < 0) return;
	score.health += change;
	if (score.health <= 0) {
		score.health = 0;
		if (score.lives > 0) {
			score.health = 5;
		}
		showMessage('You died');
		updateLives(-1);
		changeRoom(1, 1);
		player.model.translate.x = 0;
		player.model.translate.z = 0;
	}
	document.getElementById('health').innerHTML = score.health;
}
function updateLives(change) {
	score.lives += change;
	if (score.lives < 0) {
		showMessage('Game Over');
	}
	if (score.lives >= 0) {
		document.getElementById('lives').innerHTML = score.lives;
	}
}
function showMessage(message) {
	var m = document.getElementById('messages');
	m.innerHTML = message;
	setTimeout(function () {
		m.innerHTML = '';
	}, 5000);
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
zdogCanvas.width = innerWidth;
zdogCanvas.height = innerHeight - 1;
document.body.style.height = innerHeight - 1 + 'px';

let illo = new Zdog.Illustration({
	element: '.zdog-canvas',
	dragRotate: true,
	zoom: 2,
	rotate: {x: -TAU / 16},
	translate: {y: 80},
});
var frame = 0;

var nonPlayers = {
	reindeers: [],
	plants: [],
	littleMans: [],
	badGuys: [],
	effects: [],
};
