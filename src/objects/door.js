import ImageTile from "../game/imageTile.js";

class Door extends ImageTile {
  isEntranceway = false;
  open = false;
  constructor(position) {
    super(position);
    this.collision = true;
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