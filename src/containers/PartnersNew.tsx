import React from "react";
import "react-tabs/style/react-tabs.css";
import { observer } from "mobx-react";
import { Modal } from "../containers";
import PartnersNewFooter from "../components/partnersnew/PartnersNewFooter";
import PartnerNewFirstStep from "../components/partnersnew/PartnerNewFirstStep";
import PartnerNewSecondStep from "../components/partnersnew/PartnerNewSecondStep";
import { Documents } from "../api/Models/ServiceModels";

const PartnersNew = observer((props: any) => {
  const { main, request } = props;
  const [tab, setTab] = React.useState("0");
  const [filesId, setFilesId] = React.useState<Documents[] | []>([]);

  React.useEffect(() => {
    request.getRequests();
    request.getDocuments(main.clientData.client.id);
    request.getClientUsersForAdd(main.clientData.client.id);
    request.getSigners(
      main.clientData.client.id,
      main.role === "Service Desk" ? true : false
    );
    request.getPosition();
    request.getRights();
    request.getClientServiceType();
    request.getPersonStatus();
  }, []);

  return (
    <>
      {main.isOpenModal && <Modal main={main} request={request} />}
      <div className="main-body">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="create-page p-50 pad-b-128">
                <div className="header-text-inner justify-content-between mb-32">
                  <h1 className="title-main mb-32">
                    Новая заявка на использование сервиса
                  </h1>
                </div>

                <div className="status-bar">
                  <ul className="step-progressbar">
                    <li
                      className={`step-item ${
                        request.step_choice === 1
                          ? "step-item-active"
                          : "step-item-complete"
                      }`}
                      onClick={() => request.setChoiceStep(1)}
                    >
                      Выбор
                      <br />
                      сервиса
                    </li>
                    <li
                      className={`step-item ${
                        request.step_choice === 2
                          ? "step-item-active"
                          : request.step_choice > 2
                          ? "step-item-complete"
                          : ""
                      }`}
                      onClick={() =>
                        request.step_choice >= 2 && request.setChoiceStep(2)
                      }
                    >
                      Форма
                      <br />
                      доступа
                    </li>
                  </ul>
                </div>

                {request.step_choice === 1 && (
                  <PartnerNewFirstStep
                    main={main}
                    request={request}
                    filesId={filesId}
                    setFilesId={setFilesId}
                    tab={tab}
                    setTab={setTab}
                  />
                )}

                <div className="create-page-docs">
                  {request.step_choice === 2 && (
                    <PartnerNewSecondStep request={request} main={main} />
                  )}

                  <PartnersNewFooter
                    request={request}
                    main={main}
                    filesId={filesId}
                    tab={tab}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
export default PartnersNew;
