import React from "react";
import { AppContext } from "../AppContext";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import history from "../history";

const Login = observer(() => {
  const { mainStore } = React.useContext(AppContext);
  return (
    <div className="col-md-4 offset-md-4">
      <form>
        <div className="logo-image">
          <img src={process.env.PUBLIC_URL + "/logo-image.png"} />
        </div>
        <div className="special-card">
          <h1 className="title-main mb-24">Вход</h1>
          <div className="login-input">
            <div className="form-group">
              <label>Логин</label>
              <input
                className="form-control"
                type="login"
                value={mainStore.login}
                onChange={(e) => mainStore.setLogin(e.target.value)}
                placeholder="Введите логин"
              />
            </div>
            <div className="form-group">
              <label>Пароль</label>
              <input
                className="form-control"
                type="name"
                value={mainStore.pass}
                onChange={(e) => mainStore.setPass(e.target.value)}
                placeholder="Введите пароль"
              />
            </div>
            <button
              className="button btn-primary mt-16 mb-16"
              disabled={mainStore.login.length < 0 || mainStore.pass.length < 0}
              onClick={() => {
                mainStore.logIn();
                history.push("/request");
              }}
            >
              Войти
            </button>
            <span className="login-or mb-16">или</span>

            <button
              className="button btn-secondary mb-24"
              disabled={mainStore.login.length < 0 || mainStore.pass.length < 0}
              onClick={() => {
                mainStore.setLoginState("ecp");
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
  );
});
export default Login;
