import React from "react";
import { observer } from "mobx-react";
import { ServiceCommon } from "../../api/Models/ServiceModels";
import { ManagerProps } from "./ManagerProps.props";

const ManagerFilter = ({
  request,
  catRef,
  serviceRef,
  bin,
  setBin,
  category,
  setCategory,
  service,
  setService,
  sortTitle,
  setSortTitle,
  date,
  setDate,
  sortRef,
}: ManagerProps) => {
  const [advance, setAdvance] = React.useState(false);
  const [sort, setSort] = React.useState(false);
  const [services, setServices] = React.useState<number[]>([]);
  const [categories, setCategories] = React.useState<number[]>([]);
  const [searchService, setSearchService] = React.useState<string>("");
  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");

  return (
    <div className="filter mb-24">
      <div className="row">
        <div className="col-md-12">
          <div className="filter-search">
            <div className="form-group mr-16 mb-0">
              <input
                className="form-control azla form-icon search-icon"
                type="name"
                placeholder="Поиск по названию, БИН"
                defaultValue={bin}
                onChange={(e) => setBin(e.target.value)}
              />
            </div>
            <button
              className="btn-s btn-secondary btn-icon col-md-3"
              onClick={() => setAdvance(!advance)}
            >
              <i className="azla filter-icon"></i> Расширенный поиск
            </button>
          </div>
        </div>

        <div
          className={`col-md-12 filter-content ${advance ? "view" : ""}`}
          onClick={() => {
            sort && setSort(false);
          }}
        >
          {/* Класс "view" добавляется при нажатии "Расширенный поиск" */}
          <div className="row mt-16 mb-16">
            <div className="col-md-4 pad-rl-16 mb-16">
              <div className="form-multiselect mb-0">
                <div
                  className={`multi js-multi-buttons ${category ? "open" : ""}`}
                  ref={catRef}
                >
                  <div className="input-wrapper">
                    <input
                      className="multi-input azla form-icon chevron-down-icon"
                      type="text"
                      placeholder="Выберите категорию деятельности"
                      readOnly
                      onClick={(e) => {
                        e.preventDefault();
                        setCategory(!category);
                      }}
                    />
                    <label className="label">Категория деятельности</label>
                  </div>
                  <div className="multi-menu">
                    <div className="multi-option option-current">
                      <div className="multi-list">
                        <div className="form-check gkb-checkbox">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={categories.includes(1)}
                            onClick={() => {
                              !categories.includes(1)
                                ? setCategories([...categories, 1])
                                : setCategories([
                                    ...categories.filter((s) => s !== 1),
                                  ]);
                            }}
                            id={`categoryCheck1`}
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`categoryCheck1`}
                          >
                            ЕСБД
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="multi-option option-current">
                      <div className="multi-list">
                        <div className="form-check gkb-checkbox">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={categories.includes(2)}
                            onClick={() => {
                              !categories.includes(2)
                                ? setCategories([...categories, 2])
                                : setCategories([
                                    ...categories.filter((s) => s !== 2),
                                  ]);
                            }}
                            id={`categoryCheck2`}
                            required
                          />
                          <label
                            className="form-check-label"
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

            <div className="col-md-4 pad-rl-16">
              <div className="form-multiselect mb-0">
                <div
                  className={`multi js-multi-buttons ${service ? "open" : ""}`}
                  ref={serviceRef}
                >
                  <div className="input-wrapper">
                    <input
                      className="multi-input azla form-icon chevron-down-icon"
                      type="text"
                      placeholder="Выберите тип сервиса"
                      readOnly
                      onClick={(e) => {
                        e.preventDefault();
                        setService(!service);
                      }}
                    />
                    <label className="label">Тип сервиса</label>
                  </div>
                  <div className="multi-menu">
                    <div className="multi-search">
                      <input
                        type="search"
                        className="azla form-icon search-icon"
                        placeholder="Поиск"
                        value={searchService}
                        onChange={(e) => setSearchService(e.target.value)}
                      />
                    </div>
                    {request._getClientServiceType
                      .filter((f: ServiceCommon) =>
                        f.name.includes(searchService)
                      )
                      .map((t: ServiceCommon, index: number) => (
                        <div className="multi-option option-current">
                          <div className="multi-list">
                            <div className="form-check gkb-checkbox">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={services.includes(t.id)}
                                onClick={() => {
                                  !services.includes(t.id)
                                    ? setServices([...services, t.id])
                                    : setServices([
                                        ...services.filter((s) => s !== t.id),
                                      ]);
                                }}
                                id={`serviceCheck${t.id}`}
                                required
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`serviceCheck${t.id}`}
                              >
                                {t.name}
                              </label>
                              <div className="invalid-feedback">Ошибка</div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 pad-rl-16">
              <div className="form-multiselect mb-0">
                <div
                  className={`multi js-multi-buttons ${date ? "open" : ""}`}
                  ref={sortRef}
                >
                  <div className="input-wrapper">
                    <input
                      className="multi-input azla form-icon chevron-down-icon"
                      type="text"
                      placeholder="Выберите тип сортировки"
                      value={sortTitle}
                      readOnly
                      onClick={(e) => {
                        e.preventDefault();
                        setDate(!date);
                      }}
                    />
                    <label className="label">Сортировать</label>
                  </div>
                  <div className="multi-menu">
                    <div className="multi-option option-current">
                      <div className="multi-list">
                        <span
                          className="multi-option-select"
                          onClick={() => setSortTitle("сначала новые")}
                        >
                          сначала новые
                        </span>
                      </div>
                      <div className="multi-list">
                        <span
                          className="multi-option-select"
                          onClick={() => setSortTitle("сначала старые")}
                        >
                          сначала старые
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 pad-rl-16">
              <div className="form-multiselect mb-0">
                <div className="multi js-multi-buttons">
                  <div className="input-wrapper">
                    <input
                      className="no-icon"
                      type="date"
                      placeholder="Дата начала сервиса"
                      min="2022-01-01"
                      max="2050-01-01"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <label className="label">Начало сервиса</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 pad-rl-16">
              <div className="form-multiselect mb-0">
                <div className="multi js-multi-buttons">
                  <div className="input-wrapper">
                    <input
                      className="no-icon"
                      type="date"
                      placeholder="Дата окончания сервиса"
                      min="2022-01-01"
                      max="2050-01-01"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                    <label className="label">Окончание сервиса</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="filter-btns">
            <button type="button" className="button btn-primary mr-16">
              Применить
            </button>
            <button
              type="button"
              className="button btn-secondary btn-icon"
              onClick={() => {
                setServices([]);
                setCategories([]);
                setSortTitle("");
                setStartDate("");
                setEndDate("");
                setBin("");
              }}
            >
              <i className="azla close-primary-icon"></i>
              Убрать фильтры
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(ManagerFilter);
