import React from 'react';
import { ModalTypes } from './ModalTypes.props';
import { ServiceCommon } from '../../../api/Models/ServiceModels';

const ModalTypeTwenty = ({ main, request }: ModalTypes) => {
  const [fullName, setFullName] = React.useState('');
  const [position, setPosition] = React.useState('');
  const [email, setEmail] = React.useState('');
  return (
    <div className='modal modal-large'>
      <div
        className='modal-backbg'
        onClick={() => {
          main.setModal(false);
          setFullName('');
          setPosition('');
          setEmail('');
        }}
      ></div>
      <div className='modal-dialog'>
        <div className='modal-content fadeInModal animated'>
          <div
            className='modal-close'
            onClick={() => {
              main.setModal(false);
              setFullName('');
              setPosition('');
              setEmail('');
            }}
          >
            <i className='azla close-icon'></i>
          </div>
          <div className='modal-body'>
            <div className='write-reasons'>
              <h3 className='text-left title-subhead mb-32'>
                Редактировать данные
              </h3>
              <div className='form-wrapper'>
                <input
                  type='text'
                  defaultValue={
                    fullName !== '' ? fullName : main.modalTypeData?.full_name
                  }
                  onChange={(e) => setFullName(e.target.value)}
                />
                <label>ФИО</label>
              </div>
              <div className='form-wrapper'>
                <select
                  defaultValue={
                    position !== '' ? position : main.modalTypeData?.position
                  }
                  onChange={(e) => setPosition(e.target.value)}
                  className='form-control'
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
              <div className='form-wrapper'>
                <input
                  type='text'
                  defaultValue={
                    email !== '' ? email : main.modalTypeData?.email
                  }
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Email</label>
              </div>
              {/* <div className="form-wrapper">
                    <input
                      type="text"
                      defaultValue={phone !== "" ? phone : main.modalTypeData?.phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <label>Телефон</label>
                  </div> */}
              {/* <div className="form-check gkb-checkbox">
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
              <div className='d-flex mt-16'>
                <button
                  type='button'
                  onClick={() => {
                    request
                      .editUser(main.modalTypeData?.id, {
                        client_id: main.clientData.client.id,
                        full_name:
                          fullName !== ''
                            ? fullName
                            : main.modalTypeData?.full_name,
                        position:
                          position !== ''
                            ? position
                            : main.modalTypeData?.position,
                        email: email !== '' ? email : main.modalTypeData?.email,
                      })
                      .then(() => {
                        main.setModal(false);
                        setFullName('');
                        setPosition('');
                        setEmail('');
                      });
                  }}
                  className='button btn-primary mr-16'
                >
                  Сохранить
                </button>
                <button
                  type='button'
                  onClick={() => {
                    request
                      .editUser(main.modalTypeData?.id, {
                        ...main.modalTypeData,
                        client_id: main.clientData.client.id,
                        person_status: 2,
                      })
                      .then(() => {
                        main.setModal(false);
                        setFullName('');
                        setPosition('');
                        setEmail('');
                      });
                  }}
                  className='button btn-danger'
                >
                  Удалить пользователя
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTypeTwenty;
