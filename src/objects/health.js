import ImageTile from "../game/imageTile.js";

class Health extends ImageTile {
  healthCount;
  constructor(position, health) {
    super(position);
    this.healthCount = health;
  }

  get image() {
    if(this.healthCount === 1)
      return "GreenFull.png";
    else if (this.healthCount === 0.75) {
      return "Green.png";
    } else if (this.healthCount === 0.5) {
      return "RedGreen.png";
    } else if (this.healthCount === 0.25) {
      return "Red.png";
    }
    else
      return "RedEmpty.png";
  }
}

export default Health;