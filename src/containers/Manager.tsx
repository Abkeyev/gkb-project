import React from "react";
import ManagerFilter from "../components/manager/ManagerFilter";
import { observer } from "mobx-react";
import { ServiceDesk } from "../api/Models/ServiceModels";
import { OnClickOutside } from "../utils/utils";
import moment from "moment";

const Manager = observer((props: any) => {
  const { main, request } = props;
  const [service, setService] = React.useState(false);
  const [sortTitle, setSortTitle] = React.useState("");
  const [bin, setBin] = React.useState<string>("");
  const [category, setCategory] = React.useState(false);
  const [date, setDate] = React.useState(false);
  const catRef = React.useRef<any>(null);
  const serviceRef = React.useRef<any>(null);
  const sortRef = React.useRef<any>(null);

  React.useEffect(() => {
    request.getRequests();
    request.getMineRequest(main.clientData.user.id);
    request.getClients();
    request.getClientServiceType();
    request.getClientTypes();
  }, []);

  OnClickOutside(catRef, () => setCategory(false));
  OnClickOutside(serviceRef, () => setService(false));
  OnClickOutside(sortRef, () => setDate(false));

  React.useEffect(() => {
    request.getServiceDesk();
  }, []);

  const filterRequests = (type: number[] = []) => {
    const req = request._getServiceDesk.slice().reverse();
    if (sortTitle === "сначала старые") req.reverse();
    return req.length > 0
      ? req.filter(
          (cc: ServiceDesk) =>
            cc.full_name
              .toLocaleLowerCase()
              .includes(bin.toLocaleLowerCase()) ||
            cc.bin.toLocaleLowerCase().includes(bin.toLocaleLowerCase())
        )
      : [];
  };

  return (
    <div className="main-body">
      <div className="container">
        <div className="row">
          {request._getServiceDesk && (
            <div className="col-lg-12">
              <div className="user-services p-50">
                <h1 className="title-main text-left mb-0">
                  Пользователи сервисов
                  <span className="number ml-8">
                    {request._getServiceDesk.length}
                  </span>
                </h1>
                <ManagerFilter
                  request={request}
                  bin={bin}
                  setBin={setBin}
                  service={service}
                  setService={setService}
                  catRef={catRef}
                  sortRef={sortRef}
                  serviceRef={serviceRef}
                  sortTitle={sortTitle}
                  setSortTitle={setSortTitle}
                  category={category}
                  setCategory={setCategory}
                  date={date}
                  setDate={setDate}
                />

                <div className="user-services-inner">
                  <h3 className="title-subhead mb-16">
                    Найдено пользователей{" "}
                    <span className="number">
                      {request._getServiceDesk.length}
                    </span>
                  </h3>

                  {filterRequests().map((sd: ServiceDesk) => (
                    <div className="card mb-24 card-no-shadow">
                      <div className="card-header pad-24 bg-light">
                        <div className="title">
                          <h6 className="text">{sd.full_name}</h6>
                          {/* <span className="num">№ 12</span> */}
                        </div>
                        <p className="desc mb-0">
                          {sd.position_name} – {sd.department_name} –{" "}
                          {sd.client_name} – БИН: {sd.bin}
                        </p>
                      </div>
                      <div className="card-body pad-rl-24 pad-tb-16 line-card">
                        <div className="row">
                          <div className="col-md-6 pad-rl-16">
                            <div className="total-info">
                              <ul className="info-list">
                                <li>
                                  <span className="left">
                                    Глобальный IP пользователя:
                                  </span>
                                  <span className="right">{sd.global_ip}</span>
                                </li>
                                <li>
                                  <span className="left">ИИН сотрудника:</span>
                                  <span className="right">{sd.iin}</span>
                                </li>
                                <li>
                                  <span className="left">
                                    Номер удостоверения:
                                  </span>
                                  <span className="right">
                                    {sd.idcard_number}
                                  </span>
                                </li>
                                <li>
                                  <span className="left">Раб/моб номер:</span>
                                  <span className="right">{sd.contacts}</span>
                                </li>
                                <li>
                                  <span className="left">Email:</span>
                                  <span className="right">{sd.email}</span>
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
                                    {sd.first_head_full_name}
                                  </span>
                                </li>
                                <li>
                                  <span className="left">Заместитель:</span>
                                  <span className="right">
                                    {sd.deputy_head_full_name}
                                  </span>
                                </li>
                                <li>
                                  <span className="left">
                                    Курирующий менеджер:
                                  </span>
                                  <span className="right">
                                    {sd.manager_full_name}
                                  </span>
                                </li>
                                <li>
                                  <span className="left">
                                    Контакты менеджера:
                                  </span>
                                  <span className="right">{sd.contacts}</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card-body pad-rl-24 pad-tb-16 pad-b-24-imp">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="total-info">
                              <ul className="info-list">
                                <li>
                                  <span className="left">
                                    Категория сервиса:
                                  </span>
                                  <span className="right">
                                    {sd.service_category}
                                  </span>
                                </li>
                                <li>
                                  <span className="left">Тип сервиса:</span>
                                  <span className="right">
                                    {sd.service_type}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="total-info">
                              <ul className="info-list">
                                <li>
                                  <span className="left">Начало сервиса:</span>
                                  <span className="right">
                                    {moment(sd.date_from).format(
                                      "DD.MM.YYYY в HH:mm"
                                    )}
                                  </span>
                                </li>
                                <li>
                                  <span className="left">
                                    Окончание сервиса:
                                  </span>
                                  <span className="right">
                                    {moment(sd.date_to).format(
                                      "DD.MM.YYYY в HH:mm"
                                    )}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
export default Manager;
