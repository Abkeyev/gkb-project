import { observer } from 'mobx-react';
import React from 'react';
import { runInAction } from 'mobx';
import { ServiceCommon } from '../../api/Models/ServiceModels';
import moment from 'moment';
import { RegistrationFirstStepProps } from './RegistrationProps.props';

const RegistrationSecondStep = ({
  main,
  request,
  position,
  setPosition,
  otherPosition,
  setOtherPosition,
  signingAuth,
  setSigningAuth,
  otherSigningAuth,
  setOtherSigningAuth,
  regAuthPerson,
  file6,
  setFile6,
  file7,
  setFile7,
  deleteDoc,
  handleChange,
}: RegistrationFirstStepProps) => {
  return (
    <div className='row'>
      <div className='col-md-8 offset-md-2'>
        <h1 className='title-main mb-8'>Регистрация</h1>
        <div className='step-reg mb-24'>
          <span className='step'>Профиль пользователя</span>
        </div>
        <h3 className='title-subhead mb-16'>Данные пользователя</h3>
        <p className='text-desc'>
          Пожалуйста проверьте данные пользователя (уполномоченного лица)
        </p>
      </div>

      {main.clientData.client && main.clientData.auth_person && (
        <div className='col-md-6 offset-md-2'>
          <div className='special-card'>
            <div className='register-input'>
              <div className='form-group-v'>
                <label>Название организации:</label>
                <span>{main.clientData.client.name}</span>
              </div>
              <div className='form-group-v'>
                <label>ИИН:</label>
                <span>{main.clientData.client.bin}</span>
              </div>
              <div className='form-group-v'>
                <label>ФИО уполномоченого лица:</label>
                <span>{main.clientData.auth_person.full_name}</span>
              </div>
              <div className='form-group-v'>
                <label>Должность уполномоченого лица</label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className='form-control-v'
                >
                  <option>Выберите должность уполномоченого лица</option>
                  {request._getPosition.map((c: ServiceCommon) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                  <option key='9999' value='other'>
                    Свой вариант
                  </option>
                </select>
              </div>
              {position === 'other' && (
                <div className='form-group-v'>
                  <label></label>
                  <input
                    className='form-control-v'
                    type='text'
                    value={otherPosition}
                    onChange={(e) => setOtherPosition(e.target.value)}
                    placeholder='Введите свой вариант'
                  />
                </div>
              )}
              <div className='form-group-v'>
                <label>Основания для подписи</label>
                <select
                  value={signingAuth}
                  onChange={(e) => setSigningAuth(e.target.value)}
                  className='form-control-v'
                >
                  <option>Выберите основание для подписи</option>
                  {request._getSigningAuth.map((c: ServiceCommon) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              {signingAuth === '1' && (
                <div className='form-group-v'>
                  <label></label>
                  <textarea
                    className='form-control-v'
                    rows={3}
                    onChange={(e) => setOtherSigningAuth(e.target.value)}
                    placeholder='На основании устава'
                  >
                    {otherSigningAuth}
                  </textarea>
                </div>
              )}
              <div className='form-group-v'>
                <label>Дата регистрации в системе:</label>
                <span>
                  {moment(main.clientData.auth_person.reg_date).format(
                    'MM.DD.YYYY'
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='col-md-8 offset-md-2'>
        <div className='special-card'>
          <h3 className='title-subhead mb-16 mt-32'>Документы</h3>
          <p className='text-desc'>
            Пожалуйста прикрепите следующие документы организации
          </p>
          <div className='reg-file-add mb-32'>
            <ul>
              <li>
                <div className='name'>
                  <span className='text'>
                    Доверенность на подписанта, если подписантом выступает
                    данный пользователь
                  </span>
                  {file6 && (
                    <span className='file-name'>
                      {file6.name || file6.doc_name}
                    </span>
                  )}
                </div>
                {file6 ? (
                  <button
                    className='btn-icon delete'
                    onClick={() => {
                      file6 && file6.id && deleteDoc(file6);
                      setFile6(null);
                    }}
                  >
                    <i className='azla size-18 trash-icon-alert mr-8'></i>
                    Удалить файл
                  </button>
                ) : (
                  <label
                    // type="button"
                    className='btn-icon add'
                  >
                    <input
                      type='file'
                      onChange={(e) => handleChange(e, 2, 4, 6)}
                      style={{ display: 'none' }}
                    />
                    <i className='azla size-18 pin-primary-icon mr-8'></i>
                    Прикрепить файл
                  </label>
                )}
              </li>
              <li>
                <div className='name'>
                  <span className='text'>
                    Документ, удостоверяющий личность подписанта (данного
                    пользователя)
                  </span>
                  {file7 && (
                    <span className='file-name'>
                      {file7.name || file7.doc_name}
                    </span>
                  )}
                </div>
                {file7 ? (
                  <button
                    className='btn-icon delete'
                    onClick={() => {
                      file7 && file7.id && deleteDoc(file7);
                      setFile7(null);
                    }}
                  >
                    <i className='azla size-18 trash-icon-alert mr-8'></i>
                    Удалить файл
                  </button>
                ) : (
                  <label
                    // type="button"
                    className='btn-icon add'
                  >
                    <input
                      type='file'
                      onChange={(e) => handleChange(e, 8, 3, 7)}
                      style={{ display: 'none' }}
                    />
                    <i className='azla size-18 pin-primary-icon mr-8'></i>
                    Прикрепить файл
                  </label>
                )}
              </li>
            </ul>
          </div>
          <button
            className='button btn-primary table-mr'
            disabled={
              position === '' ||
              (position === 'other' && otherPosition === '') ||
              signingAuth === '' ||
              (signingAuth === '1' && otherSigningAuth === '')
            }
            onClick={() => {
              position === 'other'
                ? request
                    .addPosition({
                      name: otherPosition,
                    })
                    .then(() => runInAction(async () => await regAuthPerson()))
                : regAuthPerson();
            }}
          >
            Завершить регистрацию
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(RegistrationSecondStep);
