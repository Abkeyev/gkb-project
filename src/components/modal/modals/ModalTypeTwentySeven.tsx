import React from "react";
import { ModalTypes } from "./ModalTypes.props";
import BaseModal from "../BaseModal";
import {
  ClientUserAccess,
  ServiceCommon,
} from "../../../api/Models/ServiceModels";
import { observer } from "mobx-react";

const ModalTypeTwentySeven = ({ main, request }: ModalTypes) => {
  const [search, setSearch] = React.useState("");
  const [users, setUsers] = React.useState<ClientUserAccess[]>(main.usersNew);

  React.useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <BaseModal size={"modal-large-xl"} main={main}>
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
                  .filter((f: ClientUserAccess) => f.full_name.includes(search))
                  .map((r: ClientUserAccess) => (
                    <li key={r.id}>
                      <div className="profile">
                        <div className="form-check gkb-checkbox">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={
                              users.filter(
                                (u: ClientUserAccess) => u.id === r.id
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
                                process.env.PUBLIC_URL + "/images/def-ava.svg"
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
                      <span className="services-use">16 сервисов</span>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="modal-footer d-flex-align-c-spaceb">
        <p className="text-desc mb-0">Выбрано {users.length} участника</p>
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
    </BaseModal>
  );
};

export default observer(ModalTypeTwentySeven);
