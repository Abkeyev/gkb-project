import React from 'react';
import { ServiceCommon, ClientUsers } from '../../api/Models/ServiceModels';
import { OrganizationProps } from './Organization.props';

const ServiceUsersOrganization = ({ main, request }: OrganizationProps) => {
  return (
    <>
      <h3 className='title-subhead mb-8'>
        Пользователи услуг{' '}
        <span className='number'>
          {request._getClientUsersForAdd &&
            request._getClientUsersForAdd.length}
        </span>
      </h3>
      <p className='mb-24'>
        Пользователи организации, которые имеют доступ к сервисам БДКИ и ЕСБД
      </p>
      {(request._getClientUsersForAdd as ClientUsers[]).map(
        (u: ClientUsers, index) => (
          <div className='card mb-24 pad-24'>
            <div className='card-header'>
              <div className='title'>
                <h6 className='text'>{u.full_name}</h6>
                <span
                  className='edit-btn underline'
                  onClick={() => {
                    main.setModal(true);
                    main.setModalType(11);
                    main.setModalTypeEdit(2);
                    main.setModalTypeData(u);
                  }}
                >
                  <i className='azla edit-primary-icon mr-8'></i> Редактировать
                </span>
              </div>
              <p className='desc'>
                {
                  request._getPosition.find(
                    (t: ServiceCommon) => t.id === +u.position_name
                  )?.name
                }
              </p>
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
                        <span className='right'>{u.contacts}</span>
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
                        <span className='right'>{u.first_head_full_name}</span>
                      </li>
                      <li>
                        <span className='left'>Заместитель:</span>
                        <span className='right'>{u.deputy_head_full_name}</span>
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
        )
      )}
    </>
  );
};

export default ServiceUsersOrganization;
