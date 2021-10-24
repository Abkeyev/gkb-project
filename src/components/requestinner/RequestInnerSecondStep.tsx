import React from "react";
import { observer } from "mobx-react";
import {
  User,
  Client,
  ServiceCommon,
  AgreeResult,
  Result,
  Agree,
  Documents,
  Categories,
} from "../../api/Models/ServiceModels";
import { RequestInnerProps } from "./RequestInnerProps.props";

const RequestInnerSecondStep = ({ request, main }: RequestInnerProps) => {
  return (
    <div className="req-inner-body">
      <div className="tab-btn-content mb-32">
        <h3 className="title-subhead mb-16">Выберите тип договора</h3>
        <div className="tab-button mb-24">
          <span
            className={
              request._getRequest.is_model_contract
                ? "tab-btn active"
                : "tab-btn"
            }
            onClick={() => {
              if (request._getRequest.request_status === 2) {
                main.setModal(true);
                main.setModalType(3);
              }
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
              if (request._getRequest.request_status === 2) {
                main.setModal(true);
                main.setModalType(3);
              }
            }}
          >
            Нетиповой
          </span>
        </div>
        {request._getRequest.is_model_contract ? (
          <div className="mb-24">
            Типовой договор – договор, основанный на стандартном шаблоне
            договора ГКБ для контрагентов. Типовой договор не подразумевает
            изменения договора.
          </div>
        ) : (
          <div className="mb-24">
            Нетиповой договор – договор, основанный на шаблоне договора ГКБ для
            контрагентов. Нетиповой договор подразумевает изменения договора и
            требует согласования/подписания с обеих сторон.
          </div>
        )}
        {request._getRequest.is_model_contract && request._getDoc ? (
          <div
            className={`card-collapse tab-num-1 ${
              !request.signType ? "collapsed" : ""
            }`}
          >
            <div
              className={
                request._getRequest.request_stepper === 3
                  ? "card-collapse-header success"
                  : "card-collapse-header"
              }
            >
              <div className="collapsing-header">
                <h3
                  className={
                    request._getRequest.request_stepper === 3
                      ? "title-subhead mb-0 done-success"
                      : "title-subhead mb-0"
                  }
                >
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
                      onClick={() => request.downloadDocument(request._getDoc)}
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
                            src={process.env.PUBLIC_URL + "/images/def-ava.svg"}
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
                          {request._getRequest.request_status === 6 ||
                          request._getRequest.request_status === 7 ||
                          request._getRequest.request_status === 8 ||
                          request._getRequest.request_status === 10 ? (
                            <span className="btn-status done">Подписано</span>
                          ) : request._getRequest.request_status === 9 ? (
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
                            src={process.env.PUBLIC_URL + "/images/def-ava.svg"}
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
                          ) : request._getRequest.request_status === 6 &&
                            request._getRequest.manager_signer_user ===
                              main.clientData.user.id ? (
                            <div className="d-flex-align-c-spaceb">
                              <button
                                className="btn-status-signatory btn-icon active mr-16"
                                onClick={() =>
                                  request
                                    .signDocGkb(true)
                                    .then(() => (request.signType = true))
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
                          ) : request._getRequest.request_status === 9 ||
                            request._getRequest.request_status === 6 ? (
                            <button className="btn-status-signatory btn-icon not-active">
                              <i className="azla edit-white-icon"></i>
                              Подписать
                            </button>
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

              {request._getRequest.request_status === 2 && (
                <div className="collapse-footer">
                  <button
                    type="button"
                    className={`button btn-primary ${
                      request._getConSigner && request._getManSigner
                        ? ""
                        : "disabled"
                    }`}
                    onClick={() => request.toSign(true)}
                  >
                    Отправить на подписание
                  </button>
                </div>
              )}
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
                          request._getDoc &&
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

              <div className="collapse-content method-main">
                <div className="collapse-body">
                  <div className="method-signatory">
                    <div className="method-signatory-add">
                      {request._getReviews.length > 0
                        ? request._getReviews.map((a: AgreeResult) => (
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
                                                  (u: User) =>
                                                    u.id === s.user_id
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
                                                  (u: User) =>
                                                    u.id === s.user_id
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
                                        ) : main.clientData.user.id ===
                                          s.user_id ? (
                                          <div className="d-flex-align-c-spaceb">
                                            <button
                                              className="btn-status-signatory btn-icon active mr-16"
                                              onClick={() =>
                                                request.sendReviews(
                                                  main.clientData.user.id,
                                                  true,
                                                  ""
                                                )
                                              }
                                            >
                                              Согласовать
                                            </button>

                                            <button
                                              onClick={() => {
                                                main.setModal(true);
                                                main.setModalType(1);
                                              }}
                                              className="delete-signatory"
                                            ></button>
                                          </div>
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
                          ))
                        : request.agreeGroup.map((a: Agree, index: number) => (
                            <>
                              <div className="method-signatory-header">
                                <div className="left">
                                  <h4 className="collapse-text mb-8">
                                    Согласующие от ГКБ {index + 1}
                                  </h4>
                                  <p className="mb-0">
                                    {a.user_name.length} участников ·{" "}
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
                                      onClick={() =>
                                        (request.agreeGroup[index] = {
                                          ...request.agreeGroup[index],
                                          process_type: "Sequential",
                                        })
                                      }
                                    >
                                      Последовательный
                                    </span>
                                    <span
                                      className={`tab-btn ${
                                        a.process_type === "Parallel"
                                          ? "active"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        (request.agreeGroup[index] = {
                                          ...request.agreeGroup[index],
                                          process_type: "Parallel",
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
                                                process.env.PUBLIC_URL +
                                                "/images/def-ava.svg"
                                              }
                                            />
                                            <span className="name">
                                              {request._getAllUsers &&
                                                request._getAllUsers.find(
                                                  (u: User) => u.id === s
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
                                                  (u: User) => u.id === s
                                                )?.position
                                            )?.name}
                                        </span>
                                        <i
                                          onClick={() =>
                                            (request.agreeGroup[index] = {
                                              ...request.agreeGroup[index],
                                              user_name: request.agreeGroup[
                                                index
                                              ].user_name.filter(
                                                (u: number) => u !== s
                                              ),
                                            })
                                          }
                                          className="azla close-red-icon delete-if-icon "
                                        ></i>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                {request._getRequest.request_status === 2 &&
                                  request._getReviews.length === 0 && (
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
                          ))}
                    </div>
                    {request._getRequest.request_status === 2 &&
                      request._getReviews.length === 0 && (
                        <div
                          className="method-add-group"
                          onClick={() =>
                            (request.agreeGroup = [
                              ...request.agreeGroup,
                              {
                                user_name: [],
                                process_type: "Sequential",
                                process_number: request.agreeGroup.length + 1,
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

                {request._getRequest.request_status === 2 &&
                  request._getReviews.length === 0 && (
                    <div className="collapse-footer">
                      <button
                        type="button"
                        className={`button btn-primary`}
                        disabled={
                          request.agreeGroup.filter(
                            (g: Agree) => g.user_name.length > 0
                          ).length < 1
                        }
                        onClick={() =>
                          request.toReview(
                            request._getRequest.id,
                            request.agreeGroup
                          )
                        }
                      >
                        Отправить на согласование
                      </button>
                    </div>
                  )}
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
                          request._getDoc &&
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
                              <span className="btn-status not-active">
                                Не Подписано
                              </span>
                            ) : request._getRequest.request_status === 6 ||
                              request._getRequest.request_status === 7 ||
                              request._getRequest.request_status === 8 ||
                              request._getRequest.request_status === 10 ? (
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
                  {request._getManSigner ? (
                    (request._getManSigner as User) && (
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
                              ) : request._getRequest.request_status === 5 ? (
                                <i
                                  onClick={() =>
                                    request
                                      .updateRequest({
                                        manager_signer_user: null,
                                        client: request._getRequest.client.id,
                                      })
                                      .then(() => request.setManSigner(null))
                                  }
                                  className="azla close-red-icon delete-if-icon"
                                ></i>
                              ) : request._getRequest.request_status === 6 &&
                                request._getRequest.manager_signer_user ===
                                  main.clientData.user.id ? (
                                <div className="d-flex-align-c-spaceb">
                                  <button
                                    className="btn-status-signatory btn-icon active mr-16"
                                    onClick={() =>
                                      request
                                        .signDocGkb(true)
                                        .then(() => (request.signType = true))
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
                {request._getRequest.request_status === 5 && (
                  <div className="collapse-footer">
                    <button
                      type="button"
                      className={`button btn-primary ${
                        request._getConSigner && request._getManSigner
                          ? ""
                          : "disabled"
                      }`}
                      onClick={() => request.toSign()}
                    >
                      Отправить на подписание
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {!request._getRequest.is_model_contract && (
          <>
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
            {request._getDogovors && request._getDogovors.length === 0 ? (
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
                            if (request._getRequest.request_status === 2) {
                              main.setModal(true);
                              main.setModalType(2);
                              request.setTempDoc(d);
                            } else {
                              request.setDoc(d);
                            }
                          }}
                        >
                          <td>{d.doc_name}</td>
                          <td>{}</td>
                          <td>{d.comments}</td>
                          <td>{request._getRequest.client.longname}</td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            )}
          </>
        )}

        <h3 className="title-subhead mb-16">Документы организации</h3>
        {request._getDocCategories && request._getDocCategories.length === 0
          ? "Документы отсутствуют."
          : request._getDocCategories.map(
              (c: Categories) =>
                c.doc_type.filter((dt: any) => dt.file !== null).length > 0 && (
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
                                    d.file && request.downloadDocument(d.file)
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
    </div>
  );
};

export default observer(RequestInnerSecondStep);
