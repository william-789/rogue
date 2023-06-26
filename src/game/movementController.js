import Interface from "./interface.js";
import Enemy from "../objects/Enemy.js";
import StatusBar from "./statusBar.js";

class MovementController {
  hero;
  enemies;
  gui = Interface.getInstance();
  statusBar = StatusBar.getInstance();

  constructor(hero) {
    this.hero = hero;
  }

  handleMovement(vector, room) {
    this.enemies = room.enemies;
    let roomObjects = room.getState();
    this.hero.nextPosition = this.hero.position.plus(vector);
    let collision = this.collision(this.hero, roomObjects);
    //proceeds if there's no wall
    if (!collision) {
      const objectInRoom = this.objectInRoom(this.hero,roomObjects);
      if(objectInRoom && objectInRoom.isItem) {
        try {
          this.statusBar.pickUp(objectInRoom);
          room.removeFromState(objectInRoom);
          this.gui.removeImage(objectInRoom);
        } catch (e) {
          console.log("Error:", e.message);
        }
      }
      // reset collision to check for enemy movement
      for (const enemy of this.enemies) {
        collision = true;
        enemy.getDistToHero(this.hero.position);
        while(collision) {
          enemy.move(this.hero.position);
          collision = this.collision(enemy,roomObjects);
          // consider Hero as far if there's a wall between them
          if(collision) enemy.distToHeroSq = Enemy.closeDistSquared + 1;
        }
        enemy.position = enemy.nextPosition;
      }
      this.hero.position = this.hero.nextPosition;
      this.gui.update();
    } else {
      throw new Error("You'll get a nosebleed if you collide again...")
    }
  }

  collision(char, roomObjects) {
    let objectInRoom = this.objectInRoom(char, roomObjects);
    if (!objectInRoom || !objectInRoom.collision) return false;
    return true;
  }
  objectInRoom(char, roomObjects) {
    let objectInRoom = roomObjects.find(
      (object) =>
        object.position.equals(char.nextPosition)
    );
    return objectInRoom;
  }
}

export default MovementController;
