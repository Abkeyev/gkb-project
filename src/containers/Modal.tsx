import React from "react";

import AppState from "../ncalayer/state";
import { useHistory } from "react-router-dom";

interface ModalProps {
  state: AppState;
  setState: any;
}

const Modal = (props: ModalProps) => {
  const { state, setState } = props;
  const history = useHistory();
  return (
    <div>
      {state.modalType === 0 ? (
        <div className="modal modal-large">
          <div
            className="modal-backbg"
            onClick={() => setState({ ...state, isOpenModal: false })}
          ></div>
          <div className="modal-dialog">
            <div className="modal-content fadeInModal animated">
              <div
                className="modal-close"
                onClick={() => setState({ ...state, isOpenModal: false })}
              >
                <i className="azla close-icon"></i>
              </div>
              <div className="modal-body">
                <div className="add-manager">
                  <h3 className="text-left title-subhead">
                    Назначить менеджера
                  </h3>
                  <div className="search-input">
                    <input
                      type="seatch"
                      className="search-icon"
                      placeholder="Поиск"
                    />
                  </div>
                  <div className="manager-list">
                    <ul>
                      {[1, 2, 3, 4].map((r) => (
                        <li
                          onClick={() => {
                            setState({
                              ...state,
                              modalManager: true,
                              isOpenModal: false,
                            });
                          }}
                        >
                          <div className="profile">
                            <img
                              className="ava"
                              src={
                                process.env.PUBLIC_URL + "/images/def-ava.svg"
                              }
                            />
                            <span className="name">Султангалиева К.И</span>
                          </div>
                          <span className="position">Менеджер</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : state.modalType === 1 ? (
        <div className="modal modal-large">
          <div
            className="modal-backbg"
            onClick={() => setState({ ...state, isOpenModal: false })}
          ></div>
          <div className="modal-dialog">
            <div className="modal-content fadeInModal animated">
              <div className="modal-close">
                <i className="azla close-icon"></i>
              </div>
              <div className="modal-body">
                <div className="write-reasons">
                  <h3 className="text-left title-subhead mb-16">
                    Укажите причину
                  </h3>
                  <textarea
                    rows={5}
                    className="form-control-textarea mb-16"
                    placeholder="Причина отказа"
                    value={state.declineReason}
                    onChange={(e) =>
                      setState({ ...state, declineReason: e.target.value })
                    }
                  ></textarea>
                  <div className="d-flex">
                    <button
                      type="button"
                      onClick={() =>
                        setState({
                          ...state,
                          modalManager: true,
                          isOpenModal: false,
                          decline: true,
                        })
                      }
                      className="button btn-primary mr-16"
                    >
                      Отправить
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setState({
                          ...state,
                          isOpenModal: false,
                        })
                      }
                      className="button btn-secondary"
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : state.modalType === 2 ? (
        <div className="modal modal-large">
          <div
            className="modal-backbg"
            onClick={() =>
              setState({
                ...state,
                isOpenModal: false,
              })
            }
          ></div>
          <div className="modal-dialog">
            <div className="modal-content fadeInModal animated">
              <div
                className="modal-close"
                onClick={() =>
                  setState({
                    ...state,
                    isOpenModal: false,
                  })
                }
              >
                <i className="azla close-icon"></i>
              </div>
              <div className="modal-body">
                <div className="paper-show">
                  <h3 className="text-left title-subhead mb-16">
                    Договор версия 2342
                  </h3>
                  <div className="file-add mb-32">
                    <button className="btn-file btn-icon">
                      <i className="azla blank-alt-primary-icon"></i>
                      Скачать договор
                    </button>
                    <p className="info ml-16">Загружено 24 Июня 2021 в 14:46</p>
                  </div>

                  <div className="author mb-16">
                    <h5 className="mr-16">Автор:</h5>
                    <div className="profile">
                      <img
                        className="ava"
                        src={process.env.PUBLIC_URL + "/images/def-ava.svg"}
                      />
                      <span className="name">Султангалиева К.И</span>
                    </div>
                  </div>

                  <div className="comment mb-32">
                    <h5>Комментарий:</h5>
                    <p>
                      Amet minim mollit non deserunt ullamco est sit aliqua
                      dolor do amet sint. Velit officia consequat duis enim
                      velit mollit. Exercitation veniam consequat sunt nostrud
                      amet.
                    </p>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() =>
                    history.location.pathname.includes("request")
                      ? setState({
                          ...state,
                          isOpenModal: false,
                          agreement: true,
                        })
                      : setState({
                          ...state,
                          isOpenModal: false,
                          agreementPar: true,
                        })
                  }
                  className="button btn-primary table-ml"
                >
                  {history.location.pathname.includes("request")
                    ? "Отправить на согласование"
                    : "Далее"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : state.modalType === 3 ? (
        <div className="modal modal-large">
          <div
            className="modal-backbg"
            onClick={() =>
              setState({
                ...state,
                isOpenModal: false,
              })
            }
          ></div>
          <div className="modal-dialog">
            <div className="modal-content fadeInModal animated">
              <div
                className="modal-close"
                onClick={() =>
                  setState({
                    ...state,
                    isOpenModal: false,
                  })
                }
              >
                <i className="azla close-icon"></i>
              </div>
              <div className="modal-body">
                <div className="alert-close">
                  <h3 className="title-subhead text-center mb-16">
                    Вы уверены?
                  </h3>
                  <p className="text-center text-desc">
                    Предыдущие настройки согласования/подписания будут потеряны.
                  </p>
                </div>
                <div className="btn-alert-close">
                  <button
                    type="button"
                    onClick={() => setState({ ...state, isOpenModal: false })}
                    className="button btn-secondary"
                  >
                    Нет
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setState({
                        ...state,
                        isOpenModal: false,
                        notTypical: !state.notTypical,
                      })
                    }
                    className="button btn-primary"
                  >
                    Да
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : state.modalType === 4 ? (
        <div className="modal modal-large-xl">
          <div
            className="modal-backbg"
            onClick={() =>
              setState({
                ...state,
                isOpenModal: false,
              })
            }
          ></div>
          <div className="modal-dialog">
            <div className="modal-content fadeInModal animated">
              <div
                className="modal-close"
                onClick={() =>
                  setState({
                    ...state,
                    isOpenModal: false,
                  })
                }
              >
                <i className="azla close-icon"></i>
              </div>
              <div className="modal-body">
                <div className="paper-signatory">
                  <h3 className="text-left title-subhead mb-16">
                    Участники согласования
                  </h3>

                  <div className="search-input">
                    <input
                      type="seatch"
                      className="search-icon"
                      placeholder="Поиск"
                    />
                  </div>

                  <div className="manager-list">
                    <ul>
                      {[1].map((r) => (
                        <li>
                          <div className="form-check gkb-checkbox">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="invalidCheck"
                              required
                            />
                            <label
                              className="form-check-label"
                              htmlFor="invalidCheck"
                            ></label>
                          </div>
                          <div className="profile">
                            <img
                              className="ava"
                              src={
                                process.env.PUBLIC_URL + "/images/def-ava.svg"
                              }
                            />
                            <span className="name">Султангалиева К.И</span>
                          </div>
                          <span className="position">Менеджер</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="modal-footer d-flex-align-c-spaceb">
                <p className="text-desc mb-0">Выбрано 1 участника</p>
                <div className="paper-signatory-footer">
                  <button
                    type="button"
                    className="button btn-secondary w-160 mr-16"
                  >
                    Очистить
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setState({
                        ...state,
                        isOpenModal: false,
                        agreeUsers: [...state.agreeUsers, 0],
                      })
                    }
                    className="button btn-primary w-160"
                  >
                    Добавить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : state.modalType === 5 ? (
        <div className="modal modal-large">
          <div
            className="modal-backbg"
            onClick={() =>
              setState({
                ...state,
                isOpenModal: false,
              })
            }
          ></div>
          <div className="modal-dialog">
            <div className="modal-content fadeInModal animated">
              <div
                className="modal-close"
                onClick={() =>
                  setState({
                    ...state,
                    isOpenModal: false,
                  })
                }
              >
                <i className="azla close-icon"></i>
              </div>
              <div className="modal-body">
                <div className="paper-show">
                  <h3 className="text-left title-subhead mb-16">
                    Обзор комментария
                  </h3>

                  <div className="author mb-24">
                    <span className="btn-status canceled mr-16">Отклонено</span>
                    <div className="profile">
                      <img
                        className="ava"
                        src={process.env.PUBLIC_URL + "/images/def-ava.svg"}
                      />
                      <span className="name">Султангалиева К.И</span>
                    </div>
                  </div>

                  <div className="comment mb-32">
                    <h5>Комментарий:</h5>
                    <p>
                      Amet minim mollit non deserunt ullamco est sit aliqua
                      dolor do amet sint. Velit officia consequat duis enim
                      velit mollit. Exercitation veniam consequat sunt nostrud
                      amet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : state.modalType === 6 ? (
        <div className="modal modal-large-xl">
          <div
            className="modal-backbg"
            onClick={() =>
              setState({
                ...state,
                isOpenModal: false,
              })
            }
          ></div>
          <div className="modal-dialog">
            <div className="modal-content fadeInModal animated">
              <div
                className="modal-close"
                onClick={() =>
                  setState({
                    ...state,
                    isOpenModal: false,
                  })
                }
              >
                <i className="azla close-icon"></i>
              </div>
              <div className="modal-body">
                <div className="add-manager">
                  <h3 className="text-left title-subhead">
                    Назначить менеджера
                  </h3>
                  <div className="search-input">
                    <input
                      type="seatch"
                      className="search-icon"
                      placeholder="Поиск"
                    />
                  </div>
                  <div className="manager-list">
                    <ul>
                      {[1, 2, 3, 4].map((r) => (
                        <li
                          onClick={() =>
                            setState({
                              ...state,
                              isOpenModal: false,
                              signTwoUsers: [...state.signTwoUsers, 0],
                            })
                          }
                        >
                          <div className="profile">
                            <img
                              className="ava"
                              src={
                                process.env.PUBLIC_URL + "/images/def-ava.svg"
                              }
                            />
                            <span className="name">Султангалиева К.И</span>
                          </div>
                          <span className="position">Менеджер</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        ) : state.modalType === 7 ? (
          <div className="modal modal-large">
            <div
              className="modal-backbg"
              onClick={() => setState({ ...state, isOpenModal: false })}
            ></div>
            <div className="modal-dialog">
              <div className="modal-content fadeInModal animated">
                <div className="modal-close">
                  <i className="azla close-icon"></i>
                </div>
                <div className="modal-body">
                  <div className="write-reasons">
                    <h3 className="text-left title-subhead mb-16">
                    Юридический адрес
                    </h3>
                    <textarea
                      rows={5}
                      className="form-control-textarea mb-16"
                      placeholder="Причина отказа"
                      value="г. Алматы, ул. Тажибаевой 47, БЦ “Иван”, этаж 24"
                      onChange={(e) =>
                        setState({ ...state, declineReason: e.target.value })
                      }
                    ></textarea>
                    <div className="d-flex">
                      <button
                        type="button"
                        onClick={() =>
                          setState({
                            ...state,
                            isOpenModal: false,
                          })
                        }
                        className="button btn-secondary mr-16"
                      >
                        Отмена
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setState({
                            ...state,
                            modalManager: true,
                            isOpenModal: false,
                            decline: true,
                          })
                        }
                        className="button btn-primary"
                      >
                        Сохранить
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ) : state.modalType === 8 ? (
            <div className="modal modal-large">
              <div
                className="modal-backbg"
                onClick={() => setState({ ...state, isOpenModal: false })}
              ></div>
              <div className="modal-dialog">
                <div className="modal-content fadeInModal animated">
                  <div className="modal-close">
                    <i className="azla close-icon"></i>
                  </div>
                  <div className="modal-body">
                    <div className="write-reasons">
                      <h3 className="text-center title-subhead mb-16">
                        Удалить документ?
                      </h3>
                      
                      <div className="files-added modal-files-deleted">
                        <ul className="files-list">
                          <li>
                            <i className="azla blank-alt-primary-icon"></i>
                            <span>Устав ТОО “М-Ломбард”.pdf</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          onClick={() =>
                            setState({
                              ...state,
                              isOpenModal: false,
                            })
                          }
                          className="button btn-secondary w-160 mr-16"
                        >
                          Отмена
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setState({
                              ...state,
                              modalManager: true,
                              isOpenModal: false,
                              decline: true,
                            })
                          }
                          className="button btn-primary w-160"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ) : state.modalType === 9 ? (
              <div className="modal modal-large">
                <div
                  className="modal-backbg"
                  onClick={() => setState({ ...state, isOpenModal: false })}
                ></div>
                <div className="modal-dialog">
                  <div className="modal-content fadeInModal animated">
                    <div className="modal-close">
                      <i className="azla close-icon"></i>
                    </div>
                    <div className="modal-body">
                      <div className="write-reasons">
                      <h3 className="text-left title-subhead mb-32">
                        Редактировать данные
                      </h3>
                        <div className="form-wrapper">
                          <input type="text" value="Султангалиева Камилла Избасарова" />
                          <label>ФИО</label>
                        </div>
                        <div className="form-wrapper">
                          <input type="text" value="Аналитик" />
                          <label>Должность</label>
                        </div>
                        <div className="form-wrapper">
                          <input type="text" value="sultangaliyeva.k.i@gmail.com" />
                          <label>Email</label>
                        </div>
                        <div className="form-wrapper">
                          <input type="text" value="+7 (701) 456-78-90" />
                          <label>Телефон</label>
                        </div>
                        <div className="form-check gkb-checkbox">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="checkMeanNum"
                              required
                            />
                            <label
                              className="form-check-label"
                              htmlFor="checkMeanNum"
                            >Основной номер</label>
                          </div>

                        
                        <div className="d-flex mt-16">
                          <button
                            type="button"
                            onClick={() =>
                              setState({
                                ...state,
                                modalManager: true,
                                isOpenModal: false,
                                decline: true,
                              })
                            }
                            className="button btn-primary mr-16"
                          >
                            Сохранить
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setState({
                                ...state,
                                isOpenModal: false,
                              })
                            }
                            className="button btn-danger"
                          >
                            Удалить пользователя
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
        <div className="modal modal-default">
          <div
            className="modal-backbg"
            onClick={() =>
              setState({
                ...state,
                isOpenModal: false,
              })
            }
          ></div>
          <div className="modal-dialog">
            <div className="modal-content fadeInModal animated">
              <div className="modal-close">
                <i className="azla close-icon"></i>
              </div>
              <div className="modal-body">
                <h3 className="text-center">Добавьте или перетащите файл</h3>
                <i className="azla upload-icon size-80 mtb-auto-16"></i>
                <button type="button" className="button btn-primary table-auto">
                  Добавить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Modal;
