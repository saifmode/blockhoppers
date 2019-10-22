import { config } from "../game.js";
import { c } from "../game.js";
import { canvas } from "../game.js";
import { gameBoard } from "../game.js";

export default class Hopper {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.radius = config.hopper.radius;
		this.color = config.hopper.color;
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

		let px_blockTop = (gridY + 1) * config.board.spacing; // y coordinate of top of block
		// HELPER FUNCTIONS
		let reachedExit = () => gameBoard[gridY][gridX] == "4";
		let enteredPortalA = () => gameBoard[gridY][gridX] == "8";
		let enteredPortalB = () => gameBoard[gridY][gridX] == "9";
		let enteredSolidPortalA = () => gameBoard[gridY][gridX] == "10";
		let enteredSolidPortalB = () => gameBoard[gridY][gridX] == "11";

		let wallRightOfBlock = (x, y) => config.blocks.solid.includes(gameBoard[y][x + 1]);
		let wallLeftOfBlock = (x, y) => config.blocks.solid.includes(gameBoard[y][x - 1]);
		let wallBeneathBlock = (x, y) => config.blocks.solid.includes(gameBoard[y + 1][x]);

		let rollingOntoLeftArrow = () => {
			try {
				if (
					config.blocks.leftArrows.includes(gameBoard[gridY + 1][gridX + 1]) &&
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
					config.blocks.rightArrows.includes(gameBoard[gridY + 1][gridX - 1]) &&
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
					config.blocks.leftArrows.includes(gameBoard[gridY + 1][gridX]) &&
					this.movement == "rolling"
				) {
					return true;
				} else {
					return false;
				}
			} catch {
				if (
					gridY == config.board.size - 1 &&
					config.blocks.leftArrows.includes(gameBoard[0][gridX]) &&
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
				if (config.blocks.rightArrows.includes(gameBoard[gridY + 1][gridX])) {
					return true;
				} else {
					return false;
				}
			} catch {
				if (
					gridY == config.board.size - 1 &&
					config.blocks.rightArrows.includes(gameBoard[0][gridX]) &&
					this.movement == "rolling"
				) {
					return true;
				} else {
					return false;
				}
			}
		};

		let isWallToLeft = () =>
			config.blocks.solid.includes(gameBoard[gridY][gridX - 1]) ||
			rollingOntoRightArrow();
		let isWallToRight = () =>
			config.blocks.solid.includes(gameBoard[gridY][gridX + 1]) ||
			rollingOntoLeftArrow();
		let isWallToRightWrap = () =>
			this.x > canvas.width &&
			config.blocks.solid.includes(gameBoard[gridY][0]);
		let isWallToLeftWrap = () =>
			this.x <= 0 &&
			config.blocks.solid.includes(
				gameBoard[gridY][config.board.size - 1]
			);

		let isFloorBelowHopper = () => {
			try {
				return config.blocks.solid.includes(
					gameBoard[gridY + 1][gridX]
				);
			} catch {
				return false;
			}
		};

		let isNoFloorBelowHopper = () => {
			try {
				return config.blocks.permeable.includes(
					gameBoard[gridY + 1][gridX]
				);
			} catch {
				return true;
			}
		};

		let fellThroughFloor = () =>
			this.bottom + this.dy > canvas.height &&
			config.blocks.permeable.includes(gameBoard[0][gridX]);
		let wrappedThroughFloorAndHitCeiling = () =>
			this.bottom + this.dy > canvas.height &&
			!config.blocks.permeable.includes(gameBoard[0][gridX]) &&
			!this.onCeiling;
		let fellThroughCeiling = () =>
			this.onCeiling &&
			config.blocks.permeable.includes(gameBoard[0][gridX]) &&
			((this.left + 1 > gridX * config.board.spacing &&
				this.direction == "right") ||
				(this.right - 1 < (gridX + 1) * config.board.spacing &&
					this.direction == "left"));

		// COLLISIONS
		const emergeFrom = (tile) => {
			for (let y = 0; y < config.board.size; y++) {
				for (let x = 0; x < config.board.size; x++) {
					if (gameBoard[y][x] == tile) {
						if ((wallLeftOfBlock(x, y) && this.direction == "left" && this.movement == "rolling") ||
							(wallRightOfBlock(x, y) && this.direction == "right" && this.movement == "rolling") ||
							wallBeneathBlock(x, y) && this.movement == "falling") {
							break;
						}

						if (this.movement == "falling") {
							this.x = (x * config.board.spacing) + (config.board.spacing / 2)
						} else if (this.direction == "left") {
							this.x = x * config.board.spacing
						} else if (this.direction == "right") {
							this.x = (x * config.board.spacing) + config.board.spacing
						}
						
						if (this.movement == "falling") {
							this.y =
							y * config.board.spacing +
							config.board.spacing;
						} else {
							this.y =
							y * config.board.spacing +
							config.board.spacing -
							this.radius;
						}
						
						break;
					}
				}
			}
			return false
		}

		// Test if hopper has reached exit
		if (reachedExit()) {
			this.free = true;
		} else if (enteredPortalA() || enteredSolidPortalA()) {
			if (emergeFrom("9")) {}
			else emergeFrom("11")
		} else if (enteredPortalB() || enteredSolidPortalB()) {
			if (emergeFrom("8")) {}
			else emergeFrom("10");
		}

		// Test collision with floor

		if (isFloorBelowHopper()) {
			// See if square below hopper is an impenetrable block
			if (this.bottom + this.dy > px_blockTop) {
				this.y = px_blockTop - this.radius; // Correcting position
				this.movement = "rolling";
				if (config.blocks.leftArrows.includes(gameBoard[gridY + 1][gridX])) {
					// Left arrow
					this.direction = "left";
				} else if (
					config.blocks.rightArrows.includes(gameBoard[gridY + 1][gridX])
				) {
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
		c.fillStyle = this.color;
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		c.fill();
		c.closePath();
		c.restore();
	}
}
