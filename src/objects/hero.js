import Character from "./Character.js";
import FireBall from "../objects/fireBall.js";
import Meat from "../objects/meat.js";
import Position from "../util/position.js";

class Hero extends Character {
  fireBalls;
  items = [];

  constructor(position) {
    super(position);
    this.health = 4;
    this.fireBalls = [
      new FireBall(new Position(0,0)),
      new FireBall(new Position(1,0)),
      new FireBall(new Position(2,0))
    ];
    this.items = [
      new Meat(new Position(7,0)),
      new Meat(new Position(8,0)),
      new Meat(new Position(9,0))
    ];
  }

  get image() {
    return "Hero.png";
  }

  pickUpItem() {}

  dropItem(delIndex) {
    this.items.splice(delIndex,1);
  }
}

export default Hero;
