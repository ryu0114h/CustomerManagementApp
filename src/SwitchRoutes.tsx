import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { isSignedIn } from "./lib/auth";
import { RoutesType } from "./routes";

const SwitchRoutes: React.FC<{ routes: RoutesType }> = ({ routes }) => {
  return (
    <Switch>
      {routes.map((prop, key) => {
        if (prop.layout === "/admin") {
          return <Route exact path={prop.layout + prop.path} component={prop.component} key={key} />;
        }
        return null;
      })}

      {isSignedIn() ? (
        <Redirect from="/admin" to="/admin/customers_list" />
      ) : (
        <Redirect from="/admin" to="/admin/signin" />
      )}
    </Switch>
  );
};
export default SwitchRoutes;
