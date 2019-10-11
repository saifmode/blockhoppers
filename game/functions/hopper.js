import * as dom from "../domElements.js"

import { config } from "../game.js";
import { hoppers } from "../game.js";
import { level } from "../game.js";
import { frame } from "../game.js";
import { spawnPoints } from "../game.js";
import Hopper from "../classes/Hopper.js";

export function killAHopper() {
	if (hoppers.length > 0) {
		hoppers.shift();
		level.hoppers.current = hoppers.length;
		level.hoppers.max -= 1;
	}
}

export function spawnSingleHopper() {
	let currentSpawnPoint = level.hoppers.current % spawnPoints.length;
	let halfWayAcrossSpawnPoint =
		spawnPoints[currentSpawnPoint].x * config.board.spacing +
		config.board.spacing / 2;
	let topOfSpawnPoint =
		spawnPoints[currentSpawnPoint].y * config.board.spacing;

	if (hoppers.length < config.hopper.limit) {
		try {
			hoppers.push(new Hopper(halfWayAcrossSpawnPoint, topOfSpawnPoint));
		} catch {
			hoppers.push(new Hopper(config.board.spacing / 2, 0));
		}
	}

	console.log(hoppers.length);
	level.hoppers.current = hoppers.length;
	level.hoppers.max = hoppers.length;
	dom.info_toSave.innerHTML = level.hoppers.max;
}

export function spawnHoppers() {
	let timeToSpawnHopper = () =>
		frame == 0 || frame % level.hoppers.releaseRate == 0;
	let notEnoughHoppers =
		level.hoppers.max > level.hoppers.current + level.hoppers.free &&
		hoppers.length < config.hopper.limit;

	if (notEnoughHoppers && timeToSpawnHopper()) {
		spawnSingleHopper();
	}
}

export function resetHoppers() {
	level.hoppers.current = 0;
	level.hoppers.free = 0;
	hoppers.splice(0, hoppers.length);
}
