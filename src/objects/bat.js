import Enemy from "./Enemy.js";

class Bat extends Enemy {
    points = 35; // points for killing enemy
    constructor(position) {
        super(position);
    }

    get image() {
        return "Bat.gif";
    }
}

export default Bat;