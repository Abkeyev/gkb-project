import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

const ServiceInner = observer((props: any) => {
  return (
    <div className="main-body">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="my-organization p-50 pad-b-128">
              <div className="header-text-inner justify-content-between mb-32">
                <div className="back-breadcrumbs">
                  <Link to="/organization" className="back">
                    <i className="azla arrow-left-icon"></i> Назад
                  </Link>
                  <div className="breadcrumbs">
                    <Link to="/organization">Моя организация</Link> /{" "}
                    <span>Подключенные услуги</span>
                  </div>
                </div>

                <h1 className="title-main mb-32">Название услуги</h1>
              </div>
              <Tabs>
                <div className="mb-32">
                  <TabList>
                    <Tab>Общее</Tab>
                    <Tab>Пользователи услуг</Tab>
                  </TabList>
                </div>
                <div className="req-inner-body pad-b-128">
                  <TabPanel>
                    <h3 className="title-subhead mb-16">Общие данные</h3>
                    <div className="total-info mb-32">
                      <ul className="info-list">
                        <li>
                          <span className="left">Название услуги:</span>
                          <span className="right">Услуга 1</span>
                        </li>
                        <li>
                          <span className="left">Клиент:</span>
                          <span className="right">ТОО “М-Ломбард”</span>
                        </li>
                        <li>
                          <span className="left">Категория сервиса:</span>
                          <span className="right">БДКИ</span>
                        </li>
                        <li>
                          <span className="left">Тип сервиса:</span>
                          <span className="right">Изъятие данных</span>
                        </li>
                        <li>
                          <span className="left">Заявка:</span>
                          <span className="right">Заявка №135</span>
                        </li>
                        <li>
                          <span className="left">Заявка:</span>
                          <span className="right">Заявка №135</span>
                        </li>
                      </ul>
                    </div>

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
                            onClick={
                              () => {}
                              // setState({
                              //   ...state,
                              //   isOpenModal: true,
                              //   modalType: 8,
                              // })
                            }
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
                        Пользователи услуг <span className="number">24</span>
                      </h3>

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
                                      <span className="right">
                                        941125352353
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
                    </div>
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
export default ServiceInner;
