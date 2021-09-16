import React from "react";
import ReactDOM from "react-dom";
import "./styles";
import MainStore from "./stores/MainStore";
import RequestStore from "./stores/RequestStore";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App main={MainStore} request={RequestStore} />
  </React.StrictMode>,
  document.getElementById("root")
);
