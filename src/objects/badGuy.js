import Enemy from "./Enemy.js";

class BadGuy extends Enemy {
    constructor(position) {
        super(position);
    }

    get image() {
        return "BadGuy.gif";
    }
}

export default BadGuy;