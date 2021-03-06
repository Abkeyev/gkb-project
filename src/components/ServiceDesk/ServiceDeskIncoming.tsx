import React from "react";
import { observer } from "mobx-react";
import {
  Request as RequestModel,
  ServiceCommon,
} from "../../api/Models/ServiceModels";
import moment from "moment";
import { ServiceDeskProps } from "./ServiceDeskProps.props";
import { ReactComponent as Spinner } from "../../styles/spinner.svg";

const ServiceDeskIncoming = ({
  request,
  history,
  filterRequests,
}: ServiceDeskProps) => {
  React.useMemo(() => {
    request.getRequests();
    request.getClients();
    request.getClientServiceType();
    request.getClientTypes();
  }, []);
  return request?.loader ? (
    <Spinner />
  ) : (
    <div className="tab-content tab-1">
      <h3 className="title-subhead mb-16">
        Найдено <span className="number">{filterRequests([10]).length}</span>
      </h3>
      {filterRequests([10]).length === 0 ? (
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
            {filterRequests([10]).map((r: RequestModel) => (
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

export default observer(ServiceDeskIncoming);
