import { observable, action, runInAction } from "mobx";

import { RootStore } from "../../common/data/rootStore";
import agent from "../../common/data/agent";
import { TestApp, ITestApp } from "./TestApp";

const ITestAppAPI = "/TestApp";
const DBFun = {
  list: (): Promise<ITestApp[]> => agent.requests.get(ITestAppAPI),
  details: (Id: string) => agent.requests.get(`${ITestAppAPI}/${Id}`),
  create: (item: ITestApp) => agent.requests.post(ITestAppAPI, item),
  update: (item: ITestApp) =>
    agent.requests.put(`${ITestAppAPI}/${item.Id}`, item),
  delete: (Id: string) => agent.requests.del(`${ITestAppAPI}/${Id}`),
};

export default class TestAppStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable submitting = false;
  @observable loadingInitial = false;
  @observable item: TestApp = new TestApp();
  @observable itemList: ITestApp[] = [];

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
      let list: ITestApp[] = [];
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

  @action createItem = async (testApp: ITestApp) => {
    this.submitting = true;
    try {
      let itm = await DBFun.create(testApp);
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

  @action editItem = async (testApp: ITestApp) => {
    debugger;
    this.submitting = true;
    try {
      let itm = await DBFun.update(testApp);
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

