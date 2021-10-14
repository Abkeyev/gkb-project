import React from 'react';
import BaseModal from '../BaseModal';
import { ModalTypes } from './ModalTypes.props';

const ModalTypeSeven = ({ main }: ModalTypes) => {
  return (
    <BaseModal main={main} size={`modal-large`}>
      <div className='modal-body'>
        <div className='write-reasons'>
          <h3 className='text-left title-subhead mb-16'>Юридический адрес</h3>
          <textarea
            rows={5}
            className='form-control-textarea mb-16'
            placeholder='Причина отказа'
            value='г. Алматы, ул. Тажибаевой 47, БЦ “Иван”, этаж 24'
            onChange={(e) => main.setDeclineReason(e.target.value)}
          ></textarea>
          <div className='d-flex'>
            <button
              type='button'
              onClick={() => main.setModal(false)}
              className='button btn-secondary mr-16'
            >
              Отмена
            </button>
            <button
              type='button'
              onClick={() => {
                main.setModalManager(true);
                main.setModal(false);
                main.setDecline(true);
              }}
              className='button btn-primary'
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default ModalTypeSeven;
