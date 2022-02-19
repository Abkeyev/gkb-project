import React from "react";
import NCALayer from "../ncalayer/ncalayer";

const LoginEcp = (props: any) => {
  const { main } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <div className="col-md-4 offset-md-4">
      <div className="back-breadcrumbs">
        <div onClick={() => (main.loginState = "login")} className="back">
          <i className="azla arrow-left-icon"></i> Назад
        </div>
      </div>
      <div className="special-card" onClick={() => open && setOpen(false)}>
        <h1 className="title-main">
          {main.loginState === "ecp" ? "Вход" : "Регистрация"} по ЭЦП
        </h1>
        <div className="login-input">
          <div className="form-group">
            <label>Файл</label>
            <button className="form-control" onClick={() => main.getAuthKey()}>
              Выберите ключ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginEcp;
