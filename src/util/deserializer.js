// Position
import Position from "./position.js";
// FireBall
import FireBall from "../objects/fireBall.js";
// Items
import Hammer from "../objects/hammer.js";
import Key from "../objects/key.js";
import Meat from "../objects/meat.js";
// Room
import Room from "../game/room.js";
// Enemies - serialized
import BadGuy from "../objects/badGuy.js";
import Bat from "../objects/bat.js";
import Skeleton from "../objects/skeleton.js";
import Thief from "../objects/thief.js";
// Other Objects
import Blood from "../objects/Blood.js";
import Door from "../objects/door.js";
import Wall from "../objects/wall.js";

import Score from "../game/score.js";
import Enemy from "../objects/Enemy.js";
import Diamond from "../objects/diamond.js";
import Darkness from "../objects/dark.js";
// ScoreManager
export default class Deserializer {
  constructor() {
  }
  hero(hero,heroRef) {
    const {
      position,
    fireBalls,
    items,
    points,
    health,
    attack,
    direction } = hero;
    heroRef.position = new Position(position.x,position.y);
    heroRef.fireBalls = this.fireballList(fireBalls, heroRef);
    heroRef.items.splice(0);
    for(const item of items) {
      const newItem = this.item(item);
      heroRef.items.push(newItem);
    }
    heroRef.points = points;
    heroRef.health = health;
    heroRef.attack = attack;
    heroRef.direction = direction;
  }

  fireballList(data, heroRef) {
    let fireBallList = [];
    for(const fireball of data) {
      const position = new Position(fireball.position.x, fireball.position.y);
      fireBallList.push(new FireBall(position,heroRef));
    }
    return fireBallList;
  }item(item) {
    const position = new Position(item.position.x, item.position.y);
    switch (item.type) {
      case "Key":
        return new Key(position, item.name);
      case "Meat":
        return new Meat(position);
      case "Hammer":
        return new Hammer(position);
      case "Diamond":
        return new Diamond(position);
      default:
        break;
    }
  }

  door(door) {
    const position = new Position(door.position.x, door.position.y);
    const newDoor = new Door(position, door.doorId);
    newDoor.isEntranceway = door.isEntranceway;
    newDoor.open = door.open;
    newDoor.keyRequired = door.keyRequired;
    newDoor.nextDoor = door.nextDoor;
    newDoor.nextRoom = door.nextRoom;
    newDoor.isHole = door.isHole;
    return newDoor;
  }

  stateDeserializer(object) {
    if (object.isItem) return this.item(object);
    const position = new Position(object.position.x, object.position.y);
    switch (object.type) {
      case "Blood":
        return new Blood(position);
      case "Wall":
        return new Wall(position);
      case "Door":
        return this.door(object);
      case "Darkness":
        return new Darkness(position);
      case "BadGuy":
        return new BadGuy(position);
      case "Bat":
        return new Bat(position);
      case "Skeleton":
        return new Skeleton(position);
      case "Thief":
        return new Thief(position);
      default:
        break;
    }
  }

  rooms(rooms) {
    let roomList = [];
    for (let room of rooms) {
      let newRoom = new Room(room.name);
      newRoom.active = room.active;
      for (let object of room.state) {
        const newObject = this.stateDeserializer(object);
        if (newObject instanceof Enemy) newObject.health = object.health;
        newRoom.changeState(newObject);
      }
      roomList.push(newRoom); // Add the newRoom to the roomList
    }
    return roomList;
  }
  scoreList(scoreManager) {
    let scoreList = [];
    for (const score of scoreManager) {
      scoreList.push(new Score(score.type,score.points));
    }
    return scoreList;
  }
}
