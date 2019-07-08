// Array of sprites
let sprites = [
	"sprites/bloober.gif",
	"sprites/goomba.gif",
	"sprites/mario.gif",
	"sprites/koopatroopa.gif",
	"sprites/brick.png",
	"sprites/emptyblock.png",
	"sprites/questionblock.gif"
]


// Canvas
const canvas = document.querySelector('#canvas');
const body = document.querySelector('body');

// Select different sprite and change cursor accordingly
let selector = 0;

const selectSprite = (e) => {
	switch (e.keyCode) {
		case 69: 
		selector++;
		break;
		case 81:
		selector-sw-;
	}

	if (selector < 0) selector = sprites.length - 1;
	if (selector > sprites.length - 1) selector = 0;
	canvas.style.cursor = `url(${sprites[selector]}), auto`;
}

body.addEventListener('keydown', selectSprite);

