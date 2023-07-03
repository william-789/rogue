import Position from "../util/position.js";
import Floor from "../objects/floor.js";
import Hero from "../objects/hero.js";
import Interface from "./interface.js";
import Room from "./room.js";
import MovementController from "./movementController.js";
import StatusBar from "./statusBar.js";
import StateManager from "../util/stateManager.js";
import ScoreManager from "./scoreManager.js";
import Deserializer from "../util/deserializer.js";

//Room string patterns imports
import room00 from "../../rooms/room0.js";
import room01 from "../../rooms/room1.js";
import room02 from "../../rooms/room2.js";
import room03 from "../../rooms/room3.js";
import room04 from "../../rooms/room4.js";

const roomPatterns = [room00,room01,room02,room03,room04];

class Engine {
  gui = Interface.getInstance();
  hero;
  rooms = [];
  mControl;
  statusBar = StatusBar.getInstance();
  currentRoom;
  saveName = "";
  floor;
  scoreManager = ScoreManager.getInstance();
  deserializer = new Deserializer();

  init() {
    console.log("Engine init");

    // Create all rooms and store them
    for(let pattern of roomPatterns) {
      const room = new Room(`room${this.rooms.length}`);
      room.readPattern(pattern);
      this.rooms.push(room);
    }
    // Make floor
    this.floor = this.makeFloor();
    this.gui.addImages(this.floor);

    // Set current room and add to gui
    this.currentRoom = this.rooms[0];//change
    this.currentRoom.active = true;
    this.gui.addImages(this.currentRoom.getState());

    // Add hero to gui
    this.hero = new Hero(this.currentRoom.heroPosition);
    this.gui.addImage(this.hero);

    // Creates MovementController
    this.mControl = new MovementController(this.hero);

    // Add statusBar to gui
    this.statusBar.init(this.hero);
    this.gui.addStatusImages(this.statusBar.getObjStatus());

    this.gui.start();
  }

  keyPressed(key) {
    if(this.scoreManager.EOG) {
      console.log("You ended the game. Press F5 to start again or load another state.");
      return;
    }
    if(key === "F1" || key === "F2" || key === "F3" || key === "F4") { // save slot keys
      const savedState = StateManager.loadState(key);
      if(!(this.saveName === key) && savedState) {
        console.log("Loading state saved on slot", key);
        this.saveName = key;
        this.updateGameState(savedState);
      } else {
        if(this.saveName === key) console.log("Current saved state will be overwritten");
        console.log("Saving on slot", key);
        this.saveName = key;
        const currentGame = [
          this.hero,
          this.rooms,
          this.scoreManager
        ];
        StateManager.saveState(currentGame,key);
      }
    } else
    if(key === "Space") { // FireBall key
      try {
        let fireball = this.hero.getFireball();
        this.gui.removeStatusImage(fireball); // update StatusBar
        fireball.position = this.hero.position;
        fireball.room = this.currentRoom;
        this.gui.addImage(fireball);
        fireball.start();
      } catch (e) {
        console.log("Error:", e.message);
      }
    } else if(!isNaN(+key)) { // Drop item key 1-2-3
      try {
        let droppedItem = this.statusBar.dropItem(+key, this.currentRoom.getState());
        this.currentRoom.changeState(droppedItem);
        this.gui.addImage(droppedItem,this.hero);
        this.gui.update();
      } catch (e) {
        console.log("Error:", e.message);
      }
    } else { // walk
      let newK = key.replace(/arrow/i, "").toUpperCase();
      if(newK === "RIGHT" || newK === "LEFT" || newK === "UP" || newK === "DOWN") {
        try {
          // return door if next tile is a door,
          // else handle the movement and return is undefined
          const door = this.mControl.handleMovement(newK, this.currentRoom);
          if(door) this.handleDoor(door);
        } catch (e) {
          console.log("Error:", e.message);
        }
      }
    }
  }

  handleDoor(door) {
    //tries to open door
    if(!door.open) {
      const key = this.hero.getKey(door.keyRequired);
      if(key) {
        door.open = true;
        this.statusBar.update();
      }
    }
    if(door.open) {
      this.hero.Position = this.hero.nextPosition;
      this.gui.update();
      this.changeRoom(door)
    } else {
      throw new Error("Door is locked and you don't have the right key!");
    }
    this.gui.update()
  }

  changeRoom(door){
    this.currentRoom.active = false;
    const nextRoom = this.rooms.find((room) => room.name === door.nextRoom)
    if(!nextRoom) throw new Error("Room isn't in the game");
    this.currentRoom = nextRoom;
    this.currentRoom.active = true;
    const nextDoor = this.currentRoom.getState().find((obj) => obj.doorId === door.nextDoor);
    nextDoor.open = true;
    this.hero.position = nextDoor.position;
    this.gui.clearImages();
    this.gui.addImages(this.floor);
    this.gui.addImages(this.currentRoom.getState());
    this.gui.addImage(this.hero);
    const roomName = this.currentRoom.name;
    this.gui.showMessage(`${roomName.slice(0,-1)} ${roomName.charAt(roomName.length-1)}`,"room");
  }

  makeFloor() {
    let floorTiles = [];
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        let position = new Position(x, y);
        floorTiles.push(new Floor(position));
      }
    }
    return floorTiles;
  }

  updateGameState(savedState) {
    let [hero, rooms, scoreManager] = savedState;
    this.deserializer.hero(hero, this.hero); // update hero with stored data
    this.rooms = this.deserializer.rooms(rooms);
    this.currentRoom = this.rooms.find((room) => room.active);
    this.scoreManager.registryList = this.deserializer.scoreList(scoreManager.registryList); // replace score registry
    this.statusBar.update();
    this.gui.clearImages();
    this.gui.addImages(this.floor);
    this.gui.addImages(this.currentRoom.getState());
    this.gui.addImage(this.hero);
    this.gui.update();
  }
}

export default Engine;
