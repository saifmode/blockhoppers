import { homeAddresses } from "./game.js";
import { spawnPoints } from "./game.js";
import { level } from "./game.js";
import { config } from "./game.js";
import { gameBoard } from "./game.js";
import { c } from "./game.js";
import { frame } from "./game.js";
import { hoppers } from "./game.js";
import { init } from "./game.js";
import Hopper from "./classes/Hopper.js";
import levels from "./levels.json";
import { palettes } from "./game.js";
import { info_toSave } from "./game.js";
import { info_levelName } from "./game.js";
import { info_edited } from "./game.js";
import { selector } from "./game.js";

export function drawLeftArrow(x, y) {
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

export function drawRightArrow(x, y) {
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

export function createGameBoardCopy(board) {
	board.forEach(row => {
		gameBoard.shift();
	});
	board.forEach(row => {
		gameBoard.push(row.toString().split(","));
	});
}

export function setHomeAddresses() {
	homeAddresses.splice(0, homeAddresses.length);
	spawnPoints.splice(0, spawnPoints.length);
	for (let y = 0; y < config.board.size; y++) {
		for (let x = 0; x < config.board.size; x++) {
			if (gameBoard[y][x] == "1") {
				homeAddresses.push({
					home: { x, y },
					current: { x, y }
				});
			} else if (gameBoard[y][x] == "3") {
				spawnPoints.push({ x, y });
			}
		}
	}
}

export function drawGameBoard() {
	for (let y = 0; y < config.board.size; y++) {
		for (let x = 0; x < config.board.size; x++) {
			let isArrow = false;

			switch (gameBoard[y][x]) {
				case "0":
					c.fillStyle = config.colors.empty;
					break;
				case "1":
					c.fillStyle = config.colors.movable;
					break;
				case "2":
					c.fillStyle = config.colors.immovable;
					break;
				case "3":
					c.fillStyle = config.colors.spawn;
					break;
				case "4":
					c.fillStyle = config.colors.exit;
					break;
				case "5":
					c.fillStyle = config.colors.immovable;
					isArrow = true;
					break;
				case "6":
					c.fillStyle = config.colors.immovable;
					isArrow = true;
					break;
			}
			c.save();
			c.beginPath();
			c.fillRect(
				x * config.board.spacing,
				y * config.board.spacing,
				x * config.board.spacing + config.board.spacing,
				y * config.board.spacing + config.board.spacing
			);
			c.fill();
			c.closePath();
			c.restore();
			if (isArrow && gameBoard[y][x] == "5") {
				drawLeftArrow(x, y);
			} else if (isArrow && gameBoard[y][x] == "6") {
				drawRightArrow(x, y);
			}

			// Draw Grid
			if (config.mode == "editor") {
				c.save();
				c.beginPath();
				// c.shadowColor = "white";
				// c.shadowBlur = config.blurAmount;
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
	}
}

export function killAHopper() {
	if (hoppers.length > 0) {
		hoppers.shift();
		level.hoppers.current = hoppers.length;
		level.hoppers.max -= 1;
	}
}

export function spawnSingleHopper() {
	let currentSpawnPoint = level.hoppers.current % spawnPoints.length;
	try {
		hoppers.push(
			new Hopper(
				spawnPoints[currentSpawnPoint].x * config.board.spacing +
					config.board.spacing / 2,
				spawnPoints[currentSpawnPoint].y * config.board.spacing
			)
		);
	} catch {
		hoppers.push(new Hopper(config.board.spacing / 2, 0));
	}

	level.hoppers.current = hoppers.length;
}

export function spawnHoppers() {
	let timeToSpawnHopper = () =>
		frame == 0 || frame % level.hoppers.releaseRate == 0;

	if (
		level.hoppers.max > level.hoppers.current + level.hoppers.free &&
		timeToSpawnHopper()
	) {
		spawnSingleHopper();
	}
}

export function saveLevel() {
	let gameBoardGenerator = document.getElementById("game-board-generator");
	let gameBoardLoader = document.getElementById("game-board-loader");
	let newLevelName = document.getElementById("new-level-name");
	let newHoppersToSave = document.getElementById("new-hoppers-to-save");

	if (
		parseInt(newHoppersToSave.value) <= 0 ||
		typeof parseInt(newHoppersToSave.value) != "Number"
	) {
		// newHoppersToSave.value = 1;
		level.hoppers.max = 1;
	} else {
		level.hoppers.max = newHoppersToSave.value;
	}

	let newLevel = {
		name: newLevelName.value,
		hoppers: {
			max: newHoppersToSave.value,
			releaseRate: 100
		},
		map: gameBoard
	};

	if (gameBoardGenerator.classList.contains("hidden")) {
		gameBoardGenerator.classList.remove("hidden");
	}
	if (!gameBoardLoader.classList.contains("hidden")) {
		gameBoardLoader.classList.add("hidden");
	}

	gameBoardGenerator.innerHTML =
		"<h4>Save this string somewhere:</h4><div class='json'>" +
		JSON.stringify(newLevel) +
		"</div>";
}

export function launchLoader() {
	let gameBoardGenerator = document.getElementById("game-board-generator");
	let gameBoardLoader = document.getElementById("game-board-loader");

	if (gameBoardLoader.classList.contains("hidden")) {
		gameBoardLoader.classList.remove("hidden");
	}
	if (!gameBoardGenerator.classList.contains("hidden")) {
		gameBoardGenerator.classList.add("hidden");
	}
}

export function loadLevel(levelInfo) {
	levelInfo = JSON.parse(levelInfo);
	// const debugPanel = document.getElementById("debug-panel");
	if (levelInfo.hoppers.max > 0) {
		level.hoppers.max = levelInfo.hoppers.max
	} else {
		level.hoppers.max = 1
	}
	config.mode = "play";
	level.hoppers.current = 0;
	level.hoppers.free = 0;
	info_levelName.innerHTML = levelInfo.name;
	info_toSave.innerHTML = level.hoppers.max;
	// debugPanel.innerHTML = "Playing level";
	hoppers.splice(0, hoppers.length);
	createGameBoardCopy(levelInfo.map);
	setHomeAddresses();
	spawnSingleHopper();
}

export function clearBoard() {
	hideFilePanel();
	for (let y = 0; y < config.board.size; y++) {
		for (let x = 0; x < config.board.size; x++) {
			gameBoard[y][x] = "0";
		}
	}
	hoppers.splice(0, hoppers.length);
	level.hoppers.max = 1;
	level.new = true;
	if (info_edited.classList.contains("hidden")) {
		info_edited.classList.remove("hidden");
	}
}

export function loadNextLevel() {
	level.new = false;
	level.current += 1;
	selector.x = 10000;
	selector.y = 10000;
	init();
}

export function hideFilePanel() {
	let gameBoardGenerator = document.getElementById("game-board-generator");
	let gameBoardLoader = document.getElementById("game-board-loader");
	if (!gameBoardGenerator.classList.contains("hidden")) {
		gameBoardGenerator.classList.add("hidden");
	}
	if (!gameBoardLoader.classList.contains("hidden")) {
		gameBoardLoader.classList.add("hidden");
	}
}
