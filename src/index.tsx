import React from "react";
import ReactDOM from "react-dom";
import "./styles";
import MainStore from "./stores/MainStore";
import RequestStore from "./stores/RequestStore";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App main={MainStore} request={RequestStore} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
