import React from "react";

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
const PromotionManagement = React.lazy(
  () => import("@/pages/promotion-management"),
);
const Statistic = React.lazy(() => import("@/pages/statistic"));

export const groupPermission1: (
  | "ROLE_ADMIN"
  | "ROLE_USER"
  | "ROLE_RECEPTIONIST"
)[] = ["ROLE_ADMIN", "ROLE_USER"];

export const groupPermission2: (
  | "ROLE_ADMIN"
  | "ROLE_USER"
  | "ROLE_RECEPTIONIST"
)[] = ["ROLE_ADMIN"];

export function checkPermission(
  groupPermission: ("ROLE_ADMIN" | "ROLE_USER" | "ROLE_RECEPTIONIST")[],
  userRole?: ("ROLE_ADMIN" | "ROLE_USER" | "ROLE_RECEPTIONIST")[],
) {
  console.log(userRole);
  if (userRole?.[0]) {
    return groupPermission.includes(userRole?.[0]);
  }
  return false;
}

export interface IRoute {
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
  name: string;
  roles?: string[];
}

export const PUBLIC_ROUTES: IRoute[] = [
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
    path: "/booking-management",
    component: BookingManagement,
    name: "Quản lý đặt phòng",
  },
  {
    path: "/service-management",
    component: ServiceManagement,
    name: "Quản lý dịch vụ",
  },
  {
    path: "/promotion-management",
    component: PromotionManagement,
    name: "Quản lý khuyến mại",
  },
  {
    path: "/statistic",
    component: Statistic,
    name: "Thống kê",
  },
];
