import ImageTile from "../game/imageTile.js";

class Door extends ImageTile {
  isEntranceway = false;
  open = true;
  keyRequired;
  nextDoor;
  nextRoom;
  isHole = false;
  constructor(position, doorId) {
    super(position);
    this.collision = true;
    this.doorId = doorId;
  }

  get image() {
    if(this.isHole) {
      return "Hole.png";
    }
    if(this.isEntranceway) {
      return "DoorWay.png";
    }
    if(this.open) {
      return "DoorOpen.png"
    }
    return "DoorClosed.png";
  }

  toJSON() {
    return {
      position: this.position,
      isEntranceway: this.isEntranceway,
      open: this.open,
      keyRequired: this.keyRequired,
      nextDoor: this.nextDoor,
      nextRoom: this.nextRoom,
      doorId: this.doorId,
      isHole: this.isHole,
      type: "Door"
    }
  }
}

export default Door;