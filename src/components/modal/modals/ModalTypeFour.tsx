import React from 'react';
import { ModalTypes } from './ModalTypes.props';
import BaseModal from '../BaseModal';
import { ServiceCommon, User } from '../../../api/Models/ServiceModels';
import { observer } from 'mobx-react';

const ModalTypeFour = ({ main, request }: ModalTypes) => {
  const [search, setSearch] = React.useState('');
  const [user, setUser] = React.useState<number[]>([]);
  return (
    <BaseModal main={main} size={`modal-large-xl`}>
      <div className='modal-body'>
        <div className='paper-signatory'>
          <h3 className='text-left title-subhead mb-16'>
            Участники согласования
          </h3>

          <div className='search-input'>
            <input
              type='text'
              className='search-icon'
              defaultValue={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Поиск'
            />
          </div>

          <div className='manager-list'>
            <ul>
              {request._getSigners
                .filter((f: User) =>
                  f.full_name.toLowerCase().includes(search.toLowerCase())
                )
                .map(
                  (c: User) =>
                    !request.agreeGroup[request.requestId].user_name.includes(
                      c.id
                    ) && (
                      <li>
                        <div className='profile'>
                          <div className='form-check gkb-checkbox'>
                            <input
                              className='form-check-input'
                              type='checkbox'
                              checked={user.includes(c.id)}
                              defaultChecked={user.includes(c.id)}
                              id={`invalidCheck${c.id}`}
                              onClick={() => {
                                !user.includes(c.id)
                                  ? setUser([...user, c.id])
                                  : setUser([
                                      ...user.filter((s) => s !== c.id),
                                    ]);
                              }}
                              required
                            />
                            <label
                              className='form-check-label'
                              htmlFor={`invalidCheck${c.id}`}
                            >
                              <img
                                alt='ava'
                                className='ava'
                                src={
                                  process.env.PUBLIC_URL + '/images/def-ava.svg'
                                }
                              />
                              <span className='name'>{c.full_name}</span>
                            </label>
                          </div>
                        </div>
                        <span className='position'>
                          {
                            request._getPosition.find(
                              (t: ServiceCommon) => t.id === c.position
                            )?.name
                          }
                        </span>
                      </li>
                    )
                )}
            </ul>
          </div>
        </div>
      </div>
      <div className='modal-footer d-flex-align-c-spaceb'>
        <p className='text-desc mb-0'>Выбрано {user.length} участника</p>
        <div className='paper-signatory-footer'>
          <button
            type='button'
            className='button btn-secondary w-160 mr-16'
            onClick={() => setUser([])}
          >
            Очистить
          </button>
          <button
            type='button'
            onClick={() => {
              main.setModal(false);
              if (request.requestId !== null)
                request.agreeGroup[request.requestId] = {
                  ...request.agreeGroup[request.requestId],
                  user_name: [
                    ...request.agreeGroup[request.requestId].user_name,
                    ...user,
                  ],
                };
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

export default observer(ModalTypeFour);
