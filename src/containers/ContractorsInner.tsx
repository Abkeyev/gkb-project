import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { observer } from "mobx-react";
import { useHistory } from "react-router";
import {
  Address,
  AddressTypes,
  AuthPerson,
  Categories,
  Client,
  ClientService,
  ClientUsers,
  Contact,
  Documents,
  ServiceCommon,
  User,
  Request,
} from "../api/Models/ServiceModels";
import { Link } from "react-router-dom";
import moment from "moment";

const ContractorsInner = observer((props: any) => {
  const { main, request } = props;
  const { id } = props.match.params;
  const history = useHistory();

  React.useEffect(() => {
    request.getPosition();
    request.getClient(id);
    request.getClientUser(id);
    request.getClientUsersForAdd(id);
    request.getClientAllUsers(id);
    request.getClientService();
    request.getDocumentsCategories();
    request.getClientTypes();
    request.getDocumentsType();
    request.getClientContact(id);
    request.getClientAddress(id);
    request.getAuthPersons(id);
    request.getClientAddressTypes();
    request.getClientBankDetails(id);
    request.getSigningAuth();
    request.getPersonStatus();
    request.getClientServiceType();
    request.getDocuments(id);
    request.getClientRequests(id);
  }, []);
  return (
    <div className="main-body">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="my-organization p-50 pad-b-128">
              {request._getClient && (
                <div className="header-text-inner justify-content-between mb-32">
                  <div className="back-breadcrumbs">
                    <div onClick={() => history.goBack()} className="back">
                      <i className="azla arrow-left-icon"></i> Назад
                    </div>
                    <div className="breadcrumbs">
                      <Link to="/contractors">Контрагенты</Link> /{" "}
                      <span>{request._getClient.longname}</span>
                    </div>
                  </div>

                  <h1 className="title-main mb-32">
                    {request._getClient.longname}
                  </h1>
                </div>
              )}
              <Tabs>
                <div className="mb-32">
                  <TabList>
                    <Tab>Общее</Tab>
                    <Tab>Документы</Tab>
                    <Tab>Пользователи</Tab>
                    <Tab>Подключенные услуги</Tab>
                    <Tab>Пользователи услуг</Tab>
                  </TabList>
                </div>
                <div className="req-inner-body pad-b-128">
                  <TabPanel>
                    <h3 className="title-subhead mb-16">Об организации</h3>
                    {request._getClient && (
                      <div className="total-info mb-32">
                        <ul className="info-list">
                          <li>
                            <span className="left">Полное наименование:</span>
                            <span className="right">
                              {request._getClient.longname}
                            </span>
                          </li>
                          <li>
                            <span className="left">Краткое наименование:</span>
                            <span className="right">
                              {request._getClient.name}
                            </span>
                          </li>
                          <li>
                            <span className="left">БИН:</span>
                            <span className="right">
                              {request._getClient.bin}
                            </span>
                          </li>
                          <li>
                            <span className="left">Вебсайт:</span>
                            <span className="right d-flex">
                              <a
                                href={request._getClient.website}
                                target="_blank"
                                rel="noreferrer"
                                className="pre-primary-color"
                              >
                                {request._getClient.website}
                              </a>
                            </span>
                          </li>
                          <li>
                            <span className="left">Тип клиента:</span>
                            <span className="right">
                              {
                                request._getClientTypes.find(
                                  (t: any) =>
                                    t.id === request._getClient.client_type
                                )?.name
                              }
                            </span>
                          </li>
                          {request._getAuthPersons &&
                            (request._getAuthPersons as AuthPerson[])
                              .filter((f: AuthPerson) => f.is_main)
                              .map((a: AuthPerson) => (
                                <>
                                  <li>
                                    <span className="left">
                                      Уполномоченное лицо:
                                    </span>
                                    <span className="right d-flex">
                                      {a.full_name}
                                    </span>
                                  </li>
                                  <li>
                                    <span className="left">
                                      Дата регистрации:
                                    </span>
                                    <span className="right">
                                      {moment(a.reg_date).format("DD.MM.YYYY")}
                                    </span>
                                  </li>
                                </>
                              ))}
                          <li>
                            <span className="left">ОКЭД:</span>
                            <span className="right">
                              {request._getClient.oked}
                            </span>
                          </li>
                        </ul>
                      </div>
                    )}

                    <h3 className="title-subhead mb-16">Контакты и адреса</h3>

                    <div className="total-info mb-32">
                      <ul className="info-list">
                        {request._getContacts &&
                          request._getContacts
                            .filter((c: Contact) => c.is_main)
                            .map((c: Contact, i: number) => (
                              <li>
                                <span className="left">
                                  {i === 0 && "Контакты:"}
                                </span>
                                <span className="right d-flex">
                                  {c.phone_number} ({c.phone_type})
                                </span>
                              </li>
                            ))}
                        {request.getAddressTypes().length > 0 &&
                          request.getAddressTypes().map(
                            (t: AddressTypes) =>
                              t.address.length > 0 &&
                              t.address.map((a: Address) => (
                                <li>
                                  <span className="left">{t.name}:</span>
                                  <span className="right d-flex">
                                    {a.full_address}
                                  </span>
                                </li>
                              ))
                          )}

                        {request._getClientAddress &&
                          request._getClientAddress
                            .filter((a: Address) => a.id === 2)
                            .map((c: Address) => (
                              <>
                                <li>
                                  <span className="left">Полный адрес:</span>
                                  <span className="right d-flex">
                                    {c.full_address}
                                  </span>
                                </li>
                                <li>
                                  <span className="left">Индекс:</span>
                                  <span className="right d-flex">{c.kato}</span>
                                </li>
                                <li>
                                  <span className="left">Улица:</span>
                                  <span className="right d-flex">
                                    {c.street}
                                  </span>
                                </li>
                                <li>
                                  <span className="left">Дом/здание:</span>
                                  <span className="right d-flex">
                                    {c.building}
                                  </span>
                                </li>
                              </>
                            ))}
                      </ul>
                    </div>

                    {request._getBankDetails.length > 0 &&
                      request._getBankDetails[0] && (
                        <>
                          <h3 className="title-subhead mb-16">
                            Банковские реквизиты
                          </h3>

                          <div className="total-info mb-32">
                            <ul className="info-list">
                              <li>
                                <span className="left">ИИК:</span>
                                <span className="right d-flex">
                                  {request._getBankDetails[0].iik}
                                </span>
                              </li>
                              <li>
                                <span className="left">БИК:</span>
                                <span className="right d-flex">
                                  {request._getBankDetails[0].bik}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </>
                      )}
                  </TabPanel>

                  <TabPanel>
                    <h3 className="title-subhead mb-16">Документы</h3>
                    {request._getDocCategories &&
                    request._getDocCategories.length === 0
                      ? "Документы отсутствуют."
                      : request._getDocCategories.map(
                          (c: Categories) =>
                            c.doc_type.filter((dt: any) => dt.file !== null)
                              .length > 0 && (
                              <>
                                <h5 className="title-subhead-h5 mb-16">
                                  {c.name}
                                </h5>
                                <div className="files-added">
                                  <ul className="files-list">
                                    {c.doc_type.map(
                                      (d: any) =>
                                        d.file && (
                                          <li>
                                            <i className="azla blank-alt-primary-icon"></i>
                                            <span>{d.name}</span>
                                          </li>
                                        )
                                    )}
                                  </ul>
                                </div>
                              </>
                            )
                        )}
                  </TabPanel>

                  <TabPanel>
                    <div className="tab-content tab-1">
                      <h3 className="title-subhead mb-8">
                        Уполномоченные лица{" "}
                        <span className="number">
                          {request._getUsers &&
                            request._getUsers.filter(
                              (u: User) => u.client_auth_person
                            ).length}
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
                                            t.id ===
                                            a.client_auth_person.position
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
                                              <span className="left">
                                                ID пользователя:
                                              </span>
                                              <span className="right">
                                                {a.id}
                                              </span>
                                            </li>
                                            <li>
                                              <span className="left">
                                                Организация:
                                              </span>
                                              <span className="right active-link">
                                                <Link
                                                  to={`/contractors/${a.client}`}
                                                >
                                                  {request._getClients &&
                                                    request._getClients.find(
                                                      (t: Client) =>
                                                        t.id === a.client
                                                    )?.longname}
                                                </Link>
                                              </span>
                                            </li>
                                            <li>
                                              <span className="left">
                                                Email:
                                              </span>
                                              <span className="right">
                                                {a.email}
                                              </span>
                                            </li>
                                            <li>
                                              <span className="left">
                                                Контактный номер:
                                              </span>
                                              <span className="right">
                                                {""}
                                              </span>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="total-info">
                                          <ul className="info-list">
                                            <li>
                                              <span className="left">
                                                Дата регистрации:
                                              </span>
                                              <span className="right">
                                                {moment(a.reg_date).format(
                                                  "DD.MM.YYYY"
                                                )}
                                              </span>
                                            </li>
                                            <li>
                                              <span className="left">
                                                Статус:
                                              </span>
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
                                                      s.id ===
                                                      a.client_auth_person
                                                        .sign_auth
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
                        Пользователи организации (не уполномоченные лица) без
                        ЭЦП, имеющие доступ на портал
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
                                          <span className="left">
                                            ID пользователя:
                                          </span>
                                          <span className="right">{a.id}</span>
                                        </li>
                                        <li>
                                          <span className="left">
                                            Организация:
                                          </span>
                                          <span className="right active-link">
                                            <Link
                                              to={`/contractors/${a.client}`}
                                            >
                                              {request._getClients &&
                                                request._getClients.find(
                                                  (t: Client) =>
                                                    t.id === a.client
                                                )?.longname}
                                            </Link>
                                          </span>
                                        </li>
                                        <li>
                                          <span className="left">Email:</span>
                                          <span className="right">
                                            {a.email}
                                          </span>
                                        </li>
                                        <li>
                                          <span className="left">
                                            Контактный номер:
                                          </span>
                                          <span className="right">{""}</span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="total-info">
                                      <ul className="info-list">
                                        <li>
                                          <span className="left">
                                            Дата регистрации:
                                          </span>
                                          <span className="right">
                                            {moment(a.reg_date).format(
                                              "DD.MM.YYYY"
                                            )}
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
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="tab-content tab-4">
                      <h3 className="title-subhead mb-16">
                        Подключенные услуги
                      </h3>
                      <table className="table req-table td-frist">
                        <thead>
                          <tr>
                            <th>Название услуги</th>
                            <th>Категория</th>
                            <th>Начало услуги</th>
                            <th>Окончание услуги</th>
                          </tr>
                        </thead>
                        <tbody>
                          {request._getRequests &&
                            request._getRequests
                              .filter((c: Request) => c.request_status === 8)
                              .map((c: Request) => (
                                <tr
                                  onClick={() =>
                                    history.push(`/service/${c.id}`)
                                  }
                                >
                                  <td>
                                    {
                                      request._getClientServiceType.find(
                                        (t: ServiceCommon) =>
                                          t.id === c.service_type
                                      )?.name
                                    }
                                  </td>
                                  <td>
                                    {c.service_category === 1 ? "БДКИ" : "ЕСБД"}
                                  </td>
                                  <td>
                                    {moment(c.reg_date).format("DD.MM.YYYY")}
                                  </td>
                                  <td>
                                    {c.fulfill_date &&
                                      moment(c.fulfill_date).format(
                                        "DD.MM.YYYY"
                                      )}
                                  </td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <h3 className="title-subhead mb-8">Пользователи услуг</h3>
                    <p className="mb-24">
                      Пользователи организации, которые имеют доступ к сервисам
                      БДКИ и ЕСБД
                    </p>
                    {(request._getClientUsersForAdd as ClientUsers[]).map(
                      (u: ClientUsers, index) => (
                        <div className="card mb-24 pad-24">
                          <div className="card-header">
                            <div className="title">
                              <h6 className="text">{u.full_name}</h6>
                            </div>
                            <p className="desc">{u.position_name}</p>
                          </div>
                          <div className="card-body pad-rl-16">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="total-info">
                                  <ul className="info-list">
                                    <li>
                                      <span className="left">
                                        ID пользователя:
                                      </span>
                                      <span className="right">{u.id}</span>
                                    </li>
                                    <li>
                                      <span className="left">
                                        ИИН сотрудника:
                                      </span>
                                      <span className="right">{u.iin}</span>
                                    </li>
                                    <li>
                                      <span className="left">
                                        Контактный номер:
                                      </span>
                                      <span className="right">
                                        {u.contacts}
                                      </span>
                                    </li>
                                    <li>
                                      <span className="left">Email:</span>
                                      <span className="right">{u.email}</span>
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
                                        {u.first_head_full_name}
                                      </span>
                                    </li>
                                    <li>
                                      <span className="left">Заместитель:</span>
                                      <span className="right">
                                        {u.deputy_head_full_name}
                                      </span>
                                    </li>
                                    <li>
                                      <span className="left">
                                        Курирующий менеджер:
                                      </span>
                                      <span className="right">
                                        {u.manager_full_name}
                                      </span>
                                    </li>
                                    <li>
                                      <span className="left">
                                        Контакты менеджера:
                                      </span>
                                      <span className="right">
                                        {u.manager_contacts}
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
                  </TabPanel>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default ContractorsInner;
