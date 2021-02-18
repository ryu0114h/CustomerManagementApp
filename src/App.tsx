import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import DetailPage from "./components/DetailPage";
import EditPage from "./components/EditPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/:id" component={DetailPage} />
        <Route path="/:id/edit" component={EditPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
