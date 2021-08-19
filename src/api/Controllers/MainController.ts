import { server } from "../axios";
export const baseURL = "http://185.113.134.229:8080/api";

export class MainController {
  async getMenu(): Promise<any> {
    return server.get(`/content/nav`, {
      baseURL
    });
  }
}
