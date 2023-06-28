import Character from "./Character.js";
import FireBall from "../objects/fireBall.js";
import Meat from "../objects/meat.js";
import Position from "../util/position.js";

class Hero extends Character {
  fireBalls;
  items = [];
  points = -1; // lost points for moving/per movement

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
    this.type = "Movement"; // points type
  }

  get image() {
    return "Hero.png";
  }

  pickUp(item) {
    if(this.items.length === 3) {
      throw new Error("Bag is full of items already!");
    }
    for (let i = 7; i <= 9; i++) {
      const unavaiablePos = this.items.find((storedItem) => storedItem.position.x === i);
      if(!unavaiablePos) {
        item.position = new Position(i,0);
        this.items.push(item);
        console.log("Item added to bag on position x = ", i-6);
        break;
      }
    }

  }

  dropItem(delIndex) {
    this.items.splice(delIndex,1);
  }

  getFireball() {
    const lastPos = this.fireBalls.length -1;
    const fireball = this.fireBalls[lastPos];
    if(fireball) {
      this.fireBalls.splice(lastPos,1);
      return fireball;
    }
    else throw new Error("All fireballs have been used already.");
  }
}

export default Hero;
