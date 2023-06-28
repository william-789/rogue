import Enemy from "./Enemy.js";

class Skeleton extends Enemy {
  points = 25; // points for killing enemy
  constructor(position) {
    super(position);
    this.type = this.constructor.name;
  }

  get image() {
    return "Skeleton.gif";
  }
}

export default Skeleton;