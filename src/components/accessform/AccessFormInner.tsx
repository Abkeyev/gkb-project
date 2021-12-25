import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link, useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import { Modal } from "../../containers";
import RequestInnerFirstStep from "../../components/requestinner/RequestInnerFirstStep";
import RequestInnerSecondStep from "../../components/requestinner/RequestInnerSecondStep";
import RequestInnerThirdStep from "../../components/requestinner/RequestInnerThirdStep";
import RequestInnerFourthStep from "../../components/requestinner/RequestInnerFourthStep";
import RequestInnerFifthStep from "../../components/requestinner/RequestInnerFifthStep";
import RequestInnerFooter from "../../components/requestinner/RequestInnerFooter";
import AccessFormInnerStatusBar from "../../components/accessform/AccessFormInnerStatusBar";
import {
  Client,
  ClientUserAccess,
  ClientUserService,
  Documents,
  Right,
  ServiceCommon,
} from "../../api/Models/ServiceModels";
import moment from "moment";

const AccessFormInner = observer((props: any) => {
  const history = useHistory();
  const { main, request } = props;
  const { id } = props.match.params;

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
    request.getRights();
    request.getPosition();
    request.getSigners(main.clientData.client.id);
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
                  <div className="req-inner-header pad-t-64">
                    <h1 className="title-main mb-32">
                      Форма доступа №{request._getRequest.id}
                    </h1>
                    <AccessFormInnerStatusBar main={main} request={request} />
                  </div>
                  {main.role === "Service Desk" &&
                    request._getRequest.request_status === 1 &&
                    request._getRequest.request_stepper === 1 && (
                      <div className="mess-card mb-32 col-md-8">
                        Назначьте менеджера заявки.
                      </div>
                    )}

                  {request.step === 1 ? (
                    <div className="req-inner-body">
                      <h3 className="title-subhead mb-16">Общие данные</h3>
                      <div className="total-info mb-32">
                        <ul className="info-list">
                          {/* Тут сначала надо назначить и после футер уходит, это появляется */}
                          {request._getManUser && (
                            <li>
                              <span className="left">Менеджер заявки:</span>
                              <span className="right d-flex">
                                {request._getManUser.full_name}{" "}
                                {request._getRequest.request_stepper === 1 && (
                                  <span
                                    className="edit"
                                    onClick={() => {
                                      main.setModalType(0);
                                      main.setModal(true);
                                    }}
                                  >
                                    <i className="azla edit-primary-icon ml-8"></i>
                                  </span>
                                )}
                              </span>
                            </li>
                          )}
                          <li>
                            <span className="left">Номер заявки:</span>
                            <span className="right">
                              {request._getRequest.id}
                            </span>
                          </li>
                          <li>
                            <span className="left">Статус заявки:</span>
                            <span className="right">Нераспределено</span>
                          </li>

                          <li>
                            <span className="left">Организация:</span>
                            <span className="right">
                              <span className="pre-primary-color">
                                <Link
                                  to={`/contractors/${request._getRequest.client.id}`}
                                >
                                  {request._getRequest.client.longname}
                                </Link>
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
                              {
                                request._getClientTypes.find(
                                  (t: any) =>
                                    t.id ===
                                    request._getRequest.client.client_type
                                )?.name
                              }
                            </span>
                          </li>
                          <li>
                            <span className="left">Сервис:</span>
                            <span className="right">
                              <span className="services-type">
                                {request._getRequest.service_category === 1
                                  ? "ЕСБД"
                                  : "БДКИ"}
                              </span>
                              {
                                request._getClientServiceType.find(
                                  (t: ServiceCommon) =>
                                    t.id === request._getRequest.service_type
                                )?.name
                              }
                            </span>
                          </li>
                          <li>
                            <span className="left">
                              Договор-основание по сервису:
                            </span>
                            <span className="right">
                              <span className="link-file">
                                {console.log(request._getClientDocs)}
                                Договор №3424 по Изъятию данных ТООЛомбард.pdf
                              </span>
                            </span>
                          </li>
                          <li>
                            <span className="left">
                              Дата регистрации заявки:
                            </span>
                            <span className="right">
                              {moment(request._getRequest.reg_date).format(
                                "DD.MM.YYYY в HH:mm"
                              )}
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
                                  ).format("DD.MM.YYYY в HH:mm")
                                : "-"}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <h3 className="title-subhead mb-8">
                        Пользователи услуг{" "}
                        <span className="number">
                          {request._getClientUsers &&
                            request._getClientUsers.length}
                        </span>
                      </h3>
                      <p className="mb-24">
                        Пользователи организации, которые имеют доступ к
                        сервисам БДКИ и ЕСБД
                      </p>

                      {/* Начало карточки */}
                      {request._getClientUsers.map(
                        (u: ClientUserAccess, index: number) => (
                          <div className="card card-rights mb-24 pad-24">
                            <div className="card-header">
                              <div className="card-header-rights">
                                <div className="left">
                                  <span className="num">№ {index + 1}</span>
                                  <h6
                                    className="text"
                                    onClick={() => {
                                      main.setModal(true);
                                      main.setModalType(28);
                                      main.setModalTypeData(u);
                                    }}
                                  >
                                    {u.full_name}
                                  </h6>
                                </div>
                                <div className="right">
                                  <span className="use-service">
                                    Использует{" "}
                                    {
                                      request._getClientUserService.find(
                                        (t: ClientUserService) =>
                                          t.client_user_data.id === u.id
                                      )?.service_count
                                    }{" "}
                                    сервиса
                                  </span>
                                </div>
                              </div>
                              <p className="desc">
                                {
                                  request._getPosition.find(
                                    (t: ServiceCommon) =>
                                      t.id === +u.position_name
                                  )?.name
                                }{" "}
                                – {u.department_name} –
                                {request._getClients &&
                                  request._getClients.find(
                                    (t: Client) => t.id === u.client
                                  )?.longname}
                              </p>
                            </div>
                            <div className="card-body pad-rl-16">
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="total-info">
                                    <h6>Права доступа</h6>
                                    <ul>
                                      {u.right_ids.map((r: number) => (
                                        <li>
                                          <i className="azla icon-success-check"></i>{" "}
                                          {request._getRights &&
                                            request._getRights.find(
                                              (t: Right) => t.id === r
                                            )?.name}
                                        </li>
                                      ))}
                                    </ul>
                                    <button
                                      className="add-rights"
                                      onClick={() => {
                                        main.setModal(true);
                                        main.setModalType(29);
                                        main.setModalTypeData(u);
                                      }}
                                    >
                                      <i className="azla add-primary-icon"></i>{" "}
                                      Изменить права
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  ) : request.step === 2 ? (
                    <div className="req-inner-body">
                      <div className="pad-rl-16">
                        <div className="row">
                          <div className="col-md-8">
                            <h3 className="title-subhead mb-16">
                              Документы по текущему сервису
                            </h3>
                            <div className="files-added">
                              <ul className="files-list">
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
                              aliqua dolor do amet sint. Velit officia consequat
                              duis enim velit mollit. Exercitation veniam
                              consequat sunt nostrud amet.
                            </p>
                          </div>
                          <div className="col-md-3 offset-md-1">
                            <div className="keys-add">
                              <ul className="step-progressbar grid-view">
                                <li
                                  className={`step-item ${
                                    request._getRequest.request_status === 10
                                      ? "step-item-active"
                                      : "step-item-complete"
                                  }`}
                                  onClick={() => {}}
                                >
                                  Servicedesk отправил тестовые/боевые ключи
                                </li>
                                <li
                                  className={`step-item ${
                                    request._getRequest.request_status === 12
                                      ? "step-item-active"
                                      : request._getRequest.request_status ===
                                          8 ||
                                        request._getRequest.request_status ===
                                          13 ||
                                        request._getRequest.request_status ===
                                          14 ||
                                        request._getRequest.request_status === 7
                                      ? "step-item-complete"
                                      : ""
                                  }`}
                                  onClick={() => {}}
                                >
                                  Контрагент получил тестовые/боевые ключи
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="req-inner-body">
                      <div className="pad-b-64">
                        <div className="done-request">
                          <h3 className="title-subhead mb-16">
                            Заявка успешно обработана!
                          </h3>

                          <h5 className="title-subhead-h5 mb-16">
                            Общие данные
                          </h5>

                          <div className="pad-rl-16 mb-32">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="total-info">
                                  <ul className="info-list">
                                    {request._getManUser && (
                                      <li>
                                        <span className="left">
                                          Менеджер заявки:
                                        </span>
                                        <span className="right">
                                          {request._getManUser.full_name}
                                        </span>
                                      </li>
                                    )}
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
                                      <span className="left">Сервис:</span>
                                      <span className="right">
                                        <span className="services-type">
                                          {request._getRequest
                                            .service_category === 1
                                            ? "ЕСБД"
                                            : "БДКИ"}
                                        </span>
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
                                        Договор-основание по сервису:
                                      </span>
                                      <span className="right">
                                        Договор №3424 по Изъятию данных
                                        ТООЛомбард.pdf
                                      </span>
                                    </li>
                                    <li>
                                      <span className="left">
                                        Дата регистрации заявки:
                                      </span>
                                      <span className="right">
                                        {moment(
                                          request._getRequest.reg_date
                                        ).format("DD.MM.YYYY в HH:mm")}
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
                                          ).format("DD.MM.YYYY в HH:mm")}
                                      </span>
                                    </li>
                                    <li>
                                      <span className="left">
                                        Добавленных пользователей:
                                      </span>
                                      <span className="right">
                                        {request._getRequest.client_user.length}
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Link
                          to="/access-form"
                          className="button btn-secondary mt-32"
                        >
                          Вернуться к формам доступа
                        </Link>
                      </div>
                    </div>
                  )}
                  {main.role === "Service Desk" &&
                  request._getRequest.request_status === 1 &&
                  request._getRequest.request_stepper === 1 ? (
                    <div className="req-inner-footer">
                      <div className="container">
                        <button
                          type="button"
                          className="button btn-primary btn-icon ml-32 d-inline-flex"
                          onClick={() => {
                            main.setModalType(0);
                            main.setModal(true);
                          }}
                        >
                          <i className="azla add-plusRound-icon"></i>
                          Назначить
                        </button>
                      </div>
                    </div>
                  ) : main.role === "Service Desk" &&
                    request._getRequest.request_status === 2 &&
                    request._getRequest.request_stepper === 1 ? (
                    <div className="req-inner-footer">
                      <div className="container">
                        <button
                          type="button"
                          className="button btn-primary btn-icon ml-32 d-inline-flex"
                          onClick={() =>
                            request
                              .nextRequest(request._getRequest)
                              .then(() => request.setStep(2))
                          }
                        >
                          Далее
                        </button>
                      </div>
                    </div>
                  ) : main.role === "Service Desk" &&
                    request._getRequest.request_stepper === 2 ? (
                    <div className="req-inner-footer">
                      <div className="container">
                        <div className="right">
                          Подтвердите отправление тестовых/боевых ключей на
                          почту контрагента:
                          <button
                            type="button"
                            onClick={() => request.nextStatus()}
                            className="button btn-primary mrl-32"
                          >
                            Подтвердить
                          </button>
                        </div>
                      </div>
                    </div>
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
export default AccessFormInner;
