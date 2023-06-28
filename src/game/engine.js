import Position from "../util/position.js";
import Floor from "../objects/floor.js";
import Hero from "../objects/hero.js";
import Interface from "./interface.js";
import Room from "./room.js";

import Direction from "../util/direction.js";
import MovementController from "./movementController.js";
import StatusBar from "./statusBar.js";

//Room string patterns imports
import room00 from "../../rooms/room0.js";
import room01 from "../../rooms/room1.js";
import room02 from "../../rooms/room2.js";

const roomPatterns = [room00,room01,room02];

class Engine {
  gui = Interface.getInstance();
  hero;
  rooms = [];
  mControl;
  statusBar = StatusBar.getInstance();
  currentRoom;

  init() {
    console.log("Engine init");

    // Create all rooms and store them
    for(let pattern of roomPatterns) {
      const room = new Room(pattern, `room${this.rooms.length}`);
      this.rooms.push(room);
    }
    // Make floor
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

    // Set current room and add to gui
    this.currentRoom = this.rooms[0];//change
    this.gui.addImages(this.currentRoom.readPattern());

    this.hero = new Hero(this.currentRoom.heroPosition);
    this.gui.addImage(this.hero);

    this.mControl = new MovementController(this.hero);

    this.statusBar.init(this.hero);

    this.gui.addStatusImages(this.statusBar.getObjStatus());

    this.gui.start();
  }

  keyPressed(key) {
    if(key === "Space") {
      try {
        let fireball = this.hero.getFireball();
        this.gui.removeStatusImage(fireball); // update StatusBar
        fireball.position = this.hero.position;
        this.gui.addImage(fireball);
        fireball.start();
      } catch (e) {
        console.log("Error:", e.message);
      }
    } else if(!isNaN(+key)) {
      try {
        let droppedItem = this.statusBar.dropItem(+key, this.currentRoom.getState());
        this.currentRoom.changeState(droppedItem);
        this.gui.addImage(droppedItem,this.hero);
        this.gui.update();
      } catch (e) {
        console.log("Error:", e.message);
      }
    } else {
      let newK = key.replace(/arrow/i, "").toUpperCase();
      let vector = Direction[newK].asVector();
      try {
        this.mControl.handleMovement(vector, this.currentRoom);
      } catch (e) {
        console.log("Error:", e.message);
      }
    }

  }
}

export default Engine;
