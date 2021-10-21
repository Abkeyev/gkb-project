import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  Request as RequestModel,
  ServiceCommon,
} from '../../api/Models/ServiceModels';
import moment from 'moment';
import { RequestProps } from './RequestProps.props';
import Spinner from '../common/Spinner';

const NeedSignRequest = ({
  main,
  request,
  filterRequests,
  history,
}: RequestProps) => {
  useEffect(() => {
    request.getVoteRequest(main.clientData.user.id);
    request.getMineRequest(main.clientData.user.id);
  }, []);
  return (
    <>
      <div className='tab-content tab-2'>
        <h3 className='title-subhead mb-16'>
          На подпись
          <span className='number'> {filterRequests([6], true).length}</span>
        </h3>
        {request._getMineRequests.length !== 0 ? (
          filterRequests([6], true).length === 0 ? (
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
                {filterRequests([6], true).map((r: RequestModel) => (
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
          )
        ) : (
          <Spinner />
        )}
      </div>
      <div className='tab-content tab-2'>
        <h3 className='title-subhead mb-16'>
          На согласование{' '}
          <span className='number'>
            {filterRequests([], false, true).length}
          </span>
        </h3>
        {filterRequests([], false, true).length === 0 ? (
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
              {filterRequests([], false, true).map((r: RequestModel) => (
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

      <div className='tab-content tab-2 mt-16'>
        <h3 className='title-subhead mb-16'>
          Активные{' '}
          <span className='number'>
            {filterRequests([2, 5, 8, 9, 10, 11], true).length}
          </span>
        </h3>
        {filterRequests([2, 5, 8, 9, 10, 11], true).length === 0 ? (
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
              {filterRequests([2, 5, 8, 9, 10, 11], true).map(
                (r: RequestModel) => (
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
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default observer(NeedSignRequest);
