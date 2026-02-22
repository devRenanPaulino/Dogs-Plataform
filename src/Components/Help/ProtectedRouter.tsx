import React from "react";
import { UserContext } from "../../UserContext";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRouter = ({children} : ProtectedRouteProps) => {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error("ProtectedRouter deve estar dentro de UserStorage");
  }

  const { login } = context;

  if(login === true) {
    return children;
  } else if (login === false) {
    <Navigate to="/login" />;
  } else {
    return<></>
  }
};

export default ProtectedRouter;
