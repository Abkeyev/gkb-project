import { observer } from 'mobx-react';
import React from 'react';
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';
import moment from 'moment';
import {
  ServiceCommon,
  Categories,
  ClientUsers,
} from '../../api/Models/ServiceModels';
import { SignersInnerProps } from './SignersInnerProps.props';

const SignersInnerFirstStep = ({ request }: SignersInnerProps) => {
  return (
    <Tabs>
      <div className='line-hr mb-32'>
        <TabList>
          <Tab>Общее</Tab>
          <Tab>Потребители услуг</Tab>
        </TabList>
      </div>

      <TabPanel>
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
                  {request._getRequest.service_category === 1 ? 'БДКИ' : 'ЕСБД'}
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
                    ? moment(request._getRequest.reg_date).format(
                        'MM.DD.YYYY в HH:mm'
                      )
                    : '-'}
                </span>
              </li>
              <li>
                <span className='left'>Дата исполнения заявки:</span>
                <span className='right'>
                  {request._getRequest.fulfill_date
                    ? moment(request._getRequest.fulfill_date).format(
                        'DD.MM.YYYY в HH:mm'
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
                  c.doc_type.filter((dt: any) => dt.file !== null).length >
                    0 && (
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
      </TabPanel>

      <TabPanel>
        <div className='tab-content tab-1'>
          Потребители услуг – пользователи контрагента, которые имеют доступ к
          базам данных БДКИ и ЕСБД.
          <h3 className='title-subhead mtb-16'>
            {request._getClientUsers.length} заявленных пользователей
          </h3>
          {request._getClientUsers.length === 0
            ? 'Пользователи отсутствуют. '
            : request._getClientUsers.map((u: ClientUsers, index: number) => (
                <div className='card mb-24 pad-24'>
                  <div className='card-header'>
                    <div className='title'>
                      <h6 className='text'>{u.full_name}</h6>
                      <span className='num'>№{index + 1}</span>
                    </div>
                    <p className='desc'>{u.department_name}</p>
                  </div>
                  <div className='card-body pad-rl-16'>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='total-info'>
                          <ul className='info-list'>
                            <li>
                              <span className='left'>ID пользователя:</span>
                              <span className='right'>{u.id}</span>
                            </li>
                            <li>
                              <span className='left'>ИИН сотрудника:</span>
                              <span className='right'>{u.iin}</span>
                            </li>
                            <li>
                              <span className='left'>Контактный номер:</span>
                              <span className='right'>{u.idcard_number}</span>
                            </li>
                            <li>
                              <span className='left'>Email:</span>
                              <span className='right'>{u.email}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='total-info'>
                          <ul className='info-list'>
                            <li>
                              <span className='left'>Первый руководитель:</span>
                              <span className='right'>
                                {u.first_head_full_name}
                              </span>
                            </li>
                            <li>
                              <span className='left'>Заместитель:</span>
                              <span className='right'>
                                {u.deputy_head_full_name}
                              </span>
                            </li>
                            <li>
                              <span className='left'>Курирующий менеджер:</span>
                              <span className='right'>
                                {u.manager_full_name}
                              </span>
                            </li>
                            <li>
                              <span className='left'>Контакты менеджера:</span>
                              <span className='right'>
                                {u.manager_contacts}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </TabPanel>
    </Tabs>
  );
};

export default observer(SignersInnerFirstStep);
