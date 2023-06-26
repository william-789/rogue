import Enemy from "./Enemy.js";

class BadGuy extends Enemy {
    points = 50; // points for killing enemy
    constructor(position) {
        super(position);
    }

    get image() {
        return "BadGuy.gif";
    }
}

export default BadGuy;