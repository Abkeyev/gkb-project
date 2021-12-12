import React from "react";
import "react-tabs/style/react-tabs.css";
import { observer } from "mobx-react";
import { Modal } from ".";
import PartnersNewFooter from "../components/partnersnew/PartnersNewFooter";
import PartnerNewFirstStep from "../components/partnersnew/PartnerNewFirstStep";
import PartnerNewSecondStep from "../components/partnersnew/PartnerNewSecondStep";
import { ServiceCommon } from "../api/Models/ServiceModels";

const PartnersNew = observer((props: any) => {
  const { main, request } = props;
  const [tab, setTab] = React.useState("0");
  const [open, setOpen] = React.useState(false);
  const [filesId, setFilesId] = React.useState<number[] | []>([]);

  React.useEffect(() => {
    request.getRequests();
    request.getClientUsersForAdd(main.clientData.client.id);
    request.getSigners(main.clientData.client.id);
    request.getPosition();
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
                    Новая форма на предоставление доступа
                  </h1>
                </div>

                <h3
                  style={{ marginTop: "32px" }}
                  className="title-subhead mb-16"
                >
                  Выберите сервис
                </h3>

                <div className="col-md-7">
                  <div
                    className="form-multiselect mb-0 special-select"
                    onClick={() => setOpen(!open)}
                  >
                    <div
                      className={`multi js-multi-button${open ? " open" : ""}`}
                    >
                      <div className="input-wrapper">
                        <input
                          className="multi-input azla form-icon chevron-down-icon"
                          type="text"
                          placeholder="Выберите тип сортировки"
                          readOnly
                        />
                        <label className="label"></label>
                      </div>
                      <div className="multi-menu">
                        <div className="multi-option option-current">
                          <div className="multi-list">
                            <div className="service-name">БДКИ</div>
                            <div className="service-desc">
                              Изъятие данных Изъятие данныхИзъятие данныхИзъятие
                              данныхИзъятие данных Изъятие данныхИзъятие данных
                              Изъятие данныхИзъятие данныхИзъятие данных
                            </div>
                            <div className="service-users">8 пользователей</div>
                          </div>
                          <div className="multi-list">
                            <div className="service-name">ЕСБД</div>
                            <div className="service-desc">
                              Изъятие данных Изъятие
                            </div>
                            <div className="service-users">8 пользователей</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="create-page-docs">
                  {request.step_choice === 2 && (
                    <PartnerNewSecondStep main={main} />
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
