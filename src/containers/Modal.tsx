import {
  checkInputs,
  extractKeyAlias,
  ValidationType,
  handleError,
} from "../ncalayer/helper";
import { observer } from "mobx-react";
import React from "react";
import {
  Client,
  ClientUser,
  ClientUsers,
  User,
} from "../api/Models/ServiceModels";
import { CheckState } from "../ncalayer/state";
import { Response } from "@seithq/ncalayer";

const Modal = observer((props: any) => {
  const { main, request, state, setState, client } = props;
  const [users, setUsers] = React.useState<User[]>([]);
  const [user, setUser] = React.useState<number[]>([]);
  const [fullName, setFullName] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [firstRuk, setFirstRuk] = React.useState("");
  const [zam, setZam] = React.useState("");
  const [man, setMan] = React.useState("");
  const [manCon, setManCon] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [declineReason, setDeclineReason] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const browseKeys = () => {
    setState({
      ...state,
      method: client.BrowseKeyStore(state.alias, "P12", state.path),
    });
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, password: e.target.value });
  };

  const handleKeyAliasClick = () => {
    const ok = checkInputs({
      path: state.path,
      alias: state.alias,
      password: state.password,
    });
    if (ok) {
      setState({
        ...state,
        method: client.GetKeys(state.alias, state.path, state.password, "SIGN"),
      });
    }
  };

  React.useEffect(() => {
    main.role === "Manager" && request.getSigners();
  }, []);

  const getSubstring = (text: string, string: string) => {
    const start = text.indexOf(string) + string.length;
    return text.substring(start, text.indexOf(",", start));
  };

  const signDoc = () =>
    main.loginEcp(
      getSubstring(state.subjectDN, "SERIALNUMBER=").substr(3),
      `${getSubstring(state.subjectDN, "CN=")} ${getSubstring(
        state.subjectDN,
        "G="
      )}`,
      getSubstring(state.subjectDN, "O=").replace(/\\/g, "")
    );

  const handleKeyAliasChange = (key: string) => {
    setState({ ...state, keyAlias: extractKeyAlias(key) });
  };

  const handleCMSSignatureFromFileClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const ok = checkInputs({
      path: state.path,
      alias: state.alias,
      password: state.password,
      keyAlias: state.keyAlias,
    });
    if (ok) {
      client.CreateCMSSignature(
        state.alias,
        state.path,
        state.keyAlias,
        state.password,
        "base64",
        state.cmsFileSignatureFlag,
        (resp: Response) => {
          if (resp.isOk()) {
            console.log(resp, "рес1п");
            request.setState({
              ...state,
              method: client.method,
              cmsFileSignatureSigned: resp.getResult(),
              cmsFileSignatureValid: CheckState.NotValidated,
              cmsFileSignatureMessage: "Не проверено",
            });
            return;
          }

          handleError(
            resp,
            ValidationType.Password && ValidationType.PasswordAttemps
          );
        }
      );
    }
  };

  return (
    <div>
      {main.modalType === 0 ? (
        <div className="modal modal-large">
          <div
            className="modal-backbg"
            onClick={() => main.setModal(false)}
          ></div>
          <div className="modal-dialog">
            <div className="modal-content fadeInModal animated">
              <div className="modal-close" onClick={() => main.setModal(false)}>
                <i className="azla close-icon"></i>
              </div>
              <div className="modal-body">
                <div className="add-manager">
                  <h3 className="text-left title-subhead">
                    Назначить менеджера
                  </h3>
                  <div className="search-input">
                    <input
                      type="text"
                      className="search-icon"
                      placeholder="Поиск"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="manager-list">
                    <ul>
                      {request._getSigners &&
                        (request._getSigners as User[])
                          .filter((f: User) => f.full_name.includes(search))
                          .map((r: User) => (
                            <li
                              onClick={() => {
                                request
                                  .nextRequestStatus(r.id)
                                  .then((res: any) => {
                                    main.setModal(false);
                                    request.setManUser(r);
                                  })
                                  .catch((err: any) => {
                                    main.setModal(false);
                                    console.log(err);
                                  });
                              }}
                            >
                              <div className="profile">
                                <img
                                  alt="ava"
                                  className="ava"
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/images/def-ava.svg"
                                  }
                                />
                                <span className="name">{r.full_name}</span>
                              </div>
                              <span className="position">{r.position}</span>
                            </li>
                          ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : main.modalType === 1 ? (
        <div className="modal modal-large">
          <div
            className="modal-backbg"
            onClick={() => main.setModal(false)}
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
                    value={declineReason}
                    onChange={(e) => setDeclineReason(e.target.value)}
                  ></textarea>
                  <div className="d-flex">
                    <button
                      type="button"
                      disabled={declineReason === ""}
                      onClick={() =>
                        request._getRequest &&
                        request
                          .endRequest(request._getRequest, declineReason)
                          .then(() => {
                            main.decline = true;
                            main.declineReason = declineReason;
                            main.setModal(false);
                          })
                      }
                      className="button btn-primary mr-16"
                    >
                      Отправить
                    </button>
                    <button
                      type="button"
                      onClick={() => main.setModal(false)}
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
      ) : main.modalType === 2 ? (
        <div className="modal modal-large">
          <div
            className="modal-backbg"
            onClick={() => main.setModal(false)}
          ></div>
          <div className="modal-dialog">
            <div className="modal-content fadeInModal animated">
              <div className="modal-close" onClick={() => main.setModal(false)}>
                <i className="azla close-icon"></i>
              </div>
              <div className="modal-body">
                <div className="paper-show">
                  <h3 className="text-left title-subhead mb-16">
                    {request._getDoc.doc_name}
                  </h3>
                  <div className="file-add mb-32">
                    <button
                      className="btn-file btn-icon"
                      onClick={() =>
                        request.downloadDocument(request._getDoc.id)
                      }
                    >
                      <i className="azla blank-alt-primary-icon"></i>
                      Скачать договор
                    </button>
                    <p className="info ml-16">Загружено {""}</p>
                  </div>

                  <div className="author mb-16">
                    <h5 className="mr-16">Автор:</h5>
                    <div className="profile">
                      <img
                        alt="ava"
                        className="ava"
                        src={process.env.PUBLIC_URL + "/images/def-ava.svg"}
                      />
                      <span className="name">{request._getDoc.client}</span>
                    </div>
                  </div>

                  <div className="comment mb-32">
                    <h5>Комментарий:</h5>
                    <p>{request._getDoc.comments}</p>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => {
                    main.setModal(false);
                    request.setAgreementPar(true);
                  }}
                  className="button btn-primary table-ml"
                >
                  Приступить к согласованию
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : main.modalType === 3 ? (
        <div className="modal modal-large">
          <div
            className="modal-backbg"
            onClick={() => main.setModal(false)}
          ></div>
          <div className="modal-dialog">
            <div className="modal-content fadeInModal animated">
              <div className="modal-close" onClick={() => main.setModal(false)}>
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
                    onClick={() => main.setModal(false)}
                    className="button btn-secondary"
                  >
                    Нет
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      request.sendType().then(() => main.setModal(false))
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
      ) : main.modalType === 4 ? (
        <div className="modal modal-large-xl">
          <div
            className="modal-backbg"
            onClick={() => main.setModal(false)}
          ></div>
          <div className="modal-dialog">
            <div className="modal-content fadeInModal animated">
              <div className="modal-close" onClick={() => main.setModal(false)}>
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
                      {request._getUsers.map((c: User) => (
                        <li>
                          <div className="form-check gkb-checkbox">
                            <input
                              className="form-check-input"
                              type="checkbox"
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
                              className="form-check-label"
                              htmlFor={`invalidCheck${c.id}`}
                            ></label>
                          </div>
                          <div className="profile">
                            <img
                              alt="ava"
                              className="ava"
                              src={
                                process.env.PUBLIC_URL + "/images/def-ava.svg"
                              }
                            />
                            <span className="name">{c.full_name}</span>
                          </div>
                          <span className="position">{c.position}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="modal-footer d-flex-align-c-spaceb">
                <p className="text-desc mb-0">
                  Выбрано {user.length} участника
                </p>
                <div className="paper-signatory-footer">
                  <button
                    type="button"
                    className="button btn-secondary w-160 mr-16"
                    onClick={() => setUser([])}
                  >
                    Очистить
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      main.setModal(false);
                      console.log(
                        request.requestId,
                        "request.requestIdrequest.requestId"
                      );
                      if (request.requestId !== null)
                        request.agreeGroup[request.requestId] = {
                          ...request.agreeGroup[request.requestId],
                          user_name: [
                            ...request.agreeGroup[request.requestId].user_name,
                            ...user,
                          ],
                        };
                    }}
                    className="button btn-primary w-160"
                  >
                    Добавить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : main.modalType === 5 ? (
        <div className="modal modal-large">
          <div
            className="modal-backbg"
            onClick={() => main.setModal(false)}
          ></div>
          <div className="modal-dialog">
            <div className="modal-content fadeInModal animated">
              <div className="modal-close" onClick={() => main.setModal(false)}>
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
                        alt="ava"
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
      ) : main.modalType === 6 ? (
        <div className="modal modal-large-xl">
          <div
            className="modal-backbg"
            onClick={() => main.setModal(false)}
          ></div>
          <div className="modal-dialog">
            <div className="modal-content fadeInModal animated">
              <div className="modal-close" onClick={() => main.setModal(false)}>
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
                      {request._getSigners &&
                        (request._getSigners as User[])
                          .filter((f: User) => f.full_name.includes(search))
                          .map((r: User) => (
                            <li
                              onClick={() =>
                                request
                                  .updateRequest({
                                    manager_signer_user: r.id,
                                  })
                                  .then((r: any) => main.setModal(false))
                              }
                            >
                              <div className="profile">
                                <img
                                  alt="ava"
                                  className="ava"
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/images/def-ava.svg"
                                  }
                                />
                                <span className="name">{r.full_name}</span>
                              </div>
                              <span className="position">{r.position}</span>
                            </li>
                          ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : main.modalType === 7 ? (
        <div className="modal modal-large">
          <div
            className="modal-backbg"
            onClick={() => main.setModal(false)}
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
                    onChange={(e) => main.setDeclineReason(e.target.value)}
                  ></textarea>
                  <div className="d-flex">
                    <button
                      type="button"
                      onClick={() => main.setModal(false)}
                      className="button btn-secondary mr-16"
                    >
                      Отмена
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        main.setModalManager(true);
                        main.setModal(false);
                        main.setDecline(true);
                      }}
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
      ) : main.modalType === 8 ? (
        <div className="modal modal-large">
          <div
            className="modal-backbg"
            onClick={() => main.setModal(false)}
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
                      onClick={() => main.setModal(false)}
                      className="button btn-secondary w-160 mr-16"
                    >
                      Отмена
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        main.setModalManager(true);
                        main.setModal(false);
                        main.setDecline(true);
                      }}
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
      ) : main.modalType === 9 ? (
        <div className="modal modal-large">
          <div
            className="modal-backbg"
            onClick={() => main.setModal(false)}
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
                    <input
                      type="text"
                      value="Султангалиева Камилла Избасарова"
                    />
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
                    <label className="form-check-label" htmlFor="checkMeanNum">
                      Основной номер
                    </label>
                  </div>
                  <div className="d-flex mt-16">
                    <button
                      type="button"
                      onClick={() => {
                        main.setModalManager(true);
                        main.setModal(false);
                        main.setDecline(true);
                      }}
                      className="button btn-primary mr-16"
                    >
                      Сохранить
                    </button>
                    <button
                      type="button"
                      onClick={() => main.setModal(false)}
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
      ) : main.modalType === 10 ? (
        <div className="modal modal-large-xl">
          <div
            className="modal-backbg"
            onClick={() => main.setModal(false)}
          ></div>
          <div className="modal-dialog">
            <div className="modal-content fadeInModal animated">
              <div className="modal-close" onClick={() => main.setModal(false)}>
                <i className="azla close-icon"></i>
              </div>

              <div className="modal-body">
                <div className="paper-signatory">
                  <div className="d-flex align-items-center mb-16">
                    <h3 className="text-left title-subhead mb-0">
                      Добавить пользователей услуг
                    </h3>
                    <button
                      className="button btn-secondary ml-24"
                      onClick={() => {
                        main.setModal(true);
                        main.setModalType(11);
                      }}
                    >
                      <i className="azla user-add-primary-icon size-20"></i>{" "}
                      Новый пользователь
                    </button>
                  </div>

                  <div className="search-input">
                    <input
                      type="text"
                      className="search-icon"
                      placeholder="Поиск"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  <div className="manager-list">
                    <ul>
                      {request._getClientUsersForAdd &&
                        (request._getClientUsersForAdd as ClientUser[])
                          .filter((f: ClientUser) =>
                            f.full_name.includes(search)
                          )
                          .map(
                            (r: ClientUser) =>
                              main.usersNew.filter(
                                (u: ClientUser) => u.id === r.id
                              ).length === 0 && (
                                <li key={r.id}>
                                  <div className="form-check gkb-checkbox">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={
                                        users.filter(
                                          (u: ClientUser) => u.id === r.id
                                        ).length > 0
                                      }
                                      onChange={() => {
                                        console.log(
                                          users.filter(
                                            (u: ClientUser) => u.id === r.id
                                          ).length > 0
                                        );
                                        users.filter(
                                          (u: ClientUser) => u.id === r.id
                                        ).length > 0
                                          ? setUsers([
                                              ...users.filter(
                                                (u: ClientUser) => u.id !== r.id
                                              ),
                                            ])
                                          : setUsers([...users, r]);
                                      }}
                                      id={`input${r.id}`}
                                      required
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={`input${r.id}`}
                                    ></label>
                                  </div>
                                  <div className="profile">
                                    <img
                                      className="ava"
                                      src={
                                        process.env.PUBLIC_URL +
                                        "/images/def-ava.svg"
                                      }
                                    />
                                    <span className="name">{r.full_name}</span>
                                  </div>
                                  <span className="position">{r.position}</span>
                                </li>
                              )
                          )}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="modal-footer d-flex-align-c-spaceb">
                <p className="text-desc mb-0">
                  Выбрано {users.length} участника
                </p>
                <div className="paper-signatory-footer">
                  <button
                    type="button"
                    className="button btn-secondary w-160 mr-16"
                    onClick={() => setUsers([])}
                  >
                    Очистить
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      main.setModal(false);
                      main.setNewUsers(users);
                    }}
                    className="button btn-primary w-160"
                  >
                    Добавить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : main.modalType === 11 ? (
        <div className="modal modal-large">
          <div
            className="modal-backbg"
            onClick={() => main.setModal(false)}
          ></div>
          <div className="modal-dialog">
            <div className="modal-content fadeInModal animated">
              <div className="modal-close">
                <i
                  className="azla close-icon"
                  onClick={() => main.setModal(false)}
                ></i>
              </div>
              <div className="modal-body">
                <div className="write-reasons">
                  <h3 className="text-left title-subhead mb-32">
                    Добавить пользователя
                  </h3>
                  <div className="form-wrapper">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Введите ФИО"
                    />
                    <label>ФИО</label>
                  </div>
                  <div className="form-wrapper">
                    <input
                      type="text"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      placeholder="Введите должность"
                    />
                    <label>Должность</label>
                  </div>
                  <div className="form-wrapper">
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="Введите департамент"
                    />
                    <label>Департамент</label>
                  </div>
                  <div className="form-wrapper">
                    <input
                      value={phone}
                      type="text"
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+7 (_ _ _) _ _ _ - _ _ - _ _"
                    />
                    <label>Контактный номер</label>
                  </div>
                  <div className="form-wrapper">
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Введите почту"
                    />
                    <label>Email</label>
                  </div>
                  <div className="form-wrapper">
                    <input
                      type="text"
                      value={firstRuk}
                      onChange={(e) => setFirstRuk(e.target.value)}
                      placeholder="Первый руководитель"
                    />
                    <label>Первый руководитель</label>
                  </div>
                  <div className="form-wrapper">
                    <input
                      type="text"
                      value={zam}
                      onChange={(e) => setZam(e.target.value)}
                      placeholder="Введите заместитель"
                    />
                    <label>Заместитель</label>
                  </div>
                  <div className="form-wrapper">
                    <input
                      type="text"
                      value={man}
                      onChange={(e) => setMan(e.target.value)}
                      placeholder="Введите менеджера"
                    />
                    <label>Курирующий менеджер</label>
                  </div>
                  <div className="form-wrapper">
                    <input
                      type="text"
                      value={manCon}
                      onChange={(e) => setManCon(e.target.value)}
                      placeholder="Введите контакты менеджера"
                    />
                    <label>Контакты менеджера</label>
                  </div>
                  <div className="d-flex mt-16">
                    <button
                      type="button"
                      onClick={() => {
                        main.regUser({
                          client: main.clientData.client.id,
                          first_head_full_name: firstRuk,
                          deputy_head_full_name: zam,
                          manager_full_name: man,
                          iin: "IIN",
                          global_ip: "ip",
                          idcard_number: "idcard",
                          manager_contacts: manCon,
                          full_name: fullName,
                          position_name: position,
                          department_name: department,
                          contacts: phone,
                          email: email,
                        });
                      }}
                      className="button btn-primary mr-16"
                    >
                      Сохранить
                    </button>
                    <button
                      type="button"
                      onClick={() => main.setModal(false)}
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
      ) : main.modalType === 12 ? (
        <div className="modal modal-large">
          <div
            className="modal-backbg"
            onClick={() => main.setModal(false)}
          ></div>
          <div className="modal-dialog">
            <div className="modal-content fadeInModal animated">
              <div className="modal-close">
                <i
                  className="azla close-icon"
                  onClick={() => main.setModal(false)}
                ></i>
              </div>
              <div className="modal-body">
                <div className="write-reasons">
                  <h3 className="text-left title-subhead mb-32">
                    Подписание документа
                  </h3>
                  <div className="form-wrapper">
                    <button
                      type="button"
                      onClick={() => browseKeys()}
                      className="button btn-primary"
                    >
                      Выберите ключ
                    </button>
                  </div>
                  <div className="form-wrapper">
                    <input
                      type="text"
                      value={state.password}
                      ref={(input) => {
                        input !== null && input.focus();
                      }}
                      onChange={handlePasswordChange}
                      placeholder="Введите пароль для хранилища"
                    />
                    <label>Пароль</label>
                  </div>
                  <div className="form-wrapper">
                    <button
                      className="button btn-primary"
                      onClick={() => {
                        handleKeyAliasClick();
                      }}
                    >
                      Загрузить ключи
                    </button>
                  </div>
                  <div className="form-wrapper">
                    {props.state.keys.length > 0 &&
                      props.state.keys[0] &&
                      props.state.keys[0] !== "" && (
                        <div className="form-multiselect mb-0">
                          <div
                            className={`multi js-multi-buttons ${
                              open ? "open" : ""
                            }`}
                            onClick={() => setOpen(!open)}
                          >
                            {/* При наведении на Input появляется класс open */}
                            <div className="input-wrapper">
                              <input
                                className="multi-input azla form-icon chevron-down-icon"
                                type="text"
                                placeholder="Список ключей"
                                value={main.key}
                              />
                              <label className="label">Ключи</label>
                            </div>
                            <div className="multi-menu">
                              <div className="multi-option option-current">
                                {props.state.keys.map((v: any, i: number) => {
                                  return (
                                    <div className="multi-list">
                                      <span
                                        className="multi-option-select"
                                        onClick={() => {
                                          main.key = v;
                                          handleKeyAliasChange(v);
                                        }}
                                      >
                                        {v}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                          <button
                            className="button btn-primary mt-16"
                            onClick={handleCMSSignatureFromFileClick}
                          >
                            Подписать
                          </button>
                        </div>
                      )}
                  </div>
                  {state.cmsSignatureSigned}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="modal modal-default">
          <div
            className="modal-backbg"
            onClick={() => main.setModal(false)}
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
});
export default Modal;
