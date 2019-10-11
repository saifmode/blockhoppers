import * as dom from "../domElements.js";
import * as functions from "../functions.js";
import * as domFunctions from "../functions/domFunctions.js";

import { config } from "../game.js";
import { dragger } from "../game.js";
import { editor } from "../game.js";
import { gameBoard } from "../game.js";
import { hoppers } from "../game.js";
import { init } from "../game.js";
import { level } from "../game.js";
import { painter } from "../game.js";
import { selector } from "../game.js";

import levels from "../data/levels.json";

dom.btn_playLevel.addEventListener("click", () => {
	if (config.mode == "editor") functions.setHomeAddresses();
	domFunctions.hideFilePanel();
	domFunctions.showPlayingPanel();
	functions.activatePlayMode();
});

dom.btn_levelEditor.addEventListener("click", () => {
	domFunctions.hideFilePanel();
	domFunctions.showEditorPanel();
	functions.activateLevelEditor();
});

dom.btn_backToUnedited.addEventListener("click", init);

dom.btn_save.addEventListener("click", () => {
	domFunctions.showSaveJSONPanel();
	dom.panel_saveBoard.innerHTML =
		"<h4>Save this string somewhere:</h4><div class='json'>" +
		JSON.stringify(functions.generateLevelJSON()) +
		"</div>";
});

dom.btn_showLoader.addEventListener("click", domFunctions.showLoader);

dom.btn_load.addEventListener("click", () => {
	const levelInfo = JSON.parse(dom.input_levelToLoad.value);
	init(levelInfo);
	domFunctions.hideFilePanel();
	domFunctions.showPlayingPanel();
	functions.activatePlayMode();
});

dom.btn_new.addEventListener("click", () => {
	functions.clearBoard();
	domFunctions.hideFilePanel();
	domFunctions.showLevelHasBeenEdited();
});

dom.input_newLevelName.addEventListener("click", domFunctions.hideFilePanel);
dom.input_newHoppersToSave.addEventListener("click", domFunctions.hideFilePanel);

dom.input_newLevelName.addEventListener("input", e => {
	dom.info_levelName.innerHTML = dom.input_newLevelName.value;
	domFunctions.hideFilePanel();
});
dom.input_newHoppersToSave.addEventListener("input", e => {
	let newMax = dom.input_newHoppersToSave.value;
	if (newMax <= 0) {
		level.hoppers.max = 1
		dom.info_toSave.innerHTML = 1
	} else {
		level.hoppers.max = newMax
		dom.info_toSave.innerHTML = level.hoppers.max;
	}

	level.new = true;

	domFunctions.hideFilePanel();
	domFunctions.showLevelHasBeenEdited();
});

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
