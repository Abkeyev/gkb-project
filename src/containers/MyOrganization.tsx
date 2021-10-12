import React from "react";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  Address,
  AddressTypes,
  AuthPerson,
  Categories,
  ClientService,
  ClientUser,
  ClientUsers,
  Documents,
  ServiceCommon,
  User,
  Client,
  Contact,
  Request,
} from "../api/Models/ServiceModels";
import { Link } from "react-router-dom";
import moment from "moment";
import { Modal } from "../containers";

const MyOrganization = observer((props: any) => {
  const history = useHistory();
  const { main, request, setState, state, client } = props;

  React.useEffect(() => {
    request.getPosition();
    request.getClient(main.clientData.client.id);
    request.getClientUser(main.clientData.client.id);
    request.getClientUsersForAdd(main.clientData.client.id);
    request.getClientAllUsers(main.clientData.client.id);
    request.getClientService();
    request.getDocumentsCategories();
    request.getClientTypes();
    request.getDocumentsType();
    request.getClientContact(main.clientData.client.id);
    request.getClientAddress(main.clientData.client.id);
    request.getAuthPersons(main.clientData.client.id);
    request.getClientAddressTypes();
    request.getClientBankDetails(main.clientData.client.id);
    request.getSigningAuth();
    request.getPersonStatus();
    request.getClientServiceType();
    request.getDocuments(main.clientData.client.id);
    request.getClientRequests(main.clientData.client.id);
  }, []);

  return (
    <>
      {main.isOpenModal && (
        <Modal
          main={main}
          setState={setState}
          state={state}
          client={client}
          request={request}
        />
      )}
      <div className="main-body">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="my-organization p-50 pad-b-128">
                <div className="header-text justify-content-between mb-32">
                  <h1 className="title-main">Моя организация</h1>
                </div>
                <Tabs>
                  <div className="mb-32">
                    <TabList
                      value={request.tab}
                      onClick={(e: any) => (request.tab = e.target.value)}
                    >
                      <Tab value={0}>Общее</Tab>
                      <Tab value={1}>Документы</Tab>
                      <Tab value={2}>Пользователи</Tab>
                      <Tab value={3}>Подключенные услуги</Tab>
                      <Tab value={4}>Пользователи услуг</Tab>
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
                              <span className="left">
                                Краткое наименование:
                              </span>
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
                                </a>{" "}
                                <span
                                  className="edit"
                                  onClick={() => {
                                    main.setModal(true);
                                    main.setModalType(17);
                                    main.setModalTypeEdit(0);
                                  }}
                                >
                                  <i className="azla edit-primary-icon ml-8"></i>
                                </span>
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
                                        {a.full_name}{" "}
                                        <span
                                          className="edit"
                                          onClick={() => {
                                            main.setModal(true);
                                            main.setModalType(23);
                                          }}
                                        >
                                          <i className="azla edit-primary-icon ml-8"></i>
                                        </span>
                                      </span>
                                    </li>
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
                                  </>
                                ))}
                            <li>
                              <span className="left">ОКЭД:</span>
                              <span className="right">
                                {main.clientData.client.oked}
                              </span>
                            </li>
                          </ul>
                        </div>
                      )}

                      <h3 className="title-subhead mb-16">Контакты и адреса</h3>

                      <div className="total-info mb-32">
                        <ul className="info-list">
                          {request._getContacts &&
                            request._getContacts.map(
                              (c: Contact, i: number) => (
                                <li>
                                  <span className="left">
                                    {i === 0 && "Контакты:"}
                                  </span>
                                  <span className="right d-flex">
                                    {c.phone_number} ({c.phone_type}){" "}
                                    <span
                                      className="edit"
                                      onClick={() => {
                                        main.setModal(true);
                                        main.setModalType(15);
                                        main.setModalTypeEdit(2);
                                        main.setModalTypeData(c);
                                      }}
                                    >
                                      <i className="azla edit-primary-icon ml-8"></i>
                                    </span>
                                  </span>
                                </li>
                              )
                            )}
                          {request.getAddressTypes() &&
                            request.getAddressTypes().map(
                              (t: AddressTypes) =>
                                t.address &&
                                t.address.map((a: Address) => (
                                  <li>
                                    <span className="left">{t.name}:</span>
                                    <span className="right d-flex">
                                      {a.full_address}{" "}
                                      <span
                                        className="edit"
                                        onClick={() => {
                                          main.setModal(true);
                                          main.setModalType(15);
                                          main.setModalTypeEdit(3);
                                          main.setModalTypeData(a);
                                        }}
                                      >
                                        <i className="azla edit-primary-icon ml-8"></i>
                                      </span>
                                    </span>
                                  </li>
                                ))
                            )}
                          {request._getClientAddress &&
                            request._getClientAddress.filter(
                              (a: Address) => a.address_type === 2
                            )[0] && (
                              <>
                                <li>
                                  <span className="left">Полный адрес:</span>
                                  <span className="right d-flex">
                                    {
                                      request._getClientAddress.filter(
                                        (a: Address) => a.address_type === 2
                                      )[0].full_address
                                    }
                                  </span>
                                </li>
                                <li>
                                  <span className="left">Индекс:</span>
                                  <span className="right d-flex">
                                    {
                                      request._getClientAddress.filter(
                                        (a: Address) => a.address_type === 2
                                      )[0].kato
                                    }
                                  </span>
                                </li>
                                <li>
                                  <span className="left">Улица:</span>
                                  <span className="right d-flex">
                                    {
                                      request._getClientAddress.filter(
                                        (a: Address) => a.address_type === 2
                                      )[0].street
                                    }
                                  </span>
                                </li>
                                <li>
                                  <span className="left">Дом/здание:</span>
                                  <span className="right d-flex">
                                    {
                                      request._getClientAddress.filter(
                                        (a: Address) => a.address_type === 2
                                      )[0].building
                                    }
                                  </span>
                                </li>
                              </>
                            )}
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
                                    {request._getBankDetails[0].iik}{" "}
                                    <span
                                      className="edit"
                                      onClick={() => {
                                        main.setModal(true);
                                        main.setModalType(15);
                                        main.setModalTypeEdit(4);
                                        main.setModalTypeData(
                                          request._getBankDetails[0]
                                        );
                                      }}
                                    >
                                      <i className="azla edit-primary-icon ml-8"></i>
                                    </span>
                                  </span>
                                </li>
                                <li>
                                  <span className="left">БИК:</span>
                                  <span className="right d-flex">
                                    {request._getBankDetails[0].bik}{" "}
                                    <span
                                      className="edit"
                                      onClick={() => {
                                        main.setModal(true);
                                        main.setModalType(15);
                                        main.setModalTypeEdit(4);
                                        main.setModalTypeData(
                                          request._getBankDetails[0]
                                        );
                                      }}
                                    >
                                      <i className="azla edit-primary-icon ml-8"></i>
                                    </span>
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
                                              <span
                                                onClick={() =>
                                                  d.file &&
                                                  request.downloadDocument(
                                                    d.file
                                                  )
                                                }
                                              >
                                                {d.name}
                                              </span>
                                              <i
                                                onClick={() => {
                                                  if (d.file) {
                                                    main.setModal(true);
                                                    main.setModalType(19);
                                                    main.doc = d.file;
                                                  }
                                                }}
                                                className="trash azla trash-icon-alert"
                                              ></i>
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
                                    <span
                                      className="edit-btn underline"
                                      onClick={() => {
                                        main.setModal(true);
                                        main.setModalType(20);
                                        main.setModalTypeData(a);
                                      }}
                                    >
                                      <i className="azla edit-primary-icon mr-8"></i>{" "}
                                      Редактировать
                                    </span>
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
                                      {c.service_category === 1
                                        ? "БДКИ"
                                        : "ЕСБД"}
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
                      <h3 className="title-subhead mb-8">
                        Пользователи услуг{" "}
                        <span className="number">
                          {request._getClientUsersForAdd &&
                            request._getClientUsersForAdd.length}
                        </span>
                      </h3>
                      <p className="mb-24">
                        Пользователи организации, которые имеют доступ к
                        сервисам БДКИ и ЕСБД
                      </p>
                      {(request._getClientUsersForAdd as ClientUsers[]).map(
                        (u: ClientUsers, index) => (
                          <div className="card mb-24 pad-24">
                            <div className="card-header">
                              <div className="title">
                                <h6 className="text">{u.full_name}</h6>
                                <span
                                  className="edit-btn underline"
                                  onClick={() => {
                                    main.setModal(true);
                                    main.setModalType(11);
                                    main.setModalTypeEdit(2);
                                    main.setModalTypeData(u);
                                  }}
                                >
                                  <i className="azla edit-primary-icon mr-8"></i>{" "}
                                  Редактировать
                                </span>
                              </div>
                              <p className="desc">
                                {
                                  request._getPosition.find(
                                    (t: ServiceCommon) =>
                                      t.id === +u.position_name
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
                                        <span className="left">
                                          Заместитель:
                                        </span>
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
                {request.tab === 1 && (
                  <div className="req-inner-footer">
                    <div className="container">
                      <div className="left">
                        <button
                          type="button"
                          onClick={() => {
                            main.setModal(true);
                            main.setModalType(18);
                          }}
                          className="button btn-primary mrl-32"
                        >
                          <i className="trash azla add-plusRound-icon"></i>
                          Загрузить документ
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {request.tab === 2 && (
                  <div className="req-inner-footer">
                    <div className="container">
                      <div className="left">
                        <button
                          type="button"
                          onClick={() => {
                            main.setModal(true);
                            main.setModalType(21);
                          }}
                          className="button btn-primary mrl-32"
                        >
                          <i className="trash azla add-plusRound-icon"></i>
                          Добавить пользователя
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {request.tab === 4 && (
                  <div className="req-inner-footer">
                    <div className="container">
                      <div className="left">
                        <button
                          type="button"
                          onClick={() => {
                            main.setModal(true);
                            main.setModalType(11);
                            main.setModalTypeEdit(1);
                            main.setModalTypeData(null);
                          }}
                          className="button btn-primary mrl-32"
                        >
                          <i className="trash azla add-plusRound-icon"></i>
                          Добавить пользователя
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
export default MyOrganization;
