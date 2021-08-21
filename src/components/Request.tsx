import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './style.css';

const Request = () => {
    return (
        <div className="main-body">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">

                        <div className="req-manager p-50">
                                <div className="header-text justify-content-between mb-24">
                                    <h1 className="title-main">Заявки</h1>
                                    <div className="btn button btn-primary"><span className="text">Новая заявка</span></div>
                                </div>

                                <Tabs>
                                    <div className="">
                                        <TabList>
                                            <Tab>Нераспределенные</Tab>
                                            <Tab>Мои</Tab>
                                            <Tab>Подписанные</Tab>
                                            <Tab>В архиве</Tab>
                                        </TabList>
                                    </div>

                                {/* <div className="tab-links ">
                                    <span className="link active">Нераспределенные</span>
                                    <span className="link">Мои (3)</span>
                                    <span className="link">Подписанные</span>
                                    <span className="link">В архиве</span>
                                    <span className="bottomLine"></span>
                                </div> */}
                                <div className="filter mb-24">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="filter-search">
                                                <div className="form-group mr-16 mb-0">
                                                    <input className="form-control" type="name" placeholder="Поиск по названию, БИН" />
                                                </div>
                                                <button className="btn-s btn-secondary btn-icon col-md-3"><i className="azla filter-icon"></i> Расширенный поиск</button>
                                            </div>
                                        </div>
                                            
                                        <div className="col-md-12 filter-content view"> {/* Класс "view" добавляется при нажатии "Расширенный поиск" */}
                                            <div className="filter-inputs">
                                                <div className="form-wrapper">
                                                    <input type="name" placeholder="Напишите id клиента" />
                                                    <label>ID клиента</label>
                                                </div>
                                                <div className="form-wrapper">
                                                    <input type="name" placeholder="Напишите id клиента" />
                                                    <label>ID клиента</label>
                                                </div>
                                                <div className="form-wrapper">
                                                    <input type="name" placeholder="Напишите id клиента" />
                                                    <label>ID клиента</label>
                                                </div>
                                            </div>
                                            <div className="filter-btns">
                                                <button type="button" className="button btn-primary mr-16">Применить</button>
                                                <button type="button" className="button btn-secondary">Убрать фильтры</button>
                                            </div>  
                                        </div>

                                    </div>
                                </div>

                                <TabPanel>
                                    <div className="tab-content tab-1">
                                        <h3 className="title-subhead mb-16">Найдено <span className="number">32</span></h3>
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
                                                    <td>Кредитная история</td>
                                                    <td>12.12.2021</td>
                                                </tr>
                                                <tr>
                                                    <td>52345634643</td>
                                                    <td>М-Ломбард</td>
                                                    <td>Ломбард</td>
                                                    <td>Кредитная история</td>
                                                    <td>12.12.2021</td>
                                                </tr>
                                                <tr>
                                                    <td>52345634643</td>
                                                    <td>ТОО “МФО”</td>
                                                    <td>Микрозаймы</td>
                                                    <td>Если текст длинный то...</td>
                                                    <td>12.12.2021</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </TabPanel>

                                <TabPanel>
                                    <div className="tab-content tab-2">
                                        <h3 className="title-subhead mb-16">На подпись <span className="number">32</span></h3>
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
                                                    <td>Кредитная история</td>
                                                    <td>12.12.2021</td>
                                                </tr>
                                                <tr>
                                                    <td>52345634643</td>
                                                    <td>М-Ломбард</td>
                                                    <td>Ломбард</td>
                                                    <td>Кредитная история</td>
                                                    <td>12.12.2021</td>
                                                </tr>
                                                <tr>
                                                    <td>52345634643</td>
                                                    <td>ТОО “МФО”</td>
                                                    <td>Микрозаймы</td>
                                                    <td>Если текст длинный то...</td>
                                                    <td>12.12.2021</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </TabPanel>

                                <TabPanel>
                                    <div className="tab-content tab-3">
                                        <h3 className="title-subhead mb-16">Подписанные <span className="number">32</span></h3>
                                        <p>Список подписанных заявок контрагентов, которые стали партнерами ГКБ</p>
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
                                                    <td>Кредитная история</td>
                                                    <td>12.12.2021</td>
                                                </tr>
                                                <tr>
                                                    <td>52345634643</td>
                                                    <td>М-Ломбард</td>
                                                    <td>Ломбард</td>
                                                    <td>Кредитная история</td>
                                                    <td>12.12.2021</td>
                                                </tr>
                                                <tr>
                                                    <td>52345634643</td>
                                                    <td>ТОО “МФО”</td>
                                                    <td>Микрозаймы</td>
                                                    <td>Если текст длинный то...</td>
                                                    <td>12.12.2021</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </TabPanel>

                                <TabPanel>
                                    <div className="tab-content tab-4">
                                        <h3 className="title-subhead mb-16">В архиве</h3>
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
                                                    <td>Кредитная история</td>
                                                    <td>12.12.2021</td>
                                                </tr>
                                                <tr>
                                                    <td>52345634643</td>
                                                    <td>М-Ломбард</td>
                                                    <td>Ломбард</td>
                                                    <td>Кредитная история</td>
                                                    <td>12.12.2021</td>
                                                </tr>
                                                <tr>
                                                    <td>52345634643</td>
                                                    <td>ТОО “МФО”</td>
                                                    <td>Микрозаймы</td>
                                                    <td>Если текст длинный то...</td>
                                                    <td>12.12.2021</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </TabPanel>
                                </Tabs>

                            </div>
                    </div>
            </div>
        </div>
    </div>
    );
}
export default Request;