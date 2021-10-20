import { observer } from 'mobx-react';
import React from 'react';
import { PartnersProps } from '../partners/PartnersProps.props';
import { Documents, ServiceCommon } from '../../api/Models/ServiceModels';
import moment from 'moment';

const PartnersInnerFifthStep = ({ main, request }: PartnersProps) => {
  return (
    <>
      <div className='pad-b-128'>
        <div className='done-request'>
          <h3 className='title-subhead mb-16'>
            Контрагент успешно зарегистрирован!
          </h3>

          <h5 className='title-subhead-h5 mb-16'>Общие данные</h5>

          <div className='pad-rl-16 mb-32'>
            <div className='row'>
              <div className='col-md-6'>
                <div className='total-info'>
                  <ul className='info-list'>
                    <li>
                      <span className='left'>Номер заявки:</span>
                      <span className='right'>{request._getRequest.id}</span>
                    </li>
                    <li>
                      <span className='left'>Статус заявки:</span>
                      <span className='right'>
                        {
                          request._getRequestStatus.find(
                            (t: ServiceCommon) =>
                              t.id === request._getRequest.request_status
                          )?.name
                        }
                      </span>
                    </li>
                    <li>
                      <span className='left'>Организация:</span>
                      <span className='right'>
                        {request._getRequest.client.longname}
                      </span>
                    </li>
                    <li>
                      <span className='left'>БИН:</span>
                      <span className='right'>
                        {request._getRequest.client.bin}
                      </span>
                    </li>
                    <li>
                      <span className='left'>Категория деятельности:</span>
                      <span className='right'>
                        {
                          request._getClientTypes.find(
                            (t: any) =>
                              t.id === request._getRequest.client.client_type
                          )?.name
                        }
                      </span>
                    </li>
                    <li>
                      <span className='left'>Тип сервиса:</span>
                      <span className='right'>
                        {
                          request._getClientServiceType.find(
                            (t: ServiceCommon) =>
                              t.id === request._getRequest.service_type
                          )?.name
                        }
                      </span>
                    </li>
                    <li>
                      <span className='left'>Дата регистрации заявки:</span>
                      <span className='right'>
                        {moment(request._getRequest.reg_date).format(
                          'DD.MM.YYYY'
                        )}
                      </span>
                    </li>
                    <li>
                      <span className='left'>Дата исполнения заявки:</span>
                      <span className='right'>
                        {request._getRequest.fulfill_date &&
                          moment(request._getRequest.fulfill_date).format(
                            'DD.MM.YYYY'
                          )}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h5 className='title-subhead-h5 mb-16'>Документы</h5>
          <div className='files-added'>
            <ul className='files-list'>
              {request._getClientDocs &&
                (request._getClientDocs as Documents[])
                  .filter(
                    (dd: Documents) =>
                      (dd.doc_type === 1 && dd.is_signed_by_both) ||
                      (dd.doc_type === 8 && dd.is_signed_by_agent) ||
                      (dd.doc_type !== 1 &&
                        dd.doc_type !== 8 &&
                        dd.doc_type !== 9)
                  )
                  .map((d) => (
                    <li>
                      <i className='azla blank-alt-primary-icon'></i>
                      <span onClick={() => d && request.downloadDocument(d)}>
                        {
                          request._getTypes.find(
                            (t: any) => t.id === d.doc_type
                          )?.name
                        }
                      </span>
                    </li>
                  ))}
            </ul>
          </div>

          <h5 className='title-subhead-h5 mb-16'>Ключи доступа</h5>
          <div className='d-flex'>
            {request.testKey && (
              <button
                type='button'
                className='button btn-secondary mr-16'
                onClick={() => request.downloadKeys(request.testKey)}
              >
                Скачать тестовые ключи
              </button>
            )}
            {request.prodKey && (
              <button
                type='button'
                className='button btn-secondary'
                onClick={() => request.downloadKeys(request.prodKey)}
              >
                Скачать боевые ключи
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default observer(PartnersInnerFifthStep);
