import axios from "axios";
import Cookies from "../utils/cookies";

let webConfigEnv = { SERVER_URL: "" };

export class Server {
  constructor() {
    if (typeof window !== "undefined") webConfigEnv = (window as any).env;
  }

  public request(config: any) {
    return axios.request(config);
  }
  public get(url: string, config = {} as any): any {
    config = config || {};
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${Cookies.get("access")}`;
    config.baseURL = config.baseURL || webConfigEnv.SERVER_URL;
    return axios.get(url, config).then((r) => r?.data);
  }
  public delete(url: string, config = {} as any): any {
    config = config || {};
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${Cookies.get("access")}`;
    config.baseURL = config.baseURL || webConfigEnv.SERVER_URL;
    return axios.delete(url, config).then((r) => r.data);
  }
  public head(url: string, config = {} as any): any {
    config = config || {};
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${Cookies.get("access")}`;
    config.baseURL = webConfigEnv.SERVER_URL;
    return axios.head(url, config);
  }
  public token(url: string, data: any, config = {} as any) {
    config.baseURL = webConfigEnv.SERVER_URL;
    return axios.post(url, data, config).then((r) => r.data);
  }

  public post(url: string, data: any, config = {} as any): any {
    config = config || {};
    config.headers = config.headers || {};
    console.log(Cookies.get("access"));
    console.log(!!Cookies.get("access"));
    if (!!Cookies.get("access"))
      config.headers.Authorization = `Bearer ${Cookies.get("access")}`;
    config.baseURL = config.baseURL || webConfigEnv.SERVER_URL;
    return axios.post(url, data, config).then((r) => r.data);
  }
  public put(url: string, data: any, config = {} as any): any {
    config = config || {};
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${Cookies.get("access")}`;
    config.baseURL = webConfigEnv.SERVER_URL;
    return axios.put(url, data, config).then((r) => r.data);
  }
  public patch(url: string, data: any, config = {} as any): any {
    config = config || {};
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${Cookies.get("access")}`;
    config.baseURL = webConfigEnv.SERVER_URL;
    return axios.patch(url, data, config).then((r) => r.data);
  }
}
export const server = new Server();
