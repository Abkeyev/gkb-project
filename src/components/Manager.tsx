import React from 'react';
import './style.css';

const Manager = () => {
    return (
        <div className="main-body">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="profile-manager p-100">
                                <h1 className="title-main">Профиль</h1>
                                <h3 className="title-subhead mb-32">Данные организации</h3>
                                    <div className="col-md-8">
                                        <div className="form-group-v">
                                            <label>ID клиента</label>
                                            <input className="form-control-v" type="name" value="000487320" />
                                        </div>
                                        <div className="form-group-v">
                                            <label>ID типа клиента</label>
                                            <input className="form-control-v" type="name" value="000487320" />
                                        </div>
                                        <div className="form-group-v">
                                            <label>Полное наименование</label>
                                            <input className="form-control-v" type="name" value="ТОО КАНАТ СЕРВИС" />
                                        </div>
                                        <div className="form-group-v">
                                            <label>Краткое наименование</label>
                                            <input className="form-control-v" type="name" value="СЕРВИС" />
                                        </div>
                                        <div className="form-group-v">
                                            <label>Адрес сайта клиента</label>
                                            <input className="form-control-v" type="name" value="www.service.kz" />
                                        </div>
                                        <div className="form-group-v">
                                            <label>БИН клиента</label>
                                            <input className="form-control-v" type="name" value="849930046783939442" />
                                        </div>
                                        <div className="form-group-v">
                                            <label>Дата регистрации в<br/> системе</label>
                                            <input className="form-control-v" type="date" value="12.07.2021" />
                                        </div>
                                        <div className="form-group-v">
                                            <label>ID статус клиента</label>
                                            <input className="form-control-v" type="name" value="Пользователь" />
                                        </div>
                                    </div>
                            </div>
                    </div>
            </div>
        </div>
    </div>
    );
}
export default Manager;