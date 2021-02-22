import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import { fetchCustomers } from "./reducks/customers/operations";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);

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
