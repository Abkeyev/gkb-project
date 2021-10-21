import { observer } from 'mobx-react';
import React from 'react';
import { ServiceDeskInnerProps } from './ServiceDeskInnerProps.props';

const ServiceDeskInnerFooter = ({ request, main }: ServiceDeskInnerProps) => {
  return (
    <div className='req-inner-footer'>
      <div className='container'>
        <div className='left'>
          <button
            type='button'
            onClick={() => request.nextRequest(request._getRequest)}
            className='button btn-primary mrl-32'
          >
            Подтвердить заполнение
          </button>
          <button
            type='button'
            onClick={() => {
              main.setModalType(1);
              main.setModal(true);
            }}
            className='button btn-danger'
          >
            Отклонить
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(ServiceDeskInnerFooter);
