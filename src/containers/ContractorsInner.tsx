import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router';
import {
  Address,
  AddressTypes,
  AuthPerson,
  Categories,
  Client,
  ClientService,
  ClientUsers,
  Contact,
  Documents,
  ServiceCommon,
  User,
  Request,
} from '../api/Models/ServiceModels';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ContractorsAbout from '../components/contractors/ContractorsAbout';
import ContractorsDocs from '../components/contractors/ContractorsDocs';
import ContractorsUsers from '../components/contractors/ContractorsUsers';
import ContractorsServices from '../components/contractors/ContractorsServices';
import ContractorsServiceUsers from '../components/contractors/ContractorsServiceUsers';

const ContractorsInner = observer((props: any) => {
  const { main, request } = props;
  const { id } = props.match.params;
  const history = useHistory();

  React.useEffect(() => {
    request.getPosition();
    request.getClient(id);
    request.getClientUser(id);
    request.getClientUsersForAdd(id);
    request.getClientAllUsers(id);
    request.getClientService();
    request.getDocumentsCategories();
    request.getClientTypes();
    request.getDocumentsType();
    request.getClientContact(id);
    request.getClientAddress(id);
    request.getAuthPersons(id);
    request.getClientAddressTypes();
    request.getClientBankDetails(id);
    request.getSigningAuth();
    request.getPersonStatus();
    request.getClientServiceType();
    request.getDocuments(id);
    request.getClientRequests(id);
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
                    <ContractorsAbout main={main} request={request} />
                  </TabPanel>

                  <TabPanel>
                    <ContractorsDocs request={request} />
                  </TabPanel>

                  <TabPanel>
                    <ContractorsUsers main={main} request={request} />
                  </TabPanel>
                  <TabPanel>
                    <ContractorsServices request={request} />
                  </TabPanel>
                  <TabPanel>
                    <ContractorsServiceUsers request={request} />
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
