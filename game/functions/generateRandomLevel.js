import { config } from "../game.js";

export default function generateRandomLevel() {
	let maxDensity = 0.4;
	let chanceImmovable = Math.max(0.66, Math.random());
	let density = Math.max(maxDensity, Math.random());
	let newLevel = {};
	newLevel.hoppers = {};
	newLevel.name = "Random";
	newLevel.hoppers.max = (Math.floor(Math.random() * 5) + 1).toString();
	newLevel.hoppers.releaseRate = 100;
	newLevel.map = [];

	for (let y = 0; y < config.board.size; y++) {
		let row = [];
		for (let x = 0; x < config.board.size; x++) {
			if (Math.random() > density && y > 1) {
				if (Math.random() > chanceImmovable) {
					row.push("2");
				} else {
					row.push("1");
				}
			} else {
				row.push("0");
			}
		}
		newLevel.map.push(row);
	}
	
	function shuffle(array) {
		let counter = array.length;

		while (counter > 0) {
			let index = Math.floor(Math.random() * counter);
			counter--;
			let temp = array[counter];
			array[counter] = array[index];
			array[index] = temp;
		}

		return array;
	}

	let topRow = [];
	for (let i = 0; i < config.board.size; i++) {
		topRow.push(i);
	}
	topRow = shuffle(topRow);
	console.log()
	for (let i = 0; i < newLevel.hoppers.max; i++) {
		if (i == 0 || Math.random() > 0.6) {
			newLevel.map[0][topRow[i]] = "3";
		}
	}

	let randX = Math.floor(Math.random() * config.board.size);
	let randY = Math.floor(Math.random() * config.board.size);

	newLevel.map[randX][randY] = "4";

	
	return newLevel;
}
