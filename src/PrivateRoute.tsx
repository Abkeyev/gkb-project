import * as React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { AppContext } from "./AppContext";

interface PrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;
  const { mainStore } = React.useContext(AppContext);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        mainStore.logged ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
