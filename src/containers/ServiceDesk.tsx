import React, { useState, useRef } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useHistory } from "react-router";
import "react-tabs/style/react-tabs.css";
import { observer } from "mobx-react";
import { Request as RequestModel } from "../api/Models/ServiceModels";
import { OnClickOutside } from "../utils/utils";
import ServiceDeskIncoming from "../components/ServiceDesk/ServiceDeskIncoming";
import ServiceDeskFilter from "../components/ServiceDesk/ServiceDeskFilter";
import ServiceDeskViewed from "../components/ServiceDesk/ServiceDeskViewed";

const ServiceDesk = observer((props: any) => {
  const { request } = props;
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
    const req = request._getRequests
      .slice()
      .sort((a: RequestModel, b: RequestModel) => {
        return new Date(a.reg_date).getTime() - new Date(b.reg_date).getTime();
      })
      .reverse();
    if (sortTitle === "сначала старые") req.reverse();
    return req.length > 0
      ? req
          .filter(
            (cc: RequestModel) =>
              cc.client.longname
                .toLocaleLowerCase()
                .includes(bin.toLocaleLowerCase()) ||
              cc.client.bin
                .toLocaleLowerCase()
                .includes(bin.toLocaleLowerCase())
          )
          .filter((ccc: RequestModel) =>
            services.length === 0 ? true : services.includes(ccc.service_type)
          )
          .filter((ccc: RequestModel) =>
            categories.length === 0
              ? true
              : categories.includes(ccc.client.client_type)
          )
          .filter((rr: RequestModel) => rr.request_stepper > 3)
          .filter((r: RequestModel) =>
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
