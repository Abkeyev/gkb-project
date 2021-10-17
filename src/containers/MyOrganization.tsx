import React from 'react';
import { observer } from 'mobx-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Modal } from '../containers';
import OrganizationDocs from '../components/myorganization/OrganiztionDocs';
import AboutOrganization from './../components/myorganization/AboutOrganization';
import ClientOrganization from '../components/myorganization/ClientOrganization';
import OrganizationService from '../components/myorganization/OrganizationService';
import ServiceUsersOrganization from '../components/myorganization/ServiceUsersOrganization';
import OrganizationFooter from '../components/myorganization/OrganizationFooter';

const MyOrganization = observer((props: any) => {
  const { main, request } = props;

  // React.useEffect(() => {
  //   request.getPosition();
  //   request.getClients();
  //   request.getClient(main.clientData.client.id);
  //   request.getClientUser(main.clientData.client.id);
  //   request.getClientUsersForAdd(main.clientData.client.id);
  //   request.getClientAllUsers(main.clientData.client.id);
  //   request.getClientService();
  //   request.getDocumentsCategories();
  //   request.getClientTypes();
  //   request.getDocumentsType();
  //   request.getClientContact(main.clientData.client.id);
  //   request.getClientAddress(main.clientData.client.id);
  //   request.getAuthPersons(main.clientData.client.id);
  //   request.getClientAddressTypes();
  //   request.getClientBankDetails(main.clientData.client.id);
  //   request.getSigningAuth();
  //   request.getPersonStatus();
  //   request.getClientServiceType();
  //   request.getDocuments(main.clientData.client.id);
  //   request.getClientRequests(main.clientData.client.id);
  // }, []);

  return (
    <>
      {main.isOpenModal && <Modal main={main} request={request} />}
      <div className='main-body'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='my-organization p-50 pad-b-128'>
                <div className='header-text justify-content-between mb-32'>
                  <h1 className='title-main'>Моя организация</h1>
                </div>
                <Tabs>
                  <div className='mb-32'>
                    <TabList
                      value={request.tab}
                      onClick={(e: any) => (request.tab = e.target.value)}
                    >
                      <Tab value={0}>Общее</Tab>
                      <Tab value={1}>Документы</Tab>
                      <Tab value={2}>Пользователи</Tab>
                      <Tab value={3}>Подключенные услуги</Tab>
                      <Tab value={4}>Пользователи услуг</Tab>
                    </TabList>
                  </div>
                  <div className='req-inner-body pad-b-128'>
                    <TabPanel>
                      <AboutOrganization main={main} request={request} />
                    </TabPanel>
                    <TabPanel>
                      <OrganizationDocs main={main} request={request} />
                    </TabPanel>
                    <TabPanel>
                      <ClientOrganization main={main} request={request} />
                    </TabPanel>
                    <TabPanel>
                      <OrganizationService main={main} request={request} />
                    </TabPanel>
                    <TabPanel>
                      <ServiceUsersOrganization main={main} request={request} />
                    </TabPanel>
                  </div>
                </Tabs>
                <OrganizationFooter main={main} request={request} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
export default MyOrganization;
