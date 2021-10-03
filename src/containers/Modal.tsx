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
  ServiceCommon,
  User,
} from "../api/Models/ServiceModels";
import { CheckState } from "../ncalayer/state";
import { Response } from "@seithq/ncalayer";

const Modal = observer((props: any) => {
  const { main, request } = props;
  const [users, setUsers] = React.useState<ClientUser[]>([]);
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
  const [comment, setComment] = React.useState("");
  const [file, setFile] = React.useState<any | null>(null);
  const [testKey, setTestKey] = React.useState<any | null>(null);
  const [key, setKey] = React.useState<any | null>(null);

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
                          .filter((f: User) =>
                            f.full_name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          )
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
                    {main.role === "Manager"
                      ? "Укажите причину"
                      : "Отклонить заявку"}
                  </h3>
                  <textarea
                    rows={5}
                    className="form-control-textarea mb-16"
                    placeholder={
                      main.role === "Manager"
                        ? "Причина отказа"
                        : "Укажите причину"
                    }
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
              {request._getTempDoc && (
                <div className="modal-body">
                  <div className="paper-show">
                    <h3 className="text-left title-subhead mb-16">
                      {request._getTempDoc.doc_name}
                    </h3>
                    <div className="file-add mb-32">
                      <button
                        className="btn-file btn-icon"
                        onClick={() =>
                          request.downloadDocument(request._getTempDoc)
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
                        <span className="name">
                          {request._getClients &&
                            request._getClients.find(
                              (t: Client) => t.id === request._getTempDoc.client
                            )?.longname}
                        </span>
                      </div>
                    </div>

                    <div className="comment mb-32">
                      <h5>Комментарий:</h5>
                      <p>{request._getTempDoc.comments}</p>
                    </div>
                  </div>
                </div>
              )}

              {main.role === "Manager" && (
                <div className="modal-footer">
                  <button
                    type="button"
                    onClick={() =>
                      request
                        .updateRequest({
                          request_status: 13,
                          client: request._getRequest.client.id,
                        })
                        .then(() => {
                          main.setModal(false);
                          request.setTempDoc &&
                            request.setDoc(request._getTempDoc);
                        })
                    }
                    className="button btn-primary table-ml"
                  >
                    Приступить к согласованию
                  </button>
                </div>
              )}
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
                      type="text"
                      className="search-icon"
                      defaultValue={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Поиск"
                    />
                  </div>

                  <div className="manager-list">
                    <ul>
                      {request._getUsers
                        .filter((f: User) =>
                          f.full_name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        )
                        .map(
                          (c: User) =>
                            !request.agreeGroup[
                              request.requestId
                            ].user_name.includes(c.id) && (
                              <li>
                                <div className="profile">
                                  <div className="form-check gkb-checkbox">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
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
                                      className="form-check-label"
                                      htmlFor={`invalidCheck${c.id}`}
                                    >
                                      <img
                                        alt="ava"
                                        className="ava"
                                        src={
                                          process.env.PUBLIC_URL +
                                          "/images/def-ava.svg"
                                        }
                                      />
                                      <span className="name">
                                        {c.full_name}
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <span className="position">{c.position}</span>
                              </li>
                            )
                        )}
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
                          .filter((f: User) =>
                            f.full_name
                              .toLowerCase()
                              .includes(search.toLowerCase())
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
                                  <div className="profile">
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
                                                  (u: ClientUser) =>
                                                    u.id !== r.id
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
                                      >
                                        <img
                                          className="ava"
                                          src={
                                            process.env.PUBLIC_URL +
                                            "/images/def-ava.svg"
                                          }
                                        />
                                        <span className="name">
                                          {r.full_name}
                                        </span>
                                      </label>
                                    </div>
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
                        main
                          .regUser({
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
                          })
                          .then(() => main.setModal(false));
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
      ) : main.modalType === 13 ? (
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
                    Выберите подписанта
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
                          .filter((f: User) =>
                            f.full_name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          )
                          .map((r: User) => (
                            <li
                              onClick={() =>
                                request.data &&
                                request
                                  .addRequest({
                                    ...request.data,
                                    counterparty_signer_user: r.id,
                                  })
                                  .then(() => window.location.replace("/"))
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
      ) : main.modalType === 14 ? (
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
                <div className="paper-show">
                  <h3 className="text-left title-subhead mb-16">
                    Прикрепить документ
                  </h3>
                  <div className="file-add mb-16">
                    {file === null ? (
                      <label
                        // type="button"
                        className="button btn-secondary"
                      >
                        <input
                          type="file"
                          onChange={(e) =>
                            e &&
                            e.target &&
                            e.target.files &&
                            e.target.files[0] &&
                            setFile(e.target.files[0])
                          }
                          style={{ display: "none" }}
                        />
                        Добавить файл
                      </label>
                    ) : (
                      <div className="file-added">
                        <div className="file-added-text">
                          <i className="azla blank-alt-primary-icon mr-8"></i>
                          <span>{file.name}</span>
                        </div>
                        <button
                          type="button"
                          className="btn-icon button delete-btn"
                          onClick={() => setFile(null)}
                        >
                          <i className="azla trash-icon-alert"></i> Удалить
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="author mb-16">
                    <h5 className="mr-16">Автор:</h5>
                    <div className="profile">
                      <img
                        alt="ava"
                        className="ava"
                        src={process.env.PUBLIC_URL + "/images/def-ava.svg"}
                      />
                      <span className="name">
                        {request._getAllUsers &&
                          request._getAllUsers.find(
                            (u: User) => u.id === main.clientData.user.id
                          )?.full_name}
                      </span>
                    </div>
                  </div>

                  <div className="comment mb-8">
                    <textarea
                      rows={5}
                      className="form-control-textarea mb-0"
                      placeholder="Комментарий к документу"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => {
                    if (
                      request._getDogovors &&
                      request._getDogovors[request._getDogovors.length - 1]
                    ) {
                      var bodyFormData = new FormData();
                      bodyFormData.append("file", file);
                      bodyFormData.append("comments", comment);
                      bodyFormData.append(
                        "doc_category",
                        request._getDogovors[
                          request._getDogovors.length - 1
                        ].doc_category.toString()
                      );
                      bodyFormData.append(
                        "doc_type",
                        request._getDogovors[
                          request._getDogovors.length - 1
                        ].doc_type.toString()
                      );
                      bodyFormData.append(
                        "service_type",
                        request._getDogovors[
                          request._getDogovors.length - 1
                        ].service_type.toString()
                      );
                      bodyFormData.append(
                        "is_draft",
                        request._getDogovors[
                          request._getDogovors.length - 1
                        ].is_draft.toString()
                      );
                      bodyFormData.append(
                        "version",
                        (
                          request._getDogovors[request._getDogovors.length - 1]
                            .version + 1
                        ).toString()
                      );
                      request._getRequest &&
                        request
                          .addDocument(request._getRequest.id, bodyFormData)
                          .then(() => {
                            main.setModal(false);
                            setFile(null);
                            setComment("");
                          });
                    }
                  }}
                  className="button btn-primary table-ml"
                >
                  Подтвердить
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : main.modalType === 15 ? (
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
                    Редактирование данных
                  </h3>
                </div>
                <div className="form-wrapper">
                  {main.modalTypeEdit === 0 ? (
                    <>
                      <input
                        type="email"
                        defaultValue={request._getUser?.email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                      <label>E-mail</label>
                    </>
                  ) : main.modalTypeEdit === 1 ? (
                    <select
                      defaultValue={request._getUser.position}
                      onChange={(e) => setPosition(e.target.value)}
                      className="form-control-v"
                    >
                      <option>Выберите должность</option>
                      {request._getPosition.map((c: ServiceCommon) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <div className="d-flex">
                  <button
                    type="button"
                    className="button btn-secondary mr-16"
                    onClick={() => main.setModal(false)}
                  >
                    Отмена
                  </button>
                  <button
                    type="button"
                    className="button btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      let data =
                        main.modalTypeEdit === 0
                          ? { email }
                          : main.modalTypeEdit === 1
                          ? { position }
                          : "";
                      request
                        .updateUser(main.clientData.client.id, data)
                        .then(() => {
                          main.setModal(false);
                          setEmail("");
                        });
                    }}
                  >
                    Сохранить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : main.modalType === 16 ? (
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
                <div className="paper-show">
                  <h3 className="text-left title-subhead mb-16">
                    Ключи доступа
                  </h3>
                  <div className="file-add mb-16">
                    {(main.modalTypeEdit === 1 && testKey === null) ||
                    (main.modalTypeEdit === 2 && key === null) ? (
                      <label
                        // type="button"
                        className="button btn-secondary"
                      >
                        <input
                          type="file"
                          onChange={(e) =>
                            e &&
                            e.target &&
                            e.target.files &&
                            e.target.files[0] &&
                            (main.modalTypeEdit === 1
                              ? setTestKey(e.target.files[0])
                              : setKey(e.target.files[0]))
                          }
                          style={{ display: "none" }}
                        />
                        Добавить{" "}
                        {main.modalTypeEdit === 1 ? "тестовый" : "боевой"} ключ
                      </label>
                    ) : (
                      <div className="file-added">
                        <div className="file-added-text">
                          <i className="azla blank-alt-primary-icon mr-8"></i>
                          <span>
                            {main.modalTypeEdit === 1 ? testKey.name : key.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          className="btn-icon button delete-btn"
                          onClick={() =>
                            main.modalTypeEdit === 1
                              ? setTestKey(null)
                              : setKey(null)
                          }
                        >
                          <i className="azla trash-icon-alert"></i> Удалить
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => {
                    var bodyFormData = new FormData();
                    bodyFormData.append(
                      "file",
                      main.modalTypeEdit === 1 ? testKey : key
                    );
                    bodyFormData.append(
                      "doc_type",
                      main.modalTypeEdit === 1 ? "11" : "12"
                    );
                    request._getRequest &&
                      request
                        .addKey(request._getRequest.id, bodyFormData)
                        .then(() => {
                          main.setModal(false);
                          setKey(null);
                          setTestKey(null);
                        })
                        .catch(() => "");
                  }}
                  className="button btn-primary table-ml"
                >
                  Подтвердить
                </button>
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
