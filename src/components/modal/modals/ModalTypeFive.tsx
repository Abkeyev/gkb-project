import React from 'react';
import BaseModal from '../BaseModal';
import { ModalTypes } from './ModalTypes.props';
import { observer } from 'mobx-react';

const ModalTypeFive = ({ main, request }: ModalTypes) => {
  return (
    <BaseModal main={main} size={`modal-large`}>
      <div className='modal-body'>
        <div className='paper-show'>
          <h3 className='text-left title-subhead mb-16'>Обзор комментария</h3>

          <div className='author mb-24'>
            <span className='btn-status canceled mr-16'>Отклонено</span>
            <div className='profile'>
              <img
                alt='ava'
                className='ava'
                src={process.env.PUBLIC_URL + '/images/def-ava.svg'}
              />
              <span className='name'>{request._getConSigner.full_name}</span>
            </div>
          </div>

          <div className='comment mb-32'>
            <h5>Комментарий:</h5>
            <p>{request._getRequest.client_comment}</p>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default observer(ModalTypeFive);
