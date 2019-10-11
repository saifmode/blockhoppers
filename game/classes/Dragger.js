import { config } from "../game.js";
import { c } from "../game.js";
import { canvas } from "../game.js";
import { gameBoard } from "../game.js";
import { homeAddresses } from "../game.js";
import { mouse } from "../eventListeners/mouse.js";
import { mousedown } from "../eventListeners/mouse.js";
import { hoppers } from "../game.js";
import { level } from "../game.js";
import { info_edited } from "../game.js";

export default class Dragger {
	constructor() {
		this.x = null;
		this.y = null;
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

		const dropBlockOnEmptySquare = () => {
			this.dragging = false;
			gameBoard[thisBlockY][thisBlockX] = this.whatBlockWas;
			if (this.draggingBlock) {
				c.fillStyle = config.colors.list[this.whatBlockWas];
				c.fillRect(
					this.x,
					this.y,
					config.board.spacing,
					config.board.spacing
				);
			}
			this.draggingBlock = false;
			level.new = true;
			if (info_edited.classList.contains("hidden")) {
				info_edited.classList.remove("hidden");
			}
		};
		const moveBlockToMousePosition = () => {
			this.x =
				Math.floor(mouse.x / config.board.spacing) *
				config.board.spacing;
			this.y =
				Math.floor(mouse.y / config.board.spacing) *
				config.board.spacing;
		};

		// Methods
		// Level 1
		// Skip mouseIsOnBoard tests if you want to drag the block anywhere, e.g. during level editing.
		let mouseIsOnBoard = () =>
			mouse.x < canvas.width &&
			mouse.x >= 0 &&
			mouse.y < canvas.height &&
			mouse.y >= 0;
		let mouseIsOverlappingBlock = () => {
			try {
				return ["1", "2", "3", "4", "5", "6"].includes(
					gameBoard[mouseGridY][mouseGridX]
				);
			} catch {
				return false;
			}
		};
		let hasStoppedDragging = () => this.dragging && !mousedown;
		let hasStoppedDraggingBlock = () => this.draggingBlock && !mousedown;
		let isDraggingBlock = () => this.draggingBlock && mousedown;
		let mouseOverlappingEmptySquare = () => {
			try {
				return gameBoard[mouseGridY][mouseGridX] == "0";
			} catch {
				return false;
			}
		};
		let blockOverlappingEmptySquare = () => {
			try {
				return gameBoard[thisBlockY][thisBlockX] == "0";
			} catch {
				return false;
			}
		};
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
					);
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
					);
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
			this.whatBlockWas = gameBoard[mouseGridY][mouseGridX];
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
		} else if (
			blockOverlappingHopper() &&
			!mouseOverlappingHopper() &&
			mouseOverlappingEmptySquare() &&
			mouseIsOnBoard()
		) {
			moveBlockToMousePosition();
		} else if (
			blockOverlappingHopper() &&
			(!mouseIsOnBoard() || !mouseOverlappingEmptySquare())
		) {
			this.draw();
			return;
		}

		if (isDraggingOverEmptySquare() && mouseIsOnBoard()) {
			moveBlockToMousePosition();
		} else if (
			hasDroppedBlockOnEmptySquare() ||
			hasDroppedBlockOnHopper()
		) {
			dropBlockOnEmptySquare();
		}

		if (isDraggingBlock()) {
			this.draw();
		}
	}

	draw() {
		c.save();
		c.beginPath();
		c.strokeStyle = "white";
		c.shadowColor = "white";
		c.shadowBlur = 12;
		c.fillStyle = config.colors.list[this.whatBlockWas];
		c.rect(this.x, this.y, config.board.spacing, config.board.spacing);
		c.fillRect(this.x, this.y, config.board.spacing, config.board.spacing);
		c.stroke();
		c.closePath();
		c.restore();
	}
}
