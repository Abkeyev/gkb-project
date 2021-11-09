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
        <div className="right">
          {test
            ? "Подтвердите отправление тестовых ключей на почту контрагента:"
            : "Подтвердите отправление “боевых” ключей на почту контрагента:"}
          <button
            type="button"
            onClick={() => request.nextStatus()}
            className="button btn-primary mrl-32"
          >
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(ServiceDeskInnerFooter);
