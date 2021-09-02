import * as React from "react";
import { Request } from "../containers";
import { observer } from "mobx-react";

export interface RequestProps {}

@observer
export class RequestPage extends React.Component<RequestProps, {}> {
  constructor(props: RequestProps) {
    super(props);
  }
  render() {
    return <Request />;
  }
}
export default RequestPage;
