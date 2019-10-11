import { config } from "../game.js";
import { editor } from "../game.js";
import { level } from "../game.js";
import { hoppers } from "../game.js";
import { init } from "../game.js";
import { input_newLevelName } from "../domElements.js";
import { tileIcons } from "../domElements.js";

import * as functions from "../functions.js";
import * as hopperFunctions from "../functions/hopper.js"

let notTyping = () => !(input_newLevelName === document.activeElement);

window.addEventListener("keyup", e => {
	if ((e.key == "p" || e.key == "P") && notTyping()) {
		level.paused = !level.paused;
		document.getElementById("paused").classList.toggle("hidden");
	}
});

window.addEventListener("keyup", e => {
	if ((e.key == "r" || e.key == "R") && config.mode == "play") {
		if (level.new) {
			hopperFunctions.resetHoppers();
			functions.setHomeAddresses();
			functions.activatePlayMode();
		} else init();
	}
});

window.addEventListener("keyup", e => {
	if (
		(e.key == "s" || e.key == "S") &&
		config.mode == "editor" &&
		notTyping()
	) {
		functions.setHomeAddresses();
		hopperFunctions.spawnSingleHopper();
		level.new = true;
	}
});

window.addEventListener("keyup", e => {
	if (
		(e.key == "k" || e.key == "K") &&
		config.mode == "editor" &&
		notTyping()
	) {
		hopperFunctions.killAHopper();
		level.new = true;
	}
});

window.addEventListener("keydown", e => {
	if (e.key == "Shift") {
		tileIcons.forEach(icon => icon.classList.remove("selected"));
		editor.mode = "drag";
	}
});

window.addEventListener("keyup", e => {
	if (e.key == "Shift") {
		editor.mode = "none";
	}
});
