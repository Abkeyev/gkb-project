import React, { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useHistory } from "react-router";
import { ServiceCommon, Request } from "../api/Models/ServiceModels";
import "react-tabs/style/react-tabs.css";
import { observer } from "mobx-react";
import moment from "moment";

const Signers = observer((props: any) => {
  const { request, main } = props;
  const history = useHistory();

  useEffect(() => {
    request.getRequests();
    request.getClientTypes();
    request.getClientServiceType();
  }, []);

  const filterRequests = (type: number[] = [], user: number | null = null) => {
    const req =
      request._getRequests &&
      request._getRequests
        .slice()
        .sort((a: Request, b: Request) => {
          return (
            new Date(a.reg_date).getTime() - new Date(b.reg_date).getTime()
          );
        })
        .reverse();
    return req.length > 0
      ? req
          .filter((r: Request) =>
            user === null ? true : r.responsible_user === user
          )
          .filter((r: Request) =>
            type.length === 0 ? true : type.includes(r.request_status)
          )
      : [];
  };

  return (
    <div className="main-body">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="req-manager p-50 pad-b-128">
              <div className="header-text justify-content-between mb-24">
                <h1 className="title-main">Заявки</h1>
              </div>
              <Tabs
                selectedIndex={request.tabIndexPar}
                onSelect={(i) => {
                  request.tabIndexPar = i;
                }}
              >
                <div className="">
                  <TabList>
                    <Tab>На подписание</Tab>
                    <Tab>На согласование</Tab>
                    <Tab>Расмотренные</Tab>
                  </TabList>
                </div>

                <TabPanel>
                  <div className="tab-content tab-1">
                    <h3 className="title-subhead mb-16">
                      На подписание{" "}
                      <span className="number">
                        {filterRequests([6], main.clientData.user.id).length}
                      </span>
                    </h3>
                    {filterRequests().length === 0 ? (
                      "Заявки отсутствуют."
                    ) : (
                      <table className="table req-table">
                        <thead>
                          <tr>
                            <th>БИН</th>
                            <th>Организации</th>
                            <th>Категория деятельности</th>
                            <th>Сервис</th>
                            <th>Дата поступления</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterRequests([6], main.clientData.user.id).map(
                            (r: Request) => (
                              <tr
                                onClick={() => history.push(`/signer/${r.id}`)}
                              >
                                <td>{r.client.bin}</td>
                                <td>{r.client.longname}</td>
                                <td>
                                  {r.service_category === 1 ? "ЕСБД" : "БДКИ"}
                                </td>
                                <td>
                                  {
                                    request._getClientServiceType.find(
                                      (t: ServiceCommon) =>
                                        t.id === r.service_type
                                    )?.name
                                  }
                                </td>
                                <td>
                                  {moment(r.reg_date).format("DD.MM.YYYY")}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    )}
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className="tab-content tab-2">
                    <h3 className="title-subhead mb-16">
                      На согласование{" "}
                      <span className="number">
                        {filterRequests([11], main.clientData.user.id).length}
                      </span>
                    </h3>
                    {filterRequests([11], main.clientData.user.id).length ===
                    0 ? (
                      "Заявки отсутствуют."
                    ) : (
                      <table className="table req-table">
                        <thead>
                          <tr>
                            <th>БИН</th>
                            <th>Организации</th>
                            <th>Категория деятельности</th>
                            <th>Сервис</th>
                            <th>Дата поступления</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterRequests([11], main.clientData.user.id).map(
                            (r: Request) => (
                              <tr
                                onClick={() => history.push(`/signer/${r.id}`)}
                              >
                                <td>{r.client.bin}</td>
                                <td>{r.client.longname}</td>
                                <td>
                                  {
                                    request._getClientTypes.find(
                                      (t: any) => t.id === r.client.id
                                    )?.name
                                  }
                                  /{r.service_category === 1 ? "ЕСБД" : "БДКИ"}
                                </td>
                                <td>
                                  {
                                    request._getClientServiceType.find(
                                      (t: ServiceCommon) =>
                                        t.id === r.service_type
                                    )?.name
                                  }
                                </td>
                                <td>
                                  {moment(r.reg_date).format("DD.MM.YYYY")}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    )}
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className="tab-content tab-2">
                    <h3 className="title-subhead mb-16">
                      Расмотренные{" "}
                      <span className="number">
                        {filterRequests([11]).length}
                      </span>
                    </h3>
                    {filterRequests([11]).length === 0 ? (
                      "Заявки отсутствуют."
                    ) : (
                      <table className="table req-table">
                        <thead>
                          <tr>
                            <th>БИН</th>
                            <th>Организации</th>
                            <th>Категория деятельности</th>
                            <th>Сервис</th>
                            <th>Дата поступления</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterRequests([11]).map((r: Request) => (
                            <tr onClick={() => history.push(`/signer/${r.id}`)}>
                              <td>{r.client.bin}</td>
                              <td>{r.client.longname}</td>
                              <td>
                                {
                                  request._getClientTypes.find(
                                    (t: any) => t.id === r.client.client_type
                                  )?.name
                                }
                              </td>
                              <td>
                                {
                                  request._getClientServiceType.find(
                                    (t: ServiceCommon) =>
                                      t.id === r.service_type
                                  )?.name
                                }
                                /{r.service_category === 1 ? "ЕСБД" : "БДКИ"}
                              </td>
                              <td>{moment(r.reg_date).format("DD.MM.YYYY")}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Signers;
