import { observer } from "mobx-react";

interface LoginProps {
  main: any;
}

const Login = observer((props: LoginProps) => {
  const { main } = props;

  return (
    <div className="col-md-4 offset-md-4">
      <form>
        <div className="logo-image">
          <img alt="logo" src={process.env.PUBLIC_URL + "/logo-image.png"} />
        </div>
        <div className="special-card">
          <h1 className="title-main mb-24">Вход</h1>
          <div className="login-input">
            <div
              className={`form-group ${main.loginError ? "is-invalid" : ""}`}
            >
              <label>Логин</label>
              <input
                className="form-control"
                type="text"
                value={main.login}
                onChange={(e) => (main.login = e.target.value)}
                placeholder="Введите логин"
              />
              <span className="invalid-feedback">Ошибка</span>
            </div>
            <div
              className={`form-group ${main.loginError ? "is-invalid" : ""}`}
            >
              <label>Пароль</label>
              <input
                className="form-control"
                type="password"
                value={main.password}
                onChange={(e) => (main.password = e.target.value)}
                placeholder="Введите пароль"
              />
              {main.loginError && (
                <span className="invalid-feedback">{main.loginErrorText}</span>
              )}
            </div>
            <button
              className="button btn-primary mt-16 mb-16"
              disabled={main.login.length === 0 && main.password.length === 0}
              onClick={(e) => {
                e.preventDefault();
                main.logIn(main.login, main.password);
              }}
            >
              Войти
            </button>
            <span className="login-or mb-16">или</span>

            <button
              className="button btn-secondary mb-24"
              disabled={main.login.length < 0 || main.password.length < 0}
              onClick={() => {
                main.loginState = "ecp";
              }}
            >
              Войти по ЭЦП ЮЛ
            </button>
            <div className="reg-link">
              <p>Еще не зарегистрированы?</p>
              <span
                className="link"
                onClick={() => {
                  main.loginState = "ecpr";
                }}
              >
                Зарегистрироваться с ЭЦП ЮЛ
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
});
export default Login;
