import React from "react";
import { ModalTypes } from "./ModalTypes.props";
import { ServiceCommon } from "../../../api/Models/ServiceModels";
import { observer } from "mobx-react";

const ModalTypeTwentyEight = ({ main, request }: ModalTypes) => {
  const [fullName, setFullName] = React.useState(main.modalTypeData?.full_name);
  const [position, setPosition] = React.useState(
    main.modalTypeData?.position_name
  );
  const [phone, setPhone] = React.useState(main.modalTypeData?.contacts);
  const [department, setDepartment] = React.useState(
    main.modalTypeData?.department_name
  );
  const [firstRuk, setFirstRuk] = React.useState(
    main.modalTypeData?.first_head_full_name
  );
  const [zam, setZam] = React.useState(
    main.modalTypeData?.deputy_head_full_name
  );
  const [man, setMan] = React.useState(main.modalTypeData?.manager_full_name);
  const [manCon, setManCon] = React.useState(
    main.modalTypeData?.manager_contacts
  );
  const [email, setEmail] = React.useState(main.modalTypeData?.email);
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
                {main.modalTypeEdit === 0
                  ? "Профиль пользователя услуг"
                  : "Редактировать профиль"}
              </h3>
              {main.modalTypeEdit === 0 ? (
                <>
                  <div className="total-info mb-32">
                    <ul className="info-list">
                      <li>
                        <span className="left">ФИО:</span>
                        <span className="right">
                          {main.modalTypeData?.full_name}
                        </span>
                      </li>
                      <li>
                        <span className="left">ID пользователя:</span>
                        <span className="right">{main.modalTypeData?.id}</span>
                      </li>
                      <li>
                        <span className="left">ИИН сотрудника:</span>
                        <span className="right">{main.modalTypeData?.iin}</span>
                      </li>
                      <li>
                        <span className="left">Контактный номер:</span>
                        <span className="right">
                          {main.modalTypeData?.contacts}
                        </span>
                      </li>
                      <li>
                        <span className="left">Email:</span>
                        <span className="right">
                          {main.modalTypeData?.email}
                        </span>
                      </li>
                      <li>
                        <span className="left">Первый руководитель:</span>
                        <span className="right">
                          {main.modalTypeData?.first_head_full_name}
                        </span>
                      </li>
                      <li>
                        <span className="left">Заместитель:</span>
                        <span className="right">
                          {main.modalTypeData?.deputy_head_full_name}
                        </span>
                      </li>
                      <li>
                        <span className="left">Курирующий менеджер:</span>
                        <span className="right">
                          {main.modalTypeData?.manager_full_name}
                        </span>
                      </li>
                      <li>
                        <span className="left">Контакты менеджера:</span>
                        <span className="right">
                          {main.modalTypeData?.manager_contacts}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="profile-info">
                    <button
                      type="button"
                      className="button btn-secondary"
                      onClick={() => main.setModalTypeEdit(1)}
                    >
                      <i className="azla edit-primary-icon btn-icon"></i>
                      Редактировать
                    </button>
                  </div>
                </>
              ) : (
                <>
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
                      defaultValue={main.modalTypeData?.full_name}
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      className="form-control azla form-icon chevron-down-icon"
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
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="Введите департамент"
                    />
                    <label>Департамент</label>
                  </div>

                  <div className="form-wrapper">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+7 (_ _ _) _ _ _ _ - _ _ - _ _"
                    />
                    <label>Телефон</label>
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

                  <div className="form-wrapper">
                    <input
                      type="text"
                      value={firstRuk}
                      onChange={(e) => setFirstRuk(e.target.value)}
                      placeholder="Первый руководитель"
                    />
                    <label>Первый руководитель</label>
                  </div>

                  <div className="form-wrapper">
                    <input
                      type="text"
                      value={zam}
                      onChange={(e) => setZam(e.target.value)}
                      placeholder="Заместитель"
                    />
                    <label>Заместитель</label>
                  </div>

                  <div className="form-wrapper">
                    <input
                      type="text"
                      value={man}
                      onChange={(e) => setMan(e.target.value)}
                      placeholder="Курирующий менеджер"
                    />
                    <label>Курирующий менеджер</label>
                  </div>

                  <div className="form-wrapper">
                    <input
                      type="text"
                      value={manCon}
                      onChange={(e) => setManCon(e.target.value)}
                      placeholder="Контакты менеджера"
                    />
                    <label>Контакты менеджера</label>
                  </div>
                  <div className="d-flex mt-16">
                    <button
                      type="button"
                      disabled={
                        fullName === "" || email === "" || position === ""
                      }
                      onClick={() => {
                        try {
                          request.editClientUser(main.modalTypeData?.id, {
                            client: main.modalTypeData?.client.id,
                            first_head_full_name: firstRuk,
                            deputy_head_full_name: zam,
                            manager_full_name: man,
                            manager_contacts: manCon,
                            full_name: fullName,
                            position_name: position,
                            department_name: department,
                            contacts: phone,
                            email: email,
                            global_ip: main.modalTypeData?.global_ip,
                            iin: main.modalTypeData?.iin,
                            idcard_number: main.modalTypeData?.idcard_number,
                          });
                        } finally {
                          setFirstRuk("");
                          setZam("");
                          setMan("");
                          setManCon("");
                          setFullName("");
                          setPosition("");
                          setDepartment("");
                          setPhone("");
                          setEmail("");
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
                      Отменить
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(ModalTypeTwentyEight);
