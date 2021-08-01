import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const Registration = () => {
    return (
        <section className="register-page">
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form>

                        <div className="special-card">
                            <h1 className="title-main mb-32">Регистрация</h1>
                            <h3 className="title-subhead mb-16">Данные организации</h3>
                            <p className="text-desc">Пожалуйста добавьте недостающие данные и проверьте существующие</p>
                            
                            <div className="register-input">
                                <div className="form-group">
                                    <label>Тип клиента</label>
                                    <input className="form-control" type="name" placeholder="Введите логин" />
                                </div>
                                <div className="form-group">
                                    <label>Полное наименование</label>
                                    <input className="form-control" type="name" placeholder="Введите пароль" />
                                </div>
                                <div className="form-group">
                                    <label>Краткое наименование</label>
                                    <input className="form-control" type="name" placeholder="Введите пароль" />
                                </div>
                                <div className="form-group">
                                    <label>Адрес сайта клиента</label>
                                    <input className="form-control" type="name" placeholder="Введите пароль" />
                                </div>
                                <div className="form-group">
                                    <label>БИН клиента</label>
                                    <input className="form-control" type="number" placeholder="Введите пароль" />
                                </div>
                                <div className="form-group">
                                    <label>Дата регистрации в системе</label>
                                    <input className="form-control" type="date" placeholder="Введите пароль" />
                                </div>
                                <button className="button btn-primary table-ml" disabled>Далее</button>
                            </div>
                            
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </section>
    );
}
export default Registration;