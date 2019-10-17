import * as functions from "./functions.js";
import * as canvasFunctions from "./functions/canvas.js";
import * as hopperFunctions from "./functions/hopper.js";
import * as domFunctions from "./functions/domFunctions.js";
import * as dom from "./domElements.js";
import generateRandomLevel from "./functions/generateRandomLevel.js";
import Hopper from "./classes/Hopper.js";
import BadHopper from "./classes/BadHopper.js";
import Selector from "./classes/Selector.js";
import Dragger from "./classes/Dragger.js";
import Painter from "./classes/Painter.js";
import mouseEventListeners from "./eventListeners/mouse.js";
import keyEventListeners from "./eventListeners/keyboard.js";
import domEventListeners from "./eventListeners/domListeners.js";
import levels from "./data/levels.json";

export const palettes = ["#ff71ce", "#01cdfe", "#05ffa1", "#bfb9ff", "#fffb96"];

export let completedLevels = 0;

export const level = {
	current: 0,
	name: "",
	hoppers: {
		releaseRate: 100,
		current: 0,
		max: 1,
		free: 0
	},
	badHoppers: {
		releaseRate: 100,
		current: 0,
		max: 1
	},
	completed: false,
	paused: false,
	new: false,
	perfect: 0,
	clicks: 0
};

export const config = {
	board: {
		size: 16,
		spacing: 32
	},

	blocks: {
		empty: "0",
		movable: "1",
		immovable: "2",
		spawnPoint: "3",
		exit: "4",
		leftArrow: "5",
		rightArrow: "6",
		badSpawnPoint: "7",
		portalA: "8",
		portalB: "9",
		solidPortalA: "10",
		solidPortalB: "11",
		solid: ["1", "2", "5", "6"],
		permeable: ["0", "3", "4", "7", "8", "9", "10", "11"],
		canBeMoved: ["1", "8", "9"],
		portals: ["8", "9", "10", "11"],
	},

	hopper: {
		color: "green",
		badColor: "red",
		radius: 9,
		limit: 16
	},

	badHopper: {
		limit: 16
	},

	grid: false,
	mode: "play",
	random: false,

	physics: {
		gravity: 0.3,
		speed: 1.5,
		terminal: 9.8
	},

	colors: {
		empty: "black",
		movable: palettes[level.current % palettes.length],
		immovable: "grey",
		exit: "white",
		spawn: "blue",
		leftArrow: "green",
		rightArrow: "green",
		badSpawn: "red",
		portalA: "lime",
		portalB: "aqua",
		solidPortalA: "lime",
		solidPortalB: "aqua"
	}
};

config.colors.list = [
	// don't change the order of this!
	config.colors.empty,
	config.colors.movable,
	config.colors.immovable,
	config.colors.spawn,
	config.colors.exit,
	config.colors.leftArrow,
	config.colors.rightArrow,
	config.colors.badSpawn,
	config.colors.portalA,
	config.colors.portalB,
	config.colors.solidPortalA,
	config.colors.solidPortalB,
];

export const editor = {
	mode: "none"
};
export const canvas = document.querySelector("canvas");
export const c = canvas.getContext("2d");
canvas.width = config.board.size * config.board.spacing;
canvas.height = config.board.size * config.board.spacing;

export let homeAddresses = [];
export let badSpawnPoints = [];
export let spawnPoints = [];
export let gameBoard = [];
export let hoppers = [];
export let badHoppers = [];
export let selector = new Selector();
export const dragger = new Dragger();
export const painter = new Painter();

// export let badHopper = new BadHopper(200, 200);

export function init(newLevel = levels[level.current]) {
	level.new = false;
	level.hoppers.current = 0;
	level.hoppers.free = 0;
	level.badHoppers.current = 0;
	config.physics.gravity = 0.3;
	config.physics.speed = 1.5;
	config.physics.terminal = 9.8;

	if (newLevel.hoppers.max > 0) {
		level.hoppers.max = newLevel.hoppers.max;
	} else {
		level.hoppers.max = 1;
	}
	if (newLevel.badHoppers.max > 0) {
		level.badHoppers.max = newLevel.badHoppers.max;
	} else {
		level.badHoppers.max = 0;
	}

	level.hoppers.releaseRate = newLevel.hoppers.releaseRate;
	level.badHoppers.releaseRate = newLevel.badHoppers.releaseRate;
	try {
		level.perfect = newLevel.clicks;
	} catch {
		level.perfect = 0;
	}

	level.clicks = 0;
	dom.info_levelName.innerHTML = newLevel.name;
	dom.info_levelName.classList.remove("perfect");
	if (window.localStorage.getItem(`perfectLevel${level.current}`)) {
		dom.info_levelName.classList.add("perfect");
	}
	dom.info_toSave.innerHTML = level.hoppers.max;
	dom.info_clicks.innerText = level.clicks;
	dom.info_perfect.innerText = level.perfect;
	if (!dom.info_perfectList.classList.contains("perfect"))
		dom.info_perfectList.classList.add("perfect");

	if (!dom.info_edited.classList.contains("hidden")) {
		dom.info_edited.classList.add("hidden");
	}
	hoppers = [];
	badHoppers = [];
	spawnPoints = [];
	badSpawnPoints = [];
	gameBoard = [];
	functions.createGameBoardCopy(newLevel.map);
	functions.setHomeAddresses();
	frame = -1;
	config.colors.movable = palettes[level.current % palettes.length];
	selector = new Selector();
}

export let frame = 0;
export function resetFrames() {
	frame = -1;
}
export function setCompletedLevels(num) {
	completedLevels = num;
}

function gameLoop() {
	requestAnimationFrame(gameLoop);

	canvasFunctions.clearScreen();
	canvasFunctions.drawGameBoard();
	hopperFunctions.spawnHoppers();
	hopperFunctions.spawnBadHoppers();

	if (config.mode == "editor") {
		switch (editor.mode) {
			case "paint":
				painter.update();
				break;
			case "drag":
				dragger.update();
				break;
		}
	} else {
		selector.update();
	}

	if (!level.paused) {
		updateHoppers();
		updateBadHoppers();
		frame += 1;
	} else {
		hoppers.forEach(hopper => hopper.draw());
		badHoppers.forEach(hopper => hopper.draw());
	}

	function updateHoppers() {
		let numberOfHoppers = hoppers.length;
		let freedHoppers = [];

		for (let i = numberOfHoppers - 1; i >= 0; i--) {
			hoppers[i].update();
			if (hoppers[i].free) {
				freedHoppers.push(i);
			}
		}

		if (freedHoppers.length > 0) {
			freedHoppers.forEach(hopper => {
				hoppers.splice(hopper, 1);
				level.hoppers.free += 1;
			});
		}
	}

	let allHoppersRescued =
		level.hoppers.free == level.hoppers.max &&
		(config.mode == "play" || config.random) &&
		!level.new;

	if (
		(allHoppersRescued && config.random) ||
		(level.hoppers.free > 1 && hoppers.length < 1 && config.random)
	) {
		level.current += 1;
		init(generateRandomLevel());
		// config.mode = "random";
		domFunctions.hideFilePanel();
		domFunctions.showPlayingPanel();
		functions.activatePlayMode();
	} else if (allHoppersRescued && config.mode == "play") {
		if (level.clicks <= level.perfect) {
			window.localStorage.setItem(`perfectLevel${level.current}`, true);
		}

		functions.loadNextLevel();
		if (completedLevels < level.current && !config.random) {
			completedLevels = level.current;
			functions.addToCompletedList();
		}
		dom.select_level.selectedIndex = level.current;
	}

	function updateBadHoppers() {
		badHoppers.forEach(baddie => {
			baddie.testCollision();
			baddie.update();
			if (baddie.killedHopper) {
				// reset code, probably put this somewhere
				if (level.new || config.random) {
					hopperFunctions.resetHoppers();
					functions.setHomeAddresses();
					resetFrames();
					baddie.killedHopper = false;
				} else init();
			}
		});
	}
}

domFunctions.populateLevelSelector();
init();
gameLoop();
