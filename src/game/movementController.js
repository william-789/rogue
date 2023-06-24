import Interface from "./interface.js";
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
        while(collision) {
          enemy.move(this.hero.position);
          collision = this.collision(enemy,roomObjects);
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
