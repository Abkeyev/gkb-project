import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import "react-tabs/style/react-tabs.css";
import { ServiceCommon } from "../api/Models/ServiceModels";
import FileReaderInput from "react-file-reader-input";
import moment from "moment";

const Registration = observer((props: any) => {
  const { main, request } = props;
  const [step, setStep] = React.useState(3);
  const [address, setAddress] = React.useState("");
  const [iin, setIin] = React.useState("");
  const [segment, setSegment] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [signingAuth, setSigningAuth] = React.useState("");
  const [otherSegment, setOtherSegment] = React.useState("");
  const [otherPosition, setOtherPosition] = React.useState("");
  const [otherSigningAuth, setOtherSigningAuth] = React.useState("");
  const [file1, setFile1] = React.useState("");
  const [file1title, setFile1title] = React.useState("");
  const [file2, setFile2] = React.useState("");
  const [file2title, setFile2title] = React.useState("");
  const [file3, setFile3] = React.useState("");
  const [file3title, setFile3title] = React.useState("");
  const [file4, setFile4] = React.useState("");
  const [file4title, setFile4title] = React.useState("");
  const [file5, setFile5] = React.useState("");
  const [file5title, setFile5title] = React.useState("");
  React.useEffect(() => {
    request.getClientTypes();
    request.getPosition();
    request.getSigningAuth();
    main.clientExist ? setStep(2) : setStep(0);
  }, []);

  const handleChange1 = (e: any, results: any) => {
    results.forEach((result: any) => {
      const [e, file] = result;
      const res = e.target.result.split(",");
      if (file.size < 5000000) {
        setFile1(res[1]);
        setFile1title(file.name);
      }
    });
  };

  const handleChange2 = (e: any, results: any) => {
    results.forEach((result: any) => {
      const [e, file] = result;
      const res = e.target.result.split(",");
      if (file.size < 5000000) {
        setFile2(res[1]);
        setFile2title(file.name);
      }
    });
  };

  const handleChange3 = (e: any, results: any) => {
    results.forEach((result: any) => {
      const [e, file] = result;
      const res = e.target.result.split(",");
      if (file.size < 5000000) {
        setFile3(res[1]);
        setFile3title(file.name);
      }
    });
  };

  const handleChange4 = (e: any, results: any) => {
    results.forEach((result: any) => {
      const [e, file] = result;
      const res = e.target.result.split(",");
      if (file.size < 5000000) {
        setFile4(res[1]);
        setFile4title(file.name);
      }
    });
  };

  const handleChange5 = (e: any, results: any) => {
    results.forEach((result: any) => {
      const [e, file] = result;
      const res = e.target.result.split(",");
      if (file.size < 5000000) {
        setFile5(res[1]);
        setFile5title(file.name);
      }
    });
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
                            <span className="file-name">{file1title}</span>
                          )}
                        </div>
                        {file1 ? (
                          <button
                            className="btn-icon delete"
                            onClick={() => {
                              setFile1("");
                              setFile1title("");
                            }}
                          >
                            <i className="azla size-18 trash-icon-alert mr-8"></i>
                            Удалить файл
                          </button>
                        ) : (
                          <FileReaderInput
                            as="url"
                            accept="image/jpeg,image/png,image/gif,application/pdf"
                            onChange={handleChange1}
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
                            <span className="file-name">{file2title}</span>
                          )}
                        </div>
                        {file2 ? (
                          <button
                            className="btn-icon delete"
                            onClick={() => {
                              setFile2("");
                              setFile2title("");
                            }}
                          >
                            <i className="azla size-18 trash-icon-alert mr-8"></i>
                            Удалить файл
                          </button>
                        ) : (
                          <FileReaderInput
                            as="url"
                            accept="image/jpeg,image/png,image/gif,application/pdf"
                            onChange={handleChange2}
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
                            <span className="file-name">{file3title}</span>
                          )}
                        </div>
                        {file3 ? (
                          <button
                            className="btn-icon delete"
                            onClick={() => {
                              setFile3("");
                              setFile3title("");
                            }}
                          >
                            <i className="azla size-18 trash-icon-alert mr-8"></i>
                            Удалить файл
                          </button>
                        ) : (
                          <FileReaderInput
                            as="url"
                            accept="image/jpeg,image/png,image/gif,application/pdf"
                            onChange={handleChange3}
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
                            <span className="file-name">{file4title}</span>
                          )}
                        </div>
                        {file4 ? (
                          <button
                            className="btn-icon delete"
                            onClick={() => {
                              setFile4("");
                              setFile4title("");
                            }}
                          >
                            <i className="azla size-18 trash-icon-alert mr-8"></i>
                            Удалить файл
                          </button>
                        ) : (
                          <FileReaderInput
                            as="url"
                            accept="image/jpeg,image/png,image/gif,application/pdf"
                            onChange={handleChange4}
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
                          <span className="text">Устав юрического лица</span>
                          {file5 && (
                            <span className="file-name">{file5title}</span>
                          )}
                        </div>
                        {file5 ? (
                          <button
                            className="btn-icon delete"
                            onClick={() => {
                              setFile5("");
                              setFile5title("");
                            }}
                          >
                            <i className="azla size-18 trash-icon-alert mr-8"></i>
                            Удалить файл
                          </button>
                        ) : (
                          <FileReaderInput
                            as="url"
                            accept="image/jpeg,image/png,image/gif,application/pdf"
                            onChange={handleChange5}
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
                  <button
                    className="button btn-primary table-mr w-160"
                    disabled={
                      segment === "" ||
                      (segment === "other" && otherSegment === "")
                    }
                    onClick={() =>
                      main
                        .regClient(main.clientData.client.id, {
                          name: main.clientData.client.name,
                          longname: main.clientData.client.longname,
                          website: main.clientData.client.website,
                          bin: main.clientData.client.bin,
                          client_type:
                            segment === "other" ? otherSegment : segment,
                          person_status: main.clientData.client.person_status,
                        })
                        .then(() => setStep(1))
                    }
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
                        <input
                          className="form-control-v"
                          type="text"
                          value={iin}
                          onChange={(e) => setIin(e.target.value)}
                          placeholder="Введите ИИН"
                        />
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
                      <button
                        className="button btn-primary table-mr"
                        disabled={
                          position === "" ||
                          (position === "other" && otherPosition === "") ||
                          iin.length < 12 ||
                          signingAuth === "" ||
                          (signingAuth === "1" && otherSigningAuth === "")
                        }
                        onClick={() =>
                          main
                            .regAuthPerson(main.clientData.auth_person.id, {
                              is_ecp: main.clientData.auth_person.is_ecp,
                              client: main.clientData.auth_person.client,
                              position:
                                position === "other" ? otherPosition : position,
                              sign_auth: main.clientData.auth_person.sign_auth,
                              person_status:
                                main.clientData.auth_person.person_status,
                              full_name: main.clientData.auth_person.full_name,
                            })
                            .then(() => main.finishReg())
                        }
                      >
                        Завершить регистрацию
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
                        <input
                          className="form-control-v"
                          type="text"
                          value={iin}
                          onChange={(e) => setIin(e.target.value)}
                          placeholder="Введите ИИН"
                        />
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
                      <button
                        className="button btn-primary table-mr"
                        disabled={
                          position === "" ||
                          (position === "other" && otherPosition === "") ||
                          iin.length < 12 ||
                          signingAuth === "" ||
                          (signingAuth === "1" && otherSigningAuth === "")
                        }
                        onClick={() =>
                          main
                            .regAuthPerson(main.clientData.client.id, {
                              full_name: main.clientData.auth_person.name,
                              is_ecp: main.clientData.auth_person.is_ecp,
                              client: main.clientData.auth_person.client,
                              position:
                                position === "other" ? otherPosition : position,
                              sign_auth: signingAuth,
                              signing_authority_comment:
                                signingAuth === "1" ? otherSigningAuth : "",
                              person_status:
                                main.clientData.auth_person.person_status,
                              iin: iin,
                            })
                            .then(() => main.finishReg())
                        }
                      >
                        Завершить регистрацию
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </section>
  );
});
export default Registration;
