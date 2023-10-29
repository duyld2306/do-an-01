import { IRoute, PUBLIC_ROUTES } from "@/lazyLoading";
import "./index.scss";
import { Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useGetMenuState } from "@/redux/slices/MenuSlice";
import store from "@/redux/store";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

function createItems(routes: IRoute[]): MenuItem[] {
  const { roles } = store.getState().user;
  return routes.map((route: IRoute) => {
    if (!route.roles) {
      return getItem(route.name, route.path);
    }
    if (route.roles && roles?.[0] && route.roles.includes(roles?.[0])) {
      return getItem(route.name, route.path);
    }
    return null;
  });
}

function Sidebar() {
  const [selectedKey, setSelectedKey] = useState(["/"]);

  const isOpen = useGetMenuState();
  const itemsMenu = createItems(PUBLIC_ROUTES);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSelectedKey([location.pathname]);
  }, [location.pathname]);

  const handleClickItemMenu: MenuProps["onClick"] = (info) => {
    if (info.key === window.location.pathname) {
      return;
    }
    navigate(info.key);
  };

  return (
    <div
      className={classNames("sidebar", {
        ["sidebar-open"]: isOpen,
        ["sidebar-close"]: !isOpen,
      })}
    >
      <Menu
        selectedKeys={selectedKey}
        defaultSelectedKeys={selectedKey}
        defaultOpenKeys={selectedKey}
        mode="inline"
        theme="dark"
        inlineCollapsed={!isOpen}
        items={itemsMenu}
        onClick={handleClickItemMenu}
      />
    </div>
  );
}

export default Sidebar;
