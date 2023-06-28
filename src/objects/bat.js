import Enemy from "./Enemy.js";

class Bat extends Enemy {
  points = 35; // points for killing enemy
  constructor(position) {
    super(position);
    this.type = this.constructor.name;
    this.attack = 0.75;
    this.health = 2;
  }

  get image() {
    return "Bat.gif";
  }
}

export default Bat;