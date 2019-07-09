// Array of sprites
let sprites = [
	[
		"sprites/bloober.gif",
		"sprites/goomba.gif",
		"sprites/mario.gif",
		"sprites/koopatroopa.gif"
	],
	[
		"sprites/brick.png",
		"sprites/emptyblock.png",
		"sprites/questionblock.gif"
	]
]

// Eraser sprite
let eraser = "sprites/eraser.cur";

// Canvas
const canvas = document.querySelector('#canvas');
const body = document.querySelector('body');

// Menu buttons
const charButton = document.querySelector('#char');
console.log(charButton);
const terrButton = document.querySelector('#terrain')

// Select sprite array: character or terrain
let arrSelect = 0;

// Select different sprite and change cursor accordingly
let sprSelect = 0;

const selectSprite = (e) => {
	// If 'e' or 'q' is pressed, cycle through sprites array accordingly. If 'r' is pressed, activate erase tool.
	let keyCode = e.keyCode;

	switch (keyCode) {
		case 69:
			sprSelect++;
			break;
		case 81:
			sprSelect--;
			break;
		case 82:
			// If erase tool is active, toggle it off
			if (canvas.style.cursor ===  `url("${eraser}"), auto`) {
				canvas.style.cursor = `url(${sprites[arrSelect][sprSelect]}), auto`;
			// Otherwise, toggle it on
			} else {
				canvas.style.cursor = `url(${eraser}), auto`;
				return;
			}
	}

	// Selector wraps around if value overflows sprites array length
	if (sprSelect < 0) sprSelect = sprites[arrSelect].length - 1;
	if (sprSelect > sprites[arrSelect].length - 1) sprSelect = 0;
	canvas.style.cursor = `url(${sprites[arrSelect][sprSelect]}), auto`;
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
		const img = sprites[arrSelect][sprSelect];
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

// Cycle between character sprites and terrain sprites
let changeSpr = e => {
	if (e.target.id === 'char') arrSelect = 0;
	if (e.target.id === 'terrain') arrSelect = 1;

	// Refresh cursor
	canvas.style.cursor = `url(${sprites[arrSelect][0]}), auto`;
}

// Listen for when the menu buttons are clicked. Switch selected array accordingly.
charButton.addEventListener('click', changeSpr);
terrButton.addEventListener('click', changeSpr);