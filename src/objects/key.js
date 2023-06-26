import ImageTile from "../game/imageTile.js";

class Key extends ImageTile {
  points = 15; // points for finding;
  constructor(position) {
    super(position);
    this.isItem = true;
  }

  get image() {
    return "Key.png";
  }
}

export default Key;