import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Redirect, Route, Switch } from "react-router-dom";
import { browserHistory } from "./reducks/store/store";
import Admin from "./layouts/Admin";

const Router: React.FC = () => {
  return (
    <ConnectedRouter history={browserHistory}>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/admin" />
      </Switch>
    </ConnectedRouter>
  );
};

export default Router;
