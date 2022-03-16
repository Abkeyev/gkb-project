import React from "react";
import "react-tabs/style/react-tabs.css";
import { Link, useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import { Modal } from "../containers";
import RequestInnerFirstStep from "../components/requestinner/RequestInnerFirstStep";
import RequestInnerSecondStep from "../components/requestinner/RequestInnerSecondStep";
import RequestInnerThirdStep from "../components/requestinner/RequestInnerThirdStep";
import RequestInnerFourthStep from "../components/requestinner/RequestInnerFourthStep";
import RequestInnerFifthStep from "../components/requestinner/RequestInnerFifthStep";
import RequestInnerFooter from "../components/requestinner/RequestInnerFooter";
import RequestInnerStatusBar from "../components/requestinner/RequestInnerStatusBar";

const RequestInner = observer((props: any) => {
  const history = useHistory();
  const { id } = props.match.params;
  const { main, request } = props;

  React.useEffect(() => {
    request.getClientServiceType();
    request.getClients();
    request.getPosition();
    request.getUsers();
    request.getRequestStatus();
    request.getDocumentsCategories();
    request.getDocumentsType();
    request.getClientTypes();
    request.getRequest(id, main);
    request.getRights();
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
                    <RequestInnerSecondStep main={main} request={request} />
                  ) : request.step === 3 ? (
                    <RequestInnerThirdStep request={request} />
                  ) : request.step === 4 ? (
                    <RequestInnerFourthStep request={request} />
                  ) : request.step === 5 ? (
                    <RequestInnerFifthStep request={request} main={main} />
                  ) : (
                    <></>
                  )}
                  <RequestInnerFooter
                    request={request}
                    main={main}
                    history={history}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
});
export default RequestInner;
