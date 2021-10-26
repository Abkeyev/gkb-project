import axios from "axios";
import Cookies from "../utils/cookies";

export class Server {
  public request(config: any) {
    return axios.request(config);
  }
  public get(url: string, config = {} as any): any {
    config = config || {};
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${Cookies.get("access")}`;
    config.baseURL = config.baseURL;
    return axios
      .get(url, config)
      .then((r) => r?.data)
      .catch((error) => {
        console.error(error);
        if (error && error.response && error.response.status === 401) {
          Cookies.remove("refresh");
          Cookies.remove("access");
          Cookies.remove("clientData");
          Cookies.remove("role");
          Cookies.remove("isReg");
          Cookies.remove("clientExist");
          window.location.replace("/");
        }
      });
  }
  public delete(url: string, config = {} as any): any {
    config = config || {};
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${Cookies.get("access")}`;
    config.baseURL = config.baseURL;
    return axios.delete(url, config).then((r) => r.data);
  }
  public head(url: string, config = {} as any): any {
    config = config || {};
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${Cookies.get("access")}`;
    config.baseURL = config.baseURL;
    return axios.head(url, config);
  }
  public token(url: string, data: any, config = {} as any) {
    config.baseURL = config.baseURL;
    return axios.post(url, data, config).then((r) => r.data);
  }

  public post(url: string, data: any, config = {} as any): any {
    config = config || {};
    config.headers = config.headers || {};
    if (!!Cookies.get("access"))
      config.headers.Authorization = `Bearer ${Cookies.get("access")}`;
    config.baseURL = config.baseURL;
    return axios
      .post(url, data, config)
      .then((r) => r.data)
      .catch((error) => {
        if (error && error.response && error.response.status === 401) {
          Cookies.remove("refresh");
          Cookies.remove("access");
          Cookies.remove("clientData");
          Cookies.remove("role");
          Cookies.remove("isReg");
          Cookies.remove("clientExist");
          window.location.replace("/");
        }
      });
  }
  public put(url: string, data: any, config = {} as any): any {
    config = config || {};
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${Cookies.get("access")}`;
    config.baseURL = config.baseURL;
    return axios
      .put(url, data, config)
      .then((r) => r.data)
      .catch((error) => {
        if (error && error.response && error.response.status === 401) {
          Cookies.remove("refresh");
          Cookies.remove("access");
          Cookies.remove("clientData");
          Cookies.remove("role");
          Cookies.remove("isReg");
          Cookies.remove("clientExist");
          window.location.replace("/");
        }
      });
  }
  public patch(url: string, data: any, config = {} as any): any {
    config = config || {};
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${Cookies.get("access")}`;
    config.baseURL = config.baseURL;
    return axios.patch(url, data, config).then((r) => r.data);
  }
}
export const server = new Server();
