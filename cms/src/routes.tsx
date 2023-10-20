import React from "react";
import { PUBLIC_ROUTES } from "./lazyLoading";
import { Route, Routes } from "react-router-dom";
import { Spin } from "antd";

const SuspenseWrapper = (props: SuspenseWrapperProps) => {
  return <React.Suspense fallback={<Spin />}>{props.children}</React.Suspense>;
};

function MainRoutes() {
  return (
    <Routes>
      {PUBLIC_ROUTES.map((route) => (
        <Route
          path={route.path}
          key={route.path}
          element={
            <SuspenseWrapper>
              <route.component />
            </SuspenseWrapper>
          }
        />
      ))}
    </Routes>
  );
}

export default MainRoutes;
