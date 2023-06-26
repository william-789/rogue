import ImageTile from "../game/imageTile.js";

class Weapon extends ImageTile {
  additionalAttack;
  constructor(position) {
    super(position);
    this.isItem = true;
  }
}

export default Weapon;