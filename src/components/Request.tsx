import React from 'react';
import './style.css';

const Request = () => {
    return (
        <div className="main-body">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="req-manager p-100">
                                <div className="header-text justify-content-between mb-24">
                                    <h1 className="title-main">Заявки</h1>
                                    <div className="btn create-new"><span className="text">Новая заявка</span></div>
                                </div>
                                <div className="tab-links mb-24">
                                    <span className="link active">Новые (12)</span>
                                    <span className="link">Мои (3)</span>
                                    <span className="link">Не распределенные (2)</span>
                                    <span className="link">Подписано (112)</span>
                                    <span className="bottomLine"></span>
                                </div>
                                <div className="filter mb-24">
                                    <div className="form-group mr-16 mb-0">
                                        <input className="form-control" type="name" placeholder="Поиск по названию, БИН" />
                                    </div>
                                    <button className="btn-s btn-secondary mr-16">Фильтр</button>
                                    <button className="btn-s btn-secondary">Сортировать</button>
                                </div>
                                <div>
                                    <table className="table req-table">
                                        <thead>
                                            <tr>
                                                <th>
                                                    БИН
                                                </th>
                                                <th>
                                                    Организации
                                                </th>
                                                <th>
                                                    Категория деятельности
                                                </th>
                                                <th>
                                                    Сервис
                                                </th>
                                                <th>
                                                    Дата поступления
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>52345634643</td>
                                                <td>М-Ломбард</td>
                                                <td>Ломбард</td>
                                                <td>Кредитная ист...</td>
                                                <td>12.12.2021</td>
                                            </tr>
                                            <tr>
                                                <td>52345634643</td>
                                                <td>М-Ломбард</td>
                                                <td>Ломбард</td>
                                                <td>Кредитная ист...</td>
                                                <td>12.12.2021</td>
                                            </tr>
                                            <tr>
                                                <td>52345634643</td>
                                                <td>ТОО “МФО”</td>
                                                <td>Микрозаймы</td>
                                                <td>Кредитная ист...</td>
                                                <td>12.12.2021</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    </div>
            </div>
        </div>
    </div>
    );
}
export default Request;