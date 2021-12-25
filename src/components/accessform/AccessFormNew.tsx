import React from "react";
import "react-tabs/style/react-tabs.css";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import { Modal } from "../../containers";
import {
  Client,
  ClientUserAccess,
  ClientUserService,
  Request,
  Right,
  ServiceCommon,
} from "../../api/Models/ServiceModels";

const AccessFormNew = observer((props: any) => {
  const history = useHistory();
  const { main, request } = props;
  const [open, setOpen] = React.useState(false);
  const [req, setReq] = React.useState<Request | null>(null);
  const useOutsideAlerter = (ref: any) => {
    React.useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = React.useRef(null);
  useOutsideAlerter(wrapperRef);

  React.useEffect(() => {
    request.getClientServiceType();
    request.getClientUsersForAdd(main.clientData.client.id);
    request.getClients();
    request.getPosition();
    request.getRights();
    request.getUsers();
    request.getRequestStatus();
    request.getDocumentsCategories();
    request.getDocumentsType();
    request.getDocuments(main.clientData.client.id);
    request.getClientTypes();
    request.getClientRequests(main.clientData.client.id);
  }, []);

  return (
    <>
      {main.isOpenModal && <Modal main={main} request={request} />}
      <div className="main-body">
        {request._getRequests && (
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="req-manager p-50 pad-b-128 access-form-page">
                  <div className="header-text justify-content-between mb-24">
                    <h1 className="title-main">
                      Новая форма на предоставление доступа
                    </h1>
                  </div>

                  <h3 className="title-subhead mb-16">Выберите сервис</h3>
                  <p>
                    Выберите из списка активный сервис, к которому вы хотите
                    добавить пользователей
                  </p>

                  <div className="col-md-7 mb-32">
                    <div
                      className="form-multiselect mb-0 special-select"
                      ref={wrapperRef}
                      onClick={() => setOpen(!open)}
                    >
                      {/* Когда выбрали то дается класс - Open */}
                      <div
                        className={`multi js-multi-button ${open && "open"}`}
                      >
                        <div className="input-wrapper">
                          {/* Когда выбрали то дается класс - selected */}
                          <div className="types-input selected azla form-icon chevron-down-icon">
                            {req ? (
                              <div className="multi-list">
                                <div className="service-name">
                                  {req.service_category === 1 ? "ЕСБД" : "БДКИ"}
                                </div>
                                <div className="service-desc">
                                  {
                                    request._getClientServiceType.find(
                                      (t: ServiceCommon) =>
                                        t.id === req.service_type
                                    )?.name
                                  }
                                </div>
                                <div className="service-users">
                                  {req.client_user.length} пользователей
                                </div>
                              </div>
                            ) : (
                              <span className="types-placeholder">
                                Выберите сервис
                              </span>
                            )}
                          </div>
                          <label className="label"></label>
                        </div>

                        <div className="multi-menu">
                          <div className="multi-option option-current">
                            {request._getRequests &&
                              request._getRequests
                                .filter((f: Request) => f.request_status === 7)
                                .map((c: Request) => (
                                  <div
                                    className="multi-list"
                                    onClick={() => {
                                      request.getRequest(c.id);
                                      setReq(c);
                                    }}
                                  >
                                    <div className="service-name">
                                      {c.service_category === 1
                                        ? "ЕСБД"
                                        : "БДКИ"}
                                    </div>
                                    <div className="service-desc">
                                      {
                                        request._getClientServiceType.find(
                                          (t: ServiceCommon) =>
                                            t.id === c.service_type
                                        )?.name
                                      }
                                    </div>
                                    <div className="service-users">
                                      {c.client_user.length} пользователей
                                    </div>
                                  </div>
                                ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {request._getRequest && (
                    <>
                      <div className="d-flex-align-c-spaceb mb-32">
                        <div className="d-grid">
                          <h3 className="title-subhead mb-8">
                            Новые пользователи услуг{" "}
                            <span className="number">
                              {main.usersNewAccess.length}
                            </span>
                          </h3>
                          <p>
                            Пользователи организации, которые будут пользоваться
                            выбранным сервисом
                          </p>
                        </div>
                        <button
                          className="btn button btn-primary btn-icon"
                          onClick={() => {
                            main.setModal(true);
                            main.setModalType(27);
                          }}
                        >
                          <i className="azla add-plusRound-icon"></i> Добавить
                        </button>
                      </div>

                      {main.usersNewAccess.length > 0 &&
                        main.usersNewAccess.map(
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
                                    <span
                                      className="close"
                                      onClick={() =>
                                        main.setNewAccessUsers([
                                          ...main.usersNewAccess.filter(
                                            (a: ClientUserAccess) =>
                                              a.id !== u.id
                                          ),
                                        ])
                                      }
                                    >
                                      <i className="azla close-primary-icon"></i>
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
                    </>
                  )}

                  {/* Футер */}
                  <div className="req-inner-footer">
                    <div className="container">
                      <button
                        type="button"
                        className="button btn-primary btn-icon ml-32 d-inline-flex"
                        disabled={main.usersNewAccess.length === 0}
                        onClick={() => {
                          try {
                            main.usersNewAccess.map(
                              (u: ClientUserAccess, index: number) =>
                                request.editClientUser(u.id, u)
                            );
                          } finally {
                            request
                              .addAccessForm({
                                client: main.clientData.client.id,
                                service_category:
                                  request._getRequest.service_category,
                                client_doc: request._getRequest.client_doc,
                                request_status: 1,
                                request_stepper: 1,
                                service_type: 15,
                                client_user: [
                                  ...request._getRequest.client_user,
                                  ...main.usersNewAccess.map(
                                    (u: ClientUserAccess) => u.id
                                  ),
                                ],
                              })
                              .then(() => {
                                main.setModal(false);
                              });
                          }
                        }}
                      >
                        Отправить
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
});
export default AccessFormNew;
