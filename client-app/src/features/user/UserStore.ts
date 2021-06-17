
import { action, makeObservable, observable } from "mobx";
import { createContext } from "react";
import agent from "../../app/api/agent";
import { IUserFormValues, User } from "./User";
import { history } from '../..';

export class UserStoreImpl {
       
    user = new User();
    userList: User[] = [];
    loading = false;
    loadingUser = true;

    constructor() {
        makeObservable(this, {
            user: observable,
            loadingUser: observable,
            getCurrentUser: action,
            setCurrentUser: action,
            userLogout: action,
            userLogin: action
        });        
    }
    
    setCurrentUser(user:User){
        this.user = user;
    }
    
    getCurrentUser(){
        return new Promise((resolve, reject) => {

            if(!window.localStorage.getItem("WayoozToken")){
                history.push('/login');
                reject('empty token');            
            }

            agent.User.current().then( (user) => {
                this.user = user;
                this.loadingUser = false;
                resolve(user);
            })
            .catch( (err) => {            
                history.push('/login');
                reject(err);
            });  
        });
    }
    
    userLogin(user: IUserFormValues){        
        this.loadingUser = true;
        agent.User.login(user).then( (newUser) => {
            window.localStorage.setItem('WayoozToken', newUser.Token);
            this.user = newUser;
            this.loadingUser = false;            
            debugger;
            alert( newUser.Token ) ;
            history.push('/');       
        });
    }

    userLogout(){
        this.user = new User();        
        history.push('/login');
    }

    @action getList = async () => {        
        this.loading = true;
        try {          
          this.userList = await agent.User.list();              
          this.loading = false;    
          return  this.userList;                 
        } catch (error) {}

      }
}

export const UserStoreContext = createContext(new UserStoreImpl());