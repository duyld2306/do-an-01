import React from "react";

const PageNotFound = React.lazy(() => import("@/pages/404"));
const Home = React.lazy(() => import("@/pages/Home"));
const About = React.lazy(() => import("@/pages/About"));
const Room = React.lazy(() => import("@/pages/Room"));
const DetailRoom = React.lazy(() => import("@/pages/DetailRoom"));
const Service = React.lazy(() => import("@/pages/Service"));
const Promotion = React.lazy(() => import("@/pages/Promotion"));
const Thanks = React.lazy(() => import("@/pages/Thanks"));
// import PageNotFound from "@/pages/404";
// import Home from "@/pages/Home";
// import About from "@/pages/About";
// import Room from "@/pages/Room";
// import DetailRoom from "@/pages/DetailRoom";
// import Service from "@/pages/Service";
// import Promotion from "@/pages/Promotion";

export const PUBLIC_ROUTES = [
  {
    path: "*",
    component: PageNotFound,
    name: "",
  },
  {
    path: "/thank/:slug",
    component: Thanks,
    name: "",
  },
  {
    path: "/",
    component: Home,
    name: "Trang chủ",
  },
  {
    path: "/about",
    component: About,
    name: "Giới thiệu",
  },
  {
    path: "/room",
    component: Room,
    name: "Phòng",
  },
  {
    path: "/room/:id",
    component: DetailRoom,
  },
  {
    path: "/service",
    component: Service,
    name: "Dịch vụ tiện ích",
  },
  {
    path: "/promotion",
    component: Promotion,
    name: "Khuyến mại",
  },
];
