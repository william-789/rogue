import Position from "../util/position.js";
import Floor from "../objects/floor.js";
import Hero from "../objects/hero.js";
import Interface from "./interface.js";
import Room from "./room.js";

import room00 from "../../rooms/room0.js";//delete

import Direction from "../util/direction.js";

class Engine {
    gui = Interface.getInstance();
    hero;
    rooms = []

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

        //let fireball = new FireBall(new Position(5, 3), Direction.RIGHT);
        //this.gui.addImage(fireball);
        //fireball.start();
        const room0 = new Room(room00, "room0");
        let roomObjects = room0.readPattern();
        this.rooms.push(roomObjects);
        console.log(roomObjects);
        this.gui.addImages(roomObjects);

        this.hero = new Hero(new Position(5, 5));
        this.gui.addImage(this.hero);

        this.gui.start();
    }

    keyPressed(key) {
        console.log("User pressed key", key);
        //TODO
    }
}

export default Engine;
