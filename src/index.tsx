import ReactDOM from "react-dom";
import "./styles";
import { AppContext, stores } from "./AppContext";
import { HashRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <HashRouter basename={process.env.PUBLIC_URL}>
    <AppContext.Provider value={stores}>
      <App />
    </AppContext.Provider>
  </HashRouter>,
  document.getElementById("root")
);
