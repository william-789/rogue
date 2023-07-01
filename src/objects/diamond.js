import ImageTile from "../game/imageTile.js";

class Diamond extends ImageTile {
    points = 20; // points for finding
    constructor(position) {
        super(position);
        this.isItem = true;
        this.type = this.constructor.name;
    }

    get image() {
        return "diamond.png";
    }

    toJSON() {
        return {
            position: this.position,
            type: this.type,
            isItem: this.isItem
        }
    }
}

export default Diamond;