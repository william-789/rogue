import ImageTile from "../game/imageTile.js";

class Hammer extends ImageTile {
  constructor(position) {
    super(position);
    this.isItem = true;
  }

  get image() {
    return "Hammer.png";
  }
}

export default Hammer;