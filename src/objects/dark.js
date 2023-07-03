import ImageTile from "../game/imageTile.js";

class Darkness extends ImageTile {
    constructor(position) {
        super(position);
        this.type = this.constructor.name;
    }

    get image() {
        return "Black.png";
    }

    toJSON() {
        return {
            position: this.position,
            type: this.type
        }
    }
}

export default Darkness;