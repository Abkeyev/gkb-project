import * as React from "react";
import { MainStore, RequestStore } from "./stores";

export function createStores() {
  return { mainStore: new MainStore(), requestStore: new RequestStore() };
}

export const stores = createStores();

export const AppContext = React.createContext(stores);
