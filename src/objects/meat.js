import ImageTile from "../game/imageTile.js";

class Meat extends ImageTile {
  points = 10; // points for consumption
  constructor(position) {
    super(position);
  }

  get image() {
    return "GoodMeat.png";
  }
}

export default Meat;