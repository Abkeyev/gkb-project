import React from "react";
import { Route, HashRouter, Switch, Redirect } from "react-router-dom";
import {
  Modal,
  Registration,
  RequestInner,
  PartnersNew,
  PartnersInner,
  MyOrganization,
  Sidebar,
  Partners,
  Contractors,
  ServiceInner,
  ContractorsInner,
  Profile,
  Request,
} from "./containers";
import { LoginPage } from "./components";
import PrivateRoute from "./PrivateRoute";
import { observer } from "mobx-react";
import NCALayer, { MethodName } from "./ncalayer/ncalayer";
import { extractKeyAlias, isNullOrEmpty } from "./ncalayer/helper";
import Response, { ValidationType } from "./ncalayer/response";
import AppState, { initAppState } from "./ncalayer/state";

const App = observer((props: any) => {
  const { main, request } = props;
  const ws = React.useRef<WebSocket>();
  const [state, setState] = React.useState<AppState>(initAppState());
  const [ready, setReady] = React.useState(false);
  const client = new NCALayer(ws.current!);

  React.useEffect(() => {
    ws.current = new WebSocket("wss://127.0.0.1:13579/");
    ws.current.onopen = (e: any) => {
      // tslint:disable-next-line
      console.log("connection opened");
      setReady(true);
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
      setReady(false);
    };

    return () => {
      ws.current!.close();
    };
  }, [setReady]);

  React.useEffect(() => {
    if (main.logged) {
      setState({ ...state, keyType: "SIGN" });
    }
  }, main.logged);

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

  return (
    <div className="app-root modal-open">
      <HashRouter>
        {main.isOpenModal && (
          <Modal
            main={main}
            setState={setState}
            state={state}
            request={request}
            client={client}
          />
        )}
        {main.logged && !main.isReg && (
          <Sidebar main={main} request={request} />
        )}
        <Switch>
          <Route
            path="/login"
            component={() =>
              main.logged ? (
                <Redirect to={{ pathname: "/" }} />
              ) : (
                <LoginPage
                  ready={ready}
                  setState={setState}
                  state={state}
                  client={client}
                  main={main}
                />
              )
            }
            exact
          />
          <PrivateRoute
            main={main}
            path="/"
            component={() =>
              true ? (
                <Registration main={main} request={request} />
              ) : main.getRole === "Agent" ? (
                <Partners request={request} />
              ) : (
                <Request request={request} />
              )
            }
            exact
          />
          <PrivateRoute
            main={main}
            path="/partner/:id"
            component={(props: any) => (
              <PartnersInner {...props} main={main} request={request} />
            )}
            exact
          />
          <PrivateRoute
            main={main}
            path="/request/:id"
            component={(props: any) => (
              <RequestInner {...props} main={main} request={request} />
            )}
            exact
          />
          <PrivateRoute
            main={main}
            path="/contractors"
            component={() => <Contractors request={request} />}
            exact
          />
          <PrivateRoute
            main={main}
            path="/contractors/:id"
            component={(props: any) => (
              <ContractorsInner {...props} main={main} request={request} />
            )}
            exact
          />
          <PrivateRoute
            main={main}
            path="/service/:id"
            component={(props: any) => (
              <ServiceInner {...props} main={main} request={request} />
            )}
            exact
          />
          <PrivateRoute
            main={main}
            path="/profile"
            component={() => <Profile main={main} request={request} />}
            exact
          />
          <PrivateRoute
            main={main}
            path="/organization"
            component={() => <MyOrganization main={main} request={request} />}
            exact
          />
          <PrivateRoute
            main={main}
            path="/request-new"
            component={() => <PartnersNew main={main} request={request} />}
            exact
          />
          <PrivateRoute
            main={main}
            path="/partner-new"
            component={() => <PartnersNew main={main} request={request} />}
            exact
          />
        </Switch>
      </HashRouter>
    </div>
  );
});

export default App;
