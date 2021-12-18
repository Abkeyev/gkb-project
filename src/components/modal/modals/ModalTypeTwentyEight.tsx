import React from "react";
import { ModalTypes } from "./ModalTypes.props";
import { ServiceCommon } from "../../../api/Models/ServiceModels";
import { observer } from "mobx-react";

const ModalTypeTwentyEight = ({ main, request }: ModalTypes) => {
  const [fullName, setFullName] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [phone, setPhone] = React.useState('');
  const [department, setDepartment] = React.useState('');
  const [firstRuk, setFirstRuk] = React.useState('');
  const [zam, setZam] = React.useState('');
  const [man, setMan] = React.useState('');
  const [manCon, setManCon] = React.useState('');
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

              {/* При нажатий на "Редактировать" текст заменяется на "Редактировать профиль" */}
              <h3 className="text-left title-subhead mb-32">
                Профиль пользователя услуг
              </h3>

              <div className='total-info mb-32'>
                <ul className='info-list'>
                  <li>
                    <span className='left'>ФИО:</span>
                    <span className='right'>ТекстЗамена</span>
                  </li>
                  <li>
                    <span className='left'>ID пользователя:</span>
                    <span className='right'>ТекстЗамена</span>
                  </li>
                  <li>
                    <span className='left'>ИИН сотрудника:</span>
                    <span className='right'>ТекстЗамена</span>
                  </li>
                  <li>
                    <span className='left'>Контактный номер:</span>
                    <span className='right'>ТекстЗамена</span>
                  </li>
                  <li>
                    <span className='left'>Email:</span>
                    <span className='right'>ТекстЗамена</span>
                  </li>
                  <li>
                    <span className='left'>Первый руководитель:</span>
                    <span className='right'>ТекстЗамена</span>
                  </li>
                  <li>
                    <span className='left'>Заместитель:</span>
                    <span className='right'>ТекстЗамена</span>
                  </li>
                  <li>
                    <span className='left'>Курирующий менеджер:</span>
                    <span className='right'>ТекстЗамена</span>
                  </li>
                  <li>
                    <span className='left'>Контакты менеджера:</span>
                    <span className='right'>ТекстЗамена</span>
                  </li>
                </ul>
              </div>
              <div className="profile-info">
                <button
                  type="button"
                  className="button btn-secondary"
                >
                  <i className="azla edit-primary-icon btn-icon"></i>
                  Редактировать
                </button>
              </div>


              {/* Отсюда все заменяется, все что нужно снизу */}
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
                  Отменить
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
