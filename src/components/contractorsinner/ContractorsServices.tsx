import { observer } from 'mobx-react';
import React from 'react';
import { ContractorsInnerProps } from './ContractorsInnerProps.props';
import { ServiceCommon, Request } from '../../api/Models/ServiceModels';
import moment from 'moment';
import { useHistory } from 'react-router';
import { ReactComponent as Spinner } from '../../styles/spinner.svg';

const ContractorsServices = ({ id, request }: ContractorsInnerProps) => {
  const history = useHistory();
  React.useEffect(() => {
    request.getClientRequests(id);
  }, []);
  return request.loader ? (
    <Spinner />
  ) : (
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
                    <td>{c.service_category === 1 ? 'ЕСБД' : 'БДКИ'}</td>
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

export default observer(ContractorsServices);
