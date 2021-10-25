import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import ContractorsAbout from '../components/contractorsinner/ContractorsAbout';
import ContractorsDocs from '../components/contractorsinner/ContractorsDocs';
import ContractorsUsers from '../components/contractorsinner/ContractorsUsers';
import ContractorsServices from '../components/contractorsinner/ContractorsServices';
import ContractorsServiceUsers from '../components/contractorsinner/ContractorsServiceUsers';

const ContractorsInner = observer((props: any) => {
  const { main, request } = props;
  const { id } = props.match.params;
  const history = useHistory();

  React.useEffect(() => {
    request.getClientUsersForAdd(id);
    request.getClientService();
    request.getClientContact(id);
    request.getClientAddress(id);
    request.getClientAddressTypes();
    request.getClientBankDetails(id);
    request.getSigningAuth();
    request.getPersonStatus();
    request.getClientServiceType();
  }, []);
  return (
    <div className='main-body'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='my-organization p-50 pad-b-128'>
              {request._getClient && (
                <div className='header-text-inner justify-content-between mb-32'>
                  <div className='back-breadcrumbs'>
                    <div onClick={() => history.goBack()} className='back'>
                      <i className='azla arrow-left-icon'></i> Назад
                    </div>
                    <div className='breadcrumbs'>
                      <Link to='/contractors'>Контрагенты</Link> /{' '}
                      <span>{request._getClient.longname}</span>
                    </div>
                  </div>

                  <h1 className='title-main mb-32'>
                    {request._getClient.longname}
                  </h1>
                </div>
              )}
              <Tabs>
                <div className='mb-32'>
                  <TabList>
                    <Tab>Общее</Tab>
                    <Tab>Документы</Tab>
                    <Tab>Пользователи</Tab>
                    <Tab>Подключенные услуги</Tab>
                    <Tab>Пользователи услуг</Tab>
                  </TabList>
                </div>
                <div className='req-inner-body pad-b-128'>
                  <TabPanel>
                    <ContractorsAbout id={id} main={main} request={request} />
                  </TabPanel>

                  <TabPanel>
                    <ContractorsDocs id={id} request={request} />
                  </TabPanel>

                  <TabPanel>
                    <ContractorsUsers id={id} main={main} request={request} />
                  </TabPanel>
                  <TabPanel>
                    <ContractorsServices id={id} request={request} />
                  </TabPanel>
                  <TabPanel>
                    <ContractorsServiceUsers id={id} request={request} />
                  </TabPanel>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default ContractorsInner;
