import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link, useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import { Modal } from ".";
import {
  Client,
  ClientUserAccess,
  ClientUserService,
  Right,
  ServiceCommon,
} from "../api/Models/ServiceModels";

const AccessFormNew = observer((props: any) => {
  const history = useHistory();
  const { main, request } = props;
  const [open, setOpen] = React.useState(false);
  const [service, setService] = React.useState(null);
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
                            {service ? (
                              <div className="multi-list">
                                <div className="service-name">БДКИ</div>
                                <div className="service-desc">
                                  Изъятие данных
                                </div>
                                <div className="service-users">
                                  8 пользователей
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
                            {request._getClientServiceType.map(
                              (c: ServiceCommon) => (
                                <div className="multi-list">
                                  <div className="service-name">БДКИ</div>
                                  <div className="service-desc">{c.name}</div>
                                  <div className="service-users">
                                    {c.id} пользователей
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Добавляется при выборе сервиса */}
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
                        main.setModalType(28);
                      }}
                    >
                      <i className="azla add-plusRound-icon"></i> Добавить
                    </button>
                  </div>

                  {/* После модалки и выборе вот карточка добавляется */}

                  {main.usersNewAccess.length > 0 &&
                    main.usersNewAccess.map((u: ClientUserAccess) => (
                      <div className="card card-rights mb-24 pad-24">
                        <div className="card-header">
                          <div className="card-header-rights">
                            <div className="left">
                              <span className="num">№ {u.id}</span>
                              <h6 className="text">{u.full_name}</h6>
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
                                      (a: ClientUserAccess) => a.id !== u.id
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
                                (t: ServiceCommon) => t.id === +u.position_name
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
                                <button className="add-rights">
                                  <i className="azla add-primary-icon"></i>{" "}
                                  Изменить права
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* Футер */}
                  <div className="req-inner-footer">
                    <div className="container">
                      <Link
                        to="/access-form-new"
                        className="button btn-primary btn-icon ml-32 d-inline-flex"
                      >
                        Далее
                      </Link>
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
