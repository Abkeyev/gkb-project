import React from "react";
import {
  AuthPerson,
  ClientUser,
  ClientUsers,
  Documents,
  ServiceCommon,
} from "../api/Models/ServiceModels";
import "react-tabs/style/react-tabs.css";
import { observer } from "mobx-react";
import FileReaderInput from "react-file-reader-input";
import { Modal } from "../containers";
import CardServiceUsers from "../components/partnersnew/CardServiceUsers";
import PartnersNewFooter from "../components/partnersnew/PartnersNewFooter";
import { ReactComponent as Spinner } from "../styles/spinner.svg";

const PartnersNew = observer((props: any) => {
  const { main, request } = props;
  const [tab, setTab] = React.useState("1");
  const [file1, setFile1] = React.useState<any | null>(null);
  const [file2, setFile2] = React.useState<any | null>(null);
  const [file3, setFile3] = React.useState<any | null>(null);
  const [file4, setFile4] = React.useState<any | null>(null);
  const [file5, setFile5] = React.useState<any | null>(null);
  const [filesId, setFilesId] = React.useState<number[] | []>([]);

  React.useEffect(() => {
    request.getRequests();
    request.getClientUsersForAdd(main.clientData.client.id);
    request.getSigners(main.clientData.client.id);
    request.getPosition();
    request.getDocuments(main.clientData.client.id).then((res: any) => {
      if (request._getDocuments.length > 0) {
        request.addedFiles = [];
        (request._getDocuments as Documents[])
          .filter((dd: Documents) => dd.doc_status === "Active")
          .map((d: Documents) => {
            if (d.doc_type === 3 && d.doc_category === 1) {
              setFile1(d);
              setFilesId([...filesId, d.id]);
            } else if (d.doc_type === 4 && d.doc_category === 1) {
              setFile2(d);
              setFilesId([...filesId, d.id]);
            } else if (d.doc_type === 5 && d.doc_category === 1) {
              setFile3(d);
              setFilesId([...filesId, d.id]);
            } else if (d.doc_type === 6 && d.doc_category === 2) {
              setFile4(d);
              setFilesId([...filesId, d.id]);
            } else if (d.doc_type === 2 && d.doc_category === 1) {
              setFile5(d);
              setFilesId([...filesId, d.id]);
            }
          });
      }
    });
    request.getClientServiceType();
    request.getPersonStatus();
  }, []);

  const handleChange = (
    e: any,
    results: any,
    doc_type: any,
    doc_category: any,
    index: number
  ) => {
    results.forEach((result: any) => {
      const [e, file] = result;
      const res = e.target.result.split(",");
      if (file.size < 5000000) {
        if (index === 1) setFile1(file);
        else if (index === 2) setFile2(file);
        else if (index === 3) setFile3(file);
        else if (index === 4) setFile4(file);
        else if (index === 5) setFile5(file);
        var bodyFormData = new FormData();
        bodyFormData.append("file", file);
        bodyFormData.append("service_type", request.service);
        bodyFormData.append("doc_category", doc_category);
        bodyFormData.append("comments", "");
        bodyFormData.append("version", "1");
        bodyFormData.append("doc_type", doc_type);
        bodyFormData.append("is_draft", "true");
        request.addDocument(main.clientData.client.id, bodyFormData, true);
      }
    });
  };

  return (
    <>
      {main.isOpenModal && <Modal main={main} request={request} />}
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
                    <option>
                      Выберите сервис {tab === "1" ? "ЕСБД" : "БДКИ"}
                    </option>
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
                    {request?.loader ? (
                      <Spinner />
                    ) : (
                      <div className="reg-file-add mb-32">
                        <ul>
                          <li>
                            <div className="name">
                              <span className="text">
                                Справка о регистрации/перерегистрации
                                юридического лица
                              </span>
                              {file1 && (
                                <span className="file-name">
                                  {file1.name || file1.doc_name}
                                </span>
                              )}
                            </div>
                            {file1 ? (
                              <button
                                className="btn-icon delete"
                                onClick={() => {
                                  setFile1(null);
                                }}
                              >
                                <i className="azla size-18 trash-icon-alert mr-8"></i>
                                Удалить файл
                              </button>
                            ) : (
                              <FileReaderInput
                                as="url"
                                accept="image/jpeg,image/png,image/gif,application/pdf"
                                onChange={(e, f) => handleChange(e, f, 3, 1, 1)}
                              >
                                <button className="btn-icon add">
                                  <i className="azla size-18 pin-primary-icon mr-8"></i>
                                  Прикрепить файл
                                </button>
                              </FileReaderInput>
                            )}
                          </li>
                          <li>
                            <div className="name">
                              <span className="text">
                                Решение учредителя с данными о приеме на работу
                                первого руководителя
                              </span>
                              {file2 && (
                                <span className="file-name">
                                  {file2.name || file2.doc_name}
                                </span>
                              )}
                            </div>
                            {file2 ? (
                              <button
                                className="btn-icon delete"
                                onClick={() => {
                                  setFile2(null);
                                }}
                              >
                                <i className="azla size-18 trash-icon-alert mr-8"></i>
                                Удалить файл
                              </button>
                            ) : (
                              <FileReaderInput
                                as="url"
                                accept="image/jpeg,image/png,image/gif,application/pdf"
                                onChange={(e, f) => handleChange(e, f, 4, 1, 2)}
                              >
                                <button className="btn-icon add">
                                  <i className="azla size-18 pin-primary-icon mr-8"></i>
                                  Прикрепить файл
                                </button>
                              </FileReaderInput>
                            )}
                          </li>
                          <li>
                            <div className="name">
                              <span className="text">
                                Приказ о приеме на работу первого руководителя
                              </span>
                              {file3 && (
                                <span className="file-name">
                                  {file3.name || file3.doc_name}
                                </span>
                              )}
                            </div>
                            {file3 ? (
                              <button
                                className="btn-icon delete"
                                onClick={() => {
                                  setFile3(null);
                                }}
                              >
                                <i className="azla size-18 trash-icon-alert mr-8"></i>
                                Удалить файл
                              </button>
                            ) : (
                              <FileReaderInput
                                as="url"
                                accept="image/jpeg,image/png,image/gif,application/pdf"
                                onChange={(e, f) => handleChange(e, f, 5, 1, 3)}
                              >
                                <button className="btn-icon add">
                                  <i className="azla size-18 pin-primary-icon mr-8"></i>
                                  Прикрепить файл
                                </button>
                              </FileReaderInput>
                            )}
                          </li>
                          <li>
                            <div className="name">
                              <span className="text">
                                Документ, удостоверяющий личность первого
                                руководителя
                              </span>
                              {file4 && (
                                <span className="file-name">
                                  {file4.name || file4.doc_name}
                                </span>
                              )}
                            </div>

                            {file4 ? (
                              <button
                                className="btn-icon delete"
                                onClick={() => {
                                  setFile4(null);
                                }}
                              >
                                <i className="azla size-18 trash-icon-alert mr-8"></i>
                                Удалить файл
                              </button>
                            ) : (
                              <FileReaderInput
                                as="url"
                                accept="image/jpeg,image/png,image/gif,application/pdf"
                                onChange={(e, f) => handleChange(e, f, 6, 2, 4)}
                              >
                                <button className="btn-icon add">
                                  <i className="azla size-18 pin-primary-icon mr-8"></i>
                                  Прикрепить файл
                                </button>
                              </FileReaderInput>
                            )}
                          </li>
                          <li>
                            <div className="name">
                              <span className="text">
                                Устав юрического лица
                              </span>
                              {file5 && (
                                <span className="file-name">
                                  {file5.name || file5.doc_name}
                                </span>
                              )}
                            </div>
                            {file5 ? (
                              <button
                                className="btn-icon delete"
                                onClick={() => {
                                  setFile5(null);
                                }}
                              >
                                <i className="azla size-18 trash-icon-alert mr-8"></i>
                                Удалить файл
                              </button>
                            ) : (
                              <FileReaderInput
                                as="url"
                                accept="image/jpeg,image/png,image/gif,application/pdf"
                                onChange={(e, f) => handleChange(e, f, 2, 1, 5)}
                              >
                                <button className="btn-icon add">
                                  <i className="azla size-18 pin-primary-icon mr-8"></i>
                                  Прикрепить файл
                                </button>
                              </FileReaderInput>
                            )}
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="create-page-docs">
                    <div className="d-flex-align-c-spaceb mb-32">
                      <div className="d-grid">
                        <h3 className="title-subhead mb-8">
                          Пользователи услуг{" "}
                          <span className="number">{main.usersNew.length}</span>
                        </h3>
                        <p>
                          Пользователи организации с наличием ЭЦП организации
                        </p>
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
                        <CardServiceUsers u={u} index={index} />
                      )
                    )}
                    <PartnersNewFooter
                      request={request}
                      main={main}
                      filesId={filesId}
                      tab={tab}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
export default PartnersNew;
