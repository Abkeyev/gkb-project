import React from 'react';
import BaseModal from '../BaseModal';
import { ModalTypes } from './ModalTypes.props';

const ModalTypeOne = ({ main, request }: ModalTypes) => {
  const [declineReason, setDeclineReason] = React.useState('');
  return (
    <BaseModal size={`modal-large`} main={main}>
      <div className='modal-body'>
        <div className='write-reasons'>
          <h3 className='text-left title-subhead mb-16'>
            {main.role === 'Manager' ? 'Укажите причину' : 'Отклонить заявку'}
          </h3>
          <textarea
            rows={5}
            className='form-control-textarea mb-16'
            placeholder={
              main.role === 'Manager' ? 'Причина отказа' : 'Укажите причину'
            }
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
          ></textarea>
          <div className='d-flex'>
            <button
              type='button'
              disabled={declineReason === ''}
              onClick={() =>
                request._getRequest &&
                request
                  .endRequest(request._getRequest, declineReason)
                  .then(() => {
                    main.decline = true;
                    main.declineReason = declineReason;
                    main.setModal(false);
                  })
              }
              className='button btn-primary mr-16'
            >
              Отправить
            </button>
            <button
              type='button'
              onClick={() => main.setModal(false)}
              className='button btn-secondary'
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default ModalTypeOne;
