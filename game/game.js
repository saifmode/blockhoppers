import Hopper from "./classes/Hopper.js";
import Selector from "./classes/Selector.js";
import Dragger from "./classes/Dragger.js";
import Painter from "./classes/Painter.js";
import { debugPanel } from "./eventListeners";
import levels from "./levels.json";
import * as functions from "./functions.js";

export const palettes = ["#ff71ce", "#01cdfe", "#05ffa1", "#bfb9ff", "#fffb96"];

export const level = {
	current: 0,
	name: "",
	hoppers: {
		releaseRate: 100,
		current: 0,
		max: 1,
		free: 0
	},
	completed: false,
	paused: false,
	new: false
};

export const config = {
	board: {
		size: 16,
		spacing: 32
	},

	hopper: {
		color: "green",
		radius: 9
	},

	mode: "play",

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
		rightArrow: "green"
	},
};

config.colors.list = [ // don't change the order of this!
	config.colors.empty,
	config.colors.movable,
	config.colors.immovable,
	config.colors.spawn,
	config.colors.exit,
	config.colors.leftArrow,
	config.colors.rightArrow
];


export const editor = {
	mode: "none"
};
export const canvas = document.querySelector("canvas");
export const c = canvas.getContext("2d");
canvas.width = config.board.size * config.board.spacing;
canvas.height = config.board.size * config.board.spacing;

export let homeAddresses = [];
export let spawnPoints = [];
export let gameBoard = []
export let hoppers = [];
export let selector = new Selector();
export const dragger = new Dragger();
export const painter = new Painter();

export let info_levelName = document.getElementById("level-name");
export let info_toSave = document.getElementById("to-save")
export let info_edited = document.getElementById("edited");

export function init() {
	level.new = false;
	level.hoppers.current = 0;
	level.hoppers.free = 0;
	if (levels[level.current].hoppers.max > 0) {
		level.hoppers.max = levels[level.current].hoppers.max;	
	} else {
		level.hoppers.max = 1
	}
	
	info_levelName.innerHTML = levels[level.current].name;
	info_toSave.innerHTML = level.hoppers.max;
	if (!info_edited.classList.contains("hidden")) {info_edited.classList.add("hidden");}
	hoppers = [];
	spawnPoints = [];
	gameBoard = [];
	functions.createGameBoardCopy(levels[level.current].map)
	functions.setHomeAddresses();
	frame = -1;
	config.colors.movable = palettes[level.current % palettes.length]
	selector = new Selector()
}

export let frame = 0;
function gameLoop() {
	requestAnimationFrame(gameLoop);

	c.fillStyle = "black";
	c.fillRect(0, 0, canvas.width, canvas.height);
	c.fill();

	functions.drawGameBoard();
	functions.spawnHoppers();

	if (config.mode == "editor") {
		switch (editor.mode) {
			case "paint":
				// console.log("Painting?")
				painter.update();
				break;
			case "drag":
				// console.log("Dragging?")
				dragger.update();
				break;
		}
	} else {
		selector.update();
	}

	// Update and draw hoppers
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

		if (level.hoppers.free == level.hoppers.max && config.mode == "play" && !level.new) {
			functions.loadNextLevel();
		}
	}

	if (!level.paused) {
		updateHoppers();
		frame += 1;
	} else {
		hoppers.forEach(hopper => hopper.draw())
	}
}

// Cheats

window.addEventListener("keyup", e => {
	if ((e.key == "n" || e.key == "N") && config.mode =="play") {
		functions.loadNextLevel();
	}
});

init();
gameLoop();
