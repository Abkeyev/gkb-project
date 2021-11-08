import { observer } from 'mobx-react-lite';
import React from 'react';
import BaseModal from '../BaseModal';
import { ModalTypes } from './ModalTypes.props';

const ModalSuccess = ({ main }: ModalTypes) => {
  return (
    <BaseModal main={main} size={`modal-default`}>
      <div className='modal-body'>
        <div className='add-manager'>
          <h3 className='text-center title-subhead'>Выберите подписанта</h3>

          <div className='circle-success'>
            <span className='circle-bg animated fadeinScale'>
              <i className='azla icon-success-check size-80'></i>
            </span>
          </div>

          <button
            type='button'
            className='button btn-secondary table-auto w-160'
          >
            К заявке
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default observer(ModalSuccess);
