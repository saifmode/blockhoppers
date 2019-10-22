import * as dom from "../domElements.js";
import { setCompletedLevels } from "../game.js";
import { completedLevels } from "../game.js";

export function showLevelHasBeenEdited() {
	if (dom.info_edited.classList.contains("hidden")) {
		dom.info_edited.classList.remove("hidden");
	}
}

export function showSaveJSONPanel() {
	if (dom.panel_saveBoard.classList.contains("hidden")) {
		dom.panel_saveBoard.classList.remove("hidden");
	}
	if (!dom.panel_loadBoard.classList.contains("hidden")) {
		dom.panel_loadBoard.classList.add("hidden");
	}
}

export function showLoader() {
	if (dom.panel_loadBoard.classList.contains("hidden")) {
		dom.panel_loadBoard.classList.remove("hidden");
	}
	if (!dom.panel_saveBoard.classList.contains("hidden")) {
		dom.panel_saveBoard.classList.add("hidden");
	}
}

export function showPlayingPanel() {
	if (!dom.panel_editor.classList.contains("hidden")) {
		dom.panel_editor.classList.add("hidden");
		dom.panel_lowerEdit.classList.add("hidden");
		dom.panel_playing.classList.remove("hidden");
	}
}

export function showEditorPanel() {
	if (dom.panel_editor.classList.contains("hidden")) {
		dom.panel_editor.classList.remove("hidden");
		dom.panel_lowerEdit.classList.remove("hidden");
		dom.panel_playing.classList.add("hidden");
	}
}

export function hideFilePanel() {
	if (!dom.panel_saveBoard.classList.contains("hidden")) {
		dom.panel_saveBoard.classList.add("hidden");
	}
	if (!dom.panel_loadBoard.classList.contains("hidden")) {
		dom.panel_loadBoard.classList.add("hidden");
	}
}

export function togglePlayAndEditorButtons() {
	dom.btn_playLevel.classList.toggle("hidden");
	dom.btn_levelEditor.classList.toggle("hidden");
}

export function showBackToQuestButton() {
	if (dom.btn_backToQuest.classList.contains("hidden"))
		dom.btn_backToQuest.classList.remove("hidden");
}

export function hideBackToQuestButton() {
	if (!dom.btn_backToQuest.classList.contains("hidden"))
		dom.btn_backToQuest.classList.add("hidden");
}

export function showLevelSelect() {
	if (dom.panel_levelSelect.classList.contains("hidden"))
		dom.panel_levelSelect.classList.remove("hidden")		
}

export function hideLevelSelect() {
	if (!dom.panel_levelSelect.classList.contains("hidden"))
		dom.panel_levelSelect.classList.add("hidden")		
}



export function populateLevelSelector() {
	if (!window.localStorage.getItem("completedLevels")) {
		window.localStorage.setItem("completedLevels", "0");
	} else {
		setCompletedLevels(
			JSON.parse(window.localStorage.getItem("completedLevels"))
		);
	}

	for (let i = 0; i < completedLevels + 1; i++) {
		let newLevelOptionNode = document.createElement("option");
		let whichLevel = document.createTextNode("Level " + i.toString());
		newLevelOptionNode.appendChild(whichLevel);
		newLevelOptionNode.value = i;
		dom.select_level.appendChild(newLevelOptionNode);
		dom.select_level.selectedIndex = 0;
	}
}

export function addBonusTileIcons() {
	if (!window.localStorage.getItem("completedLevels")) {
		window.localStorage.setItem("completedLevels", "0");
	} else {
		setCompletedLevels(
			JSON.parse(window.localStorage.getItem("completedLevels"))
		);
	}

	if (completedLevels >= 10) {
		dom.tile_leftArrow.classList.remove("hidden");
		dom.tile_rightArrow.classList.remove("hidden");
	}

	if (completedLevels >= 23) {
		dom.tile_badSpawnPoint.classList.remove("hidden");
	}

	if (completedLevels >= 27) {
		dom.tile_portalA.classList.remove("hidden");
		dom.tile_portalB.classList.remove("hidden");
		dom.tile_solidPortalA.classList.remove("hidden");
		dom.tile_solidPortalB.classList.remove("hidden");
	}

	if (completedLevels >= 42) {
		dom.tile_movableArrowLeft.classList.remove("hidden");
		dom.tile_movableArrowRight.classList.remove("hidden");
	}
}

