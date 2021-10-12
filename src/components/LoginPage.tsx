import * as React from "react";
import { Login, LoginEcp } from "../containers";
import { observer } from "mobx-react";

export interface LoginProps {
  main: any;
  request: any;
}

@observer
export class LoginPage extends React.Component<LoginProps, {}> {
  render() {
    return (
      <section className="login-page">
        <div className="container">
          <div className="row">
            {this.props.main.loginState === "ecp" ||
            this.props.main.loginState === "ecpr" ? (
              <LoginEcp main={this.props.main} />
            ) : (
              <Login main={this.props.main} />
            )}
          </div>
        </div>
      </section>
    );
  }
}
export default LoginPage;
