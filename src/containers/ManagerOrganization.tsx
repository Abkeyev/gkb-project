import React from "react";
import "react-tabs/style/react-tabs.css";
import { observer } from "mobx-react";
import { useHistory } from "react-router";
import { AppContext } from "../AppContext";

const ManagerOrganization = () => {
    const [tab, setTab] = React.useState(false);
    const { mainStore, requestStore } = React.useContext(AppContext);
    const [service, setService] = React.useState(false);
    const [services, setServices] = React.useState<string[]>([]);
    const history = useHistory();
  return (
    <div className="main-body">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
                
            <div className="create-page p-50 pad-b-128">
              <div className="header-text-inner justify-content-between">
                <h1 className="title-main">
                
                    Контрагенты{" "}
                      <span className="number">32</span>
                </h1>
              </div>

            <div className="filter mb-24">
                <div className="row">
                    <div className="col-md-9">

                            <div className="filter-search">
                                <div className="form-group w-100 mr-16 mb-0">
                                    <input
                                    className="form-control azla form-icon search-icon"
                                    type="name"
                                    placeholder="Поиск по названию, БИН"
                                    />
                                </div>
                            
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div
                                className={`multi js-multi-buttons side-r ${
                                    service ? "open" : ""
                                }`}
                                >
                                <div className="input-wrapper">
                                    <input
                                    className="multi-input azla form-icon chevron-down-icon"
                                    type="text"
                                    placeholder="Выбрать"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setService(true);
                                    }}
                                    />
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
                                            Выбор 1
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
                                            Выбор 2
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
                    </div>
                </div>

                <div className="partners-page-inner">
                    <table className="table req-table td-three">
                        <thead>
                            <tr>
                            <th>БИН</th>
                            <th>Организации</th>
                            <th>Категория деятельности</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4].map((m) => (
                            <tr onClick={() => history.push("/parthers-page/title")}>
                                <td>52345634643</td>
                                <td>М-Ломбард</td>
                                <td>Ломбард</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ManagerOrganization;
