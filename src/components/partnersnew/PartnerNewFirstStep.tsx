import { observer } from "mobx-react";
import React from "react";
import { PartnerNewProps } from "./PartnerNewProps.props";
import { ServiceCommon } from "../../api/Models/ServiceModels";
import PartnerNewFiles from "./PartnerNewFiles";

const PartnerNewFirstStep = ({
  tab,
  setTab,
  request,
  main,
  setFilesId,
  filesId,
}: PartnerNewProps) => {
  const setDocs = async (e: any) => {
    request.service = e.target.value;
    request.getDocsTypeByServiceId(e.target.value);
  };

  return (
    <>
      <h3 className="title-subhead mb-16">Выберите базу</h3>
      <div className="choose-service-data">
        <div className="radio-default mb-16">
          <input
            type="radio"
            id="radio-1"
            name="testing-1"
            onChange={() => setTab("1")}
            checked={tab === "1"}
          />
          <label htmlFor="radio-1">
            ЕСБД – Единая Страховая База Данных{" "}
            <span>ЕСБД - база данных страховых полисов.</span>
          </label>
        </div>
        <div className="radio-default">
          <input
            type="radio"
            id="radio-2"
            name="testing-1"
            onChange={() => {
              setTab("2");
            }}
            checked={tab === "2"}
          />
          <label htmlFor="radio-2">
            БДКИ – База Данных Кредитных Историй{" "}
            <span>
              База Данных Кредитных Историй (БДКИ) содержит в себе кредитные
              данные физических лиц РК.{" "}
            </span>
          </label>
        </div>
      </div>

      <div className="create-page-inner">
        {tab !== "0" && (
          <>
            <h3 style={{ marginTop: "40px" }} className="title-subhead mb-16">
              Выберите сервис
            </h3>
            <select
              value={request.service}
              onChange={(e) => e.target.value !== "-1" && setDocs(e)}
              className="form-control-v mt-24"
            >
              <option value={-1}>
                Выберите сервис {tab === "1" ? "ЕСБД" : "БДКИ"}
              </option>
              {request._getClientServiceType.map((c: ServiceCommon) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </>
        )}

        <PartnerNewFiles
          main={main}
          request={request}
          filesId={filesId}
          setFilesId={setFilesId}
        />
      </div>
    </>
  );
};

export default observer(PartnerNewFirstStep);
