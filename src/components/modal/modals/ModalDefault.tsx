import React from 'react';
import BaseModal from '../BaseModal';
import { ModalTypes } from './ModalTypes.props';

const ModalDefault = ({ main }: ModalTypes) => {
  return (
    <BaseModal size={`modal-default`} main={main}>
      <div className='modal-body'>
        <h3 className='text-center'>Добавьте или перетащите файл</h3>
        <i className='azla upload-icon size-80 mtb-auto-16'></i>
        <button type='button' className='button btn-primary table-auto'>
          Добавить
        </button>
      </div>
    </BaseModal>
  );
};

export default ModalDefault;
