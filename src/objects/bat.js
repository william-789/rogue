import Enemy from "./Enemy.js";

class Bat extends Enemy {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Bat.gif";
    }
}

export default Bat;