import React from "react";
import NCALayer from "../ncalayer/ncalayer";
import { checkInputs, extractKeyAlias } from "../ncalayer/helper";

interface LoginProps {
  main: any;
  state: any;
  setState: any;
  client: NCALayer;
  ready: boolean;
}

const LoginEcp = (props: LoginProps) => {
  const { main, state, setState, client, ready } = props;
  const [open, setOpen] = React.useState(false);

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

  const login = () =>
    main.loginEcp(
      getSubstring(state.subjectDN, "SERIALNUMBER=").substr(3),
      `${getSubstring(state.subjectDN, "CN=")} ${getSubstring(
        state.subjectDN,
        "G="
      )}`,
      getSubstring(state.subjectDN, "O=").replace(/\\/g, "")
    );

  const handleKeyAliasChange = (key: string) => {
    setState({ ...state, keyAlias: extractKeyAlias(key) });
  };

  return (
    <div className="col-md-4 offset-md-4">
      <div className="back-breadcrumbs">
        <div onClick={() => (main.loginState = "login")} className="back">
          <i className="azla arrow-left-icon"></i> Назад
        </div>
      </div>
      <div className="special-card" onClick={() => open && setOpen(false)}>
        <h1 className="title-main">
          {main.loginState === "ecp" ? "Вход" : "Регистрация"} по ЭПЦ
        </h1>
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
            onClick={() => {
              handleKeyAliasClick();
            }}
          >
            Загрузить ключи
          </button>
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
                      value={main.key}
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
                                main.key = v;
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
                  onClick={(e) => {
                    e.preventDefault();
                    login();
                  }}
                >
                  Войти
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
export default LoginEcp;
