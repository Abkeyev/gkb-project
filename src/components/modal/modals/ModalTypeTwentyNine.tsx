import React from "react";
import { ModalTypes } from "./ModalTypes.props";
import BaseModal from "../BaseModal";
import { ClientUserAccess, Right } from "../../../api/Models/ServiceModels";
import { observer } from "mobx-react";

const ModalTypeTwentyNine = ({ main, request }: ModalTypes) => {
  const [rights, setRights] = React.useState<ClientUserAccess>(
    main.modalTypeData
  );

  return (
    <BaseModal size={"modal-large-xl"} main={main}>
      <div className="modal-body">
        <div className="paper-signatory">
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
                  checked={rights.right_ids.includes(r.id)}
                  onClick={() =>
                    rights.right_ids.includes(r.id)
                      ? setRights({
                          ...rights,
                          right_ids: rights.right_ids.filter(
                            (rr: number) => rr !== r.id
                          ),
                        })
                      : setRights({
                          ...rights,
                          right_ids: [...rights.right_ids, r.id],
                        })
                  }
                />
                <label className="form-check-label" htmlFor={`right${r.id}`}>
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
            onClick={() => {
              main.setModal(false);
              const nau = main.usersNewAccess.filter(
                (u: ClientUserAccess) => u.id !== rights.id
              );
              main.setNewAccessUsers([...nau, rights]);
            }}
            className="button btn-primary w-160"
          >
            Подтвердить
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default observer(ModalTypeTwentyNine);
