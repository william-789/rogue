import Position from "../util/position.js";
import Floor from "../objects/floor.js";
import Hero from "../objects/hero.js";
import Interface from "./interface.js";
import Room from "./room.js";

import room00 from "../../rooms/room0.js"; //delete

import Direction from "../util/direction.js";
import MovementController from "./movementController.js";
import StatusBar from "./statusBar.js";

class Engine {
  gui = Interface.getInstance();
  hero;
  rooms = [];
  mControl;
  statusBar = StatusBar.getInstance();
  currentRoom;

  init() {
    console.log("Engine init");

    let floorTiles = [];
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        let position = new Position(x, y);
        floorTiles.push(new Floor(position));
      }
    }
    this.gui.addImages(floorTiles);

    //let fireball = new FireBall(new Position(5, 3), Direction.RIGHT);
    //this.gui.addImage(fireball);
    //fireball.start();
    const room0 = new Room(room00, "room0");
    let roomObjects = room0.readPattern();
    this.rooms.push(roomObjects);
    this.currentRoom = room0;//change
    this.gui.addImages(roomObjects);

    this.hero = new Hero(room0.heroPosition);
    this.gui.addImage(this.hero);

    this.mControl = new MovementController(this.hero, room0.enemies, roomObjects);

    this.statusBar.init(this.hero);

    this.gui.addStatusImages(this.statusBar.getObjStatus());

    this.gui.start();
  }

  keyPressed(key) {
    if(!isNaN(+key)) {
      try {
        let droppedItem = this.statusBar.dropItem(+key, this.currentRoom.getState());
        this.currentRoom.changeState(droppedItem);
        this.gui.addImage(droppedItem);
        this.gui.update();
      } catch (e) {
        console.log("Error:", e.message);
      }
    } else {
      let newK = key.replace(/arrow/i, "").toUpperCase();
      let vector = Direction[newK].asVector();
      this.mControl.handleMovement(vector);
    }

  }
}

export default Engine;
