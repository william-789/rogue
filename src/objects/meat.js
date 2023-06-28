import ImageTile from "../game/imageTile.js";

class Meat extends ImageTile {
  points = 10; // points for consumption
  constructor(position) {
    super(position);
    this.type = this.constructor.name;
  }

  get image() {
    return "GoodMeat.png";
  }
}

export default Meat;