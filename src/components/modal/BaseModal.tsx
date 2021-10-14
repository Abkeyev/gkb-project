import React from 'react';
import { BaseModalProps } from './BaseModalProps';

// Компонент для шаблонизации Модалок. Имеются только начальные стили для организации формы

const BaseModal = ({ children, main }: BaseModalProps): JSX.Element => {
  return (
    <div className='modal modal-large-xl'>
      <div className='modal-backbg' onClick={() => main.setModal(false)}></div>
      <div className='modal-dialog'>
        <div className='modal-content fadeInModal animated'>
          <div className='modal-close' onClick={() => main.setModal(false)}>
            <i className='azla close-icon'></i>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
