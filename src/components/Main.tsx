import "./style.css";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <section className="main-page">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="special-card">
              <h1 className="title-main">Вход</h1>
              <div className="d-flex-special">
                <Link className="button btn-primary" to="/ecp">
                  По ЭЦП
                </Link>
                <Link className="button btn-secondary" to="/login">
                  По логину
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Main;
