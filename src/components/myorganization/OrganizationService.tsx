import React from 'react';
import { OrganizationProps } from './Organization.props';
import { ServiceCommon, Request } from '../../api/Models/ServiceModels';
import { useHistory } from 'react-router';
import moment from 'moment';
import { observer } from 'mobx-react';

const OrganizationService = ({ main, request }: OrganizationProps) => {
  React.useEffect(() => {
    request.getClientRequests(main.clientData.client.id);
    request.getClientServiceType();
  }, []);
  const history = useHistory();
  return (
    <>
      <div className='tab-content tab-4'>
        <h3 className='title-subhead mb-16'>Подключенные услуги</h3>
        <table className='table req-table td-frist'>
          <thead>
            <tr>
              <th>Название услуги</th>
              <th>Категория</th>
              <th>Начало услуги</th>
              <th>Окончание услуги</th>
            </tr>
          </thead>
          <tbody>
            {request._getRequests &&
              request._getRequests
                .filter((c: Request) => c.request_status === 7)
                .map((c: Request) => (
                  <tr onClick={() => history.push(`/service/${c.id}`)}>
                    <td>
                      {
                        request._getClientServiceType.find(
                          (t: ServiceCommon) => t.id === c.service_type
                        )?.name
                      }
                    </td>
                    <td>{c.service_category === 1 ? 'БДКИ' : 'ЕСБД'}</td>
                    <td>{moment(c.reg_date).format('DD.MM.YYYY в HH:mm')}</td>
                    <td>
                      {c.fulfill_date &&
                        moment(c.fulfill_date).format('DD.MM.YYYY в HH:mm')}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default observer(OrganizationService);
