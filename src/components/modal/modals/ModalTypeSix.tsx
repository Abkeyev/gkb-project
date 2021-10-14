import React from 'react';
import { ModalTypes } from './ModalTypes.props';
import BaseModal from '../BaseModal';
import { ServiceCommon, User } from '../../../api/Models/ServiceModels';

const ModalTypeSix = ({ main, request }: ModalTypes) => {
  const [search, setSearch] = React.useState('');
  return (
    <BaseModal main={main} size={`modal-large-xl`}>
      <div className='modal-body'>
        <div className='add-manager'>
          <h3 className='text-left title-subhead'>Назначить менеджера</h3>
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
              {request._getSigners &&
                (request._getSigners as User[])
                  .filter((f: User) =>
                    f.full_name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((r: User) => (
                    <li
                      onClick={() =>
                        request
                          .updateRequest({
                            manager_signer_user: r.id,
                            client: request._getRequest.client.id,
                          })
                          .then((r: any) => main.setModal(false))
                      }
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
                        {
                          request._getPosition.find(
                            (t: ServiceCommon) => t.id === r.position
                          )?.name
                        }
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

export default ModalTypeSix;
