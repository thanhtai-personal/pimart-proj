import UIStore from "stores/UIStore";
import UserStore from "./userStore";

class DepsContainer {
  public uiStore: UIStore;
  public userStore: UserStore;

  public constructor() {
    // Stores
    this.uiStore = new UIStore(this);
    this.userStore = new UserStore(this);
  }
}

export default DepsContainer;
