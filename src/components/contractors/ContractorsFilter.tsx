import { observer } from 'mobx-react';
import React from 'react';
import { ContractorsProps } from './ContractorsProps.props';

const ContractorsFilter = ({
  request,
  bin,
  setBin,
  service,
  setService,
  wrapperRef,
  services,
  setServices,
}: ContractorsProps) => {
  const [search, setSearch] = React.useState('');
  return (
    <div className='filter mb-24'>
      <div className='row'>
        <div className='col-md-9'>
          <div className='filter-search'>
            <div className='form-group w-100 mr-16 mb-0'>
              <input
                className='form-control azla form-icon search-icon'
                type='name'
                placeholder='Поиск по названию, БИН'
                defaultValue={bin}
                onChange={(e) => setBin(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='col-md-3'>
          <div
            className={`multi js-multi-buttons side-r ${service ? 'open' : ''}`}
            ref={wrapperRef}
          >
            <div className='input-wrapper'>
              <input
                className='multi-input azla form-icon chevron-down-icon'
                type='text'
                placeholder='Выбрать'
                defaultValue={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => {
                  e.preventDefault();
                  setService(true);
                }}
              />
            </div>
            <div className='multi-menu'>
              <div className='multi-option option-current'>
                {request._getClientTypes
                  .filter((c: any) =>
                    c.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((t: any) => (
                    <div className='multi-list'>
                      <div className='form-check gkb-checkbox'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          checked={services.includes(t.id)}
                          onClick={() =>
                            !services.includes(t.id)
                              ? setServices([...services, t.id])
                              : setServices([
                                  ...services.filter((s: any) => s !== t.id),
                                ])
                          }
                          id={`clientType${t.id}`}
                          required
                        />
                        <label
                          className='form-check-label'
                          htmlFor={`clientType${t.id}`}
                        >
                          {t.name}
                        </label>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(ContractorsFilter);
