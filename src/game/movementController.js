import Interface from "./interface.js";
import Enemy from "../objects/Enemy.js";
import StatusBar from "./statusBar.js";
import Blood from "../objects/Blood.js";
import Direction from "../util/direction.js";
import Door from "../objects/door.js";
import Meat from "../objects/meat.js";
import Hero from "../objects/hero.js";
import ScoreManager from "./scoreManager.js";
import Diamond from "../objects/diamond.js";

class MovementController {
  hero;
  enemies;
  gui = Interface.getInstance();
  statusBar = StatusBar.getInstance();
  scoreManager = ScoreManager.getInstance();

  constructor(hero) {
    this.hero = hero;
  }

  handleMovement(key, room) {
    if(this.hero.direction !== key) { // change hero image based on direction
      this.hero.direction = key;
      this.gui.update();
    } else {
      let vector = Direction[key].asVector();
      this.enemies = room.enemies;
      let roomObjects = room.getState();
      this.hero.nextPosition = this.hero.position.plus(vector);
      // Prevents hero from leaving the grid
      if(this.outOfRange(this.hero.nextPosition)) return;
      let collision = this.collision(this.hero, roomObjects);
      //proceeds if there's no wall
      if (!collision) {
        const objectInRoom = this.objectInRoom(this.hero,roomObjects);
        if(objectInRoom instanceof Door) {
          // return door to engine to handle room change
          return objectInRoom;
        }
        // item verification
        if(objectInRoom && objectInRoom.isItem) {
          try {
            // consume meat
            if(objectInRoom instanceof Meat && this.hero.health < Hero.maxHealth) {
              this.hero.eat(objectInRoom);
              this.statusBar.update();
            } else { // collect item
              this.statusBar.pickUp(objectInRoom);
            }
            this.scoreManager.addRecord(objectInRoom.type, objectInRoom.points); // register points
            room.removeFromState(objectInRoom);
            this.gui.removeImage(objectInRoom);
            if(objectInRoom instanceof Diamond) this.scoreManager.endOfGame();
          } catch (e) {
            console.log("Error:", e.message);
          }
        }
        // reset collision to check for enemy movement
        for (const enemy of this.enemies) {
          collision = true;
          enemy.getDistToHero(this.hero.position);
          while(collision) {
            enemy.move(this.hero.position);
            collision = this.collision(enemy,roomObjects);
            // consider Hero as far if there's a wall between them
            if(collision) enemy.distToHeroSq = Enemy.closeDistSquared + 1;
          }
          // checks if hero attacks or enemy attacks
          if(enemy.position.equals(this.hero.nextPosition)) {
            enemy.health -= this.hero.attack;
            if(enemy.health <= 0) {
              // Register points
              this.scoreManager.addRecord(enemy.type, enemy.points);
              // Remove dead enemy from scene and add its remains
              room.removeFromState(enemy);
              this.gui.removeImage(enemy);
              let deadEnemy = new Blood(enemy.position);
              room.changeState(deadEnemy);
              this.gui.addImage(deadEnemy, this.hero);
            } else {
              enemy.nextPosition = enemy.position;
            }
            this.hero.nextPosition = this.hero.position;
          } else if (enemy.nextPosition.equals(this.hero.nextPosition)){
            this.hero.health -= enemy.attack
            if(this.hero.health <= 0) this.scoreManager.endOfGame();
            this.hero.nextPosition = this.hero.position;
            this.statusBar.update();
          }
          enemy.position = enemy.nextPosition;
        }
        this.hero.position = this.hero.nextPosition;
        this.scoreManager.addRecord(this.hero.type, this.hero.points);
        this.gui.update();
      } else {
        throw new Error("You'll get a nosebleed if you collide again...")
      }
    }
  }

  collision(char, roomObjects) {
    let objectInRoom = this.objectInRoom(char, roomObjects);
    if(char === this.hero && objectInRoom instanceof Door) return false;
    if(char instanceof Enemy && objectInRoom instanceof Enemy) return true;
    if (!objectInRoom || !objectInRoom.collision) return false;
    return true;
  }
  objectInRoom(char, roomObjects) {
    let objectInRoom = roomObjects.find(
      (object) =>
        object.position.equals(char.nextPosition)
    );
    return objectInRoom;
  }

  outOfRange(charPosition) {
    if(charPosition.y > 9 || charPosition.y < 0 || charPosition.x > 9 || charPosition.x < 0) return true;
    return false;
  }
}

export default MovementController;
