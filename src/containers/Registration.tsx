import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import "react-tabs/style/react-tabs.css";
import { ClientTypes } from "../api/Models/ServiceModels";
import moment from "moment";

const Registration = observer((props: any) => {
  const { main, request } = props;
  const [step] = React.useState(0);
  React.useEffect(() => {
    request.getClient(main.clientData.client_id);
    request.getClientTypes();
  }, []);
  return (
    <section className="register-page">
      <div className="container">
        <form>
          <div className="logo-image">
            <img src={process.env.PUBLIC_URL + "/logo-image.png"} alt="logo" />
          </div>
          {step === 0 ? (
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <h1 className="title-main mb-8">Регистрация</h1>
                <div className="step-reg mb-24">
                  <div className="back-breadcrumbs">
                    <Link to="/" className="back">
                      <i className="azla arrow-left-icon"></i> Назад
                    </Link>
                  </div>
                  <span className="step">Шаг 1 - Профиль организации</span>
                </div>
                <h3 className="title-subhead mb-16">Общие данные</h3>
                <p className="text-desc">
                  Пожалуйста добавьте недостающие данные об организации и
                  проверьте существующие
                </p>
              </div>

              {request._getClient && (
                <div className="col-md-6 offset-md-2">
                  <div className="special-card">
                    <div className="register-input">
                      <div className="form-group-v">
                        <label>Тип клиента:</label>
                        <span>
                          {
                            request._getClientTypes.find(
                              (t: any) =>
                                t.id === request._getClient.client_type
                            )?.name
                          }
                        </span>
                      </div>
                      <div className="form-group-v">
                        <label>Полное наименование:</label>
                        <span>{request._getClient.longname}</span>
                      </div>
                      <div className="form-group-v">
                        <label>Краткое наименование:</label>
                        <span>{request._getClient.name}</span>
                      </div>
                      <div className="form-group-v">
                        <label>БИН клиента:</label>
                        <span>{request._getClient.bin}</span>
                      </div>
                      <div className="form-group-v">
                        <label>Выберите сегмент организации:</label>
                        {console.log(request._getClientTypes)}
                        <select className="form-control-v">
                          <option key="0" value="">
                            Выберите сегмент
                          </option>
                          {request._getClientTypes.map((c: ClientTypes) => (
                            <option key={c.id} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group-v">
                        <label>Дата регистрации:</label>
                        <span>{request._getClient.reg_date}</span>
                      </div>
                      <div className="form-group-v">
                        <label>Адрес сайта клиента:</label>
                        <input
                          className="form-control-v"
                          type="text"
                          placeholder="Введите адрес сайта"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="col-md-8 offset-md-2">
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
                        <button className="btn-icon delete">
                          <i className="azla size-18 trash-icon-alert mr-8"></i>
                          Удалить файл
                        </button>
                      </li>
                      <li>
                        <div className="name">
                          <span className="text">
                            Решение учредителя с данными о приеме на работу
                            первого руководителя
                          </span>
                        </div>
                        <button className="btn-icon add">
                          <i className="azla size-18 pin-primary-icon mr-8"></i>
                          Прикрепить файл
                        </button>
                      </li>
                      <li>
                        <div className="name">
                          <span className="text">
                            Приказ о приеме на работу первого руководителя
                          </span>
                        </div>
                        <button className="btn-icon add">
                          <i className="azla size-18 pin-primary-icon mr-8"></i>
                          Прикрепить файл
                        </button>
                      </li>
                      <li>
                        <div className="name">
                          <span className="text">
                            Документ, удостоверяющий личность первого
                            руководителя
                          </span>
                        </div>
                        <button className="btn-icon add">
                          <i className="azla size-18 pin-primary-icon mr-8"></i>
                          Прикрепить файл
                        </button>
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
                  <button className="button btn-primary table-mr w-160 disabled">
                    Далее
                  </button>
                </div>
              </div>
            </div>
          ) : step === 1 ? (
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <h1 className="title-main mb-8">Регистрация</h1>
                <div className="step-reg mb-24">
                  <div className="back-breadcrumbs">
                    <Link to="/" className="back">
                      <i className="azla arrow-left-icon"></i> Назад
                    </Link>
                  </div>
                  <span className="step">Шаг 2 - Профиль пользователя</span>
                </div>
                <h3 className="title-subhead mb-16">Данные пользователя</h3>
                <p className="text-desc">
                  Пожалуйста проверьте данные пользователя (уполномоченного
                  лица)
                </p>
              </div>

              <div className="col-md-6 offset-md-2">
                <div className="special-card">
                  <div className="register-input">
                    <div className="form-group-v">
                      <label>Название организации:</label>
                      <span>ТОО Астана</span>
                    </div>
                    <div className="form-group-v">
                      <label>ИИН:</label>
                      <input
                        className="form-control-v"
                        type="text"
                        placeholder="Введите ИИН"
                      />
                    </div>
                    <div className="form-group-v">
                      <label>ФИО уполномоченого лица:</label>
                      <span>Бузурбаев Канат</span>
                    </div>
                    <div className="form-group-v">
                      <label>Должность уполномоченого лица</label>
                      <select className="form-control-v">
                        <option>Выберите должность</option>
                      </select>
                    </div>
                    <div className="form-group-v">
                      <label>Основания для подписи</label>
                      <select className="form-control-v">
                        <option>Выберите основание для подписи</option>
                      </select>
                    </div>

                    <div className="form-group-v">
                      <label>Дата регистрации в системе:</label>
                      <span>12.07.2021</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="special-card">
              <h1 className="title-main mb-32">Подать заявку на подключение</h1>
              <h3 className="title-subhead mb-16">Данные организации</h3>
              <p className="text-desc">
                Данные включают в себя информацию о компании, которая собирается
                подключать контр агентов для использования в системе ГКБ
              </p>

              <div className="register-input">
                <div className="form-group">
                  <label>Наименование клиента</label>
                  <input
                    className="form-control"
                    type="name"
                    placeholder="Введите логин"
                  />
                </div>
                <div className="form-group">
                  <label>Тип документа</label>
                  <input
                    className="form-control"
                    type="name"
                    placeholder="Введите пароль"
                  />
                </div>

                <h3 className="title-subhead mb-16 mt-16">Выберите сервисы</h3>

                <Tabs>
                  <TabList>
                    <Tab>ЕСБД</Tab>
                    <Tab>БДКИ</Tab>
                  </TabList>

                  <TabPanel>
                    <div className="checkbox-list">
                      <div className="form-check gkb-checkbox">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="invalidCheck"
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="invalidCheck"
                        >
                          Сервис 1
                        </label>
                        <div className="invalid-feedback">Ошибка</div>
                      </div>

                      <div className="form-check gkb-checkbox">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="invalidCheck1"
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="invalidCheck1"
                        >
                          Сервис 1
                        </label>
                        <div className="invalid-feedback">Ошибка</div>
                      </div>

                      <div className="form-check gkb-checkbox">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="invalidCheck2"
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="invalidCheck2"
                        >
                          Сервис 1
                        </label>
                        <div className="invalid-feedback">Ошибка</div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="checkbox-list">
                      <div className="form-check gkb-checkbox">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="invalidCheck3"
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="invalidCheck3"
                        >
                          Сервис 4
                        </label>
                        <div className="invalid-feedback">Ошибка</div>
                      </div>

                      <div className="form-check gkb-checkbox">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="invalidCheck4"
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="invalidCheck4"
                        >
                          Сервис 5
                        </label>
                        <div className="invalid-feedback">Ошибка</div>
                      </div>

                      <div className="form-check gkb-checkbox">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="invalidCheck5"
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="invalidCheck5"
                        >
                          Сервис 6
                        </label>
                        <div className="invalid-feedback">Ошибка</div>
                      </div>
                    </div>
                  </TabPanel>
                </Tabs>

                <button className="button btn-primary table-ml disabled">
                  Далее
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
});
export default Registration;
