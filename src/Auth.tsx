import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { RootState } from "./reducks/store/store";

const Auth: React.FC = ({ children }) => {
  const user = useSelector((state: RootState) => state.user);
  const isSignedIn = user.isSignedIn;

  console.log(user);

  if (isSignedIn) {
    return <>{children}</>;
  } else {
    return <Redirect to="/signin" />;
  }
};
export default Auth;
