import React from "react";
import { observer } from "mobx-react";
import { PartnersProps } from "../partners/PartnersProps.props";

const PartnersInnerFooter = ({ request }: PartnersProps) => {
  return (
    <>
      {request._getRequest.request_status === 8 ? (
        <div className="req-inner-footer">
          <div className="container">
            <div className="left">
              <button
                type="button"
                onClick={() => request.getBase64()}
                className="button btn-primary mrl-32"
              >
                Подписать акт тестирования
              </button>
            </div>
          </div>
        </div>
      ) : request._getRequest.request_status === 12 ? (
        <div className="req-inner-footer">
          <div className="container">
            <div className="right">
              Подтвердите получение тестовых ключей (отправлено на почту):
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
      ) : request._getRequest.request_status === 14 ? (
        <div className="req-inner-footer">
          <div className="container">
            <div className="right">
              Подтвердите получение “боевых” ключей (отправлено на почту):
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
      ) : (
        ""
      )}
    </>
  );
};

export default observer(PartnersInnerFooter);
