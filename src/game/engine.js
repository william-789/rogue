import Position from "../util/position.js";
import Floor from "../objects/floor.js";
import Hero from "../objects/hero.js";
import Interface from "./interface.js";

class Engine {
    gui = Interface.getInstance();

    init() {
        console.log("Engine init");

        let floorTiles = [];
        for(let x = 0; x < 10; x++) {
            for(let y = 0; y < 10; y++) {
                let position = new Position(x, y);
                floorTiles.push(new Floor(position));
            }
        }
        this.gui.addImages(floorTiles);

        let hero = new Hero(new Position(4, 3));
        this.gui.addImage(hero);

        //let fireball = new FireBall(new Position(5, 3), Direction.RIGHT);
        //this.gui.addImage(fireball);
        //fireball.start();

        this.gui.start();
    }

    keyPressed(key) {
        console.log("User pressed key", key);
        //TODO
    }
}

export default Engine;
