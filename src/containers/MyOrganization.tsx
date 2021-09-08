import React from "react";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { AppContext } from "../AppContext";

const MyOrganization = observer(() => {
  const history = useHistory();
  const { mainStore } = React.useContext(AppContext);

  return (
    <div className="main-body">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="my-organization p-50 pad-b-128">
              <div className="header-text justify-content-between mb-32">
                <h1 className="title-main">Моя организация</h1>
              </div>
              <Tabs>
                <div className="mb-32">
                  <TabList>
                    <Tab>Общее</Tab>
                    <Tab>Документы</Tab>
                    <Tab>Пользователи</Tab>
                    <Tab>Подключенные услуги</Tab>
                    <Tab>Пользователи услуг</Tab>
                  </TabList>
                </div>
                <div className="req-inner-body pad-b-128">
                  <TabPanel>
                    <h3 className="title-subhead mb-16">Об организации</h3>
                    <div className="total-info mb-32">
                      <ul className="info-list">
                        <li>
                          <span className="left">Полное наименование:</span>
                          <span className="right">
                            Товарищество с ограниченной ответсвенностью
                            “М-Ломбард”
                          </span>
                        </li>
                        <li>
                          <span className="left">Краткое наименование:</span>
                          <span className="right">М-Ломбард</span>
                        </li>
                        <li>
                          <span className="left">БИН:</span>
                          <span className="right">123456789098</span>
                        </li>
                        <li>
                          <span className="left">Вебсайт:</span>
                          <span className="right d-flex">
                            <a
                              href="https://google.kz"
                              target="_blank"
                              className="pre-primary-color"
                            >
                              www.m-lombard.kz
                            </a>{" "}
                            <span className="edit">
                              <i className="azla edit-primary-icon ml-8"></i>
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="left">Тип клиента:</span>
                          <span className="right">Ломбарды</span>
                        </li>
                        <li>
                          <span className="left">Уполномоченное лицо:</span>
                          <span className="right d-flex">
                            Рахметтуллин Рахметулла Рахметуллаевич{" "}
                            <span className="edit">
                              <i className="azla edit-primary-icon ml-8"></i>
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="left">Дата регистрации заявки:</span>
                          <span className="right">20 Июня 2021</span>
                        </li>
                        <li>
                          <span className="left">ОКЭД:</span>
                          <span className="right">
                            90.3.1 - Финансовая деятельность
                          </span>
                        </li>
                      </ul>
                    </div>

                    <h3 className="title-subhead mb-16">Контакты и адреса</h3>

                    <div className="total-info mb-32">
                      <ul className="info-list">
                        <li>
                          <span className="left">Контакты:</span>
                          <span className="right d-flex">
                            +7 (727) 245-94-94 (рабочий)
                            <br />
                            +7 (706) 123-45-67 (моб){" "}
                            <span className="edit">
                              <i className="azla edit-primary-icon ml-8"></i>
                            </span>
                          </span>
                          {/* <span>+7 (727) 245-94-94 (рабочий)</span><span>+7 (706) 123-45-67 (моб)</span> */}
                        </li>
                        <li>
                          <span className="left">Фактический адрес:</span>
                          <span className="right d-flex">
                            г. Алматы, ул. Тажибаевой 47, БЦ “Иван”, этаж 24{" "}
                            <span className="edit">
                              <i className="azla edit-primary-icon ml-8"></i>
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="left">Юридический адрес:</span>
                          <span className="right d-flex">
                            г. Алматы, ул. Тажибаевой 47, БЦ “Иван”, этаж 24{" "}
                            <span
                              className="edit"
                              onClick={() => {
                                mainStore.setModal(true);
                                mainStore.setModalType(7);
                              }}
                            >
                              <i className="azla edit-primary-icon ml-8"></i>
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="left">Полный адрес:</span>
                          <span className="right d-flex">
                            Республика Казахстан, г. Алматы, ул. Тажибаевой 47,
                            БЦ “Иван”, этаж 24, 050042{" "}
                            <span className="edit">
                              <i className="azla edit-primary-icon ml-8"></i>
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="left">Индекс:</span>
                          <span className="right d-flex">
                            050042{" "}
                            <span className="edit">
                              <i className="azla edit-primary-icon ml-8"></i>
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="left">Область:</span>
                          <span className="right d-flex">
                            Алматинская область{" "}
                            <span className="edit">
                              <i className="azla edit-primary-icon ml-8"></i>
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="left">Район:</span>
                          <span className="right d-flex">
                            Алматинский{" "}
                            <span className="edit">
                              <i className="azla edit-primary-icon ml-8"></i>
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="left">Город:</span>
                          <span className="right d-flex">
                            Алматы{" "}
                            <span className="edit">
                              <i className="azla edit-primary-icon ml-8"></i>
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="left">Дом/здание:</span>
                          <span className="right d-flex">
                            Тажибаевой{" "}
                            <span className="edit">
                              <i className="azla edit-primary-icon ml-8"></i>
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="left">Улица:</span>
                          <span className="right d-flex">
                            44{" "}
                            <span className="edit">
                              <i className="azla edit-primary-icon ml-8"></i>
                            </span>
                          </span>
                        </li>
                      </ul>
                    </div>

                    <h3 className="title-subhead mb-16">
                      Банковские реквизиты
                    </h3>

                    <div className="total-info mb-32">
                      <ul className="info-list">
                        <li>
                          <span className="left">ИИК:</span>
                          <span className="right d-flex">
                            KZ0523523SRQW125{" "}
                            <span className="edit">
                              <i className="azla edit-primary-icon ml-8"></i>
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="left">БИК:</span>
                          <span className="right d-flex">
                            CASPKAKZ{" "}
                            <span className="edit">
                              <i className="azla edit-primary-icon ml-8"></i>
                            </span>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <h3 className="title-subhead mb-16">Документы</h3>
                    <h5 className="title-subhead-h5 mb-16">
                      Организационные документы
                    </h5>

                    <div className="files-added">
                      <ul className="files-list">
                        <li className="active">
                          {" "}
                          {/* Если файл добавлен то класс li становится active */}
                          <i className="azla blank-alt-primary-icon"></i>
                          <span>Устав ТОО “М-Ломбард”.pdf</span>
                          <i
                            className="trash azla trash-icon-alert"
                            onClick={() => {
                              mainStore.setModal(true);
                              mainStore.setModalType(8);
                            }}
                          ></i>
                        </li>
                        <li>
                          <i className="azla blank-alt-primary-icon"></i>
                          <span>Документ 3</span>
                          <i className="trash azla trash-icon-alert"></i>
                        </li>
                        <li>
                          <i className="azla blank-alt-primary-icon"></i>
                          <span>Документ 4</span>
                          <i className="trash azla trash-icon-alert"></i>
                        </li>
                      </ul>
                    </div>

                    <h5 className="title-subhead-h5 mb-16">
                      Персональные документы
                    </h5>

                    <div className="files-added">
                      <ul className="files-list">
                        <li>
                          <i className="azla blank-alt-primary-icon"></i>
                          <span>Документ 1</span>
                          <i className="trash azla trash-icon-alert"></i>
                        </li>
                        <li>
                          <i className="azla blank-alt-primary-icon"></i>
                          <span>Документ 2</span>
                          <i className="trash azla trash-icon-alert"></i>
                        </li>
                        <li>
                          <i className="azla blank-alt-primary-icon"></i>
                          <span>Документ 3</span>
                          <i className="trash azla trash-icon-alert"></i>
                        </li>
                        <li>
                          <i className="azla blank-alt-primary-icon"></i>
                          <span>Документ 4</span>
                          <i className="trash azla trash-icon-alert"></i>
                        </li>
                        <li>
                          <i className="azla blank-alt-primary-icon"></i>
                          <span>Документ 5</span>
                          <i className="trash azla trash-icon-alert"></i>
                        </li>
                      </ul>
                    </div>

                    <h5 className="title-subhead-h5 mb-16">
                      Существующие договоры
                    </h5>

                    <div className="files-added">
                      <ul className="files-list">
                        <li>
                          <i className="azla blank-alt-primary-icon"></i>
                          <span>
                            Договор о поставке услуг по изъятию данных из
                            БДКИ.docx
                          </span>
                          <i className="trash azla trash-icon-alert"></i>
                        </li>
                        <li>
                          <i className="azla blank-alt-primary-icon"></i>
                          <span>
                            Договор о поставке услуг по изъятию данных из
                            ЕСБД.docx
                          </span>
                          <i className="trash azla trash-icon-alert"></i>
                        </li>
                      </ul>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="tab-content tab-1">
                      <h3 className="title-subhead mb-8">
                        Уполномоченные лица <span className="number">4</span>
                      </h3>
                      <p className="mb-24">
                        Пользователи организации с наличием ЭЦП организации
                      </p>

                      {[1, 2, 3].map((s) => (
                        <div className="card mb-24 pad-24">
                          <div className="card-header">
                            <div className="title">
                              <h6 className="text">
                                Султангалиева Камилла Избасарова
                              </h6>
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
                                      <span className="right">64522352</span>
                                    </li>
                                    <li>
                                      <span className="left">Организация:</span>
                                      <span className="right active-link">
                                        ТОО “М-Ломбард”
                                      </span>
                                    </li>
                                    <li>
                                      <span className="left">Email:</span>
                                      <span className="right">
                                        sultangaliyeva.k.i@gmail.com
                                      </span>
                                    </li>
                                    <li>
                                      <span className="left">
                                        Контактный номер:
                                      </span>
                                      <span className="right">
                                        +7 (705) 1234-56-78
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
                                        Дата регистрации:
                                      </span>
                                      <span className="right">
                                        20 Августа 2021
                                      </span>
                                    </li>
                                    <li>
                                      <span className="left">Статус:</span>
                                      <span className="right">Активный</span>
                                    </li>
                                    <li>
                                      <span className="left">
                                        Основание для подписи:
                                      </span>
                                      <span className="right">
                                        Доверенность
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      <h3 className="title-subhead mb-8">
                        Пользователи <span className="number">4</span>
                      </h3>
                      <p className="mb-24">
                        Пользователи организации с наличием ЭЦП организации
                      </p>

                      {[1, 2, 3].map((s) => (
                        <div className="card mb-24 pad-24">
                          <div className="card-header">
                            <div className="title">
                              <h6 className="text">
                                Султангалиева Камилла Избасарова
                              </h6>
                              <span
                                className="edit-btn underline"
                                onClick={() => {
                                  mainStore.setModal(true);
                                  mainStore.setModalType(9);
                                }}
                              >
                                <i className="azla edit-primary-icon mr-8"></i>{" "}
                                Редактировать
                              </span>
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
                                      <span className="right">64522352</span>
                                    </li>
                                    <li>
                                      <span className="left">Организация:</span>
                                      <span className="right active-link">
                                        ТОО “М-Ломбард”
                                      </span>
                                    </li>
                                    <li>
                                      <span className="left">Email:</span>
                                      <span className="right">
                                        sultangaliyeva.k.i@gmail.com
                                      </span>
                                    </li>
                                    <li>
                                      <span className="left">
                                        Контактный номер:
                                      </span>
                                      <span className="right">
                                        +7 (705) 1234-56-78
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
                                        Дата регистрации:
                                      </span>
                                      <span className="right">
                                        20 Августа 2021
                                      </span>
                                    </li>
                                    <li>
                                      <span className="left">Статус:</span>
                                      <span className="right">Активный</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="tab-content tab-4">
                      <h3 className="title-subhead mb-16">
                        Подключенные услуги
                      </h3>
                      <table className="table req-table td-frist">
                        <thead>
                          <tr>
                            <th>Название услуги</th>
                            <th>Категория</th>
                            <th>Начало услуги</th>
                            <th>Окончание услуги</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[1, 2, 3, 4].map((m) => (
                            <tr
                              onClick={() =>
                                history.push("/organization/title")
                              }
                            >
                              <td>Услуга 1</td>
                              <td>БДКИ</td>
                              <td>25.08.2021</td>
                              <td>12.12.2021</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <h3 className="title-subhead mb-8">Пользователи услуг</h3>
                    <p className="mb-24">
                      Пользователи организации, которые имеют доступ к сервисам
                      БДКИ и ЕСБД
                    </p>

                    {[1, 2, 3].map((s) => (
                      <div className="card mb-24 pad-24">
                        <div className="card-header">
                          <div className="title">
                            <h6 className="text">
                              Султангалиева Камилла Избасарова
                            </h6>
                            <div className="d-flex">
                              <span className="edit-btn underline mr-16">
                                <i className="azla edit-primary-icon mr-8"></i>{" "}
                                Редактировать
                              </span>
                              <span className="num">№1</span>
                            </div>
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
                                    <span className="right">64522352</span>
                                  </li>
                                  <li>
                                    <span className="left">
                                      ИИН сотрудника:
                                    </span>
                                    <span className="right">941125352353</span>
                                  </li>
                                  <li>
                                    <span className="left">
                                      Контактный номер:
                                    </span>
                                    <span className="right">
                                      +7 (705) 1234-56-78
                                    </span>
                                  </li>
                                  <li>
                                    <span className="left">Email:</span>
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
                                    <span className="right">
                                      Мусаханов Дидар Ерланович
                                    </span>
                                  </li>
                                  <li>
                                    <span className="left">
                                      Курирующий менеджер:
                                    </span>
                                    <span className="right">
                                      Константинопольский Александр
                                      Александрович
                                    </span>
                                  </li>
                                  <li>
                                    <span className="left">
                                      Контакты менеджера:
                                    </span>
                                    <span className="right">
                                      +7 (705) 1234-56-78,
                                      <br />
                                      alex.const@gmail.com
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabPanel>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default MyOrganization;
