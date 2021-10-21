import { observer } from 'mobx-react';
import React from 'react';
import { ServiceDeskInnerProps } from './ServiceDeskInnerProps.props';

const ServiceDeskInnerStatusBar = ({ request }: ServiceDeskInnerProps) => {
  return (
    <div className='status-bar'>
      <ul className='step-progressbar'>
        <li
          className={`step-item ${
            request._getRequest.request_stepper === 1
              ? 'step-item-active'
              : 'step-item-complete'
          }`}
          onClick={() => request.setStep(1)}
        >
          Проверка
        </li>
        <li
          className={`step-item ${
            request._getRequest.request_stepper === 2
              ? 'step-item-active'
              : request._getRequest.request_stepper > 2
              ? 'step-item-complete'
              : ''
          }`}
          onClick={() =>
            request._getRequest.request_stepper >= 2 && request.setStep(2)
          }
        >
          Подписание
          <br />
          договора
        </li>
        <li
          className={`step-item ${
            request._getRequest.request_stepper === 3
              ? 'step-item-active'
              : request._getRequest.request_stepper > 3
              ? 'step-item-complete'
              : ''
          }`}
          onClick={() =>
            request._getRequest.request_stepper >= 3 && request.setStep(3)
          }
        >
          Форма
          <br />
          доступа
        </li>
        <li
          className={`step-item ${
            request._getRequest.request_stepper === 4
              ? 'step-item-active'
              : request._getRequest.request_stepper > 4
              ? 'step-item-complete'
              : ''
          }`}
          onClick={() =>
            request._getRequest.request_stepper >= 4 && request.setStep(4)
          }
        >
          Тестирование
        </li>
        <li
          className={`step-item ${
            request._getRequest.request_stepper === 5
              ? 'step-item-active'
              : request._getRequest.request_stepper > 5
              ? 'step-item-complete'
              : ''
          }`}
          onClick={() =>
            request._getRequest.request_stepper >= 5 && request.setStep(5)
          }
        >
          Готово
        </li>
      </ul>
    </div>
  );
};

export default observer(ServiceDeskInnerStatusBar);
