import React from "react";
import { Route, Router, Switch } from "react-router-dom";

import {
  // Main,
  // Login,
  // LoginEcp,
  Modal,
  Registration,
  Manager,
  Request,
  RequestInner,
  PartnersInner,
  MyOrganization,
  MyOrganizationInner,
  Sidebar,
  Partners,
  CreateRequest,
  MyProfile,
  ManagerOrganization,
  ManagerOrganizationInner,
} from "./containers";
import { LoginPage, RequestPage } from "./components";

import AppState, { initAppState } from "./ncalayer/state";
import NCALayer, { MethodName } from "./ncalayer/ncalayer";
import { extractKeyAlias, isNullOrEmpty } from "./ncalayer/helper";
import Response, { ValidationType } from "./ncalayer/response";
import { AppContext } from "./AppContext";
import PrivateRoute from "./PrivateRoute";
import history from "./history";
import { observer } from "mobx-react";

const App = observer(() => {
  const ws = React.useRef<WebSocket>();
  const [state, setState] = React.useState<AppState>(initAppState());
  const [ready, setReady] = React.useState(false);
  const { mainStore } = React.useContext(AppContext);

  React.useEffect(() => {
    ws.current = new WebSocket("wss://127.0.0.1:13579/");

    ws.current.onopen = (e: any) => {
      // tslint:disable-next-line
      console.log("connection opened");
      !ready && setReady(true);
    };

    ws.current.onclose = (e: any) => {
      if (e.wasClean) {
        // tslint:disable-next-line
        console.log("connection closed");
      } else {
        // tslint:disable-next-line
        console.log(
          "connection error: [code]=" + e.code + ", [reason]=" + e.reason
        );
      }
      ready && setReady(false);
    };

    return () => {
      ws.current!.close();
    };
  }, [state.ready]);

  // set onmessage
  React.useEffect(() => {
    const browseKeyStoreCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, path: resp.GetResult() });
      }
    };

    const showFileChooserCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, cmsFilePath: resp.GetResult() });
      }
    };

    const getKeysCallback = (resp: Response) => {
      if (resp.IsOK()) {
        const k: string[] = [];
        resp
          .GetResult()
          .split("\n")
          .forEach((el) => {
            if (isNullOrEmpty(el)) {
              return;
            }
            k.push(el);
          });
        setState({
          ...state,
          keys: k,
          keyAlias: k.length > 0 ? extractKeyAlias(k[0]) : "",
          method: client.GetSubjectDN(
            state.alias,
            state.path,
            k.length > 0 ? extractKeyAlias(k[0]) : "",
            state.password
          ),
        });
        return;
      }
      resp.HandleError(
        ValidationType.Password &&
          ValidationType.PasswordAttemps &&
          ValidationType.KeyType
      );
    };

    const getSubjectDNCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, subjectDN: resp.GetResult() });
        return;
      }

      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
      );
    };

    ws.current!.onmessage = (e: any) => {
      if (e.data === "--heartbeat--") {
        return;
      }

      const data = JSON.parse(e.data);
      if (data !== null) {
        const resp = new Response(
          data.result,
          data.secondResult,
          data.errorCode
        );

        switch (state.method) {
          case MethodName.BrowseKeyStore:
            browseKeyStoreCallback(resp);
            break;
          case MethodName.ShowFileChooser:
            showFileChooserCallback(resp);
            break;
          case MethodName.GetKeys:
            getKeysCallback(resp);
            break;
          case MethodName.GetSubjectDN:
            getSubjectDNCallback(resp);
            break;
          default:
            break;
        }
      }
    };
  }, [state, setState]);

  // NCALayer client
  const client = new NCALayer(ws.current!);

  return (
    <div className="app-root modal-open">
      <Router history={history}>
        {mainStore.isOpenModal && <Modal />}
        {mainStore.logged && <Sidebar />}
        <Switch>
          <Route
            path="/login"
            component={() => (
              <LoginPage
                state={state}
                setState={setState}
                client={client}
                store={mainStore}
                ready={ready}
              />
            )}
            exact
          />
          <Route
            path="/registration"
            component={() => <Registration />}
            exact
          />
          <PrivateRoute path="/" component={() => <Manager />} exact />
          <PrivateRoute
            path="/organization"
            component={() => <MyOrganization />}
            exact
          />
          <PrivateRoute
            path="/request"
            component={() => <RequestPage />}
            exact
          />
          <PrivateRoute path="/create-request" component={() => <CreateRequest />} exact />
          <PrivateRoute path="/profile" component={() => <MyProfile />} exact />
          <PrivateRoute path="/parthers-page" component={() => <ManagerOrganization />} exact />
          <PrivateRoute path="/partners" component={() => <Partners />} exact />
          <PrivateRoute
            path="/partners/title"
            component={() => <PartnersInner />}
            exact
          />
          <PrivateRoute
            path="/request/title"
            component={() => <RequestInner />}
            exact
          />
          <PrivateRoute
            path="/parthers-page/title"
            component={() => <ManagerOrganizationInner />}
            exact
          />
        </Switch>
      </Router>
    </div>
  );
});

export default App;
