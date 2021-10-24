import React from "react";
import { observer } from "mobx-react";
import { PartnersProps } from "../partners/PartnersProps.props";
import {
  User,
  Client,
  ServiceCommon,
  AgreeResult,
  Result,
  Documents,
  Categories,
} from "../../api/Models/ServiceModels";

const PartnersInnerSecondStep = ({ main, request }: PartnersProps) => {
  return (
    <>
      <div className="req-inner-body">
        <div className="tab-btn-content mb-32">
          {request._getRequest.is_model_contract && request._getDoc ? (
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
                    onClick={() => (request.signType = !request.signType)}
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
                          request.downloadDocument(request._getDoc)
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
                            src={process.env.PUBLIC_URL + "/images/def-ava.svg"}
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
                  {request._getConSigner && (request._getConSigner as User) && (
                    <div className="collapse-signatory mb-24">
                      <h4 className="collapse-text">
                        Подписант от{" "}
                        {request._getClients &&
                          request._getClients.find(
                            (t: Client) => t.id === request._getConSigner.client
                          )?.longname}
                      </h4>
                      <div className="signatory-profile">
                        <div className="col-md-6">
                          <div className="profile">
                            <img
                              alt="ava"
                              className="ava"
                              src={
                                process.env.PUBLIC_URL + "/images/def-ava.svg"
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
                                    t.id === request._getConSigner.position
                                )?.name
                              }
                            </p>

                            {request._getRequest.request_status === 9 ? (
                              <div className="d-flex-align-c-spaceb">
                                <button
                                  className="btn-status-signatory btn-icon active mr-16"
                                  onClick={() => request.getBase64()}
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
                            ) : request._getRequest.request_status === 6 ||
                              request._getRequest.request_status === 7 ||
                              request._getRequest.request_status === 10 ||
                              request._getRequest.request_status === 8 ? (
                              <span className="btn-status done">Подписано</span>
                            ) : request._getRequest.request_status === 4 ? (
                              <button
                                className="btn-status canceled btn-status-icon"
                                style={{ border: 0 }}
                                onClick={() => {
                                  main.setModal(true);
                                  main.setModalType(5);
                                }}
                              >
                                Отклонено
                                <i className="azla chat-icon-danger"></i>
                              </button>
                            ) : (
                              ""
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
                            (t: Client) => t.id === request._getManSigner.client
                          )?.longname}
                      </h4>

                      <div className="signatory-profile">
                        <div className="col-md-6">
                          <div className="profile">
                            <img
                              alt="ava"
                              className="ava"
                              src={
                                process.env.PUBLIC_URL + "/images/def-ava.svg"
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
                                    t.id === request._getManSigner.position
                                )?.name
                              }
                            </p>

                            {request._getRequest.request_stepper > 2 ? (
                              <span className="btn-status done">Подписано</span>
                            ) : request._getRequest.request_status === 4 ? (
                              <button
                                className="btn-status canceled btn-status-icon"
                                style={{ border: 0 }}
                                onClick={() => {
                                  main.setModal(true);
                                  main.setModalType(5);
                                }}
                              >
                                Отклонено
                                <i className="azla chat-icon-danger"></i>
                              </button>
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
          ) : !request._getRequest.is_model_contract && request._getDoc ? (
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
                        request._getRequest.request_stepper === 3 ||
                        request._getRequest.request_status === 5 ||
                        request._getRequest.request_status === 6 ||
                        request._getRequest.request_status === 7 ||
                        request._getRequest.request_status === 8 ||
                        request._getRequest.request_status === 9 ||
                        request._getRequest.request_status === 10
                          ? "title-subhead mb-0 done-success"
                          : "title-subhead mb-0"
                      }
                    >
                      {request._getRequest.request_stepper === 3 ||
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
                        (request.agreeNotType = !request.agreeNotType)
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
                            request.downloadDocument(request._getDoc)
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
                                process.env.PUBLIC_URL + "/images/def-ava.svg"
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
                        {request._getReviews.map((a: AgreeResult) => (
                          <>
                            <div className="method-signatory-header">
                              <div className="left">
                                <h4 className="collapse-text mb-8">
                                  Согласующие от ГКБ {a.process_number}
                                </h4>
                                <p className="mb-0">
                                  {a.review_data.length} участников ·{" "}
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
                                      a.process_type === "Sequential"
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    Последовательный
                                  </span>
                                  <span
                                    className={`tab-btn ${
                                      a.process_type === "Parallel"
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
                                  {a.review_data.map((s: Result) => (
                                    <li>
                                      <div className="left">
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
                                            {request._getAllUsers &&
                                              request._getAllUsers.find(
                                                (u: User) => u.id === s.user_id
                                              )?.full_name}
                                          </span>
                                        </div>
                                      </div>
                                      <span className="position">
                                        {request._getAllUsers &&
                                          request._getPosition.find(
                                            (t: ServiceCommon) =>
                                              t.id ===
                                              request._getAllUsers.find(
                                                (u: User) => u.id === s.user_id
                                              )?.position
                                          )?.name}
                                      </span>

                                      {s.is_approved !== null &&
                                      !s.is_approved ? (
                                        <button
                                          className="btn-status canceled btn-status-icon"
                                          style={{ border: 0 }}
                                          onClick={() => {
                                            main.setModal(true);
                                            main.setModalType(25);
                                          }}
                                        >
                                          Отклонено
                                          <i className="azla chat-icon-danger"></i>
                                        </button>
                                      ) : s.is_approved ? (
                                        <span className="btn-status done">
                                          Согласовано
                                        </span>
                                      ) : (
                                        <span className="btn-status not-active">
                                          Не согласовано
                                        </span>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </>
                        ))}
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
                          request._getRequest.request_status !== 7 &&
                          request._getRequest.request_status !== 13
                        )
                          request.signNotType = !request.signNotType;
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
                            request.downloadDocument(request._getDoc)
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
                                process.env.PUBLIC_URL + "/images/def-ava.svg"
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
                    {request._getConSigner && (request._getConSigner as User) && (
                      <div className="collapse-signatory mb-24">
                        <h4 className="collapse-text">
                          Подписант от{" "}
                          {request._getClients &&
                            request._getClients.find(
                              (t: Client) =>
                                t.id === request._getConSigner.client
                            )?.longname}
                        </h4>
                        <div className="signatory-profile">
                          <div className="col-md-6">
                            <div className="profile">
                              <img
                                alt="ava"
                                className="ava"
                                src={
                                  process.env.PUBLIC_URL + "/images/def-ava.svg"
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
                                      t.id === request._getConSigner.position
                                  )?.name
                                }
                              </p>
                              {request._getRequest.request_status === 9 ? (
                                <div className="d-flex-align-c-spaceb">
                                  <button
                                    className="btn-status-signatory btn-icon active mr-16"
                                    onClick={() => request.getBase64()}
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
                              ) : request._getRequest.request_status === 6 ||
                                request._getRequest.request_status === 7 ||
                                request._getRequest.request_status === 8 ||
                                request._getRequest.request_status === 10 ? (
                                <span className="btn-status done">
                                  Подписано
                                </span>
                              ) : request._getRequest.request_status === 4 ? (
                                <button
                                  className="btn-status canceled btn-status-icon"
                                  style={{ border: 0 }}
                                  onClick={() => {
                                    main.setModal(true);
                                    main.setModalType(5);
                                  }}
                                >
                                  Отклонено
                                  <i className="azla chat-icon-danger"></i>
                                </button>
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
                    {request._getManSigner && (request._getManSigner as User) && (
                      <div className="collapse-signatory">
                        <h4 className="collapse-text">
                          Подписант от{" "}
                          {request._getClients &&
                            request._getClients.find(
                              (t: Client) =>
                                t.id === request._getManSigner.client
                            )?.longname}
                        </h4>

                        <div className="signatory-profile">
                          <div className="col-md-6">
                            <div className="profile">
                              <img
                                alt="ava"
                                className="ava"
                                src={
                                  process.env.PUBLIC_URL + "/images/def-ava.svg"
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
                                      t.id === request._getManSigner.position
                                  )?.name
                                }
                              </p>
                              {request._getRequest.request_stepper > 2 ? (
                                <span className="btn-status done">
                                  Подписано
                                </span>
                              ) : request._getRequest.request_status === 6 ||
                                request._getRequest.request_status === 9 ? (
                                <span className="btn-status not-active">
                                  Не Подписано
                                </span>
                              ) : request._getRequest.request_status === 4 ? (
                                <button
                                  className="btn-status canceled btn-status-icon"
                                  style={{ border: 0 }}
                                  onClick={() => {
                                    main.setModal(true);
                                    main.setModalType(5);
                                  }}
                                >
                                  Отклонено
                                  <i className="azla chat-icon-danger"></i>
                                </button>
                              ) : (
                                ""
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
            <button
              type="button"
              className="button btn-secondary"
              onClick={() => {
                main.setModal(true);
                main.setModalType(14);
              }}
            >
              Загрузить договор
            </button>
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
          <h3 className="title-subhead mb-16">Документы организации</h3>
          {request._getDocCategories &&
            (request._getDocCategories.length === 0
              ? "Документы отсутствуют."
              : request._getDocCategories.map(
                  (c: Categories) =>
                    c.doc_type.filter((dt: any) => dt.file !== null).length >
                      0 && (
                      <>
                        <h5 className="title-subhead-h5 mb-16">{c.name}</h5>
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
                                        request.downloadDocument(d.file)
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
    </>
  );
};

export default observer(PartnersInnerSecondStep);
