import React from "react";
import { ModalTypes } from "./ModalTypes.props";
import { ServiceCommon } from "../../../api/Models/ServiceModels";
import { observer } from "mobx-react";

const ModalTypeTwentyEight = ({ main, request }: ModalTypes) => {
  const [fullName, setFullName] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [email, setEmail] = React.useState("");
  return (
    <div className="modal modal-large">
      <div
        className="modal-backbg"
        onClick={() => {
          main.setModal(false);
          setFullName("");
          setPosition("");
          setEmail("");
        }}
      ></div>
      <div className="modal-dialog">
        <div className="modal-content fadeInModal animated">
          <div
            className="modal-close"
            onClick={() => {
              main.setModal(false);
              setFullName("");
              setPosition("");
              setEmail("");
            }}
          >
            <i className="azla close-icon"></i>
          </div>
          <div className="modal-body">
            <div className="write-reasons">
              <h3 className="text-left title-subhead mb-32">
                Добавить пользователя
              </h3>
              <div className="form-wrapper">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Введите ФИО"
                />
                <label>ФИО</label>
              </div>
              <div className="form-wrapper">
                <select
                  defaultValue={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="form-control"
                >
                  <option>Выберите должность</option>
                  {request._getPosition.map((c: ServiceCommon) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <label>Должность</label>
              </div>
              <div className="form-wrapper">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Введите почту"
                />
                <label>Email</label>
              </div>
              {/* <div className="form-wrapper">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Введите телефон"
                    />
                    <label>Телефон</label>
                  </div>
                  <div className="form-wrapper">
                    <input
                      type="text"
                      value={phoneType}
                      onChange={(e) => setPhoneType(e.target.value)}
                      placeholder="Введите тип телефона"
                    />
                    <label>Тип телефона</label>
                  </div>
                  <div className="form-check gkb-checkbox">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={check}
                      onChange={() => setCheck(!check)}
                      id="checkMeanNum"
                      required
                    />
                    <label className="form-check-label" htmlFor="checkMeanNum">
                      Основной номер
                    </label>
                  </div> */}
              <div className="d-flex mt-16">
                <button
                  type="button"
                  disabled={fullName === "" || email === "" || position === ""}
                  onClick={() => {
                    try {
                      request.addUser({
                        client: main.clientData.client.id,
                        full_name: fullName,
                        position: position,
                        email: email,
                      });
                      // request.addClientContact({
                      //   client: main.clientData.client.id,
                      //   client_auth_person: main.clientData.auth_person.id,
                      //   phone_number: phone,
                      //   phone_type: phoneType,
                      //   is_main: check,
                      // });
                    } finally {
                      main.setModal(false);
                    }
                  }}
                  className="button btn-primary mr-16"
                >
                  Сохранить
                </button>
                <button
                  type="button"
                  onClick={() => main.setModal(false)}
                  className="button btn-secondary"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(ModalTypeTwentyEight);
