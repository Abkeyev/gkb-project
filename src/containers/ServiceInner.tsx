import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link, useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import React from "react";
import {
  Categories,
  Client,
  ClientUsers,
  Documents,
  ServiceCommon,
} from "../api/Models/ServiceModels";

const ServiceInner = observer((props: any) => {
  const history = useHistory();
  const { id } = props.match.params;
  const { request, main } = props;

  React.useEffect(() => {
    request.getClients();
    request.getDocuments(main.clientData.client.id);
    request.getClientServiceType();
    request.getClientServiceById(id);
  }, []);

  return (
    <div className="main-body">
      <div className="container">
        {request._getClientServiceById && (
          <div className="row">
            <div className="col-lg-12">
              <div className="my-organization p-50 pad-b-128">
                <div className="header-text-inner justify-content-between mb-32">
                  <div className="back-breadcrumbs">
                    <div onClick={() => history.goBack()} className="back">
                      <i className="azla arrow-left-icon"></i> Назад
                    </div>
                    <div className="breadcrumbs">
                      <Link to="/organization">Моя организация</Link> /{" "}
                      <span>Подключенные услуги</span>
                    </div>
                  </div>

                  <h1 className="title-main mb-32">
                    {
                      request._getClientServiceType.find(
                        (t: ServiceCommon) =>
                          t.id === request._getClientServiceById.service_type
                      )?.name
                    }
                  </h1>
                </div>
                <Tabs>
                  <div className="mb-32">
                    <TabList>
                      <Tab>Общее</Tab>
                      <Tab>Пользователи услуг</Tab>
                    </TabList>
                  </div>
                  <div className="req-inner-body pad-b-128">
                    <TabPanel>
                      <h3 className="title-subhead mb-16">Общие данные</h3>
                      <div className="total-info mb-32">
                        <ul className="info-list">
                          <li>
                            <span className="left">Клиент:</span>
                            <span className="right">
                              {request._getClients &&
                                request._getClients.find(
                                  (t: Client) =>
                                    t.id ===
                                    request._getClientServiceById.client
                                )?.longname}
                            </span>
                          </li>
                          <li>
                            <span className="left">Категория сервиса:</span>
                            <span className="right">
                              {request._getClientServiceById
                                .service_category === 1
                                ? "БДКИ"
                                : "ЕСБД"}
                            </span>
                          </li>
                          <li>
                            <span className="left">Тип сервиса:</span>
                            <span className="right">
                              {
                                request._getClientServiceType.find(
                                  (t: ServiceCommon) =>
                                    t.id ===
                                    request._getClientServiceById.service_type
                                )?.name
                              }
                            </span>
                          </li>
                          {request._getClientServiceById.client_request && (
                            <li>
                              <span className="left">Заявка:</span>
                              <Link
                                to={`/request/${request._getClientServiceById.client_request}`}
                                className="right"
                              >
                                Заявка
                              </Link>
                            </li>
                          )}
                        </ul>
                      </div>

                      <h3 className="title-subhead mb-16">Документы</h3>
                      <div className="files-added">
                        <ul className="files-list">
                          {request._getDocuments.map((d: Documents) => (
                            <li>
                              <i className="azla blank-alt-primary-icon"></i>
                              <span onClick={() => request.downloadDocument(d)}>
                                {d.doc_name}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabPanel>

                    <TabPanel>
                      <div className="tab-content tab-1">
                        <h3 className="title-subhead mb-8">
                          Пользователи услуг{" "}
                          <span className="number">
                            {request._getServiceUsers.length}
                          </span>
                        </h3>

                        {request._getServiceUsers.map(
                          (c: ClientUsers, index: number) => (
                            <div className="card mb-24 pad-24">
                              <div className="card-header">
                                <div className="title">
                                  <h6 className="text">{c.full_name}</h6>
                                  <div className="d-flex">
                                    <span className="edit-btn underline mr-16">
                                      <i className="azla edit-primary-icon mr-8"></i>{" "}
                                      Редактировать
                                    </span>
                                    <span className="num">№{index + 1}</span>
                                  </div>
                                </div>
                                <p className="desc">{c.position_name}</p>
                              </div>
                              <div className="card-body pad-rl-16">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="total-info">
                                      <ul className="info-list">
                                        <li>
                                          <span className="left">
                                            ID пользователя:
                                          </span>
                                          <span className="right">{c.id}</span>
                                        </li>
                                        <li>
                                          <span className="left">
                                            ИИН сотрудника:
                                          </span>
                                          <span className="right">{c.iin}</span>
                                        </li>
                                        <li>
                                          <span className="left">
                                            Контактный номер:
                                          </span>
                                          <span className="right">
                                            {c.contacts}
                                          </span>
                                        </li>
                                        <li>
                                          <span className="left">Email:</span>
                                          <span className="right">
                                            {c.email}
                                          </span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="total-info">
                                      <ul className="info-list">
                                        <li>
                                          <span className="left">
                                            Первый руководитель:
                                          </span>
                                          <span className="right">
                                            {c.first_head_full_name}
                                          </span>
                                        </li>
                                        <li>
                                          <span className="left">
                                            Заместитель:
                                          </span>
                                          <span className="right">
                                            {c.deputy_head_full_name}
                                          </span>
                                        </li>
                                        <li>
                                          <span className="left">
                                            Курирующий менеджер:
                                          </span>
                                          <span className="right">
                                            {c.manager_full_name}
                                          </span>
                                        </li>
                                        <li>
                                          <span className="left">
                                            Контакты менеджера:
                                          </span>
                                          <span className="right">
                                            {c.manager_contacts}
                                          </span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </TabPanel>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
export default ServiceInner;
