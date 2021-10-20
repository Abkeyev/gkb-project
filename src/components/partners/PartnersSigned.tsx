import React from 'react';
import { observer } from 'mobx-react';
import { PartnersProps } from './PartnersProps.props';
import { Request, ServiceCommon } from '../../api/Models/ServiceModels';
import moment from 'moment';
import { useHistory } from 'react-router';

const PartnersSigned = ({ filter, request }: PartnersProps) => {
  const history = useHistory();
  return (
    <>
      <div className='tab-content tab-2'>
        <h3 className='title-subhead mb-16'>
          На подпись <span className='number'>{filter([9]).length}</span>
        </h3>
        {filter([9]).length === 0 ? (
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
              {filter([9]).map((r: Request) => (
                <tr onClick={() => history.push(`/partner/${r.id}`)}>
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
          Активные <span className='number'>{filter([6]).length}</span>
        </h3>
        {filter([6]).length === 0 ? (
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
              {filter([6]).map((r: Request) => (
                <tr onClick={() => history.push(`/partner/${r.id}`)}>
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
                  <td>{moment(r.reg_date).format('DD.MM.YYYY')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default observer(PartnersSigned);
