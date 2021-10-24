import React from 'react';
import { observer } from 'mobx-react';
import { RequestProps } from './RequestProps.props';
import {
  Request as RequestModel,
  ServiceCommon,
} from '../../api/Models/ServiceModels';
import moment from 'moment';

const SignedRequest = ({ request, filterRequests, history }: RequestProps) => {
  return (
    <div className='tab-content tab-3'>
      <h3 className='title-subhead mb-16'>
        Подписанные <span className='number'>{filterRequests([7]).length}</span>
      </h3>
      <p>
        Список подписанных заявок контрагентов, которые стали партнерами ГКБ
      </p>
      {filterRequests([7]).length === 0 ? (
        'Список пуст.'
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
            {filterRequests([7]).map((r: RequestModel) => (
              <tr onClick={() => history.push(`/request/${r.id}`)}>
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

export default observer(SignedRequest);
