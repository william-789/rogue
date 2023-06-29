import Character from "./Character.js";
import Direction from "../util/direction.js";

class Enemy extends Character {
  static closeDistSquared = 5; // Minimum squared distance to consider the hero close
  distToHeroSq;
  constructor(position) {
    super(position);
  }

  // Set the next position for the enemy based on the hero's position
  move(heroPos) {
    let close = this.distToHeroSq <= Enemy.closeDistSquared;
    if(close) this.chaseHero(heroPos);
    else this.randomMove();
  }

  // Calculate the squared distance between the enemy and the hero
  getDistToHero(heroPosition) {
    this.distToHeroSq = (this.position.x - heroPosition.x)**2 + (this.position.y - heroPosition.y)**2;
  }

  // Move the enemy randomly in any direction
  randomMove() {
    const movementOptions = ["UP", "RIGHT", "LEFT", "DOWN"];
    const randomIndex = Math.floor(Math.random()*movementOptions.length);
    const vector = Direction[movementOptions[randomIndex]].asVector();

    this.nextPosition = this.position.plus(vector);
  }

  // Chase the hero by moving towards their position
  chaseHero(heroPos) {
    const distX = heroPos.x - this.position.x;
    const distY = heroPos.y - this.position.y;
    // Check the larger distance to define the orientation of movement
    if (Math.abs(distX) > Math.abs(distY)) {
      if (distX < 0) {
        this.nextPosition = this.position.plus(Direction.LEFT.asVector());
      } else {
        this.nextPosition = this.position.plus(Direction.RIGHT.asVector());
      }
    } else {
      if (distY < 0) {
        this.nextPosition = this.position.plus(Direction.UP.asVector());
      } else {
        this.nextPosition = this.position.plus(Direction.DOWN.asVector());
      }
    }
    console.log("Chasing hero");
  }
}

export default Enemy;