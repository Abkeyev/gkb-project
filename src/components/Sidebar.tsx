import React from 'react';
import './style.css';

const Sidebar = () => {
    return (
        <nav className="left-sidebar "> {/* className для скрытия боковой модалки "close"*/}
        <div className="container-sidebar">
            <div className="row-sidebar">
                <div className="avatar"> 
                    <div className="image-inner">
                        <div className="image-avatar">
                            <img src="images/avatar.png" />
                        </div>
                        <span className="text">Профиль</span>
                    </div>

                    <span className="btn-side">
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
                        <li><span className="link-list"><i className="azla blank-alt-icon"></i> <span className="text">Заявка</span></span> <span className="status active"></span> </li>
                        <li><span className="link-list"><i className="azla user-icon"></i> <span className="text">Контрагент </span></span> <span className="status active"></span> </li>
                        <li><span className="link-list"><i className="azla user-add-icon"></i> <span className="text">Уполномоченные лица </span></span> <span className="status"></span> </li>
                        <li><span className="link-list"><i className="azla chat-icon"></i> <span className="text">Контакты </span></span> <span className="status"></span> </li>
                        <li><span className="link-list"><i className="azla pin-icon"></i> <span className="text">Адреса </span></span> <span className="status"></span> </li>
                        <li><span className="link-list"><i className="azla paper-icon"></i> <span className="text">Банковские реквизиты </span></span> <span className="status"></span> </li>
                        <li><span className="link-list"><i className="azla add-plus-icon"></i> <span className="text">Пользователи </span></span> <span className="status"></span> </li>
                        <li><span className="link-list"><i className="azla star-icon"></i> <span className="text">Потребители услуг </span></span> <span className="status"></span> </li>
                        <li><span className="link-list"><i className="azla file-icon"></i> <span className="text">Документы </span></span> <span className="status"></span> </li>
                        <li><span className="link-list"><i className="azla bookmark-icon"></i> <span className="text">Подключенные сервисы </span></span> <span className="status"></span> </li>
                    </ul>
                </div>

            </div>
        </div>
    </nav>
    );
}
export default Sidebar;