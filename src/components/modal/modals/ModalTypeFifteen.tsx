import React from 'react';
import { ModalTypes } from './ModalTypes.props';
import BaseModal from '../BaseModal';
import { ServiceCommon } from '../../../api/Models/ServiceModels';

const ModalTypeFifteen = ({ main, request }: ModalTypes) => {
  const [email, setEmail] = React.useState('');
  const [position, setPosition] = React.useState('');
  const [iik, setIik] = React.useState('');
  const [bik, setBik] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [phoneType, setPhoneType] = React.useState('');
  const [fullName, setFullName] = React.useState('');

  return (
    <BaseModal main={main}>
      <div className='modal-body'>
        <div className='paper-signatory'>
          <h3 className='text-left title-subhead mb-16'>
            Редактирование данных
          </h3>
        </div>
        {main.modalTypeEdit === 0 ? (
          <div className='form-wrapper'>
            <input
              type='email'
              defaultValue={request._getUser?.email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label>E-mail</label>
          </div>
        ) : main.modalTypeEdit === 1 ? (
          <div className='form-wrapper'>
            <select
              defaultValue={request._getUser.position}
              onChange={(e) => setPosition(e.target.value)}
              className='form-control-v'
            >
              <option>Выберите должность</option>
              {request._getPosition.map((c: ServiceCommon) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        ) : main.modalTypeEdit === 2 ? (
          <>
            <div className='form-wrapper'>
              <input
                type='text'
                defaultValue={main.modalTypeData?.phone_number}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              <label>Номер телефона</label>
            </div>
            <div className='form-wrapper mt-16'>
              <input
                type='text'
                defaultValue={main.modalTypeData?.phone_type}
                onChange={(e) => {
                  setPhoneType(e.target.value);
                }}
              />
              <label>Тип телефона</label>
            </div>
          </>
        ) : main.modalTypeEdit === 3 ? (
          <div className='form-wrapper'>
            <input
              type='text'
              defaultValue={main.modalTypeData?.full_address}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
            <label>Адрес</label>
          </div>
        ) : main.modalTypeEdit === 4 ? (
          <>
            <div className='form-wrapper'>
              <input
                type='text'
                defaultValue={main.modalTypeData?.iik}
                onChange={(e) => {
                  setIik(e.target.value);
                }}
              />
              <label>ИИК</label>
            </div>
            <div className='form-wrapper mt-16'>
              <input
                type='text'
                defaultValue={main.modalTypeData?.bik}
                onChange={(e) => {
                  setBik(e.target.value);
                }}
              />
              <label>БИК</label>
            </div>
          </>
        ) : (
          ''
        )}
      </div>
      <div className='modal-footer'>
        <div className='d-flex'>
          <button
            type='button'
            className='button btn-secondary mr-16'
            onClick={() => main.setModal(false)}
          >
            Отмена
          </button>
          <button
            type='button'
            className='button btn-primary'
            onClick={(e) => {
              e.preventDefault();
              let data =
                main.modalTypeEdit === 0
                  ? { email }
                  : main.modalTypeEdit === 1
                  ? { position }
                  : main.modalTypeEdit === 2
                  ? {
                      client: main.clientData.client.id,
                      client_auth_person: main.clientData.auth_person.id,
                      phone_number:
                        phone === '' ? main.modalTypeData?.phone_number : phone,
                      phone_type:
                        phoneType === ''
                          ? main.modalTypeData?.phone_type
                          : phoneType,
                    }
                  : main.modalTypeEdit === 3
                  ? {
                      ...main.modalTypeData,
                      full_address:
                        fullName === ''
                          ? main.modalTypeData?.full_address
                          : fullName,
                    }
                  : main.modalTypeEdit === 4
                  ? {
                      ...main.modalTypeData,
                      iik: iik === '' ? main.modalTypeData?.iik : iik,
                      bik: bik === '' ? main.modalTypeData?.bik : bik,
                    }
                  : '';

              main.modalTypeEdit === 4
                ? request
                    .editClientBankDetails(main.modalTypeData?.id, data)
                    .then(() => {
                      main.setModal(false);
                      setIik('');
                      setBik('');
                    })
                : main.modalTypeEdit === 3
                ? request
                    .editClientAddress(main.modalTypeData?.id, data)
                    .then(() => {
                      main.setModal(false);
                      setPhone('');
                      setPhoneType('');
                    })
                : main.modalTypeEdit === 2
                ? request
                    .editClientContact(main.modalTypeData?.id, data)
                    .then(() => {
                      main.setModal(false);
                      setPhone('');
                      setPhoneType('');
                    })
                : request.updateUser(main.clientData.user.id, data).then(() => {
                    main.setModal(false);
                    setEmail('');
                  });
            }}
          >
            Сохранить
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ModalTypeFifteen;
