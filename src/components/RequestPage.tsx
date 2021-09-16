import * as React from "react";
import { Request } from "../containers";
import { observer } from "mobx-react";

export interface RequestProps {
  request: any;
}

@observer
export class RequestPage extends React.Component<RequestProps, {}> {
  render() {
    return <Request request={this.props.request} />;
  }
}
export default RequestPage;
