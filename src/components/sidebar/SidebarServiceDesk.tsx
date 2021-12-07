import React from "react";
import { NavLink } from "react-router-dom";

const SidebarServiceDesk = () => {
  return (
    <>
      <li>
        <NavLink to="/" className="link-list" activeClassName="active" exact>
          <i className="azla blank-alt-icon"></i>
          <span className="text">Заявки</span>
          <span className="status"></span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/access-form"
          className="link-list"
          activeClassName="active"
        >
          <i className="azla blank-alt-icon"></i>
          <span className="text">Формы доступа</span>
          <span className="status"></span>
        </NavLink>
      </li>
      <li className={`dropdown-menu`}>
        <NavLink to="/users" className="link-list" activeClassName="active">
          <i className="azla user-add-icon"></i>
          <span className="text">Пользователи портала</span>
          <span className="status"></span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/profile" className="link-list" activeClassName="active">
          <i className="azla user-icon"></i>
          <span className="text">Мой профиль</span>
          <span className="status"></span>
        </NavLink>
      </li>
    </>
  );
};

export default SidebarServiceDesk;
