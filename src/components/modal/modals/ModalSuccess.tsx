import { observer } from 'mobx-react-lite';
import React from 'react';
import BaseModal from '../BaseModal';
import { ModalTypes } from './ModalTypes.props';

const ModalSuccess = ({ main }: ModalTypes) => {
  return (
    <BaseModal main={main} size={`modal-default`}>
      {/* <div className='modal-body'>
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
      </div> */}

      <div className='modal-body'>
        <div className='add-manager'>
          <h3 className='text-center title-subhead'>Назначить менеджера заявки?</h3>
          <p className="text-center mb-24">Вы не сможете иметь доступ к данной заявке после назначения другого менеджера.</p>

          <div className='manager-choose mb-32'>
            <p>Менеджер заявки:</p>
            <a href="#" className="link-m-choose">
              <img src="images/avatar.png" />
              <span className="text">Султангалиева К.И_Servicedesk</span>
            </a>
          </div>

          <div className='d-flex justify-content-center gap-12'>
            <button
              type='button'
              className='button btn-primary w-160'
            >
              Назначить
            </button>
            <button
              type='button'
              className='button btn-secondary w-160'
            >
              Отменить
            </button>
          </div>

        </div>
      </div>
    </BaseModal>
  );
};

export default observer(ModalSuccess);
