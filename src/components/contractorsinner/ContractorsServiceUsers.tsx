import { observer } from "mobx-react-lite";
import React from "react";
import { ContractorsInnerProps } from "./ContractorsInnerProps.props";
import { ClientUsers } from "../../api/Models/ServiceModels";
import CardServiceUsers from "../partnersnew/CardServiceUsers";

const ContractorsServiceUsers = ({ request }: ContractorsInnerProps) => {
  return (
    <>
      <h3 className="title-subhead mb-8">Пользователи услуг</h3>
      <p className="mb-24">
        Пользователи организации, которые имеют доступ к сервисам БДКИ и ЕСБД
      </p>
      {(request._getClientUsersForAdd as ClientUsers[]).map(
        (u: ClientUsers, index) => (
          <CardServiceUsers request={request} u={u} index={index} count />
        )
      )}
    </>
  );
};

export default observer(ContractorsServiceUsers);
