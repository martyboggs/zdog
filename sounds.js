var music = $buzz({
	src: 'sounds/zdog.wav',
	loop: true,
	volume: 0.5,
});

var magic = $buzz({
	src: 'sounds/magic.wav',
	loop: true,
	preload: true,
});

var sound = $buzz({
	src: 'sounds/sound.wav',
	preload: true,
});

var keysound = $buzz({
	src: 'sounds/keysound.wav',
	volume: 1.2,
	preload: true,
});

window.confirm('Are you ready to play Super Doors?', function (result) {
	$buzz.context().resume().then(function () {
		music.play()
	});
});
