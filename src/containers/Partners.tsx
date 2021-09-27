import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { ServiceCommon, Request } from "../api/Models/ServiceModels";
import "react-tabs/style/react-tabs.css";
import { observer } from "mobx-react";
import moment from "moment";

const Partners = observer((props: any) => {
  const { request, main } = props;
  const [advance, setAdvance] = React.useState(false);
  const [sort, setSort] = React.useState(false);
  const [service, setService] = React.useState(false);
  const [services, setServices] = React.useState<string[]>([]);
  const [sortTitle, setSortTitle] = React.useState("");
  const history = useHistory();

  React.useEffect(() => {
    request.getClientRequests(main.clientData.client.id);
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
                    <Tab>Исходящие</Tab>
                    <Tab>Подписанные</Tab>
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
                        service && setService(false);
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
                          <ul className="selected-options">
                            {services.map((s) => (
                              <li>
                                <button
                                  className="remove-option"
                                  onClick={() =>
                                    setServices([
                                      ...services.filter((ss) => ss !== s),
                                    ])
                                  }
                                  type="button"
                                >
                                  {s}
                                </button>
                              </li>
                            ))}
                          </ul>
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
                                  setService(true);
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
                                />
                              </div>

                              <div className="multi-option option-current">
                                <div className="multi-list">
                                  <div className="form-check gkb-checkbox">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={services.includes("Сервис 1")}
                                      onClick={() =>
                                        !services.includes("Сервис 1")
                                          ? setServices([
                                              ...services,
                                              "Сервис 1",
                                            ])
                                          : services.filter(
                                              (s) => s !== "Сервис 1"
                                            )
                                      }
                                      id="invalidCheck"
                                      required
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="invalidCheck"
                                    >
                                      Сервис 1
                                    </label>
                                    <div className="invalid-feedback">
                                      Ошибка
                                    </div>
                                  </div>
                                </div>

                                <div className="multi-list">
                                  <div className="form-check gkb-checkbox">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={services.includes("Сервис 2")}
                                      onClick={() =>
                                        !services.includes("Сервис 2")
                                          ? setServices([
                                              ...services,
                                              "Сервис 2",
                                            ])
                                          : services.filter(
                                              (s) => s !== "Сервис 2"
                                            )
                                      }
                                      id="invalidCheck1"
                                      required
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="invalidCheck1"
                                    >
                                      Сервис 1
                                    </label>
                                    <div className="invalid-feedback">
                                      Ошибка
                                    </div>
                                  </div>
                                </div>
                              </div>
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
                        {request._getRequests &&
                          request._getRequests.map((r: Request) => (
                            <tr
                              onClick={() => history.push(`/partner/${r.id}`)}
                            >
                              <td>{r.client.bin}</td>
                              <td>{r.client.longname}</td>
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
                </TabPanel>

                <TabPanel>
                  <div className="tab-content tab-2">
                    <h3 className="title-subhead mb-16">
                      На подпись{" "}
                      <span className="number">
                        {
                          request._getRequests.filter(
                            (r: Request) => r.request_status === 11
                          ).length
                        }
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
                        {request._getRequests &&
                          request._getRequests
                            .filter((r: Request) => r.request_status === 11)
                            .map((r: Request) => (
                              <tr
                                onClick={() => history.push(`/partner/${r.id}`)}
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
                                <td>
                                  {moment(r.reg_date).format("MM.DD.YYYY")}
                                </td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="tab-content tab-2 mt-16">
                    <h3 className="title-subhead mb-16">
                      Активные{" "}
                      <span className="number">
                        {
                          request._getRequests.filter(
                            (r: Request) => r.request_status === 12
                          ).length
                        }
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
                        {request._getRequests &&
                          request._getRequests
                            .filter((r: Request) => r.request_status === 12)
                            .map((r: Request) => (
                              <tr
                                onClick={() => history.push(`/partner/${r.id}`)}
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
                                <td>
                                  {moment(r.reg_date).format("MM.DD.YYYY")}
                                </td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  </div>
                </TabPanel>
              </Tabs>

              <div className="req-inner-footer">
                <div className="container">
                  <Link to="/request-new">
                    <button
                      type="button"
                      className="button btn-primary btn-icon ml-32"
                    >
                      <i className="azla add-plusRound-icon"></i> Новая заявка
                    </button>
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
export default Partners;
