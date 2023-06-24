import Character from "./Character.js";
import Direction from "../util/direction.js";

class Enemy extends Character {
  static closeDistSquared = 5; // Min (2,1) or (1,2)
  distToHeroSq;
  constructor(position) {
    super(position);
  }

  // set next position
  move(heroPos) {
    let close = this.distToHeroSq <= Enemy.closeDistSquared;
    console.log("Is hero close?", close);
    if(close) this.chaseHero(heroPos);
    else this.randomMove();
  }

  getDistToHero(heroPosition) {
    this.distToHeroSq = (this.position.x - heroPosition.x)**2 + (this.position.y - heroPosition.y)**2;
    if(this.distToHeroSq > Enemy.closeDistSquared) {
      console.log("Far from hero");
    }
    else {
      console.log("Close to hero");
    }
  }

  randomMove() {
    const movementOptions = ["UP", "RIGHT", "LEFT", "DOWN"];
    const randomIndex = Math.floor(Math.random()*movementOptions.length);
    const vector = Direction[movementOptions[randomIndex]].asVector();

    this.nextPosition = this.position.plus(vector);
  }

  chaseHero(heroPos) {
    const distX = heroPos.x - this.position.x;
    const distY = heroPos.y - this.position.y;
    //checks larger dist to define orientation of movement
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