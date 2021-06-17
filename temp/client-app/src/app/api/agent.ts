import axios, { AxiosResponse } from "axios";
import { IUser, IUserFormValues } from "../../features/user/User";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(
  
    (config) => {
      //debugger;
      const token = window.localStorage.getItem("WayoozToken");
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

const responseBody = (response: AxiosResponse) =>  response.data;

const sleep = (ms: number) => (response: AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

//debugger;
const requests = {
 
    get: (url: string) => axios.get(url).then(sleep(100)).then(responseBody) ,
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(100)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(100)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(100)).then(responseBody) 
};

const User = {
  current: (): Promise<IUser> => requests.get("/user"),
  login: (user: IUserFormValues): Promise<IUser> =>
      requests.post(`/user/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
      requests.post(`/user/register`, user),
};

export default {
    requests,
    User
  };