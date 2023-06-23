import FireBall from "../objects/fireBall.js";
import Health from "../objects/health.js";
import Position from "../util/position.js";
import Meat from "../objects/meat.js";
import Interface from "./interface.js";
class StatusBar {
  fireBalls = [];
  health = [];
  itens = [];
  hero;
  healthCount = 3;
  gui = Interface.getInstance();

  static #instance;
  static getInstance() {
    if(StatusBar.#instance === undefined) {
      StatusBar.#instance = new StatusBar();
    }
    return StatusBar.#instance;
  }
  constructor() {
    // receive hero to get healthCount
    // this.hero = hero;
  }

  initialState() {
    this.fireBalls = [
      new FireBall(new Position(0,0)),
      new FireBall(new Position(1,0)),
      new FireBall(new Position(2,0))
    ];
    // this.hero.health = 4;
    // this.healthCount = hero.health;
    this.getHealth();
    this.itens = [
      new Meat(new Position(7,0)),
      new Meat(new Position(8,0)),
      new Meat(new Position(9,0))
    ];
  }

  getObjStatus() {
    return this.fireBalls.concat(this.health,this.itens);
  }
  dropItem(key) {
    let delIndex = -1;
    switch (key) {
      case 1:
        delIndex = this.itens.findIndex((item) => item.position.x === 7);
        break;
      case 2:
        delIndex = this.itens.findIndex((item) => item.position.x === 8);
        break;
      case 3:
        delIndex = this.itens.findIndex((item) => item.position.x === 9);
        break;
      default:
        break;
    }
    if(delIndex != -1) {
      this.gui.removeStatusImage(this.itens[delIndex]);
      this.itens.splice(delIndex,1);
    }
    console.log(this.itens);
  }
  //UPDATE
  //yet to test, depends on MovementController
  pickUpItem(item) {
    if(this.itens.length === 3) {
      //throw new RangeError("Items list is full");
    }
    for (let x = 7; x <= 9; x++) {
      let index = this.itens.findIndex((item) => item.position.x === x);
      if(index === -1) {
        item.position = new Position(x,0);
        this.itens.push(item);
        break;
      }
    }
  }
  getHealth() {
    let x = 3;
    let copyHealth = this.healthCount;
    while (this.health.length < 4) {
      let decrease = 0;
      if(copyHealth >= 1) {
        this.health.push(new Health(new Position(x,0),1));
        decrease = 1;
      } else if(copyHealth >= 0.5) {
        this.health.push(new Health(new Position(x,0),0.5));
        decrease = 0.5;
      } else {
        this.health.push(new Health(new Position(x,0),0));
      }
      copyHealth -= decrease;
      x++;
    }
  }
}

export default StatusBar;