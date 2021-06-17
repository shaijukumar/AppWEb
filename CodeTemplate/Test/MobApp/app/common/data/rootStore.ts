import { createContext } from "react";
import { configure } from "mobx";
import UserStore from "./userStore";
import { NavigationStackScreenProps } from "react-navigation-stack";
import CatlogStore from "./catlogStore";
import ConfigStore from "./configStore";
import _Feature_Store from "../../screens/_Feature_/_Feature_Store";
import TestAppStore from '../../screens/_Feature_/TestAppStore';
//##RootImport##

configure({ enforceActions: "always" });

export interface myProps extends NavigationStackScreenProps {}

export class RootStore {
  userStore: UserStore;
  catlogStore: CatlogStore;
  configStore: ConfigStore;
  _FeatureObj_Store: _Feature_Store;
  testAppStore: TestAppStore;
	//##RootField##

  constructor() {
    this.userStore = new UserStore(this);
    this.catlogStore = new CatlogStore(this);
    this.configStore = new ConfigStore(this);
    this.configStore = new ConfigStore(this);
    this._FeatureObj_Store = new _Feature_Store(this);
    this.testAppStore = new TestAppStore(this);
		//##RootFieldConstructor##
  }
}

export const RootStoreContext = createContext(new RootStore());

