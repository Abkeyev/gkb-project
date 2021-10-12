import React from "react";
import { Route, HashRouter, Switch, Redirect } from "react-router-dom";
import {
  Modal,
  Registration,
  RequestInner,
  PartnersNew,
  PartnersInner,
  MyOrganization,
  Sidebar,
  Partners,
  Contractors,
  ServiceInner,
  ContractorsInner,
  Profile,
  Request,
  ServiceDesk,
  ServiceDeskInner,
  Manager,
  Agree,
  AgreeInner,
  Signers,
  SignersInner,
} from "./containers";
import { LoginPage } from "./components";
import PrivateRoute from "./PrivateRoute";
import { observer } from "mobx-react";
import { connection } from "./ncaLayer";

const App = observer((props: any) => {
  const { main, request } = props;

  React.useEffect(() => {
    connection();
  }, []);

  return (
    <div className="app-root modal-open">
      <HashRouter>
        {main.logged && !main.isReg && (
          <Sidebar main={main} request={request} />
        )}
        <Switch>
          <Route
            path="/login"
            component={() =>
              main.logged ? (
                <Redirect to={{ pathname: "/" }} />
              ) : (
                <LoginPage request={request} main={main} />
              )
            }
            exact
          />
          <PrivateRoute
            main={main}
            path="/"
            component={() =>
              main.getRole === "Agent" && main.isReg ? (
                <Registration main={main} request={request} />
              ) : main.getRole === "Service Desk" ? (
                <ServiceDesk request={request} main={main} />
              ) : main.getRole === "Agent" ? (
                <Partners request={request} main={main} />
              ) : main.getRole === "Agree" ? (
                <Agree request={request} main={main} />
              ) : main.getRole === "Signer" ? (
                <Signers request={request} main={main} />
              ) : (
                <Request request={request} main={main} />
              )
            }
            exact
          />
          <PrivateRoute
            main={main}
            path="/partner/:id"
            component={(props: any) => (
              <PartnersInner {...props} main={main} request={request} />
            )}
            exact
          />
          <PrivateRoute
            main={main}
            path="/request/:id"
            component={(props: any) => (
              <RequestInner {...props} main={main} request={request} />
            )}
            exact
          />
          <PrivateRoute
            main={main}
            path="/agree/:id"
            component={(props: any) => (
              <AgreeInner {...props} main={main} request={request} />
            )}
            exact
          />
          <PrivateRoute
            main={main}
            path="/signers/:id"
            component={(props: any) => (
              <SignersInner {...props} main={main} request={request} />
            )}
            exact
          />
          <PrivateRoute
            main={main}
            path="/users"
            component={() => <Manager main={main} request={request} />}
            exact
          />
          <PrivateRoute
            main={main}
            path="/service-desk/:id"
            component={(props: any) => (
              <ServiceDeskInner {...props} main={main} request={request} />
            )}
            exact
          />
          <PrivateRoute
            main={main}
            path="/contractors"
            component={() => <Contractors main={main} request={request} />}
            exact
          />
          <PrivateRoute
            main={main}
            path="/contractors/:id"
            component={(props: any) => (
              <ContractorsInner {...props} main={main} request={request} />
            )}
            exact
          />
          <PrivateRoute
            main={main}
            path="/service/:id"
            component={(props: any) => (
              <ServiceInner {...props} main={main} request={request} />
            )}
            exact
          />
          <PrivateRoute
            main={main}
            path="/profile"
            component={() => <Profile main={main} request={request} />}
            exact
          />
          <PrivateRoute
            main={main}
            path="/organization"
            component={() => <MyOrganization main={main} request={request} />}
            exact
          />
          <PrivateRoute
            main={main}
            path="/request-new"
            component={() => <PartnersNew main={main} request={request} />}
            exact
          />
        </Switch>
      </HashRouter>
    </div>
  );
});

export default App;
