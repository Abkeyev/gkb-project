import { observer } from 'mobx-react';
import React from 'react';
import { PartnersProps } from '../partners/PartnersProps.props';
import { ClientUserAccess } from '../../api/Models/ServiceModels';

const PartnersInnerServiceUsers = ({ request }: PartnersProps) => {
  return (
    <>
      <div className='tab-content tab-1'>
        Потребители услуг – пользователи контрагента, которые имеют доступ к
        базам данных БДКИ и ЕСБД.
        <h3 className='title-subhead mtb-16'>
          {request._getClientUsers.length} заявленных пользователей
        </h3>
        {request._getClientUsers.length === 0
          ? 'Пользователи отсутствуют. '
          : request._getClientUsers.map((u: ClientUserAccess, index: number) => (
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
                            <span className='right'>{u.manager_full_name}</span>
                          </li>
                          <li>
                            <span className='left'>Контакты менеджера:</span>
                            <span className='right'>{u.manager_contacts}</span>
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

export default observer(PartnersInnerServiceUsers);
