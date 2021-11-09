import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link, useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import { Modal } from "../containers";
import PartnersInnerGeneral from "../components/partnersinner/PartnersInnerGeneral";
import PartnersInnerServiceUsers from "../components/partnersinner/PartnersInnerServiceUsers";
import PartnersInnerSecondStep from "../components/partnersinner/PartnersInnerSecondStep";
import PartnersInnerThirdStep from "../components/partnersinner/PartnersInnerThirdStep";
import PartnersInnerFourthStep from "../components/partnersinner/PartnersInnerFourthStep";
import PartnersInnerFifthStep from "../components/partnersinner/PartnersInnerFifthStep";
import PartnersInnerFooter from "../components/partnersinner/PartnersInnerFooter";

const PartnersInner = observer((props: any) => {
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
                        <h5>Заявка отклонена</h5>
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

                  {(request._getRequest.request_status === 10 ||
                    request._getRequest.request_status === 12 ||
                    request._getRequest.request_status === 8 ||
                    request._getRequest.request_status === 13 ||
                    request._getRequest.request_status === 14) &&
                  request._getRequest.request_stepper > 3 ? (
                    <div className="mess-card mb-32 col-md-8">
                      Пожалуйста, ожидайте. Департамент Servicedesk ГКБ должен
                      выслать вам на почту тестовые, а затем, после подписания
                      акта, “боевые” ключи. Вы должны подтверждать получение
                      ключей!
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
                        <PartnersInnerGeneral request={request} />
                      </TabPanel>

                      <TabPanel>
                        <PartnersInnerServiceUsers request={request} />
                      </TabPanel>
                    </Tabs>
                  ) : request.step === 2 ? (
                    <PartnersInnerSecondStep main={main} request={request} />
                  ) : request.step === 3 ? (
                    <PartnersInnerThirdStep request={request} />
                  ) : request.step === 4 ? (
                    <PartnersInnerFourthStep request={request} />
                  ) : request.step === 5 ? (
                    <PartnersInnerFifthStep request={request} />
                  ) : (
                    <></>
                  )}
                  <PartnersInnerFooter request={request} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
});
export default PartnersInner;
