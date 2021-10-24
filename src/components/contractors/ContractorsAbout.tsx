import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { ContractorsProps } from './ContractorsProps.props';
import {
  Contact,
  AuthPerson,
  Address,
  AddressTypes,
} from '../../api/Models/ServiceModels';
import moment from 'moment';
const ContractorsAbout = ({ id, request }: ContractorsProps) => {
  useEffect(() => {
    request.getAuthPersons(id);
    request.getPosition();
    request.getClient(id);
    request.getClientUser(id);
  }, []);
  return (
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
                </a>
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
                .map((a: AuthPerson) => (
                  <>
                    <li>
                      <span className='left'>Уполномоченное лицо:</span>
                      <span className='right d-flex'>{a.full_name}</span>
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
              <span className='right'>{request._getClient.oked}</span>
            </li>
          </ul>
        </div>
      )}

      <h3 className='title-subhead mb-16'>Контакты и адреса</h3>

      <div className='total-info mb-32'>
        <ul className='info-list'>
          {request._getContacts &&
            request._getContacts
              .filter((c: Contact) => c.is_main)
              .map((c: Contact, i: number) => (
                <li>
                  <span className='left'>{i === 0 && 'Контакты:'}</span>
                  <span className='right d-flex'>
                    {c.phone_number} ({c.phone_type})
                  </span>
                </li>
              ))}
          {request.getAddressTypes().length > 0 &&
            request.getAddressTypes().map(
              (t: AddressTypes) =>
                t.address.length > 0 &&
                t.address.map((a: Address) => (
                  <li>
                    <span className='left'>{t.name}:</span>
                    <span className='right d-flex'>{a.full_address}</span>
                  </li>
                ))
            )}

          {request._getClientAddress &&
            request._getClientAddress
              .filter((a: Address) => a.id === 2)
              .map((c: Address) => (
                <>
                  <li>
                    <span className='left'>Полный адрес:</span>
                    <span className='right d-flex'>{c.full_address}</span>
                  </li>
                  <li>
                    <span className='left'>Индекс:</span>
                    <span className='right d-flex'>{c.kato}</span>
                  </li>
                  <li>
                    <span className='left'>Улица:</span>
                    <span className='right d-flex'>{c.street}</span>
                  </li>
                  <li>
                    <span className='left'>Дом/здание:</span>
                    <span className='right d-flex'>{c.building}</span>
                  </li>
                </>
              ))}
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
                  {request._getBankDetails[0].iik}
                </span>
              </li>
              <li>
                <span className='left'>БИК:</span>
                <span className='right d-flex'>
                  {request._getBankDetails[0].bik}
                </span>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default observer(ContractorsAbout);
