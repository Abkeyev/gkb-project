import React from "react";
import { Link, useHistory } from "react-router-dom";

const Sidebar = () => {
  const [close, setClose] = React.useState(false);
  const [collapse, setCollapse] = React.useState(false);
  const history = useHistory();
  return (
    <nav className={`left-sidebar ${close ? "close" : ""}`}>
      {/* className для скрытия боковой модалки "close"*/}
      <div className="container-sidebar">
        <div className="row-sidebar">
          <div className="avatar">
            <div className="image-inner">
              <div className="image-avatar">
                <img src={process.env.PUBLIC_URL + "/images/avatar.png"} />
              </div>
              {/* <span className="text">Профиль</span> */}
            </div>

            <span
              className="btn-side"
              onClick={() => {
                setClose(!close);
                setCollapse(false);
              }}
            >
              <i className="chevron-right"></i>
            </span>
          </div>
          <div className="user-profile">
            <span className="name">Султангалиева К.И</span>
            <span className="bin">БИН 124535262</span>
            <span className="company">АО “Государственное Кредитное Бюро”</span>
          </div>

          <div className="navigation">
            <ul className="list">
              {/* Если перешли в сам Link то класс дается active */}
              {history.location.pathname.includes("request") ? (
                <>
                  <li>
                    <Link
                      to="/request"
                      className={`link-list ${
                        history.location.pathname.includes("request")
                          ? "active"
                          : ""
                      }`}
                    >
                      <i className="azla blank-alt-icon"></i>
                      <span className="text">Заявки</span>
                      <span className="status"></span>
                    </Link>
                  </li>
                  <li className={`dropdown-menu`}>
                    {/* Если нажать на Dropdown то открывает самму сылку и раскрывает список, и класс дается collapse */}
                    <Link
                      to="/partners"
                      className={`link-list ${
                        history.location.pathname.includes("partners")
                          ? "active"
                          : ""
                      }`}
                    >
                      <i className="azla user-add-icon"></i>
                      <span className="text">Контрагенты</span>
                      <span className="status"></span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="link-list">
                      <i className="azla bookmark-icon"></i>
                      <span className="text">Пользователи портала </span>
                      <span className="status"></span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" className="link-list">
                      <i className="azla user-icon"></i>
                      <span className="text">Мой профиль </span>
                      <span className="status"></span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/create-request" className="link-list">
                      <i className="azla add-plusRound-icon"></i>
                      <span className="text">Новая заявка</span>
                      <span className="status"></span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/request"
                      className={`link-list ${
                        history.location.pathname.includes("request")
                          ? "active"
                          : ""
                      }`}
                    >
                      <i className="azla blank-alt-icon"></i>
                      <span className="text">Заявки</span>
                      <span className="status"></span>
                    </Link>
                  </li>
                  <li className={`dropdown-menu`}>
                    {/* Если нажать на Dropdown то открывает самму сылку и раскрывает список, и класс дается collapse */}
                    <Link
                      to="/partners"
                      className={`link-list ${
                        history.location.pathname.includes("partners")
                          ? "active"
                          : ""
                      }`}
                    >
                      <i className="azla user-add-icon"></i>
                      <span className="text">Контрагенты</span>
                      <span className="status"></span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/parthers-page" className="link-list">
                      <i className="azla bookmark-icon"></i>
                      <span className="text">Моя организация</span>
                      <span className="status"></span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="link-list">
                      <i className="azla user-icon"></i>
                      <span className="text">Мой профиль</span>
                      <span className="status"></span>
                    </Link>
                  </li>
                </>
              )}
              {/* <li><Link to="/" className="link-list"><i className="azla pin-icon"></i> <span className="text">Адреса </span> <span className="status"></span></Link></li> */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Sidebar;
