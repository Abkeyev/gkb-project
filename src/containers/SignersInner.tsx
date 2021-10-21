import React from 'react';
import 'react-tabs/style/react-tabs.css';
import { Link, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Modal } from '.';
import SignersInnerFirstStep from '../components/signersinner/SignersInnerFirstStep';
import SignersInnerSecondStep from '../components/signersinner/SignersInnerSecondStep';
import SignersInnerThirdStep from '../components/signersinner/SignersInnerThirdStep';
import SignersInnerFourthStep from '../components/signersinner/SignersInnerFourthStep';
import SignersInnerFifthStep from '../components/signersinner/SignersInnerFifthStep';
import SignersInnerStatusBar from '../components/signersinner/SignersInnerStatusBar';

const SignersInner = observer((props: any) => {
  const history = useHistory();
  const { id } = props.match.params;
  const { main, request } = props;

  React.useEffect(() => {
    request.getClientServiceType();
    request.getClients();
    request.getUsers();
    request.getRequestStatus();
    request.getDocumentsCategories();
    request.getDocumentsType();
    request.getDocuments(main.clientData.client.id);
    request.getClientTypes();
    request.getRequest(id);
  }, []);

  return (
    <>
      {main.isOpenModal && <Modal main={main} request={request} />}
      <div className='main-body'>
        {request._getRequest && (
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='req-manager-inner p-16-50 pad-b-128'>
                  <div className='req-inner-header'>
                    <div className='back-breadcrumbs'>
                      <div onClick={() => history.goBack()} className='back'>
                        <i className='azla arrow-left-icon'></i> Назад
                      </div>
                      <div className='breadcrumbs'>
                        <Link to='/'>Заявки</Link> /{' '}
                        <span>Заявка №{request._getRequest.id}</span>
                      </div>
                    </div>

                    <h1 className='title-main mb-32'>
                      Заявка №{request._getRequest.id} -{' '}
                      {request._getClient &&
                        request._getClient.longname &&
                        request._getClient.longname}
                    </h1>

                    {(request._getRequest.request_status === 4 ||
                      request._getRequest.request_status === 3) && (
                      <div className='mess-card alert-mess mb-32 col-md-8'>
                        <h5>Заявка отклонена менеджером</h5>
                        <p>Причина: {request._getRequest.client_comment}</p>
                      </div>
                    )}

                    <SignersInnerStatusBar request={request} />
                  </div>

                  {request._getRequest.request_status === 10 &&
                  request._getRequest.request_stepper === 3 ? (
                    <div className='mess-card mb-32 col-md-8'>
                      Пожалуйста, ожидайте. Заявленная форма доступа проверяется
                      департаментом Servicedesk.
                    </div>
                  ) : request._getRequest.request_status === 3 &&
                    request._getRequest.request_status === 4 ? (
                    ''
                  ) : request._getRequest.request_status === 6 &&
                    request._getRequest.request_status === 9 ? (
                    <div className='mess-card mb-32 col-md-8'>
                      Договор отправлен на подписание. Пожалуйста, ожидайте
                      подписания документа представителями контрагента и АО
                      “Государственное Кредитное Бюро”.
                    </div>
                  ) : request._getRequest.request_status === 2 ? (
                    <div className='mess-card mb-32 col-md-8'>
                      Данная заявка проходит первичную проверку менеджером.
                      Пожалуйста, ожидайте. Среднее время проверки составляет 1
                      день.
                    </div>
                  ) : request._getRequest.request_status === 1 ? (
                    <div className='mess-card mb-32 col-md-8'>
                      Менеджер заявки готовит ваш договор на рассмотрение.
                      Приложенный договор вы увидите в секции “История изменения
                      договора”. Вы так же можете добавлять/изменять договор и
                      выносить его на расмотрение загрузив файл в систему.
                    </div>
                  ) : (
                    ''
                  )}

                  {request.step === 1 ? (
                    <SignersInnerFirstStep request={request} />
                  ) : request.step === 2 ? (
                    <SignersInnerSecondStep main={main} request={request} />
                  ) : request.step === 3 ? (
                    <SignersInnerThirdStep main={main} request={request} />
                  ) : request.step === 4 ? (
                    <SignersInnerFourthStep request={request} />
                  ) : request.step === 5 ? (
                    <SignersInnerFifthStep request={request} />
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
});
export default SignersInner;
