import React from 'react';
import BaseModal from '../BaseModal';
import { ModalTypes } from './ModalTypes.props';
import { observer } from 'mobx-react';

const ModalTypeThree = ({ main, request }: ModalTypes) => {
  return (
    <BaseModal size={`modal-large`} main={main}>
      <div className='modal-body'>
        <div className='alert-close'>
          <h3 className='title-subhead text-center mb-16'>Вы уверены?</h3>
          <p className='text-center text-desc'>
            Предыдущие настройки согласования/подписания будут потеряны.
          </p>
        </div>
        <div className='btn-alert-close'>
          <button
            type='button'
            onClick={() => main.setModal(false)}
            className='button btn-secondary'
          >
            Нет
          </button>
          <button
            type='button'
            onClick={() => request.sendType().then(() => main.setModal(false))}
            className='button btn-primary'
          >
            Да
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default observer(ModalTypeThree);
