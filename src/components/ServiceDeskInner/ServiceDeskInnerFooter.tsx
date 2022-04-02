import { observer } from "mobx-react";
import React from "react";
import { ServiceDeskInnerProps } from "./ServiceDeskInnerProps.props";

const ServiceDeskInnerFooter = ({
  request,
  main,
  test,
}: ServiceDeskInnerProps) => {
  return (
    <div className="req-inner-footer">
      <div className="container">
        {request.request.request_status === 10 &&
        request.request.request_stepper === 3 ? (
          <div className="left">
            <button
              type="button"
              onClick={() => request.nextRequest(request.request)}
              className="button btn-primary"
            >
              Подтвердить заполнение
            </button>
            <button
              type="button"
              onClick={() => {
                main.setModal(true);
                main.setModalType(1);
              }}
              className="button btn-danger mrl-24"
            >
              Отклонить
            </button>
          </div>
        ) : request.request.request_stepper === 4 ? (
          <div className="right">
            <button
              type="button"
              onClick={() => request.nextStatus()}
              className="button btn-primary mrl-32"
            >
              Подтвердить
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default observer(ServiceDeskInnerFooter);
