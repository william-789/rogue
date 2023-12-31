import ImageTile from "../game/imageTile.js";

class Key extends ImageTile {
  points = 15; // points for finding;
  constructor(position, name) {
    super(position);
    this.isItem = true;
    this.type = this.constructor.name;
    this.name = name;
  }

  get image() {
    return "Key.png";
  }
  toJSON() {
    return {
      position: this.position,
      type: this.type,
      isItem: this.isItem,
      name: this.name
    }
  }
}

export default Key;