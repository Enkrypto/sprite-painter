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
	// If 'e' or 'q' is pressed, cycle through sprites array accordingly
	switch (e.keyCode) {
		case 69: 
		selector++;
		break;
		case 81:
		selector--;
	}

	// Selector wraps around if value overflows sprites array length
	if (selector < 0) selector = sprites.length - 1;
	if (selector > sprites.length - 1) selector = 0;
	canvas.style.cursor = `url(${sprites[selector]}), auto`;
}

body.addEventListener('keydown', selectSprite);

// Paste sprite to canvas
const pasteSprite = (e) => {
	// Create div to hold sprite image
	const div = document.createElement('div');
	div.className = 'sprite';
	console.log(e);	
	div.style.left = `${e.layerX}px`;
	div.style.top = `${e.layerY}px`;

	// Create sprite image and add it to div
	const img = sprites[selector];
	const sprite = document.createElement('img');
	sprite.src = img;
	div.appendChild(sprite);

	// Append div to canvas
	e.target.appendChild(div);
}

// Listen for when right/left mouse are clicked
canvas.addEventListener('mousedown', pasteSprite);