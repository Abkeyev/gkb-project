import { observer } from 'mobx-react';
import React from 'react';
import { ClientUserAccess } from '../../api/Models/ServiceModels';
import CardServiceUsers from '../partnersnew/CardServiceUsers';
import { ServiceDeskInnerProps } from './ServiceDeskInnerProps.props';

const ServiceDeskInnerThirdStep = ({ request }: ServiceDeskInnerProps) => {
  return (
    <>
      <h3 className='title-subhead mb-16'>
        {request._getClientUsers.length} заявленных пользователей
      </h3>
      {request._getClientUsers.length === 0
        ? 'Пользователи отсутствуют. '
        : request._getClientUsers.map((u: ClientUserAccess, index: number) => (
            <CardServiceUsers u={u} index={index} />
          ))}
    </>
  );
};

export default observer(ServiceDeskInnerThirdStep);
