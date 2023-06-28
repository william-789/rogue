import FireTile from "../game/firetile.js";
import Wall from "./wall.js";
import Enemy from "./Enemy.js";
import Direction from "../util/direction.js";
import Blood from "./Blood.js";
import Interface from "../game/interface.js";

class FireBall extends FireTile {
  room;
  heroRef;
  strength;
  gui = Interface.getInstance();
  constructor(position, heroRef) {
    super(position, Direction.LEFT);
    this.heroRef = heroRef;
    this.strength = 10;
  }

  get image() {
    return "Fire.gif";
  }
  validateImpact() {
    const object = this.room.getState().find((obj) => obj.position.equals(this.position));
    if(object instanceof Wall || object instanceof Enemy) {
      if(object instanceof Enemy) {
        object.health -= this.strength;
        if(object.health <= 0) {
          // Remove dead object from scene and add its remains
          this.room.removeEnemy(object);
          this.gui.removeImage(object);
          let deadEnemy = new Blood(object.position);
          this.gui.addImage(deadEnemy, this.heroRef);
        }
      }
      return true;
    }
    return false;
  }
}

export default FireBall;