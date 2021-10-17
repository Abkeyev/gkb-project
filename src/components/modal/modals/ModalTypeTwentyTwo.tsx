import React from 'react';
import BaseModal from '../BaseModal';
import { ModalTypes } from './ModalTypes.props';
import { ServiceCommon } from '../../../api/Models/ServiceModels';
import { observer } from 'mobx-react';

const ModalTypeTwentyTwo = ({ main, request }: ModalTypes) => {
  const [fullName, setFullName] = React.useState('');
  const [position, setPosition] = React.useState('');
  const [department, setDepartment] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [zam, setZam] = React.useState('');
  const [man, setMan] = React.useState('');
  const [firstRuk, setFirstRuk] = React.useState('');
  const [manCon, setManCon] = React.useState('');
  return (
    <BaseModal main={main} size={`modal-large`}>
      <div className='modal-body'>
        <div className='write-reasons'>
          <h3 className='text-left title-subhead mb-32'>
            Редактировать пользователя
          </h3>
          <div className='form-wrapper'>
            <input
              type='text'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder='Введите ФИО'
            />
            <label>ФИО</label>
          </div>
          <div className='form-wrapper'>
            <select
              defaultValue={position}
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
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder='Введите департамент'
            />
            <label>Департамент</label>
          </div>
          <div className='form-wrapper'>
            <input
              value={phone}
              type='text'
              onChange={(e) => setPhone(e.target.value)}
              placeholder='+7 (_ _ _) _ _ _ - _ _ - _ _'
            />
            <label>Контактный номер</label>
          </div>
          <div className='form-wrapper'>
            <input
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Введите почту'
            />
            <label>Email</label>
          </div>
          <div className='form-wrapper'>
            <input
              type='text'
              value={firstRuk}
              onChange={(e) => setFirstRuk(e.target.value)}
              placeholder='Первый руководитель'
            />
            <label>Первый руководитель</label>
          </div>
          <div className='form-wrapper'>
            <input
              type='text'
              value={zam}
              onChange={(e) => setZam(e.target.value)}
              placeholder='Введите заместитель'
            />
            <label>Заместитель</label>
          </div>
          <div className='form-wrapper'>
            <input
              type='text'
              value={man}
              onChange={(e) => setMan(e.target.value)}
              placeholder='Введите менеджера'
            />
            <label>Курирующий менеджер</label>
          </div>
          <div className='form-wrapper'>
            <input
              type='text'
              value={manCon}
              onChange={(e) => setManCon(e.target.value)}
              placeholder='Введите контакты менеджера'
            />
            <label>Контакты менеджера</label>
          </div>
          <div className='d-flex mt-16'>
            <button
              type='button'
              onClick={() => {
                main
                  .regClientUser({
                    client: main.clientData.client.id,
                    first_head_full_name: firstRuk,
                    deputy_head_full_name: zam,
                    manager_full_name: man,
                    iin: 'IIN',
                    global_ip: 'ip',
                    idcard_number: 'idcard',
                    manager_contacts: manCon,
                    full_name: fullName,
                    position_name: position,
                    department_name: department,
                    contacts: phone,
                    email: email,
                  })
                  .then(() => main.setModal(false));
              }}
              className='button btn-primary mr-16'
            >
              Сохранить
            </button>
            <button
              type='button'
              onClick={() => main.setModal(false)}
              className='button btn-danger'
            >
              Удалить пользователя
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default observer(ModalTypeTwentyTwo);
