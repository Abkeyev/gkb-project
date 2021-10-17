import React from 'react';
import BaseModal from '../BaseModal';
import { ModalTypes } from './ModalTypes.props';
import { ServiceCommon } from '../../../api/Models/ServiceModels';
import { observer } from 'mobx-react';

const ModalTypeNine = ({ main, request }: ModalTypes) => {
  const [position, setPosition] = React.useState('');
  return (
    <BaseModal main={main} size={`modal-large`}>
      <div className='modal-body'>
        <div className='write-reasons'>
          <h3 className='text-left title-subhead mb-32'>
            Редактировать данные
          </h3>
          <div className='form-wrapper'>
            <input type='text' value='Султангалиева Камилла Избасарова' />
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
            <input type='text' value='sultangaliyeva.k.i@gmail.com' />
            <label>Email</label>
          </div>
          <div className='form-wrapper'>
            <input type='text' value='+7 (701) 456-78-90' />
            <label>Телефон</label>
          </div>
          <div className='form-check gkb-checkbox'>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              id='checkMeanNum'
              required
            />
            <label className='form-check-label' htmlFor='checkMeanNum'>
              Основной номер
            </label>
          </div>
          <div className='d-flex mt-16'>
            <button
              type='button'
              onClick={() => {
                main.setModalManager(true);
                main.setModal(false);
                main.setDecline(true);
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

export default observer(ModalTypeNine);
