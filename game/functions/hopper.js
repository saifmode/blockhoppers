import * as dom from "../domElements.js"

import { config } from "../game.js";
import { hoppers } from "../game.js";
import { badHoppers } from "../game.js";
import { level } from "../game.js";
import { frame } from "../game.js";
import { spawnPoints } from "../game.js";
import { badSpawnPoints } from "../game.js";
import Hopper from "../classes/Hopper.js";
import BadHopper from "../classes/BadHopper.js"

export function killAHopper() {
	if (hoppers.length > 0) {
		hoppers.shift();
		level.hoppers.current = hoppers.length;
		level.hoppers.max -= 1;
	}
}

export function spawnSingleHopper() {
	if (!spawnPoints.length) {
		spawnPoints.push({x: 64, y: 0})
	} 

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

	level.hoppers.current = hoppers.length;
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

export function spawnSingleBadHopper() {
	if (!badSpawnPoints.length) {
		badSpawnPoints.push({x: 64, y: 0})
	} 

	let currentBadSpawnPoint = level.badHoppers.current % badSpawnPoints.length;
	let halfWayAcrossSpawnPoint =
		badSpawnPoints[currentBadSpawnPoint].x * config.board.spacing +
		config.board.spacing / 2;
	let topOfSpawnPoint =
		badSpawnPoints[currentBadSpawnPoint].y * config.board.spacing;

	if (badHoppers.length < config.badHopper.limit) {
		try {
			badHoppers.push(new BadHopper(halfWayAcrossSpawnPoint, topOfSpawnPoint));
		} catch {
			badHoppers.push(new BadHopper(config.board.spacing / 2, 0));
		}
	}

	level.badHoppers.current = badHoppers.length;
}

export function spawnBadHoppers() {
	let timeToSpawnHopper = () =>
		frame == 0 || frame % level.badHoppers.releaseRate == 0;
	let notEnoughHoppers =
		level.badHoppers.max > level.badHoppers.current &&
		badHoppers.length < config.badHopper.limit;

	if (notEnoughHoppers && timeToSpawnHopper()) {
		spawnSingleBadHopper();
	}
}

export function resetHoppers() {
	level.hoppers.current = 0;
	level.badHoppers.current = 0;
	level.hoppers.free = 0;
	hoppers.splice(0, hoppers.length);
	badHoppers.splice(0, badHoppers.length)
}
