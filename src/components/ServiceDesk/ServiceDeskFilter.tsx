import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { ServiceCommon } from '../../api/Models/ServiceModels';
import { RequestFilterProps } from '../request/RequestProps.props';

const ServiceDeskFilter = ({
  request,
  service,
  category,
  setServices,
  setCategories,
  setBin,
  setSortTitle,
  catRef,
  bin,
  setCategory,
  categories,
  services,
  setService,
  serviceRef,
  sortTitle,
}: RequestFilterProps) => {
  const [searchService, setSearchService] = useState<string>('');
  const [advance, setAdvance] = useState(false);
  const [sort, setSort] = useState(false);
  const [date, setDate] = useState(false);
  return (
    <div className='filter mb-24'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='filter-search'>
            <div className='form-group mr-16 mb-0'>
              <input
                className='form-control azla form-icon search-icon'
                type='name'
                placeholder='Поиск по названию, БИН'
                defaultValue={bin}
                onChange={(e) => setBin(e.target.value)}
              />
            </div>
            <button
              className='btn-s btn-secondary btn-icon col-md-3'
              onClick={() => setAdvance(!advance)}
            >
              <i className='azla filter-icon'></i> Расширенный поиск
            </button>
          </div>
        </div>

        <div
          className={`col-md-12 filter-content ${advance ? 'view' : ''}`}
          onClick={() => {
            sort && setSort(false);
          }}
        >
          {/* Класс "view" добавляется при нажатии "Расширенный поиск" */}
          <div className='filter-inputs'>
            <div className='form-multiselect mb-0 mr-16'>
              <div
                className={`multi js-multi-buttons ${category ? 'open' : ''}`}
                ref={catRef}
              >
                <div className='input-wrapper'>
                  <input
                    className='multi-input azla form-icon chevron-down-icon'
                    type='text'
                    placeholder='Выберите категорию деятельности'
                    readOnly
                    onClick={(e) => {
                      e.preventDefault();
                      setCategory(true);
                    }}
                  />
                  <label className='label'>Категория деятельности</label>
                </div>
                <div className='multi-menu'>
                  <div className='multi-search'>
                    <input
                      type='search'
                      className='azla form-icon search-icon'
                      placeholder='Поиск'
                      value={searchService}
                      onChange={(e) => setSearchService(e.target.value)}
                    />
                  </div>
                  {request._getClientTypes
                    .filter((f: ServiceCommon) =>
                      f.name.includes(searchService)
                    )
                    .map((t: ServiceCommon, index: number) => (
                      <div className='multi-option option-current'>
                        <div className='multi-list'>
                          <div className='form-check gkb-checkbox'>
                            <input
                              className='form-check-input'
                              type='checkbox'
                              checked={categories.includes(t.id)}
                              onClick={() => {
                                !categories.includes(t.id)
                                  ? setCategories([...categories, t.id])
                                  : setCategories([
                                      ...categories.filter(
                                        (s: any) => s !== t.id
                                      ),
                                    ]);
                              }}
                              id={`catCheck${t.id}`}
                              required
                            />
                            <label
                              className='form-check-label'
                              htmlFor={`catCheck${t.id}`}
                            >
                              {t.name}
                            </label>
                            <div className='invalid-feedback'>Ошибка</div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className='form-multiselect mb-0 mr-16'>
              <div
                className={`multi js-multi-buttons ${service ? 'open' : ''}`}
                ref={serviceRef}
              >
                <div className='input-wrapper'>
                  <input
                    className='multi-input azla form-icon chevron-down-icon'
                    type='text'
                    placeholder='Выберите тип сервиса'
                    readOnly
                    onClick={(e) => {
                      e.preventDefault();
                      !service && setService(true);
                    }}
                  />
                  <label className='label'>Тип сервиса</label>
                </div>
                <div className='multi-menu'>
                  <div className='multi-search'>
                    <input
                      type='search'
                      className='azla form-icon search-icon'
                      placeholder='Поиск'
                      value={searchService}
                      onChange={(e) => setSearchService(e.target.value)}
                    />
                  </div>
                  {request._getClientServiceType
                    .filter((f: ServiceCommon) =>
                      f.name.includes(searchService)
                    )
                    .map((t: ServiceCommon, index: number) => (
                      <div className='multi-option option-current'>
                        <div className='multi-list'>
                          <div className='form-check gkb-checkbox'>
                            <input
                              className='form-check-input'
                              type='checkbox'
                              checked={services.includes(t.id)}
                              onClick={() => {
                                !services.includes(t.id)
                                  ? setServices([...services, t.id])
                                  : setServices([
                                      ...services.filter(
                                        (s: any) => s !== t.id
                                      ),
                                    ]);
                              }}
                              id={`serviceCheck${t.id}`}
                              required
                            />
                            <label
                              className='form-check-label'
                              htmlFor={`serviceCheck${t.id}`}
                            >
                              {t.name}
                            </label>
                            <div className='invalid-feedback'>Ошибка</div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className='form-multiselect mb-0'>
              <div
                className={`multi js-multi-buttons ${date ? 'open' : ''}`}
                onClick={() => setDate(!date)}
              >
                <div className='input-wrapper'>
                  <input
                    className='multi-input azla form-icon chevron-down-icon'
                    type='text'
                    placeholder='Выберите тип сортировки'
                    value={sortTitle}
                    readOnly
                  />
                  <label className='label'>Сортировать</label>
                </div>
                <div className='multi-menu'>
                  <div className='multi-option option-current'>
                    <div className='multi-list'>
                      <span
                        className='multi-option-select'
                        onClick={() => setSortTitle('сначала новые')}
                      >
                        сначала новые
                      </span>
                    </div>
                    <div className='multi-list'>
                      <span
                        className='multi-option-select'
                        onClick={() => setSortTitle('сначала старые')}
                      >
                        сначала старые
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='filter-btns'>
            <button type='button' className='button btn-primary mr-16'>
              Применить
            </button>
            <button
              type='button'
              className='button btn-secondary btn-icon'
              onClick={() => {
                setServices([]);
                setCategories([]);
                setSortTitle('');
              }}
            >
              <i className='azla close-primary-icon'></i>
              Убрать фильтры
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(ServiceDeskFilter);
