import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link, useHistory } from "react-router-dom";
import "./style.css";

interface RequestProps {
  setIsOpenModal: any;
  setModalType: any;
  modalManager: any;
  decline: boolean;
  declineReason: string;
  setDecline: any;
  setDeclineReason: any;
  setTab: any;
  step: number;
  setStep: any;
}

const RequestInner = (props: RequestProps) => {
  const {
    setIsOpenModal,
    setModalType,
    modalManager,
    decline,
    declineReason,
    setTab,
    setDecline,
    setDeclineReason,
    step,
    setStep,
  } = props;
  const history = useHistory();
  return (
    <div className="main-body">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="req-manager-inner p-16-50">
              <div className="req-inner-header">
                <div className="back-breadcrumbs">
                  <Link to="/orders" className="back">
                    <i className="azla arrow-left-icon"></i> Назад
                  </Link>
                  <div className="breadcrumbs">
                    <Link to="/orders">Заявки</Link> / <span>Заявка №1353</span>
                  </div>
                </div>

                <h1 className="title-main mb-32">
                  Заявка №1353 - ТОО “М-Ломбард”
                </h1>

                {decline && (
                  <div className="alert-mess mb-32">
                    <h5>Заявка отклонена</h5>
                    <p>Причина: {declineReason}</p>
                  </div>
                )}

                <div className="status-bar">
                  <ul className="step-progressbar">
                    <li
                      className={`step-item ${
                        step === 0 ? "step-item-active" : "step-item-complete"
                      }`}
                    >
                      Проверка
                    </li>
                    <li
                      className={`step-item ${
                        step === 1
                          ? "step-item-active"
                          : step > 1
                          ? "step-item-complete"
                          : ""
                      }`}
                    >
                      Подписание
                      <br />
                      договора
                    </li>
                    <li
                      className={`step-item ${
                        step === 2
                          ? "step-item-active"
                          : step > 2
                          ? "step-item-complete"
                          : ""
                      }`}
                    >
                      Форма
                      <br />
                      доступа
                    </li>
                    <li
                      className={`step-item ${
                        step === 3
                          ? "step-item-active"
                          : step > 3
                          ? "step-item-complete"
                          : ""
                      }`}
                    >
                      Тестирование
                    </li>
                    <li
                      className={`step-item ${
                        step === 4
                          ? "step-item-active"
                          : step > 4
                          ? "step-item-complete"
                          : ""
                      }`}
                    >
                      Готово
                    </li>
                  </ul>
                </div>
              </div>

              {step === 0 ? (
                <Tabs>
                  <div className="line-hr mb-32">
                    <TabList>
                      <Tab>Общее</Tab>
                      <Tab>Потребители услуг</Tab>
                    </TabList>
                  </div>

                  <TabPanel>
                    <div className="req-inner-body pad-b-128">
                      <h3 className="title-subhead mb-16">Общие данные</h3>
                      <div className="total-info">
                        <ul className="info-list">
                          <li>
                            <span className="left">Номер заявки:</span>
                            <span className="right">41252526</span>
                          </li>
                          <li>
                            <span className="left">Статус заявки:</span>
                            <span className="right">Нераспределено</span>
                          </li>
                          <li>
                            <span className="left">Организация:</span>
                            <span className="right">ТОО “М-Ломбард”</span>
                          </li>
                          <li>
                            <span className="left">Номер заявки:</span>
                            <span className="right">41252526</span>
                          </li>
                          <li>
                            <span className="left">БИН:</span>
                            <span className="right">123456789098</span>
                          </li>
                          <li>
                            <span className="left">
                              Категория деятельности:
                            </span>
                            <span className="right">Ломбарды</span>
                          </li>
                          <li>
                            <span className="left">Тип сервиса:</span>
                            <span className="right">Изъятие данных</span>
                          </li>
                          <li>
                            <span className="left">
                              Дата регистрации заявки:
                            </span>
                            <span className="right">20 Июня 2021</span>
                          </li>
                          <li>
                            <span className="left">
                              Дата исполнения заявки::
                            </span>
                            <span className="right">20 Июня 2021</span>
                          </li>
                        </ul>
                      </div>

                      <h3 className="title-subhead mb-16">
                        Документы контрагента
                      </h3>
                      <h5 className="title-subhead-h5 mb-16">
                        Организационные документы
                      </h5>

                      <div className="files-added">
                        <ul className="files-list">
                          <li>
                            <i className="azla blank-alt-primary-icon"></i>
                            <span>Типовой договор.docx</span>
                          </li>
                          <li>
                            <i className="azla blank-alt-primary-icon"></i>
                            <span>Типовой договор.docx</span>
                          </li>
                        </ul>
                      </div>

                      <h5 className="title-subhead-h5 mb-16">
                        Персональные документы
                      </h5>

                      <div className="files-added">
                        <ul className="files-list">
                          <li>
                            <i className="azla blank-alt-primary-icon"></i>
                            <span>Типовой договор.docx</span>
                          </li>
                          <li>
                            <i className="azla blank-alt-primary-icon"></i>
                            <span>Типовой договор.docx</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="tab-content tab-1">
                      <h3 className="title-subhead mb-16">
                        56 заявленных пользователей
                      </h3>
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
                          <tr>
                            <td>52345634643</td>
                            <td>М-Ломбард</td>
                            <td>Ломбард</td>
                            <td>Кредитная история</td>
                            <td>12.12.2021</td>
                          </tr>
                          <tr>
                            <td>52345634643</td>
                            <td>М-Ломбард</td>
                            <td>Ломбард</td>
                            <td>Кредитная история</td>
                            <td>12.12.2021</td>
                          </tr>
                          <tr>
                            <td>52345634643</td>
                            <td>ТОО “МФО”</td>
                            <td>Микрозаймы</td>
                            <td>Если текст длинный то...</td>
                            <td>12.12.2021</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </TabPanel>
                </Tabs>
              ) : step === 1 ? (
                <div className="req-inner-body">
                  <h3 className="title-subhead mb-16">Шаблоны договоров</h3>
                  <div className="files-added">
                    <ul className="files-list">
                      <li>
                        <i className="azla blank-alt-primary-icon"></i>
                        <span>Типовой договор.docx</span>
                      </li>
                      <li>
                        <i className="azla blank-alt-primary-icon"></i>
                        <span>Типовой договор.docx</span>
                      </li>
                    </ul>
                  </div>
                  <h3 className="title-subhead mb-16">
                    История изменения договора 32
                  </h3>
                  <table className="table req-table">
                    <thead>
                      <tr>
                        <th>Название</th>
                        <th>Дата загрузки</th>
                        <th>Комментарий</th>
                        <th>Автор</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4].map((m) => (
                        <tr>
                          <td>Договор вер. 2.4255</td>
                          <td>24 Июня 2021</td>
                          <td>Изменили что-то</td>
                          <td>Султангалиева К.И</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <h3 className="title-subhead mb-16">Документы контрагента</h3>
                  <h5 className="title-subhead-h5 mb-16">
                    Организационные документы
                  </h5>

                  <div className="files-added">
                    <ul className="files-list">
                      <li>
                        <i className="azla blank-alt-primary-icon"></i>
                        <span>Типовой договор.docx</span>
                      </li>
                      <li>
                        <i className="azla blank-alt-primary-icon"></i>
                        <span>Типовой договор.docx</span>
                      </li>
                    </ul>
                  </div>

                  <h5 className="title-subhead-h5 mb-16">
                    Персональные документы
                  </h5>

                  <div className="files-added">
                    <ul className="files-list">
                      <li>
                        <i className="azla blank-alt-primary-icon"></i>
                        <span>Типовой договор.docx</span>
                      </li>
                      <li>
                        <i className="azla blank-alt-primary-icon"></i>
                        <span>Типовой договор.docx</span>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : step === 2 ? (
                <></>
              ) : step === 3 ? (
                <></>
              ) : step === 4 ? (
                <></>
              ) : (
                <></>
              )}
              {/* step 0-4 */}
              <div className="req-inner-footer">
                {modalManager && step === 0 ? (
                  <div className="manager-req">
                    <div className="left">
                      <p>Менеджер заявки</p>
                      <div className="profile">
                        <img
                          className="ava"
                          src={process.env.PUBLIC_URL + "/images/def-ava.svg"}
                        />
                        <span className="name">Султангалиева К.И</span>
                      </div>
                    </div>

                    {decline ? (
                      <div className="right alert">
                        <p>Заявка отклонена</p>
                        <button
                          className="button btn-secondary"
                          onClick={() => {
                            setDeclineReason("");
                            setDecline(false);
                            setTab(3);
                            history.push("/orders");
                          }}
                        >
                          В архив
                        </button>
                      </div>
                    ) : (
                      <div className="right">
                        <p>Первичная проверка прошла успешно?</p>
                        <button
                          className="button btn-secondary mr-8"
                          onClick={() => {
                            setIsOpenModal(true);
                            setModalType(1);
                          }}
                        >
                          Нет
                        </button>
                        <button
                          className="button btn-primary"
                          onClick={() => setStep(1)}
                        >
                          Да, успешно
                        </button>
                      </div>
                    )}
                  </div>
                ) : step === 0 ? (
                  <button
                    type="button"
                    onClick={() => setIsOpenModal(true)}
                    className="button btn-primary"
                  >
                    Назначить
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RequestInner;
