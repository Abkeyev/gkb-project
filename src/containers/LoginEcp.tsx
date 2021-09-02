import React from "react";
import { AppContext } from "../AppContext";
import api from "../api/Api";
import { extractKeyAlias, checkInputs } from "../ncalayer/helper";
import NCALayer from "../ncalayer/ncalayer";

interface LoginProps {
  state: any;
  setState: any;
  client: NCALayer;
  ready: boolean;
}

const LoginEcp = (props: LoginProps) => {
  const { state, setState, client, ready } = props;
  const [open, setOpen] = React.useState(false);
  const [key, setKey] = React.useState("");
  const { mainStore } = React.useContext(AppContext);

  const handleKeyAliasChange = (key: string) => {
    console.log(state.keyAlias);
    setState({ ...state, keyAlias: extractKeyAlias(key) });
  };

  const browseKeys = () => {
    setState({
      ...state,
      method: client.BrowseKeyStore(state.alias, "P12", state.path),
    });
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, password: e.target.value });
  };

  const handleKeyAliasClick = () => {
    const ok = checkInputs({
      path: state.path,
      alias: state.alias,
      password: state.password,
    });
    if (ok) {
      setState({
        ...state,
        method: client.GetKeys(
          state.alias,
          state.path,
          state.password,
          state.keyType
        ),
      });
    }
  };

  const getSubstring = (text: string, string: string) => {
    const start = text.indexOf(string) + string.length;
    return text.substring(start, text.indexOf(",", start));
  };

  const login = () => {
    const subjectDN = state.subjectDN;
    api.client
      .authEcp({
        bin: getSubstring(subjectDN, "OU="),
        full_name: getSubstring(subjectDN, "O="),
      })
      .then((res) => {})
      .catch((err) => {
        console.error(err);
        setState({});
      });
  };
  return (
    <div className="col-md-4 offset-md-4">
      <form>
        <div className="back-breadcrumbs">
          <div onClick={() => mainStore.setLoginState("")} className="back">
            <i className="azla arrow-left-icon"></i> Назад
          </div>
        </div>
        <div className="special-card" onClick={() => open && setOpen(false)}>
          <h1 className="title-main">Вход по ЭПЦ</h1>
          <div className="login-input">
            <div className="form-group">
              <label>Файл</label>
              <button className="form-control" onClick={() => browseKeys()}>
                Выберите ключ
              </button>
            </div>
            <div className={`form-group ${!ready ? "is-invalid" : ""}`}>
              <label>Пароль</label>
              <input
                className="form-control"
                type="name"
                value={state.password}
                ref={(input) => {
                  input !== null && input.focus();
                }}
                onChange={handlePasswordChange}
                placeholder="Введите пароль для хранилища"
              />
              {!ready && (
                <div className="invalid-feedback">Ошибка при подключении</div>
              )}
            </div>
            <button
              className="button btn-primary mb-16"
              onClick={() => handleKeyAliasClick()}
            >
              Загрузить ключи
            </button>
            {console.log(props.state)}
            {props.state.keys.length > 0 &&
              props.state.keys[0] &&
              props.state.keys[0] !== "" && (
                <div className="form-multiselect mb-0">
                  <div
                    className={`multi js-multi-buttons ${open ? "open" : ""}`}
                    onClick={() => setOpen(!open)}
                  >
                    {/* При наведении на Input появляется класс open */}
                    <div className="input-wrapper">
                      <input
                        className="multi-input azla form-icon chevron-down-icon"
                        type="text"
                        placeholder="Список ключей"
                        value={key}
                      />
                      <label className="label">Ключи</label>
                    </div>
                    <div className="multi-menu">
                      <div className="multi-option option-current">
                        {props.state.keys.map((v: any, i: number) => {
                          return (
                            <div className="multi-list">
                              <span
                                className="multi-option-select"
                                onClick={() => {
                                  console.log(v);
                                  setKey(v);
                                  handleKeyAliasChange(v);
                                }}
                              >
                                {v}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <button
                    className="button btn-primary mt-16"
                    onClick={() => handleKeyAliasClick()}
                  >
                    Войти
                  </button>
                </div>
              )}
          </div>
        </div>
      </form>
    </div>
  );
};
export default LoginEcp;
