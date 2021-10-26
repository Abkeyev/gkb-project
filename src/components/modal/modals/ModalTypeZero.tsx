import React from "react";
import { ModalTypes } from "./ModalTypes.props";
import BaseModal from "../BaseModal";
import { ServiceCommon, User } from "../../../api/Models/ServiceModels";
import { observer } from "mobx-react";

const ModalTypeZero = ({ main, request }: ModalTypes) => {
  const [search, setSearch] = React.useState("");
  return (
    <BaseModal size={"modal-large"} main={main}>
      <div className="modal-body">
        <div className="add-manager">
          <h3 className="text-left title-subhead">Назначить менеджера</h3>
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
                    f.full_name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((r: User) => (
                    <li
                      onClick={() => {
                        request._getRequest.request_status === 1
                          ? request
                              .nextRequestStatus(r.id)
                              .then((res: any) => {
                                main.setModal(false);
                                request.setManUser(r);
                              })
                              .catch((err: any) => {
                                main.setModal(false);
                                console.error(err);
                              })
                          : request
                              .updateRequest({
                                responsible_user: r.id,
                                client: request._getRequest.client.id,
                              })
                              .then((res: any) => {
                                main.setModal(false);
                                request.setManUser(r);
                              });
                      }}
                    >
                      <div className="profile">
                        <img
                          alt="ava"
                          className="ava"
                          src={process.env.PUBLIC_URL + "/images/def-ava.svg"}
                        />
                        <span className="name">{r.full_name}</span>
                      </div>
                      <span className="position">
                        {r.position &&
                          request._getPosition.find(
                            (t: ServiceCommon) => t.id === r.position
                          )?.name}
                      </span>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default observer(ModalTypeZero);
