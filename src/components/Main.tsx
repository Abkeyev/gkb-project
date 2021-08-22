import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <section className="main-page">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form>
              <div className="special-card">
                <h1 className="title-main">Вход</h1>
                <div className="d-flex-special">
                  <button className="button btn-primary">По ЭЦП</button>
                  <Link className="button btn-secondary" to="/login">
                    По логину
                  </Link>
                </div>
                {/* <h1 className="title-main">Вход по ЭПЦ</h1> Форма ЭЦП */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Main;
