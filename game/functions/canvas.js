import { c } from "../game.js";
import { canvas } from "../game.js";
import { config } from "../game.js";
import { gameBoard } from "../game.js";

export function drawGameBoard() {
	for (let y = 0; y < config.board.size; y++) {
		for (let x = 0; x < config.board.size; x++) {
			switch (gameBoard[y][x]) {
				case "0":
					drawBlock(x, y, config.colors.empty);
					break;
				case "1":
					drawBlock(x, y, config.colors.movable);
					break;
				case "2":
					drawBlock(x, y, config.colors.immovable);
					break;
				case "3":
					drawBlock(x, y, config.colors.spawn);
					break;
				case "4":
					drawBlock(x, y, config.colors.exit);
					break;
				case "5":
					drawBlock(x, y, config.colors.immovable);
					drawLeftArrow(x, y);
					break;
				case "6":
					drawBlock(x, y, config.colors.immovable);
					drawRightArrow(x, y);
					break;
				case "7":
					drawBlock(x, y, config.colors.badSpawn);
					break;
			}

			if (config.mode == "editor") drawGrid(x, y);
		}
	}

	function drawBlock(x, y, color) {
		c.save();
		c.beginPath();
		c.fillStyle = color;
		c.fillRect(
			x * config.board.spacing,
			y * config.board.spacing,
			x * config.board.spacing + config.board.spacing,
			y * config.board.spacing + config.board.spacing
		);
		c.fill();
		c.closePath();
		c.restore();
	}

	function drawLeftArrow(x, y) {
		c.save();
		c.beginPath();
		c.fillStyle = config.colors.movable;
		c.strokeStyle = config.colors.movable;
		c.moveTo(
			x * config.board.spacing,
			y * config.board.spacing + config.board.spacing / 2
		);
		c.lineTo(
			x * config.board.spacing + config.board.spacing,
			y * config.board.spacing
		);
		c.lineTo(
			x * config.board.spacing + config.board.spacing,
			y * config.board.spacing + config.board.spacing
		);
		c.lineTo(
			x * config.board.spacing,
			y * config.board.spacing + config.board.spacing / 2
		);
		c.stroke();
		c.fill();
		c.restore();
	}

	function drawRightArrow(x, y) {
		c.save();
		c.beginPath();
		c.fillStyle = config.colors.movable;
		c.strokeStyle = config.colors.movable;
		c.moveTo(
			x * config.board.spacing + config.board.spacing,
			y * config.board.spacing + config.board.spacing / 2
		);
		c.lineTo(x * config.board.spacing, y * config.board.spacing);
		c.lineTo(
			x * config.board.spacing,
			y * config.board.spacing + config.board.spacing
		);
		c.lineTo(
			x * config.board.spacing + config.board.spacing,
			y * config.board.spacing + config.board.spacing / 2
		);
		c.stroke();
		c.fill();
		c.restore();
	}

	function drawGrid(x, y) {
		c.save();
		c.beginPath();
		c.fillStyle = "white";
		c.arc(
			x * config.board.spacing,
			y * config.board.spacing,
			1,
			0,
			Math.PI * 2,
			true
		);
		c.fill();
		c.closePath();
		c.restore();
	}
}

export function clearScreen() {
	c.fillStyle = "black";
	c.fillRect(0, 0, canvas.width, canvas.height);
	c.fill();
}
