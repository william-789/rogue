import BadGuy from "../objects/badGuy.js";
import Bat from "../objects/bat.js";
import Hammer from "../objects/hammer.js";
import Key from "../objects/key.js";
import Meat from "../objects/meat.js";
import Skeleton from "../objects/skeleton.js";
import Wall from "../objects/wall.js";
import Position from "../util/position.js"; // Position

class Room {
  #state;
  #pattern;
  name;
  #heroPosition;

  constructor(pattern, name) {
    this.#pattern = pattern;
    this.name = name;
  }

  readPattern() {
    let lines = this.#pattern.split("\n");
    let gameLines = [];
    for (let line of lines) {
      if (line[0] !== "#") gameLines.push(line);
    }
    let objectList = [];
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        let newObject = this.returnObject(gameLines[y][x], x, y);
        if (newObject) objectList.push(newObject);
      }
    }
    this.#state = objectList;
    return objectList;
  }

  returnObject(element, x, y) {
    switch (element) {
      case "W":
        return new Wall(new Position(x, y));
      case "S":
        return new Skeleton(new Position(x, y));
      case "h":
        return new Hammer(new Position(x, y));
      case "B":
        return new Bat(new Position(x, y));
      case "k":
        return new Key(new Position(x, y));
      case "G":
        return new BadGuy(new Position(x, y));
      case "m":
        return new Meat(new Position(x, y));
      case "H":
        this.#heroPosition = new Position(x, y);
        break;
      default:
        return undefined;
    }
  }

  get heroPosition() {
    return this.#heroPosition;
  }

  get state() {
    return this.#state;
  }
}

export default Room;
