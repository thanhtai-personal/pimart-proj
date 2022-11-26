import { makeObservable, observable } from "mobx";
import BaseStore from "./BaseStore";
import { getConstants } from "config";


class UserStore extends BaseStore {
  @observable public isLoadingSessionFromLocal = true;
  @observable public account: {
    walletAddress: string;
    signature: string;
  } | null = null;

  @observable public accountBalance = {};

  constructor(depsContainer: any) {
    super(depsContainer);
    makeObservable(this);
  }
}

export default UserStore;
