import ReactDOM from "react-dom";
import "./styles";
import { AppContext, stores } from "./AppContext";
import App from "./App";

ReactDOM.render(
  <AppContext.Provider value={stores}>
    <App />
  </AppContext.Provider>,
  document.getElementById("root")
);
