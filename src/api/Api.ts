import axios from "axios";
import moment from "moment";
import { MainController } from "./Controllers/MainController";

export class Api {
  main = new MainController();
}

export default new Api();
