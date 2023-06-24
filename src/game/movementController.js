import Interface from "./interface.js";
class MovementController {
  hero;
  enemies;
  gui = Interface.getInstance();

  constructor(hero) {
    this.hero = hero;
  }

  handleMovement(vector, room) {
    let roomObjects = room.getState();
    this.enemies = room.enemies;
    let nextPosition = this.hero.position.plus(vector);
    let objectInRoom = roomObjects.find(
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
