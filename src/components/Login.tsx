import React from 'react';
import './style.css';

const Login = () => {
    return (
        <section className="login-page">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <form>

                            <div className="special-card">

                                <h1 className="title-main">Вход по логину</h1>
                                <div className="login-input">
                                    <div className="form-group">
                                        <label>Логин</label>
                                        <input className="form-control" type="name" placeholder="Введите логин" />
                                    </div>
                                    <div className="form-group">
                                        <label>Пароль</label>
                                        <input className="form-control" type="name" placeholder="Введите пароль" />
                                    </div>
                                    <button className="button btn-primary" disabled>Войти</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
    </section>
    );
}
export default Login;