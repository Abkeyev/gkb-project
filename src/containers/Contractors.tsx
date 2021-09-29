import React, { useEffect, useRef } from "react";
import "react-tabs/style/react-tabs.css";
import { observer } from "mobx-react";
import { useHistory } from "react-router";
import { Client } from "../api/Models/ServiceModels";
import { truncate } from "fs";

const Contractors = observer((props: any) => {
  const { main, request } = props;
  const [service, setService] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [bin, setBin] = React.useState("");
  const [services, setServices] = React.useState<number[]>([]);
  const history = useHistory();
  const wrapperRef = useRef<any>(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setService(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  useEffect(() => {
    // useOutsideAlerter(wrapperRef);
    request.getClients();
    request.getClientTypes();
  }, []);
  return (
    <div className="main-body">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="create-page p-50 pad-b-128">
              <div className="header-text-inner justify-content-between">
                <h1 className="title-main">
                  Контрагенты{" "}
                  <span className="number">{request._getClients.length}</span>
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
                          defaultValue={bin}
                          onChange={(e) => setBin(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div
                      className={`multi js-multi-buttons side-r ${
                        service ? "open" : ""
                      }`}
                      ref={wrapperRef}
                    >
                      <div className="input-wrapper">
                        <input
                          className="multi-input azla form-icon chevron-down-icon"
                          type="text"
                          placeholder="Выбрать"
                          defaultValue={search}
                          onChange={(e) => setSearch(e.target.value)}
                          onClick={(e) => {
                            e.preventDefault();
                            setService(true);
                          }}
                        />
                      </div>
                      <div className="multi-menu">
                        <div className="multi-option option-current">
                          {request._getClientTypes
                            .filter((c: any) =>
                              c.name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                            )
                            .map((t: any) => (
                              <div className="multi-list">
                                <div className="form-check gkb-checkbox">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={services.includes(t.id)}
                                    onClick={() =>
                                      !services.includes(t.id)
                                        ? setServices([...services, t.id])
                                        : setServices([
                                            ...services.filter(
                                              (s) => s !== t.id
                                            ),
                                          ])
                                    }
                                    id={`clientType${t.id}`}
                                    required
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`clientType${t.id}`}
                                  >
                                    {t.name}
                                  </label>
                                </div>
                              </div>
                            ))}
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
                    {(request._getClients as Client[])
                      .filter(
                        (cc: Client) =>
                          cc.longname.includes(bin) || cc.bin.includes(bin)
                      )
                      .filter((ccc: Client) =>
                        services.length === 0
                          ? true
                          : services.includes(ccc.client_type)
                      )
                      .map((c: Client) => (
                        <tr
                          onClick={() => history.push(`/contractors/${c.id}`)}
                        >
                          <td>{c.bin}</td>
                          <td>{c.longname}</td>
                          <td>
                            {
                              request._getClientTypes.find(
                                (t: any) => t.id === c.client_type
                              )?.name
                            }
                          </td>
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
});
export default Contractors;
