import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./components/Header";
import { fetchCustomers } from "./reducks/customers/operations";
import Router from "./Router";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);

  return (
    <>
      <Header />
      <main>
        <Router />
      </main>
    </>
  );
};

export default App;
