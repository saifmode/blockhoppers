import { config } from "../game.js";
import { editor } from "../game.js";
import { level } from "../game.js";
import { hoppers } from "../game.js";
import { init } from "../game.js";
import { input_newLevelName } from "../domElements.js";
import { tileIcons } from "../domElements.js";
import { resetFrames } from "../game.js";
import generateRandomLevel from "../functions/generateRandomLevel.js";

import * as functions from "../functions.js";
import * as domFunctions from "../functions/domFunctions.js";
import * as hopperFunctions from "../functions/hopper.js";

let notTyping = () => !(input_newLevelName === document.activeElement);

window.addEventListener("keyup", e => {
	if (e.key == "]" && notTyping()) {
		config.physics.speed += 0.5
		config.physics.gravity += 0.1
		config.physics.terminal += 0.5
		config.physics.speed = Math.min(5, config.physics.speed)
		config.physics.gravity = Math.min(1, config.physics.gravity)
		config.physics.terminal = Math.min(13.3, config.physics.terminal);
	}
})

window.addEventListener("keyup", e => {
	if (e.key == "[" && notTyping()) {
		config.physics.gravity -= 0.2
		config.physics.speed -= 0.5
		config.physics.gravity = Math.max(0.1, config.physics.gravity)
		config.physics.speed = Math.max(0.5, config.physics.speed)
		config.physics.terminal = Math.max(6.3, config.physics.terminal);

	}
})

window.addEventListener("keyup", e => {
	if ((e.key == "g" || e.key == "G") && notTyping()) {
		config.grid = !config.grid;
	}
});

window.addEventListener("keyup", e => {
	if ((e.key == "p" || e.key == "P") && notTyping()) {
		level.paused = !level.paused;
		document.getElementById("paused").classList.toggle("hidden");
	}
});

window.addEventListener("keyup", e => {
	if ((e.key == "r" || e.key == "R") && config.mode == "play") {
		level.clicks = 0;
		
		if (level.new || config.random) {
			level.clicks = 0;
			hopperFunctions.resetHoppers();
			functions.setHomeAddresses();
			resetFrames();
			// functions.activatePlayMode();
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
		domFunctions.showLevelHasBeenEdited();
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
		domFunctions.showLevelHasBeenEdited();
		hopperFunctions.killAHopper();
		level.new = true;
	}
});

// Cheats

window.addEventListener("keyup", e => {
	if (
		(e.key == "n" || e.key == "N") &&
		config.mode != "editor" &&
		config.random
	) {
		console.log("hello????")
		level.new = false;
		level.current += 1;
		init(generateRandomLevel());
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
