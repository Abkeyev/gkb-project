import React from "react";
import { observer } from "mobx-react";
import "react-tabs/style/react-tabs.css";
import { Documents, ServiceCommon } from "../api/Models/ServiceModels";
import FileReaderInput from "react-file-reader-input";
import moment from "moment";
import { runInAction } from "mobx";

const Registration = observer((props: any) => {
  const { main, request } = props;
  const [step, setStep] = React.useState(0);
  const [address, setAddress] = React.useState("");
  const [iin, setIin] = React.useState("");
  const [segment, setSegment] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [signingAuth, setSigningAuth] = React.useState("");
  const [otherSegment, setOtherSegment] = React.useState("");
  const [otherPosition, setOtherPosition] = React.useState("");
  const [otherSigningAuth, setOtherSigningAuth] = React.useState("");
  const [file1, setFile1] = React.useState<any | null>(null);
  const [file2, setFile2] = React.useState<any | null>(null);
  const [file3, setFile3] = React.useState<any | null>(null);
  const [file4, setFile4] = React.useState<any | null>(null);
  const [file5, setFile5] = React.useState<any | null>(null);
  const [file6, setFile6] = React.useState<any | null>(null);
  const [file7, setFile7] = React.useState<any | null>(null);
  React.useEffect(() => {
    request.getClientTypes();
    request.getPosition();
    request.getSigningAuth();
    request.getDocuments(main.clientData.client.id).then((res: any) => {
      if (request._getDocuments.length > 0) {
        request.addedFiles = [];
        (request._getDocuments as Documents[])
          .filter((dd: Documents) => dd.doc_status === "Active")
          .map((d: Documents) => {
            if (d.doc_type === 4 && d.doc_category === 1) {
              setFile1(d);
            } else if (d.doc_type === 5 && d.doc_category === 1) {
              setFile2(d);
            } else if (d.doc_type === 6 && d.doc_category === 1) {
              setFile3(d);
            } else if (d.doc_type === 7 && d.doc_category === 1) {
              setFile4(d);
            } else if (d.doc_type === 1 && d.doc_category === 1) {
              setFile5(d);
            } else if (d.doc_type === 2 && d.doc_category === 4) {
              setFile6(d);
            } else if (d.doc_type === 8 && d.doc_category === 3) {
              setFile7(d);
            }
          });
      }
    });
    main.clientExist ? setStep(2) : setStep(0);
  }, []);

  const handleChange = (
    e: any,
    doc_type: any,
    doc_category: any,
    index: number
  ) => {
    e.preventDefault();
    const file = e && e.target && e.target.files && e.target.files[0];
    console.log(file);
    if (file && file.size < 5000000) {
      if (index === 1) setFile1(file);
      else if (index === 2) setFile2(file);
      else if (index === 3) setFile3(file);
      else if (index === 4) setFile4(file);
      else if (index === 5) setFile5(file);
      else if (index === 6) setFile6(file);
      else if (index === 7) setFile7(file);
      var bodyFormData = new FormData();
      bodyFormData.append("file", file);
      bodyFormData.append("service_type", "");
      bodyFormData.append("doc_category", doc_category);
      bodyFormData.append("comments", "");
      bodyFormData.append("version", "1");
      bodyFormData.append("doc_type", doc_type);
      bodyFormData.append("is_draft", "true");
      request.addDocument(main.clientData.client.id, bodyFormData);
    }
  };

  const deleteDoc = (file: any) => {
    const data = {
      ...file,
      doc_status: "Archive",
    };
    request.deleteDocument(main.clientData.client.id, data);
  };

  const regClient = () => {
    main
      .regClient(main.clientData.client.id, {
        name: main.clientData.client.name,
        longname: main.clientData.client.longname,
        website: address,
        bin: main.clientData.client.bin,
        client_type: request._getClientTypes.find(
          (t: any) => t.name === otherSegment
        )?.id,
        person_status: main.clientData.client.person_status,
      })
      .then(() => setStep(1));
  };

  const regAuthPerson = () => {
    main
      .regAuthPerson(main.clientData.auth_person.id, {
        full_name: main.clientData.auth_person.full_name,
        client: main.clientData.client.id,
        position:
          position === "other"
            ? request._getPosition.find((t: any) => t.name === otherPosition)
                ?.id
            : position,
        sign_auth: signingAuth,
        signing_authority_comment: signingAuth === "1" ? otherSigningAuth : "",
      })
      .then(() => main.finishReg());
  };

  return (
    <section className="register-page">
      <div className="container">
        <form>
          <div className="logo-image">
            <img src={process.env.PUBLIC_URL + "/logo-image.png"} alt="logo" />
          </div>
          {step === 0 ? (
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="back-breadcrumbs">
                  <div
                    onClick={() => main.decileReg(main.clientData.user.id)}
                    className="back"
                  >
                    <i className="azla arrow-left-icon"></i> Вернутся на главную
                  </div>
                </div>
                <h1 className="title-main mb-8">Регистрация</h1>
                <div className="step-reg mb-24">
                  <span className="step">Шаг 1 - Профиль организации</span>
                </div>
                <h3 className="title-subhead mb-16">Общие данные</h3>
                <p className="text-desc">
                  Пожалуйста добавьте недостающие данные об организации и
                  проверьте существующие
                </p>
              </div>

              {main.clientData.client && (
                <div className="col-md-6 offset-md-2">
                  <div className="special-card">
                    <div className="register-input">
                      <div className="form-group-v">
                        <label>Тип клиента:</label>
                        <span>
                          {
                            request._getClientTypes.find(
                              (t: any) =>
                                t.id === main.clientData.client.client_type
                            )?.name
                          }
                        </span>
                      </div>
                      <div className="form-group-v">
                        <label>Полное наименование:</label>
                        <span>{main.clientData.client.longname}</span>
                      </div>
                      <div className="form-group-v">
                        <label>Краткое наименование:</label>
                        <span>{main.clientData.client.name}</span>
                      </div>
                      <div className="form-group-v">
                        <label>БИН клиента:</label>
                        <span>{main.clientData.client.bin}</span>
                      </div>
                      <div className="form-group-v">
                        <label>Выберите сегмент организации:</label>
                        <select
                          value={segment}
                          onChange={(e) => setSegment(e.target.value)}
                          className="form-control-v"
                        >
                          <option key="0" value="">
                            Выберите сегмент
                          </option>
                          {request._getClientTypes.map((c: ServiceCommon) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                          <option key="9999" value="other">
                            Свой вариант
                          </option>
                        </select>
                      </div>
                      {segment === "other" && (
                        <div className="form-group-v">
                          <label></label>
                          <input
                            className="form-control-v"
                            type="text"
                            value={otherSegment}
                            onChange={(e) => setOtherSegment(e.target.value)}
                            placeholder="Введите свой вариант"
                          />
                        </div>
                      )}
                      <div className="form-group-v">
                        <label>Дата регистрации:</label>
                        <span>
                          {moment(main.clientData.client.reg_date).format(
                            "MM.DD.YYYY"
                          )}
                        </span>
                      </div>
                      <div className="form-group-v">
                        <label>Адрес сайта клиента:</label>
                        <input
                          className="form-control-v"
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Введите адрес сайта"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="col-md-8 offset-md-2">
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
                              file1 && file1.id && deleteDoc(file1);
                              setFile1(null);
                            }}
                          >
                            <i className="azla size-18 trash-icon-alert mr-8"></i>
                            Удалить файл
                          </button>
                        ) : (
                          <label
                            // type="button"
                            className="btn-icon add"
                          >
                            <input
                              type="file"
                              onChange={(e) => handleChange(e, 4, 1, 1)}
                              style={{ display: "none" }}
                            />
                            <i className="azla size-18 pin-primary-icon mr-8"></i>
                            Прикрепить файл
                          </label>
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
                              file2 && file2.id && deleteDoc(file2);
                              setFile2(null);
                            }}
                          >
                            <i className="azla size-18 trash-icon-alert mr-8"></i>
                            Удалить файл
                          </button>
                        ) : (
                          <label
                            // type="button"
                            className="btn-icon add"
                          >
                            <input
                              type="file"
                              onChange={(e) => handleChange(e, 5, 1, 2)}
                              style={{ display: "none" }}
                            />
                            <i className="azla size-18 pin-primary-icon mr-8"></i>
                            Прикрепить файл
                          </label>
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
                              file3 && file3.id && deleteDoc(file3);
                              setFile3(null);
                            }}
                          >
                            <i className="azla size-18 trash-icon-alert mr-8"></i>
                            Удалить файл
                          </button>
                        ) : (
                          <label
                            // type="button"
                            className="btn-icon add"
                          >
                            <input
                              type="file"
                              onChange={(e) => handleChange(e, 6, 1, 3)}
                              style={{ display: "none" }}
                            />
                            <i className="azla size-18 pin-primary-icon mr-8"></i>
                            Прикрепить файл
                          </label>
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
                              file4 && file4.id && deleteDoc(file4);
                              setFile4(null);
                            }}
                          >
                            <i className="azla size-18 trash-icon-alert mr-8"></i>
                            Удалить файл
                          </button>
                        ) : (
                          <label
                            // type="button"
                            className="btn-icon add"
                          >
                            <input
                              type="file"
                              onChange={(e) => handleChange(e, 7, 1, 4)}
                              style={{ display: "none" }}
                            />
                            <i className="azla size-18 pin-primary-icon mr-8"></i>
                            Прикрепить файл
                          </label>
                        )}
                      </li>
                      <li>
                        <div className="name">
                          <span className="text">Устав юрического лица</span>
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
                              file5 && file5.id && deleteDoc(file5);
                              setFile5(null);
                            }}
                          >
                            <i className="azla size-18 trash-icon-alert mr-8"></i>
                            Удалить файл
                          </button>
                        ) : (
                          <label
                            // type="button"
                            className="btn-icon add"
                          >
                            <input
                              type="file"
                              onChange={(e) => handleChange(e, 1, 1, 5)}
                              style={{ display: "none" }}
                            />
                            <i className="azla size-18 pin-primary-icon mr-8"></i>
                            Прикрепить файл
                          </label>
                        )}
                      </li>
                    </ul>
                  </div>
                  <button
                    className="button btn-primary table-mr w-160"
                    disabled={
                      segment === "" ||
                      address === "" ||
                      (segment === "other" && otherSegment === "")
                    }
                    onClick={() => {
                      segment === "other"
                        ? request.addClientTypes(
                            {
                              name: otherSegment,
                            },
                            regClient
                          )
                        : regClient();
                    }}
                  >
                    Далее
                  </button>
                </div>
              </div>
            </div>
          ) : step === 1 ? (
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <h1 className="title-main mb-8">Регистрация</h1>
                <div className="step-reg mb-24">
                  <div className="back-breadcrumbs">
                    <span className="back" onClick={() => setStep(0)}>
                      <i className="azla arrow-left-icon"></i> Назад
                    </span>
                  </div>
                  <span className="step">Шаг 2 - Профиль пользователя</span>
                </div>
                <h3 className="title-subhead mb-16">Данные пользователя</h3>
                <p className="text-desc">
                  Пожалуйста проверьте данные пользователя (уполномоченного
                  лица)
                </p>
              </div>

              {main.clientData.client && main.clientData.auth_person && (
                <div className="col-md-6 offset-md-2">
                  <div className="special-card">
                    <div className="register-input">
                      <div className="form-group-v">
                        <label>Название организации:</label>
                        <span>{main.clientData.client.name}</span>
                      </div>
                      <div className="form-group-v">
                        <label>ИИН:</label>
                        <span>{main.clientData.client.bin}</span>
                      </div>
                      <div className="form-group-v">
                        <label>ФИО уполномоченого лица:</label>
                        <span>{main.clientData.auth_person.full_name}</span>
                      </div>
                      <div className="form-group-v">
                        <label>Должность уполномоченого лица</label>
                        <select
                          value={position}
                          onChange={(e) => setPosition(e.target.value)}
                          className="form-control-v"
                        >
                          <option>
                            Выберите должность уполномоченого лица
                          </option>
                          {request._getPosition.map((c: ServiceCommon) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                          <option key="9999" value="other">
                            Свой вариант
                          </option>
                        </select>
                      </div>
                      {position === "other" && (
                        <div className="form-group-v">
                          <label></label>
                          <input
                            className="form-control-v"
                            type="text"
                            value={otherPosition}
                            onChange={(e) => setOtherPosition(e.target.value)}
                            placeholder="Введите свой вариант"
                          />
                        </div>
                      )}
                      <div className="form-group-v">
                        <label>Основания для подписи</label>
                        <select
                          value={signingAuth}
                          onChange={(e) => setSigningAuth(e.target.value)}
                          className="form-control-v"
                        >
                          <option>Выберите основание для подписи</option>
                          {request._getSigningAuth.map((c: ServiceCommon) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {signingAuth === "1" && (
                        <div className="form-group-v">
                          <label></label>
                          <textarea
                            className="form-control-v"
                            rows={3}
                            onChange={(e) =>
                              setOtherSigningAuth(e.target.value)
                            }
                            placeholder="На основании устава"
                          >
                            {otherSigningAuth}
                          </textarea>
                        </div>
                      )}
                      <div className="form-group-v">
                        <label>Дата регистрации в системе:</label>
                        <span>
                          {moment(main.clientData.auth_person.reg_date).format(
                            "MM.DD.YYYY"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="col-md-8 offset-md-2">
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
                            Доверенность на подписанта, если подписантом
                            выступает данный пользователь
                          </span>
                          {file6 && (
                            <span className="file-name">
                              {file6.name || file6.doc_name}
                            </span>
                          )}
                        </div>
                        {file6 ? (
                          <button
                            className="btn-icon delete"
                            onClick={() => {
                              file6 && file6.id && deleteDoc(file6);
                              setFile6(null);
                            }}
                          >
                            <i className="azla size-18 trash-icon-alert mr-8"></i>
                            Удалить файл
                          </button>
                        ) : (
                          <label
                            // type="button"
                            className="btn-icon add"
                          >
                            <input
                              type="file"
                              onChange={(e) => handleChange(e, 2, 4, 6)}
                              style={{ display: "none" }}
                            />
                            <i className="azla size-18 pin-primary-icon mr-8"></i>
                            Прикрепить файл
                          </label>
                        )}
                      </li>
                      <li>
                        <div className="name">
                          <span className="text">
                            Документ, удостоверяющий личность подписанта
                            (данного пользователя)
                          </span>
                          {file7 && (
                            <span className="file-name">
                              {file7.name || file7.doc_name}
                            </span>
                          )}
                        </div>
                        {file7 ? (
                          <button
                            className="btn-icon delete"
                            onClick={() => {
                              file7 && file7.id && deleteDoc(file7);
                              setFile7(null);
                            }}
                          >
                            <i className="azla size-18 trash-icon-alert mr-8"></i>
                            Удалить файл
                          </button>
                        ) : (
                          <label
                            // type="button"
                            className="btn-icon add"
                          >
                            <input
                              type="file"
                              onChange={(e) => handleChange(e, 8, 3, 7)}
                              style={{ display: "none" }}
                            />
                            <i className="azla size-18 pin-primary-icon mr-8"></i>
                            Прикрепить файл
                          </label>
                        )}
                      </li>
                    </ul>
                  </div>
                  <button
                    className="button btn-primary table-mr"
                    disabled={
                      position === "" ||
                      (position === "other" && otherPosition === "") ||
                      signingAuth === "" ||
                      (signingAuth === "1" && otherSigningAuth === "")
                    }
                    onClick={() => {
                      position === "other"
                        ? request.addPosition(
                            {
                              name: otherPosition,
                            },
                            regAuthPerson
                          )
                        : regAuthPerson();
                    }}
                  >
                    Завершить регистрацию
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <h1 className="title-main mb-8">Регистрация</h1>
                <div className="step-reg mb-24">
                  <span className="step">Профиль пользователя</span>
                </div>
                <h3 className="title-subhead mb-16">Данные пользователя</h3>
                <p className="text-desc">
                  Пожалуйста проверьте данные пользователя (уполномоченного
                  лица)
                </p>
              </div>

              {main.clientData.client && main.clientData.auth_person && (
                <div className="col-md-6 offset-md-2">
                  <div className="special-card">
                    <div className="register-input">
                      <div className="form-group-v">
                        <label>Название организации:</label>
                        <span>{main.clientData.client.name}</span>
                      </div>
                      <div className="form-group-v">
                        <label>ИИН:</label>
                        <span>{main.clientData.client.bin}</span>
                      </div>
                      <div className="form-group-v">
                        <label>ФИО уполномоченого лица:</label>
                        <span>{main.clientData.auth_person.full_name}</span>
                      </div>
                      <div className="form-group-v">
                        <label>Должность уполномоченого лица</label>
                        <select
                          value={position}
                          onChange={(e) => setPosition(e.target.value)}
                          className="form-control-v"
                        >
                          <option>
                            Выберите должность уполномоченого лица
                          </option>
                          {request._getPosition.map((c: ServiceCommon) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                          <option key="9999" value="other">
                            Свой вариант
                          </option>
                        </select>
                      </div>
                      {position === "other" && (
                        <div className="form-group-v">
                          <label></label>
                          <input
                            className="form-control-v"
                            type="text"
                            value={otherPosition}
                            onChange={(e) => setOtherPosition(e.target.value)}
                            placeholder="Введите свой вариант"
                          />
                        </div>
                      )}
                      <div className="form-group-v">
                        <label>Основания для подписи</label>
                        <select
                          value={signingAuth}
                          onChange={(e) => setSigningAuth(e.target.value)}
                          className="form-control-v"
                        >
                          <option>Выберите основание для подписи</option>
                          {request._getSigningAuth.map((c: ServiceCommon) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {signingAuth === "1" && (
                        <div className="form-group-v">
                          <label></label>
                          <textarea
                            className="form-control-v"
                            rows={3}
                            onChange={(e) =>
                              setOtherSigningAuth(e.target.value)
                            }
                            placeholder="На основании устава"
                          >
                            {otherSigningAuth}
                          </textarea>
                        </div>
                      )}
                      <div className="form-group-v">
                        <label>Дата регистрации в системе:</label>
                        <span>
                          {moment(main.clientData.auth_person.reg_date).format(
                            "MM.DD.YYYY"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="col-md-8 offset-md-2">
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
                            Доверенность на подписанта, если подписантом
                            выступает данный пользователь
                          </span>
                          {file6 && (
                            <span className="file-name">
                              {file6.name || file6.doc_name}
                            </span>
                          )}
                        </div>
                        {file6 ? (
                          <button
                            className="btn-icon delete"
                            onClick={() => {
                              file6 && file6.id && deleteDoc(file6);
                              setFile6(null);
                            }}
                          >
                            <i className="azla size-18 trash-icon-alert mr-8"></i>
                            Удалить файл
                          </button>
                        ) : (
                          <label
                            // type="button"
                            className="btn-icon add"
                          >
                            <input
                              type="file"
                              onChange={(e) => handleChange(e, 2, 4, 6)}
                              style={{ display: "none" }}
                            />
                            <i className="azla size-18 pin-primary-icon mr-8"></i>
                            Прикрепить файл
                          </label>
                        )}
                      </li>
                      <li>
                        <div className="name">
                          <span className="text">
                            Документ, удостоверяющий личность подписанта
                            (данного пользователя)
                          </span>
                          {file7 && (
                            <span className="file-name">
                              {file7.name || file7.doc_name}
                            </span>
                          )}
                        </div>
                        {file7 ? (
                          <button
                            className="btn-icon delete"
                            onClick={() => {
                              file7 && file7.id && deleteDoc(file7);
                              setFile7(null);
                            }}
                          >
                            <i className="azla size-18 trash-icon-alert mr-8"></i>
                            Удалить файл
                          </button>
                        ) : (
                          <label
                            // type="button"
                            className="btn-icon add"
                          >
                            <input
                              type="file"
                              onChange={(e) => handleChange(e, 8, 3, 7)}
                              style={{ display: "none" }}
                            />
                            <i className="azla size-18 pin-primary-icon mr-8"></i>
                            Прикрепить файл
                          </label>
                        )}
                      </li>
                    </ul>
                  </div>
                  <button
                    className="button btn-primary table-mr"
                    disabled={
                      position === "" ||
                      (position === "other" && otherPosition === "") ||
                      signingAuth === "" ||
                      (signingAuth === "1" && otherSigningAuth === "")
                    }
                    onClick={() => {
                      position === "other"
                        ? request
                            .addPosition({
                              name: otherPosition,
                            })
                            .then(() =>
                              runInAction(async () => await regAuthPerson())
                            )
                        : regAuthPerson();
                    }}
                  >
                    Завершить регистрацию
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
});
export default Registration;
