import Enemy from "./Enemy.js";

class Skeleton extends Enemy {
  points = 25; // points for killing enemy
  constructor(position) {
    super(position);
    this.type = this.constructor.name;
    this.attack = 0.25;
    this.health = 0.5;
  }

  get image() {
    return "Skeleton.gif";
  }

  toJSON() {
    return {
      position: this.position,
      type: this.type,
      health: this.health
    }
  }
}

export default Skeleton;