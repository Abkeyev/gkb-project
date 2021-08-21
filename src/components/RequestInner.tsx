import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Link } from "react-router-dom";
import './style.css';

const RequestInner = () => {
    return (
        <div className="main-body">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">

                        <div className="req-manager-inner p-16-50">

                            <div className="req-inner-header">
                                <div className="back-breadcrumbs">
                                    <Link to="/" className="back"><i className="azla arrow-left-icon"></i> Назад</Link>
                                    <div className="breadcrumbs">
                                        <Link to="">Заявки</Link> / <span>Заявка №1353</span>
                                    </div>
                                </div>

                                <h1 className="title-main">Заявка №1353 - ТОО “М-Ломбард”</h1>

                                <div className="status-bar">
                                    <ul className="step-progressbar">
                                        <li className="step-item step-item-complete">Проверка</li>
                                        <li className="step-item step-item-active">Подписание<br/>договора</li>
                                        <li className="step-item">Форма<br/>доступа</li>
                                        <li className="step-item">Тестирование</li>
                                        <li className="step-item">Готово</li>
                                    </ul>
                                </div>
                            </div>

                            <Tabs>
                                <div className="line-hr mb-32">
                                    <TabList>
                                        <Tab>Общее</Tab>
                                        <Tab>Потребители услуг</Tab>
                                    </TabList>
                                </div>

                                <TabPanel>
                                    <div className="req-inner-body pad-b-128">
                                        <h3 className="title-subhead mb-16">Общие данные</h3>
                                        <div className="total-info">
                                            
                                            <ul className="info-list">
                                                <li>
                                                    <span className="left">Номер заявки:</span>
                                                    <span className="right">41252526</span>
                                                </li>
                                                <li>
                                                    <span className="left">Статус заявки:</span>
                                                    <span className="right">Нераспределено</span>
                                                </li>
                                                <li>
                                                    <span className="left">Организация:</span>
                                                    <span className="right">ТОО “М-Ломбард”</span>
                                                </li>
                                                <li>
                                                    <span className="left">Номер заявки:</span>
                                                    <span className="right">41252526</span>
                                                </li>
                                                <li>
                                                    <span className="left">БИН:</span>
                                                    <span className="right">123456789098</span>
                                                </li>
                                                <li>
                                                    <span className="left">Категория деятельности:</span>
                                                    <span className="right">Ломбарды</span>
                                                </li>
                                                <li>
                                                    <span className="left">Тип сервиса:</span>
                                                    <span className="right">Изъятие данных</span>
                                                </li>
                                                <li>
                                                    <span className="left">Дата регистрации заявки:</span>
                                                    <span className="right">20 Июня 2021</span>
                                                </li>
                                                <li>
                                                    <span className="left">Дата исполнения заявки::</span>
                                                    <span className="right">20 Июня 2021</span>
                                                </li>
                                            </ul>
                                            
                                        </div>

                                        <h3 className="title-subhead mb-16">Документы контрагента</h3>
                                        <h5 className="title-subhead-h5 mb-16">Организационные документы</h5>

                                        <div className="files-added">
                                            <ul className="files-list">
                                                <li>
                                                    <i className="azla blank-alt-primary-icon"></i>
                                                    <span>Типовой договор.docx</span>
                                                </li>
                                                <li>
                                                    <i className="azla blank-alt-primary-icon"></i>
                                                    <span>Типовой договор.docx</span>
                                                </li>
                                            </ul>
                                        </div>


                                        <h5 className="title-subhead-h5 mb-16">Персональные документы</h5>

                                        <div className="files-added">
                                            <ul className="files-list">
                                                <li>
                                                    <i className="azla blank-alt-primary-icon"></i>
                                                    <span>Типовой договор.docx</span>
                                                </li>
                                                <li>
                                                    <i className="azla blank-alt-primary-icon"></i>
                                                    <span>Типовой договор.docx</span>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                </TabPanel>

                                <TabPanel>
                                    <div className="tab-content tab-1">
                                        <h3 className="title-subhead mb-16">56 заявленных пользователей</h3>
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
                            {/* <div className="req-inner-body">
                                <h3 className="title-subhead mb-16">Шаблоны договоров</h3>
                                <div className="files-added">
                                    <ul className="files-list">
                                        <li>
                                            <i className="azla blank-alt-primary-icon"></i>
                                            <span>Типовой договор.docx</span>
                                        </li>
                                        <li>
                                            <i className="azla blank-alt-primary-icon"></i>
                                            <span>Типовой договор.docx</span>
                                        </li>
                                    </ul>
                                    
                                </div>
                            </div> */}
                            
                            <div className="req-inner-footer">
                                {/* <button type="button" className="button btn-primary">Назначить</button> */}
                                <div className="manager-req">
                                    <div className="left">
                                        <p>Менеджер заявки</p>
                                        <div className="profile">
                                            <img className="ava" src={process.env.PUBLIC_URL + "/images/def-ava.svg"} />
                                            <span className="name">Султангалиева К.И</span>
                                        </div>
                                    </div>

                                    {/* <div className="right">
                                        <p>Первичная проверка прошла успешно?</p>
                                        <button className="button btn-secondary mr-8">Нет</button>
                                        <button className="button btn-primary">Да, успешно</button>
                                    </div> */}

                                    <div className="right alert">
                                        <p>Заявка отклонена</p>
                                        <button className="button btn-secondary">В архив</button>
                                    </div>
                                </div>
                                
                            </div>
                            

                        </div>

                    </div>
            </div>
        </div>
    </div>
    );
}
export default RequestInner;