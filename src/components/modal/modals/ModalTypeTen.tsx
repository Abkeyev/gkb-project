import React from 'react';
import { ModalTypes } from './ModalTypes.props';
import BaseModal from '../BaseModal';
import { ClientUser, ServiceCommon } from '../../../api/Models/ServiceModels';
import { observer } from 'mobx-react';

const ModalTypeOne = ({ main, request }: ModalTypes) => {
  const [search, setSearch] = React.useState('');
  const [users, setUsers] = React.useState<ClientUser[]>(main.usersNew);

  React.useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <BaseModal size={'modal-large-xl'} main={main}>
      <div className='modal-body'>
        <div className='paper-signatory'>
          <div className='d-flex align-items-center mb-16'>
            <h3 className='text-left title-subhead mb-0'>
              Добавить пользователей услуг
            </h3>
            <button
              className='button btn-secondary ml-24'
              onClick={() => {
                main.setModal(true);
                main.setModalType(11);
              }}
            >
              <i className='azla user-add-primary-icon size-20'></i> Новый
              пользователь
            </button>
          </div>

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
              {request._getClientUsersForAdd &&
                (request._getClientUsersForAdd as ClientUser[])
                  .filter((f: ClientUser) => f.full_name.includes(search))
                  .map((r: ClientUser) => (
                    <li key={r.id}>
                      <div className='profile'>
                        <div className='form-check gkb-checkbox'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            checked={
                              users.filter((u: ClientUser) => u.id === r.id)
                                .length > 0
                            }
                            onChange={() => {
                              console.log(
                                users.filter((u: ClientUser) => u.id === r.id)
                                  .length > 0
                              );
                              users.filter((u: ClientUser) => u.id === r.id)
                                .length > 0
                                ? setUsers([
                                    ...users.filter(
                                      (u: ClientUser) => r.id !== u.id
                                    ),
                                  ])
                                : setUsers([...users, r]);
                            }}
                            id={`input${r.id}`}
                            required
                          />
                          <label
                            className='form-check-label'
                            htmlFor={`input${r.id}`}
                          >
                            <img
                              className='ava'
                              src={
                                process.env.PUBLIC_URL + '/images/def-ava.svg'
                              }
                            />
                            <span className='name'>{r.full_name}</span>
                          </label>
                        </div>
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

      <div className='modal-footer d-flex-align-c-spaceb'>
        <p className='text-desc mb-0'>Выбрано {users.length} участника</p>
        <div className='paper-signatory-footer'>
          <button
            type='button'
            className='button btn-secondary w-160 mr-16'
            onClick={() => setUsers([])}
          >
            Очистить
          </button>
          <button
            type='button'
            onClick={() => {
              main.setModal(false);
              main.setNewUsers(users);
            }}
            className='button btn-primary w-160'
          >
            Добавить
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default observer(ModalTypeOne);
