import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DetailPage from "./components/DetailPage";
import HomePage from "./components/HomePage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/:id" component={DetailPage} />
        <Route path="/:id/edit" component={DetailPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
