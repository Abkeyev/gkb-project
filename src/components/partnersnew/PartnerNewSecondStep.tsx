import { observer } from "mobx-react";
import React from "react";
import { PartnerNewProps } from "./PartnerNewProps.props";
import { ClientUserAccess } from "../../api/Models/ServiceModels";
import CardServiceUsers from "./CardServiceUsers";

const PartnerNewSecondStep = ({ main, request }: PartnerNewProps) => {
  return (
    <>
      <div className="d-flex-align-c-spaceb mb-32">
        <div className="d-grid">
          <h3 className="title-subhead mb-8">
            Пользователи услуг{" "}
            <span className="number">{request.usersNewAccess.length}</span>
          </h3>
          <p>Пользователи организации с наличием ЭЦП организации</p>
        </div>
        <button
          className="btn button btn-primary btn-icon"
          onClick={() => {
            main.setModal(true);
            main.setModalType(27);
          }}
        >
          <i className="azla add-plusRound-icon"></i> Добавить
        </button>
      </div>
      {(request.usersNewAccess as ClientUserAccess[]).map(
        (u: ClientUserAccess, index) => (
          <CardServiceUsers
            request={request}
            main={main}
            u={u}
            key={index}
            index={index}
          />
        )
      )}
    </>
  );
};

export default observer(PartnerNewSecondStep);
