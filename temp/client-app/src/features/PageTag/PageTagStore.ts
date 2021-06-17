import { observable, action, runInAction } from "mobx";

import agent from "../../app/api/agent";
import { RootStore } from "../../app/store/rootStore";
import { PageTag, IPageTag } from "./PageTag";

const IPageTagAPI = "/PageTag";
const DBFun = {
  list: (): Promise<IPageTag[]> => agent.requests.get(IPageTagAPI),
  details: (Id: string) => agent.requests.get(`${IPageTagAPI}/${Id}`),
  create: (item: IPageTag) => agent.requests.post(IPageTagAPI, item),
  update: (item: IPageTag) =>
    agent.requests.put(`${IPageTagAPI}/${item.Id}`, item),
  delete: (Id: string) => agent.requests.del(`${IPageTagAPI}/${Id}`),
};

export default class PageTagStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable submitting = false;
  @observable loadingInitial = false;
  @observable item: PageTag = new PageTag();
  @observable itemList: IPageTag[] = [];

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
      let list: IPageTag[] = [];
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

  @action createItem = async (pageTag: IPageTag) => {
    this.submitting = true;
    try {
      let itm = await DBFun.create(pageTag);
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

  @action editItem = async (pageTag: IPageTag) => {
    this.submitting = true;
    try {
      //let itm = await DBFun.update(pageTag);
      let itm = null;
      if (pageTag.Id) {
        itm = await DBFun.update(pageTag);
      } else {
        itm = await DBFun.create(pageTag);
      }

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

