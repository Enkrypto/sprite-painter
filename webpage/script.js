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
const charBtn = document.querySelector('#char');
const terrBtn = document.querySelector('#terrain');
const resetBtn = document.querySelector('#reset');

// Select sprite subarray: character or terrain
let arrSelect = 0;

// Select sprite in subarray
let sprSelect = 0;

// Generate random number
let ranNum = () => {
	return Math.floor(Math.random() * 100)
}

// Change cursor to selected sprite
const selectSprite = (e) => {
	// If 'e' or 'q' is pressed, cycle through sprites subarray accordingly.
	// If 'r' is pressed, activate erase tool.
	const keyCode = e.keyCode;
	const sprArr = sprites[arrSelect];
	let sprite = sprites[arrSelect][sprSelect];

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
				canvas.style.cursor = `url(${sprite}), auto`;
			// Otherwise, toggle it on
			} else {
				canvas.style.cursor = `url(${eraser}), auto`;
				return;
			}
		case 84:
			// Generate random color
			const ranColor = `rgb(${ranNum()}, ${ranNum()}, ${ranNum()}`;
			// Set background color to random color
			canvas.style.backgroundColor = ranColor;

	}
	

	// Selector wraps around if value overflows sprites subarray length
	if (sprSelect < 0) sprSelect = sprArr.length - 1;
	if (sprSelect > sprArr.length - 1) sprSelect = 0;
	sprite = sprites[arrSelect][sprSelect];
	canvas.style.cursor = `url(${sprite}), auto`;
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

		// Create sprite image
		const img = sprites[arrSelect][sprSelect];
		const sprite = document.createElement('img');
		sprite.src = img;

		// Append it to div
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
charBtn.addEventListener('click', changeSpr);
terrBtn.addEventListener('click', changeSpr);

// Reset canvas
const reset = () => {
	// While canvas still has a children nodes, remove the first child
	while (canvas.firstChild) canvas.removeChild(canvas.firstChild);
	// Set canvas background color back to white
	canvas.style.backgroundColor = 'white';
}

// Reset canvas when 'reset' button is pressed
resetBtn.addEventListener('click', reset);