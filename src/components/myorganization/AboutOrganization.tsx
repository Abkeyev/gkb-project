import React from 'react';
import { OrganizationProps } from './Organization.props';
import {
  AuthPerson,
  Address,
  Contact,
  AddressTypes,
} from '../../api/Models/ServiceModels';
import moment from 'moment';
import { observer } from 'mobx-react';
import { ReactComponent as Spinner } from '../../styles/spinner.svg';

const AboutOrganization = ({ main, request }: OrganizationProps) => {
  React.useEffect(() => {
    request.getClient(main.clientData.client.id);
    request.getClientTypes();
    request.getAuthPersons(main.clientData.client.id);
    request.getClientContact(main.clientData.client.id);
    request.getClientAddress(main.clientData.client.id);
    request.getClientAddressTypes();
  }, []);
  return (
    <>
      {request?.loader ? (
        <Spinner />
      ) : (
        <>
          <h3 className='title-subhead mb-16'>Об организации</h3>
          {request._getClient && (
            <div className='total-info mb-32'>
              <ul className='info-list'>
                <li>
                  <span className='left'>Полное наименование:</span>
                  <span className='right'>{request._getClient.longname}</span>
                </li>
                <li>
                  <span className='left'>Краткое наименование:</span>
                  <span className='right'>{request._getClient.name}</span>
                </li>
                <li>
                  <span className='left'>БИН:</span>
                  <span className='right'>{request._getClient.bin}</span>
                </li>
                <li>
                  <span className='left'>Вебсайт:</span>
                  <span className='right d-flex'>
                    <a
                      href={request._getClient.website}
                      target='_blank'
                      rel='noreferrer'
                      className='pre-primary-color'
                    >
                      {request._getClient.website}
                    </a>{' '}
                    <span
                      className='edit'
                      onClick={() => {
                        main.setModal(true);
                        main.setModalType(17);
                        main.setModalTypeEdit(0);
                      }}
                    >
                      <i className='azla edit-primary-icon ml-8'></i>
                    </span>
                  </span>
                </li>
                <li>
                  <span className='left'>Тип клиента:</span>
                  <span className='right'>
                    {
                      request._getClientTypes.find(
                        (t: any) => t.id === request._getClient.client_type
                      )?.name
                    }
                  </span>
                </li>
                {request._getAuthPersons &&
                  (request._getAuthPersons as AuthPerson[])
                    .filter((f: AuthPerson) => f.is_main)
                    .map((a: AuthPerson, index: number) => (
                      <>
                        <li key={index}>
                          <span className='left'>Уполномоченное лицо:</span>
                          <span className='right d-flex'>
                            {a.full_name}{' '}
                            <span
                              className='edit'
                              onClick={() => {
                                main.setModal(true);
                                main.setModalType(23);
                              }}
                            >
                              <i className='azla edit-primary-icon ml-8'></i>
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className='left'>Дата регистрации:</span>
                          <span className='right'>
                            {moment(a.reg_date).format('DD.MM.YYYY')}
                          </span>
                        </li>
                      </>
                    ))}
                <li>
                  <span className='left'>ОКЭД:</span>
                  <span className='right'>
                    {main.clientData.client.oked?.map((item: string) => item)}
                  </span>
                </li>
              </ul>
            </div>
          )}

          <h3 className='title-subhead mb-16'>Контакты и адреса</h3>

          <div className='total-info mb-32'>
            <ul className='info-list'>
              {request._getContacts &&
                request._getContacts.map((c: Contact, i: number) => (
                  <li>
                    <span className='left'>{i === 0 && 'Контакты:'}</span>
                    <span className='right d-flex'>
                      {c.phone_number} ({c.phone_type}){' '}
                      <span
                        className='edit'
                        onClick={() => {
                          main.setModal(true);
                          main.setModalType(15);
                          main.setModalTypeEdit(2);
                          main.setModalTypeData(c);
                        }}
                      >
                        <i className='azla edit-primary-icon ml-8'></i>
                      </span>
                    </span>
                  </li>
                ))}
              {request.getAddressTypes() &&
                request.getAddressTypes().map(
                  (t: AddressTypes) =>
                    t.address &&
                    t.address.map((a: Address) => (
                      <li>
                        <span className='left'>{t.name}:</span>
                        <span className='right d-flex'>
                          {a.full_address}{' '}
                          <span
                            className='edit'
                            onClick={() => {
                              main.setModal(true);
                              main.setModalType(15);
                              main.setModalTypeEdit(3);
                              main.setModalTypeData(a);
                            }}
                          >
                            <i className='azla edit-primary-icon ml-8'></i>
                          </span>
                        </span>
                      </li>
                    ))
                )}
              {request._getClientAddress &&
                request._getClientAddress.filter(
                  (a: Address) => a.address_type === 2
                )[0] && (
                  <>
                    <li>
                      <span className='left'>Полный адрес:</span>
                      <span className='right d-flex'>
                        {
                          request._getClientAddress.filter(
                            (a: Address) => a.address_type === 2
                          )[0].full_address
                        }
                      </span>
                    </li>
                    <li>
                      <span className='left'>Индекс:</span>
                      <span className='right d-flex'>
                        {
                          request._getClientAddress.filter(
                            (a: Address) => a.address_type === 2
                          )[0].kato
                        }
                      </span>
                    </li>
                    <li>
                      <span className='left'>Улица:</span>
                      <span className='right d-flex'>
                        {
                          request._getClientAddress.filter(
                            (a: Address) => a.address_type === 2
                          )[0].street
                        }
                      </span>
                    </li>
                    <li>
                      <span className='left'>Дом/здание:</span>
                      <span className='right d-flex'>
                        {
                          request._getClientAddress.filter(
                            (a: Address) => a.address_type === 2
                          )[0].building
                        }
                      </span>
                    </li>
                  </>
                )}
            </ul>
          </div>

          {request._getBankDetails.length > 0 && request._getBankDetails[0] && (
            <>
              <h3 className='title-subhead mb-16'>Банковские реквизиты</h3>

              <div className='total-info mb-32'>
                <ul className='info-list'>
                  <li>
                    <span className='left'>ИИК:</span>
                    <span className='right d-flex'>
                      {request._getBankDetails[0].iik}{' '}
                      <span
                        className='edit'
                        onClick={() => {
                          main.setModal(true);
                          main.setModalType(15);
                          main.setModalTypeEdit(4);
                          main.setModalTypeData(request._getBankDetails[0]);
                        }}
                      >
                        <i className='azla edit-primary-icon ml-8'></i>
                      </span>
                    </span>
                  </li>
                  <li>
                    <span className='left'>БИК:</span>
                    <span className='right d-flex'>
                      {request._getBankDetails[0].bik}{' '}
                      <span
                        className='edit'
                        onClick={() => {
                          main.setModal(true);
                          main.setModalType(15);
                          main.setModalTypeEdit(4);
                          main.setModalTypeData(request._getBankDetails[0]);
                        }}
                      >
                        <i className='azla edit-primary-icon ml-8'></i>
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default observer(AboutOrganization);
