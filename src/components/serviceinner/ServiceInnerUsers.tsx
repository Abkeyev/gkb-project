import React from 'react';
import { observer } from 'mobx-react';
import { ClientUsers } from '../../api/Models/ServiceModels';
import { ServiceDeskInnerProps } from '../ServiceDeskInner/ServiceDeskInnerProps.props';

const ServiceInnerUsers = ({ request }: ServiceDeskInnerProps) => {
  return (
    <>
      <div className='tab-content tab-1'>
        <h3 className='title-subhead mb-8'>
          Пользователи услуг{' '}
          <span className='number'>{request._getClientUsers.length}</span>
        </h3>

        {request._getClientUsers.length === 0
          ? 'Пользователи отсутствуют. '
          : request._getClientUsers.map((c: ClientUsers) => (
              <div className='card mb-24 pad-24'>
                <div className='card-header'>
                  <div className='title'>
                    <h6 className='text'>{c.full_name}</h6>
                  </div>
                  <p className='desc'>{c.position_name}</p>
                </div>
                <div className='card-body pad-rl-16'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='total-info'>
                        <ul className='info-list'>
                          <li>
                            <span className='left'>ID пользователя:</span>
                            <span className='right'>{c.id}</span>
                          </li>
                          <li>
                            <span className='left'>ИИН сотрудника:</span>
                            <span className='right'>{c.iin}</span>
                          </li>
                          <li>
                            <span className='left'>Контактный номер:</span>
                            <span className='right'>{c.contacts}</span>
                          </li>
                          <li>
                            <span className='left'>Email:</span>
                            <span className='right'>{c.email}</span>
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
                              {c.first_head_full_name}
                            </span>
                          </li>
                          <li>
                            <span className='left'>Заместитель:</span>
                            <span className='right'>
                              {c.deputy_head_full_name}
                            </span>
                          </li>
                          <li>
                            <span className='left'>Курирующий менеджер:</span>
                            <span className='right'>{c.manager_full_name}</span>
                          </li>
                          <li>
                            <span className='left'>Контакты менеджера:</span>
                            <span className='right'>{c.manager_contacts}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default observer(ServiceInnerUsers);
