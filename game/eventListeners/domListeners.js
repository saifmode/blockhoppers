import * as dom from "../domElements.js";
import * as functions from "../functions.js";
import * as domFunctions from "../functions/domFunctions.js";
import * as hopperFunctions from "../functions/hopper.js"
import generateRandomLevel from "../functions/generateRandomLevel.js";

import { config } from "../game.js";
import { dragger } from "../game.js";
import { editor } from "../game.js";
import { badHoppers } from "../game.js";
import { gameBoard } from "../game.js";
import { hoppers } from "../game.js";
import { init } from "../game.js";
import { level } from "../game.js";
import { painter } from "../game.js";
import { selector } from "../game.js";
import { resetFrames } from "../game.js";

import levels from "../data/levels.json";

// GAME MODE BUTTONS
dom.btn_playLevel.addEventListener("click", () => {
	if (config.mode == "editor") {
		functions.setHomeAddresses()
	}
	domFunctions.hideFilePanel();
	domFunctions.togglePlayAndEditorButtons();
	domFunctions.showPlayingPanel();
	functions.activatePlayMode();
	if (!config.random) domFunctions.showLevelSelect();

	badHoppers.splice(0, badHoppers.length)
	let badSpawnPoints = 0;

	gameBoard.forEach(row => {
		row.forEach(square => {
			if (square == "7") {
				badSpawnPoints += 1;
			}
		});
	});
	if (badSpawnPoints > 0) {

		level.badHoppers.max = badSpawnPoints;
		functions.setHomeAddresses()

	}

	hopperFunctions.resetHoppers();
	// dom.btn_randomLevels.innerText = "Random levels"
});

dom.btn_levelEditor.addEventListener("click", () => {
	domFunctions.hideFilePanel();
	domFunctions.togglePlayAndEditorButtons();
	domFunctions.showEditorPanel();
	domFunctions.hideLevelSelect();
	functions.activateLevelEditor();
	// dom.btn_randomLevels.innerText = "Random levels"
});

dom.btn_randomLevels.addEventListener("click", () => {
	level.new = false;
	level.current += 1;
	init(generateRandomLevel());
	config.random = true;
	dom.btn_randomLevels.innerText = "New random level";
	domFunctions.hideFilePanel();
	domFunctions.showBackToQuestButton();
	domFunctions.hideLevelSelect();
	// domFunctions.showPlayingPanel();
	// functions.activatePlayMode();
});

dom.btn_backToQuest.addEventListener("click", () => {
	level.current = 0;
	config.random = false;
	level.new = false;
	domFunctions.hideBackToQuestButton();
	domFunctions.showPlayingPanel();
	domFunctions.hideFilePanel();
	domFunctions.showLevelSelect();
	functions.activatePlayMode();
	init();
});

// LEVEL EDITOR BUTTONS

dom.btn_backToUnedited.addEventListener("click", init);

dom.btn_save.addEventListener("click", () => {
	domFunctions.showSaveJSONPanel();
	dom.panel_saveBoard.innerHTML =
		"<h4>Save this string somewhere:</h4><div class='json'>" +
		JSON.stringify(functions.generateLevelJSON()) +
		"</div>";
});

dom.btn_showLoader.addEventListener("click", domFunctions.showLoader);

dom.btn_new.addEventListener("click", () => {
	functions.clearBoard();
	domFunctions.hideFilePanel();
	domFunctions.showLevelHasBeenEdited();

});

dom.btn_load.addEventListener("click", () => {
	const levelInfo = JSON.parse(dom.input_levelToLoad.value);
	init(levelInfo);
	domFunctions.hideFilePanel();
	domFunctions.showPlayingPanel();
	domFunctions.togglePlayAndEditorButtons();
	functions.activatePlayMode();
	level.new = true;
});

// LEVEL EDITOR INPUTS

dom.input_newLevelName.addEventListener("click", domFunctions.hideFilePanel);
dom.input_newHoppersToSave.addEventListener(
	"click",
	domFunctions.hideFilePanel
);

dom.input_newLevelName.addEventListener("input", e => {
	dom.info_levelName.innerHTML = dom.input_newLevelName.value;
	domFunctions.hideFilePanel();
});
dom.input_newHoppersToSave.addEventListener("input", e => {
	let newMax = dom.input_newHoppersToSave.value;
	if (newMax <= 0) {
		level.hoppers.max = 1;
		dom.info_toSave.innerHTML = 1;
	} else {
		level.hoppers.max = newMax;
		dom.info_toSave.innerHTML = level.hoppers.max;
	}

	level.new = true;

	domFunctions.hideFilePanel();
	domFunctions.showLevelHasBeenEdited();
});

// LEVEL EDITOR TILES

dom.tileIcons.forEach(icon => {
	icon.addEventListener("click", () => {
		editor.mode = "paint";
		painter.x = 99999;
		painter.y = 99999;
		painter.dragging = false;
		painter.blockType = icon.dataset.blockType;

		if (!icon.classList.contains("selected")) {
			dom.tileIcons.forEach(icon => icon.classList.remove("selected"));
			icon.classList.add("selected");
		}

		domFunctions.hideFilePanel();
	});
});

// LEVEL SELECT
dom.select_level.addEventListener("change", e => {
	level.current = parseInt(e.srcElement.value);
	hopperFunctions.resetHoppers();
	functions.setHomeAddresses();
	resetFrames();
	init();
});
