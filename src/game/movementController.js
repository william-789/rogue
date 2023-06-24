import Interface from "./interface.js";
import Enemy from "../objects/Enemy.js";
class MovementController {
  hero;
  enemies;
  gui = Interface.getInstance();

  constructor(hero) {
    this.hero = hero;
  }

  handleMovement(vector, room) {
    this.enemies = room.enemies;
    let roomObjects = room.getState();
    this.hero.nextPosition = this.hero.position.plus(vector);
    let collision = this.collision(this.hero, roomObjects);
    //proceeds if there's no way
    if (!collision) {
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
    }
  }

  collision(char, roomObjects) {
    let objectInRoom = roomObjects.find(
      (object) =>
        object.position.x === char.nextPosition.x &&
        object.position.y === char.nextPosition.y
    );
    if (!objectInRoom || !objectInRoom.collision) return false;
    return true;
  }
}

export default MovementController;
