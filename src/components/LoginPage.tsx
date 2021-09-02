import * as React from "react";
import NCALayer from "../ncalayer/ncalayer";
import { Login, LoginEcp } from "../containers";
import { MainStore } from "../stores";
import { observer } from "mobx-react";

export interface LoginProps {
  state: any;
  setState: any;
  client: NCALayer;
  store: MainStore;
  ready: boolean;
}

@observer
export class LoginPage extends React.Component<LoginProps, {}> {
  constructor(props: LoginProps) {
    super(props);
  }
  render() {
    return (
      <section className="main-page">
        <div className="container">
          <div className="row">
            {this.props.store.loginState === "ecp" ? (
              <LoginEcp
                state={this.props.state}
                setState={this.props.setState}
                client={this.props.client}
                ready={this.props.ready}
              />
            ) : (
              <Login />
            )}
          </div>
        </div>
      </section>
    );
  }
}
export default LoginPage;
