import React, { useEffect, useRef } from 'react';
import 'react-tabs/style/react-tabs.css';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router';
import { Client } from '../api/Models/ServiceModels';
import { ReactComponent as Spinner } from '../styles/spinner.svg';
import ContractorsFilter from '../components/contractors/ContractorsFilter';

const Contractors = observer((props: any) => {
  const { request } = props;
  const [service, setService] = React.useState(false);
  const [bin, setBin] = React.useState('');
  const [services, setServices] = React.useState<number[]>([]);
  const history = useHistory();
  const wrapperRef = useRef<any>(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setService(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);
  useEffect(() => {
    // useOutsideAlerter(wrapperRef);
    request.getClients();
    request.getClientTypes();
  }, []);
  return (
    <div className='main-body'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='create-page p-50 pad-b-128'>
              <div className='header-text-inner justify-content-between'>
                <h1 className='title-main'>
                  Контрагенты
                  <span className='number'> {request._getClients.length}</span>
                </h1>
              </div>

              <ContractorsFilter
                request={request}
                bin={bin}
                setBin={setBin}
                services={services}
                service={service}
                setService={setService}
                setServices={setServices}
                wrapperRef={wrapperRef}
              />

              <div className='partners-page-inner'>
                {request.loader ? (
                  <Spinner />
                ) : (
                  <table className='table req-table td-three'>
                    <thead>
                      <tr>
                        <th>БИН</th>
                        <th>Организации</th>
                        <th>Категория деятельности</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(request._getClients as Client[])
                        .filter(
                          (cc: Client) =>
                            cc.longname.includes(bin) || cc.bin.includes(bin)
                        )
                        .filter((ccc: Client) =>
                          services.length === 0
                            ? true
                            : services.includes(ccc.client_type)
                        )
                        .map((c: Client) => (
                          <tr
                            onClick={() => history.push(`/contractors/${c.id}`)}
                          >
                            <td>{c.bin}</td>
                            <td>{c.longname}</td>
                            <td>
                              {
                                request._getClientTypes.find(
                                  (t: any) => t.id === c.client_type
                                )?.name
                              }
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Contractors;
