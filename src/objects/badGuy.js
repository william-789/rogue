import Enemy from "./Enemy.js";

class BadGuy extends Enemy {
  points = 50; // points for killing enemy
  constructor(position) {
    super(position);
    this.type = this.constructor.name;
    this.attack = 1.25;
    this.health = 3;
  }

  get image() {
    return "BadGuy.gif";
  }

  toJSON() {
    return {
      position: this.position,
      type: this.type,
      health: this.health
    }
  }
}

export default BadGuy;