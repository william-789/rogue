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
    const distX = heroPos.x - this.position.x;
    const distY = heroPos.y - this.position.y;

    if(distX > 0 && distY > 0) {
      this.nextPosition = this.position.plus(Direction.RIGHT.asVector().plus(Direction.DOWN.asVector()));
    } else if(distX < 0 && distY > 0) {
      this.nextPosition = this.position.plus(Direction.LEFT.asVector().plus(Direction.DOWN.asVector()));
    } else if(distX < 0 && distY < 0) {
      this.nextPosition = this.position.plus(Direction.LEFT.asVector().plus(Direction.UP.asVector()));
    } else {
      this.nextPosition = this.position.plus(Direction.RIGHT.asVector().plus(Direction.UP.asVector()));
    }
    console.log("Chasing hero");
  }
}

export default Thief;