import Enemy from "./Enemy.js";

class Skeleton extends Enemy {
    constructor(position) {
        super(position);
    }

    get image() {
        return "Skeleton.gif";
    }
}

export default Skeleton;