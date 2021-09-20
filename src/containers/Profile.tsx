import React from "react";
import "react-tabs/style/react-tabs.css";
import { observer } from "mobx-react-lite";

const Profile = observer((props: any) => {
  const { main, request } = props;
  React.useEffect(() => {
    request.getClient(main.clientData.client.id);
    request.getUser(main.clientData.client.id);
  }, []);
  return (
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
                          <span className="edit">
                            <i className="azla edit-primary-icon ml-8"></i>
                          </span>
                        </span>
                      </li>
                      <li>
                        <span className="left">Email:</span>
                        <span className="right d-flex">
                          {request._getUser.email}{" "}
                          <span className="edit">
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
                          <span className="edit">
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
  );
});
export default Profile;
