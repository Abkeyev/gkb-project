import { Route, Redirect, RouteProps } from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
  main: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, main, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        main.logged ? (
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
