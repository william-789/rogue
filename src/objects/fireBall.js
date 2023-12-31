import FireTile from "../game/firetile.js";
import Wall from "./wall.js";
import Enemy from "./Enemy.js";
import Direction from "../util/direction.js";
import Blood from "./Blood.js";
import Interface from "../game/interface.js";
import ScoreManager from "../game/scoreManager.js";

class FireBall extends FireTile {
  room;
  heroRef;
  strength;
  gui = Interface.getInstance();
  scoreManager = ScoreManager.getInstance();
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
          // Register points
          this.scoreManager.addRecord(object.type, object.points);
          // Remove dead object from scene and add its remains
          this.room.removeFromState(object);
          this.gui.removeImage(object);
          let deadEnemy = new Blood(object.position);
          this.room.changeState(deadEnemy);
          this.gui.addImage(deadEnemy, this.heroRef);
        }
      }
      return true;
    }
    return false;
  }

  toJSON() {
    return {
      position: this.position
    }
  }
}

export default FireBall;