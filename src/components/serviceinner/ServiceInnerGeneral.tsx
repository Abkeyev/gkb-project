import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import {
  ClientUsers as Client,
  ServiceCommon,
  Documents,
} from '../../api/Models/ServiceModels';
import { Link } from 'react-router-dom';
import { ServiceDeskInnerProps } from '../ServiceDeskInner/ServiceDeskInnerProps.props';

const ServiceInnerGeneral = ({ request }: ServiceDeskInnerProps) => {
  useEffect(() => {
    request.getClients();
    request.getClientServiceType();
  }, []);
  return (
    <>
      <h3 className='title-subhead mb-16'>Общие данные</h3>
      <div className='total-info mb-32'>
        <ul className='info-list'>
          <li>
            <span className='left'>Клиент:</span>
            <span className='right'>
              {request._getClients &&
                request._getClients.find(
                  (t: Client) => t.id === request._getRequest.client.id
                )?.longname}
            </span>
          </li>
          <li>
            <span className='left'>Категория сервиса:</span>
            <span className='right'>
              {request._getRequest.service_category === 1 ? 'ЕСБД' : 'БДКИ'}
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
          {request._getRequest && (
            <li>
              <span className='left'>Заявка:</span>
              <Link to={`/request/${request._getRequest.id}`} className='right'>
                Заявка
              </Link>
            </li>
          )}
        </ul>
      </div>

      <h3 className='title-subhead mb-16'>Документы</h3>
      <div className='files-added'>
        <ul className='files-list'>
          {request._getClientDocs && request._getClientDocs.length === 0
            ? 'Документы отсутствуют.'
            : request._getClientDocs.map((d: Documents) => (
                <li>
                  <i className='azla blank-alt-primary-icon'></i>
                  <span onClick={() => request.downloadDocument(d)}>
                    {d.doc_name}
                  </span>
                </li>
              ))}
        </ul>
      </div>
    </>
  );
};

export default observer(ServiceInnerGeneral);
