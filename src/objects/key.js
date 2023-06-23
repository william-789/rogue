import ImageTile from "../game/imageTile.js";

class Key extends ImageTile {
  constructor(position) {
    super(position);
    this.isItem = true;
  }

  get image() {
    return "Key.png";
  }
}

export default Key;