import { config } from "../game.js";
import { c } from "../game.js";
import { canvas } from "../game.js";
import { gameBoard } from "../game.js";
import { homeAddresses } from "../game.js";
import { mouse } from "../eventListeners.js";
import { mousedown } from "../eventListeners.js";
import { hoppers } from "../game.js";

// During init() we log all movable blocks and create an array of objects that stores the block's home address
// and current address. Initially home and current are the same.
// When user first drags a block, its home address is stored in this selector object.
// Then when user drags the block to another location, we search the 'addresses' array
// for an object that matches the home address stored in this selector.
// Its new location is then stored in 'current'.
// The implication of this is that when the user goes to drag the block again, we loop through this process
// Only this time, the current address is different to the home address.
// The home address is referenced when dragging the block around, so that we can't pull the block
// more than one square away in any direction.
// Doing things this way means we don't have to have an object for every block, which
// gives primacy to the level map.
// This makes life easier when it comes to being able to edit levels etc.
// We also don't have to loop through a list of block objects every frame, because collisions are handled by
// the hopper object which only checks for collisions within one square of itself,
// and the loops in this object are only called when we drag a block.

export default class Selector {
	constructor() {
		this.x = 10000;
		this.y = 10000;
		this.homeX = null;
		this.homeY = null;
		this.dragging = false;
		this.draggingBlock = false;
		this.whatBlockWas = null;
	}

	update() {
		let mouseGridX = Math.floor(mouse.x / config.board.spacing);
		let mouseGridY = Math.floor(mouse.y / config.board.spacing);
		let thisBlockX = Math.floor(this.x / config.board.spacing);
		let thisBlockY = Math.floor(this.y / config.board.spacing);
		let colorOfBlock = config.colors.list[this.whatBlockWas];

		// Helper functions
		const getHomeAddress = () => {
			let address = homeAddresses.filter(
				address =>
					address.current.x == mouseGridX &&
					address.current.y == mouseGridY
			)[0]; // First key of address in object is home address, hence [0]
			this.homeX = address.home.x * config.board.spacing;
			this.homeY = address.home.y * config.board.spacing;
			this.whatBlockWas = gameBoard[mouseGridY][mouseGridX];
		};

		const setNewCurrentAddress = () => {
			homeAddresses.forEach(address => {
				if (
					address.home.x ==
						Math.floor(this.homeX / config.board.spacing) &&
					address.home.y ==
						Math.floor(this.homeY / config.board.spacing)
				) {
					address.current.x = thisBlockX;
					address.current.y = thisBlockY;
				}
			});};
		const dropBlockOnEmptySquare = () => {
			this.dragging = false;
			setNewCurrentAddress();
			gameBoard[thisBlockY][thisBlockX] = this.whatBlockWas;
			if (this.draggingBlock) {
				c.fillStyle = "pink";
				c.fillRect(
					this.x,
					this.y,
					config.board.spacing,
					config.board.spacing
				);
			}
			this.draggingBlock = false;};
		const moveBlockToMousePosition = () => {
			this.x =
				Math.floor(mouse.x / config.board.spacing) *
				config.board.spacing;
			this.y =
				Math.floor(mouse.y / config.board.spacing) *
				config.board.spacing;};

		// Methods
		// Level 1
		// Skip mouseIsInHomeRange tests if you want to drag the block anywhere, e.g. during level editing.
		let mouseIsInHomeRange = () =>
			mouse.x < this.homeX + config.board.spacing * 2 &&
			mouse.x > this.homeX - config.board.spacing &&
			mouse.y < this.homeY + config.board.spacing * 2 &&
			mouse.y > this.homeY - config.board.spacing &&
			mouse.x < canvas.width &&
			mouse.x >= 0 &&
			mouse.y < canvas.height &&
			mouse.y >= 0;
		let mouseIsOverlappingBlock = () => {
			try {
				return gameBoard[mouseGridY][mouseGridX] == "1";
			} catch {
				return false;
			}};
		let hasStoppedDragging = () => this.dragging && !mousedown;
		let hasStoppedDraggingBlock = () => this.draggingBlock && !mousedown;
		let isDraggingBlock = () => this.draggingBlock && mousedown;
		let mouseOverlappingEmptySquare = () => {
			try {
				return gameBoard[mouseGridY][mouseGridX] == "0";
			} catch {
				return false;
			}};
		let blockOverlappingEmptySquare = () => {
			try {
				return gameBoard[thisBlockY][thisBlockX] == "0";
			} catch {
				return false;
			}};
		let mouseOverlappingHopper = () =>
			hoppers.some(hopper => {
				try {
					let hopperGridX = Math.floor(
						hopper.x / config.board.spacing
					);
					let hopperGridY = Math.floor(
						hopper.y / config.board.spacing
					);
					return (
						mouseGridX == hopperGridX && mouseGridY == hopperGridY
					); // change to new if bugs occur
				} catch {
					return false;
				}
			});
		let blockOverlappingHopper = () =>
			hoppers.some(hopper => {
				try {
					let hopperGridX = Math.floor(
						hopper.x / config.board.spacing
					);
					let hopperGridY = Math.floor(
						hopper.y / config.board.spacing
					);
					return (
						thisBlockX == hopperGridX && thisBlockY == hopperGridY
					); // chjange to new if bugs occur
				} catch {
					return false;
				}
			});

		// Level2
		let hasStartedDraggingBlock = () =>
			!this.draggingBlock && mousedown && mouseIsOverlappingBlock();
		let hasStartedDraggingNothing = () =>
			!this.dragging && mousedown && !mouseIsOverlappingBlock();
		let isDraggingBlockOverHopper = () =>
			blockOverlappingHopper() && isDraggingBlock();
		let hasDroppedBlockOnHopper = () =>
			hasStoppedDraggingBlock() &&
			mouseOverlappingHopper() &&
			!isDraggingBlockOverHopper();
		let isDraggingOverEmptySquare = () =>
			isDraggingBlock() &&
			mouseOverlappingEmptySquare() &&
			!mouseOverlappingHopper();
		let hasDroppedBlockOnEmptySquare = () =>
			hasStoppedDraggingBlock() &&
			!mouseOverlappingHopper() &&
			blockOverlappingEmptySquare() &&
			!blockOverlappingHopper();

		if (hasStartedDraggingBlock()) {
			getHomeAddress();
			this.dragging = true;
			this.draggingBlock = true;
			gameBoard[mouseGridY][mouseGridX] = "0";
		} else if (hasStartedDraggingNothing()) {
			this.dragging = true;
			this.draggingBlock = false;
		}

		if (blockOverlappingHopper() && mouseOverlappingHopper()) {
			this.draw();
			return;
		} else if (blockOverlappingHopper() && !mouseOverlappingHopper() && mouseOverlappingEmptySquare() && mouseIsInHomeRange()) {
			moveBlockToMousePosition();
		} else if (blockOverlappingHopper() && (!mouseIsInHomeRange() || !mouseOverlappingEmptySquare())) {
			this.draw()
			return
		}

		if (isDraggingOverEmptySquare() && mouseIsInHomeRange()) {
			moveBlockToMousePosition()
		} else if (hasDroppedBlockOnEmptySquare() || hasDroppedBlockOnHopper()) {
			dropBlockOnEmptySquare();
		}

		if (isDraggingBlock()) {
			this.draw();
		}
	}

	draw() {
		c.save();
		c.beginPath();
		c.shadowColor = "white";
		c.shadowBlur = 12;
		c.strokeStyle = "rgb(255,191,0)";
		c.fillStyle = "rgba(150,50,100,0.2)";
		c.rect(
			this.homeX - config.board.spacing,
			this.homeY - config.board.spacing,
			config.board.spacing * 3,
			config.board.spacing * 3
		);
		c.fill();
		c.stroke();
		c.closePath();
		c.restore();

		c.fillStyle = "orange";
		c.fillRect(this.x, this.y, config.board.spacing, config.board.spacing);
	}
}
