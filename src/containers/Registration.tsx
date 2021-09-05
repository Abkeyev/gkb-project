import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useHistory, Link } from "react-router-dom";
import "react-tabs/style/react-tabs.css";

const Registration = () => {
  const [step, setStep] = React.useState(0);
  return (
    <section className="register-page">
      <div className="container">
            <form>
              <div className="logo-image">
                <img src={
                        process.env.PUBLIC_URL +
                        "/logo-image.png"
                      }/>
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
                  Пожалуйста добавьте недостающие данные об организации и проверьте существующие
                  </p>
                  </div>

                  <div className="col-md-6 offset-md-2">
                  <div className="special-card">
                  <div className="register-input">
                    <div className="form-group-v">
                      <label>Тип клиента:</label>
                      <span>000487320</span>
                    </div>
                    <div className="form-group-v">
                      <label>Полное наименование:</label>
                      <span>ТОО “М-Ломбард”</span>
                    </div>
                    <div className="form-group-v">
                      <label>Краткое наименование:</label>
                      <span>М-Ломбард</span>
                    </div>
                    <div className="form-group-v">
                      <label>БИН клиента:</label>
                      <span>849930046783939442</span>
                    </div>
                    <div className="form-group-v">
                      <label>Выберите сегмент организации:</label>
                      <select className="form-control-v">
                        <option>Выберите сегмент</option>
                      </select>
                    </div>
                    <div className="form-group-v">
                      <label>Дата регистрации:</label>
                      <span>12.07.2021</span>
                    </div>
                    <div className="form-group-v">
                      <label>Адрес сайта клиента:</label>
                      <input className="form-control-v" type="text" placeholder="Введите адрес сайта" />
                    </div>

                  </div>
                </div>
           </div>
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
                            <span className="text">Справка о регистрации/перерегистрации юридического лица</span>
                            <span className="file-name">spravka_o_registracii.pdf</span>
                          </div>
                          <button className="btn-icon delete"><i className="azla size-18 trash-icon-alert mr-8"></i>Удалить файл</button>
                        </li>
                        <li>
                          <div className="name">
                            <span className="text">Решение учредителя с данными о приеме на работу первого руководителя</span>
                          </div>
                          <button className="btn-icon add"><i className="azla size-18 pin-primary-icon mr-8"></i>Прикрепить файл</button>
                        </li>
                        <li>
                          <div className="name">
                            <span className="text">Приказ о приеме на работу первого руководителя</span>
                          </div>
                          <button className="btn-icon add"><i className="azla size-18 pin-primary-icon mr-8"></i>Прикрепить файл</button>
                        </li>
                        <li>
                          <div className="name">
                            <span className="text">Документ, удостоверяющий личность первого руководителя</span>
                          </div>
                          <button className="btn-icon add"><i className="azla size-18 pin-primary-icon mr-8"></i>Прикрепить файл</button>
                        </li>
                        <li>
                          <div className="name">
                            <span className="text">Устав юрического лица</span>
                          </div>
                          <button className="btn-icon add"><i className="azla size-18 pin-primary-icon mr-8"></i>Прикрепить файл</button>
                        </li>
                      </ul>
                    </div>
                    <button className="button btn-primary table-mr w-160" onClick={() => setStep(1)}>
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
                          Пожалуйста проверьте данные пользователя (уполномоченного лица)
                          </p>
                          </div>

                          <div className="col-md-6 offset-md-2 mt-16">
                          <div className="special-card mb-32">
                          <div className="register-input">
                            <div className="form-group-v">
                              <label>Название организации:</label>
                              <span>ТОО Астана</span>
                            </div>
                            <div className="form-group-v">
                              <label>ИИН:</label>
                              <input className="form-control-v" type="text" placeholder="Введите ИИН" />
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

                    <button className="button btn-primary table-mr" onClick={() => setStep(2)} >
                      Завершить регистрацию
                    </button>
                  </div>
                  </div>
              ) : (
                <div className="row">
                  <div className="col-md-8 offset-md-2">
                  <div className="special-card">
                    <h1 className="title-main mb-8">Регистрация</h1>
                      <div className="step-reg mb-24">
                        <span className="step">Профиль пользователя</span>
                        </div>
                    </div>
                  </div>
                  <div className="col-md-6 offset-md-2 mt-16">
                          <div className="special-card mb-32">
                          <div className="register-input">
                            <div className="form-group-v">
                              <label>Название организации:</label>
                              <span>ТОО Астана</span>
                            </div>
                            <div className="form-group-v">
                              <label>ИИН клиента:</label>
                              <span>940403888390</span>
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
                  <div className="col-md-8 offset-md-2">
                    <div className="special-card">
                            <h3 className="title-subhead mb-16 mt-32">Документы</h3>
                            <p className="text-desc">
                              Пожалуйста прикрепите следующие документы
                            </p>
                            <div className="reg-file-add mb-32">
                              <ul>
                                <li>
                                  <div className="name">
                                    <span className="text">Доверенность на подписанта, если подписантом выступает данный пользователь</span>
                                    <span className="file-name">spravka_o_registracii.pdf</span>
                                  </div>
                                  <button className="btn-icon delete"><i className="azla size-18 trash-icon-alert mr-8"></i>Удалить файл</button>
                                </li>
                                <li>
                                  <div className="name">
                                    <span className="text">Документ, удостоверяющий личность подписанта (данного пользователя)</span>
                                  </div>
                                  <button className="btn-icon add"><i className="azla size-18 pin-primary-icon mr-8"></i>Прикрепить файл</button>
                                </li>
                              </ul>
                            </div>
                            <button className="button btn-primary table-mr" onClick={() => setStep(1)} disabled>
                            Завершить регистрацию
                            </button>
                    </div>
                  </div>
                </div>
              )}
            </form>
      </div>
    </section>
  );
};
export default Registration;
