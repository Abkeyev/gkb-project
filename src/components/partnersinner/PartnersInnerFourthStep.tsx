import React from "react";
import { observer } from "mobx-react";
import { PartnersProps } from "../partners/PartnersProps.props";

const PartnersInnerFourthStep = ({ request }: PartnersProps) => {
  return (
    <>
      <div className="pad-b-128">
        <div className="req-inner-body">
          <div className="pad-rl-16">
            <div className="row">
              <div className="col-md-8">
                <h3 className="title-subhead mb-16">Тестирование сервисов</h3>
                <div className="files-added">
                  <ul className="files-list">
                    {request.testProt && (
                      <li>
                        <i className="azla blank-alt-primary-icon"></i>
                        <span
                          onClick={() =>
                            request.downloadDocument(request.testProt)
                          }
                        >
                          Протокол тестирования
                        </span>
                      </li>
                    )}
                    {request.testAct && (
                      <li>
                        <i className="azla blank-alt-primary-icon"></i>
                        <span
                          onClick={() =>
                            request.downloadDocument(request.testAct)
                          }
                        >
                          Акт тестирования
                        </span>
                      </li>
                    )}
                  </ul>
                </div>

                <h3 className="title-subhead mb-16">Сценарий тестирования</h3>
                <p className="text-desc">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                  Exercitation veniam consequat sunt nostrud amet.
                </p>
              </div>
              <div className="col-md-3 offset-md-1">
                <div className="keys-add">
                  <ul className="step-progressbar grid-view">
                    {request._getRequest.service_category !== 1 && (
                      <>
                        <li
                          className={`step-item ${
                            request._getRequest.request_status === 10
                              ? "step-item-active"
                              : "step-item-complete"
                          }`}
                          onClick={() => {}}
                        >
                          Servicedesk отправил тестовые ключи
                        </li>
                        <li
                          className={`step-item ${
                            request._getRequest.request_status === 12
                              ? "step-item-active"
                              : request._getRequest.request_status === 8 ||
                                request._getRequest.request_status === 13 ||
                                request._getRequest.request_status === 14 ||
                                request._getRequest.request_status === 7
                              ? "step-item-complete"
                              : ""
                          }`}
                          onClick={() => {}}
                        >
                          Контрагент получил тестовые ключи
                        </li>
                        <li
                          className={`step-item ${
                            request._getRequest.request_status === 8
                              ? "step-item-active"
                              : request._getRequest.request_status === 13 ||
                                request._getRequest.request_status === 14 ||
                                request._getRequest.request_status === 7
                              ? "step-item-complete"
                              : ""
                          }`}
                          onClick={() => {}}
                        >
                          Контрагент подписал “Акт прохождения тестирования”
                        </li>
                      </>
                    )}
                    <li
                      className={`step-item ${
                        request._getRequest.request_status === 13
                          ? "step-item-active"
                          : request._getRequest.request_status === 14 ||
                            request._getRequest.request_status === 7
                          ? "step-item-complete"
                          : ""
                      }`}
                      onClick={() => {}}
                    >
                      Servicedesk отправил “боевые” ключи
                    </li>
                    <li
                      className={`step-item ${
                        request._getRequest.request_status === 14
                          ? "step-item-active"
                          : request._getRequest.request_status === 7
                          ? "step-item-complete"
                          : ""
                      }`}
                      onClick={() => {}}
                    >
                      Контрагент получил “боевые” ключи
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(PartnersInnerFourthStep);
