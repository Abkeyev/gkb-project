import React from 'react';
import BaseModal from '../BaseModal';
import { ModalTypes } from './ModalTypes.props';
import { AuthPerson, ServiceCommon } from '../../../api/Models/ServiceModels';

const ModalTypeTwentyThree = ({ main, request }: ModalTypes) => {
  const [search, setSearch] = React.useState('');
  return (
    <BaseModal main={main} size={`modal-large`}>
      <div className='modal-body'>
        <div className='add-manager'>
          <h3 className='text-left title-subhead'>
            Назначить уполномоченное лицо
          </h3>
          <div className='search-input'>
            <input
              type='text'
              className='search-icon'
              placeholder='Поиск'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className='manager-list'>
            <ul>
              {request._getAuthPersons &&
                (request._getAuthPersons as AuthPerson[])
                  .filter((f: AuthPerson) =>
                    f.full_name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((r: AuthPerson) => (
                    <li
                      onClick={() => {
                        request
                          .setAuthPersons(r.id, {
                            ...r,
                            is_main: true,
                          })
                          .then(() => main.setModal(false));
                      }}
                    >
                      <div className='profile'>
                        <img
                          alt='ava'
                          className='ava'
                          src={process.env.PUBLIC_URL + '/images/def-ava.svg'}
                        />
                        <span className='name'>{r.full_name}</span>
                      </div>
                      <span className='position'>
                        {r.position &&
                          request._getPosition.find(
                            (t: ServiceCommon) => t.id === r.position
                          )?.name}
                      </span>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default ModalTypeTwentyThree;
