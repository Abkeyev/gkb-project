import React from "react";
import "react-tabs/style/react-tabs.css";
import { observer } from "mobx-react";
import { AppContext } from "../AppContext";

const CreateRequest = () => {
    const [tab, setTab] = React.useState(false);
    const { mainStore, requestStore } = React.useContext(AppContext);
  return (
    <div className="main-body">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
                
            <div className="create-page p-50 pad-b-128">
              <div className="header-text-inner justify-content-between mb-32">
                <h1 className="title-main mb-32">
                Новая заявка
                </h1>
              </div>
              <div className="create-page-inner">

                <h3 className="title-subhead mb-16">Выберите сервис</h3>
                    <div className="choose-service">

                        <div className="tab-button">
                            <span
                            className={`tab-btn ${
                                !tab ? "active" : ""
                            }`}
                            onClick={() => setTab(false)}
                            >
                            ЕСБД
                            </span>
                            <span
                            className={`tab-btn ${
                                tab ? "active" : ""
                            }`}
                            onClick={() => setTab(true)}
                            >
                            БДКИ
                            </span>
                        </div>
                        <div className="d-grid ml-24">
                            <p className="small-text mb-0">ЕСБД - Единая Страховая База Данных</p>
                            <p className="small-text mb-0">БДКИ - База Данных Кредитных Историй</p>
                        </div>
                    </div>

                    <div className="special-card">
                        <h3 className="title-subhead mb-16 mt-32">Документы</h3>
                        <p className="text-desc">
                        Пожалуйста прикрепите следующие документы организации
                        </p>
                        <div className="reg-file-add mb-32">
                        <ul>
                            <li>
                            <div className="name">
                                <span className="text">Справка о регистрации/перерегистрации юридического лица</span>
                                <span className="file-name">spravka_o_registracii.pdf</span>
                            </div>
                            </li>
                            <li>
                            <div className="name">
                                <span className="text">Решение учредителя с данными о приеме на работу первого руководителя</span>
                                <span className="file-name">spravka_o_registracii.pdf</span>
                            </div>
                            </li>
                            <li>
                            <div className="name">
                                <span className="text">Приказ о приеме на работу первого руководителя</span>
                                <span className="file-name">spravka_o_registracii.pdf</span>
                            </div>
                            </li>
                            <li>
                            <div className="name">
                                <span className="text">Документ, удостоверяющий личность первого руководителя</span>
                                <span className="file-name">spravka_o_registracii.pdf</span>
                            </div>
                            </li>
                            <li>
                            <div className="name">
                                <span className="text">Устав юрического лица</span>
                            </div>
                            <button className="btn-icon add"><i className="azla size-18 pin-primary-icon mr-8"></i>Прикрепить файл</button>
                            </li>
                        </ul>
                        </div>
                    </div>
                    
                    <div className="create-page-docs">
                        
                        <div className="d-flex-align-c-spaceb mb-32">
                            <div className="d-grid">
                                <h3 className="title-subhead mb-8">
                                Уполномоченные лица <span className="number">8</span>
                                </h3>
                                <p>
                                Пользователи организации с наличием ЭЦП организации
                                </p>
                            </div>
                            <button className="btn button btn-primary btn-icon"><i className="azla add-plusRound-icon"></i> Добавить</button>
                        </div>

                        {[1, 2, 3].map((s) => (
                        <div className="card mb-24 pad-24">
                          <div className="card-header">
                            <div className="title">
                              <h6 className="text">
                                Султангалиева Камилла Избасарова
                              </h6>
                              <span className="num">№1</span>
                            </div>
                            <p className="desc">
                                Аналитик – Департамент финансового анализа – ТОО “М-Ломбард”
                            </p>
                          </div>
                          <div className="card-body pad-rl-16">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="total-info">
                                  <ul className="info-list">
                                    <li>
                                      <span className="left">
                                        ID пользователя:
                                      </span>
                                      <span className="right">64522352</span>
                                    </li>
                                    <li>
                                      <span className="left">ИИН сотрудника:</span>
                                      <span className="right active-link">
                                        941125352353
                                      </span>
                                    </li>
                                    <li>
                                      <span className="left">Контактный номер:</span>
                                      <span className="right">
                                        +7 (705) 1234-56-78
                                      </span>
                                    </li>
                                    <li>
                                      <span className="left">
                                        Email:
                                      </span>
                                      <span className="right">
                                        sultangaliyeva.k.i@gmail.com
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="total-info">
                                  <ul className="info-list">
                                    <li>
                                      <span className="left">
                                        Первый руководитель:
                                      </span>
                                      <span className="right">
                                        Кусаинов Ахан Ермекович
                                      </span>
                                    </li>
                                    <li>
                                      <span className="left">Заместитель:</span>
                                      <span className="right">Мусаханов Дидар Ерланович</span>
                                    </li>
                                    <li>
                                      <span className="left">
                                        Курирующий менеджер:
                                      </span>
                                      <span className="right">
                                        Константинопольский Александр Александрович
                                      </span>
                                    </li>
                                    <li>
                                      <span className="left">
                                        Контакты менеджера:
                                      </span>
                                      <span className="right">
                                      +7 (705) 1234-56-78,<br/>alex.const@gmail.com
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>


               </div>
                <div className="req-inner-footer">
                    <div className="container">
                        <div className="manager-req mrl-32">
                            <button
                            type="button"
                            className="button btn-primary"
                            onClick={() => {
                              mainStore.setModal(true);
                              mainStore.setModalType(10);
                            }}
                            >
                            Отправить заявку
                            </button>
                        </div>
                    </div>
                </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateRequest;
