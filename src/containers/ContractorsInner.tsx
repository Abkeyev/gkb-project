import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { observer } from "mobx-react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  Address,
  AddressTypes,
  AuthPerson,
  Categories,
  ClientService,
  ClientUser,
  Documents,
  ServiceCommon,
} from "../api/Models/ServiceModels";

const ContractorsInner = observer((props: any) => {
  const { main, request } = props;
  const { id } = props.match.params;
  const history = useHistory();

  React.useEffect(() => {
    request.getClient(id);
    request.getClientUser(id);
    request.getClientService();
    request.getDocumentsCategories();
    request.getDocuments(id);
    request.getDocCategories();
    request.getClientTypes();
    request.getAuthPersons(id);
    request.getClientContact(id);
    request.getClientAddress(id);
    request.getClientAddressTypes();
    request.getClientBankDetails(id);
    request.getSigningAuthority();
    request.getPersonStatus();
    request.getClientServiceType();
  }, []);
  return (
    <div className="main-body">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="my-organization p-50 pad-b-128">
              <div className="header-text-inner justify-content-between mb-32">
                <div className="back-breadcrumbs">
                  <Link to="/parthers-page" className="back">
                    <i className="azla arrow-left-icon"></i> Назад
                  </Link>
                  <div className="breadcrumbs">
                    <Link to="/parthers-page">Контрагенты</Link> /{" "}
                    <span>ТОО “М-Ломбард”</span>
                  </div>
                </div>

                <h1 className="title-main mb-32">ТОО “М-Ломбард”</h1>
              </div>
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
                              </a>{" "}
                              <span className="edit">
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
                            request._getAuthPersons[0] && (
                              <>
                                <li>
                                  <span className="left">
                                    Уполномоченное лицо:
                                  </span>
                                  <span className="right d-flex">
                                    {request._getAuthPersons[0].full_name}{" "}
                                    <span className="edit">
                                      <i className="azla edit-primary-icon ml-8"></i>
                                    </span>
                                  </span>
                                </li>
                                <li>
                                  <span className="left">
                                    Дата регистрации:
                                  </span>
                                  <span className="right">
                                    {request._getAuthPersons[0].reg_date}
                                  </span>
                                </li>
                              </>
                            )}
                          <li>
                            <span className="left">ОКЭД:</span>
                            <span className="right">
                              90.3.1 - Финансовая деятельность
                            </span>
                          </li>
                        </ul>
                      </div>
                    )}

                    <h3 className="title-subhead mb-16">Контакты и адреса</h3>

                    <div className="total-info mb-32">
                      <ul className="info-list">
                        <li>
                          <span className="left">Контакты:</span>
                          {request._getContacts && request._getContacts[0] && (
                            <span className="right d-flex">
                              {request._getContacts[0].phone_number}{" "}
                              <span className="edit">
                                <i className="azla edit-primary-icon ml-8"></i>
                              </span>
                            </span>
                          )}
                          {/* <span>+7 (727) 245-94-94 (рабочий)</span><span>+7 (706) 123-45-67 (моб)</span> */}
                        </li>
                        {request.getAddressTypes().length > 0 &&
                          request.getAddressTypes().map(
                            (t: AddressTypes) =>
                              t.address.length > 0 &&
                              t.address.map((a: Address) => (
                                <>
                                  <li>
                                    <span className="left">{t.name}:</span>
                                    <span className="right d-flex">
                                      {a.full_address}{" "}
                                      <span className="edit">
                                        <i className="azla edit-primary-icon ml-8"></i>
                                      </span>
                                    </span>
                                  </li>
                                  <li>
                                    <span className="left">Улица:</span>
                                    <span className="right d-flex">
                                      {a.street}{" "}
                                      <span className="edit">
                                        <i className="azla edit-primary-icon ml-8"></i>
                                      </span>
                                    </span>
                                  </li>
                                  <li>
                                    <span className="left">Дом/здание:</span>
                                    <span className="right d-flex">
                                      {a.building}{" "}
                                      <span className="edit">
                                        <i className="azla edit-primary-icon ml-8"></i>
                                      </span>
                                    </span>
                                  </li>
                                </>
                              ))
                          )}
                        {/* <li>
                          <span className="left">Индекс:</span>
                          <span className="right d-flex">
                            050042{" "}
                            <span className="edit">
                              <i className="azla edit-primary-icon ml-8"></i>
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="left">Область:</span>
                          <span className="right d-flex">
                            Алматинская область{" "}
                            <span className="edit">
                              <i className="azla edit-primary-icon ml-8"></i>
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="left">Район:</span>
                          <span className="right d-flex">
                            Алматинский{" "}
                            <span className="edit">
                              <i className="azla edit-primary-icon ml-8"></i>
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="left">Город:</span>
                          <span className="right d-flex">
                            Алматы{" "}
                            <span className="edit">
                              <i className="azla edit-primary-icon ml-8"></i>
                            </span>
                          </span>
                        </li> */}
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
                                  <span className="edit">
                                    <i className="azla edit-primary-icon ml-8"></i>
                                  </span>
                                </span>
                              </li>
                              <li>
                                <span className="left">БИК:</span>
                                <span className="right d-flex">
                                  {request._getBankDetails[0].bik}{" "}
                                  <span className="edit">
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

                    {request.getDocCategories().map(
                      (c: Categories) =>
                        c.documents.length > 0 && (
                          <>
                            <h5 className="title-subhead-h5 mb-16">{c.name}</h5>
                            <div className="files-added">
                              <ul className="files-list">
                                {c.documents.map((d: Documents) => (
                                  <li>
                                    <i className="azla blank-alt-primary-icon"></i>
                                    <span
                                      onClick={() =>
                                        request.downloadDocument(
                                          d.id,
                                          d.doc_name
                                        )
                                      }
                                    >
                                      {d.doc_name}
                                    </span>
                                  </li>
                                ))}
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
                          {request._getAuthPersons.length}
                        </span>
                      </h3>
                      <p className="mb-24">
                        Пользователи организации с наличием ЭЦП организации
                      </p>

                      {request._getAuthPersons.map((a: AuthPerson) => (
                        <div className="card mb-24 pad-24">
                          <div className="card-header">
                            <div className="title">
                              <h6 className="text">{a.full_name}</h6>
                              {/* <span className="num">№1</span> */}
                            </div>
                            <p className="desc">
                              Аналитик – Департамент финансового анализа
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
                                      <span className="right">{a.id}</span>
                                    </li>
                                    <li>
                                      <span className="left">Организация:</span>
                                      <span className="right active-link">
                                        {request._getClient.longname}
                                      </span>
                                    </li>
                                    <li>
                                      <span className="left">Email:</span>
                                      <span className="right">{""}</span>
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
                                        {a.reg_date}
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
                                              s.id === a.sign_auth
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

                      <h3 className="title-subhead mb-8">
                        Пользователи{" "}
                        <span className="number">
                          {request._getClientUser.length}
                        </span>
                      </h3>
                      <p className="mb-24">
                        Пользователи организации с наличием ЭЦП организации
                      </p>

                      {(request._getClientUser as ClientUser[]).map(
                        (c: ClientUser) => (
                          <div className="card mb-24 pad-24">
                            <div className="card-header">
                              <div className="title">
                                <h6 className="text">{c.full_name}</h6>
                                <span
                                  className="edit-btn underline"
                                  onClick={() => {
                                    main.setModal(true);
                                    main.setModalType(9);
                                  }}
                                >
                                  <i className="azla edit-primary-icon mr-8"></i>{" "}
                                  Редактировать
                                </span>
                              </div>
                              <p className="desc">{c.position}</p>
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
                                        <span className="right">{c.id}</span>
                                      </li>
                                      <li>
                                        <span className="left">
                                          Организация:
                                        </span>
                                        <span className="right active-link">
                                          {request._getClient.longname}
                                        </span>
                                      </li>
                                      <li>
                                        <span className="left">Email:</span>
                                        <span className="right">{c.email}</span>
                                      </li>
                                      <li>
                                        <span className="left">
                                          Контактный номер:
                                        </span>
                                        <span className="right"></span>
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
                                          {c.reg_date}
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
                                                s.id === c.person_status
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
                          {request._getClientService.map((c: ClientService) => (
                            <tr
                              onClick={() => history.push(`/service/${c.id}`)}
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
                              <td>{c.date_from}</td>
                              <td>{c.date_to}</td>
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

                    {(request._getClientUser as ClientUser[]).map(
                      (c: ClientUser) => (
                        <div className="card mb-24 pad-24">
                          <div className="card-header">
                            <div className="title">
                              <h6 className="text">{c.full_name}</h6>
                              <span
                                className="edit-btn underline"
                                onClick={() => {
                                  main.setModal(true);
                                  main.setModalType(9);
                                }}
                              >
                                <i className="azla edit-primary-icon mr-8"></i>{" "}
                                Редактировать
                              </span>
                            </div>
                            <p className="desc">{c.position}</p>
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
                                      <span className="right">{c.id}</span>
                                    </li>
                                    <li>
                                      <span className="left">Организация:</span>
                                      <span className="right active-link">
                                        {request._getClient.longname}
                                      </span>
                                    </li>
                                    <li>
                                      <span className="left">Email:</span>
                                      <span className="right">{c.email}</span>
                                    </li>
                                    <li>
                                      <span className="left">
                                        Контактный номер:
                                      </span>
                                      <span className="right"></span>
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
                                        {c.reg_date}
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
                                              s.id === c.person_status
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
