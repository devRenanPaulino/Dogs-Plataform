import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate";
import LoginPasswordLost from "./LoginPasswordLost";
import LoginPasswordReset from "./LoginPasswordReset";
import { UserContext } from "../../UserContext";

const Login = () => {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error("Login Salvo não Existe");
  }

  const { login } = context;

  if (login === true) return <Navigate to="/conta" />;
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 min-h-screen gap-8 login">
      <div className="max-w-[30rem] w-full mx-auto p-4 sm:max-w-full">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="criar" element={<LoginCreate />} />
          <Route path="perdeu" element={<LoginPasswordLost />} />
          <Route path="resetar" element={<LoginPasswordReset />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
