import React from "react";
import "react-tabs/style/react-tabs.css";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import Modal from "../components/Modal";
import ModalFooter from "../components/ModalFooter";
import { useEffect } from "react";

const Profile = observer((props: any) => {
  const { main, request } = props;

  const setModalOpened = (val: any) => {
    setModal(null);
    setOpened(val);
  }
  const [modalOpened, setOpened]: any = useState(true);
  const [modal, setModal]: any = useState(null);

  useEffect(() => {
    
  }, [modalOpened, modal])

  const dolzhnostModal = (
    <Modal title="Редактирование должности" modalOpened={modalOpened} setModalOpened={(val: any) => setModalOpened(val)}>
        <div className="form-wrapper">
          <input type="text" value="Аналитик" />
          <label>Должность</label>
        </div>
        <ModalFooter>
          <div className="d-flex">
            <button
              type="button"
              className="button btn-secondary mr-16"
              onClick={() => setModalOpened(false)}
            >
              Отмена
            </button>
            <button
              type="button"
              className="button btn-primary"
              onClick={() => request.updateUser(main.clientData.client.id, {email: "asdadsasd@asd.asd"})}
            >
              Сохранить
            </button>
          </div>
        </ModalFooter>
    </Modal>
  );

  const emailModal = (
    <Modal title="Профайл" modalOpened={modalOpened} setModalOpened={(val: any) => setModalOpened(val)}>
      <div className="form-wrapper">
        <input type="email" defaultValue={request?._getUser?.email} />
        <label>E-mail</label>
      </div>
      <ModalFooter>
        <div className="d-flex">
            <button
              type="button"
              className="button btn-secondary mr-16"
              onClick={() => setModalOpened(false)}
            >
              Отмена
            </button>
            <button
              type="button"
              className="button btn-primary"
              onClick={() => request.updateUser(main.clientData.client.id, {email: "asdadsasd@asd.asd"})}
            >
              Сохранить
            </button>
          </div>
      </ModalFooter>
    </Modal>
  );

  const roleModal = (
    <Modal title="Профайл" modalOpened={modalOpened} setModalOpened={(val: any) => setModalOpened(val)}>
      <div className="form-wrapper">
        <input type="text" defaultValue={request?._getUser?.role} />
        <label>Роль</label>
      </div>
      <ModalFooter>
        <div className="d-flex">
            <button
              type="button"
              className="button btn-secondary mr-16"
              onClick={() => setModalOpened(false)}
            >
              Отмена
            </button>
            <button
              type="button"
              className="button btn-primary"
              onClick={() => request.updateUser(main.clientData.client.id, {email: "asdadsasd@asd.asd"})}
            >
              Сохранить
            </button>
          </div>
      </ModalFooter>
    </Modal>
  );

  React.useEffect(() => {
    request.getClient(main.clientData.client.id);
    request.getUser(main.clientData.client.id);
  }, []);

  return (
    <>
      <div className="main-body">
        {request._getUser && (
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="create-page p-50 pad-b-128">
                  <div className="header-text-inner justify-content-between mb-32">
                    <h1 className="title-main mb-32">Мой профиль</h1>
                  </div>
                  <div className="profile-page-inner">
                    <h3 className="title-subhead mb-16">
                      {request._getUser.full_name}
                    </h3>

                    <div className="total-info mb-32">
                      <ul className="info-list">
                        <li>
                          <span className="left">Должность:</span>
                          <span className="right d-flex">
                            {request._getUser.position}{" "}
                            <span className="edit" onClick={() => {
                              setOpened(true);
                              setModal(dolzhnostModal);
                            }}>
                              <i className="azla edit-primary-icon ml-8"></i>
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="left">Email:</span>
                          <span className="right d-flex">
                            {request._getUser.email}{" "}
                            <span className="edit" onClick={() => {
                              setOpened(true);
                              setModal(emailModal);
                            }}>
                              <i className="azla edit-primary-icon ml-8"></i>
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="left">Дата регистрации:</span>
                          <span className="right d-flex">
                            {request._getUser.reg_date}
                          </span>
                        </li>
                        <li>
                          <span className="left">Роль:</span>
                          <span className="right d-flex">
                            {request._getUser.position}{" "}
                            <span className="edit" onClick={() => {
                              setOpened(true);
                              setModal(roleModal);
                            }}>
                              <i className="azla edit-primary-icon ml-8"></i>
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="left">Организация:</span>
                          <span className="right d-flex">
                            <a href="#" className="pre-primary-color">
                              {request._getClient && request._getClient.longname}{" "}
                            </a>
                          </span>
                        </li>
                      </ul>
                    </div>
                    <button
                      className="button btn-secondary btn-danger w-160"
                      onClick={() => main.logout(true)}
                    >
                      Выйти
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {modal}
    </>
  );
});
export default Profile;
