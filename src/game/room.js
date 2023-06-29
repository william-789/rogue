import BadGuy from "../objects/badGuy.js";
import Bat from "../objects/bat.js";
import Hammer from "../objects/hammer.js";
import Key from "../objects/key.js";
import Meat from "../objects/meat.js";
import Skeleton from "../objects/skeleton.js";
import Wall from "../objects/wall.js";
import Enemy from "../objects/Enemy.js";
import Position from "../util/position.js";
import Door from "../objects/door.js";
import Thief from "../objects/thief.js";

class Room {
  #state;
  #pattern;
  name;
  #heroPosition;
  keyName;
  doorsData = [];

  constructor(pattern, name) {
    this.#pattern = pattern;
    this.name = name;
    this.active = false;
  }

  readPattern() {
    let lines = this.#pattern.split("\n");
    let gameLines = [];
    let configLines = [];
    for (let line of lines) {
      if (line[0] !== "#") gameLines.push(line);
      else configLines.push(line);
    }
    for(let config of configLines) {
      this.getRoomConfiguration(config);
    }
    let objectList = [];
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        let newObject = this.returnObject(gameLines[y][x], x, y);
        if (newObject) {
          objectList.push(newObject);
          if(newObject instanceof Door) this.configDoor(newObject);
          if(newObject instanceof Key) newObject.name = this.keyName;
        }
      }
    }

    this.#state = objectList;
    return this.#state;
  }

  returnObject(element, x, y) {
    const position = new Position(x,y);
    switch (element) {
      case "W":
        return new Wall(position);
      case "S":
        return new Skeleton(position);
      case "h":
        return new Hammer(position);
      case "B":
        return new Bat(position);
      case "k":
        return new Key(position);
      case "G":
        return new BadGuy(position);
      case "m":
        return new Meat(position);
      case "T":
        return new Thief(position);
      case "H":
        this.#heroPosition = position;
        break;
      default:
        if (!isNaN(parseInt(element))) {
          return new Door(position, element);
        } else {
          return undefined;
        }
    }
  }

  changeState(obj) {
    if(obj) this.#state.push(obj);
  }

  removeFromState(obj) {
    let position = this.#state.findIndex((object) => object === obj);
    if(position !== -1) this.#state.splice(position,1);
    else throw new Error("Object not found in room");
  }

  get heroPosition() {
    return this.#heroPosition;
  }

  get enemies() {
    return this.#state.filter((obj) => obj instanceof Enemy);
  }

  getState() {
    return this.#state;
  }

  getRoomConfiguration(line) {
    if(line.includes(" k ")) {
      const [,, name] = line.split(' ');
      this.keyName = name;
    } else {
      // set keyRequired to null if info doesn't exist
      const [, doorId, doorType, nextRoom, nextDoor, keyRequired] = line.split(' ').length === 5
        ? [...line.split(' '), null]
        : line.split(' ');
      if(doorType) this.doorsData.push({
        doorId,
        doorType,
        nextRoom,
        nextDoor,
        keyRequired,
      });
    }
  }

  configDoor(door){
    const data = this.doorsData.find((doorConfig) => doorConfig.doorId === door.doorId);
    if(data) {
      door.nextDoor = data.nextDoor;
      door.nextRoom = data.nextRoom;
      if(data.doorType === "E") {
        door.isEntranceway = true;
        door.open = true;
      } else if (data.keyRequired) {
        door.keyRequired = data.keyRequired;
      } else {
        door.open = true
      }
    }
  }
}

export default Room;
