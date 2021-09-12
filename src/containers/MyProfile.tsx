import React from "react";
import "react-tabs/style/react-tabs.css";
import { observer } from "mobx-react";
import { AppContext } from "../AppContext";

const MyProfile = () => {
  return (
    <div className="main-body">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
                
            <div className="create-page p-50 pad-b-128">
              <div className="header-text-inner justify-content-between mb-32">
                <h1 className="title-main mb-32">
                Мой профиль
                </h1>
              </div>
              <div className="profile-page-inner">

                    <h3 className="title-subhead mb-16">
                    Фамилия Имя Отчество
                    </h3>

                    <div className="total-info mb-32">
                      <ul className="info-list">
                        <li>
                          <span className="left">Должность:</span>
                          <span className="right d-flex">
                          Аналитик{" "}
                            <span className="edit">
                              <i className="azla edit-primary-icon ml-8"></i>
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="left">Email:</span>
                          <span className="right d-flex">
                          samplemail@gmail.com{" "}
                            <span className="edit">
                              <i className="azla edit-primary-icon ml-8"></i>
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="left">Дата регистрации:</span>
                          <span className="right d-flex">
                          20 Июня 2021{" "}
                          </span>
                        </li>
                        <li>
                          <span className="left">Роль:</span>
                          <span className="right d-flex">
                          Изъятие данных{" "}
                            <span className="edit">
                              <i className="azla edit-primary-icon ml-8"></i>
                            </span>
                          </span>
                        </li>
                        <li>
                          <span className="left">Организация:</span>
                          <span className="right d-flex">
                            <a href="#" className="pre-primary-color">
                                ТОО “М-Ломбард”{" "}
                            </a>
                          </span>
                        </li>
                      </ul>
                    </div>
                    <button className="button btn-secondary btn-danger w-160">Выйти</button>

              </div>
                
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyProfile;
