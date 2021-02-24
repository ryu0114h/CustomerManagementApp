import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Auth from "./Auth";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />

        <Auth>
          <Route exact path="/" component={HomePage} />
          <Route path="/add" component={AddPage} />
          <Route exact path="/:id" component={DetailPage} />
          <Route path="/:id/edit" component={EditPage} />
        </Auth>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
