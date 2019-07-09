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

// Eraser sprite
let eraser = "sprites/eraser.cur";

// Canvas
const canvas = document.querySelector('#canvas');
const body = document.querySelector('body');

// Select different sprite and change cursor accordingly
let selector = 0;

const selectSprite = (e) => {
	// If 'e' or 'q' is pressed, cycle through sprites array accordingly
	let keyCode = e.keyCode;

	switch (keyCode) {
		case 69:
			selector++;
			break;
		case 81:
			selector--;
			break;
		case 82:
			if (canvas.style.cursor ===  `url("${eraser}"), auto`) {
				canvas.style.cursor = `url(${sprites[selector]}), auto`;
			} else {
				canvas.style.cursor = `url(${eraser}), auto`;
				return;
			}
	}

	// Selector wraps around if value overflows sprites array length
	if (selector < 0) selector = sprites.length - 1;
	if (selector > sprites.length - 1) selector = 0;
	canvas.style.cursor = `url(${sprites[selector]}), auto`;
}

body.addEventListener('keydown', selectSprite);

// Paste sprite to canvas
const pasteSprite = (e) => {
	const target = e.target;
	// if the eraser cursor isn't active, proceed to paste sprite
	if (canvas.style.cursor !==  `url("${eraser}"), auto`) {
		// Create div to hold sprite image
		const div = document.createElement('div');
		div.className = 'sprite';
		div.style.left = `${e.layerX}px`;
		div.style.top = `${e.layerY}px`;

		// Create sprite image and add it to div
		const img = sprites[selector];
		const sprite = document.createElement('img');
		sprite.src = img;
		div.appendChild(sprite);

		// Append div to canvas
		target.appendChild(div);
	} else if (target.parentNode.className === 'sprite') { // Otherwise, if the eraser cursor is active and the item clicked is a sprite, delete the sprite
		target.parentNode.removeChild(target);
	}
}

// Listen for when right/left mouse are clicked
canvas.addEventListener('mousedown', pasteSprite);