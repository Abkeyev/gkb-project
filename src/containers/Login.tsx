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
              <div className="logo-image">
                <img src={
                        process.env.PUBLIC_URL +
                        "/logo-image.png"
                      }/>
              </div>
              <div className="special-card">
                <h1 className="title-main mb-24">Вход</h1>
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
                    className="button btn-primary mt-16 mb-16"
                    disabled={login.length < 0 || password.length < 0}
                    onClick={() => {
                      setState({ ...state, logged: true });
                      history.push("/request");
                    }}
                  >
                    Войти
                  </button>
                  <span className="login-or mb-16">или</span>

                  <button
                    className="button btn-secondary mb-24"
                    disabled={login.length < 0 || password.length < 0}
                    onClick={() => {
                      setState({ ...state, logged: true });
                      history.push("/request");
                    }}
                  >
                    Войти по ЭЦП ЮЛ
                  </button>
                  <div className="reg-link">
                    <p>Еще не зарегистрированы?</p>
                    <Link to="/registration">Зарегистрироваться с ЭЦП ЮЛ</Link>
                  </div>
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
