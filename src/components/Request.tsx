import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useHistory } from "react-router";
import AppState from "../ncalayer/state";
import "react-tabs/style/react-tabs.css";
import "./style.css";

interface RequestProps {
  state: AppState;
  setState: any;
}

const Request = (props: RequestProps) => {
  const { state, setState } = props;
  const [advance, setAdvance] = React.useState(false);
  const [sort, setSort] = React.useState(false);
  const [service, setService] = React.useState(false);
  const [services, setServices] = React.useState<string[]>([]);
  const [sortTitle, setSortTitle] = React.useState("");
  const history = useHistory();
  return (
    <div className="main-body">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="req-manager p-50 pad-b-128">
              <div className="header-text justify-content-between mb-24">
                <h1 className="title-main">Заявки</h1>
                {/* <div className="btn button btn-primary btn-icon">
                  <i className="azla add-plusRound-icon"></i>
                  <span className="text">Новая заявка</span>
                </div> */}
              </div>

              <Tabs
                selectedIndex={state.tab}
                onSelect={(index) => setState({ ...state, tab: index })}
              >
                <div className="">
                  <TabList>
                    <Tab>Нераспределенные</Tab>
                    <Tab>Мои</Tab>
                    <Tab>Подписанные</Tab>
                    <Tab>В архиве</Tab>
                  </TabList>
                </div>

                {/* <div className="tab-links ">
                                    <span className="link active">Нераспределенные</span>
                                    <span className="link">Мои (3)</span>
                                    <span className="link">Подписанные</span>
                                    <span className="link">В архиве</span>
                                    <span className="bottomLine"></span>
                                </div> */}
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
                      Найдено <span className="number">32</span>
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
                        {[1, 2, 3, 4].map((m) => (
                          <tr onClick={() => history.push("/orders/title")}>
                            <td>52345634643</td>
                            <td>М-Ломбард</td>
                            <td>Ломбард</td>
                            <td>Кредитная история</td>
                            <td>12.12.2021</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className="tab-content tab-2">
                    <h3 className="title-subhead mb-16">
                      На подпись <span className="number">32</span>
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
                        {[1, 2, 3, 4].map((m) => (
                          <tr onClick={() => history.push("/orders/title")}>
                            <td>52345634643</td>
                            <td>М-Ломбард</td>
                            <td>Ломбард</td>
                            <td>Кредитная история</td>
                            <td>12.12.2021</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="tab-content tab-2 mt-16">
                    <h3 className="title-subhead mb-16">
                      Активные <span className="number">62</span>
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
                        {[1, 2, 3, 4].map((m) => (
                          <tr onClick={() => history.push("/orders/title")}>
                            <td>52345634643</td>
                            <td>М-Ломбард</td>
                            <td>Ломбард</td>
                            <td>Кредитная история</td>
                            <td>12.12.2021</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className="tab-content tab-3">
                    <h3 className="title-subhead mb-16">
                      Подписанные <span className="number">32</span>
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
                        {[1, 2, 3, 4].map((m) => (
                          <tr onClick={() => history.push("/orders/title")}>
                            <td>52345634643</td>
                            <td>М-Ломбард</td>
                            <td>Ломбард</td>
                            <td>Кредитная история</td>
                            <td>12.12.2021</td>
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
                        {[1, 2, 3, 4].map((m) => (
                          <tr onClick={() => history.push("/orders/title")}>
                            <td>52345634643</td>
                            <td>М-Ломбард</td>
                            <td>Ломбард</td>
                            <td>Кредитная история</td>
                            <td>12.12.2021</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabPanel>
              </Tabs>

              <div className="req-inner-footer">
                <div className="container">
                  <button type="button" className="button btn-primary btn-icon ml-32">
                    <i className="azla add-plusRound-icon"></i> Новая заявка
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
export default Request;
