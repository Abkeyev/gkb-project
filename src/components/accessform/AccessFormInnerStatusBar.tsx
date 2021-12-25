import { observer } from "mobx-react";
import React from "react";
import { AccessFormInnerProps } from "./AccessFormInnerProps.props";

const AccessFormInnerStatusBar = ({ main, request }: AccessFormInnerProps) => {
  return (
    <div className="status-bar">
      <ul className="step-progressbar">
        <li
          className={`step-item ${
            request._getRequest.request_stepper === 1
              ? "step-item-active"
              : "step-item-complete"
          }`}
          onClick={() => request.setStep(1)}
        >
          Данные
          <br />
          заявки
        </li>
        <li
          className={`step-item ${
            request._getRequest.request_stepper === 2
              ? "step-item-active"
              : request._getRequest.request_stepper > 2
              ? "step-item-complete"
              : ""
          }`}
          onClick={() => request.setStep(2)}
        >
          Ключи
          <br />
          доступа
        </li>
        <li
          className={`step-item ${
            request._getRequest.request_stepper === 3
              ? "step-item-active"
              : request._getRequest.request_stepper > 3
              ? "step-item-complete"
              : ""
          }`}
          onClick={() => request.setStep(3)}
        >
          Готово
        </li>
      </ul>
    </div>
  );
};

export default observer(AccessFormInnerStatusBar);
