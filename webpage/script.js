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
	let keyCode = e.keyCode;
	let eraser = "sprites/eraser.cur";
	if (keyCode === 69) selector++;
	if (keyCode === 81) selector--;
	// If key 'r' is pressed, use eraser tool
	if (keyCode === 82) {
		canvas.style.cursor = `url(${eraser}), auto`;
		return;
	}

	// Selector wraps around if value overflows sprites array length
	if (selector < 0) selector = sprites.length - 1;
	if (selector > sprites.length - 1) selector = 0;
	canvas.style.cursor = `url(${sprites[selector]}), auto`;
}

body.addEventListener('keydown', selectSprite);

// Paste sprite to canvas
const pasteSprite = (e) => {
	// If the eraser cursor is active and the item clicked is a sprite, delete the sprite
	if (canvas.style.cursor === `url("sprites/eraser.cur"), auto` &&  e.target.parentNode.className === 'sprite') { 
		const target = e.target;
		e.target.parentNode.removeChild(target);
		return;
	// Otherwise, if the eraser cursor is active, don't paste sprite from sprite array at selector index
	} else if (canvas.style.cursor === `url("sprites/eraser.cur"), auto`) {
		return;                                                               
	}
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
	e.target.appendChild(div);
}

// Listen for when right/left mouse are clicked
canvas.addEventListener('mousedown', pasteSprite);