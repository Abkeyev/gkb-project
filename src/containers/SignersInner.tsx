import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link, useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import moment from "moment";
import {
  AgreeResult,
  Categories,
  Client,
  ClientUsers,
  Documents,
  Result,
  ServiceCommon,
  User,
} from "../api/Models/ServiceModels";
import { Modal } from ".";

const SignersInner = observer((props: any) => {
  const history = useHistory();
  const { id } = props.match.params;
  const { main, request } = props;

  React.useEffect(() => {
    request.getClientServiceType();
    request.getClients();
    request.getUsers();
    request.getRequestStatus();
    request.getDocumentsCategories();
    request.getDocumentsType();
    request.getDocuments(main.clientData.client.id);
    request.getClientTypes();
    request.getRequest(id);
  }, []);

  return (
    <>
      {main.isOpenModal && <Modal main={main} request={request} />}
      <div className="main-body">
        {request._getRequest && (
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="req-manager-inner p-16-50 pad-b-128">
                  <div className="req-inner-header">
                    <div className="back-breadcrumbs">
                      <div onClick={() => history.goBack()} className="back">
                        <i className="azla arrow-left-icon"></i> Назад
                      </div>
                      <div className="breadcrumbs">
                        <Link to="/">Заявки</Link> /{" "}
                        <span>Заявка №{request._getRequest.id}</span>
                      </div>
                    </div>

                    <h1 className="title-main mb-32">
                      Заявка №{request._getRequest.id} -{" "}
                      {request._getClient &&
                        request._getClient.longname &&
                        request._getClient.longname}
                    </h1>

                    {(request._getRequest.request_status === 4 ||
                      request._getRequest.request_status === 3) && (
                      <div className="mess-card alert-mess mb-32 col-md-8">
                        <h5>Заявка отклонена менеджером</h5>
                        <p>Причина: {request._getRequest.client_comment}</p>
                      </div>
                    )}

                    <div className="status-bar">
                      <ul className="step-progressbar">
                        <li
                          className={`step-item ${
                            request._getRequest.request_stepper === 1
                              ? "step-item-active"
                              : "step-item-complete"
                          }`}
                          onClick={() => request.setStep(1)}
                        >
                          Проверка
                        </li>
                        <li
                          className={`step-item ${
                            request._getRequest.request_stepper === 2
                              ? "step-item-active"
                              : request._getRequest.request_stepper > 2
                              ? "step-item-complete"
                              : ""
                          }`}
                          onClick={() =>
                            request._getRequest.request_stepper >= 2 &&
                            request.setStep(2)
                          }
                        >
                          Подписание
                          <br />
                          договора
                        </li>
                        <li
                          className={`step-item ${
                            request._getRequest.request_stepper === 3
                              ? "step-item-active"
                              : request._getRequest.request_stepper > 3
                              ? "step-item-complete"
                              : ""
                          }`}
                          onClick={() =>
                            request._getRequest.request_stepper >= 3 &&
                            request.setStep(3)
                          }
                        >
                          Форма
                          <br />
                          доступа
                        </li>
                        <li
                          className={`step-item ${
                            request._getRequest.request_stepper === 4
                              ? "step-item-active"
                              : request._getRequest.request_stepper > 4
                              ? "step-item-complete"
                              : ""
                          }`}
                          onClick={() =>
                            request._getRequest.request_stepper >= 4 &&
                            request.setStep(4)
                          }
                        >
                          Тестирование
                        </li>
                        <li
                          className={`step-item ${
                            request._getRequest.request_stepper === 5
                              ? "step-item-active"
                              : request._getRequest.request_stepper > 5
                              ? "step-item-complete"
                              : ""
                          }`}
                          onClick={() =>
                            request._getRequest.request_stepper >= 5 &&
                            request.setStep(5)
                          }
                        >
                          Готово
                        </li>
                      </ul>
                    </div>
                  </div>

                  {request._getRequest.request_status === 10 &&
                  request._getRequest.request_stepper === 3 ? (
                    <div className="mess-card mb-32 col-md-8">
                      Пожалуйста, ожидайте. Заявленная форма доступа проверяется
                      департаментом Servicedesk.
                    </div>
                  ) : request._getRequest.request_status === 3 &&
                    request._getRequest.request_status === 4 ? (
                    ""
                  ) : request._getRequest.request_status === 6 &&
                    request._getRequest.request_status === 9 ? (
                    <div className="mess-card mb-32 col-md-8">
                      Договор отправлен на подписание. Пожалуйста, ожидайте
                      подписания документа представителями контрагента и АО
                      “Государственное Кредитное Бюро”.
                    </div>
                  ) : request._getRequest.request_status === 2 ? (
                    <div className="mess-card mb-32 col-md-8">
                      Данная заявка проходит первичную проверку менеджером.
                      Пожалуйста, ожидайте. Среднее время проверки составляет 1
                      день.
                    </div>
                  ) : request._getRequest.request_status === 1 ? (
                    <div className="mess-card mb-32 col-md-8">
                      Менеджер заявки готовит ваш договор на рассмотрение.
                      Приложенный договор вы увидите в секции “История изменения
                      договора”. Вы так же можете добавлять/изменять договор и
                      выносить его на расмотрение загрузив файл в систему.
                    </div>
                  ) : (
                    ""
                  )}

                  {request.step === 1 ? (
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
                                <span className="right">
                                  {request._getRequest.id}
                                </span>
                              </li>
                              <li>
                                <span className="left">Статус заявки:</span>
                                <span className="right">
                                  {
                                    request._getRequestStatus.find(
                                      (t: ServiceCommon) =>
                                        t.id ===
                                        request._getRequest.request_status
                                    )?.name
                                  }
                                </span>
                              </li>
                              {request._getManUser && (
                                <li>
                                  <span className="left">Менеджер заявки:</span>
                                  <span className="right d-flex">
                                    {request._getManUser.full_name}
                                  </span>
                                </li>
                              )}
                              <li>
                                <span className="left">Организация:</span>
                                <span className="right">
                                  <span className="pre-primary-color">
                                    {request._getRequest.client.longname}
                                  </span>
                                </span>
                              </li>
                              <li>
                                <span className="left">БИН:</span>
                                <span className="right">
                                  {request._getRequest.client.bin}
                                </span>
                              </li>
                              <li>
                                <span className="left">
                                  Категория деятельности:
                                </span>
                                <span className="right">
                                  {request._getRequest.service_category === 1
                                    ? "БДКИ"
                                    : "ЕСБД"}
                                </span>
                              </li>
                              <li>
                                <span className="left">Тип сервиса:</span>
                                <span className="right">
                                  {
                                    request._getClientServiceType.find(
                                      (t: ServiceCommon) =>
                                        t.id ===
                                        request._getRequest.service_type
                                    )?.name
                                  }
                                </span>
                              </li>
                              <li>
                                <span className="left">
                                  Дата регистрации заявки:
                                </span>
                                <span className="right">
                                  {request._getRequest.reg_date
                                    ? moment(
                                        request._getRequest.reg_date
                                      ).format("MM.DD.YYYY")
                                    : "-"}
                                </span>
                              </li>
                              <li>
                                <span className="left">
                                  Дата исполнения заявки:
                                </span>
                                <span className="right">
                                  {request._getRequest.fulfill_date
                                    ? moment(
                                        request._getRequest.fulfill_date
                                      ).format("DD.MM.YYYY")
                                    : "-"}
                                </span>
                              </li>
                            </ul>
                          </div>
                          <h3 className="title-subhead mb-16">
                            Документы организации
                          </h3>
                          {request._getDocCategories &&
                          request._getDocCategories.length === 0
                            ? "Документы отсутствуют."
                            : request._getDocCategories.map(
                                (c: Categories) =>
                                  c.doc_type.filter(
                                    (dt: any) => dt.file !== null
                                  ).length > 0 && (
                                    <>
                                      <h5 className="title-subhead-h5 mb-16">
                                        {c.name}
                                      </h5>
                                      <div className="files-added">
                                        <ul className="files-list">
                                          {c.doc_type.map(
                                            (d: any) =>
                                              d.file && (
                                                <li>
                                                  <i className="azla blank-alt-primary-icon"></i>
                                                  <span
                                                    onClick={() =>
                                                      d.file &&
                                                      request.downloadDocument(
                                                        d.file
                                                      )
                                                    }
                                                  >
                                                    {d.name}
                                                  </span>
                                                </li>
                                              )
                                          )}
                                        </ul>
                                      </div>
                                    </>
                                  )
                              )}
                        </div>
                      </TabPanel>

                      <TabPanel>
                        <div className="tab-content tab-1">
                          Потребители услуг – пользователи контрагента, которые
                          имеют доступ к базам данных БДКИ и ЕСБД.
                          <h3 className="title-subhead mtb-16">
                            {request._getClientUsers.length} заявленных
                            пользователей
                          </h3>
                          {request._getClientUsers.length === 0
                            ? "Пользователи отсутствуют. "
                            : request._getClientUsers.map(
                                (u: ClientUsers, index: number) => (
                                  <div className="card mb-24 pad-24">
                                    <div className="card-header">
                                      <div className="title">
                                        <h6 className="text">{u.full_name}</h6>
                                        <span className="num">
                                          №{index + 1}
                                        </span>
                                      </div>
                                      <p className="desc">
                                        {u.department_name}
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
                                                <span className="right">
                                                  {u.id}
                                                </span>
                                              </li>
                                              <li>
                                                <span className="left">
                                                  ИИН сотрудника:
                                                </span>
                                                <span className="right">
                                                  {u.iin}
                                                </span>
                                              </li>
                                              <li>
                                                <span className="left">
                                                  Контактный номер:
                                                </span>
                                                <span className="right">
                                                  {u.idcard_number}
                                                </span>
                                              </li>
                                              <li>
                                                <span className="left">
                                                  Email:
                                                </span>
                                                <span className="right">
                                                  {u.email}
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
                                                  {u.first_head_full_name}
                                                </span>
                                              </li>
                                              <li>
                                                <span className="left">
                                                  Заместитель:
                                                </span>
                                                <span className="right">
                                                  {u.deputy_head_full_name}
                                                </span>
                                              </li>
                                              <li>
                                                <span className="left">
                                                  Курирующий менеджер:
                                                </span>
                                                <span className="right">
                                                  {u.manager_full_name}
                                                </span>
                                              </li>
                                              <li>
                                                <span className="left">
                                                  Контакты менеджера:
                                                </span>
                                                <span className="right">
                                                  {u.manager_contacts}
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
                      </TabPanel>
                    </Tabs>
                  ) : request.step === 2 ? (
                    <div className="req-inner-body">
                      <div className="tab-btn-content mb-32">
                        {request._getRequest.is_model_contract &&
                        request._getDoc ? (
                          <div
                            className={`card-collapse tab-num-1 ${
                              !request.signType ? "collapsed" : ""
                            }`}
                          >
                            {/* При сворачивании дается класс "collapsed" */}
                            <div
                              className={
                                request._getRequest.request_stepper === 3
                                  ? "card-collapse-header success"
                                  : "card-collapse-header"
                              }
                            >
                              {/* Если все ОКЕЙ то заменяется текст на "Договор подписан" и дается класс "success" */}
                              <div className="collapsing-header">
                                <h3
                                  className={
                                    request._getRequest.request_stepper === 3
                                      ? "title-subhead mb-0 done-success"
                                      : "title-subhead mb-0"
                                  }
                                >
                                  {/* При сворачивании дается класс "collapsed" текст стоит "Договор на подписании" */}
                                  {request._getRequest.request_stepper === 3
                                    ? "Договор подписан"
                                    : `На подписание: Договор №${request._getDoc.id} - вер. ${request._getDoc.version}`}
                                </h3>
                                <span
                                  className="btn-collapse"
                                  onClick={() =>
                                    (request.signType = !request.signType)
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
                                      onClick={() =>
                                        request.downloadDocument(
                                          request._getDoc
                                        )
                                      }
                                    >
                                      <i className="azla blank-alt-primary-icon"></i>
                                      Скачать договор
                                    </button>
                                  </div>
                                  {request._getManUser && (
                                    <div className="col-md-6">
                                      <p className="desc">Менеджер заявки</p>
                                      <div className="profile mt-8">
                                        <img
                                          alt="ava"
                                          className="ava"
                                          src={
                                            process.env.PUBLIC_URL +
                                            "/images/def-ava.svg"
                                          }
                                        />
                                        <span className="name">
                                          {request._getManUser.full_name}
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="collapse-content">
                              <div className="collapse-body">
                                {request._getConSigner &&
                                  (request._getConSigner as User) && (
                                    <div className="collapse-signatory mb-24">
                                      <h4 className="collapse-text">
                                        Подписант от{" "}
                                        {request._getClients &&
                                          request._getClients.find(
                                            (t: Client) =>
                                              t.id ===
                                              request._getConSigner.client
                                          )?.longname}
                                      </h4>
                                      <div className="signatory-profile">
                                        <div className="col-md-6">
                                          <div className="profile">
                                            <img
                                              alt="ava"
                                              className="ava"
                                              src={
                                                process.env.PUBLIC_URL +
                                                "/images/def-ava.svg"
                                              }
                                            />
                                            <span className="name">
                                              {request._getConSigner.full_name}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="signatory-status">
                                            <p className="desc">
                                              {
                                                request._getPosition.find(
                                                  (t: ServiceCommon) =>
                                                    t.id ===
                                                    request._getConSigner
                                                      .position
                                                )?.name
                                              }
                                            </p>

                                            {request._getRequest
                                              .request_status === 6 ||
                                            request._getRequest
                                              .request_status === 7 ||
                                            request._getRequest
                                              .request_status === 8 ||
                                            request._getRequest
                                              .request_status === 10 ? (
                                              <span className="btn-status done">
                                                Подписано
                                              </span>
                                            ) : (
                                              <span className="btn-status not-active">
                                                Не Подписано
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                {(request._getManSigner as User) && (
                                  <div className="collapse-signatory">
                                    <h4 className="collapse-text">
                                      Подписант от{" "}
                                      {request._getClients &&
                                        request._getClients.find(
                                          (t: Client) =>
                                            t.id ===
                                            request._getManSigner.client
                                        )?.longname}
                                    </h4>

                                    <div className="signatory-profile">
                                      <div className="col-md-6">
                                        <div className="profile">
                                          <img
                                            alt="ava"
                                            className="ava"
                                            src={
                                              process.env.PUBLIC_URL +
                                              "/images/def-ava.svg"
                                            }
                                          />
                                          <span className="name">
                                            {request._getManSigner.full_name}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="signatory-status">
                                          <p className="desc">
                                            {
                                              request._getPosition.find(
                                                (t: ServiceCommon) =>
                                                  t.id ===
                                                  request._getManSigner.position
                                              )?.name
                                            }
                                          </p>

                                          {request._getRequest
                                            .request_status === 6 &&
                                          main.clientData.user.id ===
                                            request._getManSigner.id ? (
                                            <div className="d-flex-align-c-spaceb">
                                              <button
                                                className="btn-status-signatory btn-icon active mr-16"
                                                onClick={() =>
                                                  request
                                                    .signDocGkb(true)
                                                    .then(
                                                      () =>
                                                        (request.signType =
                                                          true)
                                                    )
                                                }
                                              >
                                                <i className="azla edit-white-icon"></i>
                                                Подписать
                                              </button>

                                              <button
                                                onClick={() => {
                                                  main.setModal(true);
                                                  main.setModalType(1);
                                                }}
                                                className="delete-signatory"
                                              ></button>
                                            </div>
                                          ) : request._getRequest
                                              .request_stepper > 2 ? (
                                            <span className="btn-status done">
                                              Подписано
                                            </span>
                                          ) : (
                                            <span className="btn-status not-active">
                                              Не Подписано
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : !request._getRequest.is_model_contract &&
                          request._getDoc ? (
                          <>
                            <div
                              className={`card-collapse tab-num-2 two-signatory ${
                                !request.agreeNotType ? "collapsed" : ""
                              }`}
                            >
                              <div
                                className={`card-collapse-header ${
                                  request._getRequest.request_stepper === 3 ||
                                  request._getRequest.request_status === 5 ||
                                  request._getRequest.request_status === 6 ||
                                  request._getRequest.request_status === 7 ||
                                  request._getRequest.request_status === 8 ||
                                  request._getRequest.request_status === 9 ||
                                  request._getRequest.request_status === 10
                                    ? "success"
                                    : ""
                                }`}
                              >
                                {/* Если все ОКЕЙ то заменяется текст на "Договор подписан" и дается класс "success" */}
                                <div className="collapsing-header">
                                  <h3
                                    className={
                                      request._getRequest.request_stepper ===
                                        3 ||
                                      request._getRequest.request_status ===
                                        5 ||
                                      request._getRequest.request_status ===
                                        6 ||
                                      request._getRequest.request_status ===
                                        7 ||
                                      request._getRequest.request_status ===
                                        8 ||
                                      request._getRequest.request_status ===
                                        9 ||
                                      request._getRequest.request_status === 10
                                        ? "title-subhead mb-0 done-success"
                                        : "title-subhead mb-0"
                                    }
                                  >
                                    {request._getRequest.request_stepper ===
                                      3 ||
                                    request._getRequest.request_status === 5 ||
                                    request._getRequest.request_status === 6 ||
                                    request._getRequest.request_status === 7 ||
                                    request._getRequest.request_status === 8 ||
                                    request._getRequest.request_status === 9 ||
                                    request._getRequest.request_status === 10
                                      ? "Договор согласован"
                                      : `На согласование: Договор №${request._getDoc.id} - вер. ${request._getDoc.version}`}
                                  </h3>
                                  <span
                                    className="btn-collapse"
                                    onClick={() =>
                                      (request.agreeNotType =
                                        !request.agreeNotType)
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
                                        onClick={() =>
                                          request.downloadDocument(
                                            request._getDoc
                                          )
                                        }
                                      >
                                        <i className="azla blank-alt-primary-icon"></i>
                                        Скачать договор
                                      </button>
                                    </div>
                                    {request._getManUser && (
                                      <div className="col-md-6">
                                        <p className="desc">Менеджер заявки</p>
                                        <div className="profile mt-8">
                                          <img
                                            alt="ava"
                                            className="ava"
                                            src={
                                              process.env.PUBLIC_URL +
                                              "/images/def-ava.svg"
                                            }
                                          />
                                          <span className="name">
                                            {request._getManUser.full_name}
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="collapse-content method-main">
                                <div className="collapse-body">
                                  <div className="method-signatory">
                                    <div className="method-signatory-add">
                                      {request._getReviews.map(
                                        (a: AgreeResult) => (
                                          <>
                                            <div className="method-signatory-header">
                                              <div className="left">
                                                <h4 className="collapse-text mb-8">
                                                  Согласующие от ГКБ{" "}
                                                  {a.process_number}
                                                </h4>
                                                <p className="mb-0">
                                                  {a.review_data.length}{" "}
                                                  участников ·{" "}
                                                  {a.process_type ===
                                                  "Sequential"
                                                    ? "Последовательное согласование"
                                                    : "Параллельное согласование"}
                                                </p>
                                              </div>
                                              <div className="right">
                                                <p className="text-desc mb-0 mr-8">
                                                  Метод согласования:
                                                </p>
                                                <div className="tab-button">
                                                  <span
                                                    className={`tab-btn ${
                                                      a.process_type ===
                                                      "Sequential"
                                                        ? "active"
                                                        : ""
                                                    }`}
                                                  >
                                                    Последовательный
                                                  </span>
                                                  <span
                                                    className={`tab-btn ${
                                                      a.process_type ===
                                                      "Parallel"
                                                        ? "active"
                                                        : ""
                                                    }`}
                                                  >
                                                    Параллельный
                                                  </span>
                                                </div>
                                              </div>
                                            </div>

                                            <div className="method-add-user">
                                              <div className="method-add-users">
                                                <ul className="method-list-users">
                                                  {a.review_data.map(
                                                    (s: Result) => (
                                                      <li>
                                                        <div className="left">
                                                          <div className="profile">
                                                            <img
                                                              alt="ava"
                                                              className="ava"
                                                              src={
                                                                process.env
                                                                  .PUBLIC_URL +
                                                                "/images/def-ava.svg"
                                                              }
                                                            />
                                                            <span className="name">
                                                              {request._getAllUsers &&
                                                                request._getAllUsers.find(
                                                                  (u: User) =>
                                                                    u.id ===
                                                                    s.user_id
                                                                )?.full_name}
                                                            </span>
                                                          </div>
                                                        </div>
                                                        <span className="position">
                                                          {request._getAllUsers &&
                                                            request._getPosition.find(
                                                              (
                                                                t: ServiceCommon
                                                              ) =>
                                                                t.id ===
                                                                request._getAllUsers.find(
                                                                  (u: User) =>
                                                                    u.id ===
                                                                    s.user_id
                                                                )?.position
                                                            )?.name}
                                                        </span>

                                                        {s.is_approved ? (
                                                          <span className="btn-status done">
                                                            Согласовано
                                                          </span>
                                                        ) : main.clientData.user
                                                            .id ===
                                                          s.user_id ? (
                                                          <div className="d-flex-align-c-spaceb">
                                                            <button
                                                              className="btn-status-signatory btn-icon active mr-16"
                                                              onClick={() =>
                                                                request.sendReviews(
                                                                  main
                                                                    .clientData
                                                                    .user.id,
                                                                  true
                                                                )
                                                              }
                                                            >
                                                              Согласовать
                                                            </button>

                                                            <button
                                                              onClick={() =>
                                                                request.sendReviews(
                                                                  1,
                                                                  false
                                                                )
                                                              }
                                                              className="delete-signatory"
                                                            ></button>
                                                          </div>
                                                        ) : (
                                                          <span className="btn-status not-active">
                                                            Не согласовано
                                                          </span>
                                                        )}
                                                      </li>
                                                    )
                                                  )}
                                                </ul>
                                              </div>
                                            </div>
                                          </>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className={`card-collapse tab-num-1 ${
                                request.signNotType ? "" : "collapsed "
                              } ${
                                request._getRequest.request_status === 2 ||
                                request._getRequest.request_status === 11
                                  ? "disabled"
                                  : ""
                              }`}
                            >
                              {/* При сворачивании дается класс "collapsed" */}
                              <div
                                className={
                                  request._getRequest.request_stepper > 2
                                    ? "card-collapse-header success"
                                    : "card-collapse-header"
                                }
                              >
                                {/* Если все ОКЕЙ то заменяется текст на "Договор подписан" и дается класс "success" */}
                                <div className="collapsing-header">
                                  <h3
                                    className={
                                      request._getRequest.request_stepper > 2
                                        ? "title-subhead mb-0 done-success"
                                        : "title-subhead mb-0"
                                    }
                                  >
                                    {/* При сворачивании дается класс "collapsed" текст стоит "Договор на подписании" */}
                                    {request._getRequest.request_stepper > 2
                                      ? "Договор подписан"
                                      : `На подписание: Договор №${request._getDoc.id} - вер. ${request._getDoc.version}`}
                                  </h3>
                                  <span
                                    className="btn-collapse"
                                    onClick={() => {
                                      if (
                                        request._getRequest.request_status !==
                                          2 &&
                                        request._getRequest.request_status !==
                                          11
                                      )
                                        request.signNotType =
                                          !request.signNotType;
                                    }}
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
                                        onClick={() =>
                                          request.downloadDocument(
                                            request._getDoc
                                          )
                                        }
                                      >
                                        <i className="azla blank-alt-primary-icon"></i>
                                        Скачать договор
                                      </button>
                                    </div>
                                    {request._getManUser && (
                                      <div className="col-md-6">
                                        <p className="desc">Менеджер заявки</p>
                                        <div className="profile mt-8">
                                          <img
                                            alt="ava"
                                            className="ava"
                                            src={
                                              process.env.PUBLIC_URL +
                                              "/images/def-ava.svg"
                                            }
                                          />
                                          <span className="name">
                                            {request._getManUser.full_name}
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="collapse-content">
                                <div className="collapse-body">
                                  {request._getConSigner &&
                                    (request._getConSigner as User) && (
                                      <div className="collapse-signatory mb-24">
                                        <h4 className="collapse-text">
                                          Подписант от{" "}
                                          {request._getClients &&
                                            request._getClients.find(
                                              (t: Client) =>
                                                t.id ===
                                                request._getConSigner.client
                                            )?.longname}
                                        </h4>
                                        <div className="signatory-profile">
                                          <div className="col-md-6">
                                            <div className="profile">
                                              <img
                                                alt="ava"
                                                className="ava"
                                                src={
                                                  process.env.PUBLIC_URL +
                                                  "/images/def-ava.svg"
                                                }
                                              />
                                              <span className="name">
                                                {
                                                  request._getConSigner
                                                    .full_name
                                                }
                                              </span>
                                            </div>
                                          </div>
                                          <div className="col-md-6">
                                            <div className="signatory-status">
                                              <p className="desc">
                                                {
                                                  request._getPosition.find(
                                                    (t: ServiceCommon) =>
                                                      t.id ===
                                                      request._getConSigner
                                                        .position
                                                  )?.name
                                                }
                                              </p>

                                              {request._getRequest
                                                .request_stepper > 2 ? (
                                                <span className="btn-status done">
                                                  Подписано
                                                </span>
                                              ) : request._getRequest
                                                  .request_status === 6 ? (
                                                <span className="btn-status not-active">
                                                  Не Подписано
                                                </span>
                                              ) : (
                                                ""
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  {request._getManSigner &&
                                    (request._getManSigner as User) && (
                                      <div className="collapse-signatory">
                                        <h4 className="collapse-text">
                                          Подписант от{" "}
                                          {request._getClients &&
                                            request._getClients.find(
                                              (t: Client) =>
                                                t.id ===
                                                request._getManSigner.client
                                            )?.longname}
                                        </h4>

                                        <div className="signatory-profile">
                                          <div className="col-md-6">
                                            <div className="profile">
                                              <img
                                                alt="ava"
                                                className="ava"
                                                src={
                                                  process.env.PUBLIC_URL +
                                                  "/images/def-ava.svg"
                                                }
                                              />
                                              <span className="name">
                                                {
                                                  request._getManSigner
                                                    .full_name
                                                }
                                              </span>
                                            </div>
                                          </div>
                                          <div className="col-md-6">
                                            <div className="signatory-status">
                                              <p className="desc">
                                                {
                                                  request._getPosition.find(
                                                    (t: ServiceCommon) =>
                                                      t.id ===
                                                      request._getManSigner
                                                        .position
                                                  )?.name
                                                }
                                              </p>
                                              {request._getRequest
                                                .request_status === 6 ? (
                                                <div className="d-flex-align-c-spaceb">
                                                  <button
                                                    className="btn-status-signatory btn-icon active mr-16"
                                                    onClick={() =>
                                                      request
                                                        .signDocGkb(true)
                                                        .then(
                                                          () =>
                                                            (request.signType =
                                                              true)
                                                        )
                                                    }
                                                  >
                                                    <i className="azla edit-white-icon"></i>
                                                    Подписать
                                                  </button>

                                                  <button
                                                    onClick={() => {
                                                      main.setModal(true);
                                                      main.setModalType(1);
                                                    }}
                                                    className="delete-signatory"
                                                  ></button>
                                                </div>
                                              ) : request._getRequest
                                                  .request_status === 7 ||
                                                request._getRequest
                                                  .request_status === 8 ||
                                                request._getRequest
                                                  .request_status === 10 ? (
                                                <span className="btn-status done">
                                                  Подписано
                                                </span>
                                              ) : (
                                                <button className="btn-status-signatory btn-icon not-active">
                                                  <i className="azla edit-white-icon"></i>
                                                  Подписать
                                                </button>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                        <div className="d-flex-align-c-spaceb mb-32">
                          <h3 className="title-subhead">
                            История изменения договора{" "}
                            <span className="number">
                              {request._getDogovors &&
                                (request._getDogovors as Documents[]).length}
                            </span>
                          </h3>
                        </div>
                        {request._getDogovors &&
                          (request._getDogovors.length === 0 ? (
                            "Нет загруженных договоров."
                          ) : (
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
                                {request._getDogovors &&
                                  (request._getDogovors as Documents[]).map(
                                    (d: Documents) => (
                                      <tr
                                        onClick={() => {
                                          main.setModal(true);
                                          main.setModalType(2);
                                          request.setTempDoc(d);
                                        }}
                                      >
                                        <td>{d.doc_name}</td>
                                        <td>{}</td>
                                        <td>{d.comments}</td>
                                        <td>
                                          {request._getClients &&
                                            request._getClients.find(
                                              (t: Client) => t.id === d.client
                                            )?.longname}
                                        </td>
                                      </tr>
                                    )
                                  )}
                              </tbody>
                            </table>
                          ))}
                        <h3 className="title-subhead mb-16">
                          Документы организации
                        </h3>
                        {request._getDocCategories &&
                          (request._getDocCategories.length === 0
                            ? "Документы отсутствуют."
                            : request._getDocCategories.map(
                                (c: Categories) =>
                                  c.doc_type.filter(
                                    (dt: any) => dt.file !== null
                                  ).length > 0 && (
                                    <>
                                      <h5 className="title-subhead-h5 mb-16">
                                        {c.name}
                                      </h5>
                                      <div className="files-added">
                                        <ul className="files-list">
                                          {c.doc_type.map(
                                            (d: any) =>
                                              d.file && (
                                                <li>
                                                  <i className="azla blank-alt-primary-icon"></i>
                                                  <span
                                                    onClick={() =>
                                                      d.file &&
                                                      request.downloadDocument(
                                                        d.file
                                                      )
                                                    }
                                                  >
                                                    {d.name}
                                                  </span>
                                                </li>
                                              )
                                          )}
                                        </ul>
                                      </div>
                                    </>
                                  )
                              ))}
                      </div>
                    </div>
                  ) : request.step === 3 ? (
                    <>
                      <h3 className="title-subhead mb-16">
                        {request._getClientUsers.length} заявленных
                        пользователей
                      </h3>
                      {request._getClientUsers.length === 0
                        ? "Пользователи отсутствуют. "
                        : request._getClientUsers.map(
                            (u: ClientUsers, index: number) => (
                              <div className="card mb-24 pad-24">
                                <div className="card-header">
                                  <div className="title">
                                    <h6 className="text">{u.full_name}</h6>
                                    <span className="num">№{index + 1}</span>
                                  </div>
                                  <p className="desc">{u.department_name}</p>
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
                                            <span className="right">
                                              {u.id}
                                            </span>
                                          </li>
                                          <li>
                                            <span className="left">
                                              ИИН сотрудника:
                                            </span>
                                            <span className="right">
                                              {u.iin}
                                            </span>
                                          </li>
                                          <li>
                                            <span className="left">
                                              Контактный номер:
                                            </span>
                                            <span className="right">
                                              {u.idcard_number}
                                            </span>
                                          </li>
                                          <li>
                                            <span className="left">Email:</span>
                                            <span className="right">
                                              {u.email}
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
                                              {u.first_head_full_name}
                                            </span>
                                          </li>
                                          <li>
                                            <span className="left">
                                              Заместитель:
                                            </span>
                                            <span className="right">
                                              {u.deputy_head_full_name}
                                            </span>
                                          </li>
                                          <li>
                                            <span className="left">
                                              Курирующий менеджер:
                                            </span>
                                            <span className="right">
                                              {u.manager_full_name}
                                            </span>
                                          </li>
                                          <li>
                                            <span className="left">
                                              Контакты менеджера:
                                            </span>
                                            <span className="right">
                                              {u.manager_contacts}
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
                    </>
                  ) : request.step === 4 ? (
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
                                    {request.testProt && (
                                      <li>
                                        <i className="azla blank-alt-primary-icon"></i>
                                        <span
                                          onClick={() =>
                                            request.downloadDocument(
                                              request.testProt
                                            )
                                          }
                                        >
                                          Протокол тестирования
                                        </span>
                                      </li>
                                    )}
                                    {request.testAct && (
                                      <li>
                                        <i className="azla blank-alt-primary-icon"></i>
                                        <span
                                          onClick={() =>
                                            request.downloadDocument(
                                              request.testAct
                                            )
                                          }
                                        >
                                          Акт тестирования
                                        </span>
                                      </li>
                                    )}
                                  </ul>
                                </div>

                                <h3 className="title-subhead mb-16">
                                  Сценарий тестирования
                                </h3>
                                <p className="text-desc">
                                  Amet minim mollit non deserunt ullamco est sit
                                  aliqua dolor do amet sint. Velit officia
                                  consequat duis enim velit mollit. Exercitation
                                  veniam consequat sunt nostrud amet.
                                </p>
                              </div>
                              <div className="col-md-3 offset-md-1">
                                <div className="keys-add">
                                  <h3 className="title-subhead mb-16">
                                    Ключи доступа
                                  </h3>
                                  {request._getRequest.request_status === 10 ? (
                                    <div className="keys-loader mb-32">
                                      <h5>
                                        Тестовые ключи не предоставлены.
                                        Ожидайте.
                                      </h5>
                                      <p>
                                        Ключи предоставляются департаментом
                                        Service Desk после проверки всех данных
                                        контрагента. Это занимает 2-7 дней с
                                        момента принятия формы доступа
                                        менеджером.
                                      </p>
                                    </div>
                                  ) : (
                                    <div className="keys-btn">
                                      {request.testKey && (
                                        <button
                                          type="button"
                                          className="btn-file btn-icon"
                                          onClick={() =>
                                            request.downloadKeys(
                                              request.testKey
                                            )
                                          }
                                        >
                                          Скачать тестовые ключи
                                        </button>
                                      )}
                                      {request.prodKey &&
                                        request._getRequest.request_stepper >
                                          4 && (
                                          <button
                                            type="button"
                                            className="btn-file btn-icon"
                                            onClick={() =>
                                              request.downloadKeys(
                                                request.prodKey
                                              )
                                            }
                                          >
                                            Скачать боевые ключи
                                          </button>
                                        )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : request.step === 5 ? (
                    <>
                      <div className="pad-b-128">
                        <div className="done-request">
                          <h3 className="title-subhead mb-16">
                            Контрагент успешно зарегистрирован!
                          </h3>

                          <h5 className="title-subhead-h5 mb-16">
                            Общие данные
                          </h5>

                          <div className="pad-rl-16 mb-32">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="total-info">
                                  <ul className="info-list">
                                    <li>
                                      <span className="left">
                                        Номер заявки:
                                      </span>
                                      <span className="right">
                                        {request._getRequest.id}
                                      </span>
                                    </li>
                                    <li>
                                      <span className="left">
                                        Статус заявки:
                                      </span>
                                      <span className="right">
                                        {
                                          request._getRequestStatus.find(
                                            (t: ServiceCommon) =>
                                              t.id ===
                                              request._getRequest.request_status
                                          )?.name
                                        }
                                      </span>
                                    </li>
                                    <li>
                                      <span className="left">Организация:</span>
                                      <span className="right">
                                        {request._getRequest.client.longname}
                                      </span>
                                    </li>
                                    <li>
                                      <span className="left">БИН:</span>
                                      <span className="right">
                                        {request._getRequest.client.bin}
                                      </span>
                                    </li>
                                    <li>
                                      <span className="left">
                                        Категория деятельности:
                                      </span>
                                      <span className="right">
                                        {
                                          request._getClientTypes.find(
                                            (t: any) =>
                                              t.id ===
                                              request._getRequest.client
                                                .client_type
                                          )?.name
                                        }
                                      </span>
                                    </li>
                                    <li>
                                      <span className="left">Тип сервиса:</span>
                                      <span className="right">
                                        {
                                          request._getClientServiceType.find(
                                            (t: ServiceCommon) =>
                                              t.id ===
                                              request._getRequest.service_type
                                          )?.name
                                        }
                                      </span>
                                    </li>
                                    <li>
                                      <span className="left">
                                        Дата регистрации заявки:
                                      </span>
                                      <span className="right">
                                        {moment(
                                          request._getRequest.reg_date
                                        ).format("DD.MM.YYYY")}
                                      </span>
                                    </li>
                                    <li>
                                      <span className="left">
                                        Дата исполнения заявки:
                                      </span>
                                      <span className="right">
                                        {request._getRequest.fulfill_date &&
                                          moment(
                                            request._getRequest.fulfill_date
                                          ).format("DD.MM.YYYY")}
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>

                          <h5 className="title-subhead-h5 mb-16">Документы</h5>
                          <div className="files-added">
                            <ul className="files-list">
                              {request._getClientDocs &&
                                (request._getClientDocs as Documents[])
                                  .filter(
                                    (dd: Documents) =>
                                      (dd.doc_type === 1 &&
                                        dd.is_signed_by_both) ||
                                      (dd.doc_type === 8 &&
                                        dd.is_signed_by_agent) ||
                                      (dd.doc_type !== 1 &&
                                        dd.doc_type !== 8 &&
                                        dd.doc_type !== 9)
                                  )
                                  .map((d) => (
                                    <li>
                                      <i className="azla blank-alt-primary-icon"></i>
                                      <span
                                        onClick={() =>
                                          d && request.downloadDocument(d)
                                        }
                                      >
                                        {
                                          request._getTypes.find(
                                            (t: any) => t.id === d.doc_type
                                          )?.name
                                        }
                                      </span>
                                    </li>
                                  ))}
                            </ul>
                          </div>

                          <h5 className="title-subhead-h5 mb-16">
                            Ключи доступа
                          </h5>
                          <div className="d-flex">
                            {request.testKey && (
                              <button
                                type="button"
                                className="button btn-secondary mr-16"
                                onClick={() =>
                                  request.downloadKeys(request.testKey)
                                }
                              >
                                Скачать тестовые ключи
                              </button>
                            )}
                            {request.prodKey && (
                              <button
                                type="button"
                                className="button btn-secondary"
                                onClick={() =>
                                  request.downloadKeys(request.prodKey)
                                }
                              >
                                Скачать боевые ключи
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
});
export default SignersInner;
