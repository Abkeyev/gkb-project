import { observer } from 'mobx-react-lite';
import React from 'react';
import { Request, ServiceCommon } from '../../api/Models/ServiceModels';
import moment from 'moment';
import { SignersProps } from './SignersProps.props';

const SignersReconciliation = ({
  filterVoteRequests,
  history,
  request,
}: SignersProps) => {
  return (
    <div className='tab-content tab-2'>
      <h3 className='title-subhead mb-16'>
        На согласование{' '}
        <span className='number'>{filterVoteRequests().length}</span>
      </h3>
      {filterVoteRequests().length === 0 ? (
        'Заявки отсутствуют.'
      ) : (
        <table className='table req-table'>
          <thead>
            <tr>
              <th>БИН</th>
              <th>Организации</th>
              <th>Категория деятельности</th>
              <th>Сервис</th>
              <th>Дата поступления</th>
            </tr>
          </thead>
          <tbody>
            {filterVoteRequests().map((r: Request) => (
              <tr onClick={() => history.push(`/signer/${r.id}`)}>
                <td>{r.client.bin}</td>
                <td>{r.client.longname}</td>
                <td>
                  {
                    request._getClientTypes.find(
                      (t: any) => t.id === r.client.client_type
                    )?.name
                  }
                </td>
                <td>
                  {
                    request._getClientServiceType.find(
                      (t: ServiceCommon) => t.id === r.service_type
                    )?.name
                  }
                  /{r.service_category === 1 ? 'ЕСБД' : 'БДКИ'}
                </td>
                <td>{moment(r.reg_date).format('DD.MM.YYYY в HH:mm')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default observer(SignersReconciliation);
