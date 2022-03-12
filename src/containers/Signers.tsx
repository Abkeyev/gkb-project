import React, { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useHistory } from "react-router";
import { Request } from "../api/Models/ServiceModels";
import "react-tabs/style/react-tabs.css";
import { observer } from "mobx-react";
import SignersNeedToSign from "../components/signers/SignersNeedToSign";
import SignersReconciliation from "../components/signers/SignersReconciliation";
import SignersViewed from "../components/signers/SignersViewed";

const Signers = observer((props: any) => {
  const { request, main } = props;
  const history = useHistory();

  useEffect(() => {
    request.getRequests();
    request.getClientTypes();
    request.getClientServiceType();
    request.getClients();
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

  const filterVoteRequests = (
    type: number[] = [],
    user: number | null = null
  ) => {
    const req =
      request._getVoteRequests &&
      request._getVoteRequests
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
                    <Tab>Рассмотренные</Tab>
                  </TabList>
                </div>

                <TabPanel>
                  <SignersNeedToSign
                    request={request}
                    main={main}
                    history={history}
                    filterVoteRequests={filterVoteRequests}
                  />
                </TabPanel>

                <TabPanel>
                  <SignersReconciliation
                    request={request}
                    main={main}
                    history={history}
                    filterVoteRequests={filterVoteRequests}
                  />
                </TabPanel>

                <TabPanel>
                  <SignersViewed
                    history={history}
                    main={main}
                    request={request}
                    filterVoteRequests={filterVoteRequests}
                  />
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
