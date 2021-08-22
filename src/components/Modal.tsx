import React from "react";
import "./style.css";

interface ModalProps {
  setIsOpenModal: any;
  setModalManager: any;
  modalType: number;
  declineReason: string;
  setDeclineReason: any;
  setDecline: any;
}

const Modal = (props: ModalProps) => {
  const {
    setIsOpenModal,
    setModalManager,
    modalType,
    declineReason,
    setDeclineReason,
    setDecline,
  } = props;
  return (
    <div>
      {modalType === 0 ? (
        <div className="modal modal-large">
          <div className="modal-backbg"></div>
          <div className="modal-dialog">
            <div className="modal-content fadeInModal animated">
              <div
                className="modal-close"
                onClick={() => setIsOpenModal(false)}
              >
                <i className="azla close-icon"></i>
              </div>
              <div className="modal-body">
                <div className="add-manager">
                  <h3 className="text-left title-subhead">
                    Назначить менеджера
                  </h3>
                  <div className="search-input">
                    <input
                      type="seatch"
                      className="search-icon"
                      placeholder="Поиск"
                    />
                  </div>
                  <div className="manager-list">
                    <ul>
                      {[1, 2, 3, 4].map((r) => (
                        <li
                          onClick={() => {
                            setModalManager(true);
                            setIsOpenModal(false);
                          }}
                        >
                          <div className="profile">
                            <img
                              className="ava"
                              src={
                                process.env.PUBLIC_URL + "/images/def-ava.svg"
                              }
                            />
                            <span className="name">Султангалиева К.И</span>
                          </div>
                          <span className="position">Менеджер</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : modalType === 1 ? (
        // <div className="modal modal-large">
        //   <div className="modal-backbg"></div>
        //   <div className="modal-dialog">
        //     <div className="modal-content fadeInModal animated">
        //       <div className="modal-close">
        //         <i className="azla close-icon"></i>
        //       </div>
        //       <div className="modal-body">
        //         <div className="write-reasons">
        //           <h3 className="text-left title-subhead mb-16">
        //             Укажите причину
        //           </h3>
        //           <textarea
        //             rows={5}
        //             className="form-control-textarea mb-16"
        //             placeholder="Причина отказа"
        //             value={declineReason}
        //             onChange={(e) => setDeclineReason(e.target.value)}
        //           ></textarea>
        //           <div className="d-flex">
        //             <button
        //               type="button"
        //               onClick={() => {
        //                 setModalManager(true);
        //                 setIsOpenModal(false);
        //                 setDecline(true);
        //               }}
        //               className="button btn-primary mr-16"
        //             >
        //               Отправить
        //             </button>
        //             <button
        //               type="button"
        //               onClick={() => {
        //                 setIsOpenModal(false);
        //               }}
        //               className="button btn-secondary"
        //             >
        //               Отмена
        //             </button>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>

        <div className="modal modal-large">
          <div className="modal-backbg"></div>
          <div className="modal-dialog">
            <div className="modal-content fadeInModal animated">
              <div className="modal-close">
                <i className="azla close-icon"></i>
              </div>
              <div className="modal-body">
                <div className="paper-show">
                    <h3 className="text-left title-subhead mb-16">
                        Договор версия 2342
                    </h3>
                    <div className="file-add mb-32">
                      <button className="btn-file btn-icon">
                        <i className="azla blank-alt-primary-icon"></i>
                        Скачать договор
                      </button>
                      <p className="info ml-16">Загружено 24 Июня 2021 в 14:46</p>
                    </div>

                    <div className="author mb-16">
                        <h5 className="mr-16">Автор:</h5>
                        <div className="profile">
                            <img className="ava" src={
                                process.env.PUBLIC_URL + "/images/def-ava.svg"
                              }/>
                            <span className="name">Султангалиева К.И</span>
                        </div>
                    </div>

                    <div className="comment mb-32">
                        <h5>Комментарий:</h5>
                        <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                    </div>

                </div>
              </div>

                <div className="modal-footer">
                    <button type="button" className="button btn-primary table-ml">Отправить на согласование</button>
                </div>
              
            </div>
          </div>
        </div>

      ) : (
        <div className="modal modal-default">
          <div className="modal-backbg"></div>
          <div className="modal-dialog">
            <div className="modal-content fadeInModal animated">
              <div className="modal-close">
                <i className="azla close-icon"></i>
              </div>
              <div className="modal-body">
                <h3 className="text-center">Добавьте или перетащите файл</h3>
                <i className="azla upload-icon size-80 mtb-auto-16"></i>
                <button type="button" className="button btn-primary table-auto">
                  Добавить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Modal;
