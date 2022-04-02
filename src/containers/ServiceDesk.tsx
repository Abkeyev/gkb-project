import React, { useState, useRef } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useHistory } from "react-router";
import "react-tabs/style/react-tabs.css";
import { observer } from "mobx-react";
import { Request } from "../api/Models/ServiceModels";
import { OnClickOutside } from "../utils/utils";
import ServiceDeskIncoming from "../components/ServiceDesk/ServiceDeskIncoming";
import ServiceDeskFilter from "../components/ServiceDesk/ServiceDeskFilter";
import ServiceDeskViewed from "../components/ServiceDesk/ServiceDeskViewed";
import ServiceDeskDeclined from "../components/ServiceDesk/ServiceDeskDeclined";

const ServiceDesk = observer((props: any) => {
  const { request, main } = props;
  const [service, setService] = useState(false);
  const [services, setServices] = useState<number[]>([]);
  const [category, setCategory] = useState(false);
  const [categories, setCategories] = useState<number[]>([]);
  const [bin, setBin] = useState<string>("");
  const [sortTitle, setSortTitle] = useState("");
  const history = useHistory();
  const catRef = useRef<any>(null);
  const serviceRef = useRef<any>(null);

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
          .filter((cccc: Request) => cccc.request_stepper >= 3)
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
                <h1 className="title-main">Заявки</h1>
              </div>

              <Tabs
                selectedIndex={request.tabIndexPar}
                onSelect={(i) => {
                  request.tabIndexPar = i;
                }}
              >
                <div>
                  <TabList>
                    <Tab>Входящие</Tab>
                    <Tab>Рассмотренные</Tab>
                    <Tab>Отклоненные</Tab>
                  </TabList>
                </div>

                <ServiceDeskFilter
                  request={request}
                  category={category}
                  setCategory={setCategory}
                  categories={categories}
                  setCategories={setCategories}
                  bin={bin}
                  setBin={setBin}
                  sortTitle={sortTitle}
                  setSortTitle={setSortTitle}
                  catRef={catRef}
                  serviceRef={serviceRef}
                  service={service}
                  setService={setService}
                  services={services}
                  setServices={setServices}
                />

                <TabPanel>
                  <ServiceDeskIncoming
                    request={request}
                    history={history}
                    filterRequests={filterRequests}
                  />
                </TabPanel>
                <TabPanel>
                  <ServiceDeskViewed
                    request={request}
                    history={history}
                    filterRequests={filterRequests}
                    main={main}
                  />
                </TabPanel>
                <TabPanel>
                  <ServiceDeskDeclined
                    request={request}
                    history={history}
                    filterRequests={filterRequests}
                    main={main}
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
export default ServiceDesk;
