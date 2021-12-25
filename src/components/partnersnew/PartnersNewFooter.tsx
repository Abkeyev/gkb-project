import React from "react";
import { ClientUser } from "../../api/Models/ServiceModels";
import { observer } from "mobx-react";

const PartnersNewFooter = ({ main, request, filesId, tab }: any) => {
  return (
    <div className="req-inner-footer">
      <div className="container">
        <div className="manager-req mrl-32">
          {request.step_choice === 1 && (
            <button
              type="button"
              className="button btn-primary"
              disabled={request.service === ""}
              onClick={() => {
                request.setChoiceStep(2);
              }}
            >
              Далее
            </button>
          )}
          {request.step_choice === 2 && (
            <button
              type="button"
              className="button btn-primary"
              disabled={request.service === "" || main.usersNew.length === 0}
              onClick={() => {
                main.setModal(true);
                main.setModalType(13);
                request.data = {
                  client: main.clientData.client.id,
                  service_category: tab,
                  service_type: request.service,
                  client_doc:
                    request.addedFiles.length > 0
                      ? [...filesId, ...request.addedFiles]
                      : [...filesId],
                  client_user: main.usersNew.map((u: ClientUser) => u.id),
                  request_status: 1,
                  request_stepper: 1,
                };
              }}
            >
              Отправить заявку
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(PartnersNewFooter);
