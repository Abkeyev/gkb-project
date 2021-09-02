import ReactDOM from "react-dom";
import "./styles";
import { AppContext, stores } from "./AppContext";
import { HashRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <AppContext.Provider value={stores}>
    <HashRouter>
      <App />
    </HashRouter>
  </AppContext.Provider>,
  document.getElementById("root")
);
