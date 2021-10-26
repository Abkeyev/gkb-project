import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { Request, ServiceCommon } from "../../api/Models/ServiceModels";
import moment from "moment";
import { SignersProps } from "./SignersProps.props";
import { ReactComponent as Spinner } from "../../styles/spinner.svg";

const SignersNeedToSign = ({
  filterRequests,
  main,
  request,
  history,
}: SignersProps) => {
  useEffect(() => {
    request.getVoteRequest(main.clientData.user.id);
  }, []);
  return (
    <div className="tab-content tab-1">
      <h3 className="title-subhead mb-16">
        На подписание{" "}
        <span className="number">
          {filterRequests([6], main.clientData.user.id).length}
        </span>
      </h3>
      {request?.loader ? (
        <Spinner />
      ) : filterRequests([6], main.clientData.user.id).length === 0 ? (
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
            {filterRequests([6], main.clientData.user.id).map((r: Request) => (
              <tr onClick={() => history.push(`/signer/${r.id}`)}>
                <td>{r.client.bin}</td>
                <td>{r.client.longname}</td>
                <td>{r.service_category === 1 ? "ЕСБД" : "БДКИ"}</td>
                <td>
                  {
                    request._getClientServiceType.find(
                      (t: ServiceCommon) => t.id === r.service_type
                    )?.name
                  }
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

export default observer(SignersNeedToSign);
