import { observable, action, runInAction } from "mobx";

import agent from "../../common/agent";
import { RootStore } from "../../common/rootStore";
import { _Feature_, I_Feature_ } from "./_Feature_";

const I_Feature_API = "/TestApp";
const DBFun = {
  list: (): Promise<I_Feature_[]> => agent.requests.get(I_Feature_API),
  details: (Id: string) => agent.requests.get(`${I_Feature_API}/${Id}`),
  create: (item: I_Feature_) => agent.requests.post(I_Feature_API, item),
  update: (item: I_Feature_) =>
    agent.requests.put(`${I_Feature_API}/${item.Id}`, item),
  delete: (Id: string) => agent.requests.del(`${I_Feature_API}/${Id}`),
};

export default class _Feature_Store {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable submitting = false;
  @observable loadingInitial = false;
  @observable item: _Feature_ = new _Feature_();
  @observable itemList: I_Feature_[] = [];

  @action loadItem = async (id: string) => {
    this.loadingInitial = true;
    try {
      let catlog = await DBFun.details(id);
      runInAction("getting item", () => {
        this.loadingInitial = false;
        this.item = catlog;
      });
      return catlog;
    } catch (error) {
      console.log(error);
      this.loadingInitial = false;
    }
  };

  @action getList = async () => {
    this.loadingInitial = true;
    try {
      let list: I_Feature_[] = [];
      list = await DBFun.list();
      runInAction("loading items", () => {
        this.itemList = list;
        this.loadingInitial = false;
      });
      return list;
    } catch (error) {
      runInAction("loading items error, ", () => {
        this.submitting = false;
        console.log(error);
        throw error;
      });
    }
  };

  @action createItem = async (_FeatureObj_: I_Feature_) => {
    this.submitting = true;
    try {
      let itm = await DBFun.create(_FeatureObj_);
      runInAction("create item", () => {
        this.item = itm;
        this.submitting = false;
      });
      return itm;
    } catch (error) {
      console.log(error);
      runInAction("create item error", () => {
        this.submitting = false;
        console.log(error);
      });
    }
  };

  @action editItem = async (_FeatureObj_: I_Feature_) => {
    debugger;
    this.submitting = true;
    try {
      let itm = await DBFun.update(_FeatureObj_);
      runInAction("editing item", () => {
        this.submitting = false;
      });
      return itm;
    } catch (error) {
      runInAction("edit item error", () => {
        this.submitting = false;
      });
      console.log(error);
      throw error;
    }
  };

  @action deleteItem = async (id: string) => {
    this.submitting = true;
    try {
      await DBFun.delete(id);
      runInAction("deleting item", () => {
        this.submitting = false;
      });
    } catch (error) {
      runInAction("Item delete error, ", () => {
        this.submitting = false;
      });
      console.log(error);
      throw error;
    }
  };
}
