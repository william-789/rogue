// Position - serialized
import Position from "./position.js";
// Hero  - serialized
import Hero from "../objects/hero.js";
// FireBall - serialized
import FireBall from "../objects/fireBall.js";
// Items - serialized
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
// ScoreManager
export default class Deserializer {
  /*Position
    x: this.#x,
    y: this.#y
      */
  /*Hero
    position: this.position,
    fireBalls: this.fireBalls,
    items: this.items,
    points: this.points,
    health: this.health,
    attack: this.attack,
    type: this.type,
    direction: this.direction
      */
  /*FireBall
    position: this.position
      */
  /*Items
    position: this.position,
    type: this.type
      */
  /*Enemies
    position: this.position,
    type: this.type,
    health: this.health
      */
  /*Blood and Wall
    position: this.position
      */
  /*Door
    position: this.position,
    isEntranceway: this.isEntranceway,
    open: this.open,
    keyRequired: this.keyRequired,
    nextDoor: this.nextDoor,
    nextRoom: this.nextRoom,
    collision: this.collision,
    doorId: this.doorId
      */
  /*Room*/
  /*ScoreManager
    registryList: this.registryList
      */
}
