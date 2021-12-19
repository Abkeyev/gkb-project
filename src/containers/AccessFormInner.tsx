import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link, useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import { Modal } from ".";
import RequestInnerFirstStep from "../components/requestinner/RequestInnerFirstStep";
import RequestInnerSecondStep from "../components/requestinner/RequestInnerSecondStep";
import RequestInnerThirdStep from "../components/requestinner/RequestInnerThirdStep";
import RequestInnerFourthStep from "../components/requestinner/RequestInnerFourthStep";
import RequestInnerFifthStep from "../components/requestinner/RequestInnerFifthStep";
import RequestInnerFooter from "../components/requestinner/RequestInnerFooter";
import RequestInnerStatusBar from "../components/requestinner/RequestInnerStatusBar";

const AccessFormInner = observer((props: any) => {
  const history = useHistory();
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
    request.getRequest(3);
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
                      <RequestInnerStatusBar main={main} request={request} />
                    </div>
                    <div className="mess-card mb-32 col-md-8">
                      Назначьте менеджера заявки.
                    </div>

                    <div className='req-inner-body pad-b-128'>
                      <h3 className='title-subhead mb-16'>Общие данные</h3>
                      <div className='total-info mb-32'>
                        <ul className='info-list'>
                          {/* Тут сначала надо назначить и после футер уходит, это появляется */}
                          {request._getManUser && (
                            <li>
                              <span className='left'>Менеджер заявки:</span>
                              <span className='right d-flex'>
                                {request._getManUser.full_name}{' '}
                                {request._getRequest.request_stepper === 1 &&
                                  request._getRequest.request_status !== 9 &&
                                  request._getRequest.request_status !== 10 && (
                                    <span
                                      className='edit'
                                      onClick={() => {
                                        main.setModalType(0);
                                        main.setModal(true);
                                      }}
                                    >
                                      <i className='azla edit-primary-icon ml-8'></i>
                                    </span>
                                  )}
                              </span>
                            </li>
                          )}
                          <li>
                            <span className='left'>Номер заявки:</span>
                            <span className='right'>{request._getRequest.id}</span>
                          </li>
                          <li>
                            <span className='left'>Статус заявки:</span>
                            <span className='right'>
                              Нераспределено
                            </span>
                          </li>
                          
                          <li>
                            <span className='left'>Организация:</span>
                            <span className='right'>
                              <span className='pre-primary-color'>
                                <Link to={`/contractors/${request._getRequest.client.id}`}>
                                  {request._getRequest.client.longname}
                                </Link>
                              </span>
                            </span>
                          </li>
                          <li>
                            <span className='left'>БИН:</span>
                            <span className='right'>{request._getRequest.client.bin}</span>
                          </li>
                          <li>
                            <span className='left'>Категория деятельности:</span>
                            <span className='right'>
                              {request._getRequest.service_category === 1 ? 'ЕСБД' : 'БДКИ'}
                            </span>
                          </li>
                          <li>
                            <span className='left'>Сервис:</span>
                            <span className='right'>
                              <span className="services-type">БДКИ</span>
                                Изъятие данных
                              </span>
                          </li>
                          <li>
                            <span className='left'>Договор-основание по сервису:</span>
                            <span className='right'>
                              <span className="link-file">Договор №3424 по Изъятию данных ТООЛомбард.pdf</span>
                            </span>
                          </li>
                          <li>
                            <span className='left'>Дата регистрации заявки:</span>
                            <span className='right'>
                              20 Июня 2021
                            </span>
                          </li>
                          <li>
                            <span className='left'>Дата исполнения заявки:</span>
                            <span className='right'>
                              -
                            </span>
                          </li>
                        </ul>
                      </div>
                      <h3 className='title-subhead mb-8'>
                        Пользователи услуг{' '}
                        <span className='number'>
                          {request._getClientUsersForAdd &&
                            request._getClientUsersForAdd.length}
                        </span>
                      </h3>
                      <p className='mb-24'>
                        Пользователи организации, которые имеют доступ к сервисам БДКИ и ЕСБД
                      </p>

                    {/* Начало карточки */}
                    <div className="card card-rights mb-24 pad-24">
                      <div className="card-header">
                        <div className="card-header-rights">
                          <div className="left">
                            <span className="num">№ 21</span>
                            <h6 className="text">Султангалиева Камилла Избасарова</h6>
                          </div>
                          <div className="right">
                            <span className="use-service">
                              Использует сервиса
                            </span>
                          </div>
                        </div>
                        <p className="desc">
                          Аналитик – Департамент финансового анализа – ТОО “М-Ломбард”
                        </p>
                      </div>
                      <div className="card-body pad-rl-16">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="total-info">
                              <h6>Права доступа</h6>
                              <ul>
                                
                                  <li>
                                    <i className="azla icon-success-check"></i>
                                    Просмотр данных по субъектам и контрактам
                                  </li>
                                  <li>
                                    <i className="azla icon-success-check"></i>
                                    Просмотр данных по субъектам и контрактам
                                  </li>
                                  <li>
                                    <i className="azla icon-success-check"></i>
                                    Просмотр данных по субъектам и контрактам
                                  </li>
                                  <li>
                                    <i className="azla icon-success-check"></i>
                                    Просмотр данных по субъектам и контрактам
                                  </li>
                              </ul>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Конец карточки */}

                      
                    </div>

                  {/* Футер */}
                  <div className="req-inner-footer">
                    <div className="container">
                      <Link
                        to="/access-form-new"
                        className="button btn-primary btn-icon ml-32 d-inline-flex"
                      >
                        <i className="azla add-plusRound-icon"></i>
                        Назначить
                      </Link>
                    </div>
                  </div>  
                </div>
                {/* <div className="req-manager-inner p-16-50 pad-b-128">
                  <div className="req-inner-header pad-t-64">
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
                      Форма доступа №{request._getRequest.id}
                    </h1>

                    {request._getRequest.request_status === 4 ||
                    request._getRequest.request_status === 3 ? (
                      <div className="mess-card alert-mess mb-32 col-md-8">
                        <h5>Заявка отклонена</h5>
                        <p>Причина: {request._getRequest.client_comment}</p>
                      </div>
                    ) : request._getRequest.request_status === 10 &&
                      request._getRequest.request_stepper === 3 ? (
                      <div className="mess-card mb-32 col-md-8">
                        Пожалуйста, ожидайте. Заявленная форма доступа
                        проверяется департаментом Servicedesk.
                      </div>
                    ) : request._getRequest.request_status === 6 &&
                      request._getRequest.request_status === 9 ? (
                      <div className="mess-card mb-32 col-md-8">
                        Договор отправлен на подписание. Пожалуйста, ожидайте
                        подписания документа представителями контрагента и АО
                        “Государственное Кредитное Бюро”.
                      </div>
                    ) : (
                      ""
                    )}

                    <RequestInnerStatusBar main={main} request={request} />
                  </div>

                  {request._getRequest.request_status === 1 ? (
                    <div className="mess-card mb-32 col-md-8">
                      Назначьте менеджера заявки.
                    </div>
                  ) : (request._getRequest.request_status === 10 ||
                      request._getRequest.request_status === 12 ||
                      request._getRequest.request_status === 8 ||
                      request._getRequest.request_status === 13 ||
                      request._getRequest.request_status === 14) &&
                    request._getRequest.request_stepper > 3 ? (
                    <div className="mess-card mb-32 col-md-8">
                      Пожалуйста, ожидайте. Контрагент должен получить тестовые
                      ключи и подписать акт прохождения тестирования. Затем
                      контрагент подтвердить получение боевых ключей.
                    </div>
                  ) : (
                    ""
                  )}

                  {request.step === 1 ? (
                    <RequestInnerFirstStep main={main} request={request} />
                  ) : request.step === 2 ? (
                    <RequestInnerFourthStep request={request} />
                  ) : request.step === 3 ? (
                    <RequestInnerFifthStep request={request} main={main} />
                  ) : (
                    <></>
                  )}
                  <RequestInnerFooter
                    request={request}
                    main={main}
                    history={history}
                  />
                </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
});
export default AccessFormInner;
