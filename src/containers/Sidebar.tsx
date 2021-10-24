import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import SidebarManager from '../components/sidebar/SiderbarManager';
import SidebarContragent from '../components/sidebar/SidebarContragent';
import SidebarServiceDesk from '../components/sidebar/SidebarServiceDesk';
import SidebarSigner from '../components/sidebar/SidebarSigner';

const Sidebar = observer((props: any) => {
  const { main, request } = props;
  const [close, setClose] = React.useState(false);
  const history = useHistory();
  return (
    <nav className={`left-sidebar ${close ? 'close' : ''}`}>
      {console.log(history)}
      {/* className для скрытия боковой модалки "close"*/}
      <div className='container-sidebar'>
        <div className='row-sidebar'>
          <div className='avatar'>
            <div className='image-inner'>
              <div className='image-avatar'>
                <img
                  alt='avatar'
                  src={process.env.PUBLIC_URL + '/images/avatar.png'}
                />
              </div>
              {/* <span className="text">Профиль</span> */}
            </div>

            <span
              className='btn-side'
              onClick={() => {
                setClose(!close);
                // setCollapse(false);
              }}
            >
              <i className='chevron-right'></i>
            </span>
          </div>
          {main.clientData.user && main.clientData.client && (
            <div className='user-profile'>
              <span className='name'>{main.clientData.user.full_name}</span>
              <span className='bin'>БИН {main.clientData.client.bin}</span>
              <span className='company'>{main.clientData.client.longname}</span>
            </div>
          )}

          <div className='navigation'>
            <ul className='list'>
              {/* Если перешли в сам Link то класс дается active */}
              {main.role === 'Service Desk' ? (
                <SidebarServiceDesk />
              ) : main.role === 'Signer' ? (
                <SidebarSigner />
              ) : main.role === 'Manager' ? (
                <SidebarManager />
              ) : (
                <SidebarContragent />
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
});
export default Sidebar;
