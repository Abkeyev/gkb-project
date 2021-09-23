import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link, useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import moment from "moment";
import {
  Agree,
  Categories,
  Client,
  ClientUsers,
  Documents,
  ServiceCommon,
  User,
} from "../api/Models/ServiceModels";
import { connection } from "../ncaLayer";

const RequestInner = observer((props: any) => {
  const history = useHistory();
  const { id } = props.match.params;
  const { main, request } = props;

  React.useEffect(() => {
    connection();
    request.getClientServiceType();
    request.getClients();
    request.getUsers();
    request.getRequest(id);
    request.getRequestStatus();
    request.getDocumentsCategories();
    request.getDocCategories();
    request.getClientTypes();
  }, []);

  return (
    <div className="main-body">
      {request._getRequest && (
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="req-manager-inner p-16-50 pad-b-128">
                <div className="req-inner-header">
                  <div className="back-breadcrumbs">
                    <Link to="/" className="back">
                      <i className="azla arrow-left-icon"></i> Назад
                    </Link>
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

                  {main.decline && (
                    <div className="mess-card alert-mess mb-32 col-md-8">
                      <h5>Заявка отклонена</h5>
                      <p>Причина: {main.declineReason}</p>
                    </div>
                  )}

                  <div className="status-bar">
                    <ul className="step-progressbar">
                      <li
                        className={`step-item ${
                          request.request_stepper === 1
                            ? "step-item-active"
                            : "step-item-complete"
                        }`}
                        onClick={() => request.setStep(1)}
                      >
                        Проверка
                      </li>
                      <li
                        className={`step-item ${
                          request.request_stepper === 2
                            ? "step-item-active"
                            : request.request_stepper > 2
                            ? "step-item-complete"
                            : ""
                        }`}
                        onClick={() => request.setStep(2)}
                      >
                        Подписание
                        <br />
                        договора
                      </li>
                      <li
                        className={`step-item ${
                          request.request_stepper === 3
                            ? "step-item-active"
                            : request.request_stepper > 3
                            ? "step-item-complete"
                            : ""
                        }`}
                        onClick={() => request.setStep(3)}
                      >
                        Форма
                        <br />
                        доступа
                      </li>
                      <li
                        className={`step-item ${
                          request.request_stepper === 4
                            ? "step-item-active"
                            : request.request_stepper > 4
                            ? "step-item-complete"
                            : ""
                        }`}
                        onClick={() => request.setStep(4)}
                      >
                        Тестирование
                      </li>
                      <li
                        className={`step-item ${
                          request.request_stepper === 5
                            ? "step-item-active"
                            : request.request_stepper > 5
                            ? "step-item-complete"
                            : ""
                        }`}
                        onClick={() => request.setStep(5)}
                      >
                        Готово
                      </li>
                    </ul>
                  </div>
                </div>

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
                                  {request._getManUser.full_name}{" "}
                                  <span
                                    className="edit"
                                    onClick={() => {
                                      main.setModalType(0);
                                      main.setModal(true);
                                    }}
                                  >
                                    <i className="azla edit-primary-icon ml-8"></i>
                                  </span>
                                </span>
                              </li>
                            )}
                            <li>
                              <span className="left">Организация:</span>
                              <span className="right">
                                <span className="pre-primary-color">
                                  {request._getClient &&
                                    request._getClient.longname}
                                </span>
                              </span>
                            </li>
                            <li>
                              <span className="left">БИН:</span>
                              <span className="right">
                                {request._getClient && request._getClient.bin}
                              </span>
                            </li>
                            <li>
                              <span className="left">
                                Категория деятельности:
                              </span>
                              <span className="right">
                                {request._getRequest.service_category}
                              </span>
                            </li>
                            <li>
                              <span className="left">Тип сервиса:</span>
                              <span className="right">
                                {request._getRequest.service_type}
                              </span>
                            </li>
                            <li>
                              <span className="left">
                                Дата регистрации заявки:
                              </span>
                              <span className="right">
                                {moment(request._getRequest.reg_date).format(
                                  "MM.DD.YYYY"
                                )}
                              </span>
                            </li>
                            <li>
                              <span className="left">
                                Дата исполнения заявки:
                              </span>
                              <span className="right">
                                {moment(
                                  request._getRequest.fulfill_date
                                ).format("MM.DD.YYYY")}
                              </span>
                            </li>
                          </ul>
                        </div>
                        <h3 className="title-subhead mb-16">
                          Документы контрагента
                        </h3>
                        {request.getDocCategories().map(
                          (c: Categories) =>
                            c.documents.length > 0 && (
                              <>
                                <h5 className="title-subhead-h5 mb-16">
                                  {c.name}
                                </h5>
                                <div className="files-added">
                                  <ul className="files-list">
                                    {c.documents.map((d: Documents) => (
                                      <li>
                                        <i className="azla blank-alt-primary-icon"></i>
                                        <span
                                          onClick={() =>
                                            request.downloadDocument(
                                              d.id,
                                              d.doc_name
                                            )
                                          }
                                        >
                                          {d.doc_name}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </>
                            )
                        )}
                      </div>
                    </TabPanel>

                    <TabPanel>
                      <div className="tab-content tab-1">
                        <h3 className="title-subhead mb-16">
                          {request._getClientUsers.length} заявленных
                          пользователей
                        </h3>

                        {request._getClientUsers.map(
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
                                          <span className="right">{u.id}</span>
                                        </li>
                                        <li>
                                          <span className="left">
                                            ИИН сотрудника:
                                          </span>
                                          <span className="right">{u.iin}</span>
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
                      </div>
                    </TabPanel>
                  </Tabs>
                ) : request.step === 2 ? (
                  <div className="req-inner-body">
                    <div className="tab-btn-content mb-32">
                      <h3 className="title-subhead mb-16">
                        Выберите тип договора
                      </h3>
                      <div className="tab-button mb-24">
                        <span
                          className={
                            request._getRequest.is_model_contract
                              ? "tab-btn active"
                              : "tab-btn"
                          }
                          onClick={() => {
                            main.setModal(true);
                            main.setModalType(3);
                          }}
                        >
                          Типовой
                        </span>
                        <span
                          className={
                            !request._getRequest.is_model_contract
                              ? "tab-btn active"
                              : "tab-btn"
                          }
                          onClick={() => {
                            main.setModal(true);
                            main.setModalType(3);
                          }}
                        >
                          Нетиповой
                        </span>
                      </div>
                      {!request._getRequest.is_model_contract &&
                      !request.agreementPar ? (
                        <>
                          <div className="d-flex-align-c-spaceb mb-32">
                            <h3 className="title-subhead">
                              История изменения договора{" "}
                              <span className="number">
                                {
                                  (request._getDocuments as Documents[]).filter(
                                    (d: Documents) =>
                                      d.doc_category === 2 &&
                                      d.doc_type === 3 &&
                                      d.is_draft
                                  ).length
                                }
                              </span>
                            </h3>
                            <label
                              // type="button"
                              className="button btn-secondary"
                            >
                              <input
                                type="file"
                                onClick={(e) =>
                                  request.addDocument(
                                    request._getRequest.client,
                                    e
                                  )
                                }
                                style={{ display: "none" }}
                              />
                              Загрузить договор
                            </label>
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
                              {(request._getDocuments as Documents[])
                                .filter(
                                  (d: Documents) =>
                                    d.doc_category === 2 && d.doc_type === 3
                                )
                                .map((d: Documents) => (
                                  <tr
                                    onClick={() => {
                                      main.setModal(true);
                                      main.setModalType(2);
                                      request.setDoc(d);
                                    }}
                                  >
                                    <td>{d.doc_name}</td>
                                    <td>{}</td>
                                    <td>{d.comments}</td>
                                    <td>{d.client}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </>
                      ) : request.agreementPar ? (
                        <>
                          <div
                            className={`card-collapse tab-num-2 two-signatory ${
                              request.signTwoStep > 2 ? "collapsed" : ""
                            }`}
                          >
                            {/* При сворачивании дается класс "collapsed" */}
                            <div
                              className={`card-collapse-header ${
                                request.signTwoStep > 2 ? "success" : ""
                              }`}
                            >
                              {/* Если все ОКЕЙ то заменяется текст на "Договор подписан" и дается класс "success" */}
                              <div className="collapsing-header">
                                <h3
                                  className={
                                    request.signTwoStep > 2
                                      ? "title-subhead mb-0 done-success"
                                      : "title-subhead mb-0"
                                  }
                                >
                                  {request.signTwoStep > 2
                                    ? "Договор согласован"
                                    : "На согласование: “Договор №314 - вер. 24 от 24 июня"}
                                </h3>
                                <span
                                  className="btn-collapse"
                                  onClick={() => {
                                    request.setStep2(!request.step2);
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
                                          request._getDoc.id
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
                                    {request.agreeGroup.map(
                                      (a: Agree, index: number) => (
                                        <>
                                          <div className="method-signatory-header">
                                            <div className="left">
                                              <h4 className="collapse-text mb-8">
                                                Согласующие от ГКБ 1
                                              </h4>
                                              <p className="mb-0">
                                                {a.user_name.length} участников
                                                ·{" "}
                                                {a.process_type === "Sequential"
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
                                                  onClick={() =>
                                                    (request.agreeGroup[index] =
                                                      {
                                                        ...request.agreeGroup[
                                                          index
                                                        ],
                                                        process_type:
                                                          "Sequential",
                                                      })
                                                  }
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
                                                  onClick={() =>
                                                    (request.agreeGroup[index] =
                                                      {
                                                        ...request.agreeGroup[
                                                          index
                                                        ],
                                                        process_type:
                                                          "Parallel",
                                                      })
                                                  }
                                                >
                                                  Параллельный
                                                </span>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="method-add-user">
                                            <div className="method-add-users">
                                              <ul className="method-list-users">
                                                {a.user_name.map((s) => (
                                                  <li>
                                                    <div className="left">
                                                      <i className="azla arrow-primary-down-up grab"></i>
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
                                                                u.id === s
                                                            )?.full_name}
                                                        </span>
                                                      </div>
                                                    </div>
                                                    <span className="position">
                                                      {request._getAllUsers &&
                                                        request._getAllUsers.find(
                                                          (u: User) =>
                                                            u.id === s
                                                        )?.position}
                                                    </span>

                                                    {request.signTwoStep ===
                                                    1 ? (
                                                      <span
                                                        className="btn-status not-active"
                                                        onClick={() => {
                                                          request.setSignTwoStep(
                                                            2
                                                          );
                                                        }}
                                                      >
                                                        Не согласовано
                                                      </span>
                                                    ) : request.signTwoStep ===
                                                      2 ? (
                                                      <span
                                                        className="btn-status done"
                                                        onClick={() => {
                                                          request.setSignTwoStep(
                                                            3
                                                          );
                                                        }}
                                                      >
                                                        Согласовано
                                                      </span>
                                                    ) : request.signTwoStep ===
                                                      4 ? (
                                                      <span
                                                        className="btn-status canceled"
                                                        onClick={() =>
                                                          request.setSignTwoStep(
                                                            4
                                                          )
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
                                            {request.signTwoStep === 0 && (
                                              <span
                                                className="add-btn pad-l-56 pad-b-24"
                                                onClick={() => {
                                                  main.setModal(true);
                                                  main.setModalType(4);
                                                  request.requestId = index;
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
                                      )
                                    )}
                                  </div>
                                  {request.signTwoStep === 0 && (
                                    <div
                                      className="method-add-group"
                                      onClick={() =>
                                        (request.agreeGroup = [
                                          ...request.agreeGroup,
                                          {
                                            user_name: [],
                                            process_type: "Sequential",
                                            process_number: 0,
                                          },
                                        ])
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

                              {request.signTwoStep === 0 && (
                                <div className="collapse-footer">
                                  <button
                                    type="button"
                                    className={`button btn-primary ${
                                      request.agreeGroup.length < 2
                                        ? "disabled"
                                        : ""
                                    }`}
                                    onClick={() => request.setSignTwoStep(1)}
                                  >
                                    Отправить на согласование
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          <div
                            className={`card-collapse tab-num-1 ${
                              request.signTwoStep === 6 ? "collapsed " : ""
                            } ${request.signTwoStep < 3 ? "disabled" : ""}`}
                          >
                            {/* При сворачивании дается класс "collapsed" */}
                            <div
                              className={
                                request.signTwoStep === 6
                                  ? "card-collapse-header success"
                                  : "card-collapse-header"
                              }
                            >
                              {/* Если все ОКЕЙ то заменяется текст на "Договор подписан" и дается класс "success" */}
                              <div className="collapsing-header">
                                <h3
                                  className={
                                    request.signTwoStep === 6
                                      ? "title-subhead mb-0 done-success"
                                      : "title-subhead mb-0"
                                  }
                                >
                                  {/* При сворачивании дается класс "collapsed" текст стоит "Договор на подписании" */}
                                  {request.signTwoStep === 6
                                    ? "Договор подписан"
                                    : "На подписание: “Договор №314 - вер. 24 от 24 июня"}
                                </h3>
                                <span className="btn-collapse">
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
                                          request._getDoc.id
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
                                {request._getManSigner &&
                                  (request._getManSigner as User) && (
                                    <div className="collapse-signatory mb-24">
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
                                              {request._getManSigner.position}
                                            </p>
                                            {request.signTwoStep === 4 ? (
                                              <span
                                                className="btn-status not-active"
                                                onClick={() =>
                                                  request.setSignTwoStep(5)
                                                }
                                              >
                                                Не Подписано
                                              </span>
                                            ) : request.signTwoStep === 5 ? (
                                              <span className="btn-status done">
                                                Подписано
                                              </span>
                                            ) : request.signTwoStep === 6 ? (
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
                                  )}
                                {request._getConSigner &&
                                  (request._getConSigner as User) && (
                                    <div className="collapse-signatory">
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
                                              {request._getConSigner.position}
                                            </p>
                                            {/* <i className="azla close-red-icon delete-if-icon"></i> */}

                                            {request.signTwoStep === 4 ? (
                                              <button className="btn-status-signatory btn-icon not-active">
                                                <i className="azla edit-white-icon"></i>
                                                Подписать
                                              </button>
                                            ) : request.signTwoStep === 5 ? (
                                              <button
                                                className="btn-status-signatory btn-icon active"
                                                onClick={() => {
                                                  request.setModal(true);
                                                  request.setModalType(12);
                                                }}
                                              >
                                                <i className="azla edit-white-icon"></i>
                                                Подписать
                                              </button>
                                            ) : request.signTwoStep === 6 ? (
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
                                  )}
                              </div>

                              {request.signTwoStep === 3 && (
                                <div className="collapse-footer">
                                  <button
                                    type="button"
                                    className={`button btn-primary`}
                                    onClick={() => request.setSignTwoStep(4)}
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
                            request.step1 ? "collapsed" : ""
                          }`}
                        >
                          {/* При сворачивании дается класс "collapsed" */}
                          <div
                            className={
                              request.signStep === 3
                                ? "card-collapse-header success"
                                : "card-collapse-header"
                            }
                          >
                            {/* Если все ОКЕЙ то заменяется текст на "Договор подписан" и дается класс "success" */}
                            <div className="collapsing-header">
                              <h3
                                className={
                                  request.signStep === 3
                                    ? "title-subhead mb-0 done-success"
                                    : "title-subhead mb-0"
                                }
                              >
                                {/* При сворачивании дается класс "collapsed" текст стоит "Договор на подписании" */}
                                {request.signStep === 3
                                  ? "Договор подписан"
                                  : "На подписание: “Договор №314 - вер. 24 от 24 июня"}
                              </h3>
                              <span
                                className="btn-collapse"
                                onClick={() => request.setStep1(!request.step1)}
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
                                    onClick={
                                      () => {}
                                      // request._getRequest &&
                                      // request._getRequest.client_doc.length >
                                      //   0 &&
                                      // request._getRequest.client_doc[0] > 0 &&
                                      // request.downloadDocument(
                                      //   request._getRequest.client_doc[0]
                                      // )
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
                              {request._getManSigner &&
                                (request._getManSigner as User) && (
                                  <div className="collapse-signatory mb-24">
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
                                            {request._getManSigner.position}
                                          </p>
                                          {request.signStep === 1 ? (
                                            <span
                                              className="btn-status not-active"
                                              onClick={() =>
                                                request.setSignStep(2)
                                              }
                                            >
                                              Не Подписано
                                            </span>
                                          ) : request.signStep === 2 ? (
                                            <span className="btn-status done">
                                              Подписано
                                            </span>
                                          ) : request.signStep === 3 ? (
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
                                )}
                              {request._getConSigner ? (
                                (request._getConSigner as User) && (
                                  <div className="collapse-signatory">
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
                                            {request._getConSigner.position}
                                          </p>
                                          {/* <i className="azla close-red-icon delete-if-icon"></i> */}

                                          {request.signStep === 1 ? (
                                            <button className="btn-status-signatory btn-icon not-active">
                                              <i className="azla edit-white-icon"></i>
                                              Подписать
                                            </button>
                                          ) : request.signStep === 2 ? (
                                            <button
                                              className="btn-status-signatory btn-icon active"
                                              onClick={() => {
                                                main.setModal(true);
                                                main.setModalType(12);
                                              }}
                                            >
                                              <i className="azla edit-white-icon"></i>
                                              Подписать
                                            </button>
                                          ) : request.signStep === 3 ? (
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
                                )
                              ) : (
                                <div className="method-add-group pad-l-0">
                                  <span
                                    className="add-btn"
                                    onClick={() => {
                                      main.setModal(true);
                                      main.setModalType(6);
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

                            {request.signStep === 0 && (
                              <div className="collapse-footer">
                                <button
                                  type="button"
                                  className={`button btn-primary ${
                                    request._getConSigner &&
                                    request._getManSigner
                                      ? ""
                                      : "disabled"
                                  }`}
                                  onClick={
                                    () => request.setSignStep(1)
                                    // request._getDoc &&
                                    // request.toReview(request._getDoc.id)
                                  }
                                >
                                  Отправить на подписание
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <h3 className="title-subhead mb-16">
                        Документы контрагента
                      </h3>
                      {request.getDocCategories().map(
                        (c: Categories) =>
                          c.documents.length > 0 && (
                            <>
                              <h5 className="title-subhead-h5 mb-16">
                                {c.name}
                              </h5>
                              <div className="files-added">
                                <ul className="files-list">
                                  {c.documents.map((d: Documents) => (
                                    <li>
                                      <i className="azla blank-alt-primary-icon"></i>
                                      <span
                                        onClick={() =>
                                          request.downloadDocument(
                                            d.id,
                                            d.doc_name
                                          )
                                        }
                                      >
                                        {d.doc_name}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </>
                          )
                      )}
                    </div>
                  </div>
                ) : request.step === 3 ? (
                  <>
                    {request._getClientUsers.map(
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
                                      <span className="right">{u.id}</span>
                                    </li>
                                    <li>
                                      <span className="left">
                                        ИИН сотрудника:
                                      </span>
                                      <span className="right">{u.iin}</span>
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
                                      <span className="right">{u.email}</span>
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
                                      <span className="left">Заместитель:</span>
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
                                <div className="keys-loader mb-32">
                                  <h5>
                                    Тестовые ключи не предоставлены. Ожидайте.
                                  </h5>
                                  <p>
                                    Ключи предоставляются департаментом Service
                                    Desk после проверки всех данных контрагента.
                                    Это занимает 2-7 дней с момента принятия
                                    формы доступа менеджером.
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
                ) : request.step === 5 ? (
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
                                    <span className="right">
                                      {request._getRequest.id}
                                    </span>
                                  </li>
                                  <li>
                                    <span className="left">Статус заявки:</span>
                                    <span className="right">
                                      {request._getRequest.request_status}
                                    </span>
                                  </li>
                                  <li>
                                    <span className="left">Организация:</span>
                                    <span className="right">
                                      {main.clientData.client.longname}
                                    </span>
                                  </li>
                                  <li>
                                    <span className="left">БИН:</span>
                                    <span className="right">
                                      {main.clientData.client.bin}
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
                                            main.clientData.client.client_type
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
                                      ).format("MM.DD.YYYY")}
                                    </span>
                                  </li>
                                  <li>
                                    <span className="left">
                                      Дата исполнения заявки:
                                    </span>
                                    <span className="right">
                                      {moment(
                                        request._getRequest.fulfill_date
                                      ).format("MM.DD.YYYY")}
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

                        <h5 className="title-subhead-h5 mb-16">
                          Ключи доступа
                        </h5>
                        <div className="d-flex">
                          <button
                            type="button"
                            className="button btn-secondary mr-16"
                          >
                            Скачать тестовые ключи
                          </button>
                          <button
                            type="button"
                            className="button btn-secondary"
                          >
                            Скачать боевые ключи
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div className="req-inner-footer">
                  <div className="container">
                    {request._getManUser &&
                    request._getRequest.request_stepper === 1 ? (
                      <div className="manager-req mrl-32">
                        <div className="left">
                          <p>Менеджер заявки</p>
                          <div className="profile">
                            <img
                              alt="ava"
                              className="ava"
                              src={
                                process.env.PUBLIC_URL + "/images/def-ava.svg"
                              }
                            />
                            <span className="name">
                              {request._getManUser.full_name}
                            </span>
                          </div>
                        </div>

                        {main.decline ? (
                          <div className="right alert">
                            <p>Заявка отклонена</p>
                            <button
                              className="button btn-secondary"
                              onClick={() => {
                                main.decline = false;
                                main.declineReason = "";
                                history.push("/");
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
                                main.setModal(true);
                                main.setModalType(1);
                              }}
                            >
                              Нет
                            </button>
                            <button
                              className="button btn-primary"
                              onClick={() =>
                                request.nextRequest(request._getRequest)
                              }
                            >
                              Да, успешно
                            </button>
                          </div>
                        )}
                      </div>
                    ) : request._getRequest.request_stepper === 1 &&
                      request.step === 1 ? (
                      <button
                        type="button"
                        onClick={() => {
                          main.setModalType(0);
                          main.setModal(true);
                        }}
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
      )}
    </div>
  );
});
export default RequestInner;
