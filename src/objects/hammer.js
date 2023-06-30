import Weapon from "./Weapon.js";
class Hammer extends Weapon {
  points = 15;
  constructor(position) {
    super(position);
    this.isItem = true;
    this.additionalAttack = 0.5;
    this.type = this.constructor.name;
  }

  get image() {
    return "Hammer.png";
  }

  toJSON() {
    return {
      position: this.position,
      type: this.type,
      isItem: this.isItem
    }
  }
}

export default Hammer;