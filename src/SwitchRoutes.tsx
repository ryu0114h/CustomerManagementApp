import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { RootState } from "./reducks/store/store";
import { RoutesType } from "./routes";

const SwitchRoutes: React.FC<{ routes: RoutesType }> = ({ routes }) => {
  const staff = useSelector((state: RootState) => state.staff);
  const isSignedIn = staff.isSignedIn;

  return (
    <Switch>
      {routes.map((prop, key) => {
        if (prop.layout === "/admin") {
          return <Route exact path={prop.layout + prop.path} component={prop.component} key={key} />;
        }
        return null;
      })}

      {isSignedIn ? (
        <Redirect from="/admin" to="/admin/customers_list" />
      ) : (
        <Redirect from="/admin" to="/admin/signin" />
      )}
    </Switch>
  );
};
export default SwitchRoutes;
