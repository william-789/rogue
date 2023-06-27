import Health from "../objects/health.js";
import Position from "../util/position.js";
import Interface from "./interface.js";

class StatusBar {
  health = [];//transformed from number(hero.health) into obj array by getHealth()
  hero;
  gui = Interface.getInstance();

  static #instance;
  static getInstance() {
    if(StatusBar.#instance === undefined) {
      StatusBar.#instance = new StatusBar();
    }
    return StatusBar.#instance;
  }
  constructor() {
  }
  init(hero) {
    this.hero = hero;
    this.getHealth(); //create health images
  }

  getObjStatus() {
    return this.hero.fireBalls.concat(this.health,this.hero.items);
  }
  dropItem(key, stateCurrentRoom) {
    let itemFirstDropped = stateCurrentRoom.find((item) => item.position.x === this.hero.position.x && item.position.y === this.hero.position.y);
    if(itemFirstDropped) throw new Error("Can't drop on current position.");
    let delIndex = -1;
    switch (key) {
      case 1:
        delIndex = this.hero.items.findIndex((item) => item.position.x === 7);
        break;
      case 2:
        delIndex = this.hero.items.findIndex((item) => item.position.x === 8);
        break;
      case 3:
        delIndex = this.hero.items.findIndex((item) => item.position.x === 9);
        break;
      default:
        throw new Error("Key doesn't correspond to item");
    }
    if(delIndex != -1) {
      let droppedItem = this.hero.items[delIndex];
      this.gui.removeStatusImage(this.hero.items[delIndex]);
      this.hero.dropItem(delIndex); // update hero's item list
      droppedItem.position = this.hero.position;
      return droppedItem;
    }
    throw new Error("Item not found.");
  }

  pickUp(item) {
    this.hero.pickUp(item);
    this.gui.addStatusImage(item);
  }

  getHealth() {
    let x = 3;
    let copyHealth = this.hero.health; //copy num
    while (this.health.length < 4) {
      let decrease = 0;
      if(copyHealth >= 1) {
        this.health.push(new Health(new Position(x,0),1));
        decrease = 1;
      } else if(copyHealth >= 0.75) {
        this.health.push(new Health(new Position(x,0),0.75));
        decrease = 0.75;
      } else if(copyHealth >= 0.5) {
        this.health.push(new Health(new Position(x,0),0.5));
        decrease = 0.5;
      } else if(copyHealth >= 0.25) {
        this.health.push(new Health(new Position(x,0),0.25));
        decrease = 0.25;
      } else {
        this.health.push(new Health(new Position(x,0),0));
      }
      copyHealth -= decrease;
      x++;
    }
  }
}

export default StatusBar;