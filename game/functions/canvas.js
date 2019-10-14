import { c } from "../game.js";
import { canvas } from "../game.js";
import { config } from "../game.js";
import { gameBoard } from "../game.js";
import { level } from "../game.js";
import { homeAddresses } from "../game.js";
import { selector } from "../game.js"

export function drawGameBoard() {
	for (let y = 0; y < config.board.size; y++) {
		for (let x = 0; x < config.board.size; x++) {
			// if (!selector.draggingBlock) drawAnchors();\	
			if (config.grid)
				drawGrid(x, y);

			switch (gameBoard[y][x]) {
				case "0":
					let background = level.paused ? "#003300" : config.colors.empty;
					drawBlock(x, y, background);
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

			


		}
	}

	// function drawAnchors() {
	// 	let anchors = homeAddresses.filter(
	// 		address =>
	// 			!(
	// 				address.home.x == address.current.x &&
	// 				address.home.y == address.current.y
	// 			)
	// 	);
	// 	anchors.forEach(anchor => {
	// 		c.save();
	// 		c.beginPath();
	// 		c.strokeStyle = "orange";
	// 		c.moveTo((anchor.home.x * config.board.spacing) + (config.board.spacing / 2), (anchor.home.y * config.board.spacing) + (config.board.spacing / 2));
	// 		c.lineTo((anchor.current.x * config.board.spacing) + (config.board.spacing / 2), (anchor.current.y * config.board.spacing) + (config.board.spacing / 2));
	// 		c.stroke();
	// 		c.closePath();
	// 		c.restore();
	// 		c.save();
	// 		c.beginPath();
	// 		c.fillStyle = "orange";
	// 		c.fillRect((anchor.home.x * config.board.spacing) + (config.board.spacing / 2) - 3, (anchor.home.y * config.board.spacing) + (config.board.spacing / 2) - 3, 6, 6)
	// 	})
	// }

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
		c.fillStyle = "#666";
		c.arc(
			x * config.board.spacing,
			y * config.board.spacing,
			1,
			0,
			Math.PI * 2,
			true
		);
		c.fill();
		// c.strokeStyle = "#333";
		// c.beginPath()
		// c.moveTo(x*config.board.spacing, y*config.board.spacing);
		// c.lineTo(x*config.board.spacing, y*config.board.spacing + y*config.board.spacing)
		// c.stroke()
		c.closePath();
		c.restore();
	}
}

export function clearScreen() {
	c.fillStyle = "black";
	c.fillRect(0, 0, canvas.width, canvas.height);
	c.fill();
}