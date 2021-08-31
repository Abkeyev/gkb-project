import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Registration = () => {
  const [step, setStep] = React.useState(0);
  return (
    <section className="register-page">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form>
              {step === 0 ? (
                <div className="special-card">
                  <h1 className="title-main mb-32">Регистрация</h1>
                  <h3 className="title-subhead mb-16">Данные организации</h3>
                  <p className="text-desc">
                    Пожалуйста добавьте недостающие данные и проверьте
                    существующие
                  </p>

                  <div className="register-input">
                    <div className="form-group">
                      <label>Тип клиента</label>
                      <input
                        className="form-control"
                        type="name"
                        placeholder="Введите логин"
                      />
                    </div>
                    <div className="form-group">
                      <label>Полное наименование</label>
                      <input
                        className="form-control"
                        type="name"
                        placeholder="Введите пароль"
                      />
                    </div>
                    <div className="form-group">
                      <label>Краткое наименование</label>
                      <input
                        className="form-control check-icon"
                        type="name"
                        placeholder="Введите пароль"
                      />
                    </div>
                    <div className="form-group">
                      <label>Адрес сайта клиента</label>
                      <input
                        className="form-control"
                        type="name"
                        placeholder="Введите пароль"
                      />
                    </div>
                    <div className="form-group">
                      <label>БИН клиента</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Введите пароль"
                      />
                    </div>
                    <div className="form-group">
                      <label>Дата регистрации в системе</label>
                      <input
                        className="form-control"
                        type="date"
                        placeholder="Введите пароль"
                      />
                    </div>
                    <button className="button btn-primary table-ml disabled">
                      Далее
                    </button>
                  </div>
                </div>
              ) : step === 1 ? (
                <div className="special-card">
                  <h1 className="title-main mb-32">Регистрация</h1>
                  <h3 className="title-subhead mb-16">Данные о пользователе</h3>
                  <p className="text-desc">Пожалуйста проверьте данные</p>

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
                      <label>ИИН клиента</label>
                      <input
                        className="form-control"
                        type="name"
                        placeholder="Введите пароль"
                      />
                    </div>
                    <div className="form-group">
                      <label>ФИО уполномоченого лица</label>
                      <input
                        className="form-control check-icon"
                        type="name"
                        placeholder="Введите пароль"
                      />
                    </div>
                    <div className="form-group">
                      <label>Должность уполномоченого лица</label>
                      <select className="form-control">
                        <option>Директор</option>
                        <option>123</option>
                        <option>123</option>
                      </select>
                    </div>
                    <div className="form-group is-invalid">
                      <label>Основания для подписи</label>

                      <select className="form-control">
                        <option>020749929</option>
                        <option>123</option>
                        <option>123</option>
                      </select>
                      <div className="invalid-feedback"> Заполните поле</div>
                    </div>
                    <div className="form-group">
                      <label>Дата регистрации в системе</label>
                      <input
                        className="form-control"
                        type="date"
                        placeholder="Введите пароль"
                      />
                    </div>
                    <button className="button btn-primary table-ml disabled">
                      Далее
                    </button>
                  </div>
                </div>
              ) : (
                <div className="special-card">
                  <h1 className="title-main mb-32">
                    Подать заявку на подключение
                  </h1>
                  <h3 className="title-subhead mb-16">Данные организации</h3>
                  <p className="text-desc">
                    Данные включают в себя информацию о компании, которая
                    собирается подключать контр агентов для использования в
                    системе ГКБ
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

                    <h3 className="title-subhead mb-16 mt-16">
                      Выберите сервисы
                    </h3>

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
        </div>
      </div>
    </section>
  );
};
export default Registration;
