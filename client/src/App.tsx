import React, { useEffect } from "react";
import logo from "./logo.svg";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { adminRoutes, privateRoutes, publicRoutes } from "./utils/routes";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { PublicRoutesEnum } from "./utils/consts";

function App() {
  const isAuth = localStorage.getItem("isAuth") ? true : false;
  // @ts-ignore
  const user = isAuth && JSON.parse(localStorage.getItem("user") || "");
  const student = user && user.role === "STUDENT";
  const teacher = user && user.role === "TEACHER";
  const admin = user && user.role === "ADMIN";

  console.log(isAuth, student, teacher, admin);
  return (
    <BrowserRouter>
      <Routes>
        {!isAuth &&
          publicRoutes.map((route) => (
            <Route
              path={route.path}
              element={<route.element />}
              key={route.path}
            />
          ))}
        {isAuth &&
          student &&
          privateRoutes.map((route) => (
            <Route
              path={route.path}
              element={<route.element />}
              key={route.path}
            />
          ))}
        {isAuth &&
          teacher &&
          adminRoutes.map((route) => (
            <Route
              path={route.path}
              element={<route.element />}
              key={route.path}
            />
          ))}
        {isAuth &&
          admin &&
          adminRoutes.map((route) => (
            <Route
              path={route.path}
              element={<route.element />}
              key={route.path}
            />
          ))}
        <Route path="*" element={<Navigate to={PublicRoutesEnum.MainPath} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
