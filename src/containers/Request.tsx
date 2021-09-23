import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useHistory } from "react-router";
import moment from "moment";
import "react-tabs/style/react-tabs.css";
import { observer } from "mobx-react";
import {
  ServiceCommon,
  Request as RequestModel,
  Client,
} from "../api/Models/ServiceModels";

const Request = observer((props: any) => {
  const { request } = props;
  const [advance, setAdvance] = React.useState(false);
  const [sort, setSort] = React.useState(false);
  const [service, setService] = React.useState(false);
  const [services, setServices] = React.useState<number[]>([]);
  const [searchService, setSearchService] = React.useState<string>("");
  const [sortTitle, setSortTitle] = React.useState("");
  const history = useHistory();

  React.useEffect(() => {
    request.getRequests();
    request.getClients();
    request.getClientServiceType();
    request.getClientTypes();
  }, []);

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
                    <Tab>Нераспределенные</Tab>
                    <Tab>Мои</Tab>
                    <Tab>Подписанные</Tab>
                    <Tab>В архиве</Tab>
                  </TabList>
                </div>
                <div className="filter mb-24">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="filter-search">
                        <div className="form-group mr-16 mb-0">
                          <input
                            className="form-control azla form-icon search-icon"
                            type="name"
                            placeholder="Поиск по названию, БИН"
                          />
                        </div>
                        <button
                          className="btn-s btn-secondary btn-icon col-md-3"
                          onClick={() => setAdvance(!advance)}
                        >
                          <i className="azla filter-icon"></i> Расширенный поиск
                        </button>
                      </div>
                    </div>

                    <div
                      className={`col-md-12 filter-content ${
                        advance ? "view" : ""
                      }`}
                      onClick={() => {
                        sort && setSort(false);
                      }}
                    >
                      {/* Класс "view" добавляется при нажатии "Расширенный поиск" */}
                      <div className="filter-inputs">
                        <div className="form-wrapper">
                          <input
                            type="name"
                            placeholder="Напишите id клиента"
                          />
                          <label>Категория деятельности</label>
                        </div>

                        <div className="form-multiselect mb-0 mr-16">
                          <div
                            className={`multi js-multi-buttons ${
                              service ? "open" : ""
                            }`}
                          >
                            <div className="input-wrapper">
                              <input
                                className="multi-input azla form-icon chevron-down-icon"
                                type="text"
                                placeholder="Выберите тип сервиса"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setService(!service);
                                }}
                              />
                              <label className="label">Тип сервиса</label>
                            </div>
                            <div className="multi-menu">
                              <div className="multi-search">
                                <input
                                  type="search"
                                  className="azla form-icon search-icon"
                                  placeholder="Поиск"
                                  value={searchService}
                                  onChange={(e) =>
                                    setSearchService(e.target.value)
                                  }
                                />
                              </div>
                              {request._getClientServiceType
                                .filter((f: ServiceCommon) =>
                                  f.name.includes(searchService)
                                )
                                .map((t: ServiceCommon, index: number) => (
                                  <div className="multi-option option-current">
                                    <div className="multi-list">
                                      <div className="form-check gkb-checkbox">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          checked={services.includes(t.id)}
                                          onClick={() => {
                                            !services.includes(t.id)
                                              ? setServices([...services, t.id])
                                              : setServices([
                                                  ...services.filter(
                                                    (s) => s !== t.id
                                                  ),
                                                ]);
                                          }}
                                          id={`serviceCheck${t.id}`}
                                          required
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor={`serviceCheck${t.id}`}
                                        >
                                          {t.name}
                                        </label>
                                        <div className="invalid-feedback">
                                          Ошибка
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>

                        <div className="form-multiselect mb-0">
                          <div
                            className={`multi js-multi-buttons ${
                              sort ? "open" : ""
                            }`}
                            onClick={() => setSort(true)}
                          >
                            {/* При наведении на Input появляется класс open */}
                            <div className="input-wrapper">
                              <input
                                className="multi-input azla form-icon chevron-down-icon"
                                type="text"
                                placeholder="Выберите тип сортировки"
                                value={sortTitle}
                              />
                              <label className="label">Сортировать</label>
                            </div>
                            <div className="multi-menu">
                              <div className="multi-option option-current">
                                <div className="multi-list">
                                  <span
                                    className="multi-option-select"
                                    onClick={() =>
                                      setSortTitle("сначала новые")
                                    }
                                  >
                                    сначала новые
                                  </span>
                                </div>
                                <div className="multi-list">
                                  <span
                                    className="multi-option-select"
                                    onClick={() =>
                                      setSortTitle("сначала старые")
                                    }
                                  >
                                    сначала старые
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="filter-btns">
                        <button
                          type="button"
                          className="button btn-primary mr-16"
                        >
                          Применить
                        </button>
                        <button
                          type="button"
                          className="button btn-secondary btn-icon"
                          onClick={() => {
                            setServices([]);
                            setSortTitle("");
                          }}
                        >
                          <i className="azla close-primary-icon"></i>
                          Убрать фильтры
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <TabPanel>
                  <div className="tab-content tab-1">
                    <h3 className="title-subhead mb-16">
                      Найдено{" "}
                      <span className="number">
                        {request._getRequests && request._getRequests.length}
                      </span>
                    </h3>
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
                        {request._getRequests.map((r: RequestModel) => (
                          <tr onClick={() => history.push(`/request/${r.id}`)}>
                            <td>
                              {request._getClients &&
                                request._getClients.find(
                                  (t: Client) => t.id === r.client
                                )?.bin}
                            </td>
                            <td>
                              {request._getClients &&
                                request._getClients.find(
                                  (t: Client) => t.id === r.client
                                )?.longname}
                            </td>
                            <td>
                              {
                                request._getClientTypes.find(
                                  (t: any) =>
                                    t.id ===
                                    request._getClients.find(
                                      (t: Client) => t.id === r.client
                                    )?.client_type
                                )?.name
                              }
                            </td>
                            <td>
                              {r.service_category === 1 ? "БДКИ" : "ЕСБД"}
                            </td>
                            <td>{moment(r.reg_date).format("MM.DD.YYYY")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="tab-content tab-2">
                    <h3 className="title-subhead mb-16">
                      На подпись{" "}
                      <span className="number">
                        {request._getRequests &&
                          request._getRequests.filter(
                            (r: RequestModel) => r.request_status === 6
                          ).length}
                      </span>
                    </h3>
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
                        {request._getRequests
                          .filter((r: RequestModel) => r.request_status === 6)
                          .map((r: RequestModel) => (
                            <tr
                              onClick={() => history.push(`/request/${r.id}`)}
                            >
                              <td>{r.id}</td>
                              <td>{r.name_uid}</td>
                              <td>
                                {
                                  request._getClientServiceType.find(
                                    (t: ServiceCommon) =>
                                      t.id === r.service_type
                                  )?.name
                                }
                              </td>
                              <td>
                                {r.service_category === 1 ? "БДКИ" : "ЕСБД"}
                              </td>
                              <td>{moment(r.reg_date).format("MM.DD.YYYY")}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="tab-content tab-2 mt-16">
                    <h3 className="title-subhead mb-16">
                      Активные{" "}
                      <span className="number">
                        {request._getRequests &&
                          request._getRequests.filter(
                            (r: RequestModel) => r.request_status === 7
                          ).length}
                      </span>
                    </h3>
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
                        {request._getRequests
                          .filter((r: RequestModel) => r.request_status === 7)
                          .map((r: RequestModel) => (
                            <tr
                              onClick={() => history.push(`/request/${r.id}`)}
                            >
                              <td>{r.id}</td>
                              <td>{r.name_uid}</td>
                              <td>{r.service_type}</td>
                              <td>{r.service_category}</td>
                              <td>{moment(r.reg_date).format("MM.DD.YYYY")}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className="tab-content tab-3">
                    <h3 className="title-subhead mb-16">
                      Подписанные{" "}
                      <span className="number">
                        {request._getRequests &&
                          request._getRequests.filter(
                            (r: RequestModel) => r.request_status === 8
                          ).length}
                      </span>
                    </h3>
                    <p>
                      Список подписанных заявок контрагентов, которые стали
                      партнерами ГКБ
                    </p>
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
                        {request._getRequests
                          .filter((r: RequestModel) => r.request_status === 8)
                          .map((r: RequestModel) => (
                            <tr
                              onClick={() => history.push(`/request/${r.id}`)}
                            >
                              <td>{r.id}</td>
                              <td>{r.name_uid}</td>
                              <td>{r.service_type}</td>
                              <td>{r.service_category}</td>
                              <td>{moment(r.reg_date).format("MM.DD.YYYY")}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className="tab-content tab-4">
                    <h3 className="title-subhead mb-16">В архиве</h3>
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
                        {request._getRequests
                          .filter((r: RequestModel) => r.request_status === 9)
                          .map((r: RequestModel) => (
                            <tr
                              onClick={() => history.push(`/request/${r.id}`)}
                            >
                              <td>{r.id}</td>
                              <td>{r.name_uid}</td>
                              <td>{r.service_type}</td>
                              <td>{r.service_category}</td>
                              <td>{moment(r.reg_date).format("MM.DD.YYYY")}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
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
export default Request;
