import React from 'react';
import './style.css';

const Modal = () => {
    return (
        <div>
        {/* Это при добавлении файла в Регистрации */}

            {/* <div className="modal modal-default">
                <div className="modal-backbg"></div>
                <div className="modal-dialog">
                    <div className="modal-content fadeInModal animated">
                        <div className="modal-close"><i className="azla close-icon"></i></div>
                        <div className="modal-body">


                            <h3 className="text-center">Добавьте или перетащите файл</h3>
                            <i className="azla upload-icon size-80 mtb-auto-16"></i>
                            <button type="button" className="button btn-primary table-auto">Добавить</button>
                            

                        </div>
                    </div>
                </div>

            </div> */}

            <div className="modal modal-large">
                <div className="modal-backbg"></div>
                <div className="modal-dialog">
                    <div className="modal-content fadeInModal animated">
                        <div className="modal-close"><i className="azla close-icon"></i></div>
                        <div className="modal-body">

                            {/* Это Назначить менеджера */}
                            <div className="add-manager">
                                <h3 className="text-left title-subhead">Назначить менеджера</h3>
                                <div className="search-input">
                                    <input type="seatch" className="search-icon" placeholder="Поиск"/>
                                </div>
                                <div className="manager-list">
                                    <ul>
                                        <li>
                                            <div className="profile">
                                                <img className="ava" src={process.env.PUBLIC_URL + "/images/def-ava.svg"} />
                                                <span className="name">Султангалиева К.И</span>
                                            </div>
                                            <span className="position">Менеджер</span>
                                        </li>
                                        <li>
                                            <div className="profile">
                                                <img className="ava" src={process.env.PUBLIC_URL + "/images/def-ava.svg"} />
                                                <span className="name">Султангалиева К.И</span>
                                            </div>
                                            <span className="position">Менеджер</span>
                                        </li>
                                        <li>
                                            <div className="profile">
                                                <img className="ava" src={process.env.PUBLIC_URL + "/images/def-ava.svg"} />
                                                <span className="name">Султангалиева К.И</span>
                                            </div>
                                            <span className="position">Менеджер</span>
                                        </li>
                                        <li>
                                            <div className="profile">
                                                <img className="ava" src={process.env.PUBLIC_URL + "/images/def-ava.svg"} />
                                                <span className="name">Султангалиева К.И</span>
                                            </div>
                                            <span className="position">Менеджер</span>
                                        </li>
                                        <li>
                                            <div className="profile">
                                                <img className="ava" src={process.env.PUBLIC_URL + "/images/def-ava.svg"} />
                                                <span className="name">Султангалиева К.И</span>
                                            </div>
                                            <span className="position">Менеджер</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
}
export default Modal;