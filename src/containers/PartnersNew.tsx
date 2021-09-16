import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  Request,
  AuthPerson,
  PersonStatus,
  SigningAuthority,
} from "../api/Models/ServiceModels";
import "react-tabs/style/react-tabs.css";
import { observer } from "mobx-react";

const PartnersNew = observer((props: any) => {
  const { main, request } = props;
  const [tab, setTab] = React.useState(false);

  React.useEffect(() => {
    request.getRequests();
    request.getAuthPersons(main.clientData.client_id);
  }, []);

  return (
    <div className="main-body">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="create-page p-50 pad-b-128">
              <div className="header-text-inner justify-content-between mb-32">
                <h1 className="title-main mb-32">Новая заявка</h1>
              </div>
              <div className="create-page-inner">
                <h3 className="title-subhead mb-16">Выберите сервис</h3>
                <div className="choose-service">
                  <div className="tab-button">
                    <span
                      className={`tab-btn ${!tab ? "active" : ""}`}
                      onClick={() => setTab(false)}
                    >
                      ЕСБД
                    </span>
                    <span
                      className={`tab-btn ${tab ? "active" : ""}`}
                      onClick={() => setTab(true)}
                    >
                      БДКИ
                    </span>
                  </div>
                  <div className="d-grid ml-24">
                    <p className="small-text mb-0">
                      ЕСБД - Единая Страховая База Данных
                    </p>
                    <p className="small-text mb-0">
                      БДКИ - База Данных Кредитных Историй
                    </p>
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
                          <span className="text">
                            Справка о регистрации/перерегистрации юридического
                            лица
                          </span>
                          <span className="file-name">
                            spravka_o_registracii.pdf
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="name">
                          <span className="text">
                            Решение учредителя с данными о приеме на работу
                            первого руководителя
                          </span>
                          <span className="file-name">
                            spravka_o_registracii.pdf
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="name">
                          <span className="text">
                            Приказ о приеме на работу первого руководителя
                          </span>
                          <span className="file-name">
                            spravka_o_registracii.pdf
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="name">
                          <span className="text">
                            Документ, удостоверяющий личность первого
                            руководителя
                          </span>
                          <span className="file-name">
                            spravka_o_registracii.pdf
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="name">
                          <span className="text">Устав юрического лица</span>
                        </div>
                        <button className="btn-icon add">
                          <i className="azla size-18 pin-primary-icon mr-8"></i>
                          Прикрепить файл
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="create-page-docs">
                  <div className="d-flex-align-c-spaceb mb-32">
                    <div className="d-grid">
                      <h3 className="title-subhead mb-8">
                        Уполномоченные лица{" "}
                        <span className="number">
                          {request._getAuthPersons.length}
                        </span>
                      </h3>
                      <p>Пользователи организации с наличием ЭЦП организации</p>
                    </div>
                    <button className="btn button btn-primary btn-icon">
                      <i className="azla add-plusRound-icon"></i> Добавить
                    </button>
                  </div>

                  {(request._getAuthPersons as AuthPerson[]).map(
                    (a: AuthPerson) => (
                      <div className="card mb-24 pad-24">
                        <div className="card-header">
                          <div className="title">
                            <h6 className="text">{a.full_name}</h6>
                            {/* <span className="num">№1</span> */}
                          </div>
                          <p className="desc">
                            Аналитик – Департамент финансового анализа
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
                                    <span className="right">{a.id}</span>
                                  </li>
                                  <li>
                                    <span className="left">Организация:</span>
                                    <span className="right active-link">
                                      {request._getClient.longname}
                                    </span>
                                  </li>
                                  <li>
                                    <span className="left">Email:</span>
                                    <span className="right">{""}</span>
                                  </li>
                                  <li>
                                    <span className="left">
                                      Контактный номер:
                                    </span>
                                    <span className="right">{""}</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="total-info">
                                <ul className="info-list">
                                  <li>
                                    <span className="left">
                                      Дата регистрации:
                                    </span>
                                    <span className="right">{a.reg_date}</span>
                                  </li>
                                  <li>
                                    <span className="left">Статус:</span>
                                    <span className="right">
                                      {
                                        (
                                          request._getPersonStatus as PersonStatus[]
                                        ).find(
                                          (s: PersonStatus) =>
                                            s.id === a.person_status
                                        )?.name
                                      }
                                    </span>
                                  </li>
                                  <li>
                                    <span className="left">
                                      Основание для подписи:
                                    </span>
                                    <span className="right">
                                      {
                                        (
                                          request._getSigningAuthority as SigningAuthority[]
                                        ).find(
                                          (s: SigningAuthority) =>
                                            s.id === a.sign_auth
                                        )?.name
                                      }
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="req-inner-footer">
                <div className="container">
                  <div className="manager-req mrl-32">
                    <button
                      type="button"
                      className="button btn-primary"
                      onClick={() => {
                        main.setModal(true);
                        main.setModalType(10);
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
});
export default PartnersNew;
