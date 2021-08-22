import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Sidebar = () => {
  const [close, setClose] = React.useState(false);
  const [collapse, setCollapse] = React.useState(false);
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
              <li>
                <Link to="/orders" className="link-list active">
                  <i className="azla blank-alt-icon"></i>
                  <span className="text">Заявка</span>
                  <span className="status active"></span>
                </Link>
              </li>
              <li className={`dropdown-menu ${collapse ? "collapse" : ""}`}>
                {/* Если нажать на Dropdown то открывает самму сылку и раскрывает список, и класс дается collapse */}
                <Link to="/" className="link-list">
                  <i className="azla user-add-icon"></i>
                  <span className="text">Контрагент </span>
                  <span className="status active"></span>
                  <span
                    className="dropdown down"
                    onClick={() => setCollapse(!collapse)}
                  ></span>
                </Link>
                <ul className="submenu">
                  <li>
                    <Link to="/" className="link-list">
                      <i className="azla user-add-icon"></i>
                      <span className="text">Уполномоченные лица </span>
                      <span className="status"></span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="link-list">
                      <i className="azla chat-icon"></i>
                      <span className="text">Контакты </span>
                      <span className="status"></span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="link-list">
                      <i className="azla paper-icon"></i>
                      <span className="text">Банковские реквизиты </span>
                      <span className="status"></span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="link-list">
                      <i className="azla add-plus-icon"></i>
                      <span className="text">Пользователи </span>
                      <span className="status"></span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="link-list">
                      <i className="azla star-icon"></i>
                      <span className="text">Потребители услуг </span>
                      <span className="status"></span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="link-list">
                      <i className="azla file-icon"></i>
                      <span className="text">Документы </span>
                      <span className="status"></span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/" className="link-list">
                  <i className="azla bookmark-icon"></i>
                  <span className="text">Пользователи портала </span>
                  <span className="status"></span>
                </Link>
              </li>
              <li>
                <Link to="/" className="link-list">
                  <i className="azla user-icon"></i>
                  <span className="text">Мой профиль </span>
                  <span className="status"></span>
                </Link>
              </li>
              {/* <li><Link to="/" className="link-list"><i className="azla pin-icon"></i> <span className="text">Адреса </span> <span className="status"></span></Link></li> */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Sidebar;
