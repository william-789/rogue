import Weapon from "./Weapon.js";
class Hammer extends Weapon {
  constructor(position) {
    super(position);
    this.isItem = true;
    this.additionalAttack = 3;
  }

  get image() {
    return "Hammer.png";
  }
}

export default Hammer;