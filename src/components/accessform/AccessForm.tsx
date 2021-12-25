import React, { useState, useRef, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { ServiceCommon, Request } from "../../api/Models/ServiceModels";
import "react-tabs/style/react-tabs.css";
import { observer } from "mobx-react";
import moment from "moment";
import { OnClickOutside } from "../../utils/utils";
import AccessFormOutbox from "./AccessFormOutbox";
import AccessFormCompleted from "./AccessFormCompleted";
import AccessFormRejected from "./AccessFormRejected";
import { ReactComponent as Spinner } from "../../styles/spinner.svg";

const AccessForm = observer((props: any) => {
  const { request, main } = props;

  useEffect(() => {
    request.getClientTypes();
    request.getClientServiceType();
    request.getRequests();
  }, []);

  const filterRequests = (type: number[] = []) => {
    const req =
      request._getRequests &&
      request._getRequests
        .filter((f: Request) => f.service_type === 15)
        .slice()
        .sort((a: Request, b: Request) => {
          return (
            new Date(a.reg_date).getTime() - new Date(b.reg_date).getTime()
          );
        })
        .reverse();
    return req.length > 0
      ? req.filter((r: Request) =>
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
                <h1 className="title-main">Заявки по формам доступа</h1>
              </div>

              <Tabs
                selectedIndex={request.tabIndexPar}
                onSelect={(i) => {
                  request.tabIndexPar = i;
                }}
              >
                <div className="mb-24">
                  <TabList>
                    <Tab>Исходящие ({filterRequests([1, 2]).length})</Tab>
                    <Tab>Выполненные ({filterRequests([7]).length})</Tab>
                    <Tab>Отклоненные ({filterRequests([4]).length})</Tab>
                  </TabList>
                </div>

                <TabPanel>
                  {request?.loader ? (
                    <Spinner />
                  ) : (
                    <AccessFormOutbox
                      request={request}
                      filter={filterRequests}
                    />
                  )}
                </TabPanel>

                <TabPanel>
                  {request?.loader ? (
                    <Spinner />
                  ) : (
                    <AccessFormCompleted
                      request={request}
                      filter={filterRequests}
                    />
                  )}
                </TabPanel>

                <TabPanel>
                  {request?.loader ? (
                    <Spinner />
                  ) : (
                    <AccessFormRejected
                      request={request}
                      filter={filterRequests}
                    />
                  )}
                </TabPanel>
              </Tabs>

              {main.role === "Agent" && (
                <div className="req-inner-footer">
                  <div className="container">
                    <Link
                      to="/access-form-new"
                      className="button btn-primary btn-icon ml-32 d-inline-flex"
                    >
                      <i className="azla add-plusRound-icon"></i> Новая заявка
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default AccessForm;
