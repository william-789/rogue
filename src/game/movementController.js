import Interface from "./interface.js";
class MovementController {
  hero;
  enemies;
  roomObjects;
  gui = Interface.getInstance();

  constructor(hero, enemies, room) {
    this.hero = hero;
    this.enemies = enemies;
    this.roomObjects = room;
  }

  handleMovement(vector) {
    let nextPosition = this.hero.position.plus(vector);
    let objectInRoom = this.roomObjects.find(
      (object) =>
        object.position.x === nextPosition.x &&
        object.position.y === nextPosition.y
    );
    //move Hero if there's no wall
    if (!objectInRoom || !objectInRoom.collision) {
      this.hero.position = nextPosition;
      this.gui.update();
    }
  }
}

export default MovementController;
