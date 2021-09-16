import { ClientController } from "./Controllers/ClientController";
import { ServiceController } from "./Controllers/ServiceController";

export class Api {
  client = new ClientController();
  service = new ServiceController();
}

export default new Api();
