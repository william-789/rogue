import ImageTile from "../game/imageTile.js";

class Meat extends ImageTile {
    constructor(position) {
        super(position);
    }

    get image() {
        return "GoodMeat.png";
    }
}

export default Meat;