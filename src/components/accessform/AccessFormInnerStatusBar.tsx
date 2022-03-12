import { observer } from "mobx-react";
import React from "react";
import { AccessFormInnerProps } from "./AccessFormInnerProps.props";

const AccessFormInnerStatusBar = ({ main, request }: AccessFormInnerProps) => {
  return (
    <div className="status-bar">
      <ul className="step-progressbar">
        <li
          className={`step-item ${
            request._getRequest.request_stepper === 7
              ? "step-item-active"
              : "step-item-complete"
          }`}
          onClick={() =>
            request._getRequest.request_stepper <= 7 && request.setStep(7)
          }
        >
          Данные
          <br />
          заявки
        </li>
        <li
          className={`step-item ${
            request._getRequest.request_stepper === 6
              ? "step-item-active"
              : request._getRequest.request_stepper <= 6
              ? "step-item-complete"
              : ""
          }`}
          onClick={() =>
            request._getRequest.request_stepper <= 6 && request.setStep(6)
          }
        >
          Ключи
          <br />
          доступа
        </li>
        <li
          className={`step-item ${
            request._getRequest.request_stepper === 5
              ? "step-item-active"
              : request._getRequest.request_stepper === 5 &&
                request._getRequest.request_status === 7
              ? "step-item-complete"
              : ""
          }`}
          onClick={() =>
            request._getRequest.request_stepper === 5 && request.setStep(5)
          }
        >
          Готово
        </li>
      </ul>
    </div>
  );
};

export default observer(AccessFormInnerStatusBar);
