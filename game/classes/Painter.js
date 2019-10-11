import { config } from "../game.js";
import { c } from "../game.js";
import { canvas } from "../game.js";
import { gameBoard } from "../game.js";
import { homeAddresses } from "../game.js";
import { mouse } from "../eventListeners.js";
import { mousedown } from "../eventListeners.js";
import { hoppers } from "../game.js";
import { level } from "../game.js";
import { info_edited } from "../game.js";
import * as functions from "../functions.js";

export default class Painter {
	constructor() {
		this.x = null;
		this.y = null;
		this.dragging = false;
		this.blockType = "1";
		this.overlappingHopper = false;
	}

	update() {
		let colorOfBlock = config.colors.list[this.blockType];
		let mouseGridX = Math.floor(mouse.x / config.board.spacing);
		let mouseGridY = Math.floor(mouse.y / config.board.spacing);

		const moveBlockToMousePosition = () => {
			this.x =
				Math.floor(mouse.x / config.board.spacing) *
				config.board.spacing;
			this.y =
				Math.floor(mouse.y / config.board.spacing) *
				config.board.spacing;
		};

		let mouseIsOnBoard = () =>
			mouse.x < canvas.width &&
			mouse.x >= 0 &&
			mouse.y < canvas.height &&
			mouse.y >= 0;

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

		let hasStartedPainting = () =>
			!this.dragging && mousedown && mouseIsOnBoard();
		let isPainting = () => this.dragging && mousedown;
		let hasStoppedPainting = () => this.dragging && !mousedown;

		if (hasStartedPainting()) {
			this.dragging = true;
		} else if (hasStoppedPainting()) {
			this.dragging = false;
		}

		if (isPainting() && !mouseOverlappingHopper()) {
			this.overlappingHopper = false;
			if (mouseIsOnBoard()) {
				gameBoard[mouseGridY][mouseGridX] = this.blockType;
				level.new = true;
				if (info_edited.classList.contains("hidden")) {
					info_edited.classList.remove("hidden");
				}
			}
		} else if (mouseOverlappingHopper()) {
			this.overlappingHopper = true;
		} else {
			this.overlappingHopper = false;
		}

		moveBlockToMousePosition();
		this.draw();
	}

	draw() {
		c.save();
		c.beginPath();
		if (this.dragging) {
			c.shadowColor = "white";
			c.shadowBlur = 12;
		}

		c.strokeStyle = "white";
		c.fillStyle = this.overlappingHopper
			? "red"
			: config.colors.list[this.blockType];
		c.rect(this.x, this.y, config.board.spacing, config.board.spacing);
		c.fillRect(this.x, this.y, config.board.spacing, config.board.spacing);
		c.stroke();
		// 		if (this.blockType == "5") {
		// 	// console.log(this.x, this.y)
		// 	functions.drawLeftArrow(this.x, this.y);
		// } else if (this.blockType == "6") {
		// 	functions.drawRightArrow(this.x, this.y);
		// }
		c.closePath();
		c.restore();


	}
}
