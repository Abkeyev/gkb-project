import React from 'react';
import { ServiceCommon } from '../../../api/Models/ServiceModels';
import { ModalTypes } from './ModalTypes.props';
import { observer } from 'mobx-react';

const ModalTypeEleven = ({ main, request }: ModalTypes) => {
  const [firstRuk, setFirstRuk] = React.useState('');
  const [zam, setZam] = React.useState('');
  const [man, setMan] = React.useState('');
  const [manCon, setManCon] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [position, setPosition] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [department, setDepartment] = React.useState('');
  const [iin, setIin] = React.useState('');
  const [idcard_number, setIdcardNumber] = React.useState('');
  const [global_ip, setGlobalIp] = React.useState('');
  return (
    <div className='modal modal-large'>
      <div
        className='modal-backbg'
        onClick={() => {
          main.setModal(false);
          setFirstRuk('');
          setZam('');
          setMan('');
          setManCon('');
          setFullName('');
          setPosition('');
          setDepartment('');
          setPhone('');
          setEmail('');
        }}
      ></div>
      <div className='modal-dialog'>
        <div className='modal-content fadeInModal animated'>
          <div className='modal-close'>
            <i
              className='azla close-icon'
              onClick={() => {
                main.setModal(false);
                setFirstRuk('');
                setZam('');
                setMan('');
                setManCon('');
                setFullName('');
                setPosition('');
                setDepartment('');
                setPhone('');
                setEmail('');
              }}
            ></i>
          </div>
          <div className='modal-body'>
            <div className='write-reasons'>
              <h3 className='text-left title-subhead mb-32'>
                {main.modalTypeEdit === 2
                  ? 'Редактировать пользователя'
                  : 'Добавить пользователя'}
              </h3>
              <div className='form-wrapper'>
                <input
                  type='text'
                  defaultValue={
                    main.modalTypeEdit === 2
                      ? main.modalTypeData?.full_name
                      : fullName
                  }
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder='Введите ФИО'
                />
                <label>ФИО</label>
              </div>
              <div className='form-wrapper'>
                <input
                  type='number'
                  size={12}
                  defaultValue={
                    main.modalTypeEdit === 2 ? main.modalTypeData?.iin : iin
                  }
                  onChange={(e) => setIin(e.target.value)}
                  placeholder='Введите ИИН'
                />
                <label>ИИН</label>
              </div>
              <div className='form-wrapper'>
                <input
                  type='number'
                  size={9}
                  defaultValue={
                    main.modalTypeEdit === 2
                      ? main.modalTypeData?.idcard_number
                      : idcard_number
                  }
                  onChange={(e) => setIdcardNumber(e.target.value)}
                  placeholder='Введите № удостоверения личности'
                />
                <label>№ удостоверения личности</label>
              </div>
              <div className='form-wrapper'>
                <input
                  type='text'
                  defaultValue={
                    main.modalTypeEdit === 2
                      ? main.modalTypeData?.global_ip
                      : global_ip
                  }
                  onChange={(e) => setGlobalIp(e.target.value)}
                  placeholder='Введите Глобальный IP'
                />
                <label>Глобальный IP</label>
              </div>
              <div className='form-wrapper'>
                <select
                  defaultValue={
                    main.modalTypeEdit === 2
                      ? main.modalTypeData?.position_name
                      : position
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
              </div>
              <div className='form-wrapper'>
                <input
                  type='text'
                  defaultValue={
                    main.modalTypeEdit === 2
                      ? main.modalTypeData?.department_name
                      : department
                  }
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder='Введите департамент'
                />
                <label>Департамент</label>
              </div>
              <div className='form-wrapper'>
                <input
                  defaultValue={
                    main.modalTypeEdit === 2
                      ? main.modalTypeData?.contacts
                      : phone
                  }
                  type='text'
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder='+7 (_ _ _) _ _ _ - _ _ - _ _'
                />
                <label>Контактный номер</label>
              </div>
              <div className='form-wrapper'>
                <input
                  type='text'
                  defaultValue={
                    main.modalTypeEdit === 2 ? main.modalTypeData?.email : email
                  }
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Введите почту'
                />
                <label>Email</label>
              </div>
              <div className='form-wrapper'>
                <input
                  type='text'
                  defaultValue={
                    main.modalTypeEdit === 2
                      ? main.modalTypeData?.first_head_full_name
                      : firstRuk
                  }
                  onChange={(e) => setFirstRuk(e.target.value)}
                  placeholder='Первый руководитель'
                />
                <label>Первый руководитель</label>
              </div>
              <div className='form-wrapper'>
                <input
                  type='text'
                  defaultValue={
                    main.modalTypeEdit === 2
                      ? main.modalTypeData?.deputy_head_full_name
                      : zam
                  }
                  onChange={(e) => setZam(e.target.value)}
                  placeholder='Введите заместитель'
                />
                <label>Заместитель</label>
              </div>
              <div className='form-wrapper'>
                <input
                  type='text'
                  defaultValue={
                    main.modalTypeEdit === 2
                      ? main.modalTypeData?.manager_full_name
                      : man
                  }
                  onChange={(e) => setMan(e.target.value)}
                  placeholder='Введите менеджера'
                />
                <label>Курирующий менеджер</label>
              </div>
              <div className='form-wrapper'>
                <input
                  type='text'
                  defaultValue={
                    main.modalTypeEdit === 2
                      ? main.modalTypeData?.manager_contacts
                      : manCon
                  }
                  onChange={(e) => setManCon(e.target.value)}
                  placeholder='Введите контакты менеджера'
                />
                <label>Контакты менеджера</label>
              </div>
              <div className='d-flex mt-16'>
                <button
                  type='button'
                  onClick={() => {
                    if (main.modalTypeEdit === 2) {
                      try {
                        request.editClientUser(main.modalTypeData?.id, {
                          client: main.clientData.client.id,
                          first_head_full_name:
                            firstRuk !== ''
                              ? firstRuk
                              : main.modalTypeData?.first_head_full_name,
                          deputy_head_full_name:
                            zam !== ''
                              ? zam
                              : main.modalTypeData?.deputy_head_full_name,
                          manager_full_name:
                            man !== ''
                              ? man
                              : main.modalTypeData?.manager_full_name,
                          manager_contacts:
                            manCon !== ''
                              ? manCon
                              : main.modalTypeData?.manager_contacts,
                          full_name:
                            fullName !== ''
                              ? fullName
                              : main.modalTypeData?.full_name,
                          position_name:
                            position !== ''
                              ? position
                              : main.modalTypeData?.position_name,
                          department_name:
                            department !== ''
                              ? department
                              : main.modalTypeData?.department_name,
                          contacts:
                            phone !== '' ? phone : main.modalTypeData?.contacts,
                          email:
                            email !== '' ? email : main.modalTypeData?.email,
                          global_ip:
                            global_ip !== ''
                              ? global_ip
                              : main.modalTypeData?.global_ip,
                          idcard_number:
                            idcard_number !== ''
                              ? idcard_number
                              : main.modalTypeData?.idcard_number,
                          iin: iin !== '' ? iin : main.modalTypeData?.iin,
                        });
                      } finally {
                        main.setModal(false);
                        setFirstRuk('');
                        setZam('');
                        setMan('');
                        setManCon('');
                        setFullName('');
                        setPosition('');
                        setDepartment('');
                        setPhone('');
                        setEmail('');
                      }
                    } else {
                      try {
                        request.regClientUser({
                          client: main.clientData.client.id,
                          first_head_full_name:
                            firstRuk !== ''
                              ? firstRuk
                              : main.modalTypeData?.first_head_full_name,
                          deputy_head_full_name:
                            zam !== ''
                              ? zam
                              : main.modalTypeData?.deputy_head_full_name,
                          manager_full_name:
                            man !== ''
                              ? man
                              : main.modalTypeData?.manager_full_name,
                          manager_contacts:
                            manCon !== ''
                              ? manCon
                              : main.modalTypeData?.manager_contacts,
                          full_name:
                            fullName !== ''
                              ? fullName
                              : main.modalTypeData?.full_name,
                          position_name:
                            position !== ''
                              ? position
                              : main.modalTypeData?.position_name,
                          department_name:
                            department !== ''
                              ? department
                              : main.modalTypeData?.department_name,
                          contacts:
                            phone !== '' ? phone : main.modalTypeData?.contacts,
                          email:
                            email !== '' ? email : main.modalTypeData?.email,
                          global_ip:
                            global_ip !== ''
                              ? global_ip
                              : main.modalTypeData?.global_ip,
                          idcard_number:
                            idcard_number !== ''
                              ? idcard_number
                              : main.modalTypeData?.idcard_number,
                          iin: iin !== '' ? iin : main.modalTypeData?.iin,
                        });
                      } finally {
                        main.setModalType(10);
                        setFirstRuk('');
                        setZam('');
                        setMan('');
                        setManCon('');
                        setFullName('');
                        setPosition('');
                        setDepartment('');
                        setPhone('');
                        setEmail('');
                      }
                    }
                  }}
                  className='button btn-primary mr-16'
                >
                  Сохранить
                </button>
                {main.modalTypeEdit === 2 && (
                  <button
                    type='button'
                    onClick={() => {
                      try {
                        request.deleteClientUser(
                          main.clientData.client.id,
                          main.modalTypeData?.id
                        );
                      } finally {
                        main.setModal(false);
                        setFirstRuk('');
                        setZam('');
                        setMan('');
                        setManCon('');
                        setFullName('');
                        setPosition('');
                        setDepartment('');
                        setPhone('');
                        setEmail('');
                      }
                    }}
                    className='button btn-danger'
                  >
                    Удалить пользователя
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(ModalTypeEleven);
