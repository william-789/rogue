import ImageTile from "../game/imageTile.js";

class Character extends ImageTile {
  health;
  attack;
  nextPosition;

  constructor(position) {
    super(position);
  }
  move () {}
}

export default Character;