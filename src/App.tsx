import React from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/Main";
import Modal from "./components/Modal";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Manager from "./components/Manager";
import Request from "./components/Request";
import RequestInner from "./components/RequestInner";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  const [logged, setLogged] = React.useState(false);
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [modalType, setModalType] = React.useState<number>(0);
  const [modalManager, setModalManager] = React.useState(false);
  const [decline, setDecline] = React.useState(false);
  const [declineReason, setDeclineReason] = React.useState("");
  const [tab, setTab] = React.useState(0);
  const [step, setStep] = React.useState(0);

  return (
    <div className="app-root modal-open">
      {/* При открытии модалки добавляется класс modal-open */}
      {isOpenModal && (
        <Modal
          setIsOpenModal={setIsOpenModal}
          setModalManager={setModalManager}
          modalType={modalType}
          declineReason={declineReason}
          setDeclineReason={setDeclineReason}
          setDecline={setDecline}
          setStep={setStep}
        />
      )}
      <Router>
        {logged ? (
          <>
            <Sidebar />
            <Switch>
              <Route path="/" component={() => <Manager />} exact />
              <Route
                path="/orders"
                component={() => <Request tab={tab} setTab={setTab} />}
                exact
              />
              <Route
                path="/orders/title"
                component={() => (
                  <RequestInner
                    setIsOpenModal={setIsOpenModal}
                    setModalType={setModalType}
                    modalManager={modalManager}
                    decline={decline}
                    declineReason={declineReason}
                    setDecline={setDecline}
                    setDeclineReason={setDeclineReason}
                    setTab={setTab}
                    step={step}
                    setStep={setStep}
                  />
                )}
                exact
              />
            </Switch>
          </>
        ) : (
          <Switch>
            <Route path="/" component={() => <Main />} exact />
            <Route
              path="/login"
              component={() => <Login setLogged={setLogged} />}
              exact
            />
            <Route
              path="/registration"
              component={() => <Registration />}
              exact
            />
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
