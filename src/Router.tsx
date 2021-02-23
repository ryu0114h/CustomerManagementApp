import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/add" component={AddPage} />

        <Route exact path="/:id" component={DetailPage} />
        <Route path="/:id/edit" component={EditPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
