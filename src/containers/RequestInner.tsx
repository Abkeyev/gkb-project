import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AppState from "../ncalayer/state";
import { Link, useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import { AppContext } from "../AppContext";

const RequestInner = observer(() => {
  const [tab, setTab] = React.useState(false);
  const [step1, setStep1] = React.useState(false);
  const [step2, setStep2] = React.useState(false);
  const [step3, setStep3] = React.useState(false);
  const history = useHistory();
  const { mainStore, requestStore } = React.useContext(AppContext);
  return (
    <div className="main-body">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="req-manager-inner p-16-50 pad-b-128">
              <div className="req-inner-header">
                <div className="back-breadcrumbs">
                  <Link to="/request" className="back">
                    <i className="azla arrow-left-icon"></i> Назад
                  </Link>
                  <div className="breadcrumbs">
                    <Link to="/request">Заявки</Link> /{" "}
                    <span>Заявка №1353</span>
                  </div>
                </div>

                <h1 className="title-main mb-32">
                  Заявка №1353 - ТОО “М-Ломбард”
                </h1>

                {mainStore.decline && (
                  <div className="mess-card alert-mess mb-32 col-md-8">
                    <h5>Заявка отклонена</h5>
                    <p>Причина: {mainStore.declineReason}</p>
                  </div>
                )}

                <div className="status-bar">
                  <ul className="step-progressbar">
                    <li
                      className={`step-item ${
                        requestStore.step === 0
                          ? "step-item-active"
                          : "step-item-complete"
                      }`}
                      onClick={() => requestStore.setStep(0)}
                    >
                      Проверка
                    </li>
                    <li
                      className={`step-item ${
                        requestStore.step === 1
                          ? "step-item-active"
                          : requestStore.step > 1
                          ? "step-item-complete"
                          : ""
                      }`}
                      onClick={() => requestStore.setStep(1)}
                    >
                      Подписание
                      <br />
                      договора
                    </li>
                    <li
                      className={`step-item ${
                        requestStore.step === 2
                          ? "step-item-active"
                          : requestStore.step > 2
                          ? "step-item-complete"
                          : ""
                      }`}
                      onClick={() => requestStore.setStep(2)}
                    >
                      Форма
                      <br />
                      доступа
                    </li>
                    <li
                      className={`step-item ${
                        requestStore.step === 3
                          ? "step-item-active"
                          : requestStore.step > 3
                          ? "step-item-complete"
                          : ""
                      }`}
                      onClick={() => requestStore.setStep(3)}
                    >
                      Тестирование
                    </li>
                    <li
                      className={`step-item ${
                        requestStore.step === 4
                          ? "step-item-active"
                          : requestStore.step > 4
                          ? "step-item-complete"
                          : ""
                      }`}
                      onClick={() => requestStore.setStep(4)}
                    >
                      Готово
                    </li>
                  </ul>
                </div>
              </div>

              {requestStore.step === 0 ? (
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
              ) : requestStore.step === 1 ? (
                <div className="req-inner-body">
                  {requestStore.agreement && (
                    <div className="tab-btn-content mb-32">
                      <h3 className="title-subhead mb-16">
                        Выберите тип договора
                      </h3>

                      <div className="tab-button mb-24">
                        <span
                          className={
                            !requestStore.notTypical
                              ? "tab-btn active"
                              : "tab-btn"
                          }
                          onClick={() => {
                            mainStore.setModal(true);
                            mainStore.setModalType(3);
                          }}
                        >
                          Типовой
                        </span>
                        <span
                          className={
                            requestStore.notTypical
                              ? "tab-btn active"
                              : "tab-btn"
                          }
                          onClick={() => {
                            mainStore.setModal(true);
                            mainStore.setModalType(3);
                          }}
                        >
                          Нетиповой
                        </span>
                      </div>

                      {requestStore.notTypical ? (
                        <>
                          <div
                            className={`card-collapse tab-num-2 two-signatory ${
                              step2 && "collapsed"
                            }`}
                          >
                            {/* При сворачивании дается класс "collapsed" */}
                            <div
                              className={`card-collapse-header ${
                                requestStore.agreeTwoStep === 2 ? "success" : ""
                              }`}
                            >
                              {/* Если все ОКЕЙ то заменяется текст на "Договор подписан" и дается класс "success" */}
                              <div className="collapsing-header">
                                <h3
                                  className={
                                    requestStore.agreeTwoStep === 2
                                      ? "title-subhead mb-0 done-success"
                                      : "title-subhead mb-0"
                                  }
                                >
                                  {requestStore.agreeTwoStep === 2
                                    ? "Договор согласован"
                                    : "На согласование: “Договор №314 - вер. 24 от 24 июня"}
                                </h3>
                                <span
                                  className="btn-collapse"
                                  onClick={() =>
                                    requestStore.setStep2(!requestStore.step2)
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
                                    {requestStore.agreeGroup.map((s) => (
                                      <>
                                        <div className="method-signatory-header">
                                          <div className="left">
                                            <h4 className="collapse-text mb-8">
                                              Согласующие от ГКБ 1
                                            </h4>
                                            <p className="mb-0">
                                              {requestStore.agreeUsers}{" "}
                                              участников
                                              {requestStore.agreeTwoStep ===
                                                0 && (
                                                <span
                                                  className="delete"
                                                  onClick={() => {
                                                    requestStore.removeAgreeGroup();
                                                  }}
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
                                              {requestStore.agreeUsers.map(
                                                (s) => (
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
                                                    {requestStore.agreeTwoStep >
                                                    0 ? (
                                                      <span className="btn-status not-active">
                                                        Не согласовано
                                                      </span>
                                                    ) : (
                                                      <i
                                                        onClick={() =>
                                                          requestStore.removeAgreeUsers()
                                                        }
                                                        className="azla close-red-icon delete-if-icon "
                                                      ></i>
                                                    )}
                                                  </li>
                                                )
                                              )}
                                              {requestStore.agreeTwoStep > 0 &&
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
                                                        onClick={() => {
                                                          requestStore.setAgreeTwoStep(
                                                            2
                                                          );
                                                          requestStore.setStep2(
                                                            false
                                                          );
                                                          requestStore.setStep3(
                                                            true
                                                          );
                                                        }}
                                                      >
                                                        Согласовано
                                                      </span>
                                                    ) : i === 2 ? (
                                                      <span
                                                        className="btn-status canceled"
                                                        onClick={() => {
                                                          mainStore.setModal(
                                                            true
                                                          );
                                                          mainStore.setModalType(
                                                            5
                                                          );
                                                        }}
                                                      >
                                                        Отклонено
                                                      </span>
                                                    ) : (
                                                      <i
                                                        onClick={() =>
                                                          requestStore.setAgreeUsers()
                                                        }
                                                        className="azla close-red-icon delete-if-icon "
                                                      ></i>
                                                    )}
                                                  </li>
                                                ))}
                                            </ul>
                                          </div>
                                          {requestStore.agreeTwoStep === 0 && (
                                            <span
                                              className="add-btn pad-l-56 pad-b-24"
                                              onClick={() => {
                                                mainStore.setModal(true);
                                                mainStore.setModalType(4);
                                              }}
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
                                  {requestStore.agreeTwoStep === 0 && (
                                    <div
                                      className="method-add-group"
                                      onClick={() =>
                                        requestStore.setAgreeGroup()
                                      }
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

                              {requestStore.agreeTwoStep === 0 && (
                                <div className="collapse-footer">
                                  <button
                                    type="button"
                                    className={`button btn-primary ${
                                      requestStore.agreeGroup.length === 0 ||
                                      requestStore.agreeUsers.length === 0
                                        ? "disabled"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      requestStore.setAgreeTwoStep(1)
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
                              requestStore.agreeTwoStep < 2 ||
                              (!step3 && "collapsed")
                            } ${
                              requestStore.agreeTwoStep < 2 ? "disabled" : ""
                            }`}
                          >
                            {/* При сворачивании дается класс "collapsed" */}
                            <div
                              className={
                                requestStore.signTwoStep === 3
                                  ? "card-collapse-header success"
                                  : "card-collapse-header"
                              }
                            >
                              {/* Если все ОКЕЙ то заменяется текст на "Договор подписан" и дается класс "success" */}
                              <div className="collapsing-header">
                                <h3
                                  className={
                                    requestStore.signTwoStep === 3
                                      ? "title-subhead mb-0 done-success"
                                      : "title-subhead mb-0"
                                  }
                                >
                                  {/* При сворачивании дается класс "collapsed" текст стоит "Договор на подписании" */}
                                  {requestStore.signTwoStep === 3
                                    ? "Договор подписан"
                                    : "На подписание: “Договор №314 - вер. 24 от 24 июня"}
                                </h3>
                                <span
                                  className="btn-collapse"
                                  onClick={() => setStep3(!step3)}
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
                                        {requestStore.signTwoStep === 1 ? (
                                          <span
                                            className="btn-status not-active"
                                            onClick={() =>
                                              requestStore.setSignTwoStep(2)
                                            }
                                          >
                                            Не Подписано
                                          </span>
                                        ) : requestStore.signTwoStep === 2 ? (
                                          <span className="btn-status done">
                                            Подписано
                                          </span>
                                        ) : requestStore.signTwoStep === 3 ? (
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

                                  {requestStore.signTwoUsers.map((s) => (
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

                                          {requestStore.signTwoStep === 1 ? (
                                            <button className="btn-status-signatory btn-icon not-active">
                                              <i className="azla edit-white-icon"></i>
                                              Подписать
                                            </button>
                                          ) : requestStore.signTwoStep === 2 ? (
                                            <button
                                              className="btn-status-signatory btn-icon active"
                                              onClick={() =>
                                                requestStore.setSignTwoStep(3)
                                              }
                                            >
                                              <i className="azla edit-white-icon"></i>
                                              Подписать
                                            </button>
                                          ) : requestStore.signTwoStep === 3 ? (
                                            <span className="btn-status done">
                                              Подписано
                                            </span>
                                          ) : (
                                            <i
                                              onClick={() =>
                                                requestStore.setAgreeUsers()
                                              }
                                              className="azla close-red-icon delete-if-icon "
                                            ></i>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}

                                  {/* По дефолту стоит выбор подписанта, после выбора исчезает и добавляется выше дивка, и включается кнопка "Отправить на подписание" */}
                                  {requestStore.signTwoUsers.length === 0 && (
                                    <div className="method-add-group pad-l-0">
                                      <span
                                        className="add-btn"
                                        onClick={() => {
                                          mainStore.setModal(true);
                                          mainStore.setModalType(6);
                                        }}
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

                              {requestStore.signTwoStep === 0 && (
                                <div className="collapse-footer">
                                  <button
                                    type="button"
                                    className={`button btn-primary ${
                                      requestStore.signTwoUsers.length === 0
                                        ? "disabled"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      requestStore.setSignTwoStep(1)
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
                          className={
                            step1
                              ? "card-collapse tab-num-1 collapsed"
                              : "card-collapse tab-num-1"
                          }
                        >
                          {/* При сворачивании дается класс "collapsed" */}
                          <div
                            className={
                              requestStore.signStep === 3
                                ? "card-collapse-header success"
                                : "card-collapse-header"
                            }
                          >
                            {/* Если все ОКЕЙ то заменяется текст на "Договор подписан" и дается класс "success" */}
                            <div className="collapsing-header">
                              <h3
                                className={
                                  requestStore.signStep === 3
                                    ? "title-subhead mb-0 done-success"
                                    : "title-subhead mb-0"
                                }
                              >
                                {/* При сворачивании дается класс "collapsed" текст стоит "Договор на подписании" */}
                                {requestStore.signStep === 3
                                  ? "Договор подписан"
                                  : "На подписание: “Договор №314 - вер. 24 от 24 июня"}
                              </h3>
                              <span
                                className="btn-collapse"
                                onClick={() => setStep1(!step1)}
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
                                      {requestStore.signStep === 1 ? (
                                        <span
                                          className="btn-status not-active"
                                          onClick={() =>
                                            requestStore.setSignStep(2)
                                          }
                                        >
                                          Не Подписано
                                        </span>
                                      ) : requestStore.signStep === 2 ? (
                                        <span className="btn-status done">
                                          Подписано
                                        </span>
                                      ) : requestStore.signStep === 3 ? (
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

                                      {requestStore.signStep === 1 ? (
                                        <button className="btn-status-signatory btn-icon not-active">
                                          <i className="azla edit-white-icon"></i>
                                          Подписать
                                        </button>
                                      ) : requestStore.signStep === 2 ? (
                                        <button
                                          className="btn-status-signatory btn-icon active"
                                          onClick={() =>
                                            requestStore.setSignStep(3)
                                          }
                                        >
                                          <i className="azla edit-white-icon"></i>
                                          Подписать
                                        </button>
                                      ) : requestStore.signStep === 3 ? (
                                        <span className="btn-status done">
                                          Подписано
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {requestStore.signStep === 0 && (
                              <div className="collapse-footer">
                                <button
                                  type="button"
                                  className="button btn-primary"
                                  onClick={() => requestStore.setSignStep(1)}
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
                          onClick={() => {
                            mainStore.setModal(true);
                            mainStore.setModalType(2);
                          }}
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
              ) : requestStore.step === 2 ? (
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
              ) : requestStore.step === 3 ? (
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
              ) : requestStore.step === 4 ? (
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
                  {mainStore.modalManager && requestStore.step === 0 ? (
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

                      {mainStore.decline ? (
                        <div className="right alert">
                          <p>Заявка отклонена</p>
                          <button
                            className="button btn-secondary"
                            onClick={() => {
                              mainStore.setDecline(false);
                              mainStore.setDeclineReason("");
                              requestStore.setTabIndexReq(3);

                              history.push("/request");
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
                              mainStore.setModal(true);
                              mainStore.setModalType(1);
                            }}
                          >
                            Нет
                          </button>
                          <button
                            className="button btn-primary"
                            onClick={() => requestStore.setStep(1)}
                          >
                            Да, успешно
                          </button>
                        </div>
                      )}
                    </div>
                  ) : requestStore.step === 0 ? (
                    <button
                      type="button"
                      onClick={() => mainStore.setModal(true)}
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
});
export default RequestInner;
