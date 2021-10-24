import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarContragent = () => {
  return (
    <>
      <li>
        <NavLink
          to='/request-new'
          className='link-list'
          activeClassName='active'
        >
          <i className='azla add-plusRound-icon'></i>
          <span className='text'>Новая заявка</span>
          <span className='status'></span>
        </NavLink>
      </li>
      <li>
        <NavLink to='/' className='link-list' activeClassName='active' exact>
          <i className='azla blank-alt-icon'></i>
          <span className='text'>Заявки</span>
          <span className='status'></span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/organization'
          className='link-list'
          activeClassName='active'
        >
          <i className='azla bookmark-icon'></i>
          <span className='text'>Моя организация</span>
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

export default SidebarContragent;
