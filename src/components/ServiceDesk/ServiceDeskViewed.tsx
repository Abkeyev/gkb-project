import { observer } from "mobx-react";
import React from "react";
import { ReactComponent as Spinner } from "../../styles/spinner.svg";
import {
  Request as RequestModel,
  ServiceCommon,
} from "../../api/Models/ServiceModels";
import moment from "moment";
import { ServiceDeskProps } from "./ServiceDeskProps.props";

const ServiceDeskViewed = ({
  request,
  filterRequests,
  history,
}: ServiceDeskProps) => {
  React.useEffect(() => {}, []);
  return request?.loader ? (
    <Spinner />
  ) : (
    <div className="tab-content tab-1">
      <h3 className="title-subhead mb-16">
        Найдено{" "}
        <span className="number">{filterRequests([8, 12, 13, 14]).length}</span>
      </h3>
      {filterRequests([8, 12, 13, 14]).length === 0 ? (
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
            {filterRequests([8, 12, 13, 14]).map((r: RequestModel) => (
              <tr onClick={() => history.push(`/service-desk/${r.id}`)}>
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

export default observer(ServiceDeskViewed);
