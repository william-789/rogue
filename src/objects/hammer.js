import Weapon from "./Weapon.js";
class Hammer extends Weapon {
  points = 15;
  constructor(position) {
    super(position);
    this.isItem = true;
    this.additionalAttack = 3;
    this.type = this.constructor.name;
  }

  get image() {
    return "Hammer.png";
  }
}

export default Hammer;