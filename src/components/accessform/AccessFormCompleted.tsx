import React from "react";
import { observer } from "mobx-react";
import { AccessFormProps } from "./AccessFormProps.props";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Request, ServiceCommon } from "../../api/Models/ServiceModels";
const AccessFormCompleted = ({ request, filter }: AccessFormProps) => {
  const history = useHistory();
  return (
    <div className="tab-content tab-1">
      <h3 className="title-subhead mb-16">
        Выполненные <span className="number">{filter([7]).length}</span>
      </h3>
      {filter([7]).length === 0 ? (
        "Заявки отсутствуют."
      ) : (
        <table className="table req-table">
          <thead>
            <tr>
              <th>БИН</th>
              <th>Организации</th>
              <th># пользователей</th>
              <th>Сервис</th>
              <th>Дата поступления</th>
            </tr>
          </thead>
          <tbody>
            {filter([7]).map((r: Request) => (
              <tr onClick={() => history.push(`/access-form/${r.id}`)}>
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

export default observer(AccessFormCompleted);
