import React from "react";

const Manager = () => {
  return (
    <div className="main-body">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="profile-manager p-50">
              <h1 className="title-main">Общие данные</h1>
              <h3 className="title-subhead mb-32">Данные организации</h3>
              <div className="col-md-8">
                <div className="form-wrapper">
                  <input type="name" placeholder="Напишите id клиента" />
                  <label>ID клиента</label>
                </div>
                <div className="form-wrapper">
                  <input type="name" placeholder="Напишите id клиента" />
                  <label>ID типа клиента</label>
                </div>
                <div className="form-wrapper">
                  <input type="name" placeholder="Напишите id клиента" />
                  <label>Полное наименование</label>
                </div>
                <div className="form-wrapper">
                  <input type="name" placeholder="Напишите id клиента" />
                  <label>Краткое наименование</label>
                </div>
                <div className="form-wrapper">
                  <input type="name" placeholder="Напишите id клиента" />
                  <label>Адрес сайта клиента</label>
                </div>
                <div className="form-wrapper">
                  <input type="name" required />
                  <label>БИН клиента</label>
                </div>
                <div className="form-wrapper">
                  <input type="date" />
                  <label>Дата регистрации в системе</label>
                </div>
                <div className="form-wrapper">
                  <input type="name" placeholder="Напишите id клиента" />
                  <label>ID статус клиента</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Manager;
