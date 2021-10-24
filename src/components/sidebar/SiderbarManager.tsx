import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarManager = () => {
  return (
    <>
      <li>
        <NavLink to='/' className='link-list' activeClassName='active' exact>
          <i className='azla blank-alt-icon'></i>
          <span className='text'>Заявки</span>
          <span className='status'></span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/contractors'
          className='link-list'
          activeClassName='active'
        >
          <i className='azla user-add-icon'></i>
          <span className='text'>Контрагенты</span>
          <span className='status'></span>
        </NavLink>
      </li>
      <li>
        <NavLink to='/profile' className='link-list' activeClassName='active'>
          <i className='azla user-icon'></i>
          <span className='text'>Мой профиль</span>
          <span className='status'></span>
        </NavLink>
      </li>
    </>
  );
};

export default SidebarManager;
