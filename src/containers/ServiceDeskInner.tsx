import React from "react";
import "react-tabs/style/react-tabs.css";
import { Link, useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import moment from "moment";
import {
  Agree,
  AgreeResult,
  Categories,
  Client,
  ClientUsers,
  Documents,
  Result,
  ServiceCommon,
  User,
} from "../api/Models/ServiceModels";
import { Modal } from "../containers";
import ServiceDeskInnerFirstStep from "../components/ServiceDeskInner/ServiceDeskInnerFirstStep";
import ServiceDeskInnerSecondStep from "../components/ServiceDeskInner/ServiceDeskInnerSecondStep";
import ServiceDeskInnerThirdStep from "../components/ServiceDeskInner/ServiceDeskInnerThirdStep";
import ServiceDeskInnerFourthStep from "../components/ServiceDeskInner/ServiceDeskInnerFourthStep";
import ServiceDeskInnerFifthStep from "../components/ServiceDeskInner/ServiceDeskInnerFifthStep";
import ServiceDeskInnerFooter from "../components/ServiceDeskInner/ServiceDeskInnerFooter";
import ServiceDeskInnerStatusBar from "../components/ServiceDeskInner/ServiceDeskInnerStatusBar";

const ServiceDeskInner = observer((props: any) => {
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
    request.getClientTypes();
    request.getRequest(id);
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
                    ) : request._getRequest.request_status === 10 ||
                      request._getRequest.request_status === 12 ? (
                      <div className="mess-card mb-32 col-md-8">
                        Вы должны отправить контрагенту тестовые и “боевые”
                        ключи. Вы можете следить за прогрессом тестирования на
                        панели справа.
                      </div>
                    ) : request._getRequest.request_status === 8 ||
                      request._getRequest.request_status === 13 ||
                      request._getRequest.request_status === 14 ? (
                      <div className="mess-card mb-32 col-md-8">
                        Пожалуйста, ожидайте. Департамент Servicedesk ГКБ должен
                        выслать вам на почту тестовые, а затем, после подписания
                        акта, “боевые” ключи. Вы должны подтверждать получение
                        ключей!
                      </div>
                    ) : (
                      ""
                    )}

                    <ServiceDeskInnerStatusBar request={request} />
                  </div>

                  {request.step === 1 ? (
                    <ServiceDeskInnerFirstStep request={request} />
                  ) : request.step === 2 ? (
                    <ServiceDeskInnerSecondStep request={request} main={main} />
                  ) : request.step === 3 ? (
                    <ServiceDeskInnerThirdStep request={request} />
                  ) : request.step === 4 ? (
                    <ServiceDeskInnerFourthStep request={request} main={main} />
                  ) : request.step === 5 ? (
                    <ServiceDeskInnerFifthStep request={request} main={main} />
                  ) : (
                    <></>
                  )}

                  {request._getRequest.request_status === 10 ? (
                    <ServiceDeskInnerFooter
                      main={main}
                      request={request}
                      test={true}
                    />
                  ) : request._getRequest.request_status === 13 ? (
                    <ServiceDeskInnerFooter
                      main={main}
                      request={request}
                      test={false}
                    />
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
export default ServiceDeskInner;
