import { config } from "../game.js";
import { c } from "../game.js";
import { canvas } from "../game.js";
import { gameBoard } from "../game.js";

export default class Hopper {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.radius = config.hopper.radius;
		// Collision detectors
		this.left = x - this.radius;
		this.right = x + this.radius;
		this.bottom = y + this.radius;
		this.free = false;
		// Movement
		this.onCeiling = false;
		this.movement = "falling";
		this.direction = "right";
		// Physics
		this.dx = config.physics.speed;
		this.dy = config.physics.speed;
		this.terminal = config.terminal;
	}

	update() {
		// First translate current px coordinates as grid coordinates
		let gridX = Math.floor(this.x / config.board.spacing);
		let gridY = Math.floor(this.y / config.board.spacing);

		let block = ["1", "2", "5", "6"]; // These correspond to blocks that hoppers can't move through
		let empty = ["0", "3", "4"]; // Correspond to empty squares or exit
		let exit = "4";

		let px_blockTop = (gridY + 1) * config.board.spacing; // y coordinate of top of block
		// HELPER FUNCTIONS
		let rollingOntoLeftArrow = () => {
			try {
				if (
					gameBoard[gridY + 1][gridX + 1] == "5" &&
					this.movement == "rolling"
				) {
					return true;
				} else {
					return false;
				}
			} catch {
				return false;
			}
		};

		let rollingOntoRightArrow = () => {
			try {
				if (
					gameBoard[gridY + 1][gridX - 1] == "6" &&
					this.movement == "rolling"
				) {
					return true;
				} else {
					return false;
				}
			} catch {
				return false;
			}
		};

		let isRollingOverLeftArrow = () => {
			try {
				if (
					gameBoard[gridY + 1][gridX] == "5" &&
					this.movement == "rolling"
				) {
					return true;
				} else {
					return false;
				}
			} catch {
				if (
					gridY == config.board.size - 1 &&
					gameBoard[0][gridX] == "5" &&
					this.movement == "rolling"
				) {
					return true;
				} else {
					return false;
				}
			}
		};

		let isRollingOverRightArrow = () => {
			try {
				if (gameBoard[gridY + 1][gridX] == "6") {
					return true;
				} else {
					return false;
				}
			} catch {
				if (
					gridY == config.board.size - 1 &&
					gameBoard[0][gridX] == "6" &&
					this.movement == "rolling"
				) {
					return true;
				} else {
					return false;
				}
			}
		};

		let isWallToLeft = () =>
			block.includes(gameBoard[gridY][gridX - 1]) ||
			rollingOntoRightArrow();
		let isWallToRight = () =>
			block.includes(gameBoard[gridY][gridX + 1]) ||
			rollingOntoLeftArrow();
		let isWallToRightWrap = () =>
			this.x > canvas.width && block.includes(gameBoard[gridY][0]);
		let isWallToLeftWrap = () =>
			this.x <= 0 &&
			block.includes(gameBoard[gridY][config.board.size - 1]);

		let isFloorBelowHopper = () => {
			try {
				return block.includes(gameBoard[gridY + 1][gridX]);
			} catch {
				return false;
			}
		};

		let isNoFloorBelowHopper = () => {
			try {
				return empty.includes(gameBoard[gridY + 1][gridX]);
			} catch {
				return true;
			}
		};

		let reachedExit = () => gameBoard[gridY][gridX] == "4";

		let fellThroughFloor = () =>
			this.bottom + this.dy > canvas.height && gameBoard[0][gridX] == "0";
		let wrappedThroughFloorAndHitCeiling = () =>
			this.bottom + this.dy > canvas.height &&
			(gameBoard[0][gridX] != "0" || gameBoard[0][gridX] != "3" || gameBoard[0][gridX] != "4") &&
			!this.onCeiling;
		let fellThroughCeiling = () =>
			this.onCeiling &&
			(gameBoard[0][gridX] == "0" || gameBoard[0][gridX] == "3" || gameBoard[0][gridX] == "4") &&
			((this.left + 1 > gridX * config.board.spacing &&
				this.direction == "right") ||
				(this.right - 1 < (gridX + 1) * config.board.spacing &&
					this.direction == "left"));

		// COLLISIONS

		// Test if hopper has reached exit
		if (reachedExit()) {
			this.free = true;
		}

		// Test collision with floor

		if (isFloorBelowHopper()) {
			// See if square below hopper is an impenetrable block
			if (this.bottom + this.dy > px_blockTop) {
				this.y = px_blockTop - this.radius; // Correcting position
				this.movement = "rolling";
				if (gameBoard[gridY + 1][gridX] == "5") {
					// Left arrow
					this.direction = "left";
				} else if (gameBoard[gridY + 1][gridX] == "6") {
					this.direction = "right";
				}
			}
		}

		// Check hopper has fallen thru floor but hit ceiling
		if (isRollingOverLeftArrow()) {
			this.direction = "left";
		}
		if (isRollingOverRightArrow()) {
			this.direction = "right";
		}
		// if (hit)
		// Test collision with wall to the right of hopper
		if (isWallToRight()) {
			if (this.right > (gridX + 1) * config.board.spacing) {
				this.direction = "left";
			}
		}

		// Test collision with wall to the left of hopper
		if (isWallToLeft()) {
			if (this.left < gridX * config.board.spacing) {
				this.direction = "right";
			}
		}

		// Make hopper fall if it rolls off an edge
		if (
			this.movement == "rolling" &&
			isNoFloorBelowHopper() &&
			this.bottom + 1 > (gridY + 1) * config.board.spacing &&
			((this.left + 1 > gridX * config.board.spacing &&
				this.direction == "right") ||
				(this.right - 1 < (gridX + 1) * config.board.spacing &&
					this.direction == "left"))
		) {
			this.movement = "falling";
		}

		// Wrap around
		if (wrappedThroughFloorAndHitCeiling()) {
			this.onCeiling = true;
			this.movement = "rolling";
			this.y = canvas.height - this.radius - 1;
		} else if (fellThroughFloor()) {
			this.y = 0;
		}

		if (fellThroughCeiling()) {
			this.y = 0;
			this.movement = "falling";
			this.onCeiling = false;
		}

		if (isWallToRightWrap()) {
			this.direction = "left";
		} else if (this.x > canvas.width) {
			this.x = 0;
		}

		if (isWallToLeftWrap()) {
			this.direction = "right";
		} else if (this.x < 0) {
			// console.log(gameBoard[gridY][config.size - 1])
			this.x = canvas.width;
		}

		// MOVEMENT
		switch (this.movement) {
			case "falling":
				this.dx = 0;
				this.dy = Math.min(
					this.dy + config.physics.gravity,
					config.physics.terminal
				);
				this.y += this.dy;
				break;
			case "rolling":
				this.dx =
					this.direction == "right"
						? config.physics.speed
						: -config.physics.speed;
				this.dy = 0;
				this.x += this.dx;
				break;
			case "stopped":
				this.dx = 0;
				this.dy = 0;
				this.x += this.dx;
				this.y += this.dy;
				break;
		}

		// Update collision detectors
		this.left = this.x - this.radius;
		this.right = this.x + this.radius;
		this.bottom = this.y + this.radius;

		this.draw();
	}

	draw() {
		c.save();
		c.beginPath();
		c.fillStyle = config.hopper.color;
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		c.fill();
		c.closePath();
		c.restore();
	}
}
