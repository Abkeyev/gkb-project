import React, { useState, useRef, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { ServiceCommon, Request } from "../api/Models/ServiceModels";
import "react-tabs/style/react-tabs.css";
import { observer } from "mobx-react";
import moment from "moment";
import { OnClickOutside } from "../utils/utils";
import AccessFormOutbox from "../components/accessform/AccessFormOutbox";
import AccessFormCompleted from "../components/accessform/AccessFormCompleted";
import AccessFormRejected from "../components/accessform/AccessFormRejected";
import { ReactComponent as Spinner } from "../styles/spinner.svg";

const AccessForm = observer((props: any) => {
  const { request, main } = props;
  const [advance, setAdvance] = useState(false);
  const [sort, setSort] = useState(false);
  const [date, setDate] = useState(false);
  const [service, setService] = useState(false);
  const [services, setServices] = useState<number[]>([]);
  const [category, setCategory] = useState(false);
  const [categories, setCategories] = useState<number[]>([]);
  const [searchService, setSearchService] = useState<string>("");
  const [bin, setBin] = useState<string>("");
  const [sortTitle, setSortTitle] = useState("");
  const history = useHistory();
  const catRef = useRef<any>(null);
  const serviceRef = useRef<any>(null);

  useEffect(() => {
    request.getClientTypes();
    request.getClientServiceType();
    request.getClientRequests(main.clientData.client.id);
  }, []);

  OnClickOutside(catRef, () => setCategory(false));
  OnClickOutside(serviceRef, () => setService(false));

  const filterRequests = (type: number[] = []) => {
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
    if (sortTitle === "сначала старые") req.reverse();
    return req.length > 0
      ? req
          .filter(
            (cc: Request) =>
              cc.client.longname
                .toLocaleLowerCase()
                .includes(bin.toLocaleLowerCase()) ||
              cc.client.bin
                .toLocaleLowerCase()
                .includes(bin.toLocaleLowerCase())
          )
          .filter((ccc: Request) =>
            services.length === 0 ? true : services.includes(ccc.service_type)
          )
          .filter((ccc: Request) =>
            categories.length === 0
              ? true
              : categories.includes(ccc.client.client_type)
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
                    <Tab>Исходящие (32)</Tab>
                    <Tab>Выполненные (164)</Tab>
                    <Tab>Отклоненные (0)</Tab>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default AccessForm;
