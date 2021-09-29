import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";

const Sidebar = observer((props: any) => {
  const { main, request } = props;
  const [close, setClose] = React.useState(false);
  const history = useHistory();
  return (
    <nav className={`left-sidebar ${close ? "close" : ""}`}>
      {console.log(history)}
      {/* className для скрытия боковой модалки "close"*/}
      <div className="container-sidebar">
        <div className="row-sidebar">
          <div className="avatar">
            <div className="image-inner">
              <div className="image-avatar">
                <img
                  alt="avatar"
                  src={process.env.PUBLIC_URL + "/images/avatar.png"}
                />
              </div>
              {/* <span className="text">Профиль</span> */}
            </div>

            <span
              className="btn-side"
              onClick={() => {
                setClose(!close);
                // setCollapse(false);
              }}
            >
              <i className="chevron-right"></i>
            </span>
          </div>
          {main.clientData.user && main.clientData.client && (
            <div className="user-profile">
              <span className="name">{main.clientData.user.full_name}</span>
              <span className="bin">БИН {main.clientData.client.bin}</span>
              <span className="company">{main.clientData.client.longname}</span>
            </div>
          )}

          <div className="navigation">
            <ul className="list">
              {/* Если перешли в сам Link то класс дается active */}
              {main.role === "Manager" ? (
                <>
                  <li>
                    <NavLink
                      to="/"
                      className="link-list"
                      activeClassName="link-list active"
                      exact
                    >
                      <i className="azla blank-alt-icon"></i>
                      <span className="text">Заявки</span>
                      <span className="status"></span>
                    </NavLink>
                  </li>
                  <li className={`dropdown-menu`}>
                    {/* Если нажать на Dropdown то открывает самму сылку и раскрывает список, и класс дается collapse */}
                    <NavLink
                      to="/contractors"
                      className="link-list"
                      activeClassName="link-list active"
                    >
                      <i className="azla user-add-icon"></i>
                      <span className="text">Контрагенты</span>
                      <span className="status"></span>
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink
                      to="/users"
                      className={`link-list ${
                        window.location.hash.includes("users")
                          ? "active"
                          : ""
                      }`}
                    >
                      <i className="azla bookmark-icon"></i>
                      <span className="text">Пользователи портала</span>
                      <span className="status"></span>
                    </NavLink>
                  </li> */}
                  <li>
                    <NavLink
                      to="/profile"
                      className="link-list"
                      activeClassName="link-list active"
                    >
                      <i className="azla user-icon"></i>
                      <span className="text">Мой профиль</span>
                      <span className="status"></span>
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/request-new"
                      className="link-list"
                      activeClassName="link-list active"
                    >
                      <i className="azla add-plusRound-icon"></i>
                      <span className="text">Новая заявка</span>
                      <span className="status"></span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/"
                      className="link-list"
                      activeClassName="link-list active"
                    >
                      <i className="azla blank-alt-icon"></i>
                      <span className="text">Заявки</span>
                      <span className="status"></span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/organization"
                      className={`link-list ${
                        window.location.hash.includes("organization")
                          ? "active"
                          : ""
                      }`}
                    >
                      <i className="azla bookmark-icon"></i>
                      <span className="text">Моя организация</span>
                      <span className="status"></span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/profile"
                      className="link-list"
                      activeClassName="link-list active"
                    >
                      <i className="azla user-icon"></i>
                      <span className="text">Мой профиль</span>
                      <span className="status"></span>
                    </NavLink>
                  </li>
                </>
              )}
              {/* <li><NavLink to="/" className="link-list"><i className="azla pin-icon"></i> <span className="text">Адреса </span> <span className="status"></span></NavLink></li> */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
});
export default Sidebar;
