import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { ServiceCommon, ServiceDesk } from '../api/Models/ServiceModels';
import { OnClickOutside } from '../utils/utils';
import moment from 'moment';

const Manager = observer((props: any) => {
  const { main, request } = props;
  const [advance, setAdvance] = React.useState(false);
  const [sort, setSort] = React.useState(false);
  const [date, setDate] = React.useState(false);
  const [service, setService] = React.useState(false);
  const [services, setServices] = React.useState<number[]>([]);
  const [sortTitle, setSortTitle] = React.useState('');
  const [bin, setBin] = React.useState<string>('');
  const [category, setCategory] = React.useState(false);
  const [categories, setCategories] = React.useState<number[]>([]);
  const [searchService, setSearchService] = React.useState<string>('');
  const catRef = React.useRef<any>(null);
  const serviceRef = React.useRef<any>(null);

  React.useEffect(() => {
    request.getRequests();
    request.getMineRequest(main.clientData.user.id);
    request.getClients();
    request.getClientServiceType();
    request.getClientTypes();
  }, []);

  OnClickOutside(catRef, () => setCategory(false));
  OnClickOutside(serviceRef, () => setService(false));

  React.useEffect(() => {
    request.getServiceDesk();
  }, []);

  const filterRequests = (type: number[] = []) => {
    const req = request._getServiceDesk.slice().reverse();
    if (sortTitle === 'сначала старые') req.reverse();
    return req.length > 0
      ? req.filter(
          (cc: ServiceDesk) =>
            cc.full_name
              .toLocaleLowerCase()
              .includes(bin.toLocaleLowerCase()) ||
            cc.bin.toLocaleLowerCase().includes(bin.toLocaleLowerCase())
        )
      : [];
  };

  return (
    <div className='main-body'>
      <div className='container'>
        <div className='row'>
          {request._getServiceDesk && (
            <div className='col-lg-12'>
              <div className='user-services p-50'>
                <h1 className='title-main text-left mb-0'>
                  Пользователи сервисов
                  <span className='number ml-8'>
                    {request._getServiceDesk.length}
                  </span>
                </h1>

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
                      className={`col-md-12 filter-content ${
                        advance ? 'view' : ''
                      }`}
                      onClick={() => {
                        sort && setSort(false);
                      }}
                    >
                      {/* Класс "view" добавляется при нажатии "Расширенный поиск" */}
                      <div className='row mt-16 mb-16'>
                        <div className='col-md-4 pad-rl-16 mb-16'>
                          <div className='form-multiselect mb-0'>
                            <div
                              className={`multi js-multi-buttons ${
                                category ? 'open' : ''
                              }`}
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
                                <label className='label'>
                                  Категория деятельности
                                </label>
                              </div>
                              <div className='multi-menu'>
                                <div className='multi-option option-current'>
                                  <div className='multi-list'>
                                    <div className='form-check gkb-checkbox'>
                                      <input
                                        className='form-check-input'
                                        type='checkbox'
                                        checked={categories.includes(1)}
                                        onClick={() => {
                                          !categories.includes(1)
                                            ? setCategories([...categories, 1])
                                            : setCategories([
                                                ...categories.filter(
                                                  (s) => s !== 1
                                                ),
                                              ]);
                                        }}
                                        id={`categoryCheck1`}
                                        required
                                      />
                                      <label
                                        className='form-check-label'
                                        htmlFor={`categoryCheck1`}
                                      >
                                        ЕСБД
                                      </label>
                                    </div>
                                  </div>
                                </div>

                                <div className='multi-option option-current'>
                                  <div className='multi-list'>
                                    <div className='form-check gkb-checkbox'>
                                      <input
                                        className='form-check-input'
                                        type='checkbox'
                                        checked={categories.includes(2)}
                                        onClick={() => {
                                          !categories.includes(2)
                                            ? setCategories([...categories, 2])
                                            : setCategories([
                                                ...categories.filter(
                                                  (s) => s !== 2
                                                ),
                                              ]);
                                        }}
                                        id={`categoryCheck2`}
                                        required
                                      />
                                      <label
                                        className='form-check-label'
                                        htmlFor={`categoryCheck2`}
                                      >
                                        БДКИ
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='col-md-4 pad-rl-16'>
                          <div className='form-multiselect mb-0'>
                            <div
                              className={`multi js-multi-buttons ${
                                service ? 'open' : ''
                              }`}
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
                                    onChange={(e) =>
                                      setSearchService(e.target.value)
                                    }
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
                                                ? setServices([
                                                    ...services,
                                                    t.id,
                                                  ])
                                                : setServices([
                                                    ...services.filter(
                                                      (s) => s !== t.id
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
                                          <div className='invalid-feedback'>
                                            Ошибка
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='col-md-4 pad-rl-16'>
                          <div className='form-multiselect mb-0'>
                            <div
                              className={`multi js-multi-buttons ${
                                date ? 'open' : ''
                              }`}
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
                                      onClick={() =>
                                        setSortTitle('сначала новые')
                                      }
                                    >
                                      сначала новые
                                    </span>
                                  </div>
                                  <div className='multi-list'>
                                    <span
                                      className='multi-option-select'
                                      onClick={() =>
                                        setSortTitle('сначала старые')
                                      }
                                    >
                                      сначала старые
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='col-md-4 pad-rl-16'>
                          <div className='form-multiselect mb-0'>
                            <div className='multi js-multi-buttons'>
                              <div className='input-wrapper'>
                                <input
                                  className='no-icon'
                                  type='date'
                                  placeholder='Дата начала сервиса'
                                />
                                <label className='label'>Начало сервиса</label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='col-md-4 pad-rl-16'>
                          <div className='form-multiselect mb-0'>
                            <div className='multi js-multi-buttons'>
                              <div className='input-wrapper'>
                                <input
                                  className='no-icon'
                                  type='date'
                                  placeholder='Дата окончания сервиса'
                                />
                                <label className='label'>
                                  Окончание сервиса
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='filter-btns'>
                        <button
                          type='button'
                          className='button btn-primary mr-16'
                        >
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

                <div className='user-services-inner'>
                  <h3 className='title-subhead mb-16'>
                    Найдено пользователей{' '}
                    <span className='number'>
                      {request._getServiceDesk.length}
                    </span>
                  </h3>

                  {filterRequests().map((sd: ServiceDesk) => (
                    <div className='card mb-24 card-no-shadow'>
                      <div className='card-header pad-24 bg-light'>
                        <div className='title'>
                          <h6 className='text'>{sd.full_name}</h6>
                          {/* <span className="num">№ 12</span> */}
                        </div>
                        <p className='desc mb-0'>
                          {sd.position_name} – {sd.department_name} –{' '}
                          {sd.client_name} – БИН: {sd.bin}
                        </p>
                      </div>
                      <div className='card-body pad-rl-24 pad-tb-16 line-card'>
                        <div className='row'>
                          <div className='col-md-6 pad-rl-16'>
                            <div className='total-info'>
                              <ul className='info-list'>
                                <li>
                                  <span className='left'>
                                    Глобальный IP пользователя:
                                  </span>
                                  <span className='right'>{sd.global_ip}</span>
                                </li>
                                <li>
                                  <span className='left'>ИИН сотрудника:</span>
                                  <span className='right'>{sd.iin}</span>
                                </li>
                                <li>
                                  <span className='left'>
                                    Номер удостоверения:
                                  </span>
                                  <span className='right'>
                                    {sd.idcard_number}
                                  </span>
                                </li>
                                <li>
                                  <span className='left'>Раб/моб номер:</span>
                                  <span className='right'>{sd.contacts}</span>
                                </li>
                                <li>
                                  <span className='left'>Email:</span>
                                  <span className='right'>{sd.email}</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='total-info'>
                              <ul className='info-list'>
                                <li>
                                  <span className='left'>
                                    Первый руководитель:
                                  </span>
                                  <span className='right'>
                                    {sd.first_head_full_name}
                                  </span>
                                </li>
                                <li>
                                  <span className='left'>Заместитель:</span>
                                  <span className='right'>
                                    {sd.deputy_head_full_name}
                                  </span>
                                </li>
                                <li>
                                  <span className='left'>
                                    Курирующий менеджер:
                                  </span>
                                  <span className='right'>
                                    {sd.manager_full_name}
                                  </span>
                                </li>
                                <li>
                                  <span className='left'>
                                    Контакты менеджера:
                                  </span>
                                  <span className='right'>{sd.contacts}</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='card-body pad-rl-24 pad-tb-16 pad-b-24-imp'>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='total-info'>
                              <ul className='info-list'>
                                <li>
                                  <span className='left'>
                                    Категория сервиса:
                                  </span>
                                  <span className='right'>
                                    {sd.service_category}
                                  </span>
                                </li>
                                <li>
                                  <span className='left'>Тип сервиса:</span>
                                  <span className='right'>
                                    {sd.service_type}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='total-info'>
                              <ul className='info-list'>
                                <li>
                                  <span className='left'>Начало сервиса:</span>
                                  <span className='right'>
                                    {moment(sd.date_from).format(
                                      'DD.MM.YYYY в HH:mm'
                                    )}
                                  </span>
                                </li>
                                <li>
                                  <span className='left'>
                                    Окончание сервиса:
                                  </span>
                                  <span className='right'>
                                    {moment(sd.date_to).format(
                                      'DD.MM.YYYY в HH:mm'
                                    )}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
export default Manager;
