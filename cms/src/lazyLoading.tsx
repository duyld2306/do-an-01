import React from "react";

const PageNotFound = React.lazy(() => import("@/pages/404"));

export const PUBLIC_ROUTES = [
  {
    path: "*",
    component: PageNotFound,
    name: "",
  },
];
