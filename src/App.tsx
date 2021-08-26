import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Ecp from "./components/Ecp";
import Modal from "./components/Modal";
import Registration from "./components/Registration";
import Manager from "./components/Manager";
import Request from "./components/Request";
import RequestInner from "./components/RequestInner";
<<<<<<< Updated upstream
import PartnersInner from "./components/PartnersInner";
=======
import MyOrganization from "./components/MyOrganization";
>>>>>>> Stashed changes
import Sidebar from "./components/Sidebar";
import "./App.css";

import AppState, { initAppState, CheckState } from "./ncalayer/state";
import NCALayer, { MethodName } from "./ncalayer/ncalayer";
import { extractKeyAlias, checkInputs, isNullOrEmpty } from "./ncalayer/helper";
import Response, { ValidationType } from "./ncalayer/response";
import Partners from "./components/Pertners";

function App() {
  // const [logged, setLogged] = React.useState(false);
  // const [isOpenModal, setIsOpenModal] = React.useState(false);
  // const [modalType, setModalType] = React.useState<number>(0);
  // const [modalManager, setModalManager] = React.useState(false);
  // const [decline, setDecline] = React.useState(false);
  // const [declineReason, setDeclineReason] = React.useState("");
  // const [tab, setTab] = React.useState(0);
  // const [step, setStep] = React.useState(0);
  // const [agreement, setAgreement] = React.useState(false);
  // const [notTypical, setNotTypical] = React.useState(false);

  const ws = React.useRef<WebSocket>();
  const [state, setState] = React.useState<AppState>(initAppState());

  React.useEffect(() => {
    ws.current = new WebSocket("wss://127.0.0.1:13579/");

    ws.current.onopen = (e: any) => {
      // tslint:disable-next-line
      console.log("connection opened");
      setState({ ...state, ready: true });
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
      setState({ ...state, ready: false });
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

    const getNotBeforeCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, notBefore: resp.GetResult() });
        return;
      }

      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
      );
    };

    const getNotAfterCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, notAfter: resp.GetResult() });
        return;
      }
      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
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

    const getIssuerDNCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, issuerDN: resp.GetResult() });
        return;
      }

      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
      );
    };

    const getRdnByOidCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, rdn: resp.GetResult() });
        return;
      }

      resp.HandleError(
        ValidationType.Password &&
          ValidationType.PasswordAttemps &&
          ValidationType.RDN
      );
    };

    const signPlainDataCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, plainDataSigned: resp.GetResult() });
        return;
      }

      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
      );
    };

    const verifyPlainDataCallback = (resp: Response) => {
      if (resp.IsOK()) {
        if (!resp.GetResult()) {
          setState({
            ...state,
            plainDataValid: CheckState.Failed,
            plainDataMessage: "Неправильная подпись",
          });
          return;
        }

        setState({
          ...state,
          plainDataValid: CheckState.OK,
          plainDataMessage: "Валидная подпись",
        });
        return;
      }

      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
      );
    };

    const createCMSSignatureCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, cmsSignatureSigned: resp.GetResult() });
        return;
      }

      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
      );
    };

    const verifyCMSSignatureCallback = (resp: Response) => {
      if (resp.IsOK()) {
        if (!resp.GetResult()) {
          setState({
            ...state,
            cmsSignatureValid: CheckState.Failed,
            cmsSignatureMessage: "Неправильная подпись",
          });
          return;
        }

        setState({
          ...state,
          cmsSignatureValid: CheckState.OK,
          cmsSignatureMessage: "Валидная подпись",
        });
        return;
      }

      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
      );
    };

    const createCMSSignatureFromFileCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, cmsFileSignatureSigned: resp.GetResult() });
        return;
      }

      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
      );
    };

    const verifyCMSSignatureFromFileCallback = (resp: Response) => {
      if (resp.IsOK()) {
        if (!resp.GetResult()) {
          setState({
            ...state,
            cmsFileSignatureValid: CheckState.Failed,
            cmsFileSignatureMessage: "Неправильная подпись",
          });
          return;
        }

        setState({
          ...state,
          cmsFileSignatureValid: CheckState.OK,
          cmsFileSignatureMessage: "Валидная подпись",
        });
        return;
      }

      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
      );
    };

    const signXmlCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, xmlSigned: resp.GetResult() });
        return;
      }

      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
      );
    };

    const verifyXmlCallback = (resp: Response) => {
      if (resp.IsOK()) {
        if (!resp.GetResult()) {
          setState({
            ...state,
            xmlValid: CheckState.Failed,
            xmlMessage: "Неправильная подпись",
          });
          return;
        }

        setState({
          ...state,
          xmlValid: CheckState.OK,
          xmlMessage: "Валидная подпись",
        });
        return;
      }

      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
      );
    };

    const signXmlByElementIdCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, xmlNodeSigned: resp.GetResult() });
        return;
      }

      resp.HandleError(
        ValidationType.Password && ValidationType.PasswordAttemps
      );
    };

    const verifyXmlByElementIdCallback = (resp: Response) => {
      if (resp.IsOK()) {
        if (!resp.GetResult()) {
          setState({
            ...state,
            xmlNodeValid: CheckState.Failed,
            xmlNodeMessage: "Неправильная подпись",
          });
          return;
        }

        setState({
          ...state,
          xmlNodeValid: CheckState.OK,
          xmlNodeMessage: "Валидная подпись",
        });
        return;
      }

      resp.HandleError(
        ValidationType.Password &&
          ValidationType.PasswordAttemps &&
          ValidationType.Signature
      );
    };

    const getHashCallback = (resp: Response) => {
      if (resp.IsOK()) {
        setState({ ...state, hashed: resp.GetResult() });
        return;
      }

      resp.HandleError(ValidationType.Common);
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
          case MethodName.GetNotBefore:
            getNotBeforeCallback(resp);
            break;
          case MethodName.GetNotAfter:
            getNotAfterCallback(resp);
            break;
          case MethodName.GetSubjectDN:
            getSubjectDNCallback(resp);
            break;
          case MethodName.GetIssuerDN:
            getIssuerDNCallback(resp);
            break;
          case MethodName.GetRdnByOid:
            getRdnByOidCallback(resp);
            break;
          case MethodName.SignPlainData:
            signPlainDataCallback(resp);
            break;
          case MethodName.VerifyPlainData:
            verifyPlainDataCallback(resp);
            break;
          case MethodName.CreateCMSSignature:
            createCMSSignatureCallback(resp);
            break;
          case MethodName.VerifyCMSSignature:
            verifyCMSSignatureCallback(resp);
            break;
          case MethodName.CreateCMSSignatureFromFile:
            createCMSSignatureFromFileCallback(resp);
            break;
          case MethodName.VerifyCMSSignatureFromFile:
            verifyCMSSignatureFromFileCallback(resp);
            break;
          case MethodName.SignXml:
            signXmlCallback(resp);
            break;
          case MethodName.VerifyXml:
            verifyXmlCallback(resp);
            break;
          case MethodName.SignXmlByElementId:
            signXmlByElementIdCallback(resp);
            break;
          case MethodName.VerifyXmlByElementId:
            verifyXmlByElementIdCallback(resp);
            break;
          case MethodName.GetHash:
            getHashCallback(resp);
            break;
          default:
            const payload = JSON.parse(e.data);
            if (payload.result.version) {
              setState({ ...state, version: payload.result.version });
            }
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
            <Route path="/organization" component={() => <MyOrganization />} exact />
            <Route
              path="/orders"
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
              path="/orders/title"
              component={() => (
                <RequestInner state={state} setState={setState} />
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
              <Ecp
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
