import React, { useState, useEffect, useRef } from "react";
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
import { OnClickOutside } from "../utils/utils";

const Request = observer((props: any) => {
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

  React.useEffect(() => {
    request.getRequests();
    request.getMineRequest(main.clientData.user.id);
    request.getClients();
    request.getClientServiceType();
    request.getClientTypes();
  }, []);

  OnClickOutside(catRef, () => setCategory(false));
  OnClickOutside(serviceRef, () => setService(false));

  const filterRequests = (type: number[] = [], isMine: boolean = false) => {
    const req = isMine
      ? request._getMineRequests &&
        request._getMineRequests
          .slice()
          .sort((a: RequestModel, b: RequestModel) => {
            return (
              new Date(a.reg_date).getTime() - new Date(b.reg_date).getTime()
            );
          })
          .reverse()
      : request._getRequests &&
        request._getRequests
          .slice()
          .sort((a: RequestModel, b: RequestModel) => {
            return (
              new Date(a.reg_date).getTime() - new Date(b.reg_date).getTime()
            );
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
              : categories.includes(ccc.service_category)
          )
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
                            defaultValue={bin}
                            onChange={(e) => setBin(e.target.value)}
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
                        <div className="form-multiselect mb-0 mr-16">
                          <div
                            className={`multi js-multi-buttons ${
                              category ? "open" : ""
                            }`}
                            ref={catRef}
                          >
                            <div className="input-wrapper">
                              <input
                                className="multi-input azla form-icon chevron-down-icon"
                                type="text"
                                placeholder="Выберите категорию деятельности"
                                readOnly
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCategory(true);
                                }}
                              />
                              <label className="label">
                                Категория деятельности
                              </label>
                            </div>
                            <div className="multi-menu">
                              <div className="multi-option option-current">
                                <div className="multi-list">
                                  <div className="form-check gkb-checkbox">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={categories.includes(1)}
                                      onClick={() => {
                                        !categories.includes(1)
                                          ? setCategories([...categories, 1])
                                          : setCategories([
                                              ...categories.filter(
                                                (s) => s !== 1
                                              ),
                                            ]);
                                      }}
                                      id={`categoryCheck1`}
                                      required
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={`categoryCheck1`}
                                    >
                                      БДКИ
                                    </label>
                                  </div>
                                </div>
                              </div>

                              <div className="multi-option option-current">
                                <div className="multi-list">
                                  <div className="form-check gkb-checkbox">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={categories.includes(2)}
                                      onClick={() => {
                                        !categories.includes(2)
                                          ? setCategories([...categories, 2])
                                          : setCategories([
                                              ...categories.filter(
                                                (s) => s !== 2
                                              ),
                                            ]);
                                      }}
                                      id={`categoryCheck2`}
                                      required
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={`categoryCheck2`}
                                    >
                                      ЕСБД
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-multiselect mb-0 mr-16">
                          <div
                            className={`multi js-multi-buttons ${
                              service ? "open" : ""
                            }`}
                            ref={serviceRef}
                          >
                            <div className="input-wrapper">
                              <input
                                className="multi-input azla form-icon chevron-down-icon"
                                type="text"
                                placeholder="Выберите тип сервиса"
                                readOnly
                                onClick={(e) => {
                                  e.preventDefault();
                                  !service && setService(true);
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
                              date ? "open" : ""
                            }`}
                            onClick={() => setDate(!date)}
                          >
                            <div className="input-wrapper">
                              <input
                                className="multi-input azla form-icon chevron-down-icon"
                                type="text"
                                placeholder="Выберите тип сортировки"
                                value={sortTitle}
                                readOnly
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
                            setCategories([]);
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
                        {filterRequests([1]).length}
                      </span>
                    </h3>
                    {filterRequests([1]).length === 0 ? (
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
                          {filterRequests([1]).map((r: RequestModel) => (
                            <tr
                              onClick={() => history.push(`/request/${r.id}`)}
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
                              <td>{moment(r.reg_date).format("DD.MM.YYYY")}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="tab-content tab-2">
                    <h3 className="title-subhead mb-16">
                      На подпись{" "}
                      <span className="number">
                        {filterRequests([6], true).length}
                      </span>
                    </h3>
                    {filterRequests([6], true).length === 0 ? (
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
                          {filterRequests([6], true).map((r: RequestModel) => (
                            <tr
                              onClick={() => history.push(`/request/${r.id}`)}
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
                              <td>{moment(r.reg_date).format("DD.MM.YYYY")}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>

                  <div className="tab-content tab-2 mt-16">
                    <h3 className="title-subhead mb-16">
                      Активные{" "}
                      <span className="number">
                        {filterRequests([2, 5, 8, 9, 10, 11], true).length}
                      </span>
                    </h3>
                    {filterRequests([2, 5, 8, 9, 10, 11], true).length === 0 ? (
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
                          {filterRequests([2, 5, 8, 9, 10, 11], true).map(
                            (r: RequestModel) => (
                              <tr
                                onClick={() => history.push(`/request/${r.id}`)}
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
                  <div className="tab-content tab-3">
                    <h3 className="title-subhead mb-16">
                      Подписанные{" "}
                      <span className="number">
                        {filterRequests([7]).length}
                      </span>
                    </h3>
                    <p>
                      Список подписанных заявок контрагентов, которые стали
                      партнерами ГКБ
                    </p>
                    {filterRequests([7]).length === 0 ? (
                      "Список пуст."
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
                          {filterRequests([7]).map((r: RequestModel) => (
                            <tr
                              onClick={() => history.push(`/request/${r.id}`)}
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
                              <td>{moment(r.reg_date).format("DD.MM.YYYY")}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="tab-content tab-4">
                    <h3 className="title-subhead mb-16">В архиве</h3>
                    <p>Список архивированных заявок</p>
                    {filterRequests([3]).length === 0 ? (
                      "Список пуст."
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
                          {filterRequests([3]).map((r: RequestModel) => (
                            <tr
                              onClick={() => history.push(`/request/${r.id}`)}
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
export default Request;
