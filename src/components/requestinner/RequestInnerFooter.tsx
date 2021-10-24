import React from 'react';
import { observer } from 'mobx-react';
import { RequestInnerProps } from './RequestInnerProps.props';

const RequestInnerFooter = ({ request, main, history }: RequestInnerProps) => {
  return (
    <div className='req-inner-footer'>
      <div className='container'>
        {request._getManUser &&
        request._getRequest.request_stepper === 1 &&
        (request._getRequest.request_status === 2 ||
          request._getRequest.request_status === 4) ? (
          <div className='manager-req mrl-32'>
            <div className='left'>
              <p>Менеджер заявки</p>
              <div className='profile'>
                <img
                  alt='ava'
                  className='ava'
                  src={process.env.PUBLIC_URL + '/images/def-ava.svg'}
                />
                <span className='name'>{request._getManUser.full_name}</span>
              </div>
            </div>

            {request._getRequest.request_status === 4 ? (
              <div className='right alert'>
                <p>Заявка отклонена</p>
                <button
                  className='button btn-secondary'
                  onClick={() =>
                    request
                      .updateRequest({
                        request_status: 3,
                        client: request._getRequest.client.id,
                      })
                      .then(() => {
                        main.decline = false;
                        main.declineReason = '';
                        history.push('/');
                      })
                  }
                >
                  В архив
                </button>
              </div>
            ) : (
              <div className='right'>
                <p>Первичная проверка прошла успешно?</p>
                <button
                  className='button btn-secondary mr-8'
                  onClick={() => {
                    main.setModal(true);
                    main.setModalType(1);
                  }}
                >
                  Нет
                </button>
                <button
                  className='button btn-primary'
                  onClick={() =>
                    request
                      .nextRequest(request._getRequest, true)
                      .then(() => request.setStep(2))
                  }
                >
                  Да, успешно
                </button>
              </div>
            )}
          </div>
        ) : request._getRequest.request_stepper === 1 &&
          request._getRequest.request_status === 1 ? (
          <button
            type='button'
            onClick={() => {
              main.setModalType(0);
              main.setModal(true);
            }}
            className='button btn-primary mrl-32'
          >
            Назначить
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default observer(RequestInnerFooter);
