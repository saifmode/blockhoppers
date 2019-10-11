import * as dom from "../domElements.js";

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