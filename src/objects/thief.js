import Enemy from "./Enemy.js";
import Direction from "../util/direction.js";

class Thief extends Enemy {
  points = 25; // points for killing enemy
  constructor(position) {
    super(position);
    this.type = this.constructor.name;
    this.attack = 0.5;
    this.health = 1.5;
  }

  get image() {
    return "Thief.gif";
  }

  randomMove() {
    const movementOptions = ["UP", "RIGHT", "DOWN", "LEFT"];
    const randomIndex = Math.floor(Math.random()*movementOptions.length);
    let nextIndex = randomIndex === movementOptions.length-1 ? 0 : randomIndex + 1;
    const vector = Direction[movementOptions[randomIndex]].asVector();
    const nextVector = Direction[movementOptions[nextIndex]].asVector();

    this.nextPosition = this.position.plus(vector.plus(nextVector));
  }

  chaseHero(heroPos) {
    const movementOptions = ["UP", "RIGHT", "DOWN", "LEFT"];
    const randomIndex = Math.floor(Math.random()*movementOptions.length);
    let nextIndex = randomIndex === movementOptions.length-1 ? 0 : randomIndex + 1;
    const vector = Direction[movementOptions[randomIndex]].asVector();
    const nextVector = Direction[movementOptions[nextIndex]].asVector();

    this.nextPosition = this.position.plus(vector.plus(nextVector));
  }
}

export default Thief;