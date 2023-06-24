import Character from "./Character.js";
import Direction from "../util/direction.js";
class Enemy extends Character {
  static #closeDistSquared = 5; // Min (2,1) or (1,2)
  distToHeroSq;
  constructor(position) {
    super(position);
  }

  // set next position
  move(heroPosition) {
    this.getDistToHero(heroPosition);
    const movementOptions = ["UP", "RIGHT", "LEFT", "DOWN"];
    const randomIndex = Math.floor(Math.random()*movementOptions.length);
    const vector = Direction[movementOptions[randomIndex]].asVector();

    this.nextPosition = this.position.plus(vector);
  }

  getDistToHero(heroPosition) {
    this.distToHeroSq = (this.position.x - heroPosition.x)**2 + (this.position.y - heroPosition.y)**2;
    if(this.distToHeroSq > Enemy.#closeDistSquared) {
      console.log("Far from hero");
    }
    else {
      console.log("Close to hero");
    }
  }



}

export default Enemy;