import { config } from "../game.js";
import { hoppers } from "../game.js";
import Hopper from "./Hopper.js";

export default class BadHopper extends Hopper {
	constructor(x, y) {
		super(x, y);
		this.color = config.hopper.badColor;
		this.killedHopper = false;
	}

	testCollision() {
		// COLLISIONS

		// Test if collided with good hopper
		hoppers.forEach(hopper => {
			if (
				this.right > hopper.left &&
				this.right < hopper.right &&
				this.y == hopper.y
			) {
				this.killedHopper = true;
			} else if (
				this.left < hopper.right &&
				this.left > hopper.left &&
				this.y == hopper.y
			) {
				this.killedHopper = true;
			}
		});
	}
}
