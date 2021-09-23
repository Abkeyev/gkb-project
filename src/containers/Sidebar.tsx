import React from "react";
import { Link, useHistory } from "react-router-dom";
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
                    <Link
                      to="/"
                      className={`link-list ${
                        history.location.pathname === "/" ? "active" : ""
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
                      to="/contractors"
                      className={`link-list ${
                        history.location.pathname.includes("contractors")
                          ? "active"
                          : ""
                      }`}
                    >
                      <i className="azla user-add-icon"></i>
                      <span className="text">Контрагенты</span>
                      <span className="status"></span>
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      to="/users"
                      className={`link-list ${
                        history.location.pathname.includes("users")
                          ? "active"
                          : ""
                      }`}
                    >
                      <i className="azla bookmark-icon"></i>
                      <span className="text">Пользователи портала</span>
                      <span className="status"></span>
                    </Link>
                  </li> */}
                  <li>
                    <Link
                      to="/profile"
                      className={`link-list ${
                        history.location.pathname.includes("profile")
                          ? "active"
                          : ""
                      }`}
                    >
                      <i className="azla user-icon"></i>
                      <span className="text">Мой профиль</span>
                      <span className="status"></span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/request-new"
                      className={`link-list ${
                        history.location.pathname.includes("request-new")
                          ? "active"
                          : ""
                      }`}
                    >
                      <i className="azla add-plusRound-icon"></i>
                      <span className="text">Новая заявка</span>
                      <span className="status"></span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className={`link-list ${
                        history.location.pathname === "/" ? "active" : ""
                      }`}
                    >
                      <i className="azla blank-alt-icon"></i>
                      <span className="text">Заявки</span>
                      <span className="status"></span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/organization"
                      className={`link-list ${
                        history.location.pathname.includes("organization")
                          ? "active"
                          : ""
                      }`}
                    >
                      <i className="azla bookmark-icon"></i>
                      <span className="text">Моя организация</span>
                      <span className="status"></span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className={`link-list ${
                        history.location.pathname.includes("profile")
                          ? "active"
                          : ""
                      }`}
                    >
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
});
export default Sidebar;
