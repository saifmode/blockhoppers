export const mouse = { x: 900, y: 900 };
export let mousedown = false;

import { config } from "./game.js";
import { level } from "./game.js";
import { gameBoard } from "./game.js";
import { selector } from "./game.js";
import { dragger } from "./game.js";
import { painter } from "./game.js";
import { editor } from "./game.js";
import { hoppers } from "./game.js";
import { init } from "./game.js";
import { info_levelName } from "./game.js";
import { info_toSave } from "./game.js";
import { info_edited } from "./game.js";
import levels from "./levels.json";

import * as functions from "./functions.js";

let newLevelName = document.getElementById("new-level-name");
let newHoppersToSave = document.getElementById("new-hoppers-to-save");

// Mouse events
window.addEventListener("mousemove", () => {
	mouse.x = event.x;
	mouse.y = event.y;
});

window.addEventListener("mousedown", () => {
	mousedown = true;
});
window.addEventListener("mouseup", () => {
	mousedown = false;
});

// Game play
window.addEventListener("keyup", e => {
	if (
		(e.key == "p" || e.key == "P") &&
		!(newLevelName === document.activeElement)
	) {
		level.paused = !level.paused;
		document.getElementById("paused").classList.toggle("hidden")
	}
});

// Playing only
window.addEventListener("keyup", e => {
	if ((e.key == "r" || e.key == "R") && config.mode == "play") {
		if (level.new) {
			level.hoppers.current = 0;
			level.hoppers.free = 0;
			hoppers.splice(0, hoppers.length);

			// functions.createGameBoardCopy(levels[level.current].map)
			functions.setHomeAddresses();
			// frame = -1;
			// config.colors.movable = palettes[level.current % palettes.length]
			playLevel();
		} else {
			init();
		}
	}
});

// Editor only
window.addEventListener("keyup", e => {
	if (
		(e.key == "s" || e.key == "S") &&
		config.mode == "editor" &&
		!(newLevelName === document.activeElement)
	) {
		level.hoppers.max += 1;
		functions.spawnSingleHopper();
		level.new = true;
	}
});

window.addEventListener("keyup", e => {
	if (
		((e.key == "k" || e.key == "K")) &&
		config.mode == "editor" &&
		!(newLevelName === document.activeElement)
	) {
		functions.killAHopper();
		level.new = true;
	}
});

// Game mode
export const debugPanel = document.getElementById("debug-panel");
export const editorPanel = document.getElementById("editor-panel");
export const playingPanel = document.getElementById("playing-panel");
export const btn_levelEditor = document.getElementById("level-editor");
export const btn_playLevel = document.getElementById("play-level");
export const btn_backToUnedited = document.getElementById("back-to-unedited");

function revealEditorPanel() {
	if (editorPanel.classList.contains("hidden")) {
		editorPanel.classList.remove("hidden");
		playingPanel.classList.add("hidden");
	}

	// debugPanel.innerHTML = "Editing level";
}

function revealPlayingPanel() {
	functions.hideFilePanel();

	if (!editorPanel.classList.contains("hidden")) {
		editorPanel.classList.add("hidden");
		playingPanel.classList.remove("hidden");
	}
}

function editLevel() {
	revealEditorPanel();

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
}

function playLevel() {
	revealPlayingPanel();

	if (config.mode == "editor") {
		functions.setHomeAddresses();
	}

	if (hoppers.length < 1) {
		level.hoppers.current = 0;
		level.hoppers.free = 0;
		level.hoppers.max = level.new
			? levels[level.current].hoppers.max
			: level.hoppers.max;
		// functions.spawnSingleHopper();
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

btn_playLevel.addEventListener("click", () => {
	functions.hideFilePanel()
	playLevel();
});
btn_levelEditor.addEventListener("click", () => {
	editLevel();
	editor.mode = "drag";
	functions.hideFilePanel()
});
btn_backToUnedited.addEventListener("click", init);
// Level editor

const btn_save = document.getElementById("save");
btn_save.addEventListener("click", functions.saveLevel);

const btn_launchLoader = document.getElementById("launch-loader");
btn_launchLoader.addEventListener("click", functions.launchLoader);

const levelToLoad = document.getElementById("level-to-load");
const btn_load = document.getElementById("load");
btn_load.addEventListener("click", () => {
	functions.loadLevel(levelToLoad.value);
	playLevel();
});

const btn_clear = document.getElementById("clear");
btn_clear.addEventListener("click", () => {
	functions.clearBoard();
	functions.hideFilePanel();
});

const painters = document.querySelectorAll(".painter");
painters.forEach(painterIcon => {
	painterIcon.addEventListener("click", () => {
		editor.mode = "paint";
		painter.x = 99999;
		painter.y = 9999;
		painter.dragging = false;
		painter.blockType = painterIcon.dataset.blockType;
		if (!painterIcon.classList.contains("selected")) {
			painters.forEach(icon => icon.classList.remove("selected"));
			painterIcon.classList.add("selected");
		}
		functions.hideFilePanel()
	});
});

window.addEventListener("keydown", e => {
	if (e.key == "Shift") {
		painters.forEach(icon => icon.classList.remove("selected"));
		editor.mode = "drag";
	}
});

window.addEventListener("keyup", e => {
	if (e.key == "Shift") {
		editor.mode = "none";
	}
});

newLevelName.addEventListener("input", e => {
	info_levelName.innerHTML = newLevelName.value;
});
newHoppersToSave.addEventListener("input", e => {
	if (parseInt(newHoppersToSave.value) <= 0 || typeof parseInt(newHoppersToSave.value) != "Number") {
		// newHoppersToSave.value = 1
		level.hoppers.max = 1
	} else {
		level.hoppers.max = newHoppersToSave.value
	}

	info_toSave.innerHTML = newHoppersToSave.value;
	level.new = true;
	if (info_edited.classList.contains("hidden")) {
		info_edited.classList.remove("hidden");
	}
});
