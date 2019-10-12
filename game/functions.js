import * as dom from "./domElements";

// import * as hopperFunctions from "./functions.js";

import { dragger } from "./game.js";
import { painter } from "./game.js";
import { editor } from "./game.js";
import { homeAddresses } from "./game.js";
import { spawnPoints } from "./game.js";
import { level } from "./game.js";
import { config } from "./game.js";
import { gameBoard } from "./game.js";
import { frame } from "./game.js";
import { hoppers } from "./game.js";
import { init } from "./game.js";
import Hopper from "./classes/Hopper.js";
import levels from "./data/levels.json";
import { palettes } from "./game.js";
import { selector } from "./game.js";
import { completedLevels } from "./game.js";

export function activatePlayMode() {
	if (hoppers.length < 1) {
		level.hoppers.current = 0;
		level.hoppers.free = 0;
		level.hoppers.max = level.new
			? levels[level.current].hoppers.max
			: level.hoppers.max;
	}

	selector.x = 99999;
	selector.y = 99999;
	selector.homeX = null;
	selector.homeY = null;
	selector.dragging = false;
	selector.draggingBlock = false;
	selector.whatBlockWas = null;
	config.mode = "play";
}

export function activateLevelEditor() {
	dragger.x = null;
	dragger.y = null;
	dragger.homeX = null;
	dragger.homeY = null;
	dragger.dragging = false;
	dragger.draggingBlock = false;
	dragger.whatBlockWas = null;

	painter.x = null;
	painter.y = null;
	painter.dragging = false;
	painter.blockType = "2";

	config.mode = "editor";
	editor.mode = "none";
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



export function clearBoard() {
	for (let y = 0; y < config.board.size; y++) {
		for (let x = 0; x < config.board.size; x++) {
			gameBoard[y][x] = "0";
		}
	}
	hoppers.splice(0, hoppers.length);
	level.hoppers.max = 1;
	level.new = true;
}


export function loadNextLevel() {
	level.new = false;
	level.current += 1;
	selector.x = 10000;
	selector.y = 10000;
	init();
}

// Save and load.

export function generateLevelJSON() {
	let newMax = dom.input_newHoppersToSave.value;

	if (newMax <= 0) {
		newMax = 1;
	} else {
		level.hoppers.max = newMax
	}

	return {
		name: dom.input_newLevelName.value,
		hoppers: {
			max: newMax,
			releaseRate: 100
		},
		map: gameBoard
	};
}

export function addToCompletedList() {
	let highestLevel = JSON.parse(window.localStorage.getItem("completedLevels"));
	if (highestLevel > completedLevels) return;

	window.localStorage.setItem("completedLevels", JSON.stringify(completedLevels));

	console.log(completedLevels)

	let newLevelOptionNode = document.createElement("option");
	let whichLevel = document.createTextNode("Level " + completedLevels.toString());
	newLevelOptionNode.appendChild(whichLevel);
	newLevelOptionNode.value = completedLevels;
	dom.select_level.appendChild(newLevelOptionNode);
	dom.select_level.selectedIndex = completedLevels;
}