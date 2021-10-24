import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Link, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Categories,
  Client,
  ClientUsers,
  Documents,
  ServiceCommon,
} from '../api/Models/ServiceModels';
import ServiceInnerGeneral from '../components/serviceinner/ServiceInnerGeneral';
import ServiceInnerUsers from '../components/serviceinner/ServiceInnerUsers';

const ServiceInner = observer((props: any) => {
  const history = useHistory();
  const { id } = props.match.params;
  const { request, main } = props;

  React.useEffect(() => {
    request.getRequest(id);
  }, []);

  return (
    <div className='main-body'>
      <div className='container'>
        {request._getRequest && (
          <div className='row'>
            <div className='col-lg-12'>
              <div className='my-organization p-50 pad-b-128'>
                <div className='header-text-inner justify-content-between mb-32'>
                  <div className='back-breadcrumbs'>
                    <div onClick={() => history.goBack()} className='back'>
                      <i className='azla arrow-left-icon'></i> Назад
                    </div>
                    <div className='breadcrumbs'>
                      <Link to='/organization'>Моя организация</Link> /{' '}
                      <span>Подключенные услуги</span>
                    </div>
                  </div>

                  <h1 className='title-main mb-32'>
                    {
                      request._getClientServiceType.find(
                        (t: ServiceCommon) =>
                          t.id === request._getRequest.service_type
                      )?.name
                    }
                  </h1>
                </div>
                <Tabs>
                  <div className='mb-32'>
                    <TabList>
                      <Tab>Общее</Tab>
                      <Tab>Пользователи услуг</Tab>
                    </TabList>
                  </div>
                  <div className='req-inner-body pad-b-128'>
                    <TabPanel>
                      <ServiceInnerGeneral request={request} />
                    </TabPanel>

                    <TabPanel>
                      <ServiceInnerUsers request={request} />
                    </TabPanel>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
export default ServiceInner;
