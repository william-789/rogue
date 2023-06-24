import Character from "./Character.js";
import Direction from "../util/direction.js";
class Enemy extends Character {
  constructor(position) {
    super(position);
  }

  // set next position
  move() {
    const movementOptions = ["UP", "RIGHT", "LEFT", "DOWN"];
    const randomIndex = Math.floor(Math.random()*movementOptions.length);
    const vector = Direction[movementOptions[randomIndex]].asVector();

    this.nextPosition = this.position.plus(vector);
  }

}

export default Enemy;