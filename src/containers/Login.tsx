import React from "react";

import { useHistory, Link } from "react-router-dom";

interface LoginProps {
  state: any;
  setState: any;
}

const Login = (props: LoginProps) => {
  const { setState, state } = props;
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();
  return (
    <section className="login-page">
      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <form>
              <div className="back-breadcrumbs">
                <Link to="/" className="back">
                  <i className="azla arrow-left-icon"></i> Назад
                </Link>
              </div>
              <div className="special-card">
                <h1 className="title-main">Вход по логину</h1>
                <div className="login-input">
                  <div className="form-group">
                    <label>Логин</label>
                    <input
                      className="form-control"
                      type="login"
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                      placeholder="Введите логин"
                    />
                  </div>
                  <div className="form-group">
                    <label>Пароль</label>
                    <input
                      className="form-control"
                      type="name"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Введите пароль"
                    />
                  </div>
                  <button
                    className="button btn-primary mt-16"
                    disabled={login.length < 0 || password.length < 0}
                    onClick={() => {
                      setState({ ...state, logged: true });
                      history.push("/request");
                    }}
                  >
                    Войти
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
