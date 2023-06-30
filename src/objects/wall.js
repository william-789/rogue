import ImageTile from "../game/imageTile.js";

class Wall extends ImageTile {
    collision;
    constructor(position) {
        super(position);
        this.collision = true;
    }

    get image() {
        return "Wall.png";
    }

    toJSON() {
        return {
            position: this.position,
            type: "Wall"
        }
    }
}

export default Wall;