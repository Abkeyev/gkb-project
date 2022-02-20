import React from "react";
import { observer } from "mobx-react";
import { RegistrationProps } from "./RegistrationProps.props";
import moment from "moment";
import { ServiceCommon } from "../../api/Models/ServiceModels";

const RegistrationZeroStep = ({
  main,
  request,
  setStep,
  handleChange,
  deleteDoc,
  file1,
  file2,
  file3,
  file4,
  file5,
  setFile1,
  setFile2,
  setFile3,
  setFile4,
  setFile5,
}: RegistrationProps) => {
  const [segment, setSegment] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [otherSegment, setOtherSegment] = React.useState("");

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

  return (
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
          Пожалуйста добавьте недостающие данные об организации и проверьте
          существующие
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
                      (t: any) => t.id === main.clientData.client.client_type
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
                  {moment(main.clientData.client.reg_date).format("MM.DD.YYYY")}
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
                    Справка о регистрации/перерегистрации юридического лица
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
                      onChange={(e) => handleChange(e, 3, 1, 1)}
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
                    Решение учредителя с данными о приеме на работу первого
                    руководителя
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
                      onChange={(e) => handleChange(e, 4, 1, 2)}
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
                      onChange={(e) => handleChange(e, 5, 1, 3)}
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
                    Документ, удостоверяющий личность первого руководителя
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
                      onChange={(e) => handleChange(e, 6, 2, 4)}
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
                      onChange={(e) => handleChange(e, 2, 1, 5)}
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
  );
};

export default observer(RegistrationZeroStep);
