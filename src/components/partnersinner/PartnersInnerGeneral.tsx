import { observer } from 'mobx-react';
import React from 'react';
import { PartnersProps } from '../partners/PartnersProps.props';
import { ServiceCommon, Categories } from '../../api/Models/ServiceModels';
import moment from 'moment';

const PartnersInnerGeneral = ({ request }: PartnersProps) => {
  return (
    <>
      <div className='req-inner-body pad-b-128'>
        <h3 className='title-subhead mb-16'>Общие данные</h3>
        <div className='total-info mb-32'>
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
            {request._getManUser && (
              <li>
                <span className='left'>Менеджер заявки:</span>
                <span className='right d-flex'>
                  {request._getManUser.full_name}
                </span>
              </li>
            )}
            <li>
              <span className='left'>Организация:</span>
              <span className='right'>
                <span className='pre-primary-color'>
                  {request._getRequest.client.longname}
                </span>
              </span>
            </li>
            <li>
              <span className='left'>БИН:</span>
              <span className='right'>{request._getRequest.client.bin}</span>
            </li>
            <li>
              <span className='left'>Категория деятельности:</span>
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
            <li>
              <span className='left'>Дата регистрации заявки:</span>
              <span className='right'>
                {request._getRequest.reg_date
                  ? moment(request._getRequest.reg_date).format('MM.DD.YYYY')
                  : '-'}
              </span>
            </li>
            <li>
              <span className='left'>Дата исполнения заявки:</span>
              <span className='right'>
                {request._getRequest.fulfill_date
                  ? moment(request._getRequest.fulfill_date).format(
                      'DD.MM.YYYY'
                    )
                  : '-'}
              </span>
            </li>
          </ul>
        </div>
        <h3 className='title-subhead mb-16'>Документы организации</h3>
        {request._getDocCategories && request._getDocCategories.length === 0
          ? 'Документы отсутствуют.'
          : request._getDocCategories.map(
              (c: Categories) =>
                c.doc_type.filter((dt: any) => dt.file !== null).length > 0 && (
                  <>
                    <h5 className='title-subhead-h5 mb-16'>{c.name}</h5>
                    <div className='files-added'>
                      <ul className='files-list'>
                        {c.doc_type.map(
                          (d: any) =>
                            d.file && (
                              <li>
                                <i className='azla blank-alt-primary-icon'></i>
                                <span
                                  onClick={() =>
                                    d.file && request.downloadDocument(d.file)
                                  }
                                >
                                  {d.name}
                                </span>
                              </li>
                            )
                        )}
                      </ul>
                    </div>
                  </>
                )
            )}
      </div>
    </>
  );
};

export default observer(PartnersInnerGeneral);
