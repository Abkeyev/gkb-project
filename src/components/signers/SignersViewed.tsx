import React from "react";
import { observer } from "mobx-react";
import moment from "moment";
import { Request, ServiceCommon } from "../../api/Models/ServiceModels";
import { SignersProps } from "./SignersProps.props";

const SignersViewed = ({
  filterVoteRequests,
  history,
  main,
  request,
}: SignersProps) => {
  return (
    <div className="tab-content tab-2">
      <h3 className="title-subhead mb-16">
        Расмотренные{" "}
        <span className="number">
          {
            filterVoteRequests(
              [5, 7, 8, 10, 12, 13, 14],
              main.clientData.user.id
            ).length
          }
        </span>
      </h3>
      {filterVoteRequests([5, 7, 8, 10, 12, 13, 14], main.clientData.user.id)
        .length === 0 ? (
        "Заявки отсутствуют."
      ) : (
        <table className="table req-table">
          <thead>
            <tr>
              <th>БИН</th>
              <th>Организации</th>
              <th>Категория деятельности</th>
              <th>Сервис</th>
              <th>Дата поступления</th>
            </tr>
          </thead>
          <tbody>
            {filterVoteRequests(
              [5, 7, 8, 10, 12, 13, 14],
              main.clientData.user.id
            ).map((r: Request) => (
              <tr onClick={() => history.push(`/signer/${r.id}`)}>
                <td>{r.client.bin}</td>
                <td>{r.client.longname}</td>
                <td>
                  {
                    request._getClientTypes.find(
                      (t: any) => t.id === r.client.client_type
                    )?.name
                  }
                </td>
                <td>
                  {
                    request._getClientServiceType.find(
                      (t: ServiceCommon) => t.id === r.service_type
                    )?.name
                  }
                  /{r.service_category === 1 ? "ЕСБД" : "БДКИ"}
                </td>
                <td>{moment(r.reg_date).format("DD.MM.YYYY в HH:mm")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default observer(SignersViewed);
