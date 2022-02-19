import React from "react";
import { ModalTypes } from "./ModalTypes.props";
import BaseModal from "../BaseModal";
import {
  ClientUserAccess,
  ClientUserService,
  Right,
  ServiceCommon,
} from "../../../api/Models/ServiceModels";
import { observer } from "mobx-react";

const ModalTypeTwentySeven = ({ main, request }: ModalTypes) => {
  const [search, setSearch] = React.useState("");
  const [rights, setRights] = React.useState<number[]>([]);
  const [step, setStep] = React.useState(0);
  const [users, setUsers] = React.useState<ClientUserAccess[]>(
    request.usersNewAccess
  );

  React.useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <BaseModal size={"modal-large-xl"} main={main}>
      {step === 0 ? (
        <>
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
                  <i className="azla user-add-primary-icon size-20"></i> Создать
                  пользователя
                </button>
              </div>
              <p>
                Вы не можете добавлять/редактировать пользователей, которые уже
                используют данный сервис.{" "}
              </p>

              <div className="search-input">
                <input
                  type="text"
                  className="search-icon"
                  placeholder="Поиск"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="manager-list three-col">
                <ul>
                  {request._getClientUsersForAdd &&
                    (request._getClientUsersForAdd as ClientUserAccess[])
                      .filter((f: ClientUserAccess) =>
                        f.full_name.includes(search)
                      )
                      .map((r: ClientUserAccess) => (
                        <li key={r.id}>
                          <div className="profile">
                            <div className="form-check gkb-checkbox">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                disabled={
                                  request._getClientUsers.filter(
                                    (c: ClientUserAccess) => c.id === r.id
                                  ).length > 0
                                }
                                checked={
                                  users.filter(
                                    (u: ClientUserAccess) => u.id === r.id
                                  ).length > 0 ||
                                  request._getClientUsers.filter(
                                    (c: ClientUserAccess) => c.id === r.id
                                  ).length > 0
                                }
                                onChange={() => {
                                  users.filter(
                                    (u: ClientUserAccess) => u.id === r.id
                                  ).length > 0
                                    ? setUsers([
                                        ...users.filter(
                                          (u: ClientUserAccess) => r.id !== u.id
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
                                <span className="name">{r.full_name}</span>
                              </label>
                            </div>
                          </div>
                          <span className="position">
                            {
                              request._getPosition.find(
                                (t: ServiceCommon) => t.id === +r.position_name
                              )?.name
                            }
                          </span>
                          <span className="services-use">
                            {request._getClientUserService.find(
                              (t: ClientUserService) =>
                                t.client_user_data.id === r.id
                            )?.service_count || 0}{" "}
                            сервисов
                          </span>
                        </li>
                      ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="modal-footer d-flex-align-c-spaceb">
            <p className="text-desc mb-0">
              Выбрано {users.length} пользователя
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
                  const s = users.filter(
                    (u: ClientUserAccess) =>
                      request._getClientUsers.filter(
                        (c: ClientUserAccess) => c.id === u.id
                      ).length === 0
                  );
                  request.setNewAccessUsers(s);
                  setSearch("");
                  setStep(1);
                }}
                className="button btn-primary w-160"
              >
                Добавить
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="modal-body">
            <div className="paper-signatory">
              <div className="modal-back">
                <span className="btn-modal-back" onClick={() => setStep(0)}>
                  <i className="azla arrow-left-primary-icon"></i> Выбрано{" "}
                  {users.length} пользователя
                </span>
              </div>
              <div className="d-flex align-items-center mb-16">
                <h3 className="text-left title-subhead mb-0">
                  Укажите права доступа
                </h3>
              </div>

              <div className="give-rights">
                {(request._getRights as Right[]).map((r: Right) => (
                  <div className="form-check gkb-checkbox">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`right${r.id}`}
                      checked={rights.includes(r.id)}
                      onClick={() =>
                        rights.includes(r.id)
                          ? setRights([
                              ...rights.filter((rr: number) => rr !== r.id),
                            ])
                          : setRights([...rights, r.id])
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`right${r.id}`}
                    >
                      {r.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-footer d-flex-align-c-spacend">
            <div className="paper-signatory-footer">
              <button
                type="button"
                className="button btn-secondary w-160 mr-16"
                onClick={() => setStep(0)}
              >
                <i className="azla arrow-left-primary-icon"></i>
                Назад
              </button>
              <button
                type="button"
                onClick={() => {
                  main.setModal(false);
                  setStep(0);
                  let u = users.filter(
                    (u: ClientUserAccess) =>
                      request._getClientUsers.filter(
                        (c: ClientUserAccess) => c.id === u.id
                      ).length === 0
                  );
                  u = users.map((uu: ClientUserAccess) => ({
                    ...uu,
                    right_ids: rights,
                  }));
                  request.setNewAccessUsers(u);
                }}
                className="button btn-primary w-160"
              >
                Подтвердить
              </button>
            </div>
          </div>
        </>
      )}
    </BaseModal>
  );
};

export default observer(ModalTypeTwentySeven);
