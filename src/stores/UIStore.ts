import { action, makeObservable, observable } from "mobx";
import BaseStore from "./BaseStore";

class UIStore extends BaseStore {
  @observable public isGlobalLoading = false;
  @observable public isShowDrawer = false;
  @observable public isConnectedMetamask = false;
  @observable public triggerOpenLogin = 1;
  @observable public loginModal = {
    isShow: false,
  };
  @observable public lastPricesToken = {};

  constructor(depsContainer: any) {
    super(depsContainer);
    makeObservable(this);
  }

  @action public toggleDrawer = async (value: boolean) => {
    this.isShowDrawer = value;
  };
}

export default UIStore;
