import { observer } from "mobx-react";
import React from "react";
import { AccessFormInnerProps } from "./AccessFormInnerProps.props";

const AccessFormInnerStatusBar = ({ main, request }: AccessFormInnerProps) => {
  return (
    <div className="status-bar">
      <ul className="step-progressbar">
        <li
          className={`step-item ${
            request._getRequest.request_stepper === 6
              ? "step-item-active"
              : "step-item-complete"
          }`}
          onClick={() =>
            (request._getRequest.request_stepper === 6 ||
              request._getRequest.request_stepper === 7 ||
              request._getRequest.request_stepper === 5) &&
            request.setStep(6)
          }
        >
          Данные
          <br />
          заявки
        </li>
        <li
          className={`step-item ${
            request._getRequest.request_stepper === 7 &&
            (request._getRequest.request_status === 10 ||
              request._getRequest.request_status === 12)
              ? "step-item-active"
              : request._getRequest.request_stepper === 7 &&
                request._getRequest.request_status === 8
              ? "step-item-complete"
              : ""
          }`}
          onClick={() =>
            request._getRequest.request_stepper === 7 &&
            (request._getRequest.request_status === 10 ||
              request._getRequest.request_status === 12) &&
            request.setStep(7)
          }
        >
          Ключи
          <br />
          доступа
        </li>
        <li
          className={`step-item ${
            request._getRequest.request_stepper === 7 &&
            request._getRequest.request_status === 8
              ? "step-item-active"
              : request._getRequest.request_stepper === 0
              ? "step-item-complete"
              : ""
          }`}
          onClick={() =>
            request._getRequest.request_stepper === 7 &&
            request._getRequest.request_status === 8 &&
            request.setStep(7)
          }
        >
          Готово
        </li>
      </ul>
    </div>
  );
};

export default observer(AccessFormInnerStatusBar);
