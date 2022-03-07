import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { ContractorsInnerProps } from "./ContractorsInnerProps.props";
import { ServiceCommon, User, Client } from "../../api/Models/ServiceModels";
import { Link } from "react-router-dom";
import moment from "moment";
import { ReactComponent as Spinner } from "../../styles/spinner.svg";

const ContractorsUsers = ({ id, request, setTab }: ContractorsInnerProps) => {
  useEffect(() => {
    request.getClientAllUsers(id);
  }, []);
  return request.loader ? (
    <Spinner />
  ) : (
    <>
      <div className="tab-content tab-1">
        <h3 className="title-subhead mb-8">
          Уполномоченные лица{" "}
          <span className="number">
            {request._getUsers &&
              request._getUsers.filter((u: User) => u.client_auth_person)
                .length}
          </span>
        </h3>
        <p className="mb-24">
          Пользователи организации с наличием ЭЦП организации
        </p>

        {request._getUsers &&
          request._getUsers
            .filter((u: User) => u.client_auth_person)
            .map(
              (a: User) =>
                a.client_auth_person && (
                  <div className="card mb-24 pad-24">
                    <div className="card-header">
                      <div className="title">
                        <h6 className="text">{a.full_name}</h6>
                      </div>
                      <p className="desc">
                        {
                          request._getPosition.find(
                            (t: ServiceCommon) =>
                              t.id === a.client_auth_person.position
                          )?.name
                        }
                      </p>
                    </div>
                    <div className="card-body pad-rl-16">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="total-info">
                            <ul className="info-list">
                              <li>
                                <span className="left">ID пользователя:</span>
                                <span className="right">{a.id}</span>
                              </li>
                              <li>
                                <span className="left">Организация:</span>
                                <span className="right active-link">
                                  <span onClick={() => setTab(0)}>
                                    {request._getClients &&
                                      request._getClients.find(
                                        (t: Client) => t.id === a.client
                                      )?.longname}
                                  </span>
                                </span>
                              </li>
                              <li>
                                <span className="left">Email:</span>
                                <span className="right">{a.email}</span>
                              </li>
                              <li>
                                <span className="left">Контактный номер:</span>
                                <span className="right">{""}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="total-info">
                            <ul className="info-list">
                              <li>
                                <span className="left">Дата регистрации:</span>
                                <span className="right">
                                  {moment(a.reg_date).format("DD.MM.YYYY")}
                                </span>
                              </li>
                              <li>
                                <span className="left">Статус:</span>
                                <span className="right">
                                  {
                                    (
                                      request._getPersonStatus as ServiceCommon[]
                                    ).find(
                                      (s: ServiceCommon) =>
                                        s.id === a.person_status
                                    )?.name
                                  }
                                </span>
                              </li>
                              <li>
                                <span className="left">
                                  Основание для подписи:
                                </span>
                                <span className="right">
                                  {
                                    (
                                      request._getSigningAuthority as ServiceCommon[]
                                    ).find(
                                      (s: ServiceCommon) =>
                                        s.id === a.client_auth_person.sign_auth
                                    )?.name
                                  }
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}

        <h3 className="title-subhead mb-8">
          Пользователи{" "}
          <span className="number">
            {request._getUsers &&
              request._getUsers.filter(
                (u: User) => u.client_auth_person === null
              ).length}
          </span>
        </h3>
        <p className="mb-24">
          Пользователи организации (не уполномоченные лица) без ЭЦП, имеющие
          доступ на портал
        </p>

        {request._getUsers &&
          request._getUsers
            .filter((u: User) => u.client_auth_person === null)
            .map((a: User) => (
              <div className="card mb-24 pad-24">
                <div className="card-header">
                  <div className="title">
                    <h6 className="text">{a.full_name}</h6>
                  </div>
                </div>
                <div className="card-body pad-rl-16">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="total-info">
                        <ul className="info-list">
                          <li>
                            <span className="left">ID пользователя:</span>
                            <span className="right">{a.id}</span>
                          </li>
                          <li>
                            <span className="left">Организация:</span>
                            <span className="right active-link">
                              <span onClick={() => setTab(0)}>
                                {request._getClients &&
                                  request._getClients.find(
                                    (t: Client) => t.id === a.client
                                  )?.longname}
                              </span>
                            </span>
                          </li>
                          <li>
                            <span className="left">Email:</span>
                            <span className="right">{a.email}</span>
                          </li>
                          <li>
                            <span className="left">Контактный номер:</span>
                            <span className="right">{""}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="total-info">
                        <ul className="info-list">
                          <li>
                            <span className="left">Дата регистрации:</span>
                            <span className="right">
                              {moment(a.reg_date).format("DD.MM.YYYY")}
                            </span>
                          </li>
                          <li>
                            <span className="left">Статус:</span>
                            <span className="right">
                              {
                                (
                                  request._getPersonStatus as ServiceCommon[]
                                ).find(
                                  (s: ServiceCommon) => s.id === a.person_status
                                )?.name
                              }
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
    </>
  );
};

export default observer(ContractorsUsers);
