import React from "react";

const PageNotFound = React.lazy(() => import("@/pages/404"));
const RoomManagement = React.lazy(() => import("@/pages/room-management"));
const BookingManagement = React.lazy(
  () => import("@/pages/booking-management"),
);
const CustomerManagement = React.lazy(
  () => import("@/pages/customer-management"),
);
const ServiceManagement = React.lazy(
  () => import("@/pages/service-management"),
);

export interface IRoute {
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
  name: string;
}

export const PUBLIC_ROUTES: IRoute[] = [
  {
    path: "*",
    component: PageNotFound,
    name: "",
  },
  {
    path: "/room-management",
    component: RoomManagement,
    name: "Quản lý phòng",
  },
  {
    path: "/customer-management",
    component: CustomerManagement,
    name: "Quản lý khách hàng",
  },
  {
    path: "/bookings-management",
    component: BookingManagement,
    name: "Quản lý đặt phòng",
  },
  {
    path: "/services-management",
    component: ServiceManagement,
    name: "Quản lý dịch vụ",
  },
];
