import React from 'react';
import { observer } from 'mobx-react';
import { RequestInnerProps } from './RequestInnerProps.props';
import { ClientUserAccess } from '../../api/Models/ServiceModels';
import CardServiceUsers from '../partnersnew/CardServiceUsers';

const RequestInnerThirdStep = ({ request }: RequestInnerProps) => {
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

export default observer(RequestInnerThirdStep);
