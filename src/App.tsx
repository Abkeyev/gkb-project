import React from "react";
import { Route, Switch } from "react-router-dom";

import {
  Main,
  Login,
  LoginEcp,
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
} from "./containers";

import AppState, { initAppState, CheckState } from "./ncalayer/state";
import NCALayer, { MethodName } from "./ncalayer/ncalayer";
import { extractKeyAlias, checkInputs, isNullOrEmpty } from "./ncalayer/helper";
import Response, { ValidationType } from "./ncalayer/response";

function App() {
  const ws = React.useRef<WebSocket>();
  const [state, setState] = React.useState<AppState>(initAppState());

  React.useEffect(() => {
    ws.current = new WebSocket("wss://127.0.0.1:13579/");

    ws.current.onopen = (e: any) => {
      // tslint:disable-next-line
      console.log("connection opened");
      !state.ready && setState({ ...state, ready: true });
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
      state.ready && setState({ ...state, ready: false });
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
      {/* При открытии модалки добавляется класс modal-open */}
      {state.isOpenModal && <Modal state={state} setState={setState} />}
      {state.logged ? (
        <>
          <Sidebar />
          <Switch>
            <Route path="/" component={() => <Manager />} exact />
            <Route
              path="/organization"
              component={() => <MyOrganization state={state} setState={setState} />}
              exact
            />
            <Route
              path="/request"
              component={() => <Request state={state} setState={setState} />}
              exact
            />
            <Route
              path="/partners"
              component={() => <Partners state={state} setState={setState} />}
              exact
            />
            <Route
              path="/partners/title"
              component={() => (
                <PartnersInner state={state} setState={setState} />
              )}
              exact
            />
            <Route
              path="/request/title"
              component={() => (
                <RequestInner state={state} setState={setState} />
              )}
              exact
            />
            <Route
              path="/organization/title"
              component={() => (
                <MyOrganizationInner state={state} setState={setState} />
              )}
              exact
            />
          </Switch>
        </>
      ) : (
        <Switch>
          <Route path="/" component={() => <Main />} exact />
          <Route
            path="/ecp"
            component={() => (
              <LoginEcp
                client={client}
                state={state}
                setState={setState}
                ready={state.ready}
              />
            )}
            exact
          />
          <Route
            path="/login"
            component={() => <Login state={state} setState={setState} />}
            exact
          />
          <Route
            path="/registration"
            component={() => <Registration />}
            exact
          />
        </Switch>
      )}
    </div>
  );
}

export default App;
