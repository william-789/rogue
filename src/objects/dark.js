import ImageTile from "../game/imageTile.js";

class Darkness extends ImageTile {
    points = 20; // points for finding
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
            type: this.type,
            isItem: this.isItem
        }
    }
}

export default Darkness;