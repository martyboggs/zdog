const TAU = Zdog.TAU; // easier to read constant
const DTOR = TAU / 360;
let isSpinning = true;
var frame = 0;

var keys = { // 1 up, 2 down
  65: 1,
  68: 1,
  83: 1,
  87: 1,
};

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
