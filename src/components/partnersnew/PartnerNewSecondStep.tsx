import { observer } from 'mobx-react';
import React from 'react';
import { PartnerNewProps } from './PartnerNewProps.props';
import { ClientUsers } from '../../api/Models/ServiceModels';
import CardServiceUsers from './CardServiceUsers';

const PartnerNewSecondStep = ({ main }: PartnerNewProps) => {
  return (
    <>
      <div className='d-flex-align-c-spaceb mb-32'>
        <div className='d-grid'>
          <h3 className='title-subhead mb-8'>
            Пользователи услуг{' '}
            <span className='number'>{main.usersNew.length}</span>
          </h3>
          <p>Пользователи организации с наличием ЭЦП организации</p>
        </div>
        <button
          className='btn button btn-primary btn-icon'
          onClick={() => {
            main.setModal(true);
            main.setModalType(10);
          }}
        >
          <i className='azla add-plusRound-icon'></i> Добавить
        </button>
      </div>
      {(main.usersNew as ClientUsers[]).map((u: ClientUsers, index) => (
        <CardServiceUsers u={u} key={index} index={index} />
      ))}
    </>
  );
};

export default observer(PartnerNewSecondStep);
