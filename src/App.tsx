import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import AddPage from "./pages/AddPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/add" component={AddPage} />

        <Route exact path="/:id" component={DetailPage} />
        <Route path="/:id/edit" component={EditPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
