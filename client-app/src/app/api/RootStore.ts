import { createContext } from "react";
import { configure, makeAutoObservable } from "mobx";


//##RootImport##

configure({ enforceActions: "always" });

export class RootStore {
  //toDoStore: ToDoStore;  
 

  //##RootField##

  constructor() {
   // this.toDoStore = new ToDoStore(this);   
    
   
    //##RootFieldConstructor##
  }
}

export const RootStoreContext = createContext(new RootStore());
