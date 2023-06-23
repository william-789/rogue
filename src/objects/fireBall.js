import FireTile from "../game/firetile.js";

class FireBall extends FireTile {
  constructor(position) {
    super(position);
  }

  get image() {
    return "Fire.gif";
  }
}

export default FireBall;