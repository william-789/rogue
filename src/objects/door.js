import ImageTile from "../game/imageTile.js";

class Door extends ImageTile {
  isEntranceway = false;
  open = false;
  keyRequired;
  nextDoor;
  nextRoom;
  constructor(position, doorId) {
    super(position);
    this.collision = true;
    this.doorId = doorId;
  }

  get image() {
    if(this.isEntranceway) {
      return "DoorWay.png";
    }
    if(this.open) {
      return "DoorOpen.png"
    }
    return "DoorClosed.png";
  }
}

export default Door;