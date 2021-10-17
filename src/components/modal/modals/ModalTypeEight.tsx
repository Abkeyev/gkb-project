import React from 'react';
import { ModalTypes } from './ModalTypes.props';
import BaseModal from '../BaseModal';
import { observer } from 'mobx-react';

const ModalTypeEight = ({ main }: ModalTypes) => {
  return (
    <BaseModal size={`modal-large`} main={main}>
      <div className='modal-body'>
        <div className='write-reasons'>
          <h3 className='text-center title-subhead mb-16'>Удалить документ?</h3>

          <div className='files-added modal-files-deleted'>
            <ul className='files-list'>
              <li>
                <i className='azla blank-alt-primary-icon'></i>
                <span>Устав ТОО “М-Ломбард”.pdf</span>
              </li>
            </ul>
          </div>

          <div className='d-flex justify-content-center'>
            <button
              type='button'
              onClick={() => main.setModal(false)}
              className='button btn-secondary w-160 mr-16'
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
              className='button btn-primary w-160'
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default observer(ModalTypeEight);
