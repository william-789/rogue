import Character from "./Character.js";

class Hero extends Character {

  // static #instance;
  // static getInstance() {
  //     if(Hero.#instance === undefined) {
  //         Hero.#instance = new Hero();
  //     }
  //     return Hero.#instance;
  // }
  constructor(position) {
    super(position);
  }

  get image() {
    return "Hero.png";
  }
}

export default Hero;
