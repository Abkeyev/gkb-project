import React from "react";
import {
  AuthPerson,
  ClientUser,
  ClientUsers,
  ServiceCommon,
} from "../api/Models/ServiceModels";
import "react-tabs/style/react-tabs.css";
import { observer } from "mobx-react";

const PartnersNew = observer((props: any) => {
  const { main, request } = props;
  const [tab, setTab] = React.useState("1");
  const [files, setFiles] = React.useState<string[] | []>([]);
  const [filesTitle, setFilesTitle] = React.useState<string[] | []>([]);

  React.useEffect(() => {
    request.getRequests();
    request.getAuthPersons(main.clientData.client.id);
    request.getClientUsersForAdd(main.clientData.client.id);
    request.getSigners(main.clientData.client.id);
    request.getClientServiceType();
    request.getPersonStatus();
    request.getDocumentsType();
    request.getDocumentsCategories();
  }, []);

  const handleChange = (e: any, results: any, doc_type: any) => {
    results.forEach((result: any) => {
      const [e, file] = result;
      const res = e.target.result.split(",");
      if (file.size < 5000000) {
        setFiles([...files, res[1]]);
        setFilesTitle([...filesTitle, file.name]);
        var bodyFormData = new FormData();
        bodyFormData.append("file", file);
        bodyFormData.append("doc_category", "2");
        bodyFormData.append("doc_type", doc_type);
        bodyFormData.append("is_draft", "true");
        request
          .addDocument(main.clientData.client.id, bodyFormData)
          .then((r: any) => {
            console.log(r);
          });
      }
    });
  };

  return (
    <div className="main-body">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="create-page p-50 pad-b-128">
              <div className="header-text-inner justify-content-between mb-32">
                <h1 className="title-main mb-32">Новая заявка</h1>
              </div>
              <div className="create-page-inner">
                <h3 className="title-subhead mb-16">Выберите сервис</h3>
                <div className="choose-service">
                  <div className="tab-button">
                    <span
                      className={`tab-btn ${tab === "1" ? "active" : ""}`}
                      onClick={() => setTab("1")}
                    >
                      ЕСБД
                    </span>
                    <span
                      className={`tab-btn ${tab === "2" ? "active" : ""}`}
                      onClick={() => setTab("2")}
                    >
                      БДКИ
                    </span>
                  </div>
                  <div className="d-grid ml-24">
                    <p className="small-text mb-0">
                      ЕСБД - Единая Страховая База Данных
                    </p>
                    <p className="small-text mb-0">
                      БДКИ - База Данных Кредитных Историй
                    </p>
                  </div>
                </div>

                <select
                  value={request.service}
                  onChange={(e) => (request.service = e.target.value)}
                  className="form-control-v mt-24"
                >
                  <option>Выберите сервис ЕСБД</option>
                  {request._getClientServiceType.map((c: ServiceCommon) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <div className="special-card">
                  <h3 className="title-subhead mb-16 mt-32">Документы</h3>
                  <p className="text-desc">
                    Пожалуйста прикрепите следующие документы организации
                  </p>
                  <div className="reg-file-add mb-32">
                    <ul>
                      <li>
                        <div className="name">
                          <span className="text">
                            Справка о регистрации/перерегистрации юридического
                            лица
                          </span>
                        </div>
                        <button className="btn-icon add">
                          <i className="azla size-18 pin-primary-icon mr-8"></i>
                          Прикрепить файл
                        </button>
                      </li>
                      <li>
                        <div className="name">
                          <span className="text">
                            Решение учредителя с данными о приеме на работу
                            первого руководителя
                          </span>
                        </div>
                        <button className="btn-icon add">
                          <i className="azla size-18 pin-primary-icon mr-8"></i>
                          Прикрепить файл
                        </button>
                      </li>
                      <li>
                        <div className="name">
                          <span className="text">
                            Приказ о приеме на работу первого руководителя
                          </span>
                        </div>
                        <button className="btn-icon add">
                          <i className="azla size-18 pin-primary-icon mr-8"></i>
                          Прикрепить файл
                        </button>
                      </li>
                      <li>
                        <div className="name">
                          <span className="text">
                            Документ, удостоверяющий личность первого
                            руководителя
                          </span>
                          {/* <span className="file-name">
                            spravka_o_registracii.pdf
                          </span> */}
                        </div>
                        <button className="btn-icon add">
                          <i className="azla size-18 pin-primary-icon mr-8"></i>
                          Прикрепить файл
                        </button>
                      </li>
                      <li>
                        <div className="name">
                          <span className="text">Устав юрического лица</span>
                        </div>
                        <button className="btn-icon add">
                          <i className="azla size-18 pin-primary-icon mr-8"></i>
                          Прикрепить файл
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* <div className="special-card">
                  <h3 className="title-subhead mb-16 mt-32">Документы</h3>
                  <p className="text-desc">
                    Пожалуйста прикрепите следующие документы организации
                  </p>
                  <div className="reg-file-add mb-32">
                    <ul>
                      {request
                        .getDocTypes()
                        .map((t: ServiceCommon, index: number) => (
                          <li>
                            <div className="name">
                              <span className="text">{t.name}</span>
                              {files[index] && (
                                <span className="file-name">
                                  {filesTitle[index]}
                                </span>
                              )}
                            </div>
                            {files[index] ? (
                              <button
                                className="btn-icon delete"
                                onClick={() => {
                                  setFiles(
                                    files.filter((f) => f !== files[index])
                                  );
                                  setFilesTitle(
                                    filesTitle.filter(
                                      (f) => f !== filesTitle[index]
                                    )
                                  );
                                }}
                              >
                                <i className="azla size-18 trash-icon-alert mr-8"></i>
                                Удалить файл
                              </button>
                            ) : (
                              <FileReaderInput
                                as="url"
                                accept="image/jpeg,image/png,image/gif,application/pdf"
                                onChange={(e, f) => handleChange(e, f, t.id)}
                              >
                                <button className="btn-icon add">
                                  <i className="azla size-18 pin-primary-icon mr-8"></i>
                                  Прикрепить файл
                                </button>
                              </FileReaderInput>
                            )}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div> */}

                <div className="create-page-docs">
                  <div className="d-flex-align-c-spaceb mb-32">
                    <div className="d-grid">
                      <h3 className="title-subhead mb-8">
                        Пользователи услуг{" "}
                        <span className="number">{main.usersNew.length}</span>
                      </h3>
                      <p>Пользователи организации с наличием ЭЦП организации</p>
                    </div>
                    <button
                      className="btn button btn-primary btn-icon"
                      onClick={() => {
                        main.setModal(true);
                        main.setModalType(10);
                      }}
                    >
                      <i className="azla add-plusRound-icon"></i> Добавить
                    </button>
                  </div>

                  {(main.usersNew as ClientUsers[]).map(
                    (u: ClientUsers, index) => (
                      <div className="card mb-24 pad-24">
                        <div className="card-header">
                          <div className="title">
                            <h6 className="text">{u.full_name}</h6>
                            <span className="num">№{index + 1}</span>
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
                                    <span className="right">{u.contacts}</span>
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
                </div>
              </div>
              <div className="req-inner-footer">
                <div className="container">
                  <div className="manager-req mrl-32">
                    <button
                      type="button"
                      className="button btn-primary"
                      disabled={
                        request.service === "" || main.usersNew.length === 0
                      }
                      onClick={() => {
                        main.setModal(true);
                        main.setModalType(13);
                        request.data = {
                          client: main.clientData.client.id,
                          service_category: tab,
                          service_type: request.service,
                          client_doc: [],
                          client_user: main.usersNew.map(
                            (u: ClientUser) => u.id
                          ),
                          request_status: 6,
                          request_stepper: 1,
                        };
                      }}
                    >
                      Отправить заявку
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default PartnersNew;
