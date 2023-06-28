import Character from "./Character.js";
import FireBall from "../objects/fireBall.js";
import Meat from "../objects/meat.js";
import Position from "../util/position.js";
import Weapon from "./Weapon.js";
import Direction from "../util/direction.js";

class Hero extends Character {
  fireBalls;
  items = [];
  points = -1; // lost points for moving/per movement

  constructor(position) {
    super(position);
    this.health = 4;
    this.attack = 1;
    this.fireBalls = [
      new FireBall(new Position(0,0),this),
      new FireBall(new Position(1,0),this),
      new FireBall(new Position(2,0),this)
    ];
    this.items = [
      new Meat(new Position(7,0)),
      new Meat(new Position(8,0)),
      new Meat(new Position(9,0))
    ];
    this.type = "Movement"; // points type
    this.direction = "RIGHT";
  }

  get image() {
    if(this.direction === "RIGHT") {
      return "HeroRight.png";
    }
    if(this.direction === "LEFT") {
      return "HeroLeft.png";
    }
    if(this.direction === "DOWN") {
      return "HeroFront.png";
    }
    return "HeroBack.png";
  }

  pickUp(item) {
    if(this.items.length === 3) {
      throw new Error("Bag is full of items already!");
    }
    if(item instanceof Weapon) {
      const weapon = this.items.find((weapon) => weapon instanceof Weapon);
      if(weapon) throw new Error("Can't hold more than one weapon");
    }
    for (let i = 7; i <= 9; i++) {
      const unavailablePos = this.items.find((storedItem) => storedItem.position.x === i);
      if(!unavailablePos) {
        item.position = new Position(i,0);
        this.items.push(item);
        if(item instanceof Weapon) this.attack += item.additionalAttack;
        console.log("Item added to bag on position x = ", i-6);
        break;
      }
    }

  }

  dropItem(delIndex) {
    if(this.items[delIndex] instanceof Weapon) this.attack -= this.items[delIndex].additionalAttack;
    this.items.splice(delIndex,1);
  }

  getFireball() {
    const lastPos = this.fireBalls.length -1;
    const fireball = this.fireBalls[lastPos];
    if(fireball) {
      fireball.updateDirection(Direction[this.direction]);
      this.fireBalls.splice(lastPos,1);
      return fireball;
    }
    else throw new Error("All fireballs have been used already.");
  }
}

export default Hero;
