import ImageTile from "../game/imageTile.js";

class Meat extends ImageTile {
  points = 10; // points for consumption
  constructor(position) {
    super(position);
    this.isItem = true;
    this.type = this.constructor.name;
    this.healthRecovery = 0.5;
  }

  get image() {
    return "GoodMeat.png";
  }

  toJSON() {
    return {
      position: this.position,
      type: this.type,
      isItem: this.isItem
    }
  }
}

export default Meat;