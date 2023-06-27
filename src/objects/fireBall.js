import FireTile from "../game/firetile.js";
import Wall from "./wall.js";
import Enemy from "./Enemy.js";
import Direction from "../util/direction.js";

class FireBall extends FireTile {
  constructor(position) {
    super(position, Direction.RIGHT);
  }

  get image() {
    return "Fire.gif";
  }
  validateImpact(roomObjects) {
    const object = roomObjects.find((obj) => obj.position.equals(this.position));
    if(object instanceof Wall || object instanceof Enemy) {
      return true;
    }
    return false;
  }
}

export default FireBall;