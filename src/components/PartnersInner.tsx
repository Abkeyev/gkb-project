import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AppState from "../ncalayer/state";
import { Link, useHistory } from "react-router-dom";
import "./style.css";

interface RequestProps {
  state: AppState;
  setState: any;
}

const PartnersInner = (props: RequestProps) => {
  const { state, setState } = props;
  const [tab, setTab] = React.useState(false);
  const history = useHistory();
  return (
    <div className="main-body">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="req-manager-inner p-16-50 pad-b-128">
              <div className="req-inner-header">
                <div className="back-breadcrumbs">
                  <Link to="/partners" className="back">
                    <i className="azla arrow-left-icon"></i> Назад
                  </Link>
                  <div className="breadcrumbs">
                    <Link to="/partners">Заявки</Link> /{" "}
                    <span>Заявка №1353</span>
                  </div>
                </div>

                <h1 className="title-main mb-32">
                  Заявка №1353 - ТОО “М-Ломбард”
                </h1>

                {state.decline ? (
                  <div className="mess-card alert-mess mb-32">
                    <h5>Заявка отклонена</h5>
                    <p>Причина: {state.declineReason}</p>
                  </div>
                ) : (
                  <div className="mess-card mb-32">
                    <p>
                      Данная заявка проходит первичную проверку менеджером.
                      Пожалуйста, ожидайте. Среднее время проверки составляет 1
                      день.
                    </p>
                  </div>
                )}

                <div className="status-bar">
                  <ul className="step-progressbar">
                    <li
                      className={`step-item ${
                        state.step === 0
                          ? "step-item-active"
                          : "step-item-complete"
                      }`}
                      onClick={() => setState({ ...state, step: 0 })}
                    >
                      Проверка
                    </li>
                    <li
                      className={`step-item ${
                        state.step === 1
                          ? "step-item-active"
                          : state.step > 1
                          ? "step-item-complete"
                          : ""
                      }`}
                      onClick={() => setState({ ...state, step: 1 })}
                    >
                      Подписание
                      <br />
                      договора
                    </li>
                    <li
                      className={`step-item ${
                        state.step === 2
                          ? "step-item-active"
                          : state.step > 2
                          ? "step-item-complete"
                          : ""
                      }`}
                      onClick={() => setState({ ...state, step: 2 })}
                    >
                      Форма
                      <br />
                      доступа
                    </li>
                    <li
                      className={`step-item ${
                        state.step === 3
                          ? "step-item-active"
                          : state.step > 3
                          ? "step-item-complete"
                          : ""
                      }`}
                      onClick={() => setState({ ...state, step: 3 })}
                    >
                      Тестирование
                    </li>
                    <li
                      className={`step-item ${
                        state.step === 4
                          ? "step-item-active"
                          : state.step > 4
                          ? "step-item-complete"
                          : ""
                      }`}
                      onClick={() => setState({ ...state, step: 4 })}
                    >
                      Готово
                    </li>
                  </ul>
                </div>
              </div>

              {state.step === 0 ? (
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
                      <div className="total-info mb-32">
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
                            <span className="right">
                              <a href="#" className="pre-primary-color">
                                ТОО “М-Ломбард”
                              </a>
                            </span>
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
                            <span className="left">
                              Категория деятельности:
                            </span>
                            <span className="right">Ломбарды</span>
                          </li>
                          <li>
                            <span className="left">Тип сервиса:</span>
                            <span className="right">Изъятие данных</span>
                          </li>
                          <li>
                            <span className="left">
                              Дата регистрации заявки:
                            </span>
                            <span className="right">20 Июня 2021</span>
                          </li>
                          <li>
                            <span className="left">
                              Дата исполнения заявки:
                            </span>
                            <span className="right">20 Июня 2021</span>
                          </li>
                        </ul>
                      </div>

                      <h3 className="title-subhead mb-16">
                        Документы контрагента
                      </h3>
                      <h5 className="title-subhead-h5 mb-16">
                        Организационные документы
                      </h5>

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

                      <h5 className="title-subhead-h5 mb-16">
                        Персональные документы
                      </h5>

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
                          </li>
                          <li>
                            <i className="azla blank-alt-primary-icon"></i>
                            <span>
                              Договор о поставке услуг по изъятию данных из
                              БДКИ.docx
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="tab-content tab-1">
                      <h3 className="title-subhead mb-16">
                        56 заявленных пользователей
                      </h3>

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
                              Аналитик – Департамент финансового анализа – ТОО
                              “М-Ломбард”
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
                </Tabs>
              ) : state.step === 1 ? (
                <div className="req-inner-body">
                  {state.agreement && (
                    <div className="tab-btn-content mb-32">
                      <h3 className="title-subhead mb-16">
                        Выберите тип договора
                      </h3>

                      <div className="tab-button mb-24">
                        <span
                          className={
                            !state.notTypical ? "tab-btn active" : "tab-btn"
                          }
                          onClick={() =>
                            setState({
                              ...state,
                              isOpenModal: true,
                              modalType: 3,
                            })
                          }
                        >
                          Типовой
                        </span>
                        <span
                          className={
                            state.notTypical ? "tab-btn active" : "tab-btn"
                          }
                          onClick={() =>
                            setState({
                              ...state,
                              isOpenModal: true,
                              modalType: 3,
                            })
                          }
                        >
                          Нетиповой
                        </span>
                      </div>

                      {state.notTypical ? (
                        <>
                          <div
                            className={`card-collapse tab-num-2 two-signatory ${
                              state.step2 ? "collapsed" : ""
                            }`}
                          >
                            {/* При сворачивании дается класс "collapsed" */}
                            <div
                              className={`card-collapse-header ${
                                state.agreeParStep === 2 ? "success" : ""
                              }`}
                            >
                              {/* Если все ОКЕЙ то заменяется текст на "Договор подписан" и дается класс "success" */}
                              <div className="collapsing-header">
                                <h3
                                  className={
                                    state.agreeParStep === 2
                                      ? "title-subhead mb-0 done-success"
                                      : "title-subhead mb-0"
                                  }
                                >
                                  {state.agreeParStep === 2
                                    ? "Договор согласован"
                                    : "На согласование: “Договор №314 - вер. 24 от 24 июня"}
                                </h3>
                                <span
                                  className="btn-collapse"
                                  onClick={() =>
                                    setState({ ...state, step2: !state.step2 })
                                  }
                                >
                                  <i className="azla chevron-up-icon"></i>
                                </span>
                              </div>
                              <div className="pad-rl-16 collapse-main">
                                <div className="row">
                                  <div className="col-md-6">
                                    <p className="desc">Нетиповой договор</p>
                                    <button
                                      type="button"
                                      className="button btn-secondary btn-icon"
                                    >
                                      <i className="azla blank-alt-primary-icon"></i>
                                      Скачать договор
                                    </button>
                                  </div>
                                  <div className="col-md-6">
                                    <p className="desc">Менеджер заявки</p>
                                    <div className="profile mt-8">
                                      <img
                                        className="ava"
                                        src={
                                          process.env.PUBLIC_URL +
                                          "/images/def-ava.svg"
                                        }
                                      />
                                      <span className="name">
                                        Султангалиева К.И
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="collapse-content method-main">
                              <div className="collapse-body">
                                <div className="method-signatory">
                                  <div className="method-signatory-add">
                                    {[1].map((s) => (
                                      <>
                                        <div className="method-signatory-header">
                                          <div className="left">
                                            <h4 className="collapse-text mb-8">
                                              Согласующие от ГКБ 1
                                            </h4>
                                            <p className="mb-0">
                                              {3} участников
                                              {state.agreeParStep === 0 && (
                                                <span
                                                  className="delete"
                                                  onClick={() => {}}
                                                >
                                                  Удалить группу
                                                </span>
                                              )}
                                            </p>
                                          </div>
                                          <div className="right">
                                            <p className="text-desc mb-0 mr-8">
                                              Метод согласования:
                                            </p>
                                            <div className="tab-button">
                                              <span
                                                className={`tab-btn ${
                                                  !tab ? "active" : ""
                                                }`}
                                                onClick={() => setTab(false)}
                                              >
                                                Последовательный
                                              </span>
                                              <span
                                                className={`tab-btn ${
                                                  tab ? "active" : ""
                                                }`}
                                                onClick={() => setTab(true)}
                                              >
                                                Параллельный
                                              </span>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="method-add-user">
                                          <div className="method-add-users">
                                            <ul className="method-list-users">
                                              {[1, 2, 3].map((s) => (
                                                <li>
                                                  <div className="left">
                                                    <i className="azla arrow-primary-down-up grab"></i>
                                                    <div className="profile">
                                                      <img
                                                        className="ava"
                                                        src={
                                                          process.env
                                                            .PUBLIC_URL +
                                                          "/images/def-ava.svg"
                                                        }
                                                      />
                                                      <span className="name">
                                                        Султангалиева К.И
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <span className="position">
                                                    Директор
                                                  </span>
                                                  {state.agreeParStep > 0 ? (
                                                    <span className="btn-status not-active">
                                                      Не согласовано
                                                    </span>
                                                  ) : (
                                                    <></>
                                                  )}
                                                </li>
                                              ))}
                                              {state.agreeParStep > 0 &&
                                                [1, 2, 3].map((s, i) => (
                                                  <li>
                                                    <div className="left">
                                                      <i className="azla arrow-primary-down-up grab"></i>
                                                      <div className="profile">
                                                        <img
                                                          className="ava"
                                                          src={
                                                            process.env
                                                              .PUBLIC_URL +
                                                            "/images/def-ava.svg"
                                                          }
                                                        />
                                                        <span className="name">
                                                          Султангалиева К.И
                                                        </span>
                                                      </div>
                                                    </div>
                                                    <span className="position">
                                                      Директор
                                                    </span>
                                                    {i === 0 ? (
                                                      <span className="btn-status not-active">
                                                        Не согласовано
                                                      </span>
                                                    ) : i === 1 ? (
                                                      <span
                                                        className="btn-status done"
                                                        onClick={() =>
                                                          setState({
                                                            ...state,
                                                            agreeParStep: 2,
                                                            step2: false,
                                                            step3: true,
                                                          })
                                                        }
                                                      >
                                                        Согласовано
                                                      </span>
                                                    ) : i === 2 ? (
                                                      <span
                                                        className="btn-status canceled"
                                                        onClick={() =>
                                                          setState({
                                                            ...state,
                                                            isOpenModal: true,
                                                            modalType: 5,
                                                          })
                                                        }
                                                      >
                                                        Отклонено
                                                      </span>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </li>
                                                ))}
                                            </ul>
                                          </div>
                                          {state.agreeParStep === 0 && (
                                            <span
                                              className="add-btn pad-l-56 pad-b-24"
                                              onClick={() =>
                                                setState({
                                                  ...state,
                                                  isOpenModal: true,
                                                  modalType: 4,
                                                })
                                              }
                                            >
                                              <span className="circle">
                                                <i className="azla plus-primary-icon size-18"></i>
                                              </span>
                                              Участники согласования
                                            </span>
                                          )}
                                        </div>
                                      </>
                                    ))}
                                  </div>
                                  {state.agreeParStep === 0 && (
                                    <div
                                      className="method-add-group"
                                      onClick={() => {}}
                                    >
                                      <span className="add-btn">
                                        <span className="circle">
                                          <i className="azla plus-primary-icon size-18"></i>
                                        </span>
                                        Добавить группу
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {state.agreeParStep === 0 && (
                                <div className="collapse-footer">
                                  <button
                                    type="button"
                                    className={`button btn-primary ${
                                      state.agreeGroup.length === 0 ||
                                      state.agreeUsers.length === 0
                                        ? "disabled"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      setState({ ...state, agreeParStep: 1 })
                                    }
                                  >
                                    Отправить на подписание
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          <div
                            className={`card-collapse tab-num-1 ${
                              state.agreeParStep < 2 || !state.step3
                                ? "collapsed "
                                : ""
                            } ${state.agreeParStep < 2 ? "disabled" : ""}`}
                          >
                            {/* При сворачивании дается класс "collapsed" */}
                            <div
                              className={
                                state.signTwoStep === 3
                                  ? "card-collapse-header success"
                                  : ""
                              }
                            >
                              {/* Если все ОКЕЙ то заменяется текст на "Договор подписан" и дается класс "success" */}
                              <div className="collapsing-header">
                                <h3
                                  className={
                                    state.signTwoStep === 3
                                      ? "title-subhead mb-0 done-success"
                                      : "title-subhead mb-0"
                                  }
                                >
                                  {/* При сворачивании дается класс "collapsed" текст стоит "Договор на подписании" */}
                                  {state.signTwoStep === 3
                                    ? "Договор подписан"
                                    : "На подписание: “Договор №314 - вер. 24 от 24 июня"}
                                </h3>
                                <span
                                  className="btn-collapse"
                                  onClick={() =>
                                    setState({ ...state, step3: !state.step3 })
                                  }
                                >
                                  <i className="azla chevron-up-icon"></i>
                                </span>
                              </div>
                              <div className="pad-rl-16 collapse-main">
                                <div className="row">
                                  <div className="col-md-6">
                                    <p className="desc">Типовой договор</p>
                                    <button
                                      type="button"
                                      className="button btn-secondary btn-icon"
                                    >
                                      <i className="azla blank-alt-primary-icon"></i>
                                      Скачать договор
                                    </button>
                                  </div>
                                  <div className="col-md-6">
                                    <p className="desc">Менеджер заявки</p>
                                    <div className="profile mt-8">
                                      <img
                                        className="ava"
                                        src={
                                          process.env.PUBLIC_URL +
                                          "/images/def-ava.svg"
                                        }
                                      />
                                      <span className="name">
                                        Султангалиева К.И
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="collapse-content">
                              <div className="collapse-body">
                                <div className="collapse-signatory mb-24">
                                  <h4 className="collapse-text">
                                    Подписант от ТОО “М-Ломбард”
                                  </h4>

                                  <div className="signatory-profile">
                                    <div className="col-md-6">
                                      <div className="profile">
                                        <img
                                          className="ava"
                                          src={
                                            process.env.PUBLIC_URL +
                                            "/images/def-ava.svg"
                                          }
                                        />
                                        <span className="name">
                                          Кусаинов А.Е.
                                        </span>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="signatory-status">
                                        <p className="desc">Директор</p>
                                        {/* <i className="azla close-red-icon delete-if-icon"></i> */}

                                        {state.signTwoStep === 1 ? (
                                          <button className="btn-status-signatory btn-icon not-active">
                                            <i className="azla edit-white-icon"></i>
                                            Подписать
                                          </button>
                                        ) : state.signTwoStep === 2 ? (
                                          <button
                                            className="btn-status-signatory btn-icon active"
                                            onClick={() =>
                                              setState({
                                                ...state,
                                                signTwoStep: 3,
                                              })
                                            }
                                          >
                                            <i className="azla edit-white-icon"></i>
                                            Подписать
                                          </button>
                                        ) : state.signTwoStep === 3 ? (
                                          <span className="btn-status done">
                                            Подписано
                                          </span>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="collapse-signatory">
                                  <h4 className="collapse-text">
                                    Подписант от АО “Государственное Кредитное
                                    Бюро”
                                  </h4>

                                  {state.signTwoUsers.map((s) => (
                                    <div className="signatory-profile">
                                      <div className="col-md-6">
                                        <div className="profile">
                                          <img
                                            className="ava"
                                            src={
                                              process.env.PUBLIC_URL +
                                              "/images/def-ava.svg"
                                            }
                                          />
                                          <span className="name">
                                            Кусаинов А.Е.
                                          </span>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="signatory-status">
                                          <p className="desc">Директор</p>
                                          {state.signTwoStep === 1 ? (
                                            <span
                                              className="btn-status not-active"
                                              onClick={() =>
                                                setState({
                                                  ...state,
                                                  signTwoStep: 2,
                                                })
                                              }
                                            >
                                              Не Подписано
                                            </span>
                                          ) : state.signTwoStep === 2 ? (
                                            <span className="btn-status done">
                                              Подписано
                                            </span>
                                          ) : state.signTwoStep === 3 ? (
                                            <span className="btn-status done">
                                              Подписано
                                            </span>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}

                                  {/* По дефолту стоит выбор подписанта, после выбора исчезает и добавляется выше дивка, и включается кнопка "Отправить на подписание" */}
                                  <div className="method-add-group pad-l-0">
                                    <span
                                      className="add-btn"
                                      onClick={() =>
                                        setState({
                                          ...state,
                                          isOpenModal: true,
                                          modalType: 6,
                                        })
                                      }
                                    >
                                      <span className="circle">
                                        <i className="azla plus-primary-icon size-18"></i>
                                      </span>
                                      Добавить подписанта
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {state.signTwoStep === 0 && (
                                <div className="collapse-footer">
                                  <button
                                    type="button"
                                    className={`button btn-primary ${
                                      state.signTwoUsers.length === 0
                                        ? "disabled"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      setState({ ...state, signTwoStep: 1 })
                                    }
                                  >
                                    Отправить на подписание
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div
                          className={`card-collapse tab-num-1 ${
                            state.step1 ? "collapsed" : ""
                          }`}
                        >
                          {/* При сворачивании дается класс "collapsed" */}
                          <div
                            className={
                              state.signStep === 3
                                ? "card-collapse-header success"
                                : "card-collapse-header"
                            }
                          >
                            {/* Если все ОКЕЙ то заменяется текст на "Договор подписан" и дается класс "success" */}
                            <div className="collapsing-header">
                              <h3
                                className={
                                  state.signStep === 3
                                    ? "title-subhead mb-0 done-success"
                                    : "title-subhead mb-0"
                                }
                              >
                                {/* При сворачивании дается класс "collapsed" текст стоит "Договор на подписании" */}
                                {state.signStep === 3
                                  ? "Договор подписан"
                                  : "На подписание: “Договор №314 - вер. 24 от 24 июня"}
                              </h3>
                              <span
                                className="btn-collapse"
                                onClick={() =>
                                  setState({ ...state, step1: !state.step1 })
                                }
                              >
                                <i className="azla chevron-up-icon"></i>
                              </span>
                            </div>
                            <div className="pad-rl-16 collapse-main">
                              <div className="row">
                                <div className="col-md-6">
                                  <p className="desc">Типовой договор</p>
                                  <button
                                    type="button"
                                    className="button btn-secondary btn-icon"
                                  >
                                    <i className="azla blank-alt-primary-icon"></i>
                                    Скачать договор
                                  </button>
                                </div>
                                <div className="col-md-6">
                                  <p className="desc">Менеджер заявки</p>
                                  <div className="profile mt-8">
                                    <img
                                      className="ava"
                                      src={
                                        process.env.PUBLIC_URL +
                                        "/images/def-ava.svg"
                                      }
                                    />
                                    <span className="name">
                                      Султангалиева К.И
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="collapse-content">
                            <div className="collapse-body">
                              <div className="collapse-signatory mb-24">
                                <h4 className="collapse-text">
                                  Подписант от ТОО “М-Ломбард”
                                </h4>

                                <div className="signatory-profile">
                                  <div className="col-md-6">
                                    <div className="profile">
                                      <img
                                        className="ava"
                                        src={
                                          process.env.PUBLIC_URL +
                                          "/images/def-ava.svg"
                                        }
                                      />
                                      <span className="name">
                                        Кусаинов А.Е.
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="signatory-status">
                                      <p className="desc">Директор</p>

                                      {state.signStep === 1 ? (
                                        <button
                                          className="btn-status-signatory btn-icon active"
                                          onClick={() =>
                                            setState({ ...state, signStep: 2 })
                                          }
                                        >
                                          <i className="azla edit-white-icon"></i>
                                          Подписать
                                        </button>
                                      ) : state.signStep === 2 ? (
                                        <span className="btn-status done">
                                          Подписано
                                        </span>
                                      ) : state.signStep === 3 ? (
                                        <span className="btn-status done">
                                          Подписано
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                      {/* При подписании дается класс "done" */}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="collapse-signatory">
                                <h4 className="collapse-text">
                                  Подписант от АО “Государственное Кредитное
                                  Бюро”
                                </h4>

                                <div className="signatory-profile">
                                  <div className="col-md-6">
                                    <div className="profile">
                                      <img
                                        className="ava"
                                        src={
                                          process.env.PUBLIC_URL +
                                          "/images/def-ava.svg"
                                        }
                                      />
                                      <span className="name">
                                        Кусаинов А.Е.
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="signatory-status">
                                      <p className="desc">Директор</p>
                                      {/* <i className="azla close-red-icon delete-if-icon"></i> */}

                                      {state.signStep === 1 ? (
                                        <span className="btn-status not-active">
                                          Не Подписано
                                        </span>
                                      ) : state.signStep === 2 ? (
                                        <span
                                          className="btn-status not-active"
                                          onClick={() =>
                                            setState({ ...state, signStep: 3 })
                                          }
                                        >
                                          Не Подписано
                                        </span>
                                      ) : state.signStep === 3 ? (
                                        <span className="btn-status done">
                                          Подписано
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {/* По дефолту стоит выбор подписанта, после выбора исчезает и добавляется выше дивка, и включается кнопка "Отправить на подписание" */}
                                {false && (
                                  <div className="method-add-group pad-l-0">
                                    <span
                                      className="add-btn"
                                      onClick={() =>
                                        setState({
                                          ...state,
                                          isOpenModal: true,
                                          modalType: 6,
                                        })
                                      }
                                    >
                                      <span className="circle">
                                        <i className="azla plus-primary-icon size-18"></i>
                                      </span>
                                      Добавить подписанта
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {state.signStep === 0 && (
                              <div className="collapse-footer">
                                <button
                                  type="button"
                                  className="button btn-primary"
                                  onClick={() =>
                                    setState({ ...state, signStep: 1 })
                                  }
                                >
                                  Отправить на подписание
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="d-flex-align-c-spaceb mb-32">
                    <h3 className="title-subhead">
                      История изменения договора{" "}
                      <span className="number">4</span>
                    </h3>
                    <button type="button" className="button btn-secondary">
                      Загрузить договор
                    </button>
                  </div>
                  <table className="table req-table">
                    <thead>
                      <tr>
                        <th>Название</th>
                        <th>Дата загрузки</th>
                        <th>Комментарий</th>
                        <th>Автор</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4].map((m) => (
                        <tr
                          onClick={() =>
                            setState({
                              ...state,
                              isOpenModal: true,
                              modalType: 2,
                            })
                          }
                        >
                          <td>Договор вер. 2.4255</td>
                          <td>24 Июня 2021</td>
                          <td>Изменили что-то</td>
                          <td>Султангалиева К.И</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <h3 className="title-subhead mb-16">Документы контрагента</h3>
                  <h5 className="title-subhead-h5 mb-16">
                    Организационные документы
                  </h5>

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

                  <h5 className="title-subhead-h5 mb-16">
                    Персональные документы
                  </h5>

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
                </div>
              ) : state.step === 2 ? (
                <>
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
                          Аналитик – Департамент финансового анализа – ТОО
                          “М-Ломбард”
                        </p>
                      </div>
                      <div className="card-body pad-rl-16">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="total-info">
                              <ul className="info-list">
                                <li>
                                  <span className="left">ID пользователя:</span>
                                  <span className="right">64522352</span>
                                </li>
                                <li>
                                  <span className="left">ИИН сотрудника:</span>
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
                                    Константинопольский Александр Александрович
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
                </>
              ) : state.step === 3 ? (
                <>
                  <div className="pad-b-128">
                    <div className="req-inner-body">
                      <div className="pad-rl-16">
                        <div className="row">
                          <div className="col-md-8">
                            <h3 className="title-subhead mb-16">
                              Тестирование сервисов
                            </h3>
                            <div className="files-added">
                              <ul className="files-list">
                                <li>
                                  <i className="azla blank-alt-primary-icon"></i>
                                  <span>Протокол тестирования.docx</span>
                                </li>
                                <li>
                                  <i className="azla blank-alt-primary-icon"></i>
                                  <span>Акт тестирования.pdf</span>
                                </li>
                              </ul>
                            </div>

                            <h3 className="title-subhead mb-16">
                              Тестирование сервисов
                            </h3>
                            <p className="text-desc">
                              Amet minim mollit non deserunt ullamco est sit
                              aliqua dolor do amet sint. Velit officia consequat
                              duis enim velit mollit. Exercitation veniam
                              consequat sunt nostrud amet.
                            </p>
                          </div>
                          <div className="col-md-3 offset-md-1">
                            <div className="keys-add">
                              <h3 className="title-subhead mb-16">
                                Ключи доступа
                              </h3>
                              <div className="keys-loader mb-32">
                                <h5>
                                  Тестовые ключи не предоставлены. Ожидайте.
                                </h5>
                                <p>
                                  Ключи предоставляются департаментом Service
                                  Desk после проверки всех данных контрагента.
                                  Это занимает 2-7 дней с момента принятия формы
                                  доступа менеджером.
                                </p>
                              </div>
                              <div className="keys-btn">
                                <button
                                  type="button"
                                  className="btn-file btn-icon"
                                >
                                  Скачать тестовые ключи
                                </button>
                                <button
                                  type="button"
                                  className="btn-file btn-icon"
                                >
                                  Скачать боевые ключи
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : state.step === 4 ? (
                <>
                  <div className="pad-b-128">
                    <div className="done-request">
                      <h3 className="title-subhead mb-16">
                        Контрагент успешно зарегистрирован!
                      </h3>

                      <h5 className="title-subhead-h5 mb-16">
                        Организационные документы
                      </h5>

                      <div className="pad-rl-16 mb-32">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="total-info">
                              <ul className="info-list">
                                <li>
                                  <span className="left">Номер заявки:</span>
                                  <span className="right">41252526</span>
                                </li>
                                <li>
                                  <span className="left">Статус заявки:</span>
                                  <span className="right">941125352353</span>
                                </li>
                                <li>
                                  <span className="left">Организация:</span>
                                  <span className="right">ТОО “М-Ломбард”</span>
                                </li>
                                <li>
                                  <span className="left">БИН:</span>
                                  <span className="right">123456789098</span>
                                </li>
                                <li>
                                  <span className="left">
                                    Категория деятельности:
                                  </span>
                                  <span className="right">Ломбарды</span>
                                </li>
                                <li>
                                  <span className="left">Тип сервиса:</span>
                                  <span className="right">Изъятие данных</span>
                                </li>
                                <li>
                                  <span className="left">
                                    Дата регистрации заявки:
                                  </span>
                                  <span className="right">20 Июня 2021</span>
                                </li>
                                <li>
                                  <span className="left">
                                    Дата исполнения заявки:
                                  </span>
                                  <span className="right">20 Июня 2021</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <h5 className="title-subhead-h5 mb-16">Документы</h5>
                      <div className="files-added">
                        <ul className="files-list">
                          <li>
                            <i className="azla blank-alt-primary-icon"></i>
                            <span>
                              Договор МЛомбард-ГКБ от 22 Июня 2021.pdf
                            </span>
                          </li>
                          <li>
                            <i className="azla blank-alt-primary-icon"></i>
                            <span>Форма доступа.pdf</span>
                          </li>
                          <li>
                            <i className="azla blank-alt-primary-icon"></i>
                            <span>Акт прохождения тестирования</span>
                          </li>
                          <li>
                            <i className="azla blank-alt-primary-icon"></i>
                            <span>Акт прохождения тестирования</span>
                          </li>
                        </ul>
                      </div>

                      <h5 className="title-subhead-h5 mb-16">Ключи доступа</h5>
                      <div className="d-flex">
                        <button
                          type="button"
                          className="button btn-secondary mr-16"
                        >
                          Скачать тестовые ключи
                        </button>
                        <button type="button" className="button btn-secondary">
                          Скачать боевые ключи
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
              {/* step 0-4 */}

              <div className="req-inner-footer">
                <div className="container">
                  {state.modalManager && state.step === 0 ? (
                    <div className="manager-req mrl-32">
                      <div className="left">
                        <p>Менеджер заявки</p>
                        <div className="profile">
                          <img
                            className="ava"
                            src={process.env.PUBLIC_URL + "/images/def-ava.svg"}
                          />
                          <span className="name">Султангалиева К.И</span>
                        </div>
                      </div>

                      {state.decline ? (
                        <div className="right alert">
                          <p>Заявка отклонена</p>
                          <button
                            className="button btn-secondary"
                            onClick={() => {
                              setState({
                                ...state,
                                declineReason: "",
                                decline: false,
                                tab: 3,
                              });

                              history.push("/partners");
                            }}
                          >
                            В архив
                          </button>
                        </div>
                      ) : (
                        <div className="right">
                          <p>Первичная проверка прошла успешно?</p>
                          <button
                            className="button btn-secondary mr-8"
                            onClick={() => {
                              setState({
                                ...state,
                                isOpenModal: true,
                                modalType: 1,
                              });
                            }}
                          >
                            Нет
                          </button>
                          <button
                            className="button btn-primary"
                            onClick={() =>
                              setState({
                                ...state,
                                step: 1,
                              })
                            }
                          >
                            Да, успешно
                          </button>
                        </div>
                      )}
                    </div>
                  ) : state.step === 0 ? (
                    <button
                      type="button"
                      onClick={() =>
                        setState({
                          ...state,
                          isOpenModal: true,
                        })
                      }
                      className="button btn-primary mrl-32"
                    >
                      Назначить
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PartnersInner;
