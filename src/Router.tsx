import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Auth from "./Auth";
import { browserHistory } from "./reducks/store/store";
import CalendarPage from "./pages/CalendarPage";

const Router: React.FC = () => {
  return (
    <ConnectedRouter history={browserHistory}>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />

        <Auth>
          <Route exact path="/" component={HomePage} />
          <Route path="/reservation" component={CalendarPage} />
          <Route path="/add" component={AddPage} />
          <Route exact path="/:id" component={DetailPage} />
          <Route path="/:id/edit" component={EditPage} />
        </Auth>
      </Switch>
    </ConnectedRouter>
  );
};

export default Router;
